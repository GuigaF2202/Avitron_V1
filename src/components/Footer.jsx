import React, { useState } from 'react';
import { 
  FaFacebook, 
  FaInstagram 
} from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envio de newsletter
    console.log('Email enviado:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-950 text-gray-300 py-10">      
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo e Nome */}
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <img 
            src="./images/logo.png" 
            alt="Avitron Metaverso Logo" 
            className="h-10"
          />
          <a 
            className="text-2xl font-bold cyberpunk-text tracking-wider neon-pulse" 
            href="/"
            style={{
              background: 'linear-gradient(to right, #00F0FF, #00A4FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 10px rgba(0, 240, 255, 0.5)'
            }}
          >
            AVITRON
          </a>
        </div>
        
        {/* Newsletter */}
        <div className="w-full max-w-md mx-auto mb-4 md:mb-0">
          <form onSubmit={handleSubmit} className="flex">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Newsletter" 
              required
              className="flex-grow px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-l-lg focus:outline-none focus:border-[#00F0FF]"
            />
            <button 
              type="submit" 
              className="px-4 py-2 bg-[#00F0FF] text-gray-950 font-semibold rounded-r-lg hover:bg-[#00A4FF] transition-colors"
            >
              Assinar
            </button>
          </form>
        </div>
        
        {/* Social Icons and Copyright */}
        <div className="flex items-center space-x-4">
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#00F0FF] transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#00F0FF] transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-sm">
            © {new Date().getFullYear()} Avitron Multiverso
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;