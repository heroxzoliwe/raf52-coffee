import React from 'react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const orders = JSON.parse(localStorage.getItem('vsk52_orders') || '[]');

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Все заказы</h1>
          <button onClick={() => navigate('/profile')} className="text-blue-600 hover:text-blue-800">← Назад в профиль</button>
        </div>
        {orders.length > 0 ? orders.map(order => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition mb-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-gray-900 text-lg">Заказ #{order.id}</span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">В обработке</span>
            </div>
            <div className="mb-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-gray-600 py-1"><span>{item.name} × {item.quantity}</span><span>₽{item.price * item.quantity}</span></div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="text-gray-600">Доставка: {order.customer?.address || 'Не указан'}</span>
              <span className="text-2xl font-bold text-gray-900">₽{order.total}</span>
            </div>
          </div>
        )) : (
          <div className="text-center py-12 bg-white rounded-xl">
            <img src="/images/icons/free-icon-parcel-2312706.png" alt="Нет заказов" className="w-20 h-20 mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Заказов пока нет</h2>
            <button onClick={() => navigate('/pitchers')} className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800">Перейти к покупкам</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;