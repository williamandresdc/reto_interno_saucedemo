import { expect, Locator, Page } from '@playwright/test';
import { ProductInfo } from '../interfaces/user-data.interface';

export class CheckoutOverviewStepTwoPage {
    private page: Page;
    private cartItems: Locator;
    private finishButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.cartItems = this.page.locator("//ancestor::div[@class='cart_item']");
        this.finishButton = this.page.locator('[data-test="finish"]');
    }


    async verifyCheckoutStepTwoPage(): Promise<void> {
        await expect(this.finishButton).toBeVisible();
    }

    async validateCheckoutSummary(selectedProducts: ProductInfo[]): Promise<void> {
        for (const product of selectedProducts) {
            await expect(this.page.getByText(product.name!).nth(0)).toBeVisible();
            await expect(this.page.getByText(product.name!).locator(this.cartItems).getByText(product.price!)).toBeVisible();
        }
    }

    async finishPurchase(): Promise<void> {
        await this.finishButton.click();
    }


}
