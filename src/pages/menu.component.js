export class Menu {
    constructor (page) {
        this.page = page;
        this.menuButton = page.getByRole('button',{name:"Open Menu"});
        this.logoutButton = page.getByRole('link',{name:"Logout"});
    }
    async Logout () {
        await this.menuButton.click();
        await this.logoutButton.click();

    }
}
