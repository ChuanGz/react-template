# Prepare releases and migrations

## Package strategy

Current decision: this is a repository-distributed template with an unpublished
CLI (`package.json` has `private: true`), not an npm CLI product. Users generate
applications from an approved checkout or release tag. GitHub tags and releases
are the distribution and audit boundary; the CLI `bin` entry remains available
for local execution and future packaging evaluation. Repository visibility is
an owner decision and is independent of npm's `private` package flag.

Publishing the CLI later is a separate architecture decision. It requires
removing `private`, defining the npm package contents, testing `npm pack` and a
clean install, establishing package provenance and ownership, and documenting
support and deprecation expectations. A normal template release must not
silently make that change.

## Release gate

A release candidate requires:

1. Repository quality, Markdown, generated matrix, container, production smoke,
   accessibility, bundle, and dependency checks passing on `main`.
2. Option defaults and compatibility changes recorded in the changelog.
3. Generated default, minimal, and max fixtures reviewed for unexpected files.
4. A version chosen using Semantic Versioning after `1.0.0`.

## Release procedure

1. Update `CHANGELOG.md`, migration notes, and `package.json` version in one pull
   request. Regenerate the lockfile if package metadata changes it.
2. Wait for all required CI jobs on the release commit: repository lint/tests,
   generated typecheck/build/tests, production smoke, bundle budget,
   accessibility E2E, audit, and container build.
3. Create and push an annotated `vX.Y.Z` tag matching `package.json` exactly.
4. The release workflow reruns quality checks and a generated fixture before it
   creates the GitHub release. A version mismatch or failed fixture blocks the
   release.
5. Verify the release notes identify option-contract and dependency changes.

Do not reuse or move a published tag. Fix a failed release with a new patch
version so consumers can identify the exact generator revision.

## Migration notes

Generated applications are not automatically rewritten when this repository is
upgraded. For a breaking option or output change, release notes must identify:

- affected options and generated files;
- dependency version changes;
- required manual edits;
- a build/test command that proves migration success.

Compare the changelog and regenerate into a temporary directory to understand
output changes before applying them to an existing application.
