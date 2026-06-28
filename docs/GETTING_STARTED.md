# Generate your first project

## Prerequisites

- Node.js `20.19` or newer, `22.13` or newer, or Node.js `24`.
- npm available on `PATH` to install this repository from its committed
  `package-lock.json`.
- pnpm available on `PATH` for the primary generated-application workflow.

## Generate the default project

From this repository:

```bash
npm ci
npm run generate -- my-app
cd my-app
pnpm install
pnpm run dev
```

Open the URL printed by Vite. The default includes routing, an API client, a
basic layout, error and loading states, environment validation, and unit-test
configuration. It does not include Tailwind, shadcn/ui, auth, or M6 enterprise
capabilities.

## Verify before development

```bash
pnpm run build
pnpm test
```

Both commands must pass. If generation rejects an option combination, change
the flags instead of editing partially generated output: validation runs before
files are written.

## Generate a minimal project

From the template repository root:

```bash
pnpm run generate -- minimal-app \
  --router=false \
  --apiClient=false \
  --layout=none \
  --errorBoundary=false \
  --loadingState=false \
  --envValidation=false \
  --testing=none
```

This output contains only React, TypeScript, Vite, and files required to render
the application.
