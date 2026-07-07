import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => authService.getToken());
  const [user, setUser] = useState(() => authService.getUser());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      authService.setAuthHeader(token);
    }
  }, [token]);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login({ email, password });
      setToken(response.token);
      setUser(response.user || null);
      authService.setAuthHeader(response.token);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during login';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    delete authService.getApiInstance().defaults.headers.common.Authorization;
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  const value = {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};