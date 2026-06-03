import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const imageMapByIndex = {
  pitchers: [
    'pitcher-professional-350ml',
    'pitcher-premium-500ml',
    'pitcher-enamel-400ml',
    'pitcher-ceramic-350ml',
    'pitcher-steel-600ml',
    'pitcher-copper-450ml',
    'pitcher-basic-350ml',
    'pitcher-thermo-500ml',
    'pitcher-nonstick-450ml',
    'pitcher-lux-400ml',
    'pitcher-classic-350ml',
    'pitcher-modular-500ml',
    'pitcher-heavy-550ml',
    'pitcher-light-400ml',
    'pitcher-combo-500ml',
    'pitcher-compact-300ml',
    'pitcher-designer-350ml',
    'pitcher-elite-400ml',
    'pitcher-pro-600ml',
    'pitcher-professional-650ml',
  ],
  tempers: [
    'temper-classic',
    'temper-professional',
    'temper-precisionnyj',
    'temper-calibrated',
    'temper-automatic',
    'temper-wooden',
    'temper-magnetic',
    'temper-premium',
    'temper-silicone',
    'temper-steel',
  ],
  scales: [
    'scales-coffee-precision',
    'scales-professional',
  ],
  accessories: [
    'basket-holder-58mm',
    'basket-double-58mm',
    'basket-precision-58mm',
  ],
};

const ProductCard = ({ product, index = 0, category }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const fileName =
    imageMapByIndex[category]?.[index] ||
    product.slug ||
    product.id;

  const imageSrc = `/images/categories/${category}/${fileName}.jpg`;

  const handleViewClick = () => {
    navigate(`/product/${category}/${product.id}`, {
      state: {
        product,
        imageSrc,
      },
    });
  };

  const handleBuyClick = (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      alert('Для покупки товара необходимо авторизоваться');
      navigate('/login');
      return;
    }

    addToCart(product, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 cursor-pointer flex flex-col h-full"
    >
      <div onClick={handleViewClick} className="flex-grow cursor-pointer">
        <div className="h-80 bg-white flex items-center justify-center overflow-hidden">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-contain p-3"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/400x400?text=NO+IMAGE';
            }}
          />
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {product.name}
          </h3>

          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-black text-black">
              ₽{product.price}
            </span>

            <div className="flex items-center">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span className="text-sm text-gray-500 ml-1">4.8</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>

      <div className="px-8 pb-8 pt-4 border-t border-gray-100">
        <button
          onClick={handleBuyClick}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          Купить сейчас
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;