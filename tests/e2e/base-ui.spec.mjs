import AxeBuilder from '@axe-core/playwright' // Generated UI accessibility smoke.
import { expect, test } from '@playwright/test'

test('generated application is usable and accessible', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'React Template',
  )
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible()

  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})
