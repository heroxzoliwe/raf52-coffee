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

  'coffee-machines': [
    'coffee-machine-classic-pro',
    'coffee-machine-duo-barista',
    'coffee-machine-compact-one',
    'coffee-machine-premium-touch',
    'coffee-machine-automatic-milk',
    'coffee-machine-commercial-elite',
  ],
};

const API_BASE_URL = (
  process.env.REACT_APP_API_URL ||
  'http://127.0.0.1:8000/api'
).replace('/api', '');

const getLocalImageBySlug = (product, category, index) => {
  const fileName =
    product.slug ||
    imageMapByIndex[category]?.[index] ||
    product.id;

  return `/images/categories/${category}/${fileName}.jpg`;
};

const getProductImage = (product, category, index) => {
  if (!product) {
    return '/images/categories/placeholder.jpg';
  }

  if (product.image?.startsWith('http')) {
    return product.image;
  }

  if (product.image?.startsWith('/media')) {
    return `${API_BASE_URL}${product.image}`;
  }

  if (product.image?.startsWith('media/')) {
    return `${API_BASE_URL}/${product.image}`;
  }

  if (product.image?.startsWith('categories/')) {
    return `/images/${product.image}`;
  }

  if (product.image?.startsWith('products/')) {
    return `${API_BASE_URL}/media/${product.image}`;
  }

  return getLocalImageBySlug(product, category, index);
};

const ProductCard = ({ product, index = 0, category }) => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const imageSrc = getProductImage(product, category, index);
  const fallbackImageSrc = getLocalImageBySlug(product, category, index);

  const handleViewClick = () => {
    navigate(`/product/${category}/${product.id}`, {
      state: {
        product,
        imageSrc,
        fallbackImageSrc,
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
        category_slug: category,
        imageSrc,
      },
      1
    );
  };

  const handleImageError = (e) => {
    if (!e.currentTarget.dataset.usedFallback) {
      e.currentTarget.dataset.usedFallback = 'true';
      e.currentTarget.src = fallbackImageSrc;
      return;
    }

    e.currentTarget.src = '/images/categories/placeholder.jpg';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.03,
      }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden border border-gray-200 cursor-pointer flex flex-col h-full transition"
    >
      <div
        onClick={handleViewClick}
        className="flex-grow cursor-pointer"
      >
        <div className="h-64 sm:h-72 lg:h-80 bg-white flex items-center justify-center overflow-hidden">
          <img
            src={imageSrc}
            alt={`${product.name} — профессиональное кофейное оборудование RAF-52 Coffee`}
            loading="lazy"
            className="w-full h-full object-contain p-4 sm:p-5"
            onError={handleImageError}
          />
        </div>

        <div className="p-5 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 break-words">
            {product.name}
          </h3>

          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="text-2xl sm:text-3xl font-black text-black">
              ₽{product.price}
            </span>

            <div className="flex items-center shrink-0">
              <span className="text-yellow-400 text-lg">
                ★★★★★
              </span>

              <span className="text-sm text-gray-500 ml-1">
                4.8
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>

      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 border-t border-gray-100">
        <button
          onClick={handleBuyClick}
          className="w-full bg-black text-white py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          Купить сейчас
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;