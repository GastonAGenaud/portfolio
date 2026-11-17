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

  test('studio opens with the photographer hero', async ({ page }) => {
    await open(page);
    await page.getByTestId('persona-creative').click();

    await expect(
      page.getByRole('heading', { level: 1, name: /I shoot/ })
    ).toBeVisible();
    const stack = page.getByRole('region', { name: 'Photo stack' });
    await expect(stack.getByRole('img').first()).toBeVisible();
    // The preloader releases the page once the photos are in.
    await expect(page.locator('[data-split-reveal-overlay]')).toHaveCount(0);
    await expect(
      page.getByRole('link', { name: 'Write to me.' })
    ).toHaveAttribute('href', /^mailto:/);
  });

  test('studio drops a photo on every tap on touch screens', async ({
    page,
    hasTouch,
  }) => {
    test.skip(!hasTouch, 'Tap-to-drop only applies to touch screens.');
    await open(page);
    await page.getByTestId('persona-creative').click();
    await expect(page.locator('[data-split-reveal-overlay]')).toHaveCount(0);

    const droppedPhotos = () =>
      page.evaluate(
        () =>
          Array.from(
            document.querySelectorAll<HTMLImageElement>('img[src*="/trail-"]')
          ).filter((img) => Number(getComputedStyle(img).opacity) > 0.5).length
      );
    expect(await droppedPhotos()).toBe(0);

    await page.getByRole('region', { name: 'Photo stack' }).tap();
    await expect.poll(droppedPhotos).toBe(1);
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
    // Miro moved to veniaver.com; Fergus keeps its own URL and has a copy there.
    await expect(
      page.locator('#case-miro').getByRole('link').first()
    ).toHaveAttribute('href', 'https://miro.veniaver.com');
    await expect(
      page.locator('#case-fergus').getByRole('link').first()
    ).toHaveAttribute('href', 'https://fergus-pancheria.vercel.app');
    await expect(offer.getByRole('link', { name: 'Fergus' })).toHaveAttribute(
      'href',
      'https://fergus.veniaver.com'
    );
    // Sites without a case card open the live site.
    await expect(
      offer.getByRole('link', { name: 'Toro Café' })
    ).toHaveAttribute('href', 'https://toro-cafe.veniaver.com');
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
