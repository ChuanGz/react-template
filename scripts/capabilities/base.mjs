import { createDependencyPlan } from '../dependencies.mjs'
import { routerBootstrapImports, wrapWithRouter } from './router.mjs'
import {
  tailwindCssPrefix,
  tailwindViteImport,
  tailwindVitePlugin,
} from './tailwind.mjs'

const json = (value) => `${JSON.stringify(value, null, 2)}\n`

export function createBaseFilePlan(target, o, capabilityGenerators = []) {
  const files = new Map()
  const { dependencies, devDependencies } = createDependencyPlan(o)
  files.set(
    'package.json',
    json({
      name: target.split('/').pop(),
      private: true,
      version: '0.0.0',
      type: 'module',
      engines: { node: '^20.19.0 || >=22.13.0' },
      scripts: {
        dev: 'vite',
        typecheck: 'tsc --noEmit',
        build: 'tsc --noEmit && vite build',
        ...(o.testing !== 'none' ? { test: 'vitest run' } : {}),
        ...(o.testing === 'e2e' ? { 'test:e2e': 'playwright test' } : {}),
      },
      dependencies,
      devDependencies,
    }),
  )
  files.set(
    'index.html',
    '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>React App</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n',
  )
  files.set(
    'tsconfig.json',
    json({
      compilerOptions: {
        target: 'ES2022',
        useDefineForClassFields: true,
        lib: ['ES2022', 'DOM', 'DOM.Iterable'],
        types: ['vite/client'],
        allowJs: false,
        skipLibCheck: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        module: 'ESNext',
        moduleResolution: 'Bundler',
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'react-jsx',
      },
      include: ['src'],
    }),
  )
  files.set(
    'tsconfig.node.json',
    json({
      compilerOptions: {
        composite: true,
        noEmit: true,
        skipLibCheck: true,
        module: 'ESNext',
        moduleResolution: 'Bundler',
        allowImportingTsExtensions: true,
      },
      include: ['vite.config.ts'],
    }),
  )
  const viteImports = [
    `import { defineConfig } from '${o.testing !== 'none' ? 'vitest/config' : 'vite'}'`,
    "import react from '@vitejs/plugin-react'",
    ...tailwindViteImport(o),
  ]
  files.set(
    'vite.config.ts',
    `${viteImports.join('\n')}\nexport default defineConfig({ plugins: [react()${tailwindVitePlugin(o)}]${o.testing !== 'none' ? `, test: { include: ['src/**/*.test.{ts,tsx}'], environment: '${['component', 'e2e'].includes(o.testing) ? 'jsdom' : 'node'}' }` : ''} })\n`,
  )
  const baseCss = `:root { font-family: Inter, ui-sans-serif, system-ui, sans-serif; color: #172033; background: #f6f8fc; color-scheme: light; font-synthesis: none; --surface: #fff; --muted: #5f6b7c; --border: #dfe5ef; --accent: #3157d5; --accent-strong: #2444ad; } html[data-theme='dark'] { color: #edf2ff; background: #0d1321; color-scheme: dark; --surface: #151d2e; --muted: #a9b4c8; --border: #2b3750; --accent: #8aa4ff; --accent-strong: #b7c6ff; } * { box-sizing: border-box; } html { min-width: 320px; background: inherit; } body { margin: 0; min-width: 320px; min-height: 100vh; background: radial-gradient(circle at top right, color-mix(in srgb, var(--accent) 12%, transparent), transparent 32rem), inherit; } button, input { font: inherit; } button, a { touch-action: manipulation; } a { color: var(--accent); } a:hover { color: var(--accent-strong); } :focus-visible { outline: 3px solid color-mix(in srgb, var(--accent) 55%, transparent); outline-offset: 3px; } .skip-link { position: fixed; left: 1rem; top: 1rem; z-index: 10; padding: .65rem 1rem; border-radius: .6rem; background: var(--surface); transform: translateY(-150%); } .skip-link:focus { transform: translateY(0); } main { width: min(100% - 2rem, 72rem); margin-inline: auto; padding: max(1rem, env(safe-area-inset-top)) 0 4rem; } .site-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: .75rem 0 2.5rem; border-bottom: 1px solid var(--border); } .brand { color: inherit; font-weight: 750; letter-spacing: -.02em; text-decoration: none; } .site-actions { display: flex; align-items: center; gap: .75rem; } .button { min-height: 2.5rem; padding: .55rem .9rem; border: 1px solid var(--border); border-radius: .7rem; color: inherit; background: var(--surface); cursor: pointer; } .button:hover { border-color: var(--accent); } .hero { padding: clamp(3.5rem, 8vw, 7rem) 0 2rem; } .eyebrow { margin: 0 0 1rem; color: var(--accent); font-size: .78rem; font-weight: 750; letter-spacing: .12em; text-transform: uppercase; } h1 { max-width: 14ch; margin: 0; font-size: clamp(2.75rem, 8vw, 5.75rem); line-height: .98; letter-spacing: -.065em; text-wrap: balance; } .lede { max-width: 42rem; margin: 1.5rem 0 0; color: var(--muted); font-size: clamp(1rem, 2vw, 1.2rem); line-height: 1.7; text-wrap: pretty; } .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 3rem; } .feature-card { min-width: 0; padding: 1.25rem; border: 1px solid var(--border); border-radius: 1rem; background: color-mix(in srgb, var(--surface) 88%, transparent); box-shadow: 0 1rem 3rem rgba(26, 42, 76, .06); } .feature-card h2 { margin: 0 0 .5rem; font-size: 1rem; } .feature-card p { margin: 0; color: var(--muted); line-height: 1.55; } [role='status'], [role='alert'] { padding: 1rem; border: 1px solid var(--border); border-radius: .8rem; background: var(--surface); } table { width: 100%; border-collapse: collapse; } th, td { padding: .75rem; border-bottom: 1px solid var(--border); text-align: left; } input { min-height: 2.5rem; border: 1px solid var(--border); border-radius: .6rem; background: var(--surface); color: inherit; } @media (max-width: 720px) { .feature-grid { grid-template-columns: 1fr; } .site-header { padding-bottom: 1rem; } } @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; } }\n`
  files.set('src/index.css', `${tailwindCssPrefix(o)}${baseCss}`)
  const imports = [
    "import { StrictMode } from 'react'",
    "import { createRoot } from 'react-dom/client'",
    "import { App } from './App'",
    "import './index.css'",
    ...routerBootstrapImports(o),
    ...(o.errorBoundary
      ? ["import { ErrorBoundary } from './app/ErrorBoundary'"]
      : []),
    ...(o.envValidation ? ["import './lib/env'"] : []),
    ...(o.localization ? ["import './lib/i18n'"] : []),
    ...(o.query
      ? [
          "import { QueryClientProvider } from '@tanstack/react-query'",
          "import { queryClient } from './lib/queryClient'",
        ]
      : []),
  ]
  let tree = '<App />'
  tree = wrapWithRouter(tree, o)
  if (o.query)
    tree = `<QueryClientProvider client={queryClient}>${tree}</QueryClientProvider>`
  if (o.errorBoundary) tree = `<ErrorBoundary>${tree}</ErrorBoundary>`
  files.set(
    'src/main.tsx',
    `${imports.join('\n')}\n\ncreateRoot(document.getElementById('root')!).render(<StrictMode>${tree}</StrictMode>)\n`,
  )
  const appImports = [
    ...(o.router
      ? ["import { Link, Route, Routes } from 'react-router-dom'"]
      : []),
    ...(o.layout !== 'none' ? ["import { Layout } from './app/Layout'"] : []),
    ...(o.loadingState
      ? ["import { LoadingState } from './components/LoadingState'"]
      : []),
    ...(o.theme === 'light-dark'
      ? ["import { ThemeToggle } from './features/theme/ThemeToggle'"]
      : []),
  ]
  const home = `<section className="hero" aria-labelledby="page-title"><p className="eyebrow">Production React Foundation</p><h1 id="page-title">React Template</h1><p className="lede">A focused TypeScript and Vite foundation that includes only the capabilities your application selects.</p><div className="feature-grid"><article className="feature-card"><h2>Explicit Options</h2><p>Dependencies and source stay aligned with your selected capabilities.</p></article><article className="feature-card"><h2>Verified Output</h2><p>Generated projects are covered by build, test, and accessibility gates.</p></article><article className="feature-card"><h2>Application Owned</h2><p>Readable generated code remains yours to extend without a runtime framework.</p></article></div></section>`
  const header = `<header className="site-header"><${o.router ? 'Link to="/"' : 'span'} className="brand">React Template</${o.router ? 'Link' : 'span'}><div className="site-actions">${o.router ? '<nav aria-label="Primary"><Link to="/">Home</Link></nav>' : ''}${o.theme === 'light-dark' ? '<ThemeToggle />' : ''}</div></header>`
  let content = o.router
    ? `<>${header}<Routes><Route path="/" element={${home}} /></Routes></>`
    : `<>${header}${home}</>`
  if (o.loadingState)
    content = `<><LoadingState loading={false} />${content}</>`
  if (o.layout !== 'none') content = `<Layout>${content}</Layout>`
  else
    content = `<><a className="skip-link" href="#main-content">Skip to Content</a><main id="main-content">${content}</main></>`
  files.set(
    'src/App.tsx',
    `${appImports.join('\n')}\n\nexport function App() { return (${content}) }\n`,
  )
  if (o.layout !== 'none')
    files.set(
      'src/app/Layout.tsx',
      `import type { ReactNode } from 'react'\nexport function Layout({ children }: { children: ReactNode }) { return <><a className="skip-link" href="#main-content">Skip to Content</a><main id="main-content"${o.layout === 'app-shell' ? ' className="app-shell"' : ''}>{children}</main></> }\n`,
    )
  for (const addCapabilityFiles of capabilityGenerators)
    addCapabilityFiles(files, o)
  files.set('.gitignore', 'node_modules\ndist\n.env.local\n')
  return files
}
