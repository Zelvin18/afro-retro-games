/**
 * apply-cloudinary-urls.mjs
 * Replaces every local /image-path reference in src/ with the Cloudinary URL.
 * The URL has f_auto,q_auto injected so Cloudinary serves the best format/quality.
 */

import { readFile, writeFile, readdir } from 'fs/promises'
import { join, extname, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const srcDir    = join(__dirname, '..', 'src')
const mapFile   = join(__dirname, 'cloudinary-url-map.json')

const rawMap = JSON.parse(await readFile(mapFile, 'utf8'))

// Build the optimised URL: inject f_auto,q_auto after /upload/
function optimisedUrl(raw) {
  if (!raw) return null
  return raw.replace('/upload/', '/upload/f_auto,q_auto/')
}

// Build lookup: localPath → optimised URL
// Include both exact path and variants (with/without leading slash, .JPG/.jpg etc.)
const urlMap = {}
for (const [local, raw] of Object.entries(rawMap)) {
  if (!raw) continue
  const url = optimisedUrl(raw)
  // store with and without leading slash
  urlMap[local]                = url  // e.g. /games/Giant Jenga.png
  urlMap[local.replace(/^\//, '')] = url  // e.g. games/Giant Jenga.png
  // also uppercase extension variant
  const upper = local.replace(/\.[^.]+$/, m => m.toUpperCase())
  urlMap[upper]                = url
  urlMap[upper.replace(/^\//, '')] = url
}

async function getSourceFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) files.push(...await getSourceFiles(full))
    else if (['.ts', '.tsx'].includes(extname(e.name))) files.push(full)
  }
  return files
}

const files = await getSourceFiles(srcDir)
let totalReplacements = 0

for (const file of files) {
  let content = await readFile(file, 'utf8')
  let changed = false
  let fileReplacements = 0

  for (const [local, url] of Object.entries(urlMap)) {
    // Match the local path inside strings (single, double quotes, template literals)
    // Escape special regex chars in the path
    const escaped = local.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s/g, '\\s*')
    const pattern = new RegExp(`(['"\`])${escaped}(['"\`])`, 'g')

    const newContent = content.replace(pattern, (match, q1, q2) => {
      fileReplacements++
      return `${q1}${url}${q2}`
    })

    if (newContent !== content) {
      content = newContent
      changed = true
    }
  }

  if (changed) {
    await writeFile(file, content)
    const rel = relative(join(__dirname, '..'), file).replace(/\\/g, '/')
    console.log(`✓ ${rel}  (${fileReplacements} replacements)`)
    totalReplacements += fileReplacements
  }
}

console.log(`\nDone. ${totalReplacements} image references updated across ${files.length} source files.`)
