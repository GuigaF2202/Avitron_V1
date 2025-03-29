import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Avatar from '../components/Avatar';
import Chat from '../components/Chat';
import Map from '../components/Map';
import CookieBanner from '../components/CookieBanner';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Register from '../components/Register';
import Marketplace from '../components/Marketplace';
import Downloads from '../components/Downloads';
import News from '../components/News';
import Header from '../components/Header';
import Auth from '../components/Auth';
import Dashboard from '../components/Dashboard';
import ResetPassword from '../components/ResetPassword'; // Importe o componente ResetPassword
import { LanguageProvider } from '../contexts/LanguageContext';

const App = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black">
        <Header />
        <main className="pt-[72px]">
          <CookieBanner />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/avatar" element={<Avatar />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/map" element={<Map />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/news" element={<News />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reset-password" element={<ResetPassword />} /> {/* Adicione a rota para redefinição de senha */}
          </Routes>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;