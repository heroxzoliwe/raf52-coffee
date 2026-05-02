import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Политика конфиденциальности</h1>
          <div className="h-1 bg-black w-24 mx-auto rounded-full"></div>
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <div className="space-y-6 text-gray-600">
            <p>Ваша конфиденциальность важна для нас. В этой политике конфиденциальности описывается, как мы собираем, используем и защищаем вашу личную информацию.</p>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Сбор информации</h2>
            <p>Мы собираем информацию, которую вы предоставляете нам при регистрации на сайте, оформлении заказа или подписке на рассылку. Это включает ваше имя, email адрес, номер телефона и адрес доставки.</p>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Использование информации</h2>
            <p>Собранная информация используется для обработки заказов, улучшения обслуживания клиентов и отправки периодических emails с информацией о новых товарах и акциях.</p>
            <div className="bg-gray-100 rounded-2xl p-6 mt-8">
              <p className="text-gray-700 font-medium">Если у вас есть вопросы, свяжитесь с нами по телефону: <span className="text-black">79089839345</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;