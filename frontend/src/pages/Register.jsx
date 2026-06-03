import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20';

  const handleChange = (e) => {
    setError('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const normalizePhone = (phone) => {
    let value = phone.replace(/[^\d+]/g, '');

    if (value.startsWith('8') && value.length === 11) {
      value = `+7${value.slice(1)}`;
    }

    if (value.startsWith('7') && value.length === 11) {
      value = `+${value}`;
    }

    return value;
  };

  const validateForm = () => {
    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = normalizePhone(formData.phone);
    const address = formData.address.trim();

    const nameRegex = /^[А-Яа-яA-Za-zЁё\s-]+$/;
    const phoneRegex = /^\+7\d{10}$/;

    if (name.length < 3) {
      throw new Error('Введите нормальное имя');
    }

    if (!nameRegex.test(name)) {
      throw new Error('Имя может содержать только буквы, пробел и дефис');
    }

    if (!email.includes('@') || email.length < 6) {
      throw new Error('Введите нормальный email');
    }

    if (phone && !phoneRegex.test(phone)) {
      throw new Error('Телефон должен быть в формате +7XXXXXXXXXX');
    }

    if (address && address.length < 5) {
      throw new Error('Адрес слишком короткий');
    }

    if (formData.password.length < 8) {
      throw new Error('Пароль должен содержать минимум 8 символов');
    }

    if (formData.password !== formData.confirmPassword) {
      throw new Error('Пароли не совпадают');
    }

    return {
      username: name,
      email,
      phone,
      address,
      password: formData.password,
      password2: formData.confirmPassword,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setIsLoading(true);

    try {
      const cleanData = validateForm();

      await register(cleanData);

      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Ошибка регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white pt-24 sm:pt-32 pb-12 sm:pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
              Создать аккаунт
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Присоединяйтесь к RAF-52 Coffee
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Имя и фамилия *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Иван Иванов"
                maxLength="80"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Телефон
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
                placeholder="+79000000000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Адрес доставки
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
                rows="2"
                maxLength="300"
                placeholder="Город, улица, дом, квартира"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Пароль *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={inputClass}
                placeholder="••••••••"
                required
                minLength="8"
              />
              <p className="text-xs text-gray-500 mt-1">
                Минимум 8 символов
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Подтвердите пароль *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={inputClass}
                placeholder="••••••••"
                required
                minLength="8"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50"
            >
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm sm:text-base text-gray-600">
              Уже есть аккаунт?{' '}
              <Link to="/login" className="text-black font-semibold hover:underline">
                Войти
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;