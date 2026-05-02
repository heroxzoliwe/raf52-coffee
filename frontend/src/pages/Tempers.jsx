import React from 'react';
import ProductCard from '../components/ProductCard';
import { productsData } from '../data/Products';

const Tempers = () => {
  const tempers = productsData.tempers;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-black text-gray-900 mb-6">Профессиональные <span className="text-gradient">Темперы</span></h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Идеальное уплотнение кофе для равномерной экстракции</p>
          <div className="h-1 bg-gradient-to-r from-black to-gray-800 mx-auto mt-8 rounded-full w-24"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {tempers.map((temper, index) => (
            <ProductCard key={temper.id} product={temper} index={index} category="tempers" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tempers;