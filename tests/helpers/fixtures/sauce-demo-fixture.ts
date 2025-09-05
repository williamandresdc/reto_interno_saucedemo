//documentación oficial de fixtures: https://playwright.dev/docs/test-fixtures

import {test as base} from "@playwright/test"
import { LoginPage } from "../../../src/pages/login.page"
import { CartPage } from "../../../src/pages/cart.page"
import { CheckoutCompletePage } from "../../../src/pages/checkout-complete.page"
import { CheckoutInformationStepOnePage } from "../../../src/pages/checkout-information-step-one.page"
import { CheckoutOverviewStepTwoPage } from "../../../src/pages/checkout-overview-step-two.page"
import { InventoryPage } from "../../../src/pages/inventory.page"



export type MyFixtures = {
    loginPage: LoginPage
    inventoryPage: InventoryPage
    cartPage: CartPage
    checkoutInformationStepOnePage: CheckoutInformationStepOnePage
    checkoutOverviewStepTwoPage: CheckoutOverviewStepTwoPage
    checkoutCompletePage: CheckoutCompletePage
}

export const test = base.extend<MyFixtures>({
    //para que se ejecute cada una de ellas se debe pasar por parametro al test ej:
    //test('POM with PageManager', async ({ pageManager }) => {}))
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },

    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page))
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page))
    },

    checkoutInformationStepOnePage: async ({ page }, use) => {
        await use(new CheckoutInformationStepOnePage(page))
    },
    checkoutOverviewStepTwoPage: async ({ page }, use) => {
        await use(new CheckoutOverviewStepTwoPage(page))
    },
    checkoutCompletePage: async ({ page }, use) => {
        await use(new CheckoutCompletePage(page))
    }
})

export { expect } from "@playwright/test"