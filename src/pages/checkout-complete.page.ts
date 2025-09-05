import { expect, Locator, Page } from '@playwright/test';
import { CHECKOUT_COMPLETE_MESSAGES } from '../utils/constants/messages.constants';

export class CheckoutCompletePage {
  private page: Page;
  private completeHeader: Locator;
  private completeText: Locator;
  private ponyExpressImage: Locator;
  private backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = this.page.locator('[data-test="complete-header"]');
    this.completeText = this.page.locator('[data-test="complete-text"]');
    this.ponyExpressImage = this.page.locator('[data-test="pony-express"]');
    this.backToProductsButton = this.page.locator('[data-test="back-to-products"]');
  }

  private async verifyCheckoutCompletePage(): Promise<void> {
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeText).toBeVisible();
    await expect(this.backToProductsButton).toBeVisible();
  }

  private async validateThankYouMessage(): Promise<void> {
    await expect(this.completeHeader).toHaveText(CHECKOUT_COMPLETE_MESSAGES.THANK_YOU_HEADER);
  }

  private async validateDispatchMessage(): Promise<void> {
    await expect(this.completeText).toHaveText(CHECKOUT_COMPLETE_MESSAGES.DISPATCH_MESSAGE);
  }

  async validateCompleteOrderConfirmation(): Promise<void> {
    await this.verifyCheckoutCompletePage();
    await this.validateThankYouMessage();
    await this.validateDispatchMessage();
  }

}
