import { expect, test } from '@playwright/test';

const ROUTES = [
  {
    path: '/',
    title: 'Varunkumar Nagarajan',
    heading: 'Varunkumar',
    marker: 'recent writing',
  },
  {
    path: '/projects',
    title: 'Projects - varunkumar.dev',
    heading: "Things I've built",
    marker: '// projects',
    project: 'zero',
  },
  {
    path: '/about',
    title: 'About - varunkumar.dev',
    heading: 'Varunkumar Nagarajan',
    marker: '// me',
  },
];

test.describe('route smoke', () => {
  for (const route of ROUTES) {
    test(`${route.path} loads the expected page`, async ({ page }) => {
      const response = await page.goto(route.path);

      expect(response?.ok()).toBeTruthy();
      await expect(page).toHaveTitle(route.title);
      await expect(
        page.getByRole('heading', { name: route.heading })
      ).toBeVisible();
      await expect(page.getByText(route.marker)).toBeVisible();
      await expect(
        page.getByRole('button', { name: 'Go to home' })
      ).toBeVisible();
      if (route.project) {
        await expect(
          page.getByRole('link', { name: route.project })
        ).toBeVisible();
      }
    });
  }

  test('client navigation visits every SPA route', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('recent writing')).toBeVisible();

    await page.getByRole('button', { name: 'Projects' }).click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(
      page.getByRole('heading', { name: "Things I've built" })
    ).toBeVisible();

    await page.getByRole('button', { name: 'About' }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByText('// me')).toBeVisible();

    await page.getByRole('button', { name: 'Go to home' }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByText('recent writing')).toBeVisible();
  });
});
