import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Buy = () => {
  const stores = [
    { id: 1, name: 'Coffee Shop Moscow', address: 'ул. Тверская, 12', phone: '+7 (495) 123-45-67' },
    { id: 2, name: 'Coffee Equipment СПб', address: 'Невский пр., 45', phone: '+7 (812) 987-65-43' },
    { id: 3, name: 'Barista Pro Казань', address: 'ул. Баумана, 78', phone: '+7 (843) 456-78-90' },
    { id: 4, name: 'Coffee Time Екатеринбург', address: 'пр. Ленина, 34', phone: '+7 (343) 234-56-78' },
    { id: 5, name: 'Espresso Shop Новосибирск', address: 'Красный пр., 21', phone: '+7 (383) 345-67-89' },
    { id: 6, name: 'Coffee Lab Сочи', address: 'ул. Навагинская, 9', phone: '+7 (862) 567-89-01' },
    { id: 7, name: 'VSK Coffee Ростов', address: 'ул. Большая Садовая, 46', phone: '+7 (863) 678-90-12' },
    { id: 8, name: 'Professional Coffee Уфа', address: 'ул. Ленина, 65', phone: '+7 (347) 789-01-23' },
    { id: 9, name: 'Coffee Masters Краснодар', address: 'ул. Красная, 32', phone: '+7 (861) 890-12-34' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const cardHoverVariants = {
    hover: { y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const handleCall = (phone) => { alert(`Звоним по номеру: ${phone}`); };
  const handleOpenMap = (address) => { alert(`Открываем карту с адресом: ${address}`); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-32 pb-20">
      <div className="container-custom px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black text-gray-900 mb-6">Где купить</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Наши официальные магазины-партнеры по всей России. Выберите удобный способ покупки.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { icon: 'free-icon-city-map-2803054.png', text: 'Доступно в 9 городах' },
              { icon: 'free-icon-shield-1489591.png', text: 'Официальная гарантия' },
              { icon: 'free-icon-shipping-and-delivery-6830976.png', text: 'Бесплатная доставка' }
            ].map((badge, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2 }}
                className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-md"
              >
                <img src={`/images/icons/${badge.icon}`} alt={badge.text} className="w-4 h-4" />
                <span className="text-sm font-medium text-gray-700">{badge.text}</span>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-black to-gray-800 mx-auto mt-8 rounded-full"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {stores.map((store) => (
            <motion.div
              key={store.id}
              variants={itemVariants}
              whileHover="hover"
              className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center">
                  <img src="/images/icons/free-icon-store-3871072.png" alt="Магазин" className="w-8 h-8 brightness-0 invert" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{store.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Открыто до 21:00</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-2">
                  <img src="/images/icons/free-icon-city-map-2803054.png" alt="Адрес" className="w-5 h-5 mt-0.5" />
                  <p className="text-gray-600 text-sm">{store.address}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/images/icons/free-icon-phone-call-5585562.png" alt="Телефон" className="w-5 h-5" />
                  <p className="text-gray-800 font-medium">{store.phone}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <motion.button 
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleCall(store.phone)}
                  className="flex-1 bg-black text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <img src="/images/icons/free-icon-phone-call-5585562.png" alt="Позвонить" className="w-4 h-4 brightness-0 invert" />
                  <span>Позвонить</span>
                </motion.button>
                <motion.button 
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleOpenMap(store.address)}
                  className="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <img src="/images/icons/free-icon-city-map-2803054.png" alt="Карта" className="w-4 h-4" />
                  <span>На карте</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Buy;