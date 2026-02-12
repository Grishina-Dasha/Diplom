import { AuthorizationPage,ProductsPage,Menu,Cart,Checkout_Step } from './index';

export class App {
constructor(page){
    this.page = page;
    this.authorization = new AuthorizationPage(page);
    this.products = new ProductsPage(page);
    this.menu = new Menu(page);
    this.cart = new Cart(page);
    this.checkout_step = new Checkout_Step(page);
}
}