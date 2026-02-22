import { expect, type Page, type Locator } from '@playwright/test';

export class CheckOutPage {
  readonly page: Page;
  readonly loginPageLink: Locator;

  readonly shippingAddressSelect: Locator;
  readonly shippingMethodsButton: Locator;

  // 🔥 CHANGED: use step-specific continue buttons instead of generic "Continue"
  readonly continueShippingButton: Locator;
  readonly paymentMethodsButton: Locator;
  readonly continuePaymentButton: Locator;

  readonly confirmOrderButton: Locator;
  readonly orderPlacedHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginPageLink = page.getByRole('link', { name: 'login page' });

    // Checkout controls
    this.shippingAddressSelect = page.locator('#input-shipping-address');

    // existing IDs you already used
    this.shippingMethodsButton = page.locator('#button-shipping-methods');
    this.paymentMethodsButton = page.locator('#button-payment-methods');

    // ✅ Step-specific continue buttons (removes strict-mode / wrong button issues)
    this.continueShippingButton = page.locator('#button-shipping-method');
    this.continuePaymentButton = page.locator('#button-payment-method');

    this.confirmOrderButton = page.getByRole('button', { name: 'Confirm Order' });

    this.orderPlacedHeading = page.getByRole('heading', { name: 'Your order has been placed!' });
  }

  async clickLoginPage(): Promise<void> {
    await expect(this.loginPageLink).toBeVisible({ timeout: 15000 });
    await this.loginPageLink.click();
  }

  async selectShippingAddressByIndex(index: number): Promise<void> {
    await expect(this.shippingAddressSelect).toBeVisible({ timeout: 15000 });
    await this.shippingAddressSelect.selectOption({ index });
  }

  async continueShipping(): Promise<void> {
    await expect(this.shippingMethodsButton).toBeVisible({ timeout: 15000 });
    await this.shippingMethodsButton.click();

    await expect(this.continueShippingButton).toBeVisible({ timeout: 15000 });
    await expect(this.continueShippingButton).toBeEnabled({ timeout: 15000 });
    await this.continueShippingButton.click();
  }

  async continuePayment(): Promise<void> {
    await expect(this.paymentMethodsButton).toBeVisible({ timeout: 15000 });
    await this.paymentMethodsButton.click();

    await expect(this.continuePaymentButton).toBeVisible({ timeout: 15000 });
    await expect(this.continuePaymentButton).toBeEnabled({ timeout: 15000 });
    await this.continuePaymentButton.click();
  }

  async confirmOrder(): Promise<void> {
    await expect(this.confirmOrderButton).toBeVisible({ timeout: 15000 });
    await expect(this.confirmOrderButton).toBeEnabled({ timeout: 15000 });
    await this.confirmOrderButton.click();
  }

  async isOrderPlacedVisible(): Promise<boolean> {
    return await this.orderPlacedHeading.isVisible();
  }
}