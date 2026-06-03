import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../services/api';

const categoryContent = {
  pitchers: {
    badge: 'КОЛЛЕКЦИЯ ПИТЧЕРОВ',
    title: 'Профессиональные Питчеры',
    description:
      'Идеальное вспенивание молока для создания авторских кофейных напитков',
  },

  tempers: {
    badge: 'КОЛЛЕКЦИЯ ТЕМПЕРОВ',
    title: 'Профессиональные Темперы',
    description:
      'Идеальное уплотнение кофе для равномерной экстракции',
  },

  scales: {
    badge: 'КОЛЛЕКЦИЯ ВЕСОВ',
    title: 'Точные Весы',
    description:
      'Профессиональное взвешивание для идеального кофе',
  },

  accessories: {
    badge: 'КОЛЛЕКЦИЯ АКСЕССУАРОВ',
    title: 'Аксессуары',
    description:
      'Профессиональные аксессуары для бариста',
  },
};

const CategoryPage = () => {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const content = categoryContent[category];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const data = await api.getProducts(category);

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Категория не найдена
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 sm:pt-32 pb-12 sm:pb-20">
      <div className="container mx-auto px-4">

        <div className="text-center mb-10 sm:mb-14 lg:mb-20">

          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md rounded-2xl px-4 sm:px-6 py-3 shadow-lg mb-5 sm:mb-6 border border-gray-200">
            <span className="w-2 h-2 bg-black rounded-full" />

            <span className="text-xs sm:text-sm font-semibold text-gray-700">
              {content.badge}
            </span>

            <span className="w-2 h-2 bg-black rounded-full" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight">
            {content.title}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            {content.description}
          </p>

          <div className="h-1 bg-gradient-to-r from-black to-gray-800 mx-auto mt-6 sm:mt-8 rounded-full w-24" />
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-xl font-semibold">
              Загрузка...
            </div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                category={category}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center shadow-lg">
            <p className="text-gray-600">
              Товары пока не добавлены
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;