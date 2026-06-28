import { addApiDependencies } from './capabilities/api.mjs'
import { addRouterDependencies } from './capabilities/router.mjs'
import { addTailwindDependencies } from './capabilities/tailwind.mjs'

const runtime = Object.freeze({
  react: '^19.2.7',
  'react-dom': '^19.2.7',
})

const development = Object.freeze({
  '@vitejs/plugin-react': '^6.0.1',
  vite: '^8.1.0',
  typescript: '^6.0.3',
  '@types/react': '^19.2.14',
  '@types/react-dom': '^19.2.3',
})

function add(target, values) {
  Object.assign(target, values)
}

export function createDependencyPlan(o) {
  const dependencies = { ...runtime }
  const devDependencies = { ...development }

  addRouterDependencies(dependencies, o)
  addTailwindDependencies(devDependencies, o)
  addApiDependencies(dependencies, o)
  if (o.uiLibrary === 'shadcn')
    add(dependencies, {
      '@radix-ui/react-slot': '^1.2.4',
      'class-variance-authority': '^0.7.1',
      clsx: '^2.1.1',
      'tailwind-merge': '^3.5.0',
    })
  if (o.uiLibrary === 'antd') dependencies.antd = '^5.24.0'
  if (o.uiLibrary === 'mui')
    add(dependencies, {
      '@mui/material': '^7.0.0',
      '@emotion/react': '^11.14.0',
      '@emotion/styled': '^11.14.0',
    })
  if (o.icons === 'lucide') dependencies['lucide-react'] = '^0.468.0'
  if (o.dateTime === 'date-fns') dependencies['date-fns'] = '^4.1.0'
  if (o.dateTime === 'dayjs') dependencies.dayjs = '^1.11.0'
  if (o.utilities === 'lodash') {
    dependencies.lodash = '^4.17.0'
    devDependencies['@types/lodash'] = '^4.17.0'
  }
  if (o.state === 'zustand') dependencies.zustand = '^5.0.0'
  if (o.realtime === 'signalr') dependencies['@microsoft/signalr'] = '^8.0.0'
  if (o.realtime === 'socketio') dependencies['socket.io-client'] = '^4.8.0'
  if (o.forms) dependencies.zod = '^4.3.6'
  if (o.table) dependencies['@tanstack/react-table'] = '^8.21.3'
  if (o.forms)
    add(dependencies, {
      'react-hook-form': '^7.80.0',
      '@hookform/resolvers': '^5.4.0',
    })
  if (o.localization)
    add(dependencies, {
      i18next: '^26.3.3',
      'react-i18next': '^17.0.8',
    })
  if (o.charts) dependencies.recharts = '^3.9.0'
  if (o.testing !== 'none')
    add(devDependencies, {
      vitest: '^4.1.9',
      '@vitest/coverage-v8': '^4.1.9',
    })
  if (['component', 'e2e'].includes(o.testing))
    add(devDependencies, {
      '@testing-library/react': '^16.3.2',
      '@testing-library/jest-dom': '^6.9.1',
      jsdom: '^29.0.1',
    })
  if (o.testing === 'e2e') devDependencies['@playwright/test'] = '^1.61.0'

  return { dependencies, devDependencies }
}
