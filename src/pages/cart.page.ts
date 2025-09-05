import { expect, Locator, Page } from '@playwright/test';
import { ProductInfo } from '../interfaces/user-data.interface';

export class CartPage {
  private page: Page;
  private cartItems: Locator;
  private checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = this.page.locator("//ancestor::div[@class='cart_item']");
    this.checkoutButton = this.page.locator('[data-test="checkout"]');
  }

  async verifyCartPage(): Promise<void> {
    await expect(this.checkoutButton).toBeVisible();
  }

  async validateProductsInCart(selectedProducts: ProductInfo[]): Promise<void> {
 
    for (const product of selectedProducts) {
      await expect(this.page.getByText(product.name!).nth(0)).toBeVisible();
      await expect(this.page.getByText(product.price!).nth(0)).toBeVisible();
    }

    // Verificar cantidad total de productos acorde a cantidad agregada inicialmente
    await expect(this.cartItems).toHaveCount(selectedProducts.length);
  }
 
  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
