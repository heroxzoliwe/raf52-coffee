import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const categories = [
    { name: 'Питчеры', path: '/pitchers', image: 'categories/pitchers/pitcher5.jpg', description: '20 профессиональных моделей', count: '20 моделей' },
    { name: 'Темперы', path: '/tempers', image: 'categories/tempers/temper2.jpg', description: '10 премиальных темперов', count: '10 моделей' },
    { name: 'Весы', path: '/scales', image: 'categories/scales/scale2.jpg', description: 'Точные кофейные весы', count: '2 модели' },
    { name: 'Аксессуары', path: '/accessories', image: 'categories/accessories/accessory1.jpg', description: 'Корзинки для холдера', count: '3 модели' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const categoryVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.05, y: -10, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const floatingReverseVariants = {
    animate: {
      y: [0, 20, 0],
      rotate: [0, -5, 0],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }
    }
  };

  const scalePulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Герой секция */}
      <section className="min-h-screen relative flex items-center justify-center bg-grid-pattern overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 bg-dot-pattern" />
        
        {/* Плавающие элементы */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-20 blur-3xl"
          />
          <motion.div
            variants={floatingReverseVariants}
            animate="animate"
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-gray-200 to-gray-300 rounded-full opacity-15 blur-3xl"
          />
          <motion.div
            variants={scalePulseVariants}
            animate="animate"
            className="absolute top-20 left-20 w-8 h-8 bg-gray-400 rounded-full opacity-30"
          />
          <motion.div
            variants={scalePulseVariants}
            animate="animate"
            transition={{ delay: 1 }}
            className="absolute bottom-32 right-32 w-6 h-6 bg-gray-600 rounded-full opacity-20"
          />
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container-custom relative z-10 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-2xl mb-8 border border-gray-200"
            >
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-black rounded-full"
              />
              <span className="text-sm font-semibold text-gray-700">ПРОФЕССИОНАЛЬНОЕ КОФЕЙНОЕ ОБОРУДОВАНИЕ</span>
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="w-2 h-2 bg-black rounded-full"
              />
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-6xl lg:text-8xl font-black mb-8 tracking-tight"
            >
              <span className="text-gray-900">RAF-52</span>
              <motion.span 
                initial={{ backgroundSize: "0% 100%" }}
                animate={{ backgroundSize: "100% 100%" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                className="bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent bg-no-repeat block"
              >
                COFFEE
              </motion.span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Экипируем бариста и кофейни оборудованием, которое превращает процесс в искусство
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link to="/pitchers" className="btn-primary">Смотреть каталог</Link>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link to="/buy" className="btn-secondary">Где купить</Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Скролл индикатор */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center backdrop-blur-sm bg-white/20">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-gray-600 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Секция категорий */}
      <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-wave-pattern opacity-10" />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute -top-48 -right-48 w-96 h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full opacity-5"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-gray-300 to-gray-400 rounded-full opacity-5"
          />
        </motion.div>

        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Наша <span className="text-gradient">Продукция</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Откройте для себя полный спектр профессионального оборудования для создания идеального кофе
            </p>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-black to-gray-800 mx-auto mt-8 rounded-full"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={categoryVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={category.path} className="group relative bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 block border border-gray-200">
                  <div className="relative h-96 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      src={`/images/${category.image}`}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-3xl font-bold">{category.name}</h3>
                        <span className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-sm font-semibold">{category.count}</span>
                      </div>
                      <p className="text-gray-200 mb-4">{category.description}</p>
                      <motion.div 
                        initial={{ width: 0 }}
                        whileHover={{ width: 16 }}
                        className="flex items-center space-x-2 text-sm text-gray-300"
                      >
                        <span>Подробнее</span>
                        <div className="h-0.5 bg-white transition-all duration-500" />
                      </motion.div>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 border-2 border-white/30 rounded-3xl transition-all duration-500"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Секция "Где купить" */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full opacity-10"
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tr from-gray-600 to-gray-700 rounded-full opacity-10"
          />
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        </motion.div>

        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-white mb-6">Где <span className="text-white">Купить</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Нашу продукцию можно приобрести в магазинах по всей России</p>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="h-1 bg-white mx-auto mt-8 rounded-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link to="/buy" className="block group">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 border border-gray-700/30 h-96 relative flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700/20 to-gray-900/20" />
                
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-1/4 left-1/4 w-4 h-4 bg-white rounded-full"
                />
                <motion.div
                  animate={{ scale: [1.1, 1, 1.1], opacity: [0.6, 0.4, 0.6] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute top-1/3 right-1/3 w-3 h-3 bg-white rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                  className="absolute bottom-1/4 left-1/2 w-5 h-5 bg-white rounded-full"
                />
                
                <div className="relative z-10 text-center text-white">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20"
                  >
                    <img src="/images/icons/free-icon-city-map-2803054.png" alt="Карта" className="w-8 h-8 brightness-0 invert" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-4">Наши магазины-партнеры</h3>
                  <p className="text-gray-300 text-lg">Найдите ближайший к вам магазин</p>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="mt-6 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20"
                  >
                    <span className="font-semibold">Посмотреть на карте</span>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-1 h-1 bg-white rounded-full"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;