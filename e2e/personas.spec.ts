import { expect, open, test } from './fixtures';

test.describe('persona switch', () => {
  test('studio shows the gallery', async ({ page }) => {
    await open(page);

    await page.getByTestId('persona-creative').click();

    await expect(page.locator('html')).toHaveAttribute(
      'data-persona',
      'creative'
    );
    await expect(page.getByRole('heading', { name: 'Gallery' })).toBeVisible();
    await expect(page.locator('#about')).toHaveCount(0);
  });

  test('services shows the offer and client cases', async ({ page }) => {
    await open(page);

    await page.getByTestId('persona-services').click();

    await expect(
      page.getByRole('heading', { name: /Three services, one goal/ })
    ).toBeVisible();
    for (const client of ['Pizza Calda', 'La Morada', 'Miro']) {
      await expect(
        page.getByRole('heading', { name: new RegExp(client) }).first()
      ).toBeVisible();
    }
  });

  test('selected persona survives a reload', async ({ page }) => {
    await open(page);
    await page.getByTestId('persona-services').click();
    await expect(page.getByTestId('persona-services')).toHaveAttribute(
      'aria-selected',
      'true'
    );

    await page.reload();

    await expect(page.locator('html')).toHaveAttribute(
      'data-persona',
      'services'
    );
    await expect(
      page.getByRole('heading', { name: /Three services, one goal/ })
    ).toBeVisible();
  });
});
