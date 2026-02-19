import { expect } from '@playwright/test';
import {test} from '../src/helpers/fixtures/fixture';
import {OrderUserBuilder,AuthUserBuilder} from '../src/helpers/builders/index';
import 'dotenv/config';


test.describe('Авторизация', () => {
test('Пользователь может авторизоваться', async ({ authApp }) => {
     await expect(authApp.products.productTitle).toContainText("Products");
});

test('Пользователь может выйти из аккаунта', async ({ authApp }) => {
    await authApp.logout();
    await expect(authApp.authPage.nameInput).toBeVisible();
    await expect(authApp.authPage.passwordInput).toBeVisible();
    await expect(authApp.authPage.loginButton).toBeVisible();

});


test('Попытка авторизации с некорректными данными', async ({ app }) => {
    const invalidUser = new AuthUserBuilder()
  .withName(process.env.SAUCE_LOGIN_NEGATIVE)
  .withPassword(process.env.SAUCE_PASSWORD)
  .build();
    await app.login(invalidUser);
    await expect(app.getErrorMessage()).toContainText("Epic sadface: Sorry, this user has been locked out.");
});
});
test.describe('Корзина', () => {
test('Добавление одного товара в корзину', async ({ authApp }) => {
    const previousCount = await authApp.products.getCartCount();
    await authApp.addProductsToCart(1);
    await expect(authApp.products.cartBadge).toHaveText(String(previousCount+1));
});
test('Добавление нескольких товаров в корзину', async ({ authApp }) => {
    const previousCount = await authApp.products.getCartCount();
    await authApp.addProductsToCart(2);
    await expect(authApp.products.cartBadge).toHaveText(String(previousCount+2));
});

test('Удаление товара из корзины', async ({ authApp }) => {
    await authApp.addProductsToCart(1);
    await authApp.removeProductFromCart();
    await expect(authApp.products.cartBadge).not.toBeVisible();
});
});

test.describe('Оформление заказа', () => {
test('Оформление заказа', async ({ authApp }) => {
    const user_order = new OrderUserBuilder().withFirstName().withLastName().withPostCode().build();
    const {firstName,lastName,postCode} = user_order;
    
    await authApp.addProductsToCart();
    await authApp.goToCart();
    await expect(authApp.cart.cardTitle).toHaveText('Your Cart');
    await authApp.checkout(user_order);
    await expect(authApp.checkout_step.completeHeader).toContainText("Thank you for your order!");
});
});

test.describe('Сортировки', () => {
test('Сортировка по цене (low to hight)', async ({ authApp }) => {
    await authApp.sortByPriceLowToHigh();
    const prices = await authApp.getProductPrices();
   const sorted = [...prices].sort((a, b) => a - b);
   expect(prices).toEqual(sorted);
});
test('Сортировка по цене (hight to low)', async ({ authApp }) => {
    await authApp.sortByPriceHighToLow();
    const prices = await authApp.getProductPrices();
   const sorted = [...prices].sort((a, b) => b - a);
   expect(prices).toEqual(sorted);
});
});
