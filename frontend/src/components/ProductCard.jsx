import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, index = 0, category }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: index * 0.1 }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const handleBuyClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Для покупки товара необходимо авторизоваться');
      navigate('/login');
      return;
    }
    addToCart(product, 1);
  };

  const handleViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${category}/${product.id}`);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group relative bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-700 border border-gray-200 cursor-pointer flex flex-col h-full"
    >
      <div onClick={handleViewClick} className="block flex-grow cursor-pointer">
        <div className="relative overflow-hidden h-80">
          <motion.img 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            src={`/images/${product.image}`} 
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
          />
          
          <button
            onClick={handleViewClick}
            className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white"
            title="Быстрый просмотр"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>

          {product.is_new && (
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider shadow-2xl">NEW</div>
            </div>
          )}
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-black transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-black text-black">₽{product.price}</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">⭐</span>
              ))}
              <span className="text-sm text-gray-500 ml-1">4.8</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description || 'Профессиональное оборудование для идеального кофе'}
          </p>
        </div>
      </div>

      <div className="mt-auto px-8 pb-8 pt-4 border-t border-gray-100">
        <div className="flex flex-col space-y-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleBuyClick}
            className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
          >
            <img src="/images/icons/free-icon-shopping-cart-4989863.png" alt="Купить" className="w-5 h-5 brightness-0 invert" />
            <span className="text-lg">Купить сейчас</span>
          </motion.button>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="flex items-center space-x-1">
                <span className="text-green-600">✔</span>
                <span>В наличии</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center space-x-1">
                <img src="/images/icons/free-icon-shipping-and-delivery-6830976.png" alt="Доставка" className="w-4 h-4" />
                <span>Доставка</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-black to-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </motion.div>
  );
};

export default ProductCard;