import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const clearAuthStorage = () => {
  api.setToken(null);
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      setLoading(false);
      return;
    }

    api.setToken(token);

    api.getProfile()
      .then((data) => {
        setUser(data);
        setIsAuthenticated(true);
      })
      .catch(() => {
        clearAuthStorage();
        setUser(null);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (email, password) => {
    const data = await api.login({ email, password });

    api.setToken(data.access);
    localStorage.setItem('refresh_token', data.refresh);

    setUser(data.user);
    setIsAuthenticated(true);

    return data;
  };

  const register = async (userData) => {
    const data = await api.register(userData);

    api.setToken(data.access);
    localStorage.setItem('refresh_token', data.refresh);

    setUser(data.user);
    setIsAuthenticated(true);

    return data;
  };

  const logout = () => {
    clearAuthStorage();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (data) => {
    const response = await api.updateProfile(data);
    setUser(response);
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};