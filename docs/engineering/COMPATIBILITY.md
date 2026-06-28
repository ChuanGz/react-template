# Compatibility policy

## Supported core

The template supports React with TypeScript built by Vite on maintained Node.js
releases matching `^20.19.0 || >=22.13.0`. The repository CI uses Node.js 24.
Generated package manifests declare the same range so unsupported runtimes fail
early. React, Vite, TypeScript, and test-tool versions are pinned by generated
manifests and validated through the generated-project build matrix.

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

The deprecated `shadcn=true|false` input remains a compatibility alias for
`uiLibrary=shadcn|none`. New projects must use the capability-based
`uiLibrary` option. Removing the alias requires a major release.
