const API_URL =
  process.env.REACT_APP_API_URL ||
  'https://raf52-coffee-production.up.railway.app/api';

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

  getErrorMessage(data, status, rawText) {
    if (data?.error) return data.error;
    if (data?.detail) return data.detail;

    const fieldLabels = {
      username: 'Имя',
      email: 'Email',
      phone: 'Телефон',
      address: 'Адрес',
      password: 'Пароль',
      password2: 'Подтверждение пароля',
      default_payment: 'Способ оплаты',
      default_delivery: 'Способ доставки',
      preferred_contact: 'Способ связи',
      subject: 'Тема',
      message: 'Сообщение',
      name: 'Имя',
      non_field_errors: 'Ошибка',
    };

    if (typeof data === 'string') {
      return data;
    }

    if (data && typeof data === 'object') {
      return Object.entries(data)
        .map(([field, value]) => {
          const label = fieldLabels[field] || field;

          if (Array.isArray(value)) {
            return `${label}: ${value.join(', ')}`;
          }

          if (typeof value === 'object' && value !== null) {
            return `${label}: ${this.getErrorMessage(value, status, rawText)}`;
          }

          return `${label}: ${value}`;
        })
        .join(' | ');
    }

    if (rawText) {
      const cleanText = rawText
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (cleanText) {
        return `HTTP ${status}: ${cleanText.slice(0, 300)}`;
      }
    }

    return `Ошибка запроса. HTTP статус: ${status}`;
  }

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const url = `${API_URL}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const rawText = await response.text();

    let data = null;

    try {
      data = rawText ? JSON.parse(rawText) : null;
    } catch {
      data = null;
    }

    if (response.status === 401) {
      this.setToken(null);
      localStorage.removeItem('refresh_token');
    }

    if (!response.ok) {
      console.error('API ERROR:', {
        url,
        status: response.status,
        data,
        rawText,
      });

      throw new Error(
        this.getErrorMessage(data, response.status, rawText)
      );
    }

    return data;
  }

  login(credentials) {
    return this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  register(userData) {
    return this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  getProfile() {
    return this.request('/auth/profile/');
  }

  updateProfile(data) {
    return this.request('/auth/profile/', {
      method: 'PATCH',
      body: JSON.stringify(data),
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
      body: JSON.stringify(orderData),
    });
  }

  createFeedback(feedbackData) {
    return this.request('/feedback/', {
      method: 'POST',
      body: JSON.stringify(feedbackData),
    });
  }

  getOrders() {
    return this.request('/orders/');
  }
}

const api = new ApiService();

export default api;