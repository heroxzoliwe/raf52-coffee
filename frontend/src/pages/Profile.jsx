import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '', email: user?.email || '', phone: user?.phone || '', address: user?.address || ''
  });

  const orders = JSON.parse(localStorage.getItem('vsk52_orders') || '[]');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSave = async () => { await updateProfile(formData); setIsEditing(false); alert('Профиль обновлен!'); };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-black text-gray-900 mb-8">Личный кабинет</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Информация о профиле</h2>
                <button onClick={() => setIsEditing(!isEditing)} className="text-black font-medium">{isEditing ? 'Отменить' : 'Редактировать'}</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
                    <img src="/images/icons/free-icon-access-granted-18841950.png" alt="Профиль" className="w-10 h-10 brightness-0 invert" />
                  </div>
                  <div><h3 className="text-xl font-bold text-gray-900">{user?.name || 'Пользователь'}</h3><p className="text-gray-600">{user?.email}</p></div>
                </div>
                {isEditing ? (
                  <div className="space-y-4">
                    <input type="text" name="name" placeholder="Имя" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300" />
                    <input type="tel" name="phone" placeholder="Телефон" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300" />
                    <textarea name="address" placeholder="Адрес" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 resize-none" rows="3"></textarea>
                    <button onClick={handleSave} className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800">Сохранить изменения</button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3"><img src="/images/icons/free-icon-email-2258570.png" alt="Email" className="w-5 h-5" /><span className="text-gray-700">{user?.email}</span></div>
                    <div className="flex items-center space-x-3"><img src="/images/icons/free-icon-phone-call-5585562.png" alt="Телефон" className="w-5 h-5" /><span className="text-gray-700">{user?.phone || 'Не указан'}</span></div>
                    <div className="flex items-start space-x-3"><img src="/images/icons/free-icon-city-map-2803054.png" alt="Адрес" className="w-5 h-5" /><span className="text-gray-700">{user?.address || 'Не указан'}</span></div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8 mt-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">История заказов</h3>
                {orders.length > 0 && <span className="text-gray-600">Всего заказов: <span className="font-bold">{orders.length}</span></span>}
              </div>
              {orders.length > 0 ? orders.slice(0, 3).map(order => (
                <div key={order.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium text-gray-900">Заказ #{order.id}</span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">В обработке</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{order.items.length} товаров</span>
                    <span className="font-bold text-gray-900">₽{order.total}</span>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 bg-white rounded-xl border border-gray-200">
                  <img src="/images/icons/free-icon-parcel-2312706.png" alt="Заказы" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-500 mb-4">Заказов пока нет</p>
                  <button onClick={() => navigate('/pitchers')} className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800">Сделать первый заказ</button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Быстрые действия</h3>
              <div className="space-y-3">
                <button onClick={() => navigate('/cart')} className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100"><img src="/images/icons/free-icon-shopping-cart-4989863.png" alt="Корзина" className="w-5 h-5" /><span>Корзина</span></button>
                <button onClick={() => navigate('/buy')} className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100"><img src="/images/icons/free-icon-store-3871072.png" alt="Где купить" className="w-5 h-5" /><span>Где купить</span></button>
                <button onClick={() => navigate('/pitchers')} className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100"><img src="/images/icons/free-icon-shopping-cart-4989863.png" alt="Каталог" className="w-5 h-5" /><span>Каталог</span></button>
                <button onClick={logout} className="w-full flex items-center space-x-3 p-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"><span>Выйти</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;