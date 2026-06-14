import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-24 sm:pt-32 pb-12 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-10 text-center border border-gray-200"
      >
        <div className="text-7xl sm:text-8xl font-black text-gray-900 mb-4">
          404
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-gray-900 mb-4">
          Страница не найдена
        </h1>

        <p className="text-gray-600 text-base sm:text-lg mb-8">
          Возможно, страница была удалена, перемещена или адрес был введён неправильно.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 active:scale-[0.98] transition"
        >
          Вернуться на главную
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;