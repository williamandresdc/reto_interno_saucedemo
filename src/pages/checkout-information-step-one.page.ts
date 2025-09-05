import { expect, Locator, Page } from '@playwright/test';
import { UserCheckoutData } from '../interfaces/user-data.interface';

export class CheckoutInformationStepOnePage {
    private page: Page;
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private postalCodeInput: Locator;
    private continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = this.page.locator('[data-test="firstName"]');
        this.lastNameInput = this.page.locator('[data-test="lastName"]');
        this.postalCodeInput = this.page.locator('[data-test="postalCode"]');
        this.continueButton = this.page.locator('[data-test="continue"]');
    }

    async verifyCheckoutStepOnePage(): Promise<void> {
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.continueButton).toBeVisible();
    }

    private async fillCheckoutInformation(userData: UserCheckoutData): Promise<void> {
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.postalCodeInput.fill(userData.postalCode);
    }

    private async continueToNextStep(): Promise<void> {
        await this.continueButton.click();
    }

    async fillInformationAndContinue(userData: UserCheckoutData): Promise<void> {
        await this.fillCheckoutInformation(userData);
        await this.continueToNextStep();
    }
}
