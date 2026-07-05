# Enhancement Plan

## Purpose

Extend the released generator from repository-tested quality to reproducible
public-package adoption and maintainable downstream use.

## Current evidence and gap

Version 1.0.0, explicit option conflicts, isolated generated capabilities, and
the full quality suite provide a strong baseline. The unresolved gaps are the
package-manager contract, clean-room use from a published artifact, and evidence
from a generated application maintained over time.

## Enhancement sequence

### E1 — Resolve the package-manager contract

- Choose the supported install and execution paths for npm and pnpm.
- Align README commands, lockfile policy, CI, and generated output.
- Test unsupported package managers with an actionable failure or an explicit
  non-support statement.

**Exit evidence:** every documented package-manager path generates, installs,
builds, tests, and runs in CI from a clean environment.

### E2 — Validate the published artifact

- Publish a versioned generator package through a reproducible workflow.
- Run default, minimal, and maximum generation from the package runner rather
  than repository source.
- Verify disabled dependencies and owned files are absent.
- Run build, unit tests, accessibility smoke checks, and preview deployment.

**Exit evidence:** all profiles pass from the released artifact and the workflow
records package identity, generated dependency tree, and deployment URL result.

### E3 — Run a clean-room adoption study

- Ask one engineer to use the default path and another to select routing, API,
  authentication, authorization, forms, table, and end-to-end testing.
- Require generation, one small feature change, tests, and preview deployment
  without reading generator internals.
- Convert undocumented choices and confusing errors into tracked fixes.

**Exit evidence:** both flows finish independently and every material adoption
failure has a recorded disposition.

### E4 — Prove a bounded upgrade strategy

- Keep a downstream fixture from release N.
- Upgrade it manually to N+1 using documented output changes.
- Record conflicts, security-sensitive decisions, time, and rollback steps.

**Exit evidence:** the fixture passes before and after upgrade, and documentation
clearly distinguishes supported migration guidance from unsupported automation.

## Measures

| Measure | Target |
|---|---|
| Documented package-manager paths passing end to end | 100% |
| Released-artifact generation profiles | 3 of 3 pass |
| Clean-room adoption flows | 2 of 2 complete |
| Disabled-capability residue | 0 |

## Non-goals

- Adding more UI capabilities before adoption evidence exists.
- Promising codemods or automatic regeneration-based upgrades.
- Calling a generated application production-ready without application review.

## Review trigger

Review after each release, package-manager support change, option-contract
change, or downstream migration exercise.
