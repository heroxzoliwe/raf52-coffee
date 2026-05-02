import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]); // Все зарегистрированные пользователи

  // Загружаем пользователей из localStorage при запуске
  useEffect(() => {
    const savedUsers = localStorage.getItem('vsk52_users');
    const savedUser = localStorage.getItem('vsk52_current_user');
    const token = localStorage.getItem('vsk52_token');
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Сохраняем пользователей в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('vsk52_users', JSON.stringify(users));
  }, [users]);

  const login = async (email, password) => {
    // Ищем пользователя в базе
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      throw new Error('Неверный email или пароль');
    }
    
    const userData = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      phone: foundUser.phone || '',
      address: foundUser.address || '',
      createdAt: foundUser.createdAt
    };
    
    const token = 'jwt-token-' + Date.now();
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('vsk52_current_user', JSON.stringify(userData));
    localStorage.setItem('vsk52_token', token);
    
    return { success: true, user: userData };
  };

  const register = async (userData) => {
    // Проверяем, нет ли уже такого email
    const existingUser = users.find(u => u.email === userData.email);
    
    if (existingUser) {
      throw new Error('Пользователь с таким email уже существует');
    }
    
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // В реальном приложении нужно хешировать!
      phone: userData.phone || '',
      address: userData.address || '',
      createdAt: new Date().toISOString()
    };
    
    // Добавляем нового пользователя в базу
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    
    const token = 'jwt-token-' + Date.now();
    
    setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address,
      createdAt: newUser.createdAt
    });
    
    setIsAuthenticated(true);
    localStorage.setItem('vsk52_current_user', JSON.stringify(newUser));
    localStorage.setItem('vsk52_token', token);
    
    return { success: true, user: newUser };
  };

  const updateProfile = (updatedData) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updatedData };
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, ...updatedData } : u
    );
    
    setUser(updatedUser);
    setUsers(updatedUsers);
    localStorage.setItem('vsk52_current_user', JSON.stringify(updatedUser));
    
    return { success: true, user: updatedUser };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('vsk52_current_user');
    localStorage.removeItem('vsk52_token');
  };

  const value = {
    user,
    users,
    isAuthenticated,
    loading,
    login,
    register,
    updateProfile,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};