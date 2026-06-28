import { test } from 'node:test' // Public option validation contract.
import assert from 'node:assert/strict'
import { parseOptionFlags } from '../src/cli/parse-options.mjs'
import { createDependencyPlan } from '../src/generator/dependencies.mjs'
import {
  booleanOptions,
  conflictRules,
  defaults,
  enumOptions,
  resolveOptions,
} from '../src/options.mjs'

test('every public option has one validator', () => {
  const validated = [...booleanOptions, ...Object.keys(enumOptions)].sort()
  assert.deepEqual(validated, Object.keys(defaults).sort())
})

for (const [option, values] of Object.entries(enumOptions)) {
  test(`${option} accepts every documented value and rejects other values`, () => {
    for (const value of values) {
      const prerequisites =
        option === 'authorization' && value !== 'none'
          ? { authentication: 'jwt' }
          : {}
      assert.equal(
        resolveOptions({ ...prerequisites, [option]: value }).options[option],
        value,
      )
    }
    assert.throws(() => resolveOptions({ [option]: '__invalid__' }), option)
  })
}

for (const option of booleanOptions) {
  test(`${option} accepts booleans and CLI boolean strings`, () => {
    for (const value of [true, false, 'true', 'false'])
      assert.equal(
        typeof resolveOptions({ [option]: value }).options[option],
        'boolean',
      )
    assert.throws(() => resolveOptions({ [option]: 'yes' }), option)
  })
}

test('every declared conflict produces its actionable error', () => {
  const inputs = [
    { authorization: 'permission' },
    { authentication: 'jwt', authorization: 'route', router: false },
    { router: false, layout: 'app-shell' },
  ]
  assert.equal(inputs.length, conflictRules.length)
  inputs.forEach((input, index) =>
    assert.throws(
      () => resolveOptions(input),
      new RegExp(conflictRules[index].message),
    ),
  )
})

test('CLI parser rejects malformed and duplicate flags', () => {
  assert.deepEqual(parseOptionFlags(['--testing=e2e', '--router=false']), {
    testing: 'e2e',
    router: 'false',
  })
  assert.throws(() => parseOptionFlags(['testing=e2e']), /expected/)
  assert.throws(
    () => parseOptionFlags(['--testing=unit', '--testing=e2e']),
    /Duplicate/,
  )
})

test('dependency plan separates runtime and development ownership', () => {
  const minimal = createDependencyPlan(
    resolveOptions({
      router: false,
      apiClient: false,
      icons: 'none',
      dateTime: 'none',
      utilities: 'none',
      layout: 'none',
      errorBoundary: false,
      loadingState: false,
      envValidation: false,
      testing: 'none',
    }).options,
  )
  assert.deepEqual(Object.keys(minimal.dependencies).sort(), [
    'react',
    'react-dom',
  ])
  assert.equal(minimal.devDependencies.vitest, undefined)

  const max = createDependencyPlan(
    resolveOptions({
      state: 'zustand',
      uiLibrary: 'shadcn',
      dateTime: 'dayjs',
      utilities: 'lodash',
      testing: 'e2e',
      mockApi: true,
      realtime: 'signalr',
      query: true,
      table: true,
      forms: true,
      localization: true,
      charts: true,
    }).options,
  )
  for (const dependency of [
    'zustand',
    'dayjs',
    'lodash',
    'msw',
    '@microsoft/signalr',
    '@tanstack/react-query',
    '@tanstack/react-table',
    'react-hook-form',
    'i18next',
    'recharts',
  ])
    assert.ok(max.dependencies[dependency], dependency)
  for (const dependency of [
    'typescript',
    'tailwindcss',
    'vitest',
    '@playwright/test',
    '@types/lodash',
  ])
    assert.ok(max.devDependencies[dependency], dependency)
})
