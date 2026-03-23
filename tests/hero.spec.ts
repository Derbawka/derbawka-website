import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('hero title and subtitle are visible', async ({ page }) => {
  await expect(page.locator('.hero-title')).toBeVisible();
  await expect(page.locator('.hero-title')).toHaveText('DERBAWKA');
  await expect(page.locator('.hero-subtitle')).toBeVisible();
  await expect(page.locator('.hero-subtitle')).toHaveText('The Derbawka Family');
});

test('all four SVG layers are present', async ({ page }) => {
  await expect(page.locator('#layer-sky')).toBeAttached();
  await expect(page.locator('#layer-mountains')).toBeAttached();
  await expect(page.locator('#layer-cacti')).toBeAttached();
  await expect(page.locator('#layer-ground')).toBeAttached();
});

test('scroll hint is visible on load', async ({ page }) => {
  const scrollHint = page.locator('.scroll-hint');
  await expect(scrollHint).toBeVisible();
  await expect(scrollHint).not.toHaveClass(/hidden/);
});

test('scroll hint hides after scrolling down', async ({ page }) => {
  const scrollHint = page.locator('.scroll-hint');
  await expect(scrollHint).toBeVisible();
  await page.evaluate(() => window.scrollBy(0, 200));
  await expect(scrollHint).toHaveClass(/hidden/);
});

test('desktop: cactus-desktop visible, cactus-mobile hidden', async ({ page, viewport }) => {
  test.skip((viewport?.width ?? 0) < 768, 'Desktop-only test');
  const desktopCactus = page.locator('.cactus-desktop').first();
  const mobileCactus = page.locator('.cactus-mobile').first();
  await expect(desktopCactus).toBeVisible();
  await expect(mobileCactus).not.toBeVisible();
});

test('mobile: cactus-mobile visible, cactus-desktop hidden', async ({ page, viewport }) => {
  test.skip((viewport?.width ?? 9999) >= 768, 'Mobile-only test');
  const desktopCactus = page.locator('.cactus-desktop').first();
  const mobileCactus = page.locator('.cactus-mobile').first();
  await expect(mobileCactus).toBeVisible();
  await expect(desktopCactus).not.toBeVisible();
});
