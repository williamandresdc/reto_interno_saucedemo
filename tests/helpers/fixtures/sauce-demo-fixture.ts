//documentación oficial de fixtures: https://playwright.dev/docs/test-fixtures

import {test as base} from "@playwright/test"
import { LoginPage } from "../../../src/pages/login.page"




export type MyFixtures = {
    loginPage: LoginPage

}

export const test = base.extend<MyFixtures>({
    //para que se ejecute cada una de ellas se debe pasar por parametro al test ej:
    //test('POM with PageManager', async ({ pageManager }) => {}))
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    }
})

export { expect } from "@playwright/test"