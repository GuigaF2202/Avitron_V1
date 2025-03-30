// src/contexts/LanguageContext.js - VERSÃO CORRIGIDA
import React, { createContext, useState, useContext, useEffect } from 'react';
import i18n from '../i18n';

// Valor padrão SEGURO para o contexto
const defaultValue = {
  language: 'en',
  changeLanguage: () => {},
  setLanguage: () => {}
};

// Criando o contexto com o valor padrão
const LanguageContext = createContext(defaultValue);

export const LanguageProvider = ({ children }) => {
  // Usar estado com função de inicialização para garantir um valor padrão
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('i18nextLng') || i18n.language || 'en';
    } catch (e) {
      console.error('Error getting language:', e);
      return 'en';
    }
  });

  // Função segura de mudança de idioma
  const changeLanguage = (lang) => {
    try {
      if (lang && typeof lang === 'string') {
        i18n.changeLanguage(lang);
        setLanguage(lang);
        try {
          localStorage.setItem('i18nextLng', lang);
        } catch (e) {
          console.error('Could not save language to localStorage:', e);
        }
      }
    } catch (e) {
      console.error('Error changing language:', e);
    }
  };

  // Efeito para atualizar o atributo lang do documento
  useEffect(() => {
    try {
      document.documentElement.lang = language || 'en';
      i18n.changeLanguage(language || 'en');
    } catch (e) {
      console.error('Error in language effect:', e);
    }
  }, [language]);

  // Valor do contexto sempre com fallbacks
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
  try {
    const context = useContext(LanguageContext);
    // Sempre retorne um objeto válido, mesmo se o contexto for null ou undefined
    return context || defaultValue;
  } catch (e) {
    console.error('Error in useLanguage hook:', e);
    return defaultValue;
  }
};