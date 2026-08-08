import { resolve } from 'node:path'
import { createBaseFilePlan } from '../templates/base/index.mjs'
import { applyCapabilities, capabilities } from './capabilities/index.mjs'
import { resolveOptions } from './validator.mjs'
import { writeGeneratedFiles } from './writer.mjs'

export function createFilePlan(target, options, registry = capabilities) {
  const files = createBaseFilePlan(target, options)
  applyCapabilities(files, options, registry)
  return files
}

export async function generate(target, input = {}) {
  const root = resolve(target)
  const { options, warnings } = resolveOptions(input)
  const files = createFilePlan(target, options)
  await writeGeneratedFiles(root, files)
  return { files: [...files.keys()], options, warnings }
}
