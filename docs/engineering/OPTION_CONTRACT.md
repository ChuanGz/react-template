# Option contract

## Options

| Option           | Values                        | Default | Ownership                                |
| ---------------- | ----------------------------- | ------- | ---------------------------------------- |
| `router`         | `true`, `false`               | `true`  | Routes and router bootstrap              |
| `apiClient`      | `true`, `false`               | `true`  | API client and service boundary          |
| `tailwind`       | `true`, `false`               | `false` | Tailwind packages and configuration      |
| `shadcn`         | `true`, `false`               | `false` | shadcn/ui setup and generated primitives |
| `theme`          | `none`, `light-dark`          | `none`  | Theme state and switching                |
| `authentication` | `none`, `jwt`, `oidc`         | `none`  | Identity baseline                        |
| `authorization`  | `none`, `route`, `permission` | `none`  | Access-control baseline                  |
| `layout`         | `none`, `basic`, `app-shell`  | `basic` | Application composition shell            |
| `errorBoundary`  | `true`, `false`               | `true`  | Render failure boundary                  |
| `loadingState`   | `true`, `false`               | `true`  | Shared loading baseline                  |
| `envValidation`  | `true`, `false`               | `true`  | Runtime environment validation           |
| `testing`        | `none`, `unit`, `component`   | `unit`  | Test dependencies, setup, and examples   |

## Validation rules

- `shadcn=true` requires and automatically enables `tailwind=true`.
- `authorization!=none` requires `authentication!=none`.
- `authorization=route` requires `router=true`.
- `router=false` rejects `layout=app-shell`.
- `apiClient=false` emits no API services or hooks.
- `authentication!=none` with `apiClient=false` is valid but must emit a warning.
- `theme=light-dark` without Tailwind is valid and uses framework-neutral CSS;
  enabling Tailwind is a recommendation, not a requirement.

Validation occurs before generation. Automatic implication is limited to
`shadcn` enabling Tailwind; other invalid combinations fail with an actionable
message so user intent is not silently changed.

## Capability isolation

Each capability owns a declared set of dependencies, files, configuration
fragments, and tests. Contract tests must prove both presence when enabled and
absence when disabled. Shared files may receive deterministic fragments, but a
disabled option must not leave imports, scripts, empty directories, or comments.
