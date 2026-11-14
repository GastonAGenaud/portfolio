import { expect, open, test } from './fixtures';

test.describe('long-form content', () => {
  test('a guide opens from the home page', async ({ page }) => {
    await open(page);

    const guide = page
      .locator('#publications a[href^="/publications/"]')
      .first();
    const href = await guide.getAttribute('href');
    await guide.click();

    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('newsletter issue renders', async ({ page }) => {
    const response = await open(page, '/newsletter/arca-pymes-noviembre-2026');

    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('unknown route returns 404 and links back home', async ({ page }) => {
    const response = await open(page, '/this-page-does-not-exist');

    expect(response?.status()).toBe(404);
    await page.getByRole('link', { name: 'Go Home' }).click();
    await expect(page.locator('#hero')).toBeVisible();
  });
});
