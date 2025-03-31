import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <button 
        className={`text-sm ${i18n.language === 'en' ? 'text-[#00F0FF]' : 'text-gray-400 hover:text-white'}`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <button 
        className={`text-sm ${i18n.language === 'es' ? 'text-[#00F0FF]' : 'text-gray-400 hover:text-white'}`}
        onClick={() => changeLanguage('es')}
      >
        ES
      </button>
      <button 
        className={`text-sm ${i18n.language === 'pt' ? 'text-[#00F0FF]' : 'text-gray-400 hover:text-white'}`}
        onClick={() => changeLanguage('pt')}
      >
        PT
      </button>
    </div>
  );
};

export default LanguageSelector;
