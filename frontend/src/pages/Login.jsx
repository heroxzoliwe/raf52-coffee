import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) navigate(from, { replace: true });
    } catch (err) { setError(err.message); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white pt-32 pb-20">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <img src="/images/icons/free-icon-access-granted-18841950.png" alt="Вход" className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-black text-gray-900 mb-2">Войти в аккаунт</h1>
          </div>
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300" required />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300" required />
            <button type="submit" disabled={isLoading} className="w-full bg-black text-white py-3 rounded-xl font-semibold disabled:opacity-50">{isLoading ? 'Вход...' : 'Войти'}</button>
          </form>
          <p className="mt-6 text-center text-gray-600">Нет аккаунта? <Link to="/register" className="text-black font-semibold">Зарегистрироваться</Link></p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;