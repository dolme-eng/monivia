import { test, expect } from '@playwright/test';

test.describe('Loan Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#richiedi');
  });

  test('should display loan form', async ({ page }) => {
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.click('button[type="submit"]');
    
    // Check for validation errors
    const errorMessages = page.locator('text=required');
    await expect(errorMessages).toBeVisible();
  });

  test('should allow filling personal information', async ({ page }) => {
    await page.fill('input[name="nome"]', 'Mario');
    await page.fill('input[name="cognome"]', 'Rossi');
    await page.fill('input[name="email"]', 'mario.rossi@example.com');
    await page.fill('input[name="telefono"]', '+393508533366');
    await page.fill('input[name="codiceFiscale"]', 'RSSMRA80A01H501U');
    
    // Verify fields are filled
    await expect(page.locator('input[name="nome"]')).toHaveValue('Mario');
    await expect(page.locator('input[name="cognome"]')).toHaveValue('Rossi');
  });

  test('should allow filling financial information', async ({ page }) => {
    await page.fill('input[name="importo"]', '10000');
    await page.fill('input[name="durata"]', '36');
    await page.selectOption('select[name="impiego"]', 'dipendente');
    await page.fill('input[name="reddito"]', '2500');
    
    // Verify fields are filled
    await expect(page.locator('input[name="importo"]')).toHaveValue('10000');
  });

  test('should require consent checkboxes', async ({ page }) => {
    // Fill required fields
    await page.fill('input[name="nome"]', 'Mario');
    await page.fill('input[name="cognome"]', 'Rossi');
    await page.fill('input[name="email"]', 'mario.rossi@example.com');
    await page.fill('input[name="telefono"]', '+393508533366');
    await page.fill('input[name="codiceFiscale"]', 'RSSMRA80A01H501U');
    
    // Try to submit without consent
    await page.click('button[type="submit"]');
    
    // Check for consent validation
    const consentError = page.locator('text=privacy');
    await expect(consentError).toBeVisible();
  });
});
