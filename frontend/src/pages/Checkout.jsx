import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

const CheckoutContent = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { user, updateProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', deliveryMethod: 'courier', paymentMethod: 'card', comment: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    if (user) setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      deliveryMethod: 'courier',
      paymentMethod: 'card',
      comment: ''
    });
  }, [user]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try { await updateProfile({ phone: formData.phone, address: formData.address }); } catch (error) { console.error(error); }
    setTimeout(() => {
      const newOrderNumber = 'ORD-' + Date.now();
      setOrderNumber(newOrderNumber);
      setOrderSuccess(true);
      const orders = JSON.parse(localStorage.getItem('vsk52_orders') || '[]');
      orders.push({ id: newOrderNumber, date: new Date().toISOString(), items, total: getTotalPrice(), customer: formData, status: 'processing' });
      localStorage.setItem('vsk52_orders', JSON.stringify(orders));
      clearCart();
      setIsLoading(false);
    }, 1500);
  };

  const deliveryMethods = [
    { id: 'courier', name: 'Курьерская доставка', price: 0, time: '1-2 дня', icon: 'free-icon-shipping-and-delivery-6830976.png' },
    { id: 'pickup', name: 'Самовывоз', price: 0, time: 'Сегодня', icon: 'free-icon-store-3871072.png' },
    { id: 'post', name: 'Почта России', price: 300, time: '5-10 дней', icon: 'free-icon-parcel-2312706.png' }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Банковская карта', icon: 'free-icon-credit-card-7710452.png' },
    { id: 'sbp', name: 'СБП', icon: 'free-icon-credit-card-7710452.png' },
    { id: 'cash', name: 'Наличные', icon: 'free-icon-credit-card-7710452.png' }
  ];

  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Оформление заказа</h1>
          <div className="bg-white rounded-3xl p-12 shadow-lg max-w-2xl mx-auto">
            <img src="/images/icons/free-icon-shopping-cart-4989863.png" alt="Корзина" className="w-20 h-20 mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ваша корзина пуста</h2>
            <Link to="/pitchers" className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition inline-block">Перейти к покупкам</Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container-custom text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </motion.div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">Заказ оформлен!</h1>
          <p className="text-2xl font-bold text-black mb-8">Номер заказа: {orderNumber}</p>
          <div className="bg-white rounded-3xl p-8 shadow-lg max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Детали заказа</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"><span className="text-gray-600">Сумма заказа:</span><span className="text-xl font-bold text-black">₽{getTotalPrice()}</span></div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"><span className="text-gray-600">Способ доставки:</span><span>{deliveryMethods.find(d => d.id === formData.deliveryMethod)?.name}</span></div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"><span className="text-gray-600">Способ оплаты:</span><span>{paymentMethods.find(p => p.id === formData.paymentMethod)?.name}</span></div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/profile')} className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition">Перейти в профиль</button>
            <Link to="/pitchers" className="bg-white text-black border border-gray-300 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50">Продолжить покупки</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container-custom">
        <h1 className="text-5xl font-black text-gray-900 mb-8 text-center">Оформление заказа</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Контактные данные</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" name="name" placeholder="Имя и фамилия" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300" required />
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="tel" name="phone" placeholder="Телефон" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300" required />
                  <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300">
                    {deliveryMethods.map(m => <option key={m.id} value={m.id}>{m.name} ({m.time})</option>)}
                  </select>
                </div>
                <textarea name="address" placeholder="Адрес доставки" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300" rows="3" required></textarea>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {paymentMethods.map(method => (
                    <label key={method.id} className={`flex items-center p-4 rounded-xl border-2 cursor-pointer ${formData.paymentMethod === method.id ? 'border-black bg-black text-white' : 'border-gray-300'}`}>
                      <input type="radio" name="paymentMethod" value={method.id} checked={formData.paymentMethod === method.id} onChange={handleChange} className="hidden" />
                      <img src={`/images/icons/${method.icon}`} alt={method.name} className={`w-5 h-5 mr-2 ${formData.paymentMethod === method.id ? 'brightness-0 invert' : ''}`} />
                      <span>{method.name}</span>
                    </label>
                  ))}
                </div>
                <textarea name="comment" placeholder="Комментарий к заказу" value={formData.comment} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300" rows="3"></textarea>
                <button type="submit" disabled={isLoading} className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition disabled:opacity-50">
                  {isLoading ? 'Оформление...' : 'Подтвердить заказ'}
                </button>
              </form>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-3xl p-6 shadow-lg sticky top-32">
              <h2 className="text-2xl font-black text-gray-900 mb-4">Ваш заказ</h2>
              <div className="space-y-4 mb-6">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div><p className="font-medium text-gray-900">{item.name}</p><p className="text-sm text-gray-500">{item.quantity} × ₽{item.price}</p></div>
                    <p className="font-bold text-gray-900">₽{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3"><div className="flex justify-between text-xl font-bold text-gray-900"><span>Итого</span><span>₽{getTotalPrice()}</span></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => (
  <ProtectedRoute>
    <CheckoutContent />
  </ProtectedRoute>
);

export default Checkout;