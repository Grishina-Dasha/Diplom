import { AuthService } from './auth.service';
import { AirportService } from './airports.service';
import { FavoritesService } from './favorite.service';
import {test} from "@playwright/test"


export class ApiFacade {
  constructor(request, baseUrl) {
    this.request = request;
    this.baseUrl = baseUrl;
    this.auth = new AuthService(request, baseUrl);
    this.airports = new AirportService(request, baseUrl);
    this.favorites = new FavoritesService(request, baseUrl);
  }
  async getAuthToken(user) {
  return await test.step('Получение токена авторизации', async () => {
    return await this.auth.getToken(user);
  });
}

async getAllAirports() {
  return await test.step('Получение списка аэропортов', async () => {
    return await this.airports.getAll();
  });
}

async getDistance(token, originId, destinationId) {
  return await test.step(
    `Расчёт расстояния между ${originId} и ${destinationId}`,
    async () => {
      return await this.airports.getDistance(token, originId, destinationId);
    }
  );
}

async addAirportToFavorites(token, airportId) {
  return await test.step(
    `Добавление аэропорта ${airportId} в избранное`,
    async () => {
      return await this.favorites.add(token, airportId);
    }
  );
}


async removeFavorite(token, favoriteId) {
  return await test.step(
    `Удаление аэропорта из избранного (id=${favoriteId})`,
    async () => {
      return await this.favorites.delete(token, favoriteId);
    }
  );
}


async clearFavorites(token) {
  return await test.step('Очистка всего избранного', async () => {
    return await this.favorites.clearAll(token);
  });
}

async updateFavoriteNote(token, favoriteId, note) {
  return await test.step(
    `Обновление заметки в избранном (id=${favoriteId})`,
    async () => {
      return await this.favorites.update(token, favoriteId, note);
    }
  );
}

async prepareAirportsAndFavorite(token) {
  return await test.step(
    'Подготовка двух случайных аэропортов и создание избранного',
    async () => {
      const { data } = await this.airports.getAll();
      const airports = data.data;

      const index1 = Math.floor(Math.random() * airports.length);

      let index2;
      do {
        index2 = Math.floor(Math.random() * airports.length);
      } while (index2 === index1);

      const originAirport = airports[index1].id;
      const destinationAirport = airports[index2].id;

      const { data: favoriteData } = await this.favorites.add(
        token,
        originAirport
      );

      const favoriteId = favoriteData?.data?.id;

      return { originAirport, destinationAirport, favoriteId };
    }
  );
}

}


