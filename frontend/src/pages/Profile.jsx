import React, { useEffect, useState } from 'react';
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
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    default_payment: 'card',
    default_delivery: 'courier',
  });

  useEffect(() => {
    if (!user) return;

    setFormData({
      username: user.username || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      default_payment: user.default_payment || 'card',
      default_delivery: user.default_delivery || 'courier',
    });
  }, [user]);

  const normalizePhone = (phone) => {
    let value = phone.replace(/[^\d+]/g, '');

    if (value.startsWith('8') && value.length === 11) {
      value = `+7${value.slice(1)}`;
    }

    if (value.startsWith('7') && value.length === 11) {
      value = `+${value}`;
    }

    return value;
  };

  const validateForm = () => {
    const nameRegex = /^[А-Яа-яA-Za-zЁё\s-]+$/;
    const phoneRegex = /^\+7\d{10}$/;

    const username = formData.username.trim();
    const email = formData.email.trim();
    const phone = normalizePhone(formData.phone);
    const address = formData.address.trim();

    if (username.length < 3) {
      throw new Error('Имя должно быть минимум 3 символа');
    }

    if (!nameRegex.test(username)) {
      throw new Error('Имя может содержать только буквы, пробел и дефис');
    }

    if (!email.includes('@') || email.length < 6) {
      throw new Error('Введите нормальный email');
    }

    if (phone && !phoneRegex.test(phone)) {
      throw new Error('Телефон должен быть в формате +7XXXXXXXXXX');
    }

    if (address && address.length < 5) {
      throw new Error('Адрес слишком короткий');
    }

    return {
      ...formData,
      username,
      email: email.toLowerCase(),
      phone,
      address,
    };
  };

  const handleChange = (e) => {
    setError('');
    setSuccess('');

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setIsSaving(true);

    try {
      const cleanData = validateForm();

      await updateProfile(cleanData);

      setSuccess('Профиль обновлён');
      setIsEditing(false);
    } catch (error) {
      setError(error.message || 'Ошибка обновления профиля');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setError('');
    setSuccess('');
    setIsEditing(false);

    setFormData({
      username: user?.username || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      default_payment: user?.default_payment || 'card',
      default_delivery: user?.default_delivery || 'courier',
    });
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
    <div className="flex items-start sm:items-center gap-3 break-words">
      <img src={icon(iconName)} alt="" className="w-5 h-5 object-contain mt-0.5 sm:mt-0" />
      <span className="text-gray-700 break-words min-w-0">{children}</span>
    </div>
  );

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20';

  return (
    <div className="min-h-screen bg-gray-50 pt-24 sm:pt-32 pb-12 sm:pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 sm:mb-8">
          Личный кабинет
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Информация о профиле
                </h2>

                <button
                  onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                  className="text-left sm:text-right text-black hover:text-gray-700 font-medium"
                >
                  {isEditing ? 'Отменить' : 'Редактировать'}
                </button>
              </div>

              {error && (
                <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-xl text-sm">
                  {success}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-xl sm:text-2xl font-bold">
                      {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                      {user?.username || 'Пользователь'}
                    </h3>

                    <p className="text-gray-600 break-words">
                      {user?.email}
                    </p>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="username"
                      placeholder="Имя"
                      value={formData.username}
                      onChange={handleChange}
                      className={inputClass}
                      maxLength="80"
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="+79000000000"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />

                    <textarea
                      name="address"
                      placeholder="Адрес"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      maxLength="300"
                      className={`${inputClass} resize-none`}
                    />

                    <select
                      name="default_payment"
                      value={formData.default_payment}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="card">Банковская карта</option>
                      <option value="sbp">СБП</option>
                      <option value="cash">Наличные</option>
                    </select>

                    <select
                      name="default_delivery"
                      value={formData.default_delivery}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="courier">Курьер</option>
                      <option value="pickup">Самовывоз</option>
                      <option value="post">Почта России</option>
                    </select>

                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-50"
                    >
                      {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
                    </button>
                  </div>
                ) : (
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

          <div className="space-y-6">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                Быстрые действия
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => navigate('/orders')}
                  className="w-full bg-gray-100 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
                >
                  <img src={icon('free-icon-parcel-2312706.png')} alt="" className="w-5 h-5" />
                  Мои заказы
                </button>

                <button
                  onClick={() => navigate('/cart')}
                  className="w-full bg-gray-100 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
                >
                  <img src={icon('free-icon-shopping-cart-4989863.png')} alt="" className="w-5 h-5" />
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