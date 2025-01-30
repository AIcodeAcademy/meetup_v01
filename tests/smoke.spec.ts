import { expect, test } from '@playwright/test';
// get the title from the env
const expectedTitle = 'Bun Vite Blueprint';
test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(expectedTitle);
});

