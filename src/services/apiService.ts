import axios from 'axios';
import type { AxiosInstance } from 'axios';
import authService from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://sejaya-uat.finflux.io/fineract-provider/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = authService.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          authService.logout();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Fetch data from API
   * Replace '/data' with your actual API endpoint
   */
  async fetchData<T>(endpoint: string = '/data'): Promise<T[]> {
    try {
      const response = await this.api.get<{ data: T[] }>(endpoint);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error('Failed to fetch data: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  /**
   * Get API instance for custom requests
   */
  getApiInstance(): AxiosInstance {
    return this.api;
  }
}

export default new ApiService();
