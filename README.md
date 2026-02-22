# 🛒 E-commerce Playwright POM Framework (TypeScript)

A scalable end-to-end automation framework built using **Playwright + TypeScript** following the **Page Object Model (POM)** design pattern.

This framework is designed for testing modern e-commerce flows such as login, product selection, cart management, and checkout.

## 🚀 One-Step Setup & Run

```bash
git clone https://github.com/QAEngineer0109/ecommerce-playwright-pom-framework-typescript.git
cd ecommerce-playwright-pom-framework-typescript
npm install
npx playwright install
npm test
npm run report
```

## 🧰 Tech Stack

- Playwright Test
- TypeScript
- Page Object Model (POM)
- Playwright HTML Reporter
- Multi-browser execution

## 📦 Prerequisites

- Node.js (LTS recommended)
- npm

Verify installation:

```bash
node -v
npm -v
```

## ▶️ Running Tests

**Run all tests:**

```bash
npm test
```

**Run by tag:**

```bash
npm run sanity
npm run regression
npm run datadriven
```

## 🏷️ Tagging Convention Example

```ts
import { test } from '@playwright/test';

test('@sanity Login works successfully', async ({ page }) => {
  // test steps
});

test('@regression Checkout flow works', async ({ page }) => {
  // test steps
});

test('@datadriven Login with multiple users', async ({ page }) => {
  // test steps
});
```

## 🌍 Cross Browser Support

Configured to run on:

- Chrome (Chromium)
- Firefox
- Edge
- Safari (WebKit)

Configuration includes:

- `headless: false`
- `retries: 1`
- `timeout: 90s`
- HTML reporter enabled
- Screenshots, videos, and traces saved on failure

## 📊 View Test Report

```bash
npm run report
```

## 📁 Project Structure

```text
ecommerce-playwright-pom-framework-typescript/
├── pages/
├── tests/
├── utils/
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🏗 Framework Design

### Page Object Model (POM)

- All locators live inside `pages/`
- Tests contain business logic only
- Improves maintainability and scalability

Example:

```ts
export class LoginPage {
  constructor(private page: any) {}

  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }
}
```

## 👨‍💻 Author

QAEngineer0109  
https://github.com/QAEngineer0109/ecommerce-playwright-pom-framework-typescript

## 🚀 Happy Testing!
