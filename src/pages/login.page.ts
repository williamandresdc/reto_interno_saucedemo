import { expect, Locator, Page } from '@playwright/test';
import { LoginCredentials } from '../interfaces/user-data.interface';

export class LoginPage {

  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = this.page.locator('[data-test="username"]');
    this.passwordInput = this.page.locator('[data-test="password"]');
    this.loginButton = this.page.locator('[data-test="login-button"]');
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto('/');
    await this.verifyLoginPage()
  }

  async login(credentials: LoginCredentials): Promise<void> {
    await this.usernameInput.fill(credentials.username!);
    await this.passwordInput.fill(credentials.password!);
    await this.loginButton.click();
  }

  private async verifyLoginPage(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}
