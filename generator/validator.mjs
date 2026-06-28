// Public option defaults and compatibility rules.
export const defaults = Object.freeze({
  router: true,
  apiClient: true,
  state: 'none',
  tailwind: false,
  uiLibrary: 'none',
  icons: 'lucide',
  notifications: false,
  dateTime: 'date-fns',
  utilities: 'standard',
  theme: 'none',
  authentication: 'none',
  authorization: 'none',
  layout: 'basic',
  errorBoundary: true,
  loadingState: true,
  envValidation: true,
  testing: 'unit',
  query: false,
  mockApi: false,
  realtime: 'none',
  table: false,
  forms: false,
  localization: false,
  charts: false,
  fileUpload: false,
  reusableComponents: false,
  pageTemplates: false,
  apiModels: false,
})

export const enumOptions = Object.freeze({
  state: ['none', 'context', 'zustand'],
  uiLibrary: ['none', 'shadcn', 'antd', 'mui'],
  icons: ['lucide', 'none'],
  dateTime: ['none', 'date-fns', 'dayjs'],
  utilities: ['none', 'standard', 'lodash'],
  theme: ['none', 'light-dark'],
  authentication: ['none', 'jwt', 'oidc'],
  authorization: ['none', 'route', 'permission'],
  layout: ['none', 'basic', 'app-shell'],
  testing: ['none', 'unit', 'component', 'e2e'],
  realtime: ['none', 'websocket', 'signalr', 'socketio'],
})
export const booleanOptions = Object.freeze([
  'router',
  'apiClient',
  'tailwind',
  'notifications',
  'errorBoundary',
  'loadingState',
  'envValidation',
  'query',
  'mockApi',
  'table',
  'forms',
  'localization',
  'charts',
  'fileUpload',
  'reusableComponents',
  'pageTemplates',
  'apiModels',
])

export const conflictRules = Object.freeze([
  {
    message: 'authorization requires authentication',
    conflicts: (value) =>
      value.authorization !== 'none' && value.authentication === 'none',
  },
  {
    message: 'route authorization requires router',
    conflicts: (value) => value.authorization === 'route' && !value.router,
  },
  {
    message: 'app-shell requires router',
    conflicts: (value) => !value.router && value.layout === 'app-shell',
  },
])

export function resolveOptions(input = {}) {
  const normalized = { ...input }
  let usedLegacyShadcn = false
  if ('shadcn' in normalized) {
    if ('uiLibrary' in normalized)
      throw new Error('shadcn cannot be combined with uiLibrary')
    if (![true, false, 'true', 'false'].includes(normalized.shadcn))
      throw new Error('shadcn must be true or false')
    normalized.uiLibrary = [true, 'true'].includes(normalized.shadcn)
      ? 'shadcn'
      : 'none'
    delete normalized.shadcn
    usedLegacyShadcn = true
  }
  for (const key of Object.keys(normalized))
    if (!(key in defaults)) throw new Error(`Unknown option: ${key}`)
  const value = { ...defaults, ...normalized }
  for (const key of booleanOptions) {
    if (value[key] === 'true') value[key] = true
    if (value[key] === 'false') value[key] = false
    if (typeof value[key] !== 'boolean')
      throw new Error(`${key} must be true or false`)
  }
  for (const [key, allowed] of Object.entries(enumOptions))
    if (!allowed.includes(value[key]))
      throw new Error(`${key} must be one of: ${allowed.join(', ')}`)
  if (value.uiLibrary === 'shadcn') value.tailwind = true
  for (const rule of conflictRules)
    if (rule.conflicts(value)) throw new Error(rule.message)
  const warnings = []
  if (value.authentication !== 'none' && !value.apiClient)
    warnings.push('authentication normally requires apiClient')
  if (usedLegacyShadcn)
    warnings.push('shadcn is deprecated; use uiLibrary=shadcn')
  return { options: value, warnings }
}
