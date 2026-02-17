export class Menu {
    constructor (page) {
        this.page = page;
        this.menuButton = page.getByRole('button',{name:"Open Menu"});
        this.logoutButton = page.locator('[data-test="logout-sidebar-link"]');
    }
    async Logout () {
        await this.menuButton.click();
        await this.logoutButton.click();

    }
}
