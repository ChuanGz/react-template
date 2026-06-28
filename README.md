# React Template

A minimal React, TypeScript, and Vite template with an option contract that
generates only selected capabilities. The project avoids unused dependencies,
unused source code, and forced frontend architecture.

## Status

The M3 application generator is available for validation. The project remains
pre-release; review generated output before production adoption.

## Generate an application

```bash
npm run generate -- my-app --tailwind=true --shadcn=true
```

Flags use `--option=value`; omitted options use the documented defaults. See
the [option contract](docs/engineering/OPTION_CONTRACT.md) for all values and
validation rules.

## Design direction

- React, TypeScript, and Vite form the minimal core.
- Routing, API access, styling, UI systems, authentication, and authorization
  are explicit options.
- Disabled options contribute no dependencies, configuration, source, or tests.
- Invalid option combinations fail generation instead of producing partial code.

See the [engineering standards](docs/engineering/README.md) for normative M2
contracts and the [roadmap](ROADMAP.md) for milestone scope.

## Contributing and support

- Read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing changes.
- Report vulnerabilities according to [SECURITY.md](SECURITY.md).
- Use [SUPPORT.md](SUPPORT.md) for usage questions.
- Project behavior is governed by the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

Licensed under the [MIT License](LICENSE).
