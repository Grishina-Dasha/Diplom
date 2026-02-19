export class Checkout_Step {
    constructor (page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.completeHeader = page.locator('[data-test="complete-header"]');
    }

    async  making_order(firstName,lastName,postCode){
        await this.firstNameInput.click();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.click();
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.click();
        await this.postalCodeInput.fill(postCode);
        await this.continueButton.click();
        await this.finishButton.click();
    }

}