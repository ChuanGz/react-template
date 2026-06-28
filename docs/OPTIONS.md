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

Each option controls a bounded set of generated dependencies, files,
configuration, and tests. Defaults produce a small but runnable application.

### Application foundation

| Option and default | Generated behavior | Choose a non-default value when |
| ------------------ | ------------------ | ------------------------------- |
| `router=true|false` (`true`) | `true` adds client-side route declarations and router bootstrap. `false` emits no routing dependency or route structure. | Use `false` for a single-screen application or when the project will install its own router. |
| `apiClient=true|false` (`true`) | `true` adds the HTTP client and service boundary. It does not define a backend API. | Use `false` for a client-only application or when another API client architecture already exists. |
| `layout=none|basic|app-shell` (`basic`) | `none` emits no shared layout; `basic` adds minimal page composition; `app-shell` adds routed application chrome. | Use `none` for full layout ownership. Use `app-shell` for multi-page application navigation; it requires routing. |
| `envValidation=true|false` (`true`) | `true` validates required runtime environment values at startup and reports invalid configuration early. | Use `false` only when the application has no runtime configuration or provides equivalent validation. |

### Styling and UI

| Option and default | Generated behavior | Choose a non-default value when |
| ------------------ | ------------------ | ------------------------------- |
| `tailwind=true|false` (`false`) | `true` adds Tailwind dependencies, configuration, and style entry points. `false` keeps plain CSS valid. | Use `true` when utility-first styling is desired. Selecting shadcn/ui enables it automatically. |
| `uiLibrary=none|shadcn|antd|mui` (`none`) | Generates integration, dependencies, components, and tests only for the selected library. `none` stays library-neutral. | Use `shadcn` for project-owned customizable components, `antd` for rapid enterprise and CRUD delivery, or `mui` for Material Design and convention-led corporate products. |
| `theme=none|light-dark` (`none`) | `light-dark` adds theme state, persistence, and switching; `none` emits no theme controller. | Use `light-dark` when both color modes are product requirements. It works without Tailwind through framework-neutral CSS. |
| `reusableComponents=true|false` (`false`) | `true` adds the shared component baseline, currently an accessible empty state. | Use `true` when the project wants common UI composition examples without selecting a full UI library. |

### Identity and access

| Option and default | Generated behavior | Choose a non-default value when |
| ------------------ | ------------------ | ------------------------------- |
| `authentication=none|jwt|oidc` (`none`) | `jwt` adds a token-based identity baseline; `oidc` adds an OpenID Connect baseline; `none` emits no identity code. | Use `jwt` for application-managed tokens or `oidc` for an external standards-based identity provider. Provider-specific production configuration remains application-owned. |
| `authorization=none|route|permission` (`none`) | `route` adds navigation guards; `permission` adds permission-checking primitives; `none` emits neither. | Enable only with authentication. Client authorization improves UX but never replaces server-side enforcement. |

### Runtime states and data

| Option and default | Generated behavior | Choose a non-default value when |
| ------------------ | ------------------ | ------------------------------- |
| `errorBoundary=true|false` (`true`) | `true` adds a controlled fallback for unexpected React render failures. | Use `false` only when the application supplies an equivalent top-level boundary. |
| `loadingState=true|false` (`true`) | `true` adds a shared, accessible loading-state baseline for asynchronous UI. | Use `false` when the application has its own loading-state system. |
| `query=true|false` (`false`) | `true` adds TanStack Query dependencies, provider, and client setup for remote server state. | Enable for cached fetching, synchronization, retries, or request-state management; it is unnecessary for purely local state. |
| `apiModels=true|false` (`false`) | `true` adds typed response, pagination, and error contracts. It does not generate endpoint-specific domain models. | Enable when the application consumes structured APIs and benefits from shared transport contracts. |

### Feature baselines

| Option and default | Generated behavior | Choose a non-default value when |
| ------------------ | ------------------ | ------------------------------- |
| `table=true|false` (`false`) | `true` adds a reusable TanStack Table baseline for headless table behavior, not a finished domain table. | Enable for sortable, filterable, or data-heavy views requiring application-owned presentation. |
| `forms=true|false` (`false`) | `true` adds React Hook Form and Zod setup for form state, validation, and typed schemas. | Enable for validated user input or multi-field workflows. |
| `localization=true|false` (`false`) | `true` adds i18next initialization and locale resources. Translation content and localization policy remain application-owned. | Enable when multiple languages or locale-aware content are requirements. |
| `charts=true|false` (`false`) | `true` adds Recharts and a baseline chart example. It does not define product analytics or visualization standards. | Enable when data visualization is part of the initial application scope. |
| `fileUpload=true|false` (`false`) | `true` adds an accessible native upload control and client-side interaction baseline. It does not add storage, scanning, or a backend endpoint. | Enable when file selection is required and implement the server-side lifecycle separately. |
| `pageTemplates=true|false` (`false`) | `true` adds list and detail composition starting points without business-domain assumptions. | Enable when those page shapes accelerate initial delivery; omit them when the product structure differs. |

### Testing

| Option and default | Generated behavior | Choose a value when |
| ------------------ | ------------------ | ------------------- |
| `testing=none|unit|component` (`unit`) | `none` emits no test dependencies, configuration, or examples. `unit` configures isolated logic tests. `component` includes component rendering, user interaction, and accessibility-oriented assertions. | Use `none` only when testing is supplied separately. Use `unit` for the lightweight baseline. Use `component` when UI behavior and interaction contracts must be verified. |

Selecting one option must not generate dependencies, code, configuration, or
tests belonging to another option.

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
