import { resolve } from 'node:path'
import { addApiCapabilityFiles } from '../templates/api/index.mjs'
import { addAuthCapabilityFiles } from '../templates/auth/index.mjs'
import { createBaseFilePlan } from '../templates/base/index.mjs'
import { addExtendedCapabilityFiles } from '../templates/extended/index.mjs'
import { addPresentationCapabilityFiles } from '../templates/presentation/index.mjs'
import { addResilienceCapabilityFiles } from '../templates/resilience/index.mjs'
import { addStrategyCapabilityFiles } from '../templates/strategies/index.mjs'
import { addTestingCapabilityFiles } from '../templates/testing/index.mjs'
import { addUiCapabilityFiles } from '../templates/ui/index.mjs'
import { resolveOptions } from './validator.mjs'
import { writeGeneratedFiles } from './writer.mjs'

const capabilityGenerators = Object.freeze([
  addAuthCapabilityFiles,
  addApiCapabilityFiles,
  addStrategyCapabilityFiles,
  addPresentationCapabilityFiles,
  addResilienceCapabilityFiles,
  addUiCapabilityFiles,
  addTestingCapabilityFiles,
  addExtendedCapabilityFiles,
])

export function createFilePlan(target, options) {
  return createBaseFilePlan(target, options, capabilityGenerators)
}

export async function generate(target, input = {}) {
  const root = resolve(target)
  const { options, warnings } = resolveOptions(input)
  const files = createFilePlan(target, options)
  await writeGeneratedFiles(root, files)
  return { files: [...files.keys()], options, warnings }
}
