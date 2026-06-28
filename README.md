# React Template

A minimal React, TypeScript, and Vite template with an option contract that
generates only selected capabilities. The project avoids unused dependencies,
unused source code, and forced frontend architecture.

## Status

The repository foundation is available. The application generator and its
option contract are planned but not implemented yet. Do not use this repository
as a production starter until the first stable release.

## Design direction

- React, TypeScript, and Vite form the minimal core.
- Routing, API access, styling, UI systems, authentication, and authorization
  are explicit options.
- Disabled options contribute no dependencies, configuration, source, or tests.
- Invalid option combinations fail generation instead of producing partial code.

See the [roadmap](ROADMAP.md) for milestone scope.

## Contributing and support

- Read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing changes.
- Report vulnerabilities according to [SECURITY.md](SECURITY.md).
- Use [SUPPORT.md](SUPPORT.md) for usage questions.
- Project behavior is governed by the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

Licensed under the [MIT License](LICENSE).
