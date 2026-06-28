# Template philosophy

## Purpose

Provide a small, understandable React foundation that can generate selected
capabilities without leaving unused packages, configuration, source, or tests.

## Core and options

React, TypeScript, and Vite are the fixed core. Routing, API access, styling,
UI libraries, theme, authentication, authorization, layout, runtime safeguards,
and testing are capabilities selected through the option contract.

The generator must:

- produce a runnable project for every valid option combination;
- reject invalid combinations before writing files;
- omit every artifact owned exclusively by a disabled capability;
- prefer explicit generated code over hidden runtime abstraction;
- avoid prescribing dashboard, state-management, or domain architecture.

## Engineering principle

Prioritize long-term stability and maintainability over adopting the latest
tools and frameworks. Prefer mature, well-supported tooling; do not select
technology based on short-lived benchmarks or trends.

Options represent application capabilities, not implementation details. An
option must describe an outcome a generated application needs. Library and
framework names are values chosen behind that capability only when users must
make that choice explicitly.

## Package manager decision

pnpm is the primary package manager and template default. npm is supported.
Yarn and Bun are community-level options.

| Support level | Package manager |
| ------------- | --------------- |
| Primary       | pnpm            |
| Supported     | npm             |
| Community     | yarn            |
| Community     | bun             |

pnpm provides deterministic dependency resolution, fast installation,
disk-efficient storage, strict dependency management, excellent monorepo
support, a mature ecosystem, and enterprise-friendly workflows. Maintenance
must validate pnpm first and npm when package-manager compatibility is affected.
Yarn and Bun support may be improved through community contributions, provided
the primary and supported paths remain stable.

## UI library decision

The default recommendation is shadcn/ui with Radix UI and Tailwind CSS. Projects
own the generated components, avoiding vendor lock-in and enabling deep
customization. Accessible Radix primitives and the Tailwind ecosystem provide a
maintainable base for custom design systems while developing practical skills
in composition, accessibility, design tokens, controlled and uncontrolled
components, and component ownership.

Ant Design is a fully supported alternative for enterprise admin systems,
internal business tools, dashboards, CRUD-heavy applications, projects needing
many ready-made components, and teams prioritizing rapid delivery over
customization.

MUI is a fully supported alternative for corporate applications,
Material Design products, applications needing a comprehensive component
ecosystem, teams preferring strong conventions, and projects prioritizing
mature ecosystem support.

The template must not force a UI library. UI libraries are optional
capabilities, and `none` preserves the lightweight baseline. Generation must
include dependencies, source code, configuration, and tests only for the
selected library. Unused components and dependencies are prohibited.

Future maintenance must preserve capability isolation, accessibility, and the
`none` baseline. Upgrades must be assessed for migration cost, ecosystem
support, and generated-code ownership. Changing the default requires a
documented long-term maintenance advantage, not newer APIs, popularity, or
benchmark gains.

## Non-goals

The template is not a component framework, application generator for a specific
business domain, or compatibility layer for multiple build tools. Optional
capabilities may provide a baseline, but applications own their later design.

## Decision test

A proposed default belongs in the core only when nearly every generated React
application needs it and removing it would make the baseline unsafe or
non-runnable. Otherwise it must be optional or remain outside the template.
