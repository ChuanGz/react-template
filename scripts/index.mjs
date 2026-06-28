import { resolve } from 'node:path'
import { createFilePlan } from './generator.mjs'
import { resolveOptions } from './validator.mjs'
import { writeGeneratedFiles } from './writer.mjs'

export async function generate(target, input = {}) {
  const root = resolve(target)
  const { options, warnings } = resolveOptions(input)
  const files = createFilePlan(target, options)
  await writeGeneratedFiles(root, files)
  return { files: [...files.keys()], options, warnings }
}
