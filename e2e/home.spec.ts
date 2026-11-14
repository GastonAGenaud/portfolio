import { expect, open, test } from './fixtures';

const SECTIONS = [
  'hero',
  'about',
  'skills',
  'experience',
  'projects',
  'life-projects',
  'publications',
];

test.describe('home (engineer persona)', () => {
  test('renders the hero with name and tagline', async ({ page }) => {
    await open(page);

    await expect(page).toHaveTitle(/Gaston Genaud/);
    const hero = page.locator('#hero');
    await expect(hero).toContainText('Gaston Genaud.');
    await expect(hero).toContainText('Quality, CI/CD and infrastructure');
  });

  test('renders every main section', async ({ page }) => {
    await open(page);

    for (const id of SECTIONS) {
      await expect(page.locator(`#${id}`), `section #${id}`).toBeAttached();
    }
  });

  test('navbar link scrolls to its section', async ({ page, isMobile }) => {
    await open(page);

    if (isMobile) {
      await page.locator('#navbar button.lg\\:hidden').click();
    }
    await page
      .locator('#navbar nav')
      .getByRole('link', { name: /^experience$/i })
      .click();

    await expect(page).toHaveURL(/#experience$/);
    await expect(page.locator('#experience')).toBeInViewport();
  });

  test('resume PDF is downloadable', async ({ page, request }) => {
    await open(page);

    const href = await page
      .locator('#hero')
      .getByRole('link', { name: 'View My Resume' })
      .getAttribute('href');
    expect(href).toBe('/resume_en.pdf');

    const response = await request.get(href as string);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('pdf');
  });
});
