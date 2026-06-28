// Unit, component, and end-to-end test templates.
export function addTestingCapabilityFiles(files, o) {
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
}
