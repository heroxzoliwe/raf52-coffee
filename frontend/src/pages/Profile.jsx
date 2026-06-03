import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const icon = (name) => `/images/icons/${name}`;

const paymentLabels = {
  card: 'Банковская карта',
  sbp: 'СБП',
  cash: 'Наличные',
};

const deliveryLabels = {
  courier: 'Курьер',
  pickup: 'Самовывоз',
  post: 'Почта России',
};

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    default_payment: user?.default_payment || 'card',
    default_delivery: user?.default_delivery || 'courier'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (date) => {
    if (!date) return 'Дата неизвестна';
    return new Date(date).toLocaleDateString('ru-RU');
  };

  const Row = ({ iconName, children }) => (
    <div className="flex items-center space-x-3">
      <img
        src={icon(iconName)}
        alt=""
        className="w-5 h-5 object-contain"
      />

      <span className="text-gray-700">
        {children}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-black text-gray-900 mb-8">
          Личный кабинет
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* PROFILE */}

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg">

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Информация о профиле
                </h2>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-black hover:text-gray-700 font-medium"
                >
                  {isEditing ? 'Отменить' : 'Редактировать'}
                </button>
              </div>

              <div className="space-y-4">

                {/* AVATAR */}

                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {user?.username || 'Пользователь'}
                    </h3>

                    <p className="text-gray-600">
                      {user?.email}
                    </p>
                  </div>
                </div>

                {/* EDIT */}

                {isEditing ? (
                  <div className="space-y-4">

                    <input
                      type="text"
                      name="username"
                      placeholder="Имя"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300"
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300"
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Телефон"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300"
                    />

                    <textarea
                      name="address"
                      placeholder="Адрес"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 resize-none"
                    />

                    <select
                      name="default_payment"
                      value={formData.default_payment}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300"
                    >
                      <option value="card">Банковская карта</option>
                      <option value="sbp">СБП</option>
                      <option value="cash">Наличные</option>
                    </select>

                    <select
                      name="default_delivery"
                      value={formData.default_delivery}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300"
                    >
                      <option value="courier">Курьер</option>
                      <option value="pickup">Самовывоз</option>
                      <option value="post">Почта России</option>
                    </select>

                    <button
                      onClick={handleSave}
                      className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                    >
                      Сохранить изменения
                    </button>

                  </div>
                ) : (

                  /* VIEW */

                  <div className="space-y-4">

                    <Row iconName="free-icon-access-granted-18841950.png">
                      {user?.username || 'Не указано'}
                    </Row>

                    <Row iconName="free-icon-email-2258570.png">
                      {user?.email || 'Не указан'}
                    </Row>

                    <Row iconName="free-icon-phone-call-4029956.png">
                      {user?.phone || 'Не указан'}
                    </Row>

                    <Row iconName="free-icon-city-map-2803054.png">
                      {user?.address || 'Не указан'}
                    </Row>

                    <Row iconName="free-icon-credit-card-7710452.png">
                      {paymentLabels[user?.default_payment] || 'Не указано'}
                    </Row>

                    <Row iconName="free-icon-parcel-2312706.png">
                      {deliveryLabels[user?.default_delivery] || 'Не указано'}
                    </Row>

                    <Row iconName="free-icon-calendar-7691413.png">
                      На сайте с {formatDate(user?.created_at)}
                    </Row>

                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="space-y-6">

            <div className="bg-white rounded-3xl p-6 shadow-lg">

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Быстрые действия
              </h3>

              <div className="space-y-3">

                <button
                  onClick={() => navigate('/orders')}
                  className="w-full bg-gray-100 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
                >
                  <img
                    src={icon('free-icon-parcel-2312706.png')}
                    alt=""
                    className="w-5 h-5"
                  />

                  Мои заказы
                </button>

                <button
                  onClick={() => navigate('/cart')}
                  className="w-full bg-gray-100 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
                >
                  <img
                    src={icon('free-icon-shopping-cart-4989863.png')}
                    alt=""
                    className="w-5 h-5"
                  />

                  Корзина
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition"
                >
                  Выйти
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;