import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('contact form exists and has Formspree action', async ({ page }) => {
  const form = page.locator('form');
  await expect(form).toBeAttached();
  const action = await form.getAttribute('action');
  expect(action).toContain('formspree.io/f/');
});

test('contact form has required name field', async ({ page }) => {
  const nameField = page.locator('#name');
  await expect(nameField).toBeAttached();
  await expect(nameField).toHaveAttribute('required', '');
});

test('contact form has required message field', async ({ page }) => {
  const messageField = page.locator('#message');
  await expect(messageField).toBeAttached();
  await expect(messageField).toHaveAttribute('required', '');
});

test('footer Family Hub link points to hub.derbawka.com', async ({ page }) => {
  const hubLink = page.locator('.footer-hub-link');
  await expect(hubLink).toBeVisible();
  await expect(hubLink).toHaveAttribute('href', 'https://hub.derbawka.com');
  await expect(hubLink).toContainText('Family Hub');
});

test('decorative stars are present in the hero', async ({ page }) => {
  // The SVG layer-sky should contain star elements (circles or paths)
  const starElements = page.locator('#layer-sky circle, #layer-sky path, #layer-sky rect');
  const count = await starElements.count();
  expect(count).toBeGreaterThan(0);
});

test('contact section is reachable by scrolling', async ({ page }) => {
  const contactSection = page.locator('#contact');
  await expect(contactSection).toBeAttached();
  await contactSection.scrollIntoViewIfNeeded();
  await expect(contactSection).toBeVisible();
});
