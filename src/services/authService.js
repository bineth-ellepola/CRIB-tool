import axios from 'axios';

const OAUTH_TOKEN_URL = '/fineract-api/fineract-provider/api/oauth/token';

class AuthService {
  constructor() {
    this.api = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async login(credentials) {
    try {
      const requestBody = {
        username: credentials.email,
        password: credentials.password,
        grant_type: 'password',
        isPasswordEncrypted: 'false',
      };

      const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID || 'community-app';
      if (clientId) {
        requestBody.client_id = clientId;
      }

      const response = await this.api.post(OAUTH_TOKEN_URL, requestBody);
      const token = response.data.access_token;

      if (!token) {
        throw new Error('No access token received from server');
      }

      localStorage.setItem('authToken', token);

      if (response.data.expires_in) {
        localStorage.setItem('tokenExpiresIn', String(response.data.expires_in));
      }

      const user = {
        email: credentials.email,
        id: response.data.user_id || response.data.sub || '',
      };
      localStorage.setItem('user', JSON.stringify(user));

      return {
        token,
        user,
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      const detailedError = error?.response?.data?.error_description || errorMsg;
      throw new Error('Login failed: ' + detailedError, {
        cause: error,
      });
    }
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiresIn');
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  setAuthHeader(token) {
    this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  getApiInstance() {
    return this.api;
  }
}

export default new AuthService();