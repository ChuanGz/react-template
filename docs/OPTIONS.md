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

| Option          | Values; default                               | Generated behavior                                                                        | Selection guidance                                                                                                                                                                            |
| --------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `router`        | `true`, `false`; default `true`               | Adds client-side route declarations and router bootstrap when enabled.                    | Use `false` for a single-screen application or when the project will install its own router.                                                                                                  |
| `apiClient`     | `true`, `false`; default `true`               | Adds the HTTP client and service boundary when enabled. It does not define a backend API. | Use `false` for a client-only application or when another API-client architecture already exists.                                                                                             |
| `state`         | `none`, `context`, `zustand`; default `none`  | Selects no shared state, React Context, or a Zustand global store.                        | Use `context` for small, stable state shared across a limited tree. Use `zustand` when multiple features need frequently updated global client state. Remote server state belongs in `query`. |
| `layout`        | `none`, `basic`, `app-shell`; default `basic` | Selects no shared layout, minimal page composition, or routed application chrome.         | Use `none` for full layout ownership. Use `app-shell` for multi-page navigation; it requires routing.                                                                                         |
| `envValidation` | `true`, `false`; default `true`               | Validates runtime environment values at startup when enabled.                             | Use `false` only when the application has no runtime configuration or provides equivalent validation.                                                                                         |

### Styling and UI

| Option               | Values; default                                  | Generated behavior                                                                           | Selection guidance                                                                                                                                              |
| -------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tailwind`           | `true`, `false`; default `false`                 | Adds Tailwind dependencies, configuration, and style entry points when enabled.              | Enable for utility-first styling. Selecting shadcn/ui enables it automatically.                                                                                 |
| `uiLibrary`          | `none`, `shadcn`, `antd`, `mui`; default `none`  | Generates integration, dependencies, components, and tests only for the selected library.    | Use `shadcn` for project-owned customization, `antd` for rapid enterprise or CRUD delivery, or `mui` for Material Design and convention-led corporate products. |
| `icons`              | `lucide`, `none`; default `lucide`               | Adds the shared Lucide icon library or emits no icon abstraction.                            | Use `none` for text-only interfaces or when the application supplies another icon system.                                                                       |
| `notifications`      | `true`, `false`; default `false`                 | Adds shared success, warning, information, and error notification infrastructure.            | Enable when actions or background operations require consistent transient feedback.                                                                             |
| `dateTime`           | `none`, `date-fns`, `dayjs`; default `date-fns`  | Adds project-owned parsing, formatting, and duration helpers backed by the selected library. | Keep `date-fns` for the mature default, select `dayjs` for its chainable API, or use `none` when the application owns another solution.                         |
| `utilities`          | `none`, `standard`, `lodash`; default `standard` | Generates focused TypeScript helpers or Lodash-backed exports.                               | Keep `standard` for common needs. Select `lodash` only when its broader behavior justifies the dependency.                                                      |
| `theme`              | `none`, `light-dark`; default `none`             | Adds theme state, persistence, and switching when enabled.                                   | Use `light-dark` when both color modes are product requirements. It works without Tailwind.                                                                     |
| `reusableComponents` | `true`, `false`; default `false`                 | Adds the shared component baseline, currently an accessible empty state.                     | Enable when the project needs common UI composition examples without a full UI library.                                                                         |

### Identity and access

| Option           | Values; default                               | Generated behavior                                        | Selection guidance                                                                                                                                                          |
| ---------------- | --------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authentication` | `none`, `jwt`, `oidc`; default `none`         | Adds a token-based or OpenID Connect identity baseline.   | Use `jwt` for application-managed tokens or `oidc` for an external standards-based identity provider. Provider-specific production configuration remains application-owned. |
| `authorization`  | `none`, `route`, `permission`; default `none` | Adds navigation guards or permission-checking primitives. | Enable only with authentication. Client authorization improves UX but never replaces server-side enforcement.                                                               |

### Runtime states and data

| Option          | Values; default                                            | Generated behavior                                                                           | Selection guidance                                                                                 |
| --------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `errorBoundary` | `true`, `false`; default `true`                            | Adds a controlled fallback for unexpected React render failures.                             | Disable only when the application supplies an equivalent top-level boundary.                       |
| `loadingState`  | `true`, `false`; default `true`                            | Adds a shared, accessible loading-state baseline for asynchronous UI.                        | Disable when the application has its own loading-state system.                                     |
| `query`         | `true`, `false`; default `false`                           | Adds TanStack Query dependencies, provider, and client setup for remote server state.        | Enable for cached fetching, synchronization, retries, or request-state management.                 |
| `mockApi`       | `true`, `false`; default `false`                           | Adds local API mocking for frontend-first development. Production requests remain unchanged. | Enable when UI development, tests, or demos must proceed before backend services are available.    |
| `realtime`      | `none`, `websocket`, `signalr`, `socketio`; default `none` | Generates a native WebSocket client or a library-backed connection factory.                  | Enable only for live server communication and select the protocol required by the backend.         |
| `apiModels`     | `true`, `false`; default `false`                           | Adds typed response, pagination, and error contracts.                                        | Enable when the application consumes structured APIs and benefits from shared transport contracts. |

### Feature baselines

| Option          | Values; default                  | Generated behavior                                                                                  | Selection guidance                                                                               |
| --------------- | -------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `table`         | `true`, `false`; default `false` | Adds a reusable TanStack Table baseline, not a finished domain table.                               | Enable for sortable, filterable, or data-heavy views requiring application-owned presentation.   |
| `forms`         | `true`, `false`; default `false` | Adds React Hook Form and Zod setup for form state, validation, and typed schemas.                   | Enable for validated user input or multi-field workflows.                                        |
| `localization`  | `true`, `false`; default `false` | Adds i18next initialization and locale resources.                                                   | Enable when multiple languages or locale-aware content are requirements.                         |
| `charts`        | `true`, `false`; default `false` | Adds Recharts and a baseline chart example.                                                         | Enable when data visualization is part of the initial application scope.                         |
| `fileUpload`    | `true`, `false`; default `false` | Adds an accessible native upload control. It does not add storage, scanning, or a backend endpoint. | Enable when file selection is required and implement the server-side lifecycle separately.       |
| `pageTemplates` | `true`, `false`; default `false` | Adds list and detail composition starting points without business-domain assumptions.               | Enable when those page shapes accelerate delivery; omit them when the product structure differs. |

### Testing

| Option    | Values; default                                    | Generated behavior                                                                                                                         | Selection guidance                                                                                                            |
| --------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `testing` | `none`, `unit`, `component`, `e2e`; default `unit` | Levels are cumulative: `unit` adds Vitest, `component` adds Testing Library and jsdom, and `e2e` adds Playwright and a browser smoke test. | Keep `unit` for the lightweight baseline. Use `component` for UI behavior contracts and `e2e` for critical browser workflows. |

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
