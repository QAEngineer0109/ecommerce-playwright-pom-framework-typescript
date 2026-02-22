import { Page, Locator, expect } from '@playwright/test'; 
// ➕ ADDED expect import

export class LoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.email = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async login(username: string, password: string): Promise<void> {

    // ➕ ADDED (wait until login form is visible before interacting)
    await expect(this.email).toBeVisible({ timeout: 15000 });

    await this.email.fill(username);
    await this.password.fill(password);

    // ➕ ADDED (ensure button is clickable)
    await expect(this.loginButton).toBeEnabled({ timeout: 10000 });
    await this.loginButton.click();
  }
}

