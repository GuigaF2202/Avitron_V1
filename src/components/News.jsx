import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const News = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: t('news.categories.all') },
    { id: 'featured', name: t('news.categories.featured') },
    { id: 'updates', name: t('news.categories.updates') },
    { id: 'events', name: t('news.categories.events') },
    { id: 'community', name: t('news.categories.community') }
  ];

  const news = [
    {
      id: 1,
      category: 'featured',
      image: 'https://picsum.photos/800/600'
    },
    {
      id: 2,
      category: 'updates',
      image: 'https://picsum.photos/800/600'
    },
    {
      id: 3,
      category: 'events',
      image: 'https://picsum.photos/800/600'
    },
    {
      id: 4,
      category: 'featured',
      image: 'https://picsum.photos/800/600'
    },
    {
      id: 5,
      category: 'community',
      image: 'https://picsum.photos/800/600'
    },
    {
      id: 6,
      category: 'updates',
      image: 'https://picsum.photos/800/600'
    }
  ];

  const filteredNews = selectedCategory === 'all'
    ? news
    : news.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white py-12">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('news.title')}</h1>
          <p className="text-xl text-gray-300">{t('news.subtitle')}</p>
        </div>

        {/* Categorias */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Grid de Imagens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map(item => (
            <article
              key={item.id}
              className="group relative h-[300px] overflow-hidden rounded-lg hover:transform hover:scale-105 transition-transform"
            >
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = 'https://picsum.photos/800/600';
                }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors">
                  {t('news.readMore')}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Paginação */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              ←
            </button>
            <button className="px-4 py-2 bg-purple-600 rounded-lg">1</button>
            <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">2</button>
            <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">3</button>
            <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              →
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default News; 