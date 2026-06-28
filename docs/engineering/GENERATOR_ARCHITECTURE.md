# Generator architecture

## Purpose and boundaries

This reference is for maintainers adding or changing a capability. The generator
is a build-time tool: generated applications do not depend on this repository at
runtime. Public option names, values, defaults, implications, warnings, and
conflict errors form the compatibility contract.

The pipeline has four stages:

1. `scripts/parser.mjs` parses only `--option=value` syntax and rejects
   malformed or duplicate flags.
2. `scripts/validator.mjs` normalizes legacy input, validates every option, applies the
   documented shadcn implication, and rejects incompatible combinations.
3. `scripts/generator.mjs` composes a deterministic in-memory file map from
   modules under `scripts/capabilities/`. `scripts/dependencies.mjs` composes
   package ownership from the same capability boundaries.
4. `scripts/writer.mjs` performs directory creation and file writes.

`scripts/index.mjs` is the orchestration boundary. Compatibility re-exports
under `src/` preserve the existing `generate(target, input)`, option, parser,
writer, and dependency-planner imports.

## Capability ownership rule

Each capability owns its dependencies, generated files, configuration
fragments, and tests. Strategy capabilities are implemented as small generators
under `scripts/capabilities/`; they return file entries and do not know the
target path. Shared application templates remain in the file-plan builder when
their output depends on several capabilities.

Current capability boundaries are deliberately small:

- `router.mjs` owns router dependency and bootstrap composition;
- `auth.mjs` owns authentication and authorization files;
- `tailwind.mjs` owns Tailwind packages and Vite/CSS fragments;
- `api.mjs` owns API client, mocks, environment validation, models, and query;
- `base.mjs` owns only the package, build configuration, HTML, application
  bootstrap, base CSS, and layout scaffold;
- `ui.mjs` owns theme and selected UI-library artifacts;
- `testing.mjs` owns unit, component, and E2E test artifacts;
- `extended.mjs` owns localization, table, form, chart, upload, reusable
  component, and page-template artifacts;
- `presentation.mjs` owns notification and icon presentation helpers;
- `strategies.mjs` owns mutually exclusive state, date, utility, and realtime
  implementations.

Split a capability again when it gains an independent option, dependency
lifecycle, or integration boundary. Do not create one file per trivial template
when those templates always change and validate together.

When adding an option:

1. Add its default and validator to `scripts/validator.mjs`.
2. Add explicit conflict rules only for combinations that cannot produce a
   correct application. Do not silently rewrite user intent.
3. Add dependency ownership to `dependencies.mjs`; runtime packages belong in
   `dependencies`, build and test tools in `devDependencies`.
4. Add capability templates without filesystem side effects.
5. Test every value, enabled output, disabled absence, dependency ownership, and
   at least one supported combination.
6. Update the option contract, capability matrix, changelog, and migration notes
   when output or compatibility changes.

## Validation and failure modes

Generation must fail before writing when an option is unknown, malformed, or
in conflict. A disabled capability must leave no package, file, import, script,
empty directory, or comment. CI validates default, minimal, and maximal fixtures;
targeted contract tests cover combinations that the fixture matrix cannot
exhaustively enumerate.

The generator does not merge into existing applications or remove stale files.
Generate into an empty directory when comparing output across releases.
