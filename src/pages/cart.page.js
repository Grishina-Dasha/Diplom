export class Cart {
    constructor (page) {
        this.page = page;
        this.cardTitle = page.locator('[data-test="title"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async checkout(){
        await this.checkoutButton.click();
    }

}