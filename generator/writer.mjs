import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

// The only generator module allowed to write to the filesystem.
export async function writeGeneratedFiles(root, files) {
  for (const [name, content] of files) {
    const path = resolve(root, name)
    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, content)
  }
}
