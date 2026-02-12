import { test as base } from "@playwright/test";
import {
  AuthService,
  AirportService,
  FavoritesService,
} from "../../services/index";

const API_URL = "https://airportgap.com/api";

export const test = base.extend({
  token: async ({ request }, use) => {
    const authService = new AuthService(request, API_URL);
    const token = await authService.getToken();
    await use(token);
  },

  airportData: async ({ request, token }, use) => {
    const airportsService = new AirportService(request, API_URL);
    const favoritesService = new FavoritesService(request, API_URL);

    const { data } = await airportsService.getAll();
    const airports = data.data;

    const index1 = Math.floor(Math.random() * airports.length);

    let index2;
    do {
      index2 = Math.floor(Math.random() * airports.length);
    } while (index2 === index1);

    const originAirport = airports[index1].id;
    const destinationAirport = airports[index2].id;

    const { data: favoriteData } = await favoritesService.add(
      token,
      originAirport
    );

    const favoriteId = favoriteData?.data?.id;

    await use({ originAirport, destinationAirport, favoriteId });
  },
});
