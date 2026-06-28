# Roadmap

The milestones are sequential decision gates. Scope may change through reviewed
issues; a milestone is complete only when its deliverable is verifiable.

## M1 — Repository Foundation

Establish an OSS-quality repository: license, project and governance documents,
GitHub contribution templates, Markdown lint, and link validation.

## M2 — Engineering Standards

Define template philosophy, option and compatibility contracts, project and
folder structure, and conventions for components, routing, styling, testing,
and documentation before application implementation.

Status: complete. The normative contracts are indexed in the
[engineering standards](docs/engineering/README.md).

## M3 — Application Foundation

Implement a minimal React, TypeScript, and Vite core. Generate routing, API
access, styling, UI systems, layout, authentication, authorization, environment
validation, error handling, loading behavior, and tests only when selected by
the option contract.

Status: implemented as a pre-release generator with contract tests.

## M4 — Engineering Tooling

Add ESLint, Prettier, GitHub Actions CI, Docker, a production build matrix, and
automated option-isolation validation. This milestone establishes repeatable
engineering checks before expanding application capabilities.

Status: implemented with repository quality checks and generated-project CI
coverage for default, minimal, and max-option configurations.

## M5 — Production Readiness

Validate unit, component, and end-to-end testing; bundle limits; dependency and
security controls; accessibility; runtime error reporting boundaries; and
production deployment behavior.

Status: implemented with production smoke and accessibility tests, bundle and
dependency gates, startup environment validation, and observable error handling.

## M6 — Extended Application Capabilities

Add optional TanStack Query, TanStack Table, React Hook Form with Zod, themes,
localization, charts, file upload, reusable components, page templates, and API
contracts such as base response, pagination, and error models. Every capability
must preserve dependency and source isolation when disabled.

Status: implemented as isolated, opt-in generator capabilities with default
absence and max-option build coverage.

## M7 — Documentation and Adoption

Publish getting-started, CLI, option, structure, component, testing, deployment,
capability, sample-application, release, and migration documentation. Validate
that users can generate and extend projects without reading generator internals.

## M8 — Polished Base UI

Polish the generated base UI across supported styling choices with consistent
typography, spacing, responsive behavior, navigation, forms, and empty, loading,
error, and permission states. Preserve accessibility and ensure polish does not
turn optional styling or application architecture into mandatory core. Complete
final visual validation and prepare the first stable release.
