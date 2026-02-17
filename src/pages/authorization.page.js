export class AuthorizationPage {
    constructor (page) {
        this.page = page;
        this.nameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('#login-button').describe('Кнопка авторизации');
        this.textError = page.locator('[data-test="error"]');
    }
    async open(url){
        await this.page.goto(url || process.env.UI_URL);
    }
    async authorization (name,password) {
        await this.nameInput.click();
        await this.nameInput.fill(name);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
  
}
