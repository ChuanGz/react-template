import { test } from 'node:test' // Generator output contract tests.
import assert from 'node:assert/strict'
import { mkdtemp, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { generate } from '../src/generate.mjs'
import { resolveOptions } from '../src/options.mjs'

test('default output includes defaults and omits optional styling', async () => {
  const root = await mkdtemp(join(tmpdir(), 'react-template-'))
  const result = await generate(root)
  assert(result.files.includes('src/lib/apiClient.ts'))
  assert(!result.files.includes('src/components/ui/Button.tsx'))
  const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
  assert(!pkg.devDependencies.tailwindcss)
})

test('disabled capabilities leave no owned files', async () => {
  const root = await mkdtemp(join(tmpdir(), 'react-template-'))
  const result = await generate(root, {
    router: false,
    apiClient: false,
    layout: 'none',
    errorBoundary: false,
    loadingState: false,
    envValidation: false,
    testing: 'none',
  })
  assert(
    !result.files.some((file) =>
      /apiClient|ErrorBoundary|LoadingState|env|test/.test(file),
    ),
  )
})

test('shadcn enables tailwind and invalid authorization fails', () => {
  assert.equal(resolveOptions({ uiLibrary: 'shadcn' }).options.tailwind, true)
  assert.throws(
    () => resolveOptions({ authorization: 'permission' }),
    /requires authentication/,
  )
})

test('legacy shadcn option remains compatible with a warning', () => {
  const result = resolveOptions({ shadcn: true })
  assert.equal(result.options.uiLibrary, 'shadcn')
  assert.equal(result.options.tailwind, true)
  assert.match(result.warnings[0], /deprecated/)
})

test('new application capabilities are isolated and selectable', async () => {
  const root = await mkdtemp(join(tmpdir(), 'react-template-'))
  const result = await generate(root, {
    state: 'zustand',
    uiLibrary: 'mui',
    icons: 'none',
    notifications: true,
    mockApi: true,
  })
  const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
  assert.equal(pkg.dependencies.zustand !== undefined, true)
  assert.equal(pkg.dependencies['@mui/material'] !== undefined, true)
  assert.equal(pkg.dependencies['lucide-react'], undefined)
  for (const file of [
    'src/state/appStore.ts',
    'src/components/notifications.ts',
    'src/mocks/browser.ts',
    'src/components/ui/Button.tsx',
  ])
    assert(result.files.includes(file))
})

test('component test output configures Vitest and router context', async () => {
  const root = await mkdtemp(join(tmpdir(), 'react-template-'))
  await generate(root, { testing: 'component' })
  const testFile = await readFile(join(root, 'src/App.test.tsx'), 'utf8')
  assert.match(testFile, /jest-dom\/vitest/)
  assert.match(testFile, /MemoryRouter/)
  assert.match(testFile, /import \{ expect,test \} from 'vitest'/)
})

test('e2e testing includes component tests and Playwright', async () => {
  const root = await mkdtemp(join(tmpdir(), 'react-template-'))
  const result = await generate(root, { testing: 'e2e' })
  const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
  assert(result.files.includes('src/App.test.tsx'))
  assert(result.files.includes('playwright.config.ts'))
  assert(result.files.includes('e2e/app.spec.ts'))
  assert.equal(pkg.scripts['test:e2e'], 'playwright test')
})

test('date, utilities, and realtime strategies stay isolated', async () => {
  const root = await mkdtemp(join(tmpdir(), 'react-template-'))
  const result = await generate(root, {
    dateTime: 'dayjs',
    utilities: 'lodash',
    realtime: 'signalr',
  })
  const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
  assert(pkg.dependencies.dayjs)
  assert(pkg.dependencies.lodash)
  assert(pkg.dependencies['@microsoft/signalr'])
  assert.equal(pkg.dependencies['date-fns'], undefined)
  for (const file of [
    'src/lib/dateTime.ts',
    'src/lib/utilities.ts',
    'src/lib/realtime.ts',
  ])
    assert(result.files.includes(file))
})

test('disabled options do not add owned dependencies', async () => {
  const root = await mkdtemp(join(tmpdir(), 'react-template-'))
  await generate(root, {
    router: false,
    apiClient: false,
    tailwind: false,
    layout: 'none',
    envValidation: false,
    testing: 'none',
  })
  const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
  const dependencies = { ...pkg.dependencies, ...pkg.devDependencies }
  for (const name of ['react-router-dom', 'tailwindcss', 'zod', 'vitest']) {
    assert.equal(dependencies[name], undefined)
  }
})

test('environment validation runs during bootstrap', async () => {
  const root = await mkdtemp(join(tmpdir(), 'react-template-'))
  await generate(root)
  const main = await readFile(join(root, 'src/main.tsx'), 'utf8')
  assert.match(main, /import '.\/lib\/env'/)
})

test('application layouts provide a main landmark', async () => {
  const root = await mkdtemp(join(tmpdir(), 'react-template-'))
  await generate(root, { layout: 'app-shell' })
  const layout = await readFile(join(root, 'src/app/Layout.tsx'), 'utf8')
  assert.match(layout, /<main id="main-content" className="app-shell">/)
})

test('base UI includes responsive and accessible interaction states', async () => {
  const root = await mkdtemp(join(tmpdir(), 'react-template-'))
  await generate(root, { theme: 'light-dark' })
  const css = await readFile(join(root, 'src/index.css'), 'utf8')
  const layout = await readFile(join(root, 'src/app/Layout.tsx'), 'utf8')
  assert.match(css, /prefers-reduced-motion/)
  assert.match(css, /:focus-visible/)
  assert.match(layout, /Skip to Content/)
})

test('M6 capabilities remain absent by default', async () => {
  const root = await mkdtemp(join(tmpdir(), 'react-template-'))
  const result = await generate(root)
  assert(
    !result.files.some((file) =>
      /DataTable|ExampleForm|SimpleChart|FileUpload|ListPage|apiModels/.test(
        file,
      ),
    ),
  )
})

test('M6 capabilities emit only when selected', async () => {
  const root = await mkdtemp(join(tmpdir(), 'react-template-'))
  const result = await generate(root, {
    query: true,
    table: true,
    forms: true,
    localization: true,
    charts: true,
    fileUpload: true,
    reusableComponents: true,
    pageTemplates: true,
    apiModels: true,
  })
  for (const file of [
    'src/lib/queryClient.ts',
    'src/components/DataTable.tsx',
    'src/components/ExampleForm.tsx',
    'src/components/SimpleChart.tsx',
    'src/components/FileUpload.tsx',
    'src/components/EmptyState.tsx',
    'src/pages/ListPage.tsx',
    'src/lib/apiModels.ts',
  ])
    assert(result.files.includes(file))
})
