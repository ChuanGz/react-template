# Test and deploy a generated project

## Local validation

Run the scripts present in the generated `package.json`:

```bash
npm run build
npm test
```

Projects generated with `testing=none` intentionally have no test script.
Component mode uses Vitest, jsdom, and Testing Library; unit mode uses Vitest
without browser emulation. End-to-end and accessibility smoke tests validate
the repository's max fixture in CI rather than adding Playwright to every app.

## Environment configuration

Set `VITE_API_URL` when the API client targets another origin. With environment
validation enabled, invalid values fail during startup. Vite exposes `VITE_*`
values to browser code, so never place secrets in them.

## Static deployment

`npm run build` writes the deployable site to `dist/`. Configure the hosting
platform to serve `index.html` for unknown routes when the router is enabled.
Validate the deployed artifact by loading a deep link directly, not only `/`.

## Rollback

Deploy immutable artifacts identified by commit or release. Roll back by
repointing the host to the previous successful artifact, then verify `/` and a
direct application route. This repository does not prescribe a cloud provider.
