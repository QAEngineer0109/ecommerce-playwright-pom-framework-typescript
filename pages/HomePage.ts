import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly myAccountIcon: Locator;
  readonly laptopsAndNotebooksMenu: Locator;
  readonly showAllLaptopsAndNotebooks: Locator;
  readonly checkoutLink: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header / top navigation
    this.myAccountIcon = page.locator('.fa-solid.fa-user');
    this.laptopsAndNotebooksMenu = page.getByRole('link', { name: 'Laptops & Notebooks', exact: true });
    this.showAllLaptopsAndNotebooks = page.getByRole('link', { name: 'Show All Laptops & Notebooks' });
    this.checkoutLink = page.getByRole('link', { name: 'Checkout' });

    // My Account dropdown links
    this.loginLink = page.getByRole('link', { name: 'Login' });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://cloudberrystore.services/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
  }

  async openMyAccount(): Promise<void> {
    await expect(this.myAccountIcon).toBeVisible({ timeout: 15000 });
    await this.myAccountIcon.click();
  }

  async clickLogin(): Promise<void> {
    await expect(this.loginLink).toBeVisible({ timeout: 15000 });
    await this.loginLink.click();
  }

  async openAllLaptopsAndNotebooks(): Promise<void> {
    await expect(this.laptopsAndNotebooksMenu).toBeVisible({ timeout: 15000 });

    // ✅ Stable approach: navigate using the link's href (avoids flaky hover/click on dropdown toggles)
    const href = await this.laptopsAndNotebooksMenu.getAttribute('href');
    if (!href) {
      throw new Error('Laptops & Notebooks menu link has no href attribute.');
    }

    await this.page.goto(href, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Optional: click "Show All..." only if it exists on the page
    if (await this.showAllLaptopsAndNotebooks.isVisible().catch(() => false)) {
      await this.showAllLaptopsAndNotebooks.click();
    }
  }

  async goToCheckout(): Promise<void> {
    await expect(this.checkoutLink).toBeVisible({ timeout: 15000 });
    await this.checkoutLink.click();
  }
}