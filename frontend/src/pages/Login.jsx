import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profile';

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setIsLoading(true);

    try {
      await login(email.trim().toLowerCase(), password);

      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Неверный email или пароль');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white pt-24 sm:pt-32 pb-12 sm:pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-md mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8"
        >
          <div className="text-center mb-8">
            <img
              src="/images/icons/free-icon-access-granted-18841950.png"
              alt="Вход"
              className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4"
            />

            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
              Войти в аккаунт
            </h1>

            <p className="text-gray-600 text-sm sm:text-base">
              Введите email и пароль
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setError('');
                  setEmail(e.target.value);
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Пароль
              </label>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setError('');
                  setPassword(e.target.value);
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-50"
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm sm:text-base">
            Нет аккаунта?{' '}
            <Link
              to="/register"
              className="text-black font-semibold hover:underline"
            >
              Зарегистрироваться
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;