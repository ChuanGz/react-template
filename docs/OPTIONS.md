# Choose CLI options

Pass options after the target directory using `--option=value`. Omitted options
use defaults. Boolean values must be `true` or `false`.

```bash
npm run generate -- enterprise-app \
  --shadcn=true \
  --authentication=oidc \
  --authorization=route \
  --testing=component \
  --query=true \
  --forms=true \
  --apiModels=true
```

The complete value/default table and validation rules live in the normative
[option contract](engineering/OPTION_CONTRACT.md).

## Important combinations

- `shadcn=true` automatically enables Tailwind.
- Authorization requires an authentication strategy.
- Route authorization requires the router.
- `app-shell` requires the router.
- Authentication without an API client is allowed but emits a warning.

## Isolation guarantee

A disabled option must add no owned dependency, source file, configuration, or
test. Do not install optional packages preemptively; regenerate with the option
enabled or add the capability explicitly in the resulting application.
