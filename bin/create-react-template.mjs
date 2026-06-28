#!/usr/bin/env node
import { generate } from '../src/generate.mjs'

const [target = 'react-app', ...flags] = process.argv.slice(2)
const entries = flags.map((flag) => flag.replace(/^--/, '').split('='))
try {
  const options = Object.fromEntries(entries)
  await generate(target, options)
  console.log(`Generated ${target}`)
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}
