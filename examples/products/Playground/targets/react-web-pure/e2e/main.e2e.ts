import { join } from 'node:path';

import { expect, type Page, test } from '@playwright/test';

let photoIdx = 1;

async function shoot(page: Page) {
    await page.screenshot({
        path: join(
            import.meta.dirname,
            'screenshots',
            `picture_${photoIdx}.png`,
        ),
    });
    photoIdx += 1;
}

test('should execute use cases', async ({ page }) => {
    // Given
    const { URL } = process.env;
    if (!URL) {
        throw new Error('Set process.env.URL');
    }

    // When
    await page.goto(URL);

    // Then
    await shoot(page);
    expect(page).toHaveTitle(/Playground/, { timeout: 10000 }); // Next.js can be long to warm up...

    const rowsT0 = await page.locator('table tbody tr').count();

    await test.step('create album', async () => {
        // Given
        const nameField = page.getByLabel('Name');
        const saveButton = page.getByText('Save');

        // When
        await nameField.fill('Alive 2007');
        await saveButton.click();
        await page.locator('Saving').waitFor({ state: 'hidden' });

        // Then
        const rowsT1 = page.locator('table tbody tr');
        await shoot(page);
        await expect(rowsT1).toHaveCount(rowsT0 + 1);
    });

    await test.step('delete album', async () => {
        // Given
        const deleteButton = page.getByText('Delete').first();
        page.once('dialog', (dialog) => dialog.accept());

        // When
        await deleteButton.click();
        await shoot(page);
        await page.locator('Deleting').waitFor({ state: 'detached' });

        // Then
        const rowsT2 = page.locator('table tbody tr');
        await expect(rowsT2).toHaveCount(rowsT0);
        await shoot(page);
    });
});
