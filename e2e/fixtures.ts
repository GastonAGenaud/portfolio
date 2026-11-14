import { expect, type Page, test as base } from '@playwright/test';

/**
 * Opens a route and waits for React to hydrate. PersonaProvider sets
 * `data-persona` on <html> in an effect, so its presence means handlers are live.
 */
export async function open(page: Page, path = '/') {
  const response = await page.goto(path);
  await expect(page.locator('html')).toHaveAttribute('data-persona', /.+/);
  return response;
}

export const test = base;
export { expect };
