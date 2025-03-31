import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

// Safe default value for context
const defaultValue = {
  language: 'en',
  changeLanguage: () => {},
  setLanguage: () => {}
};

// Creating context with default value
const LanguageContext = createContext(defaultValue);

export const LanguageProvider = ({ children }) => {
  const { t } = useTranslation();
  
  // Use state with initialization function to ensure a default value
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('i18nextLng') || i18n.language || 'en';
    } catch (e) {
      console.error(t('language.errors.getting', 'Error getting language:'), e);
      return 'en';
    }
  });

  // Safe language change function
  const changeLanguage = (lang) => {
    try {
      if (lang && typeof lang === 'string') {
        i18n.changeLanguage(lang);
        setLanguage(lang);
        try {
          localStorage.setItem('i18nextLng', lang);
        } catch (e) {
          console.error(t('language.errors.saving', 'Could not save language to localStorage:'), e);
        }
      }
    } catch (e) {
      console.error(t('language.errors.changing', 'Error changing language:'), e);
    }
  };

  // Effect to update document's lang attribute
  useEffect(() => {
    try {
      document.documentElement.lang = language || 'en';
      i18n.changeLanguage(language || 'en');
    } catch (e) {
      console.error(t('language.errors.effect', 'Error in language effect:'), e);
    }
  }, [language, t]);

  // Context value always with fallbacks
  const value = {
    language: language || defaultValue.language,
    setLanguage: setLanguage || defaultValue.setLanguage,
    changeLanguage: changeLanguage || defaultValue.changeLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const { t } = useTranslation();
  
  try {
    const context = useContext(LanguageContext);
    // Always return a valid object, even if context is null or undefined
    return context || defaultValue;
  } catch (e) {
    console.error(t('language.errors.hook', 'Error in useLanguage hook:'), e);
    return defaultValue;
  }
};