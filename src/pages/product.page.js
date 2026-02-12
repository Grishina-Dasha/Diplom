export class ProductsPage {
    constructor (page) {
        this.page = page;
        this.productTitle = page.locator('[data-test="title"]');
        //this.addToCartButton = page.getByRole('button',{name:"Add to cart"}).first();
        this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.addToCartButton2 = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.cartButton = page.locator('[data-test="shopping-cart-link"]');
        this.cartBeadge = page.locator('[data-test="shopping-cart-badge"]');
        this.removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    }
    //добавление в корзину
    async addToCart(){
        await this.addToCartButton.click();
    }

    async addToCart2(){
        await this.addToCartButton2.click();
    }
    //переход в корзину
    async gotoCart(){
        await this.cartButton.click();
    }
    //считывание текущего значения в счетчике
    async getCartCount() {
    const countExists = await this.cartBeadge.count(); // проверяем, есть ли элемент
    if (countExists === 0) return 0; // если бейджа нет, считаем 0

    const text = await this.cartBeadge.textContent();
    return parseInt(text || '0', 10);
}
    async remove(){
        await this.removeButton.click();
    }
}