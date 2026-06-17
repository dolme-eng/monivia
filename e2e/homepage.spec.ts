import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Monivia/);
  });

  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('h1');
    await expect(hero).toContainText('Prestiti online');
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');
    
    // Test Prestiti link
    await page.click('text=Prestiti');
    await expect(page).toHaveURL(/\/#prestiti/);
    
    // Test Chi siamo link
    await page.click('text=Chi siamo');
    await expect(page).toHaveURL('/chi-siamo');
  });

  test('should display contact information', async ({ page }) => {
    await page.goto('/');
    const phone = page.locator('text=+39 350 853 3366');
    await expect(phone).toBeVisible();
  });

  test('should have working loan simulator', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#calcolatore');
    
    // Check if simulator is visible
    const simulator = page.locator('#calcolatore');
    await expect(simulator).toBeVisible();
  });
});
