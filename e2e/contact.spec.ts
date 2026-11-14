import { expect, open, test } from './fixtures';

const API = '**/api/contactForm';

const fillForm = async (page: import('@playwright/test').Page) => {
  await page.locator('input[name="name"]').fill('Ada Lovelace');
  await page.locator('input[name="company"]').fill('Analytical Engines');
  await page.locator('input[name="email"]').fill('ada@example.com');
  await page.locator('textarea[name="message"]').fill('Hello from Playwright');
};

// The API is always mocked: these tests must never send a real message.
test.describe('contact form', () => {
  test('submits the payload and confirms success', async ({ page }) => {
    let payload: Record<string, string> | undefined;
    await page.route(API, async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ json: { message: 'Success! Thank you!' } });
    });
    await open(page, '/contact');

    await fillForm(page);
    await page.getByRole('button', { name: "Let's Talk" }).click();

    await expect(page.getByText('Success! Thank you!')).toBeVisible();
    expect(payload).toEqual({
      name: 'Ada Lovelace',
      company: 'Analytical Engines',
      email: 'ada@example.com',
      message: 'Hello from Playwright',
      subject: 'Job offer',
    });
    await expect(page.locator('input[name="name"]')).toHaveValue('');
  });

  test('shows an error when the request fails', async ({ page }) => {
    await page.route(API, (route) => route.abort());
    await open(page, '/contact');

    await fillForm(page);
    await page.getByRole('button', { name: "Let's Talk" }).click();

    await expect(
      page.getByText('There was an error sending the message')
    ).toBeVisible();
  });

  test('does not submit while required fields are empty', async ({ page }) => {
    let called = false;
    await page.route(API, (route) => {
      called = true;
      return route.abort();
    });
    await open(page, '/contact');

    await page.getByRole('button', { name: "Let's Talk" }).click();

    await expect(page.getByText('Awaiting Submission...')).toBeVisible();
    expect(called).toBe(false);
  });
});
