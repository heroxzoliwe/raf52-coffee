import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { productsData } from '../data/Products';

const ProductPage = () => {
  const { id, category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const foundProduct = productsData[category]?.find(p => p.id === parseInt(id));
    if (foundProduct) setProduct(foundProduct);
  }, [id, category]);

  if (!product) return <div className="min-h-screen pt-32 text-center">Загрузка...</div>;

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container-custom">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link to="/" className="hover:text-black">Главная</Link>
            <span>›</span>
            <Link to={`/${category}`} className="hover:text-black capitalize">
              {category === 'pitchers' && 'Питчеры'}
              {category === 'tempers' && 'Темперы'}
              {category === 'scales' && 'Весы'}
              {category === 'accessories' && 'Аксессуары'}
            </Link>
            <span>›</span>
            <span className="text-black">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <img src={`/images/${product.image}`} alt={product.name} className="w-full h-96 object-contain" />
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-black text-gray-900">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-black text-black">₽{product.price}</span>
                <div className="flex items-center">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-lg">⭐</span>)}<span className="text-sm text-gray-500 ml-1">4.8</span></div>
              </div>

              {!isAuthenticated && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center"><img src="/images/icons/free-icon-access-granted-18841950.png" alt="Вход" className="w-5 h-5" /></div><div><p className="font-medium text-amber-800">Требуется авторизация</p><p className="text-sm text-amber-700">Войдите или зарегистрируйтесь для покупок</p></div></div>
                </div>
              )}

              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold">Количество:</span>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300">-</button>
                  <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300">+</button>
                </div>
              </div>

              <div className="flex space-x-4">
                {isAuthenticated ? (
                  <>
                    <button onClick={() => { addToCart(product, quantity); navigate('/cart'); }} className="flex-1 bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800">Купить сейчас</button>
                    <button onClick={() => addToCart(product, quantity)} className="flex-1 bg-white text-black border border-gray-300 py-4 rounded-lg font-semibold hover:bg-gray-50">В корзину</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setShowLoginModal(true)} className="flex-1 bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800">Купить сейчас</button>
                    <button onClick={() => setShowLoginModal(true)} className="flex-1 bg-white text-black border border-gray-300 py-4 rounded-lg font-semibold hover:bg-gray-50">В корзину</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-white rounded-3xl max-w-md w-full p-8 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"><img src="/images/icons/free-icon-access-granted-18841950.png" alt="Вход" className="w-8 h-8" /></div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Требуется авторизация</h3>
              <p className="text-gray-600 mb-6">Для покупки товаров необходимо войти в аккаунт</p>
              <button onClick={() => navigate('/login')} className="w-full bg-black text-white py-3 rounded-xl font-semibold mb-3">Войти</button>
              <button onClick={() => navigate('/register')} className="w-full bg-white text-black border border-gray-300 py-3 rounded-xl font-semibold mb-3">Регистрация</button>
              <button onClick={() => setShowLoginModal(false)} className="text-gray-500">Продолжить просмотр</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductPage;