import { AuthService } from './auth.service';
import { AirportService } from './airports.service';
import { FavoritesService } from './favorite.service';
//export { ApiFacade };


export class ApiFacade {
  constructor(request, baseUrl) {
    this.request = request;
    this.baseUrl = baseUrl;
    this.auth = new AuthService(request, baseUrl);
    this.airports = new AirportService(request, baseUrl);
    this.favorites = new FavoritesService(request, baseUrl);
  }
  async getAuthToken(user) {
    return this.auth.getToken(user);
  }

  async getAllAirports() {
    return this.airports.getAll();
  }
  async getDistance(token, originId, destinationId) {
    return this.airports.getDistance(token, originId, destinationId);
  }

  async addAirportToFavorites(token, airportId) {
    return this.favorites.add(token, airportId);
  }


  async removeFavorite(token, favoriteId) {
    return this.favorites.delete(token, favoriteId);
  }


  async clearFavorites(token) {
    return this.favorites.clearAll(token);
  }


  async updateFavoriteNote(token, favoriteId, note) {
    return this.favorites.update(token, favoriteId, note);
  }


  async prepareAirportsAndFavorite(token) {
    const { data } = await this.airports.getAll();
    const airports = data.data;

    const index1 = Math.floor(Math.random() * airports.length);

    let index2;
    do {
      index2 = Math.floor(Math.random() * airports.length);
    } while (index2 === index1);

    const originAirport = airports[index1].id;
    const destinationAirport = airports[index2].id;

    const { data: favoriteData } = await this.favorites.add(token, originAirport);
    const favoriteId = favoriteData?.data?.id;

    return { originAirport, destinationAirport, favoriteId };
  }


}


