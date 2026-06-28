# Compatibility policy

This policy defines how maintainers update runtime versions, library versions,
and generator options without turning upgrades into unplanned repository-wide
changes.

## Common maintenance use cases

### Update a dependency within a supported version line

Update the repository manifest, lockfile, generated manifest, and affected
documentation together. Run repository quality checks and the generated default,
minimal, and max-option build matrix. A version change is not complete while
generated output or CI still references the previous contract.

### Update React or React DOM

React and React DOM must use the same major and minor version, for example
`19.2.x` with `19.2.x`. Do not combine version lines such as React `19.2.x` with
React DOM `19.1.x`. Patch versions may differ only when both packages declare
that combination compatible and the generated-project matrix passes.

### Add, rename, or remove an option

Options represent application capabilities, not implementation details. Add a
new option with an explicit default, isolation tests, generated-build coverage,
and user documentation. Renaming or removing an option requires a deprecation
path and migration note. Changing a default is a breaking change unless it has
no observable effect on generated output.

### Adopt a new React major version

React 20, React 21, and later major versions are **Not Supported** when first
released. They become **Supported** only after maintainers complete a
compatibility review, validate repository and generated-project CI, and publish
migration notes. A new React major must not become the template default before
those gates pass.

The review must cover React and React DOM alignment, TypeScript types, Vite,
testing tools, supported UI libraries, generated APIs, deprecated behavior, and
required application changes. If generated output changes incompatibly, adopt
the new default in a major template release.

## Support matrix

| Technology | Supported versions                   | Policy                                                       |
| ---------- | ------------------------------------ | ------------------------------------------------------------ |
| Node.js    | `20 >=20.19`, `22 >=22.13`, and `24` | Even-numbered maintained LTS lines only. CI uses Node.js 24. |
| React      | `19.2.x`                             | Current supported and default line.                          |
| React DOM  | `19.2.x`                             | Must remain major/minor aligned with React.                  |

Odd-numbered Node.js releases and Node.js versions below the listed floors are
**Not Supported**. Generated package manifests declare the runtime floor; this
matrix defines the narrower maintenance and CI commitment.

## Status definitions

| Status            | Meaning                                                                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Supported**     | Covered by CI and documentation. Regressions are maintained and eligible for fixes.                                                                                   |
| **Deprecated**    | Still usable during a documented migration window, but no longer recommended for new projects. Removal requires migration notes and the appropriate breaking release. |
| **Obsolete**      | Removed from active CI and current generated output. No fixes or compatibility guarantees are provided.                                                               |
| **Not Supported** | Outside the validated contract or not yet approved. It may work, but maintainers make no compatibility commitment.                                                    |

## Migration and release rules

- Patch releases may fix output without changing valid option meaning.
- Minor releases may add optional capabilities with backward-compatible defaults.
- Removing an option, changing an observable default, or invalidating a valid
  combination requires a major release and migration notes.
- Every migration note must identify affected users, old and new configuration,
  required code changes, validation commands, and rollback guidance.
- Deprecated behavior must remain tested until its documented removal release.

The deprecated `shadcn=true|false` input remains a compatibility alias for
`uiLibrary=shadcn|none`. New projects must use `uiLibrary`. Removing the alias
requires a major release and migration notes.

## Build-tool boundary

Vite is the supported build tool. Webpack is **Not Supported** because carrying
both would duplicate environment, asset, development-server, plugin, testing,
and documentation contracts. Projects constrained to Webpack may reuse general
conventions, but their configuration is outside this template's support policy.
