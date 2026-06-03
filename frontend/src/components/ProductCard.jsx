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

  const currentCategory =
    category ||
    product.category_slug ||
    product.categorySlug ||
    'pitchers';

  const fileName =
    imageMapByIndex[currentCategory]?.[index] ||
    product.slug ||
    product.id;

  const imageSrc = `/images/categories/${currentCategory}/${fileName}.jpg`;

  const handleViewClick = () => {
    navigate(`/product/${currentCategory}/${product.slug || product.id}`, {
      state: {
        product,
        imageSrc,
      },
    });
  };

  const handleBuyClick = (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    addToCart(
      {
        ...product,
        category_slug: currentCategory,
        imageSrc,
      },
      1
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.18) }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-200 cursor-pointer flex flex-col h-full transition-shadow"
    >
      <div onClick={handleViewClick} className="flex-grow">
        <div className="h-52 sm:h-64 lg:h-72 bg-white flex items-center justify-center overflow-hidden">
          <img
            src={imageSrc}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain p-3 sm:p-4"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/400x400?text=NO+IMAGE';
            }}
          />
        </div>

        <div className="p-4 sm:p-6 lg:p-7">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
            {product.name}
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <span className="text-2xl sm:text-3xl font-black text-black">
              ₽{product.price}
            </span>

            <div className="flex items-center">
              <span className="text-yellow-400 text-sm sm:text-base">★★★★★</span>
              <span className="text-xs sm:text-sm text-gray-500 ml-1">4.8</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-7 pb-4 sm:pb-6 pt-3 border-t border-gray-100">
        <button
          onClick={handleBuyClick}
          className="w-full bg-black text-white py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-800 transition text-sm sm:text-base"
        >
          Купить сейчас
        </button>
      </div>
    </motion.article>
  );
};

export default ProductCard;