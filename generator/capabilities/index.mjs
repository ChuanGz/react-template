import { addApiCapabilityFiles } from '../../templates/api/index.mjs'
import { addAuthCapabilityFiles } from '../../templates/auth/index.mjs'
import { addExtendedCapabilityFiles } from '../../templates/extended/index.mjs'
import { addPresentationCapabilityFiles } from '../../templates/presentation/index.mjs'
import { addResilienceCapabilityFiles } from '../../templates/resilience/index.mjs'
import { addStrategyCapabilityFiles } from '../../templates/strategies/index.mjs'
import { addTestingCapabilityFiles } from '../../templates/testing/index.mjs'
import { addUiCapabilityFiles } from '../../templates/ui/index.mjs'

function defineCapability(id, addFiles) {
  return Object.freeze({ id, addFiles })
}

// The ordered registry is the only place where independently owned capability
// groups are composed. Keep base application files out of this registry.
export const capabilities = Object.freeze([
  defineCapability('authentication', addAuthCapabilityFiles),
  defineCapability('api', addApiCapabilityFiles),
  defineCapability('strategies', addStrategyCapabilityFiles),
  defineCapability('presentation', addPresentationCapabilityFiles),
  defineCapability('resilience', addResilienceCapabilityFiles),
  defineCapability('ui', addUiCapabilityFiles),
  defineCapability('testing', addTestingCapabilityFiles),
  defineCapability('extended', addExtendedCapabilityFiles),
])

export function applyCapabilities(files, options, registry = capabilities) {
  for (const capability of registry) capability.addFiles(files, options)
}
