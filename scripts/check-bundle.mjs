import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { gzipSync } from 'node:zlib'

const directory = resolve(process.argv[2] ?? 'dist/assets')
const limit = Number(process.argv[3] ?? 100_000)
const assets = await readdir(directory)
const scripts = assets.filter((asset) => asset.endsWith('.js'))
let total = 0

for (const script of scripts) {
  total += gzipSync(await readFile(resolve(directory, script))).byteLength
}

if (total > limit) {
  throw new Error(`JavaScript gzip size ${total} exceeds budget ${limit}`)
}

console.log(`JavaScript gzip size: ${total}/${limit} bytes`)
