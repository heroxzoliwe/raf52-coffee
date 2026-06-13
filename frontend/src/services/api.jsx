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
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });

    let data;

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (response.status === 401) {
      this.setToken(null);
      localStorage.removeItem('refresh_token');
      throw new Error('Сессия истекла. Войдите заново.');
    }

    if (!response.ok) {
      const message =
        data.error ||
        data.detail ||
        Object.values(data).flat().join(' ') ||
        'Ошибка запроса';

      throw new Error(message);
    }

    return data;
  }

  login(credentials) {
    return this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  register(userData) {
    return this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  getProfile() {
    return this.request('/auth/profile/');
  }

  updateProfile(data) {
    return this.request('/auth/profile/', {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  getProducts(categorySlug = null) {
    return this.request(
      categorySlug ? `/products/${categorySlug}/` : '/products/'
    );
  }

  getProduct(categorySlug, productSlug) {
    return this.request(`/product/${categorySlug}/${productSlug}/`);
  }

  getStores() {
    return this.request('/stores/');
  }

  createOrder(orderData) {
    return this.request('/orders/create/', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }

  getOrders() {
    return this.request('/orders/');
  }

  testAPI() {
    return this.request('/test/');
  }
}

const api = new ApiService();

export const testAPI = () => api.testAPI();

export default api;