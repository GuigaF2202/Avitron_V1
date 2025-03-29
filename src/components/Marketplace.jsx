import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Marketplace = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: t('marketplace.categories.all') },
    { id: 'avatar', name: t('marketplace.categories.avatar') },
    { id: 'clothing', name: t('marketplace.categories.clothing') },
    { id: 'accessories', name: t('marketplace.categories.accessories') },
    { id: 'homes', name: t('marketplace.categories.homes') },
    { id: 'furniture', name: t('marketplace.categories.furniture') },
    { id: 'land', name: t('marketplace.categories.land') },
    { id: 'vehicles', name: t('marketplace.categories.vehicles') }
  ];

  const products = [
    {
      id: 1,
      name: t('marketplace.products.avatar1'),
      price: 299.99,
      image: 'https://via.placeholder.com/200x200',
      category: 'avatar',
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: t('marketplace.products.clothing1'),
      price: 149.99,
      image: 'https://via.placeholder.com/200x200',
      category: 'clothing',
      rating: 4.2,
      reviews: 89
    },
    {
      id: 3,
      name: t('marketplace.products.home1'),
      price: 999.99,
      image: 'https://via.placeholder.com/200x200',
      category: 'homes',
      rating: 4.8,
      reviews: 256
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('marketplace.title')}</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {t('marketplace.cart')}
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            {t('marketplace.account')}
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder={t('marketplace.search.placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border rounded"
          />
          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {t('marketplace.search.button')}
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t('marketplace.categories.title')}</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/200x200';
                e.target.alt = t('marketplace.image.placeholder');
              }}
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-blue-600 font-bold mb-2">${product.price}</p>
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{product.rating}</span>
                <span className="ml-2 text-gray-500">({product.reviews} {t('marketplace.reviews')})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace; 