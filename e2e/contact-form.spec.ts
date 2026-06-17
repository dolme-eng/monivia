import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contatti');
  });

  test('should display contact form', async ({ page }) => {
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('should display contact information cards', async ({ page }) => {
    const phoneCard = page.locator('text=Chiamaci');
    const emailCard = page.locator('text=Scrivici');
    const addressCard = page.locator('text=Trovaci');
    
    await expect(phoneCard).toBeVisible();
    await expect(emailCard).toBeVisible();
    await expect(addressCard).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.click('button[type="submit"]');
    
    // Check for validation errors
    const errorMessages = page.locator('text=required');
    await expect(errorMessages).toBeVisible();
  });

  test('should allow filling contact form', async ({ page }) => {
    await page.fill('input[name="nome"]', 'Mario');
    await page.fill('input[name="email"]', 'mario.rossi@example.com');
    await page.fill('input[name="oggetto"]', 'Informazioni prestito');
    await page.fill('textarea[name="message"]', 'Vorrei informazioni su un prestito personale.');
    
    // Verify fields are filled
    await expect(page.locator('input[name="nome"]')).toHaveValue('Mario');
    await expect(page.locator('input[name="email"]')).toHaveValue('mario.rossi@example.com');
  });

  test('should have honeypot field hidden', async ({ page }) => {
    const honeypot = page.locator('input[name="website"]');
    await expect(honeypot).toHaveAttribute('aria-hidden', 'true');
    await expect(honeypot).toHaveAttribute('tabindex', '-1');
  });
});
