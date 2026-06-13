import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const heroSlides = [
  'categories/slider/coffee-1.jpg',
  'categories/slider/coffee-2.jpg',
  'categories/slider/coffee-3.jpg',
  'categories/slider/coffee-machine-1.jpg',
  'categories/slider/barista-1.png',
  'categories/slider/cafe-1.jpg',
];

const Home = () => {
  const categories = [
    {
      name: 'Питчеры',
      path: '/pitchers',
      image: 'categories/pitchers/pitcher-professional-350ml.jpg',
      description: '20 профессиональных моделей',
      count: '20 моделей',
    },
    {
      name: 'Темперы',
      path: '/tempers',
      image: 'categories/tempers/temper-classic.jpg',
      description: '10 премиальных темперов',
      count: '10 моделей',
    },
    {
      name: 'Весы',
      path: '/scales',
      image: 'categories/scales/scales-coffee-precision.jpg',
      description: 'Точные кофейные весы',
      count: '2 модели',
    },
    {
      name: 'Аксессуары',
      path: '/accessories',
      image: 'categories/accessories/basket-holder-58mm.jpg',
      description: 'Корзинки и аксессуары',
      count: '3 модели',
    },
    {
      name: 'Кофе машины',
      path: '/coffee-machines',
      image: 'categories/coffee-machines/coffee-machines-card.jpg',
      description: 'Профессиональные кофемашины для кофейни',
      count: '6 моделей',
    },
  ];

  const sliderImages = [...heroSlides, ...heroSlides];

  return (
    <div className="min-h-screen">
      <section className="min-h-screen relative flex items-center justify-center bg-grid-pattern overflow-hidden pt-20">
        <div className="hero-background-slider" aria-hidden="true">
          <div className="hero-slider-row hero-slider-row--top">
            {sliderImages.map((image, index) => (
              <div className="hero-slide-card" key={`top-${image}-${index}`}>
                <img
                  src={`/images/${image}`}
                  alt=""
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = '/images/categories/placeholder.jpg';
                  }}
                />
              </div>
            ))}
          </div>

          <div className="hero-slider-row hero-slider-row--bottom">
            {sliderImages.map((image, index) => (
              <div
                className="hero-slide-card hero-slide-card--small"
                key={`bottom-${image}-${index}`}
              >
                <img
                  src={`/images/${image}`}
                  alt=""
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = '/images/categories/placeholder.jpg';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-white/45 backdrop-blur-[0.5px] z-[1]" />
        <div className="absolute inset-0 animated-gradient opacity-40 z-[2]" />
        <div className="absolute inset-0 bg-dot-pattern opacity-70 z-[3]" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/85 backdrop-blur-md rounded-full px-4 sm:px-6 py-3 shadow-xl mb-8 border border-gray-200">
              <span className="w-2 h-2 bg-black rounded-full" />

              <span className="text-xs sm:text-sm font-semibold text-gray-700">
                ПРОФЕССИОНАЛЬНОЕ КОФЕЙНОЕ ОБОРУДОВАНИЕ
              </span>

              <span className="w-2 h-2 bg-black rounded-full" />
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-8 tracking-tight">
              <span className="text-gray-900">RAF-52</span>

              <span className="bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent block">
                COFFEE
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Экипируем бариста и кофейни оборудованием, которое превращает процесс в искусство
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/coffee-machines" className="btn-primary w-full sm:w-auto">
                Смотреть каталог
              </Link>

              <Link to="/buy" className="btn-secondary w-full sm:w-auto">
                Где купить
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-6">
              Наша <span className="text-gradient">Продукция</span>
            </h2>

            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Откройте для себя полный спектр профессионального оборудования для создания идеального кофе
            </p>

            <div className="h-1 bg-gradient-to-r from-black to-gray-800 mx-auto mt-8 rounded-full w-24" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {categories.map((category, index) => {
              const isCoffeeMachines = category.path === '/coffee-machines';

              return (
                <motion.div
                  key={category.path}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className={
                    categories.length % 2 === 1 && index === categories.length - 1
                      ? 'lg:col-span-2'
                      : ''
                  }
                >
                  <Link
                    to={category.path}
                    className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 block border border-gray-200"
                  >
                    <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden bg-white">
                      <img
                        src={`/images/${category.image}`}
                        alt={category.name}
                        loading="lazy"
                        className={`w-full h-full transition duration-500 ${
isCoffeeMachines
  ? 'object-contain bg-white p-2 sm:p-4 lg:p-6 group-hover:scale-[1.04]'
  : 'object-contain bg-white p-5 sm:p-8 group-hover:scale-105'
                        }`}
                        onError={(e) => {
                          e.currentTarget.src = '/images/categories/placeholder.jpg';
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 text-white">
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <h3 className="text-2xl sm:text-3xl font-black">
                            {category.name}
                          </h3>

                          <span className="bg-white/20 backdrop-blur-md rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap">
                            {category.count}
                          </span>
                        </div>

                        <p className="text-gray-200 mb-4 text-sm sm:text-base">
                          {category.description}
                        </p>

                        <div className="inline-flex items-center gap-2 text-sm text-gray-200 font-semibold">
                          <span>Подробнее</span>
                          <span>→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
              Где Купить
            </h2>

            <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Нашу продукцию можно приобрести в магазинах по всей России
            </p>

            <div className="h-1 bg-white mx-auto mt-8 rounded-full w-24" />
          </div>

          <Link to="/buy" className="block group">
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-700/30 min-h-80 sm:h-96 relative flex items-center justify-center p-6">
              <div className="relative z-10 text-center text-white">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20 group-hover:scale-105 transition">
                  <img
                    src="/images/icons/free-icon-city-map-2803054.png"
                    alt="Карта"
                    className="w-8 h-8 brightness-0 invert"
                  />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  Наши магазины-партнеры
                </h3>

                <p className="text-gray-300 text-base sm:text-lg">
                  Найдите ближайший к вам магазин
                </p>

                <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
                  <span className="font-semibold">Список магазинов</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;