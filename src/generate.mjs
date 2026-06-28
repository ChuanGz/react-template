import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { resolveOptions } from './options.mjs'

const json = (value) => `${JSON.stringify(value, null, 2)}\n`

export async function generate(target, input = {}) {
  const root = resolve(target)
  const { options: o, warnings } = resolveOptions(input)
  const files = new Map()
  const deps = {
    '@vitejs/plugin-react': '^6.0.1',
    vite: '^8.1.0',
    typescript: '^6.0.3',
    react: '^19.2.7',
    'react-dom': '^19.2.7',
    '@types/react': '^19.2.14',
    '@types/react-dom': '^19.2.3',
  }
  if (o.router) deps['react-router-dom'] = '^7.18.0'
  if (o.tailwind) {
    deps.tailwindcss = '^4.3.1'
    deps['@tailwindcss/vite'] = '^4.3.1'
  }
  if (o.uiLibrary === 'shadcn')
    Object.assign(deps, {
      '@radix-ui/react-slot': '^1.2.4',
      'class-variance-authority': '^0.7.1',
      clsx: '^2.1.1',
      'tailwind-merge': '^3.5.0',
    })
  if (o.uiLibrary === 'antd') deps.antd = '^5.24.0'
  if (o.uiLibrary === 'mui')
    Object.assign(deps, {
      '@mui/material': '^7.0.0',
      '@emotion/react': '^11.14.0',
      '@emotion/styled': '^11.14.0',
    })
  if (o.icons === 'lucide') deps['lucide-react'] = '^0.468.0'
  if (o.dateTime === 'date-fns') deps['date-fns'] = '^4.1.0'
  if (o.dateTime === 'dayjs') deps.dayjs = '^1.11.0'
  if (o.utilities === 'lodash') {
    deps.lodash = '^4.17.0'
    deps['@types/lodash'] = '^4.17.0'
  }
  if (o.state === 'zustand') deps.zustand = '^5.0.0'
  if (o.mockApi) deps.msw = '^2.7.0'
  if (o.realtime === 'signalr') deps['@microsoft/signalr'] = '^8.0.0'
  if (o.realtime === 'socketio') deps['socket.io-client'] = '^4.8.0'
  if (o.envValidation) deps.zod = '^4.3.6'
  if (o.query) deps['@tanstack/react-query'] = '^5.101.2'
  if (o.table) deps['@tanstack/react-table'] = '^8.21.3'
  if (o.forms) {
    deps['react-hook-form'] = '^7.80.0'
    deps['@hookform/resolvers'] = '^5.4.0'
    deps.zod = '^4.3.6'
  }
  if (o.localization) {
    deps.i18next = '^26.3.3'
    deps['react-i18next'] = '^17.0.8'
  }
  if (o.charts) deps.recharts = '^3.9.0'
  if (o.testing !== 'none') {
    deps.vitest = '^4.1.9'
    deps['@vitest/coverage-v8'] = '^4.1.9'
  }
  if (['component', 'e2e'].includes(o.testing))
    Object.assign(deps, {
      '@testing-library/react': '^16.3.2',
      '@testing-library/jest-dom': '^6.9.1',
      jsdom: '^29.0.1',
    })
  if (o.testing === 'e2e') deps['@playwright/test'] = '^1.61.0'
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
        build: 'tsc --noEmit && vite build',
        ...(o.testing !== 'none' ? { test: 'vitest run' } : {}),
        ...(o.testing === 'e2e' ? { 'test:e2e': 'playwright test' } : {}),
      },
      dependencies: Object.fromEntries(
        Object.entries(deps).filter(([k]) =>
          [
            'react',
            'react-dom',
            'react-router-dom',
            '@radix-ui/react-slot',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
            'antd',
            '@mui/material',
            '@emotion/react',
            '@emotion/styled',
            'lucide-react',
            'date-fns',
            'dayjs',
            'lodash',
            'zustand',
            'msw',
            '@microsoft/signalr',
            'socket.io-client',
            'zod',
            '@tanstack/react-query',
            '@tanstack/react-table',
            'react-hook-form',
            '@hookform/resolvers',
            'i18next',
            'react-i18next',
            'recharts',
          ].includes(k),
        ),
      ),
      devDependencies: Object.fromEntries(
        Object.entries(deps).filter(
          ([k]) =>
            ![
              'react',
              'react-dom',
              'react-router-dom',
              '@radix-ui/react-slot',
              'class-variance-authority',
              'clsx',
              'tailwind-merge',
              'antd',
              '@mui/material',
              '@emotion/react',
              '@emotion/styled',
              'lucide-react',
              'date-fns',
              'dayjs',
              'lodash',
              'zustand',
              'msw',
              '@microsoft/signalr',
              'socket.io-client',
              'zod',
              '@tanstack/react-query',
              '@tanstack/react-table',
              'react-hook-form',
              '@hookform/resolvers',
              'i18next',
              'react-i18next',
              'recharts',
            ].includes(k),
        ),
      ),
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
    ...(o.tailwind ? ["import tailwindcss from '@tailwindcss/vite'"] : []),
  ]
  files.set(
    'vite.config.ts',
    `${viteImports.join('\n')}\nexport default defineConfig({ plugins: [react()${o.tailwind ? ', tailwindcss()' : ''}]${o.testing !== 'none' ? `, test: { include: ['src/**/*.test.{ts,tsx}'], environment: '${['component', 'e2e'].includes(o.testing) ? 'jsdom' : 'node'}' }` : ''} })\n`,
  )
  const baseCss = `:root { font-family: Inter, ui-sans-serif, system-ui, sans-serif; color: #172033; background: #f6f8fc; color-scheme: light; font-synthesis: none; --surface: #fff; --muted: #5f6b7c; --border: #dfe5ef; --accent: #3157d5; --accent-strong: #2444ad; } html[data-theme='dark'] { color: #edf2ff; background: #0d1321; color-scheme: dark; --surface: #151d2e; --muted: #a9b4c8; --border: #2b3750; --accent: #8aa4ff; --accent-strong: #b7c6ff; } * { box-sizing: border-box; } html { min-width: 320px; background: inherit; } body { margin: 0; min-width: 320px; min-height: 100vh; background: radial-gradient(circle at top right, color-mix(in srgb, var(--accent) 12%, transparent), transparent 32rem), inherit; } button, input { font: inherit; } button, a { touch-action: manipulation; } a { color: var(--accent); } a:hover { color: var(--accent-strong); } :focus-visible { outline: 3px solid color-mix(in srgb, var(--accent) 55%, transparent); outline-offset: 3px; } .skip-link { position: fixed; left: 1rem; top: 1rem; z-index: 10; padding: .65rem 1rem; border-radius: .6rem; background: var(--surface); transform: translateY(-150%); } .skip-link:focus { transform: translateY(0); } main { width: min(100% - 2rem, 72rem); margin-inline: auto; padding: max(1rem, env(safe-area-inset-top)) 0 4rem; } .site-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: .75rem 0 2.5rem; border-bottom: 1px solid var(--border); } .brand { color: inherit; font-weight: 750; letter-spacing: -.02em; text-decoration: none; } .site-actions { display: flex; align-items: center; gap: .75rem; } .button { min-height: 2.5rem; padding: .55rem .9rem; border: 1px solid var(--border); border-radius: .7rem; color: inherit; background: var(--surface); cursor: pointer; } .button:hover { border-color: var(--accent); } .hero { padding: clamp(3.5rem, 8vw, 7rem) 0 2rem; } .eyebrow { margin: 0 0 1rem; color: var(--accent); font-size: .78rem; font-weight: 750; letter-spacing: .12em; text-transform: uppercase; } h1 { max-width: 14ch; margin: 0; font-size: clamp(2.75rem, 8vw, 5.75rem); line-height: .98; letter-spacing: -.065em; text-wrap: balance; } .lede { max-width: 42rem; margin: 1.5rem 0 0; color: var(--muted); font-size: clamp(1rem, 2vw, 1.2rem); line-height: 1.7; text-wrap: pretty; } .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 3rem; } .feature-card { min-width: 0; padding: 1.25rem; border: 1px solid var(--border); border-radius: 1rem; background: color-mix(in srgb, var(--surface) 88%, transparent); box-shadow: 0 1rem 3rem rgba(26, 42, 76, .06); } .feature-card h2 { margin: 0 0 .5rem; font-size: 1rem; } .feature-card p { margin: 0; color: var(--muted); line-height: 1.55; } [role='status'], [role='alert'] { padding: 1rem; border: 1px solid var(--border); border-radius: .8rem; background: var(--surface); } table { width: 100%; border-collapse: collapse; } th, td { padding: .75rem; border-bottom: 1px solid var(--border); text-align: left; } input { min-height: 2.5rem; border: 1px solid var(--border); border-radius: .6rem; background: var(--surface); color: inherit; } @media (max-width: 720px) { .feature-grid { grid-template-columns: 1fr; } .site-header { padding-bottom: 1rem; } } @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; } }\n`
  files.set(
    'src/index.css',
    `${o.tailwind ? '@import "tailwindcss";\n' : ''}${baseCss}`,
  )
  const imports = [
    "import { StrictMode } from 'react'",
    "import { createRoot } from 'react-dom/client'",
    "import { App } from './App'",
    "import './index.css'",
    ...(o.router ? ["import { BrowserRouter } from 'react-router-dom'"] : []),
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
  if (o.router) tree = `<BrowserRouter>${tree}</BrowserRouter>`
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
  if (o.state === 'context')
    files.set(
      'src/state/AppState.tsx',
      "import { createContext,useContext,useState,type ReactNode } from 'react'\ntype AppState={ready:boolean;setReady:(ready:boolean)=>void}\nconst Context=createContext<AppState|null>(null)\nexport function AppStateProvider({children}:{children:ReactNode}){const [ready,setReady]=useState(false);return <Context value={{ready,setReady}}>{children}</Context>}\nexport function useAppState(){const value=useContext(Context);if(!value)throw new Error('useAppState requires AppStateProvider');return value}\n",
    )
  if (o.state === 'zustand')
    files.set(
      'src/state/appStore.ts',
      "import { create } from 'zustand'\ntype AppState={ready:boolean;setReady:(ready:boolean)=>void}\nexport const useAppStore=create<AppState>(set=>({ready:false,setReady:ready=>set({ready})}))\n",
    )
  if (o.notifications)
    files.set(
      'src/components/notifications.ts',
      "export type NotificationKind='success'|'warning'|'info'|'error'\nexport interface NotificationMessage{id:string;kind:NotificationKind;message:string}\nexport const createNotification=(kind:NotificationKind,message:string):NotificationMessage=>({id:crypto.randomUUID(),kind,message})\n",
    )
  if (o.icons === 'lucide')
    files.set(
      'src/components/Icon.tsx',
      "export { Check,Info,TriangleAlert,XCircle } from 'lucide-react'\n",
    )
  if (o.dateTime === 'date-fns')
    files.set(
      'src/lib/dateTime.ts',
      "import { format,formatDuration as formatParts,intervalToDuration,parseISO } from 'date-fns'\nexport const parseDate=(value:string)=>parseISO(value)\nexport const formatDate=(value:Date,pattern='yyyy-MM-dd')=>format(value,pattern)\nexport const formatDuration=(milliseconds:number)=>formatParts(intervalToDuration({start:0,end:milliseconds}))\n",
    )
  if (o.dateTime === 'dayjs')
    files.set(
      'src/lib/dateTime.ts',
      "import dayjs from 'dayjs'\nimport duration from 'dayjs/plugin/duration'\nimport relativeTime from 'dayjs/plugin/relativeTime'\ndayjs.extend(duration)\ndayjs.extend(relativeTime)\nexport const parseDate=(value:string)=>dayjs(value)\nexport const formatDate=(value:Date,pattern='YYYY-MM-DD')=>dayjs(value).format(pattern)\nexport const formatDuration=(milliseconds:number)=>dayjs.duration(milliseconds).humanize()\n",
    )
  if (o.utilities === 'standard')
    files.set(
      'src/lib/utilities.ts',
      'export const capitalize=(value:string)=>value.length?value[0].toUpperCase()+value.slice(1):value\nexport const clamp=(value:number,min:number,max:number)=>Math.min(max,Math.max(min,value))\nexport const pick=<T extends object,K extends keyof T>(value:T,keys:K[])=>Object.fromEntries(keys.map(key=>[key,value[key]])) as Pick<T,K>\n',
    )
  if (o.utilities === 'lodash')
    files.set(
      'src/lib/utilities.ts',
      "export { default as camelCase } from 'lodash/camelCase'\nexport { default as clamp } from 'lodash/clamp'\nexport { default as get } from 'lodash/get'\n",
    )
  if (o.mockApi) {
    files.set(
      'src/mocks/handlers.ts',
      "import { http,HttpResponse } from 'msw'\nexport const handlers=[http.get('/api/health',()=>HttpResponse.json({status:'ok'}))]\n",
    )
    files.set(
      'src/mocks/browser.ts',
      "import { setupWorker } from 'msw/browser'\nimport { handlers } from './handlers'\nexport const mockWorker=setupWorker(...handlers)\n",
    )
  }
  if (o.realtime === 'websocket')
    files.set(
      'src/lib/realtime.ts',
      'export const createRealtimeClient=(url:string)=>new WebSocket(url)\n',
    )
  if (o.realtime === 'signalr')
    files.set(
      'src/lib/realtime.ts',
      "import { HubConnectionBuilder } from '@microsoft/signalr'\nexport const createRealtimeClient=(url:string)=>new HubConnectionBuilder().withUrl(url).withAutomaticReconnect().build()\n",
    )
  if (o.realtime === 'socketio')
    files.set(
      'src/lib/realtime.ts',
      "import { io } from 'socket.io-client'\nexport const createRealtimeClient=(url:string)=>io(url,{autoConnect:false})\n",
    )
  if (o.errorBoundary)
    files.set(
      'src/app/ErrorBoundary.tsx',
      'import { Component, type ErrorInfo, type ReactNode } from \'react\'\ntype Props={children:ReactNode;onError?:(error:Error,info:ErrorInfo)=>void}\nexport class ErrorBoundary extends Component<Props,{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return{failed:true}}componentDidCatch(error:Error,info:ErrorInfo){this.props.onError?.(error,info)}render(){return this.state.failed?<main role="alert"><h1>Something went wrong</h1><p>Reload the page or try again.</p><button className="button" type="button" onClick={()=>this.setState({failed:false})}>Try Again</button></main>:this.props.children}}\n',
    )
  if (o.loadingState)
    files.set(
      'src/components/LoadingState.tsx',
      'export function LoadingState({loading}:{loading:boolean}) { return loading ? <p role="status">Loading…</p> : null }\n',
    )
  if (o.apiClient)
    files.set(
      'src/lib/apiClient.ts',
      "export async function apiRequest<T>(path:string, init?:RequestInit):Promise<T>{const response=await fetch(`${import.meta.env.VITE_API_URL ?? ''}${path}`,init);if(!response.ok)throw new Error(`API request failed: ${response.status}`);return response.json() as Promise<T>}\n",
    )
  if (o.envValidation)
    files.set(
      'src/lib/env.ts',
      "import { z } from 'zod'\nconst schema=z.object({VITE_API_URL:z.string().url().optional()})\nexport const env=schema.parse(import.meta.env)\n",
    )
  if (o.apiModels)
    files.set(
      'src/lib/apiModels.ts',
      'export interface BaseResponse<T>{data:T;message?:string;requestId?:string}\nexport interface PageResponse<T> extends BaseResponse<T[]>{page:number;pageSize:number;total:number}\nexport interface ApiError{code:string;message:string;fieldErrors?:Record<string,string[]>}\n',
    )
  if (o.query)
    files.set(
      'src/lib/queryClient.ts',
      "import { QueryClient } from '@tanstack/react-query'\nexport const queryClient=new QueryClient({defaultOptions:{queries:{staleTime:30_000,retry:1}}})\n",
    )
  if (o.authentication !== 'none')
    files.set(
      'src/features/auth/auth.ts',
      `export type AuthStrategy='${o.authentication}'\nexport interface Identity { subject:string; permissions:string[] }\nexport const authStrategy:AuthStrategy='${o.authentication}'\n`,
    )
  if (o.authorization === 'permission')
    files.set(
      'src/features/auth/can.ts',
      "import type { Identity } from './auth'\nexport const can=(identity:Identity,permission:string)=>identity.permissions.includes(permission)\n",
    )
  if (o.authorization === 'route')
    files.set(
      'src/features/auth/ProtectedRoute.tsx',
      "import type { ReactNode } from 'react'\nimport { Navigate } from 'react-router-dom'\nexport function ProtectedRoute({authenticated,children}:{authenticated:boolean;children:ReactNode}){return authenticated?children:<Navigate to=\"/\" replace/>}\n",
    )
  if (o.theme === 'light-dark')
    files.set(
      'src/features/theme/theme.ts',
      "export type Theme='light'|'dark'\nexport function setTheme(theme:Theme){document.documentElement.dataset.theme=theme;localStorage.setItem('theme',theme)}\n",
    )
  if (o.theme === 'light-dark')
    files.set(
      'src/features/theme/ThemeToggle.tsx',
      "import { useState } from 'react'\nimport { setTheme,type Theme } from './theme'\nexport function ThemeToggle(){const [theme,setCurrentTheme]=useState<Theme>(()=>localStorage.getItem('theme')==='dark'?'dark':'light');function toggle(){const next=theme==='light'?'dark':'light';setTheme(next);setCurrentTheme(next)}return <button className=\"button\" type=\"button\" aria-label={`Switch to ${theme==='light'?'dark':'light'} theme`} onClick={toggle}>{theme==='light'?'Dark':'Light'} Theme</button>}\n",
    )
  if (o.localization)
    files.set(
      'src/lib/i18n.ts',
      "import i18n from 'i18next'\nimport { initReactI18next } from 'react-i18next'\nvoid i18n.use(initReactI18next).init({lng:'en',fallbackLng:'en',resources:{en:{translation:{appName:'React Template'}}},interpolation:{escapeValue:false}})\nexport { i18n }\n",
    )
  if (o.table)
    files.set(
      'src/components/DataTable.tsx',
      "import { flexRender,getCoreRowModel,useReactTable,type ColumnDef } from '@tanstack/react-table'\nexport function DataTable<T>({data,columns}:{data:T[];columns:ColumnDef<T>[]}){const table=useReactTable({data,columns,getCoreRowModel:getCoreRowModel()});return <table><thead>{table.getHeaderGroups().map(group=><tr key={group.id}>{group.headers.map(header=><th key={header.id}>{header.isPlaceholder?null:flexRender(header.column.columnDef.header,header.getContext())}</th>)}</tr>)}</thead><tbody>{table.getRowModel().rows.map(row=><tr key={row.id}>{row.getVisibleCells().map(cell=><td key={cell.id}>{flexRender(cell.column.columnDef.cell,cell.getContext())}</td>)}</tr>)}</tbody></table>}\n",
    )
  if (o.forms)
    files.set(
      'src/components/ExampleForm.tsx',
      'import { zodResolver } from \'@hookform/resolvers/zod\'\nimport { useForm } from \'react-hook-form\'\nimport { z } from \'zod\'\nconst schema=z.object({email:z.email()})\ntype Values=z.infer<typeof schema>\nexport function ExampleForm(){const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<Values>({resolver:zodResolver(schema)});return <form onSubmit={handleSubmit(()=>undefined)}><label htmlFor="email">Email</label><input id="email" type="email" autoComplete="email" spellCheck={false} {...register(\'email\')}/>{errors.email?<p role="alert">{errors.email.message}</p>:null}<button disabled={isSubmitting} type="submit">{isSubmitting?\'Saving…\':\'Save\'}</button></form>}\n',
    )
  if (o.charts)
    files.set(
      'src/components/SimpleChart.tsx',
      'import { Line,LineChart,ResponsiveContainer,Tooltip,XAxis,YAxis } from \'recharts\'\nexport function SimpleChart({data}:{data:{label:string;value:number}[]}){return <div role="img" aria-label="Value trend" style={{height:240}}><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><XAxis dataKey="label"/><YAxis/><Tooltip/><Line dataKey="value" stroke="currentColor"/></LineChart></ResponsiveContainer></div>}\n',
    )
  if (o.fileUpload)
    files.set(
      'src/components/FileUpload.tsx',
      'export function FileUpload({onFiles}:{onFiles:(files:File[])=>void}){return <div><label htmlFor="files">Choose Files</label><input id="files" name="files" type="file" multiple onChange={(event)=>onFiles(Array.from(event.target.files??[]))}/></div>}\n',
    )
  if (o.reusableComponents)
    files.set(
      'src/components/EmptyState.tsx',
      'import type { ReactNode } from \'react\'\nexport function EmptyState({title,description,action}:{title:string;description?:string;action?:ReactNode}){return <section aria-labelledby="empty-title"><h2 id="empty-title">{title}</h2>{description?<p>{description}</p>:null}{action}</section>}\n',
    )
  if (o.pageTemplates) {
    files.set(
      'src/pages/ListPage.tsx',
      "import type { ReactNode } from 'react'\nexport function ListPage({title,actions,children}:{title:string;actions?:ReactNode;children:ReactNode}){return <section><header><h1>{title}</h1>{actions}</header>{children}</section>}\n",
    )
    files.set(
      'src/pages/DetailPage.tsx',
      "import type { ReactNode } from 'react'\nexport function DetailPage({title,children}:{title:string;children:ReactNode}){return <article><h1>{title}</h1>{children}</article>}\n",
    )
  }
  if (o.uiLibrary === 'shadcn')
    files.set(
      'src/components/ui/Button.tsx',
      "import { Slot } from '@radix-ui/react-slot'\nimport type { ButtonHTMLAttributes } from 'react'\nexport function Button({asChild=false,...props}:ButtonHTMLAttributes<HTMLButtonElement>&{asChild?:boolean}){const Comp=asChild?Slot:'button';return <Comp className=\"rounded bg-blue-600 px-4 py-2 text-white\" {...props}/>}\n",
    )
  if (o.uiLibrary === 'shadcn')
    files.set(
      'components.json',
      json({
        $schema: 'https://ui.shadcn.com/schema.json',
        style: 'new-york',
        rsc: false,
        tsx: true,
        tailwind: { css: 'src/index.css', baseColor: 'neutral' },
        aliases: { components: './src/components', ui: './src/components/ui' },
      }),
    )
  if (o.uiLibrary === 'antd')
    files.set('src/components/ui/Button.tsx', "export { Button } from 'antd'\n")
  if (o.uiLibrary === 'mui')
    files.set(
      'src/components/ui/Button.tsx',
      "export { Button } from '@mui/material'\n",
    )
  const componentTest = `import '@testing-library/jest-dom/vitest'\nimport { render,screen } from '@testing-library/react'\nimport { expect,test } from 'vitest'\n${o.router ? "import { MemoryRouter } from 'react-router-dom'\n" : ''}import { App } from './App'\ntest('renders heading',()=>{render(${o.router ? '<MemoryRouter><App /></MemoryRouter>' : '<App />'});expect(screen.getByRole('heading',{level:1,name:'React Template'})).toBeInTheDocument()})\n`
  if (o.testing !== 'none')
    files.set(
      'src/App.test.tsx',
      ['component', 'e2e'].includes(o.testing)
        ? componentTest
        : "import { describe,expect,it } from 'vitest'\ndescribe('baseline',()=>{it('is configured',()=>expect(true).toBe(true))})\n",
    )
  if (o.testing === 'e2e') {
    files.set(
      'playwright.config.ts',
      "import { defineConfig } from '@playwright/test'\nexport default defineConfig({testDir:'./e2e',use:{baseURL:'http://127.0.0.1:4173'},webServer:{command:'npm run dev -- --host 127.0.0.1 --port 4173',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI}})\n",
    )
    files.set(
      'e2e/app.spec.ts',
      "import { expect,test } from '@playwright/test'\ntest('application loads',async({page})=>{await page.goto('/');await expect(page.getByRole('heading',{level:1})).toHaveText('React Template')})\n",
    )
  }
  files.set('.gitignore', 'node_modules\ndist\n.env.local\n')
  for (const [name, content] of files) {
    const path = resolve(root, name)
    await mkdir(resolve(path, '..'), { recursive: true })
    await writeFile(path, content)
  }
  return { files: [...files.keys()], options: o, warnings }
}
