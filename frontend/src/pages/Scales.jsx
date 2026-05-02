import React from 'react';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { productsData } from '../data/Products';

const Scales = () => {
  const scales = productsData.scales;

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white bg-dot-pattern pt-32 pb-20"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-gray-100 rounded-full opacity-20 blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-md rounded-2xl px-6 py-3 shadow-2xl mb-6 border border-gray-200"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-black rounded-full"
            />
            <span className="text-sm font-semibold text-gray-700">КОЛЛЕКЦИЯ ВЕСОВ</span>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="w-2 h-2 bg-black rounded-full"
            />
          </motion.div>
          <h1 className="text-6xl font-black text-gray-900 mb-6">
            Точные <span className="text-gradient">Весы</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Профессиональное взвешивание для идеального кофе
          </p>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-black to-gray-800 mx-auto mt-8 rounded-full"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {scales.map((scale, index) => (
            <ProductCard key={scale.id} product={scale} index={index} category="scales" />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Scales;