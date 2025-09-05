// import { test } from '@playwright/test';
import { TEST_USERS } from '../src/data/test-data';
import { ProductInfo } from '../src/interfaces/user-data.interface';
import { test } from './helpers/fixtures/sauce-demo-fixture';

/**
  Feature: Flujo de compra en SauceDemo
    Como usuario de SauceDemo
    Quiero realizar un proceso de compra
    Para validar que el flujo E2E funciona correctamente

  Scenario: Completar compra con 2 productos aleatorios
    Given el se encuentra autenticado con credenciales validas
    When  agrega 2 productos al carrito de compra
    Then el contador del carrito debería reflejar la cantidad de productos agregados a medida que se agregan
    When completa el formulario de compra con datos random y finaliza la compra
    Then debería visualizar el mensaje de confirmación "THANK YOU FOR YOUR ORDER"
 */
test.describe('SauceDemo E-Commerce', () => {

  test('Flujo E2E agregando 2 productos aleatorio al carrito y completando la compra', async ({ page, loginPage, inventoryPage }) => {
    const numberOfProducts = 2;
    let selectedProducts: ProductInfo[] = [];

    await test.step('Given el se encuentra autenticado con credenciales validas', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.login(TEST_USERS.STANDARD_USER);
    });
    await test.step(`When agrega ${numberOfProducts} productos al carrito de compra`, async () => {
      await test.step('1. Navegar a SauceDemo y realizar login', async () => {
        await inventoryPage.verifyInventoryPage();
        await inventoryPage.getAvailableProductsFromPage();
      });

      await test.step('2. Validar que el carrito está vacío inicialmente', async () => {
        await inventoryPage.verifyCartIsEmpty();
      });
    });
    await test.step('Then el contador del carrito debería reflejar la cantidad de productos agregados a medida que se agregan', async () => {
      await test.step(`3. Agregar ${numberOfProducts} productos aleatorios al carrito`, async () => {
        selectedProducts = await inventoryPage.addProductsToCart(numberOfProducts);
      });
    });
    await test.step('When completa el formulario de compra con datos random y finaliza la compra', async () => { });
    await test.step('Then debería visualizar el mensaje de confirmación "THANK YOU FOR YOUR ORDER"', async () => { });

  });
});