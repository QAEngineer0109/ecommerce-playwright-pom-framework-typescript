import { Page, expect } from '@playwright/test';

export class CategoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openProductByName(productName: string): Promise<void> {
    // 🔥 CHANGED: scope to product list to avoid strict-mode match in #cart
    const product = this.page.locator('#product-list').getByText(productName, { exact: true });

    await expect(product).toBeVisible({ timeout: 15000 });
    await product.click();
  }
}