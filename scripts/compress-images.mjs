/**
 * compress-images.mjs
 * Compresses all images in public/ in-place using sharp.
 * Run with: node scripts/compress-images.mjs
 *
 * Rules applied:
 *  - JPG/JPEG: quality 80, progressive, max width 1600px
 *  - PNG:      quality 80, max width 1600px  (converted to compressed PNG)
 *  - footer-banner.png: max width 1920px (it's a full-width banner)
 *  - game images (public/games/): max width 800px (they render at ~400px max)
 *  - gallery images: max width 1200px
 *  - banner images: max width 1920px
 *  - client logos: max width 400px
 *  - testimonials: max width 600px
 */

import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const publicDir = join(__dirname, '..', 'public')

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await getFiles(fullPath))
    } else {
      files.push(fullPath)
    }
  }
  return files
}

function getMaxWidth(filePath) {
  const rel = relative(publicDir, filePath).replace(/\\/g, '/')
  if (rel.startsWith('games/'))        return 800
  if (rel.startsWith('gallery/'))      return 1200
  if (rel.startsWith('banner/'))       return 1920
  if (rel.startsWith('clients/'))      return 400
  if (rel.startsWith('testimonials/')) return 600
  if (rel === 'footer-banner.png')     return 1920
  if (rel === 'home.png')              return 1920
  return 1600 // default
}

async function compress(filePath) {
  const ext = extname(filePath).toLowerCase()
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return

  const before = (await stat(filePath)).size
  const maxWidth = getMaxWidth(filePath)
  const rel = relative(publicDir, filePath).replace(/\\/g, '/')

  try {
    const img = sharp(filePath)
    const meta = await img.metadata()

    // Only resize if wider than maxWidth
    const pipeline = meta.width > maxWidth
      ? img.resize({ width: maxWidth, withoutEnlargement: true })
      : img

    let buffer
    if (ext === '.png') {
      buffer = await pipeline.png({ quality: 82, compressionLevel: 9 }).toBuffer()
    } else {
      buffer = await pipeline.jpeg({ quality: 82, progressive: true, mozjpeg: true }).toBuffer()
    }

    // Only overwrite if the compressed version is actually smaller
    if (buffer.length < before) {
      const { writeFile, rename } = await import('fs/promises')
      const tmp = filePath + '.tmp'
      await writeFile(tmp, buffer)
      await rename(tmp, filePath)
      const after = buffer.length
      const saved = ((before - after) / before * 100).toFixed(1)
      const beforeKB = (before / 1024).toFixed(0)
      const afterKB = (after / 1024).toFixed(0)
      console.log(`✓ ${rel.padEnd(50)} ${beforeKB}KB → ${afterKB}KB  (${saved}% smaller)`)
    } else {
      console.log(`– ${rel.padEnd(50)} already optimised, skipped`)
    }
  } catch (err) {
    console.error(`✗ ${rel}: ${err.message}`)
  }
}

const files = await getFiles(publicDir)
const images = files.filter(f => ['.jpg','.jpeg','.png'].includes(extname(f).toLowerCase()))

console.log(`\nCompressing ${images.length} images...\n`)
for (const f of images) {
  await compress(f)
}
console.log('\nDone.')
