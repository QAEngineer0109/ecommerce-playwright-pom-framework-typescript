import { expect, type Page, type Locator } from '@playwright/test';

export class AffiliatePage {
  readonly page: Page;
  readonly affiliateFooterLink: Locator;
  readonly company: Locator;
  readonly website: Locator;
  readonly taxId: Locator;
  readonly chequePayee: Locator;
  readonly continueButton: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    this.page = page;

    this.affiliateFooterLink = page.getByRole('link', { name: 'Affiliate', exact: true });

    this.company = page.getByRole('textbox', { name: 'Company' });
    this.website = page.getByRole('textbox', { name: 'Web Site' });
    this.taxId = page.getByRole('textbox', { name: 'Tax ID' });
    this.chequePayee = page.getByRole('textbox', { name: '* Cheque Payee Name' });

    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.successAlert = page.locator('div.alert.alert-success.alert-dismissible');
  }

  async openFromFooter(): Promise<void> {
    // ➕ ADDED: wait before click (footer links can render late)
    await expect(this.affiliateFooterLink).toBeVisible({ timeout: 15000 });
    await this.affiliateFooterLink.click();

    // ➕ ADDED: confirm form is ready (prevents fill racing page load)
    await expect(this.company).toBeVisible({ timeout: 15000 });
  }

  async fillAffiliateForm(
    {
      company,
      website,
      taxId,
      payeeName,
    }: {
      company: string;
      website: string;
      taxId: string;
      payeeName: string;
    }
  ): Promise<void> {
    // ➕ ADDED: wait for first field, then fill (stable baseline)
    await expect(this.company).toBeVisible({ timeout: 15000 });

    await this.company.fill(company);
    await this.website.fill(website);
    await this.taxId.fill(taxId);
    await this.chequePayee.fill(payeeName);
  }

  async submit(): Promise<void> {
    // ➕ ADDED: button ready checks
    await expect(this.continueButton).toBeVisible({ timeout: 15000 });
    await expect(this.continueButton).toBeEnabled({ timeout: 10000 });
    await this.continueButton.click();
  }

  async expectSuccessContains(text: string): Promise<void> {
    // 🔥 CHANGED: added timeouts (so it doesn't hang forever)
    await expect(this.successAlert).toBeVisible({ timeout: 15000 });
    await expect(this.successAlert).toContainText(text, { timeout: 15000 });
  }
}