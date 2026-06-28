export const defaults = Object.freeze({
  router: true,
  apiClient: true,
  tailwind: false,
  shadcn: false,
  theme: 'none',
  authentication: 'none',
  authorization: 'none',
  layout: 'basic',
  errorBoundary: true,
  loadingState: true,
  envValidation: true,
  testing: 'unit',
  query: false,
  table: false,
  forms: false,
  localization: false,
  charts: false,
  fileUpload: false,
  reusableComponents: false,
  pageTemplates: false,
  apiModels: false,
})

const enums = {
  theme: ['none', 'light-dark'],
  authentication: ['none', 'jwt', 'oidc'],
  authorization: ['none', 'route', 'permission'],
  layout: ['none', 'basic', 'app-shell'],
  testing: ['none', 'unit', 'component'],
}
const booleans = new Set([
  'router',
  'apiClient',
  'tailwind',
  'shadcn',
  'errorBoundary',
  'loadingState',
  'envValidation',
  'query',
  'table',
  'forms',
  'localization',
  'charts',
  'fileUpload',
  'reusableComponents',
  'pageTemplates',
  'apiModels',
])

export function resolveOptions(input = {}) {
  for (const key of Object.keys(input))
    if (!(key in defaults)) throw new Error(`Unknown option: ${key}`)
  const value = { ...defaults, ...input }
  for (const key of booleans) {
    if (value[key] === 'true') value[key] = true
    if (value[key] === 'false') value[key] = false
    if (typeof value[key] !== 'boolean')
      throw new Error(`${key} must be true or false`)
  }
  for (const [key, allowed] of Object.entries(enums))
    if (!allowed.includes(value[key]))
      throw new Error(`${key} must be one of: ${allowed.join(', ')}`)
  if (value.shadcn) value.tailwind = true
  if (value.authorization !== 'none' && value.authentication === 'none')
    throw new Error('authorization requires authentication')
  if (value.authorization === 'route' && !value.router)
    throw new Error('route authorization requires router')
  if (!value.router && value.layout === 'app-shell')
    throw new Error('app-shell requires router')
  const warnings =
    value.authentication !== 'none' && !value.apiClient
      ? ['authentication normally requires apiClient']
      : []
  return { options: value, warnings }
}
