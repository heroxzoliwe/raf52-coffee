import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const statusLabels = {
  pending: 'Ожидает обработки',
  processing: 'В обработке',
  shipped: 'Отправлен',
  delivered: 'Доставлен',
  cancelled: 'Отменён',
};

const statusClasses = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const formatDate = (date) => {
    if (!date) return 'Дата неизвестна';

    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await api.getOrders();

        setOrders(data);
      } catch (error) {
        setError(error.message || 'Не удалось загрузить заказы');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 sm:pt-32 pb-12 sm:pb-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-3xl font-black text-gray-900">
            Загрузка заказов...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 sm:pt-32 pb-12 sm:pb-20">
      <div className="container mx-auto px-4 max-w-6xl">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
            Мои заказы
          </h1>

          <button
            onClick={() => navigate('/profile')}
            className="text-left sm:text-right text-black hover:text-gray-700 font-semibold"
          >
            ← Назад в профиль
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {orders.length > 0 ? (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-5">
                  <div>
                    <h2 className="font-black text-gray-900 text-xl">
                      Заказ #{order.order_number}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(order.created_at)}
                    </p>
                  </div>

                  <span
                    className={`inline-flex w-fit px-3 py-1 rounded-full text-sm font-semibold ${
                      statusClasses[order.status] ||
                      'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {statusLabels[order.status] || order.status}
                  </span>
                </div>

                <div className="space-y-3 mb-5">
                  {Array.isArray(order.items) &&
                    order.items.map((item, index) => (
                      <div
                        key={`${item.id}-${index}`}
                        className="flex justify-between gap-4 text-gray-700 py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <span className="break-words">
                          {item.name} × {item.quantity}
                        </span>

                        <span className="font-semibold shrink-0">
                          ₽{Number(item.price) * Number(item.quantity)}
                        </span>
                      </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-gray-600">
                    <p className="font-semibold text-gray-900 mb-1">
                      Доставка
                    </p>

                    <p>{order.delivery_address || 'Не указан'}</p>
                  </div>

                  <div className="md:text-right">
                    <p className="text-gray-600 mb-1">
                      Сумма заказа
                    </p>

                    <p className="text-2xl font-black text-gray-900">
                      ₽{order.total}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl sm:rounded-3xl shadow-lg">
            <img
              src="/images/icons/free-icon-parcel-2312706.png"
              alt="Нет заказов"
              className="w-20 h-20 mx-auto mb-4 opacity-50"
            />

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Заказов пока нет
            </h2>

            <p className="text-gray-600 mb-6">
              Добавьте товар в корзину и оформите первый заказ.
            </p>

            <button
              onClick={() => navigate('/pitchers')}
              className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800"
            >
              Перейти к покупкам
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;