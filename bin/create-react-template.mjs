#!/usr/bin/env node
import { generate } from '../generator/index.mjs'
import { parseOptionFlags } from '../generator/options.mjs'

const [target = 'react-app', ...flags] = process.argv.slice(2)
try {
  const options = parseOptionFlags(flags)
  await generate(target, options)
  console.log(`Generated ${target}`)
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}
