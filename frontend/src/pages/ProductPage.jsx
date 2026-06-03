import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const ProductPage = () => {
  const { category, slug } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(location.state?.product || null);
  const [imageSrc, setImageSrc] = useState(location.state?.imageSrc || '');
  const [loading, setLoading] = useState(!location.state?.product);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
      setImageSrc(location.state.imageSrc);
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      try {
        setLoading(true);

        const data = await api.getProduct(category, slug);

        setProduct(data);

        setImageSrc(
          data.image ||
          `/images/categories/${category}/${data.slug || data.id}.jpg`
        );
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [category, slug, location.state]);

  const handleAddToCart = (redirect = false) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    addToCart(
      {
        ...product,
        category_slug: category,
        imageSrc,
      },
      quantity
    );

    if (redirect) {
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 flex items-center justify-center">
        <div className="text-xl font-semibold">
          Загрузка товара...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 shadow-lg text-center max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">
            Товар не найден
          </h1>

          <Link
            to={`/${category}`}
            className="inline-block bg-black text-white px-6 py-3 rounded-xl font-semibold"
          >
            Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 sm:pt-32 pb-12 sm:pb-20">
      <div className="container mx-auto px-4">

        <div className="text-sm text-gray-500 mb-6 break-words">
          <Link to="/" className="hover:text-black">
            Главная
          </Link>

          {' / '}

          <Link to={`/${category}`} className="hover:text-black">
            {product.category_name || category}
          </Link>

          {' / '}

          <span className="text-black">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg flex items-center justify-center min-h-[320px] sm:min-h-[500px]">
            <img
              src={imageSrc}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-contain max-h-[500px]"
              onError={(e) => {
                e.currentTarget.src =
                  'https://placehold.co/600x400?text=NO+IMAGE';
              }}
            />
          </div>

          <div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 break-words">
              {product.name}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-6">

              <span className="text-3xl sm:text-4xl font-black text-black">
                ₽{product.price}
              </span>

              <div className="flex items-center">
                <span className="text-yellow-400 text-lg">
                  ★★★★★
                </span>

                <span className="text-sm text-gray-500 ml-1">
                  4.8
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
              {product.description}
            </p>

            {product.characteristics?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3">
                  Характеристики
                </h3>

                <ul className="space-y-2 text-gray-600">
                  {product.characteristics.map((item, index) => (
                    <li
                      key={index}
                      className="bg-white rounded-xl px-4 py-3 shadow-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.features?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3">
                  Особенности
                </h3>

                <ul className="space-y-2 text-gray-600">
                  {product.features.map((item, index) => (
                    <li
                      key={index}
                      className="bg-white rounded-xl px-4 py-3 shadow-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">

              <span className="font-semibold">
                Количество:
              </span>

              <div className="flex items-center gap-3">

                <button
                  onClick={() =>
                    setQuantity(Math.max(1, quantity - 1))
                  }
                  className="w-10 h-10 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
                >
                  -
                </button>

                <span className="w-10 text-center text-lg font-semibold">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  className="w-10 h-10 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">

              <button
                onClick={() => handleAddToCart(true)}
                className="flex-1 bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                Купить сейчас
              </button>

              <button
                onClick={() => handleAddToCart(false)}
                className="flex-1 bg-white text-black border border-gray-300 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                В корзину
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;