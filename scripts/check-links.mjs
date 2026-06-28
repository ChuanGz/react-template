import { access, readdir, readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'

const root = process.cwd()
const markdown = []
async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue
    const path = join(directory, entry.name)
    if (entry.isDirectory()) await collect(path)
    else if (entry.name.endsWith('.md')) markdown.push(path)
  }
}

await collect(root)
const failures = []
for (const file of markdown) {
  const content = await readFile(file, 'utf8')
  for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].replace(/^<|>$/g, '').split('#')[0]
    if (!target || /^(https?:|mailto:)/.test(target)) continue
    try {
      await access(resolve(dirname(file), decodeURIComponent(target)))
    } catch {
      failures.push(`${file.slice(root.length + 1)}: ${match[1]}`)
    }
  }
}
if (failures.length)
  throw new Error(`Broken Markdown links:\n${failures.join('\n')}`)
console.log(`Validated links in ${markdown.length} Markdown files.`)
