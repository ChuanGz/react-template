import { addApiCapabilityFiles } from './capabilities/api.mjs'
import { addAuthCapabilityFiles } from './capabilities/auth.mjs'
import { createBaseFilePlan } from './capabilities/base.mjs'
import { addExtendedCapabilityFiles } from './capabilities/extended.mjs'
import { addPresentationCapabilityFiles } from './capabilities/presentation.mjs'
import { addResilienceCapabilityFiles } from './capabilities/resilience.mjs'
import { addStrategyCapabilityFiles } from './capabilities/strategies.mjs'
import { addTestingCapabilityFiles } from './capabilities/testing.mjs'
import { addUiCapabilityFiles } from './capabilities/ui.mjs'

const capabilityGenerators = Object.freeze([
  addStrategyCapabilityFiles,
  addApiCapabilityFiles,
  addAuthCapabilityFiles,
  addExtendedCapabilityFiles,
  addPresentationCapabilityFiles,
  addResilienceCapabilityFiles,
  addUiCapabilityFiles,
  addTestingCapabilityFiles,
])

export function createFilePlan(target, options) {
  return createBaseFilePlan(target, options, capabilityGenerators)
}
