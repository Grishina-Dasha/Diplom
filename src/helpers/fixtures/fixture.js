import { test as base } from '@playwright/test';
import { AppFacade } from '../../pages/index';
import { AuthUserBuilder } from '../builders/index';

export const test = base.extend({
    app: async ({page}, use) => { 

        const app = new AppFacade(page);
        await use(app);
        
    },
   authApp: async ({ page }, use) => {
    const app = new AppFacade(page);
    const user = new AuthUserBuilder().build();
    await app.login(user);
    await use(app);
  }
})