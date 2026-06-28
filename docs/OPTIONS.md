# Choose CLI options

Pass options after the target directory using `--option=value`. Omitted options
use defaults. Boolean values must be `true` or `false`.

```bash
pnpm run generate -- react-app \
  --uiLibrary=shadcn \
  --authentication=oidc \
  --authorization=route \
  --testing=component \
  --query=true \
  --forms=true \
  --apiModels=true
```

The complete value/default table and validation rules live in the normative
[option contract](engineering/OPTION_CONTRACT.md).

## Option reference

| Option | Meaning and usage |
| ------ | ----------------- |
| `router=true|false` | Adds client-side routing and route bootstrap. Disable it for a single-screen application. |
| `apiClient=true|false` | Adds the API client and service boundary. Disable it when the application has no remote API or supplies its own client. |
| `tailwind=true|false` | Adds Tailwind dependencies and configuration. It is enabled automatically by `uiLibrary=shadcn`. |
| `uiLibrary=none|shadcn|antd|mui` | Selects one optional UI-library integration. `none` keeps the baseline library-neutral; `shadcn` is the recommended default when a UI library is needed. |
| `theme=none|light-dark` | `light-dark` adds theme state and switching. `none` leaves theme behavior to the application. |
| `authentication=none|jwt|oidc` | Selects an identity baseline. Use `jwt` for token-based application authentication or `oidc` for an OpenID Connect provider. |
| `authorization=none|route|permission` | Selects client-side access-control scaffolding. `route` guards navigation; `permission` provides permission-based checks. This is not a server-side security boundary. |
| `layout=none|basic|app-shell` | Selects application composition. `none` emits no shared layout, `basic` provides a minimal layout, and `app-shell` provides a routed application shell. |
| `errorBoundary=true|false` | Adds a render-failure boundary so unexpected component errors have a controlled fallback. |
| `loadingState=true|false` | Adds the shared loading-state baseline used by asynchronous UI. |
| `envValidation=true|false` | Adds startup validation for required runtime environment values. |
| `testing=none|unit|component` | Selects the generated testing baseline. `none` emits no test setup; `unit` configures isolated logic tests; `component` includes component rendering and interaction tests. |
| `query=true|false` | Adds TanStack Query provider and client setup for server-state fetching and caching. |
| `table=true|false` | Adds a reusable TanStack Table baseline for headless table behavior. |
| `forms=true|false` | Adds React Hook Form and Zod setup for form state and schema validation. |
| `localization=true|false` | Adds i18next initialization for translated content and locale handling. |
| `charts=true|false` | Adds a Recharts baseline chart for data-visualization work. |
| `fileUpload=true|false` | Adds an accessible native file-upload control without defining storage or backend behavior. |
| `reusableComponents=true|false` | Adds the shared reusable-component baseline, currently including an empty state. |
| `pageTemplates=true|false` | Adds list and detail page composition as starting structures, without domain-specific behavior. |
| `apiModels=true|false` | Adds shared response, pagination, and error contracts for typed API integration. |

Every optional capability owns its dependencies, source files, configuration,
and tests. Selecting one option must not generate artifacts for another option.

## Important combinations

- `uiLibrary=shadcn` automatically enables Tailwind.
- Authorization requires an authentication strategy.
- Route authorization requires the router.
- `app-shell` requires the router.
- Authentication without an API client is allowed but emits a warning.

## Isolation guarantee

A disabled option must add no owned dependency, source file, configuration, or
test. Do not install optional packages preemptively; regenerate with the option
enabled or add the capability explicitly in the resulting application.
