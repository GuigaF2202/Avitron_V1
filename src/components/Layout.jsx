import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import ScrollSections from '../components/ScrollSections';
import Avatar from '../components/Avatar';
import Auth from '../components/Auth';
import LanguageProvider from '../i18n'; 
import '../index.css'; 
import HomeLayout from './HomeLayout';
// ... outras importações

// Componente de layout para a página inicial
const HomeLayout = () => {
  return (
    <>
      <Header />
      <main className="pt-[72px]">
        <CookieBanner />
        <ScrollSections />
      </main>
      <Footer />
    </>
  );
};

// Componente de layout para outras páginas
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
          {/* Rota para a página inicial com ScrollSections */}
          <Route path="/" element={<HomeLayout />} />
          
          {/* Outras rotas usando o layout padrão */}
          <Route element={<DefaultLayout />}>
            <Route path="/auth" element={<Auth />} />
            <Route path="/avatar" element={<Avatar />} />
            {/* ... outras rotas */}
          </Route>
        </Routes>
      </div>
    </LanguageProvider>
  );
};