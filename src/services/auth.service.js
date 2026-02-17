export class AuthService {
  constructor(request, baseUrl) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async getToken() {
    const email = process.env.AIRPORTGAP_EMAIL;
    const password = process.env.AIRPORTGAP_PASSWORD;

    const response = await this.request.post(`${this.baseUrl}/tokens`, {
      data: { email, password },
    });

    const body = await response.json();
    return body.token;
  }
}
