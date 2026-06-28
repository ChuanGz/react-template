# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project intends to follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Capability options for client state, UI libraries, icons, notifications, and
  local API mocking, with isolated generated dependencies and source.
- Capability options for date/time helpers, standard or Lodash utilities,
  cumulative end-to-end testing, and realtime clients.
- Repository-local Markdown link validation in the quality gate.

### Changed

- Replaced the implementation-specific `shadcn` option with the capability-based
  `uiLibrary` option. The previous input remains as a deprecated compatibility
  alias.
- Declared the supported Node.js range as `^20.19.0 || >=22.13.0` in both the
  generator and generated projects.

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
