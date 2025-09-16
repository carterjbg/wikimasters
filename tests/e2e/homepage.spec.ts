import { test, expect } from '@playwright/test';

test('homepage loads and displays wiki pages', async ({ page }) => {
  await page.goto('/');

  // Check that the page title is correct
  await expect(page).toHaveTitle(/Frontend Masters Wiki/);

  // Check that the main heading is visible
  await expect(page.locator('h1')).toContainText('Wiki Pages');

  // TODO: Add more comprehensive E2E tests
});
