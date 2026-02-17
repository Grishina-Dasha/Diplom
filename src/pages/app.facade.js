import { AuthorizationPage,ProductsPage,Menu,Cart,Checkout_Step } from './index';
import { expect } from '@playwright/test';

export class AppFacade {
constructor(page){
    this.page = page;
    this.authPage = new AuthorizationPage(page);
    this.products = new ProductsPage(page);
    this.menu = new Menu(page);
    this.cart = new Cart(page);
    this.checkout_step = new Checkout_Step(page);
}
async login(user) {
    await this.authPage.open();
    await this.authPage.authorization(user.name, user.password);
  }

async logout() {
    await this.menu.Logout();
  }

  
async expectLoginFormVisible() {
  await expect(this.authPage.nameInput).toBeVisible();
  await expect(this.authPage.passwordInput).toBeVisible();
  await expect(this.authPage.loginButton).toBeVisible();
}

async expectErrorVisible(message) {
    await expect(this.authPage.textError).toContainText(message);
}

 async addProductsToCart(count = 1) {
  const productButtons = [
    this.products.addToCartButton,
    this.products.addToCartButton2,
  ];

  for (let i = 0; i < count; i++) {
    if (i < productButtons.length) {
      await productButtons[i].click();
    } else {
      throw new Error(`Нет кнопки для товара №${i+1}`);
    }
  }
}

  async removeProductFromCart() {
    await this.products.remove();
  }

  async goToCart() {
    await this.products.gotoCart();
  }

  async checkout(userData) {
    const { firstName, lastName, postCode } = userData;
    await this.cart.checkout();
    await this.checkout_step.making_order(firstName, lastName, postCode);
  }
  async sortByPriceLowToHight(){
    await this.products.sortLowToHight();
  }
  async sortByPriceHightToLow(){
    await this.products.sortHightToLow();
  }
  async getProductPrices(){
    return await this.products.getPrices();
  }
}
