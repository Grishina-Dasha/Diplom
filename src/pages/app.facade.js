import { AuthorizationPage,ProductsPage,Menu,Cart,Checkout_Step } from './index';
import {test} from '@playwright/test'

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
  await test.step('Авторизация пользователя', async () => {
    await this.authPage.open();
    await this.authPage.authorization(user.name, user.password);
  });
  }

async logout() {
  await test.step('Выход из аккаунта', async () => {
    await this.menu.Logout();
  });
}

getErrorMessage() {
  return this.authPage.textError;
}

async addProductsToCart(count = 1) {
  await test.step(`Добавление ${count} элемента в корзину`, async () => {
    const productButtons = [
      this.products.addToCartButton,
      this.products.addToCartButton2,
    ];

    for (let i = 0; i < count; i++) {
      if (i < productButtons.length) {
        await productButtons[i].click();
      } else {
        throw new Error(`Нет кнопки для товара №${i + 1}`);
      }
    }
  });
}


  async removeProductFromCart() {
     await test.step ('Удаление товара из корзины', async () =>{
          await this.products.remove();
     });
  }

  async goToCart() {
    await test.step ('Переход в корзину', async () =>{
    await this.products.gotoCart();
     });
  }

 async checkout(userData) {
  await test.step('Оформление заказа', async () => {
    const { firstName, lastName, postCode } = userData;
    await this.cart.checkout();
    await this.checkout_step.making_order(firstName, lastName, postCode);
  });
}

 async sortByPriceLowToHight() {
  await test.step('Сортировка по возрастанию цены', async () => {
    await this.products.sortLowToHight();
  });
}

  async sortByPriceHightToLow(){
    await test.step('Сортировка по убыванию цены', async () => {
    await this.products.sortHightToLow();
    });
  }
  async getProductPrices(){
    return await this.products.getPrices();
  }
}
