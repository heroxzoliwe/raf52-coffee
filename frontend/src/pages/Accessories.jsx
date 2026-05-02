import React from 'react';
import ProductCard from '../components/ProductCard';
import { productsData } from '../data/Products';

const Accessories = () => {
  const accessories = productsData.accessories;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-black text-gray-900 mb-6"><span className="text-gradient">Аксессуары</span></h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Профессиональные корзинки для холдера для идеальной экстракции</p>
          <div className="h-1 bg-gradient-to-r from-black to-gray-800 mx-auto mt-8 rounded-full w-24"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {accessories.map((accessory, index) => (
            <ProductCard key={accessory.id} product={accessory} index={index} category="accessories" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accessories;