# React Template

A minimal React, TypeScript, and Vite template with an option contract that
generates only selected capabilities. The project avoids unused dependencies,
unused source code, and forced frontend architecture.

## Status

Version `1.0.0` provides the stable generator contract. Generated applications
remain application-owned and should be reviewed against their deployment needs.

## Generate an application

```bash
npm run generate -- my-app --tailwind=true --shadcn=true
```

Flags use `--option=value`; omitted options use the documented defaults. See
the [option contract](docs/engineering/OPTION_CONTRACT.md) for all values and
validation rules.

## Documentation

- Start with the [documentation index](docs/README.md).
- Follow the [getting-started guide](docs/GETTING_STARTED.md).
- Review [capabilities](docs/CAPABILITIES.md) and
  [testing and deployment](docs/TESTING_AND_DEPLOYMENT.md).
- Use the [engineering standards](docs/engineering/README.md) for normative
  project contracts.

## Design direction

- React, TypeScript, and Vite form the minimal core.
- Routing, API access, styling, UI systems, authentication, and authorization
  are explicit options.
- Disabled options contribute no dependencies, configuration, source, or tests.
- Invalid option combinations fail generation instead of producing partial code.

See the eight-milestone [roadmap](ROADMAP.md) for delivery scope.

## Contributing and support

- Read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing changes.
- Report vulnerabilities according to [SECURITY.md](SECURITY.md).
- Use [SUPPORT.md](SUPPORT.md) for usage questions.
- Project behavior is governed by the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

Licensed under the [MIT License](LICENSE).
