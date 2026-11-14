import { expect, open, test } from './fixtures';

test('switching language to Spanish translates the page', async ({ page }) => {
  await open(page);
  await expect(page.locator('#hero')).toContainText('Hello, I am');

  await page.getByTestId('language-button').click();
  await page.getByRole('menuitem', { name: 'Spanish' }).click();

  await expect(page.locator('#hero')).toContainText('Hola, soy');
  await expect(
    page.getByRole('heading', { name: 'Sobre Mí', exact: true })
  ).toBeVisible();
});
