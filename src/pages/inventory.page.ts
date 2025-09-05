import { expect, Locator, Page } from '@playwright/test';
import { ProductInfo } from '../interfaces/user-data.interface';

export class InventoryPage {
  private page: Page;
  private shoppingCartBadge: Locator;
  private shoppingCartLink: Locator;
  private inventoryItems: Locator;
  private inventoryItemName: Locator;
  private inventoryItemPrice: Locator;
  private inventoryItemAddToCartButton: Locator;
  private selectedProducts: ProductInfo[] = [];
  private availableProducts: ProductInfo[] = [];

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = this.page.locator('.inventory_item');
    this.inventoryItemName = this.page.locator('.inventory_item_name');
    this.inventoryItemPrice = this.page.locator('.inventory_item_price');
    this.inventoryItemAddToCartButton = this.page.locator('button[data-test*="add-to-cart"]');
    this.shoppingCartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    this.shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');
  }

  async verifyInventoryPage(): Promise<void> {
    await expect(this.shoppingCartLink).toBeVisible();
  }


  async verifyCartIsEmpty(): Promise<void> {
    await expect(this.shoppingCartBadge).not.toBeVisible();
  }

  async getAvailableProductsFromPage(): Promise<ProductInfo[]> {
    const productList: ProductInfo[] = [];
    const items = await this.inventoryItems.all();

    for (const item of items) {
      const name = await item.locator(this.inventoryItemName).textContent() || undefined;
      const price = await item.locator(this.inventoryItemPrice).textContent() || undefined;
      const addToCartButton = item.locator(this.inventoryItemAddToCartButton);
      productList.push({
        name,
        price,
        addToCartButton,
      })
    }
    this.availableProducts = productList;
    return productList;
  }

    async addProductsToCart(quantity: number = 2): Promise<ProductInfo[]> {
    this.selectedProducts = await this.selectRandomProducts(quantity);

    for (let i = 0; i < this.selectedProducts.length; i++) {
      await this.selectedProducts[i].addToCartButton.click();
      // Verificar que el contador de carrito de compra se incrementa correctamente
      const expectedCount = (i + 1).toString();
      await expect(this.shoppingCartBadge).toHaveText(expectedCount);
    }
    return this.selectedProducts;
  }

    private async selectRandomProducts(quantity: number): Promise<ProductInfo[]> {
    if (quantity > this.availableProducts.length) {
      throw new Error(`No se pueden seleccionar ${quantity} productos. Solo hay ${this.availableProducts.length} disponibles.`);
    }
    const shuffled = [...this.availableProducts].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, quantity);

    return selected;
  }

}
