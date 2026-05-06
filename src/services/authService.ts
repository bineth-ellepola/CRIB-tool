import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { LoginRequest, LoginResponse } from '../types';

const OAUTH_TOKEN_URL = 'https://sejaya-uat.finflux.io/fineract-provider/api/oauth/token';

class AuthService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Login user using OAuth and store token
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      // Prepare OAuth request body as JSON
      const requestBody: any = {
        username: credentials.email,
        password: credentials.password,
        grant_type: 'password',
        isPasswordEncrypted: 'false',
      };
      
      // Add client_id if available from environment
      const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID || 'community-app';
      if (clientId) {
        requestBody.client_id = clientId;
      }

      const response = await this.api.post<any>(OAUTH_TOKEN_URL, requestBody);
      
      // OAuth response returns access_token, token_type, expires_in, etc.
      const token = response.data.access_token;
      
      if (!token) {
        throw new Error('No access token received from server');
      }

      // Store token in localStorage
      localStorage.setItem('authToken', token);
      
      // Store token metadata
      if (response.data.expires_in) {
        localStorage.setItem('tokenExpiresIn', response.data.expires_in);
      }
      
      // Store user info if available
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
      const detailedError = (error as any)?.response?.data?.error_description || errorMsg;
      throw new Error('Login failed: ' + detailedError);
    }
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Get stored user
   */
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Logout and clear stored data
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiresIn');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Set authorization header for API requests
   */
  setAuthHeader(token: string): void {
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Get API instance with auth
   */
  getApiInstance(): AxiosInstance {
    return this.api;
  }
}

export default new AuthService();
