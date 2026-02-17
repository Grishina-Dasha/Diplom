export class ProductsPage {
    constructor (page) {
        this.page = page;
        this.productTitle = page.locator('[data-test="title"]');
        this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.addToCartButton2 = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.cartButton = page.locator('[data-test="shopping-cart-link"]');
        this.cartBeadge = page.locator('[data-test="shopping-cart-badge"]');
        this.removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.sortButton = page.locator('[data-test="product-sort-container"]');
        this.prices = page.locator('[data-test="inventory-item-price"]');
    }
    async addToCart(){
        await this.addToCartButton.click();
    }

    async addToCart2(){
        await this.addToCartButton2.click();
    }

    async gotoCart(){
        await this.cartButton.click();
    }

    async getCartCount() {
    const countExists = await this.cartBeadge.count();
    if (countExists === 0) return 0;

    const text = await this.cartBeadge.textContent();
    return parseInt(text || '0', 10);
}
    async remove(){
        await this.removeButton.click();
    }

    async sortLowToHight(){
        await this.sortButton.selectOption('lohi');
    }
    async sortHightToLow(){
        await this.sortButton.selectOption('hilo');
    }
    async getPrices(){
         const pricesText = await this.prices.allTextContents();
        return pricesText.map(price =>
  Number(price.replace('$', ''))
);
    }
}