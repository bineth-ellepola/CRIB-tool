export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface AuthContextType {
  token: string | null;
  user: LoginResponse['user'] | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface TableData {
  [key: string]: string | number | boolean;
}

export interface ApiResponse<T> {
  data: T[];
  status: 'success' | 'error';
  message?: string;
}
