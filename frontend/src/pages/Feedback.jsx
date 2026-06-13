import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    preferred_contact: 'phone',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [savedData, setSavedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setError('');

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
      preferred_contact: 'phone',
    });

    setSavedData(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setIsLoading(true);

    try {
      const response = await api.createFeedback(formData);
      setSavedData(response);
    } catch (err) {
      setError(err.message || 'Не удалось отправить заявку');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-24 sm:pt-32 pb-12 sm:pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md rounded-2xl px-4 sm:px-6 py-3 shadow-lg mb-5 sm:mb-6 border border-gray-200"
          >
            <span className="w-2 h-2 bg-black rounded-full" />
            <span className="text-xs sm:text-sm font-semibold text-gray-700">
              ФОРМА ОБРАТНОЙ СВЯЗИ
            </span>
            <span className="w-2 h-2 bg-black rounded-full" />
          </motion.div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4">
            Связаться с нами
          </h1>

          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Оставьте заявку, и мы поможем подобрать кофейное оборудование для вашей кофейни
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 border border-gray-200"
          >
            <h2 className="text-2xl sm:text-3xl font-black mb-6">
              Заявка на консультацию
            </h2>

            {error && (
              <div className="mb-5 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Имя
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Иван"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Телефон
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+79999999999"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="mail@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Тема обращения
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Подбор кофемашины для кофейни"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Удобный способ связи
                </label>

                <select
                  name="preferred_contact"
                  value={formData.preferred_contact}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 transition bg-white"
                >
                  <option value="phone">Телефон</option>
                  <option value="email">Email</option>
                  <option value="telegram">Telegram</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Сообщение
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Напишите, какое оборудование нужно подобрать..."
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 transition resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 active:scale-[0.98] transition disabled:opacity-50"
              >
                {isLoading ? 'Отправка...' : 'Отправить заявку'}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-black text-white rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 min-h-[420px]"
          >
            {!savedData ? (
              <div className="h-full flex flex-col justify-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">☕</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black mb-4">
                  Данные сохраняются в системе
                </h2>

                <p className="text-gray-300 leading-relaxed mb-6">
                  После отправки форма создаёт заявку в базе данных. Администратор может открыть её в Django admin, изменить статус и обработать обращение клиента.
                </p>

                <div className="space-y-3">
                  <div className="bg-white/10 rounded-xl p-4">
                    ✅ сохранение в базу данных
                  </div>

                  <div className="bg-white/10 rounded-xl p-4">
                    ✅ отображение отправленных данных
                  </div>

                  <div className="bg-white/10 rounded-xl p-4">
                    ✅ просмотр заявок в админке
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">✓</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black mb-4">
                  Заявка сохранена
                </h2>

                <p className="text-gray-300 mb-6">
                  Ниже показана информация, которая была занесена в систему.
                </p>

                <div className="space-y-3 text-sm sm:text-base">
                  <div className="bg-white/10 rounded-xl p-4">
                    <span className="text-gray-400">Номер заявки:</span>
                    <div className="font-semibold">#{savedData.id}</div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4">
                    <span className="text-gray-400">Имя:</span>
                    <div className="font-semibold">{savedData.name}</div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4">
                    <span className="text-gray-400">Телефон:</span>
                    <div className="font-semibold">{savedData.phone || 'Не указан'}</div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4">
                    <span className="text-gray-400">Email:</span>
                    <div className="font-semibold">{savedData.email || 'Не указан'}</div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4">
                    <span className="text-gray-400">Тема:</span>
                    <div className="font-semibold">{savedData.subject}</div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4">
                    <span className="text-gray-400">Сообщение:</span>
                    <div className="font-semibold">{savedData.message}</div>
                  </div>
                </div>

                <button
                  onClick={resetForm}
                  className="mt-6 w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;