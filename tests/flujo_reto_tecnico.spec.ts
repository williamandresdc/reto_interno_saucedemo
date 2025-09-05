 import { test } from '@playwright/test';

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

  test('Flujo E2E agregando 2 productos aleatorio al carrito y completando la compra', async ({ page }) => {
    const numberOfProducts = 2;
   
    await test.step('Given el se encuentra autenticado con credenciales validas', async () => {});
    await test.step(`When agrega ${numberOfProducts} productos al carrito de compra`, async () =>{} );
    await test.step('Then el contador del carrito debería reflejar la cantidad de productos agregados a medida que se agregan', async () => {});
    await test.step('When completa el formulario de compra con datos random y finaliza la compra', async () => {});
    await test.step('Then debería visualizar el mensaje de confirmación "THANK YOU FOR YOUR ORDER"', async () =>{} );

  });
});