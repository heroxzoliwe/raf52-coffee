import React from 'react';
import { motion } from 'framer-motion';

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
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
      },
    },
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone.replace(/[^\d+]/g, '')}`;
  };

  const handleOpenMap = (address) => {
    const encodedAddress = encodeURIComponent(address);

    window.open(
      `https://yandex.ru/maps/?text=${encodedAddress}`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-28 sm:pt-32 pb-16 sm:pb-20">
      <div className="container mx-auto px-4">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Где купить
          </h1>

          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Наши официальные магазины-партнеры по всей России.
            Выберите удобный способ покупки.
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            {[
              {
                icon: 'free-icon-city-map-2803054.png',
                text: 'Доступно в 9 городах',
              },
              {
                icon: 'free-icon-shield-1489591.png',
                text: 'Официальная гарантия',
              },
              {
                icon: 'free-icon-shipping-and-delivery-6830976.png',
                text: 'Бесплатная доставка',
              },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.12 }}
                className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-md border border-gray-100"
              >
                <img
                  src={`/images/icons/${badge.icon}`}
                  alt={badge.text}
                  className="w-4 h-4"
                />

                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  {badge.text}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="h-1 bg-gradient-to-r from-black to-gray-800 mx-auto rounded-full w-24" />
        </motion.div>

        {/* STORES */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
        >
          {stores.map((store) => (
            <motion.div
              key={store.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-gray-100 transition-all duration-300"
            >

              {/* TOP */}

              <div className="flex items-start gap-4 mb-5">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center flex-shrink-0">
                  <img
                    src="/images/icons/free-icon-store-3871072.png"
                    alt="Магазин"
                    className="w-8 h-8 brightness-0 invert"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="font-black text-gray-900 text-lg sm:text-xl leading-tight">
                    {store.name}
                  </h3>

                  <div className="mt-2 inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold">
                    Открыто до 21:00
                  </div>
                </div>
              </div>

              {/* INFO */}

              <div className="space-y-4 mb-6">

                <div className="flex items-start gap-3">
                  <img
                    src="/images/icons/free-icon-city-map-2803054.png"
                    alt="Адрес"
                    className="w-5 h-5 mt-0.5"
                  />

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {store.address}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src="/images/icons/free-icon-phone-call-5585562.png"
                    alt="Телефон"
                    className="w-5 h-5"
                  />

                  <p className="text-gray-900 font-semibold text-sm sm:text-base">
                    {store.phone}
                  </p>
                </div>
              </div>

              {/* BUTTONS */}

              <div className="flex flex-col sm:flex-row gap-3">

                <button
                  onClick={() => handleCall(store.phone)}
                  className="flex-1 bg-black text-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2"
                >
                  <img
                    src="/images/icons/free-icon-phone-call-5585562.png"
                    alt="Позвонить"
                    className="w-4 h-4 brightness-0 invert"
                  />

                  <span>Позвонить</span>
                </button>

                <button
                  onClick={() => handleOpenMap(store.address)}
                  className="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
                >
                  <img
                    src="/images/icons/free-icon-city-map-2803054.png"
                    alt="Карта"
                    className="w-4 h-4"
                  />

                  <span>На карте</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Buy;