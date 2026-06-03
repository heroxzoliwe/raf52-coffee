import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import api from '../services/api';

const deliveryMethods = [
  {
    id: 'courier',
    name: 'Курьерская доставка',
    price: 0,
    time: '1-2 дня',
    icon: 'free-icon-shipping-and-delivery-6830976.png',
  },
  {
    id: 'pickup',
    name: 'Самовывоз',
    price: 0,
    time: 'Сегодня',
    icon: 'free-icon-store-3871072.png',
  },
  {
    id: 'post',
    name: 'Почта России',
    price: 300,
    time: '5-10 дней',
    icon: 'free-icon-parcel-2312706.png',
  },
];

const paymentMethods = [
  {
    id: 'card',
    name: 'Банковская карта',
    icon: 'free-icon-credit-card-7710452.png',
  },
  {
    id: 'sbp',
    name: 'СБП',
    icon: 'free-icon-credit-card-7710452.png',
  },
  {
    id: 'cash',
    name: 'Наличные',
    icon: 'free-icon-credit-card-7710452.png',
  },
];

const CheckoutContent = () => {
  const navigate = useNavigate();

  const { items, getTotalPrice, clearCart } = useCart();
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card',
    comment: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.username || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      deliveryMethod: user.default_delivery || 'courier',
      paymentMethod: user.default_payment || 'card',
      comment: '',
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
    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = normalizePhone(formData.phone);
    const address = formData.address.trim();

    const nameRegex = /^[А-Яа-яA-Za-zЁё\s-]+$/;
    const phoneRegex = /^\+7\d{10}$/;

    if (name.length < 3 || !nameRegex.test(name)) {
      throw new Error('Введите нормальное имя');
    }

    if (!email.includes('@') || email.length < 6) {
      throw new Error('Введите нормальный email');
    }

    if (!phoneRegex.test(phone)) {
      throw new Error('Телефон должен быть в формате +7XXXXXXXXXX');
    }

    if (address.length < 5) {
      throw new Error('Введите нормальный адрес доставки');
    }

    return {
      name,
      email,
      phone,
      address,
      comment: formData.comment.trim(),
    };
  };

  const handleChange = (e) => {
    setError('');

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');

    try {
      const cleanData = validateForm();

      const selectedDelivery = deliveryMethods.find(
        (item) => item.id === formData.deliveryMethod
      );

      const deliveryPrice = selectedDelivery?.price || 0;
      const total = Number(getTotalPrice()) + deliveryPrice;

      const orderPayload = {
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: Number(item.price),
          quantity: item.quantity,
          category: item.category_slug || item.category || 'pitchers',
          slug: item.slug,
        })),
        total,
        delivery_method: formData.deliveryMethod,
        delivery_address: cleanData.address,
        payment_method: formData.paymentMethod,
        contact_name: cleanData.name,
        contact_phone: cleanData.phone,
        contact_email: cleanData.email,
        comment: cleanData.comment,
      };

      const order = await api.createOrder(orderPayload);

      try {
        await updateProfile({
          username: cleanData.name,
          email: cleanData.email,
          phone: cleanData.phone,
          address: cleanData.address,
          default_delivery: formData.deliveryMethod,
          default_payment: formData.paymentMethod,
        });
      } catch (profileError) {
        console.error(profileError);
      }

      setOrderNumber(order.order_number || order.id);
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      setError(error.message || 'Ошибка оформления заказа');
    } finally {
      setIsLoading(false);
    }
  };

  const deliveryPrice =
    deliveryMethods.find((item) => item.id === formData.deliveryMethod)?.price || 0;

  const finalTotal = Number(getTotalPrice()) + deliveryPrice;

  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 sm:pt-32 pb-12 sm:pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-6">
            Оформление заказа
          </h1>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-lg max-w-2xl mx-auto">
            <img
              src="/images/icons/free-icon-shopping-cart-4989863.png"
              alt="Корзина"
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 opacity-50"
            />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ваша корзина пуста
            </h2>

            <Link
              to="/pitchers"
              className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition inline-block w-full sm:w-auto"
            >
              Перейти к покупкам
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 sm:pt-32 pb-12 sm:pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4">
            Заказ оформлен!
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-black mb-8">
            Номер заказа: {orderNumber}
          </p>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Спасибо за покупку
            </h2>

            <p className="text-gray-600">
              Ваш заказ сохранён в системе. Его можно посмотреть в личном кабинете.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/orders')}
              className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              Мои заказы
            </button>

            <Link
              to="/pitchers"
              className="bg-white text-black border border-gray-300 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50"
            >
              Продолжить покупки
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 sm:pt-32 pb-12 sm:pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-6 sm:mb-8 text-center">
          Оформление заказа
        </h1>

        {error && (
          <div className="max-w-3xl mx-auto mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg">
              <h2 className="text-2xl font-black text-gray-900 mb-6">
                Контактные данные
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Имя и фамилия"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300"
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+79000000000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300"
                    required
                  />

                  <select
                    name="deliveryMethod"
                    value={formData.deliveryMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300"
                  >
                    {deliveryMethods.map((method) => (
                      <option key={method.id} value={method.id}>
                        {method.name} ({method.time})
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  name="address"
                  placeholder="Адрес доставки"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 resize-none"
                  rows="3"
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition ${
                        formData.paymentMethod === method.id
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleChange}
                        className="hidden"
                      />

                      <img
                        src={`/images/icons/${method.icon}`}
                        alt={method.name}
                        className={`w-5 h-5 mr-2 ${
                          formData.paymentMethod === method.id
                            ? 'brightness-0 invert'
                            : ''
                        }`}
                      />

                      <span>{method.name}</span>
                    </label>
                  ))}
                </div>

                <textarea
                  name="comment"
                  placeholder="Комментарий к заказу"
                  value={formData.comment}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 resize-none"
                  rows="3"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {isLoading ? 'Оформление...' : 'Подтвердить заказ'}
                </button>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg lg:sticky lg:top-28">
              <h2 className="text-2xl font-black text-gray-900 mb-4">
                Ваш заказ
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex justify-between gap-4 py-3 border-b border-gray-100"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 break-words">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.quantity} × ₽{item.price}
                      </p>
                    </div>

                    <p className="font-bold text-gray-900 shrink-0">
                      ₽{Number(item.price) * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-3">
                <div className="flex justify-between text-gray-600">
                  <span>Товары</span>
                  <span>₽{getTotalPrice()}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Доставка</span>
                  <span>{deliveryPrice === 0 ? 'Бесплатно' : `₽${deliveryPrice}`}</span>
                </div>

                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Итого</span>
                  <span>₽{finalTotal}</span>
                </div>
              </div>
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