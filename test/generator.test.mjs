import { test } from 'node:test'
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
  const result = await generate(root, { router: false, apiClient: false, layout: 'none', errorBoundary: false, loadingState: false, envValidation: false, testing: 'none' })
  assert(!result.files.some((file) => /apiClient|ErrorBoundary|LoadingState|env|test/.test(file)))
})

test('shadcn enables tailwind and invalid authorization fails', () => {
  assert.equal(resolveOptions({ shadcn: true }).options.tailwind, true)
  assert.throws(() => resolveOptions({ authorization: 'permission' }), /requires authentication/)
})

test('component test output configures Vitest and router context', async () => {
  const root = await mkdtemp(join(tmpdir(), 'react-template-'))
  await generate(root, { testing: 'component' })
  const testFile = await readFile(join(root, 'src/App.test.tsx'), 'utf8')
  assert.match(testFile, /jest-dom\/vitest/)
  assert.match(testFile, /MemoryRouter/)
  assert.match(testFile, /import \{ expect,test \} from 'vitest'/)
})
