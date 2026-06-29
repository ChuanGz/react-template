# Start small. Add only what the app earns

## An evidence-led white paper on option-driven React generation

React projects often begin with a starter that quietly chooses routing, styling,
state, testing, and application structure before the team has made those
decisions. This repository takes a narrower position: React, TypeScript, and
Vite are the fixed core; application capabilities are explicit choices.

The generator validates the complete option set before it writes files. A
disabled capability should leave behind no owned package, configuration, source,
test, empty directory, or explanatory comment. Invalid combinations fail early
instead of creating a partial application.

## Evidence snapshot

- 28 public options: 17 boolean options and 11 enumerated options.
- 47 repository tests passed on 30 June 2026.
- Three declared conflict rules have actionable error coverage.
- One automatic implication is intentional: `uiLibrary=shadcn` enables
  `tailwind=true`.
- A deliberately minimal configuration reduces runtime dependencies to React
  and ReactDOM.

These figures describe repository contracts and the current local test run.
They are not adoption, productivity, or production-performance metrics.

## The design move

The generator separates option parsing, validation, dependency planning,
capability templates, composition, and filesystem writing. Generated-project
verification remains an explicit user or CI step. The generator does not install
packages or certify the application for production.

This boundary matters. Generation can prove that selected artifacts are
consistent with a contract. It cannot decide whether an application's security,
deployment, data, or operational context is ready.

## Durable rules

1. Keep the core boring and small.
2. Treat absence as a feature worth testing.
3. Reject contradictions before writing files.
4. Let generated applications own their code.
5. Verify the artifact, not only the generator.

## Evidence map

- `README.md`: scope, status, flow, ownership, and production-readiness caveat.
- `docs/engineering/TEMPLATE_PHILOSOPHY.md`: core decision test and non-goals.
- `docs/engineering/OPTION_CONTRACT.md`: 28 options, validation rules, and
  capability isolation.
- `src/options.mjs`: executable defaults, validators, implications, and
  conflicts.
- `tests/generated-app.test.mjs`: selected capability manifest evidence.
- `tests/option-validation.test.mjs`: validator and conflict-rule coverage.
- Local command: `npm test` — 47 passed, 0 failed, 30 June 2026.
