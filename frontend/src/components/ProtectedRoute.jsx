import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 sm:pt-32 pb-12 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center border border-gray-200">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-3xl">🔒</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
            Доступ ограничен
          </h1>

          <p className="text-gray-600 mb-6">
            Этот раздел доступен только зарегистрированным пользователям. Войдите в аккаунт, чтобы продолжить.
          </p>

          <Link
            to="/login"
            state={{ from: location }}
            className="block w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition mb-3"
          >
            Войти
          </Link>

          <Link
            to="/register"
            className="block w-full bg-gray-100 text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Зарегистрироваться
          </Link>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;