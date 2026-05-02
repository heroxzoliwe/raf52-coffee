import React from 'react';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { productsData } from '../data/Products';

const Pitchers = () => {
  const pitchers = productsData.pitchers;

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.5 } }
  };

  const pulseVariants = {
    animate: { scale: [1, 1.2, 1], transition: { duration: 2, repeat: Infinity } }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-32 pb-20"
    >
      <div className="container-custom">
        <div className="text-center mb-20">
          <motion.div 
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-md rounded-2xl px-6 py-3 shadow-2xl mb-6 border border-gray-200"
          >
            <motion.div 
              variants={pulseVariants}
              animate="animate"
              className="w-2 h-2 bg-black rounded-full"
            />
            <span className="text-sm font-semibold text-gray-700">КОЛЛЕКЦИЯ ПИТЧЕРОВ</span>
            <motion.div 
              variants={pulseVariants}
              animate="animate"
              transition={{ delay: 1 }}
              className="w-2 h-2 bg-black rounded-full"
            />
          </motion.div>
          
          <motion.h1 
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="text-6xl font-black text-gray-900 mb-6"
          >
            Профессиональные <span className="text-gradient">Питчеры</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Идеальное вспенивание молока для создания авторских кофейных напитков
          </motion.p>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-black to-gray-800 mx-auto mt-8 rounded-full"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {pitchers.map((pitcher, index) => (
            <ProductCard key={pitcher.id} product={pitcher} index={index} category="pitchers" />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Pitchers;