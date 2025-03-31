import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LanguageProvider } from '../contexts/LanguageContext';

const App = () => {
  const { t } = useTranslation();
  
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Header />
        <main className="flex-grow pt-16" aria-label={t('app.mainContent', 'Main content')}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;