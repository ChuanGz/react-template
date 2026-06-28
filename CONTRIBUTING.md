# Contributing

## Before opening a change

Use GitHub Discussions for support questions and an issue for a reproducible
bug or scoped proposal. Search existing issues first. Security reports must use
the private process in [SECURITY.md](SECURITY.md).

## Pull requests

1. Create a focused branch from the default branch.
2. Keep the change within one stated problem.
3. Update documentation and tests affected by the change.
4. Run `npm run quality` and generate the configurations affected by the change.
5. Complete the pull request template and link the relevant issue.

Until application tooling is introduced, documentation changes must pass
Markdown lint and link validation in GitHub Actions.

Maintainers may request a design issue before accepting changes that alter the
template contract, generated structure, defaults, or compatibility policy.

## Generator changes

Options represent application capabilities, not implementation details. Keep
the public contract backward compatible unless a major release includes a
documented migration. A generator pull request must:

- separate parsing, validation, file planning, and filesystem writes;
- declare dependency and file ownership for each affected capability;
- prove enabled presence and disabled absence in tests;
- cover every new option value and incompatible combination;
- update the option contract, capability matrix, and changelog.

See the [generator architecture](docs/engineering/GENERATOR_ARCHITECTURE.md) for
extension points and failure rules.

By contributing, you agree that your contribution is licensed under the MIT
License and that you will follow the [Code of Conduct](CODE_OF_CONDUCT.md).
