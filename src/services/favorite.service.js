export class FavoritesService {
  constructor(request, baseUrl) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async add(token, airportId, note = "My usual layover") {
    const response = await this.request.post(`${this.baseUrl}/favorites`, {
      headers: { Authorization: `Bearer token=${token}` },
      data: { airport_id: airportId, note },
    });

    const data = await response.json(); // полный JSON ответ
    return { data, response }; // возвращаем и данные, и response
  }

  async delete(token, favoriteId) {
    const response = await this.request.delete(
      `${this.baseUrl}/favorites/${favoriteId}`,
      {
        headers: { Authorization: `Bearer token=${token}` },
      },
    );

    // На случай 204 No Content JSON может отсутствовать
    let data = null;
    try {
      data = await response.json();
    } catch (e) {}

    return { data, response };
  }

  async clearAll(token) {
    const response = await this.request.delete(
      `${this.baseUrl}/favorites/clear_all`,
      {
        headers: { Authorization: `Bearer token=${token}` },
      },
    );

    let data = null;
    try {
      data = await response.json();
    } catch (e) {}

    return { data, response };
  }
  
  async update(token, favoriteId, note) {
    const response = await this.request.patch(
      `${this.baseUrl}/favorites/${favoriteId}`,
      {
        headers: {
          Authorization: `Bearer token=${token}`,
        },
        data: { note },
      },
    );

    const data = await response.json();
    return { data, response };
  }
}
