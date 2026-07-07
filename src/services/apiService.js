import axios from 'axios';
import authService from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/fineract-api/fineract-provider/api';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

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

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          authService.logout();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async fetchData(endpoint = '/data') {
    try {
      const response = await this.api.get(endpoint);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error('Failed to fetch data: ' + (error instanceof Error ? error.message : 'Unknown error'), {
        cause: error,
      });
    }
  }

  getApiInstance() {
    return this.api;
  }
}

export default new ApiService();