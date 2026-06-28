import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createFilePlan } from '../generator/index.mjs'
import { resolveOptions } from '../generator/validator.mjs'

test('generated application manifest matches selected capabilities', () => {
  const { options } = resolveOptions({
    forms: true,
    table: false,
    charts: true,
    localization: false,
  })
  const files = createFilePlan('my-app', options)
  const manifest = JSON.parse(files.get('package.json'))

  assert.equal(manifest.name, 'my-app')
  assert.equal(manifest.dependencies['react-hook-form'], '^7.80.0')
  assert.equal(manifest.dependencies.recharts, '^3.9.0')
  assert.equal(manifest.dependencies['@tanstack/react-table'], undefined)
  assert.equal(manifest.dependencies.i18next, undefined)
  assert.ok(files.has('src/components/ExampleForm.tsx'))
  assert.ok(files.has('src/components/SimpleChart.tsx'))
  assert.ok(!files.has('src/components/DataTable.tsx'))
  assert.ok(!files.has('src/lib/i18n.ts'))
})
