# Prepare releases and migrations

## Release gate

A release candidate requires:

1. Repository quality, Markdown, generated matrix, container, production smoke,
   accessibility, bundle, and dependency checks passing on `main`.
2. Option defaults and compatibility changes recorded in the changelog.
3. Generated default, minimal, and max fixtures reviewed for unexpected files.
4. A version chosen using Semantic Versioning after `1.0.0`.

M8 owns final UI validation and the first stable release. M7 does not create a
release tag.

## Migration notes

Generated applications are not automatically rewritten when this repository is
upgraded. For a breaking option or output change, release notes must identify:

- affected options and generated files;
- dependency version changes;
- required manual edits;
- a build/test command that proves migration success.

Before `1.0.0`, compare the changelog and regenerate into a temporary directory
to understand output changes before applying them to an existing application.
