import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

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

    setLoading(true);

    fetch(`http://localhost:8000/api/product/${category}/${slug}/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setImageSrc(
          data.image ||
          `/images/categories/${category}/${data.slug || data.id}.jpg`
        );
      })
      .catch((err) => {
        console.error('Ошибка загрузки товара:', err);
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category, slug, location.state]);

  if (loading) {
    return <div className="min-h-screen pt-32 text-center">Загрузка...</div>;
  }

  if (!product) {
    return <div className="min-h-screen pt-32 text-center">Товар не найден</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container-custom">
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-black">Главная</Link>
          {' / '}
          <Link to={`/${category}`} className="hover:text-black">
            {product.category_name || category}
          </Link>
          {' / '}
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-3xl p-8 shadow-lg flex items-center justify-center h-96">
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/600x400?text=NO+IMAGE';
              }}
            />
          </div>

          <div>
            <h1 className="text-4xl font-black mb-4">{product.name}</h1>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-black text-black">
                ₽{product.price}
              </span>

              <div className="flex items-center">
                <span className="text-yellow-400 text-lg">★★★★★</span>
                <span className="text-sm text-gray-500 ml-1">4.8</span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {product.characteristics?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Характеристики:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {product.characteristics.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.features?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Особенности:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {product.features.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center space-x-4 mb-6">
              <span className="font-semibold">Количество:</span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  -
                </button>

                <span className="w-12 text-center text-lg font-semibold">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate('/login');
                    return;
                  }

                  addToCart(product, quantity);
                  navigate('/cart');
                }}
                className="flex-1 bg-black text-white py-3 rounded-xl font-semibold"
              >
                Купить сейчас
              </button>

              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate('/login');
                    return;
                  }

                  addToCart(product, quantity);
                }}
                className="flex-1 bg-white text-black border border-gray-300 py-3 rounded-xl font-semibold"
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