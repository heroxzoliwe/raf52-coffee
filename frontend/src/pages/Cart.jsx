import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import ProtectedRoute from '../components/ProtectedRoute';

const imageMapByCategoryAndName = {
  pitchers: {
    'Питчер профессиональный 350ml': 'pitcher-professional-350ml',
    'Питчер премиум 500ml': 'pitcher-premium-500ml',
    'Питчер эмалированный 400ml': 'pitcher-enamel-400ml',
    'Питчер керамический 350ml': 'pitcher-ceramic-350ml',
    'Питчер стальной 600ml': 'pitcher-steel-600ml',
    'Питчер медный 450ml': 'pitcher-copper-450ml',
    'Питчер базовый 350ml': 'pitcher-basic-350ml',
    'Питчер термо 500ml': 'pitcher-thermo-500ml',
  },
  tempers: {
    'Темпер классический': 'temper-classic',
    'Темпер профессиональный': 'temper-professional',
    'Темпер прецизионный': 'temper-precizionnyj',
    'Темпер калиброванный': 'temper-calibrated',
    'Темпер автоматический': 'temper-automatic',
    'Темпер деревянный': 'temper-wooden',
    'Темпер магнитный': 'temper-magnetic',
    'Темпер премиум': 'temper-premium',
    'Темпер силиконовый': 'temper-silicone',
    'Темпер стальной': 'temper-steel',
  },
  scales: {
    'Весы кофейные точные': 'scales-coffee-precision',
    'Весы профессиональные': 'scales-professional',
  },
  accessories: {
    'Корзинка для холдера 58mm': 'basket-holder-58mm',
    'Корзинка двойная 58mm': 'basket-double-58mm',
    'Корзинка прецизионная 58mm': 'basket-precision-58mm',
  },
};

const getCategory = (item) => {
  return item.category_slug || item.categorySlug || item.category || 'pitchers';
};

const getCartImage = (item) => {
  const category = getCategory(item);

  const fileName =
    imageMapByCategoryAndName[category]?.[item.name] ||
    item.slug ||
    item.id;

  return `/images/categories/${category}/${fileName}.jpg`;
};

const CartContent = () => {
  const navigate = useNavigate();
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  } = useCart();

  if (!items.length) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-6">
            Корзина пуста
          </h1>
          <Link
            to="/pitchers"
            className="inline-block bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Перейти к покупкам
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container-custom">
        <h1 className="text-4xl font-black text-gray-900 mb-10 text-center">
          Корзина
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={`${getCategory(item)}-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center overflow-hidden border">
                    <img
                      src={getCartImage(item)}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/200x200?text=NO+IMAGE';
                      }}
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.name}
                    </h3>

                    <p className="text-2xl font-black text-black mb-4">
                      ₽{item.price}
                    </p>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300"
                      >
                        -
                      </button>

                      <span className="font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">
                      ₽{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="text-center">
              <button
                onClick={clearCart}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                Очистить корзину
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-6 shadow-lg sticky top-32"
            >
              <h2 className="text-2xl font-black text-gray-900 mb-4">
                Итого
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Товары ({getTotalItems()} шт.)</span>
                  <span>₽{getTotalPrice()}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Доставка</span>
                  <span className="text-green-600">Бесплатно</span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Общая сумма</span>
                    <span>₽{getTotalPrice()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition mb-4"
              >
                Перейти к оформлению
              </button>

              <Link
                to="/pitchers"
                className="w-full bg-white text-black border border-gray-300 py-4 rounded-lg font-semibold hover:bg-gray-50 text-center block"
              >
                Продолжить покупки
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = () => (
  <ProtectedRoute>
    <CartContent />
  </ProtectedRoute>
);

export default Cart;