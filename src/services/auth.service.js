export class AuthService {
  constructor(request, baseUrl) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async getToken(user) {
    const response = await this.request.post(`${this.baseUrl}/tokens`, {
      data: {  
      email: user.email,
      password: user.password, 
    },
    });

    const body = await response.json();
    return body.token;
  }
}
