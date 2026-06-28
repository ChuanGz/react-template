# Generator architecture

## Purpose and boundaries

This reference is for maintainers adding or changing a capability. The generator
is a build-time tool: generated applications do not depend on this repository at
runtime. Public option names, values, defaults, implications, warnings, and
conflict errors form the compatibility contract.

The pipeline has four stages:

1. `generator/options.mjs` parses only `--option=value` syntax and rejects
   malformed or duplicate flags.
2. `generator/validator.mjs` normalizes legacy input, validates every option,
   applies the documented shadcn implication, and rejects incompatible
   combinations.
3. `generator/index.mjs` selects capabilities and composes a deterministic
   in-memory file map from `templates/`. `generator/package-json.mjs` composes
   package ownership from the same capability boundaries.
4. `generator/writer.mjs` performs directory creation and file writes.

`generator/index.mjs` is the orchestration boundary. Compatibility re-exports
under `scripts/` and `src/` preserve the existing `generate(target, input)`,
option, parser, writer, and dependency-planner imports. New implementation code
must not be added to those wrappers.

```text
generator/                  orchestration, validation, and capability selection
├── capabilities/           one selection boundary per independent capability
├── index.mjs               orchestration and deterministic file-plan composition
├── options.mjs             CLI option parsing
├── package-json.mjs        dependency ownership and package plan
├── validator.mjs           defaults, implications, and conflicts
└── writer.mjs              filesystem boundary

templates/                  generated file content grouped by ownership
├── base/
├── router/
├── forms/
├── table/
├── charts/
└── localization/

tests/                      option, generator, generated-app, and E2E contracts
```

## Capability ownership rule

Each capability owns its dependencies, generated files, configuration
fragments, and tests. Selection logic belongs under `generator/capabilities/`;
generated file content belongs under `templates/`. Template emitters return file
entries and do not know the target path. Shared application templates remain in
the base template only when their output depends on several capabilities.

Current capability boundaries are deliberately small:

- `generator/capabilities/` selects router, forms, table, charts, and
  localization templates at their independent option boundaries;
- `templates/base/` owns the package manifest, build configuration, HTML,
  application bootstrap, base CSS, and layout scaffold;
- `templates/api/` owns API-client, mock, environment-validation, model, and
  query artifacts;
- `templates/auth/` owns authentication and authorization artifacts;
- `templates/router/` and `templates/tailwind/` own their dependency and
  bootstrap fragments;
- `templates/forms/`, `templates/table/`, `templates/charts/`, and
  `templates/localization/` own their generated feature artifacts;
- `templates/ui/`, `templates/testing/`, `templates/resilience/`, and
  `templates/presentation/` own their corresponding generated artifacts;
- `templates/strategies/` owns mutually exclusive state, date, utility, and
  realtime implementations;
- `templates/extended/` owns upload, reusable-component, and page-template
  artifacts that do not yet require separate selection logic.

Split a capability again when it gains an independent option, dependency
lifecycle, or integration boundary. Do not create one file per trivial template
when those templates always change and validate together.

When adding an option:

1. Add its default and validator to `generator/validator.mjs`.
2. Add explicit conflict rules only for combinations that cannot produce a
   correct application. Do not silently rewrite user intent.
3. Add dependency ownership to `generator/package-json.mjs`; runtime packages
   belong in `dependencies`, while build and test tools belong in
   `devDependencies`.
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
