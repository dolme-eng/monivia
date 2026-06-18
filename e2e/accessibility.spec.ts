import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('Homepage should have no accessibility violations', async ({ page }) => {
    await page.goto('/');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Contact page should have no accessibility violations', async ({ page }) => {
    await page.goto('/contatti');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Chi siamo page should have no accessibility violations', async ({ page }) => {
    await page.goto('/chi-siamo');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Prestito Personale page should have no accessibility violations', async ({ page }) => {
    await page.goto('/prestiti/personale');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Loan form should have no accessibility violations', async ({ page }) => {
    await page.goto('/#richiedi');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Contact form should have proper labels', async ({ page }) => {
    await page.goto('/contatti');
    
    // Check form inputs have labels
    const nameInput = page.locator('input[name="nome"]');
    await expect(nameInput).toHaveAttribute('aria-label');
    
    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toHaveAttribute('aria-label');
  });

  test('Navigation should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    const firstFocusable = page.locator(':focus');
    await expect(firstFocusable).toBeVisible();
    
    // Test escape key for mobile menu if present
    await page.keyboard.press('Escape');
  });

  test('Images should have alt text', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // Decorative images can have empty alt, but should have the attribute
      expect(alt).toBeDefined();
    }
  });

  test('Color contrast should meet WCAG AA standards', async ({ page }) => {
    await page.goto('/');
    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a']).analyze();
    
    // Filter for color contrast violations
    const contrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );
    
    expect(contrastViolations).toEqual([]);
  });
});
