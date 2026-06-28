# Project conventions

## Generated structure

```text
src/
  app/          application bootstrap and providers
  components/   reusable presentation components
  features/     capability or domain slices
  lib/          framework-neutral utilities and integrations
  pages/        route-level screens when routing is enabled
  styles/       global styles when styling requires them
  tests/        shared test setup when testing is enabled
```

Only directories required by selected options are generated. A feature owns
its components, hooks, types, schemas, and tests; code moves to a shared folder
only after it has a real cross-feature consumer.

## Naming and exports

- React components and their files use `PascalCase`.
- Hooks use `useCamelCase`; other modules use `camelCase`.
- Tests use `*.test.ts` or `*.test.tsx` beside the subject.
- Prefer named exports. Default exports are allowed only where a tool requires
  them, such as route-level lazy loading.
- Do not create barrel files that hide dependency direction or cause cycles.

## Components

Components receive data and behavior through typed props. Keep network access,
authorization decisions, and route orchestration outside reusable presentation
components. Use composition before adding boolean variants that combine
unrelated behaviors.

## Routing

Routes are declared in the application layer. Pages may compose features but
must not become shared component libraries. Route authorization is generated
only for `authorization=route`; redirects must preserve the intended location
without treating client guards as a security boundary.

## Styling

Plain CSS is always valid. Tailwind and shadcn/ui are optional and must not leak
into output when disabled. Feature-local styles stay with the feature; tokens
with application-wide meaning live under `styles`. Generated components must
remain keyboard usable and expose accessible names regardless of styling choice.

## Testing

Tests verify observable behavior rather than implementation details. Unit mode
covers pure logic. Component mode additionally provides DOM rendering support.
E2E mode adds Playwright configuration and a browser smoke test. The levels are
cumulative; `testing=none` emits no runner dependency, test file, or setup.

## Documentation

Public options and compatibility changes must update the engineering reference
and changelog in the same change. Examples must identify required options and
must be validated against generated output before release.
