# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project intends to follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

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

### Fixed

- Generated component tests now configure Vitest matchers and router context,
  allowing max-option projects to build and test successfully.

[Unreleased]: https://github.com/ChuanGz/react-template/commits/main
