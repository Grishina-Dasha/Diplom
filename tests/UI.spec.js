import { expect } from '@playwright/test';
import {test} from '../src/helpers/fixtures/fixture';
import {OrderUserBuilder} from '../src/helpers/builders/index';


test.describe('Авторизация', () => {
test('Пользователь может авторизоваться', async ({ authApp }) => {
     await expect(authApp.products.productTitle).toContainText("Products");
});


test('Пользователь может выйти из аккаунта', async ({ authApp }) => {
    await authApp.menu.Logout();
    await Promise.all([
    expect(authApp.authorization.nameInput).toBeVisible(),
    expect(authApp.authorization.passwordInput).toBeVisible(),
    expect(authApp.authorization.loginButton).toBeVisible(),
]);

});
});

test.describe('Корзина', () => {
test('Добавление одного товара в корзину', async ({ authApp }) => {
    const previousCount = await authApp.products.getCartCount();
    await authApp.products.addToCart();
    await expect(authApp.products.cartBeadge).toHaveText(String(previousCount+1));
});
test('Добавление нескольких товаров в корзину', async ({ authApp }) => {
    const previousCount = await authApp.products.getCartCount();
    await authApp.products.addToCart();
    await authApp.products.addToCart2();
    await expect(authApp.products.cartBeadge).toHaveText(String(previousCount+2));
});

test('Удаление товара из корзины', async ({ authApp }) => {
    await authApp.products.addToCart();
    await authApp.products.remove();
    await expect(authApp.products.cartBeadge).not.toBeVisible();
});
});

test.describe('Оформление заказа', () => {
test('Оформление заказа', async ({ authApp }) => {
    const user_order = new OrderUserBuilder().withFirstName().withLastName().withPostCode().build();
    const {firstName,lastName,postCode} = user_order;
    await authApp.products.addToCart();
    await authApp.products.gotoCart();
    await expect(authApp.cart.cardTitle).toHaveText('Your Cart');
    await authApp.cart.checkout();
    await authApp.checkout_step.making_order(firstName,lastName,postCode);
    await expect(authApp.checkout_step.compleateHeader).toContainText("Thank you for your order!");
});
});