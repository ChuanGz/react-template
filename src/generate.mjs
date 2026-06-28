import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { resolveOptions } from './options.mjs'

const json = (value) => `${JSON.stringify(value, null, 2)}\n`

export async function generate(target, input = {}) {
  const root = resolve(target)
  const { options: o, warnings } = resolveOptions(input)
  const files = new Map()
  const deps = { '@vitejs/plugin-react': '^6.0.1', vite: '^8.1.0', typescript: '^6.0.3', react: '^19.2.7', 'react-dom': '^19.2.7', '@types/react': '^19.2.14', '@types/react-dom': '^19.2.3' }
  if (o.router) deps['react-router-dom'] = '^7.18.0'
  if (o.tailwind) { deps.tailwindcss = '^4.3.1'; deps['@tailwindcss/vite'] = '^4.3.1' }
  if (o.shadcn) Object.assign(deps, { '@radix-ui/react-slot': '^1.2.4', 'class-variance-authority': '^0.7.1', clsx: '^2.1.1', 'tailwind-merge': '^3.5.0' })
  if (o.envValidation) deps.zod = '^4.3.6'
  if (o.testing !== 'none') { deps.vitest = '^4.1.9'; deps['@vitest/coverage-v8'] = '^4.1.9' }
  if (o.testing === 'component') Object.assign(deps, { '@testing-library/react': '^16.3.2', '@testing-library/jest-dom': '^6.9.1', jsdom: '^29.0.1' })
  files.set('package.json', json({ name: target.split('/').pop(), private: true, version: '0.0.0', type: 'module', scripts: { dev: 'vite', build: 'tsc --noEmit && vite build', ...(o.testing !== 'none' ? { test: 'vitest run' } : {}) }, dependencies: Object.fromEntries(Object.entries(deps).filter(([k]) => ['react', 'react-dom', 'react-router-dom', '@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge', 'zod'].includes(k))), devDependencies: Object.fromEntries(Object.entries(deps).filter(([k]) => !['react', 'react-dom', 'react-router-dom', '@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge', 'zod'].includes(k))) }))
  files.set('index.html', '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>React App</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n')
  files.set('tsconfig.json', json({ compilerOptions: { target: 'ES2022', useDefineForClassFields: true, lib: ['ES2022', 'DOM', 'DOM.Iterable'], types: ['vite/client'], allowJs: false, skipLibCheck: true, esModuleInterop: true, allowSyntheticDefaultImports: true, strict: true, forceConsistentCasingInFileNames: true, module: 'ESNext', moduleResolution: 'Bundler', resolveJsonModule: true, isolatedModules: true, noEmit: true, jsx: 'react-jsx' }, include: ['src'] }))
  files.set('tsconfig.node.json', json({ compilerOptions: { composite: true, noEmit: true, skipLibCheck: true, module: 'ESNext', moduleResolution: 'Bundler', allowImportingTsExtensions: true }, include: ['vite.config.ts'] }))
  const viteImports = [`import { defineConfig } from '${o.testing !== 'none' ? 'vitest/config' : 'vite'}'`, "import react from '@vitejs/plugin-react'", ...(o.tailwind ? ["import tailwindcss from '@tailwindcss/vite'"] : [])]
  files.set('vite.config.ts', `${viteImports.join('\n')}\nexport default defineConfig({ plugins: [react()${o.tailwind ? ', tailwindcss()' : ''}]${o.testing !== 'none' ? `, test: { environment: '${o.testing === 'component' ? 'jsdom' : 'node'}' }` : ''} })\n`)
  files.set('src/index.css', `${o.tailwind ? '@import "tailwindcss";\n' : ''}:root { font-family: system-ui, sans-serif; color-scheme: light dark; } body { margin: 0; }\n`)
  const imports = ["import { StrictMode } from 'react'", "import { createRoot } from 'react-dom/client'", "import { App } from './App'", "import './index.css'", ...(o.router ? ["import { BrowserRouter } from 'react-router-dom'"] : []), ...(o.errorBoundary ? ["import { ErrorBoundary } from './app/ErrorBoundary'"] : [])]
  let tree = '<App />'; if (o.router) tree = `<BrowserRouter>${tree}</BrowserRouter>`; if (o.errorBoundary) tree = `<ErrorBoundary>${tree}</ErrorBoundary>`
  files.set('src/main.tsx', `${imports.join('\n')}\n\ncreateRoot(document.getElementById('root')!).render(<StrictMode>${tree}</StrictMode>)\n`)
  const appImports = [...(o.router ? ["import { Link, Route, Routes } from 'react-router-dom'"] : []), ...(o.layout !== 'none' ? ["import { Layout } from './app/Layout'"] : []), ...(o.loadingState ? ["import { LoadingState } from './components/LoadingState'"] : [])]
  let content = o.router ? `<><nav><Link to="/">Home</Link></nav><Routes><Route path="/" element={<h1>React Template</h1>} /></Routes></>` : '<h1>React Template</h1>'
  if (o.loadingState) content = `<><LoadingState loading={false} />${content}</>`
  if (o.layout !== 'none') content = `<Layout>${content}</Layout>`
  files.set('src/App.tsx', `${appImports.join('\n')}\n\nexport function App() { return (${content}) }\n`)
  if (o.layout !== 'none') files.set('src/app/Layout.tsx', `import type { ReactNode } from 'react'\nexport function Layout({ children }: { children: ReactNode }) { return <${o.layout === 'app-shell' ? 'div className="app-shell"' : 'main'}>{children}</${o.layout === 'app-shell' ? 'div' : 'main'}> }\n`)
  if (o.errorBoundary) files.set('src/app/ErrorBoundary.tsx', "import { Component, type ErrorInfo, type ReactNode } from 'react'\nexport class ErrorBoundary extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return{failed:true}}componentDidCatch(error:Error,info:ErrorInfo){console.error(error,info)}render(){return this.state.failed?<main role=\"alert\"><h1>Something went wrong</h1></main>:this.props.children}}\n")
  if (o.loadingState) files.set('src/components/LoadingState.tsx', "export function LoadingState({loading}:{loading:boolean}) { return loading ? <p role=\"status\">Loading…</p> : null }\n")
  if (o.apiClient) files.set('src/lib/apiClient.ts', "export async function apiRequest<T>(path:string, init?:RequestInit):Promise<T>{const response=await fetch(`${import.meta.env.VITE_API_URL ?? ''}${path}`,init);if(!response.ok)throw new Error(`API request failed: ${response.status}`);return response.json() as Promise<T>}\n")
  if (o.envValidation) files.set('src/lib/env.ts', "import { z } from 'zod'\nconst schema=z.object({VITE_API_URL:z.string().url().optional()})\nexport const env=schema.parse(import.meta.env)\n")
  if (o.authentication !== 'none') files.set('src/features/auth/auth.ts', `export type AuthStrategy='${o.authentication}'\nexport interface Identity { subject:string; permissions:string[] }\nexport const authStrategy:AuthStrategy='${o.authentication}'\n`)
  if (o.authorization === 'permission') files.set('src/features/auth/can.ts', "import type { Identity } from './auth'\nexport const can=(identity:Identity,permission:string)=>identity.permissions.includes(permission)\n")
  if (o.authorization === 'route') files.set('src/features/auth/ProtectedRoute.tsx', "import type { ReactNode } from 'react'\nimport { Navigate } from 'react-router-dom'\nexport function ProtectedRoute({authenticated,children}:{authenticated:boolean;children:ReactNode}){return authenticated?children:<Navigate to=\"/\" replace/>}\n")
  if (o.theme === 'light-dark') files.set('src/features/theme/theme.ts', "export type Theme='light'|'dark'\nexport function setTheme(theme:Theme){document.documentElement.dataset.theme=theme;localStorage.setItem('theme',theme)}\n")
  if (o.shadcn) files.set('src/components/ui/Button.tsx', "import { Slot } from '@radix-ui/react-slot'\nimport type { ButtonHTMLAttributes } from 'react'\nexport function Button({asChild=false,...props}:ButtonHTMLAttributes<HTMLButtonElement>&{asChild?:boolean}){const Comp=asChild?Slot:'button';return <Comp className=\"rounded bg-blue-600 px-4 py-2 text-white\" {...props}/>}\n")
  if (o.testing !== 'none') files.set('src/App.test.tsx', o.testing === 'component' ? "import '@testing-library/jest-dom'\nimport { render,screen } from '@testing-library/react'\nimport { App } from './App'\ntest('renders heading',()=>{render(<App/>);expect(screen.getByRole('heading')).toBeInTheDocument()})\n" : "import { describe,expect,it } from 'vitest'\ndescribe('baseline',()=>{it('is configured',()=>expect(true).toBe(true))})\n")
  files.set('.gitignore', 'node_modules\ndist\n.env.local\n')
  for (const [name, content] of files) { const path = resolve(root, name); await mkdir(resolve(path, '..'), { recursive: true }); await writeFile(path, content) }
  return { files: [...files.keys()], options: o, warnings }
}
