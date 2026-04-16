import { test, expect } from '@playwright/test';

test('Full Inheritance Plan Flow', async ({ page }) => {
  // Go to the app
  await page.goto('http://localhost:5173');

  // Click to start plan creation (adjust selector as needed)
  await page.click('text=Create Plan');

  // Add a beneficiary
  await page.click('text=Add Another Beneficiary');
  await page.fill('input[placeholder="Enter name"]', 'John Doe');
  await page.fill('input[placeholder="0x..."]', '0x1234567890abcdef1234567890abcdef12345678');
  await page.fill('input[type="number"]', '100');

  // Proceed to next step
  await page.click('text=Next: Review Plan');

  // Choose a plan type (adjust selector as needed)
  await page.click('text=Time-Lock');
  await page.click('text=Continue');

  // Review and confirm
  await page.click('text=Confirm & Protect Plan');

  // Expect a success message (adjust selector/text as needed)
  await expect(page.locator('text=protected successfully')).toBeVisible();
});