import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', address: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (formData.password !== formData.confirmPassword) throw new Error('Пароли не совпадают');
      if (formData.password.length < 6) throw new Error('Пароль минимум 6 символов');
      const result = await register(formData);
      if (result.success) navigate('/profile');
    } catch (err) { setError(err.message); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white pt-32 pb-20">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <img src="/images/icons/free-icon-access-granted-18841950.png" alt="Регистрация" className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-black text-gray-900 mb-2">Создать аккаунт</h1>
          </div>
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Имя и фамилия" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300" required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300" required />
            <input type="tel" name="phone" placeholder="Телефон" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300" />
            <textarea name="address" placeholder="Адрес доставки" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 resize-none" rows="2"></textarea>
            <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300" required />
            <input type="password" name="confirmPassword" placeholder="Подтвердите пароль" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300" required />
            <button type="submit" disabled={isLoading} className="w-full bg-black text-white py-3 rounded-xl font-semibold disabled:opacity-50">{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}</button>
          </form>
          <p className="mt-6 text-center">Уже есть аккаунт? <Link to="/login" className="text-black font-semibold">Войти</Link></p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;