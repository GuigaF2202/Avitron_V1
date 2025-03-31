// src/containers/App.jsx (corrigido para evitar scrollbars duplos)
import React from 'react';
import { Outlet } from 'react-router-dom';
import { LanguageProvider } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import '../index.css';
import { useTranslation, Trans } from 'react-i18next';


function App() {
  const { t } = useTranslation();

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-black text-white overflow-x-hidden">
        <Header />
        <main className="flex-grow pt-16 relative">
          <CookieBanner />
          <Outlet />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;