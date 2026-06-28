# Option contract

## Options

| Option               | Values                                     | Default    | Ownership                                 |
| -------------------- | ------------------------------------------ | ---------- | ----------------------------------------- |
| `router`             | `true`, `false`                            | `true`     | Routes and router bootstrap               |
| `apiClient`          | `true`, `false`                            | `true`     | API client and service boundary           |
| `state`              | `none`, `context`, `zustand`               | `none`     | Shared client-side state strategy         |
| `tailwind`           | `true`, `false`                            | `false`    | Tailwind packages and configuration       |
| `uiLibrary`          | `none`, `shadcn`, `antd`, `mui`            | `none`     | Selected UI library setup and components  |
| `icons`              | `lucide`, `none`                           | `lucide`   | Shared icon library                       |
| `notifications`      | `true`, `false`                            | `false`    | Shared notification infrastructure        |
| `dateTime`           | `none`, `date-fns`, `dayjs`                | `date-fns` | Date, time, and duration helpers          |
| `utilities`          | `none`, `standard`, `lodash`               | `standard` | General-purpose application helpers       |
| `theme`              | `none`, `light-dark`                       | `none`     | Theme state and switching                 |
| `authentication`     | `none`, `jwt`, `oidc`                      | `none`     | Identity baseline                         |
| `authorization`      | `none`, `route`, `permission`              | `none`     | Access-control baseline                   |
| `layout`             | `none`, `basic`, `app-shell`               | `basic`    | Application composition shell             |
| `errorBoundary`      | `true`, `false`                            | `true`     | Render failure boundary                   |
| `loadingState`       | `true`, `false`                            | `true`     | Shared loading baseline                   |
| `envValidation`      | `true`, `false`                            | `true`     | Runtime environment validation            |
| `testing`            | `none`, `unit`, `component`, `e2e`         | `unit`     | Cumulative test tooling and examples      |
| `query`              | `true`, `false`                            | `false`    | TanStack Query provider and client        |
| `mockApi`            | `true`, `false`                            | `false`    | Local API mocking                         |
| `realtime`           | `none`, `websocket`, `signalr`, `socketio` | `none`     | Realtime client capability                |
| `table`              | `true`, `false`                            | `false`    | TanStack Table reusable table             |
| `forms`              | `true`, `false`                            | `false`    | React Hook Form and Zod baseline          |
| `localization`       | `true`, `false`                            | `false`    | i18next initialization                    |
| `charts`             | `true`, `false`                            | `false`    | Recharts baseline chart                   |
| `fileUpload`         | `true`, `false`                            | `false`    | Accessible native upload control          |
| `reusableComponents` | `true`, `false`                            | `false`    | Shared empty-state baseline               |
| `pageTemplates`      | `true`, `false`                            | `false`    | List and detail page composition          |
| `apiModels`          | `true`, `false`                            | `false`    | Response, pagination, and error contracts |

## Validation rules

- `uiLibrary=shadcn` requires and automatically enables `tailwind=true`.
- `authorization!=none` requires `authentication!=none`.
- `authorization=route` requires `router=true`.
- `router=false` rejects `layout=app-shell`.
- `apiClient=false` emits no API services or hooks.
- `authentication!=none` with `apiClient=false` is valid but must emit a warning.
- `theme=light-dark` without Tailwind is valid and uses framework-neutral CSS;
  enabling Tailwind is a recommendation, not a requirement.

Validation occurs before generation. Automatic implication is limited to
`uiLibrary=shadcn` enabling Tailwind; other invalid combinations fail with an actionable
message so user intent is not silently changed.

## Capability isolation

Each capability owns a declared set of dependencies, files, configuration
fragments, and tests. Contract tests must prove both presence when enabled and
absence when disabled. Shared files may receive deterministic fragments, but a
disabled option must not leave imports, scripts, empty directories, or comments.
For `uiLibrary`, only the selected library's dependencies, source code,
configuration, and tests may be emitted.
