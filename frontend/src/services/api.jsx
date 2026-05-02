const API_URL = 'http://localhost:8000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('access_token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  }

  async request(endpoint, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;

    const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    if (response.status === 401) {
      this.setToken(null);
      window.location.href = '/login';
    }
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Ошибка запроса');
    return data;
  }

  // ВРЕМЕННАЯ ВЕРСИЯ - пока Django не готов
  async login(credentials) {
    const users = JSON.parse(localStorage.getItem('vsk52_users') || '[]');
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
    if (!user) throw new Error('Неверный email или пароль');
    const token = 'fake-token-' + Date.now();
    this.setToken(token);
    localStorage.setItem('vsk52_current_user', JSON.stringify(user));
    return { access: token, user: { id: user.id, username: user.name, email: user.email, phone: user.phone || '', address: user.address || '' } };
  }

  async register(userData) {
    const users = JSON.parse(localStorage.getItem('vsk52_users') || '[]');
    if (users.find(u => u.email === userData.email)) throw new Error('Email уже существует');
    const newUser = { id: Date.now(), name: userData.username, email: userData.email, password: userData.password, phone: userData.phone || '', address: userData.address || '', createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('vsk52_users', JSON.stringify(users));
    const token = 'fake-token-' + Date.now();
    this.setToken(token);
    localStorage.setItem('vsk52_current_user', JSON.stringify(newUser));
    return { access: token, user: { id: newUser.id, username: newUser.name, email: newUser.email, phone: newUser.phone, address: newUser.address } };
  }

  async getProfile() {
    const user = JSON.parse(localStorage.getItem('vsk52_current_user'));
    if (!user) throw new Error('Не авторизован');
    return { id: user.id, username: user.name, email: user.email, phone: user.phone || '', address: user.address || '' };
  }

  async updateProfile(data) {
    const user = JSON.parse(localStorage.getItem('vsk52_current_user'));
    if (!user) throw new Error('Не авторизован');
    const updatedUser = { ...user, ...data };
    localStorage.setItem('vsk52_current_user', JSON.stringify(updatedUser));
    const users = JSON.parse(localStorage.getItem('vsk52_users') || '[]');
    const updatedUsers = users.map(u => u.id === user.id ? { ...u, ...data } : u);
    localStorage.setItem('vsk52_users', JSON.stringify(updatedUsers));
    return updatedUser;
  }

  async getStores() {
    return [
      { id: 1, name: 'Coffee Shop Moscow', address: 'ул. Тверская, 12', phone: '+7 (495) 123-45-67' },
      { id: 2, name: 'Coffee Equipment СПб', address: 'Невский пр., 45', phone: '+7 (812) 987-65-43' },
      { id: 3, name: 'Barista Pro Казань', address: 'ул. Баумана, 78', phone: '+7 (843) 456-78-90' },
    ];
  }

  async createOrder(orderData) {
    const orders = JSON.parse(localStorage.getItem('vsk52_orders') || '[]');
    const newOrder = { id: 'ORD-' + Date.now(), ...orderData, created_at: new Date().toISOString(), status: 'pending' };
    orders.push(newOrder);
    localStorage.setItem('vsk52_orders', JSON.stringify(orders));
    return newOrder;
  }

  async getOrders() {
    return JSON.parse(localStorage.getItem('vsk52_orders') || '[]');
  }
}

export default new ApiService();