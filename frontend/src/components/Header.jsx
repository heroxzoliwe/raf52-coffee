import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const navItems = [
  { path: '/pitchers', name: 'Питчеры' },
  { path: '/tempers', name: 'Темперы' },
  { path: '/scales', name: 'Весы' },
  { path: '/accessories', name: 'Аксессуары' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();

  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="h-16 sm:h-20 flex items-center justify-between gap-4">

          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white text-sm font-bold">
                RAF
              </span>
            </div>

            <div className="leading-tight">
              <div className="text-lg sm:text-xl font-black text-black">
                RAF-52
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500 tracking-widest">
                COFFEE
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition ${
                  isActive(item.path)
                    ? 'bg-black text-white shadow-md'
                    : 'text-gray-700 hover:text-black hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">

            <button
              onClick={() => navigate('/cart')}
              className="relative w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
              aria-label="Корзина"
            >
              <svg
                className="w-6 h-6 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>

              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-5 h-5 px-1 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
              className="hidden sm:flex w-10 h-10 rounded-xl hover:bg-gray-100 items-center justify-center transition"
              aria-label="Профиль"
            >
              <svg
                className="w-6 h-6 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
              aria-label="Меню"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100">
            <nav className="pt-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 rounded-xl font-semibold transition ${
                    isActive(item.path)
                      ? 'bg-black text-white'
                      : 'text-gray-800 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <button
                onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
                className="px-4 py-3 rounded-xl font-semibold text-left bg-gray-50 hover:bg-gray-100 text-gray-800"
              >
                {isAuthenticated ? 'Профиль' : 'Войти'}
              </button>

              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 rounded-xl font-semibold text-left bg-red-50 text-red-600 hover:bg-red-100"
                >
                  Выйти
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;