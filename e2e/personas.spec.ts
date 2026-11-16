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
      page.getByRole('heading', { name: /Four services, one goal/ })
    ).toBeVisible();
    for (const client of ['Pizza Calda', 'La Morada', 'Miro']) {
      await expect(
        page.getByRole('heading', { name: new RegExp(client) }).first()
      ).toBeVisible();
    }
  });

  test('services shows the Veni a Ver sites and offer', async ({ page }) => {
    await open(page);
    await page.getByTestId('persona-services').click();

    for (const site of ['La Tolva', 'Óptica La Rochelle']) {
      await expect(
        page.getByRole('heading', { name: new RegExp(site) })
      ).toBeVisible();
    }
    const offer = page.locator('#veni-a-ver');
    await expect(
      offer.getByRole('heading', { name: /built from your real data/ })
    ).toBeVisible();
    await expect(
      offer.getByRole('link', { name: 'I want my site' })
    ).toHaveAttribute('href', /^https:\/\/wa\.me\//);
    // Rates only go in the proposal PDF.
    await expect(offer).not.toContainText('$');
  });

  test('services filters cases by industry', async ({ page }) => {
    await open(page);
    await page.getByTestId('persona-services').click();

    const filters = page.getByRole('group', {
      name: 'Filter cases by industry',
    });
    await filters.getByRole('button', { name: 'Healthcare' }).click();

    await expect(
      filters.getByRole('button', { name: 'Healthcare' })
    ).toHaveAttribute('aria-pressed', 'true');
    await expect(
      page.getByRole('heading', { name: /Control de Insumos/ })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /Pizza Calda/ })
    ).toHaveCount(0);

    await filters.getByRole('button', { name: 'All' }).click();
    await expect(
      page.getByRole('heading', { name: /Pizza Calda/ })
    ).toBeVisible();
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
      page.getByRole('heading', { name: /Four services, one goal/ })
    ).toBeVisible();
  });
});
