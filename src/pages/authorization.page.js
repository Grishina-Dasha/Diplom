export class AuthorizationPage {
    constructor (page) {
        this.page = page;
        this.nameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        //техническое описание страницы
        this.loginButton = page.locator('#login-button').describe('Кнопка авторизации');
    }
    //бизнесовые действия
    async open(url){
        await this.page.goto(url);
    }
    async authorization (name,password) {
        await this.nameInput.click();
        await this.nameInput.fill(name);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
  
}
