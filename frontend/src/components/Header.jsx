import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  // Анимация для крутящегося логотипа
  const logoSpanVariants = {
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  // Фон хедера - всегда белый/полупрозрачный, но ВИДИМЫЙ
  const getHeaderBg = () => {
    if (isScrolled) return 'bg-white shadow-lg py-3';
    // Всегда белый фон с небольшим размытием, даже вверху
    return 'bg-white/90 backdrop-blur-md shadow-sm py-4';
  };

  // Цвет текста - всегда темный для читаемости
  const getLogoColor = () => 'text-black';
  const getSubColor = () => 'text-gray-500';
  const getNavColor = () => 'text-gray-700 hover:text-black';
  const getIconColor = () => 'text-gray-800';

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${getHeaderBg()}`}>
      <div className="container-custom flex items-center justify-between">
        {/* Логотип с крутящейся анимацией */}
        <Link to="/">
          <motion.div 
            className="flex items-center space-x-2 group"
            whileHover="hover"
          >
            <motion.div 
              variants={logoSpanVariants}
              className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-md"
            >
              <span className="text-white text-1x font-bold">RAF</span>
            </motion.div>
            <div>
              <div className={`text-xl font-bold ${getLogoColor()}`}>RAF-52</div>
              <div className={`text-xs ${getSubColor()}`}>COFFEE</div>
            </div>
          </motion.div>
        </Link>

        {/* Десктопная навигация */}
        <nav className="hidden md:flex items-center space-x-1">
          {[
            { path: '/pitchers', name: 'Питчеры' },
            { path: '/tempers', name: 'Темперы' },
            { path: '/scales', name: 'Весы' },
            { path: '/accessories', name: 'Аксессуары' }
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-5 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                isActive(item.path)
                  ? 'bg-black text-white shadow-md'
                  : getNavColor()
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Правая часть */}
        <div className="flex items-center space-x-4">
          {/* Корзина */}
          <button onClick={() => navigate('/cart')} className="relative">
            <svg className={`w-6 h-6 ${getIconColor()}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>

          {/* Пользователь */}
          <button onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}>
            <svg className={`w-6 h-6 ${getIconColor()}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>

          {/* Мобильное меню */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
            <svg className={`w-6 h-6 ${getIconColor()}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg mt-2 py-4 px-4 border-t">
          <div className="flex flex-col space-y-2">
            {[
              { path: '/pitchers', name: 'Питчеры' },
              { path: '/tempers', name: 'Темперы' },
              { path: '/scales', name: 'Весы' },
              { path: '/accessories', name: 'Аксессуары' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated && (
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); navigate('/'); }} className="px-4 py-2 text-left text-red-600 hover:bg-gray-100 rounded-lg">
                Выйти
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;