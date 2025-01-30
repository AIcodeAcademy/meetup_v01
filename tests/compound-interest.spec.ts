import { expect, test } from '@playwright/test';
import { CompoundingFrequency } from '../src/types/interest-calculator-types';

test.describe('Compound Interest Calculator', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should calculate compound interest with annual compounding', async ({ page }) => {
        // Given I am on the calculator page
        const inputPrincipal = 1000;
        const inputRate = 5;
        const inputYears = 5;
        const expectedEndingPrincipal = 1276.28; // (1000 * (1 + 0.05)^5)

        // When I enter valid input parameters
        await page.fill('#principalAmount', inputPrincipal.toString());
        await page.fill('#annualInterestRate', inputRate.toString());
        await page.selectOption('#compoundingFrequency', CompoundingFrequency.Annually);
        await page.fill('#timePeriod', inputYears.toString());
        await page.click('button[type="submit"]');

        // Then I should see the correct calculation results
        const lastRowEndingPrincipal = await page.locator('table tr:last-child td:last-child').textContent();
        const actualEndingPrincipal = parseFloat(lastRowEndingPrincipal!.replace(/[^0-9.]/g, ''));
        expect(actualEndingPrincipal).toBeCloseTo(expectedEndingPrincipal, 2);
    });

    test('should calculate compound interest with monthly compounding', async ({ page }) => {
        // Given I am on the calculator page
        const inputPrincipal = 1000;
        const inputRate = 5;
        const inputYears = 5;
        const expectedEndingPrincipal = 1283.36; // (1000 * (1 + 0.05/12)^(12*5))

        // When I enter valid input parameters with monthly compounding
        await page.fill('#principalAmount', inputPrincipal.toString());
        await page.fill('#annualInterestRate', inputRate.toString());
        await page.selectOption('#compoundingFrequency', CompoundingFrequency.Monthly);
        await page.fill('#timePeriod', inputYears.toString());
        await page.click('button[type="submit"]');

        // Then I should see the correct calculation results
        const lastRowEndingPrincipal = await page.locator('table tr:last-child td:last-child').textContent();
        const actualEndingPrincipal = parseFloat(lastRowEndingPrincipal!.replace(/[^0-9.]/g, ''));
        expect(actualEndingPrincipal).toBeCloseTo(expectedEndingPrincipal, 2);
    });

    test('should validate input parameters', async ({ page }) => {
        // Given I am on the calculator page
        
        // When I enter invalid input parameters
        await page.fill('#principalAmount', '-1000');
        await page.fill('#annualInterestRate', '101');
        await page.fill('#timePeriod', '0');
        
        // Then I should see validation errors
        const submitButton = page.locator('button[type="submit"]');
        await expect(submitButton).toBeDisabled();
        
        // And when I enter valid values
        await page.fill('#principalAmount', '1000');
        await page.fill('#annualInterestRate', '5');
        await page.fill('#timePeriod', '5');
        
        // Then the submit button should be enabled
        await expect(submitButton).toBeEnabled();
    });

    test('should display all required table columns', async ({ page }) => {
        // Given I am on the calculator page
        const inputPrincipal = 1000;
        const inputRate = 5;
        const inputYears = 5;

        // When I submit the form with valid inputs
        await page.fill('#principalAmount', inputPrincipal.toString());
        await page.fill('#annualInterestRate', inputRate.toString());
        await page.fill('#timePeriod', inputYears.toString());
        await page.click('button[type="submit"]');

        // Then I should see a table with all required columns
        await expect(page.locator('table th:nth-child(1)')).toHaveText('Year');
        await expect(page.locator('table th:nth-child(2)')).toHaveText('Starting Principal');
        await expect(page.locator('table th:nth-child(3)')).toHaveText('Interest Earned');
        await expect(page.locator('table th:nth-child(4)')).toHaveText('Ending Principal');

        // And the table should have the correct number of rows
        const rows = await page.locator('table tbody tr').count();
        expect(rows).toBe(inputYears);
    });

    test('should handle currency formatting correctly', async ({ page }) => {
        // Given I am on the calculator page
        const inputPrincipal = 1234567.89;
        
        // When I enter a large principal amount
        await page.fill('#principalAmount', inputPrincipal.toString());
        await page.fill('#annualInterestRate', '5');
        await page.fill('#timePeriod', '1');
        await page.click('button[type="submit"]');

        // Then all monetary values should be properly formatted
        const startingPrincipal = await page.locator('table tbody tr:first-child td:nth-child(2)').textContent();
        expect(startingPrincipal).toMatch(/^\$1,234,567\.89$/);
    });
}); 