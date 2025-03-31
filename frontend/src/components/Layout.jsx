import React from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import ScrollSections from '../components/ScrollSections';
import Avatar from '../components/Avatar';
import Auth from '../components/Auth';
import LanguageProvider from '../contexts/LanguageContext';
import  '../i18n';

import '../index.css';
import HomePage from './HomePage';

// Home layout component
const HomeLayout = () => {
  return (
    <>
      <Header />
      <main className="pt-[72px]">
        <CookieBanner />
        <HomePage />
      </main>
      <Footer />
    </>
  );
};

// Default layout for other pages
function DefaultLayout() {
  return (
    <>
      <Header />
      <main className="pt-[72px]">
        <CookieBanner />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

const App = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black">
        <Routes>
          {/* Home route with ScrollSections */}
          <Route path="/" element={<HomeLayout />} />
          
          {/* Other routes using default layout */}
          <Route element={<DefaultLayout />}>
            <Route path="/auth" element={<Auth />} />
            <Route path="/avatar" element={<Avatar />} />
            {/* Other routes */}
          </Route>
        </Routes>
      </div>
    </LanguageProvider>
  );
};

export default App;