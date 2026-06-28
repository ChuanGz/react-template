# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project intends to follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Independent forms, table, charts, and localization capability/template
  boundaries plus a generated-application manifest contract test.
- Capability options for client state, UI libraries, icons, notifications, and
  local API mocking, with isolated generated dependencies and source.
- Capability options for date/time helpers, standard or Lodash utilities,
  cumulative end-to-end testing, and realtime clients.
- Repository-local Markdown link validation in the quality gate.
- Modular generator stages for CLI parsing, option validation, dependency and
  file planning, capability templates, and filesystem writes.
- Table-driven validation coverage for every public option and explicit
  conflict, plus dependency ownership tests.
- Tag-triggered release validation and GitHub release creation.

### Changed

- Separated canonical generator orchestration (`generator/`), generated file
  templates (`templates/`), and repository tests (`tests/`) while retaining
  compatibility re-exports for existing `scripts/` and `src/` imports.
- Replaced the implementation-specific `shadcn` option with the capability-based
  `uiLibrary` option. The previous input remains as a deprecated compatibility
  alias.
- Declared the supported Node.js range as `^20.19.0 || >=22.13.0` in both the
  generator and generated projects.
- Added a standalone generated-project typecheck script while preserving the
  existing build script behavior.
- Introduced scoped generator modules under `scripts/`, then moved the canonical
  implementation to `generator/` and `templates/`. Existing `scripts/` and
  `src/` imports remain compatibility re-exports.
- Split base, UI, testing, resilience, forms, table, charts, localization, and
  other capability templates into explicit ownership modules.

### Fixed

- Upgraded Markdown workflow actions from Node.js 20 to Node.js 24 runtimes.
- Added repository-local Markdown linting and configured release-scoped
  changelog headings so CI failures are caught before a pull request is pushed.

## [1.0.0] - 2026-06-28

### Added

- OSS repository governance and contribution documents.
- GitHub issue forms and pull request template.
- Automated Markdown lint and link validation workflows.
- M2 template philosophy, option contract, project conventions, and
  compatibility policy.
- Explicit Vite-only support note with Webpack outside the support contract.
- M3 CLI generator for the React, TypeScript, and Vite core with isolated
  routing, API, styling, UI, auth, layout, resilience, environment, and testing
  capabilities.
- Contract tests for defaults, disabled capability absence, implications, and
  invalid option combinations.
- M4 ESLint and Prettier quality gates, generated-project CI build matrix, and
  container build validation.
- Docker packaging for running the generator in an isolated Node environment.
- M5 browser smoke and accessibility tests, JavaScript bundle budget,
  dependency review, runtime environment startup validation, and observable
  error-boundary behavior.
- M6 opt-in query, table, form, localization, chart, upload, reusable component,
  page-template, and API-model capabilities.
- M7 task-oriented getting-started, option, capability, testing, deployment,
  release, and migration documentation.
- M8 responsive base UI, accessible semantic layout, focus and reduced-motion
  behavior, optional theme control, and polished shared states.

### Fixed

- Generated component tests now configure Vitest matchers and router context,
  allowing max-option projects to build and test successfully.

### Changed

- Expanded the roadmap to eight milestones: engineering tooling, production
  readiness, extended application capabilities, documentation and adoption,
  and final base-UI polish now have explicit delivery boundaries.

[Unreleased]: https://github.com/ChuanGz/react-template/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ChuanGz/react-template/releases/tag/v1.0.0
