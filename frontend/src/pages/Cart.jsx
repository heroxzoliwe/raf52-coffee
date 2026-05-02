import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

const CartContent = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Корзина</h1>
          <div className="bg-white rounded-3xl p-12 shadow-lg max-w-2xl mx-auto">
            <img src="/images/icons/free-icon-shopping-cart-4989863.png" alt="Корзина" className="w-20 h-20 mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ваша корзина пуста</h2>
            <p className="text-gray-600 mb-8">Добавьте товары из каталога, чтобы сделать заказ</p>
            <Link to="/pitchers" className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition inline-block">Перейти к покупкам</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container-custom">
        <h1 className="text-5xl font-black text-gray-900 mb-8 text-center">Корзина</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-3xl p-6 shadow-lg">
                <div className="flex items-center space-x-6">
                  <img src={`/images/${item.image}`} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-2xl font-black text-black mb-4">₽{item.price}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => updateQuantity(item.id, item.category, item.quantity - 1)} className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300">-</button>
                        <span className="w-12 text-center text-lg font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.category, item.quantity + 1)} className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.category)} className="text-red-600 hover:text-red-800 font-medium">Удалить</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">₽{item.price * item.quantity}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="text-center">
              <button onClick={clearCart} className="text-gray-600 hover:text-gray-800 font-medium">Очистить корзину</button>
            </div>
          </div>
          
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl p-6 shadow-lg sticky top-32">
              <h2 className="text-2xl font-black text-gray-900 mb-4">Итого</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600"><span>Товары ({getTotalItems()} шт.)</span><span>₽{getTotalPrice()}</span></div>
                <div className="flex justify-between text-gray-600"><span>Доставка</span><span className="text-green-600">Бесплатно</span></div>
                <div className="border-t pt-3"><div className="flex justify-between text-xl font-bold text-gray-900"><span>Общая сумма</span><span>₽{getTotalPrice()}</span></div></div>
              </div>
              <button onClick={() => navigate('/checkout')} className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition mb-4">Перейти к оформлению</button>
              <Link to="/pitchers" className="w-full bg-white text-black border border-gray-300 py-4 rounded-lg font-semibold hover:bg-gray-50 text-center block">Продолжить покупки</Link>
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