import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    'Темпер прецизионный': 'temper-precisionnyj',
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
  if (item.imageSrc) return item.imageSrc;

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
    getTotalItems,
  } = useCart();

  if (!items.length) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 sm:pt-32 pb-12 sm:pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-lg max-w-xl mx-auto">
            <img
              src="/images/icons/free-icon-shopping-cart-4989863.png"
              alt="Корзина"
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 opacity-50"
            />

            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Корзина пуста
            </h1>

            <p className="text-gray-600 mb-6">
              Добавьте товары из каталога, чтобы оформить заказ.
            </p>

            <Link
              to="/pitchers"
              className="inline-block w-full sm:w-auto bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              Перейти к покупкам
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 sm:pt-32 pb-12 sm:pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 sm:mb-10 text-center">
          Корзина
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const category = getCategory(item);
              const itemKey = `${category}-${item.id}`;

              return (
                <div
                  key={itemKey}
                  className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="w-full sm:w-28 h-48 sm:h-28 bg-white rounded-xl flex items-center justify-center overflow-hidden border shrink-0">
                      <img
                        src={getCartImage(item)}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://placehold.co/200x200?text=NO+IMAGE';
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 break-words">
                            {item.name}
                          </h3>

                          <p className="text-2xl font-black text-black">
                            ₽{item.price}
                          </p>
                        </div>

                        <div className="text-left sm:text-right shrink-0">
                          <p className="text-xl font-bold text-gray-900">
                            ₽{Number(item.price) * item.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-300 transition font-bold"
                          >
                            -
                          </button>

                          <span className="w-10 text-center font-bold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-300 transition font-bold"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 font-semibold text-left"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="text-center pt-2">
              <button
                onClick={clearCart}
                className="text-gray-600 hover:text-gray-900 font-semibold"
              >
                Очистить корзину
              </button>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg lg:sticky lg:top-28">
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
                className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition mb-4"
              >
                Перейти к оформлению
              </button>

              <Link
                to="/pitchers"
                className="w-full bg-white text-black border border-gray-300 py-4 rounded-xl font-semibold hover:bg-gray-50 text-center block"
              >
                Продолжить покупки
              </Link>
            </div>
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