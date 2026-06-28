# Compatibility policy

## Supported core

The template supports React with TypeScript built by Vite. Exact version ranges
will be declared when M3 introduces the package manifest and are tested in CI
before a stable release.

## Build-tool support note

Webpack is not supported and is not an option. Supporting both Vite and Webpack
would split environment variables, asset handling, development servers, plugin
configuration, testing integration, and generated documentation. That cost does
not serve the template's minimal-core goal.

Projects with a Webpack constraint may reuse the documented conventions, but
their configuration and resulting output are outside this project's support
contract. Webpack support may be reconsidered after M6 only with demonstrated
demand, an isolated adapter design, and dedicated compatibility tests.

## Compatibility changes

- Patch releases may fix output without changing valid option meaning.
- Minor releases may add optional values with backward-compatible defaults.
- Removing an option, changing a default, or invalidating a previously valid
  combination requires a major release and migration guidance after `1.0.0`.

Before `1.0.0`, contracts may change, but every breaking change must be recorded
in the changelog and roadmap status.
