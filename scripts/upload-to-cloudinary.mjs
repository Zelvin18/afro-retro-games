/**
 * upload-to-cloudinary.mjs
 * Uploads all public/ images to Cloudinary and writes a url-map.json
 * Run: node scripts/upload-to-cloudinary.mjs
 */

import { v2 as cloudinary } from 'cloudinary'
import { readdir, writeFile } from 'fs/promises'
import { join, extname, relative, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const publicDir = join(__dirname, '..', 'public')

cloudinary.config({
  cloud_name: 'nzxdstig',
  api_key: '326124846986899',
  api_secret: 'Y-b3qBJm0yN_sFfdbxLfEHVwf70',
  secure: true,
})

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

// Map local path → cloudinary folder
function getFolder(filePath) {
  const rel = relative(publicDir, filePath).replace(/\\/g, '/')
  if (rel.startsWith('games/'))        return 'afroretro/games'
  if (rel.startsWith('gallery/'))      return 'afroretro/gallery'
  if (rel.startsWith('banner/'))       return 'afroretro/banner'
  if (rel.startsWith('clients/'))      return 'afroretro/clients'
  if (rel.startsWith('testimonials/')) return 'afroretro/testimonials'
  return 'afroretro'
}

// Build a clean public_id (no spaces, no extension)
function getPublicId(filePath) {
  const folder = getFolder(filePath)
  const name = basename(filePath, extname(filePath))
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
  return `${folder}/${name}`
}

const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG', '.svg']

const allFiles = await getFiles(publicDir)
const images = allFiles.filter(f => EXTENSIONS.includes(extname(f)))

console.log(`\nUploading ${images.length} images to Cloudinary...\n`)

const urlMap = {} // localPath → cloudinary URL

for (const filePath of images) {
  const rel = relative(publicDir, filePath).replace(/\\/g, '/')
  const publicId = getPublicId(filePath)

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
      // auto format + quality for best performance
      transformation: [{ fetch_format: 'auto', quality: 'auto' }],
    })

    // Store the base URL (without f_auto/q_auto — we'll add those in code)
    const url = result.secure_url
    urlMap[`/${rel}`] = url
    console.log(`✓ /${rel}`)
    console.log(`  → ${url}`)
  } catch (err) {
    console.error(`✗ /${rel}: ${err.message}`)
    urlMap[`/${rel}`] = null
  }
}

// Write the map to a JSON file for the next script to use
const mapPath = join(__dirname, 'cloudinary-url-map.json')
await writeFile(mapPath, JSON.stringify(urlMap, null, 2))

console.log(`\nDone. URL map written to scripts/cloudinary-url-map.json`)
console.log(`Now run: node scripts/apply-cloudinary-urls.mjs`)
