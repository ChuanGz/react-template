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

## M4 — Enterprise Features

Add optional data fetching, tables, forms, validation, charts, file upload,
themes, localization, reusable components, and common page templates.

## M5 — Production Readiness

Validate unit, component, and end-to-end testing; CI; containers; linting and
formatting; bundle behavior; security; accessibility; and production builds.

## M6 — Documentation and Adoption

Publish adoption, option, structure, component, testing, and deployment guides;
sample pages; release documentation; and the first stable release.
