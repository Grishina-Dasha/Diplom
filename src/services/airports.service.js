export class AirportService {
  constructor(request, baseUrl) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async getAll() {
    const response = await this.request.get(`${this.baseUrl}/airports`);
    const data = await response.json();
    return {data, response}; // возвращаем массив аэропортов
  }

  async getDistance(token, from, to) {
    return this.request.post(`${this.baseUrl}/airports/distance`, {
      headers: { Authorization: `Bearer token=${token}` },
      data: { from, to },
    });
  }
}
