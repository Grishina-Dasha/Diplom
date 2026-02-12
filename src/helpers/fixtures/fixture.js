import { test as base } from '@playwright/test';
import {App} from '../../pages/app.page'
import { AuthUserBuilder } from '../builders/index';

export const test = base.extend({
    //Архитектурный слой
    app: async ({page}, use) => { 

        const app = new App(page);
        await use (app);
        
    },
    authApp: async ({page},use) =>{
        const url = 'https://www.saucedemo.com';
        const app = new App(page);
        const user = new AuthUserBuilder().build();
        const {name, password} = user;
        await app.authorization.open(url);
        await app.authorization.authorization(name,password);
        await use(app);
    }
})