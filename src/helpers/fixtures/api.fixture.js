import { test as base } from "@playwright/test";
import {ApiFacade} from "../../services/index";

export const test = base.extend({
  api: async ({ request }, use) => {
    const apiFacade = new ApiFacade(request,process.env.API_URL);
    await use(apiFacade);
  },
});
