import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector = ({ className, mobile = false }) => {
  try {
    const { t } = useTranslation();
    // Certifique-se de que language e changeLanguage estão definidos
    const { language = 'en', changeLanguage = () => {} } = useLanguage();

    const languages = [
      { code: 'en', name: t('language.en') },
      { code: 'es', name: t('language.es') },
      { code: 'pt', name: t('language.pt') }
    ];

    // Versão desktop
    if (!mobile) {
      return (
        <div className={`flex space-x-4 ${className}`}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`text-sm uppercase tracking-wider transition-colors duration-300 ${
                language === lang.code 
                  ? 'text-[#00F0FF] font-medium' 
                  : 'text-white/70 hover:text-[#00F0FF]'
              }`}
              aria-label={`Change language to ${lang.name}`}
            >
              {lang.code}
            </button>
          ))}
        </div>
      );
    }

    // Versão mobile (dropdown)
    return (
      <div className={`relative ${className}`}>
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="appearance-none bg-transparent border border-[#00F0FF]/20 rounded px-3 py-1 text-sm uppercase text-[#00F0FF] focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/30"
          aria-label="Select language"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.code.toUpperCase()}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="h-4 w-4 text-[#00F0FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in LanguageSelector:', error);
    return null;
  }
};

export default LanguageSelector;