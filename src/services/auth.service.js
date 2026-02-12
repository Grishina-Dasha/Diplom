export class AuthService {
  constructor(request, baseUrl) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async getToken() {
    // Тут сразу указываем реальные данные
    const email = 'cawef38976@deposin.com';
    const password = 'airport';

    const response = await this.request.post(`${this.baseUrl}/tokens`, {
      data: { email, password },
    });

    const body = await response.json();
    return body.token;
  }
}
