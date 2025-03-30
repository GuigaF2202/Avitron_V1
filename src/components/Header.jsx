import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileSection = (index) => {
    if (activeMobileSection === index) {
      setActiveMobileSection(null);
    } else {
      setActiveMobileSection(index);
    }
  };

  const menuItems = [
    { label: "What Next", items: [
      { label: "Basics", href: '#' },
      { label: "Tutorials", href: '#' },
      { label: "Create", href: '#' }
    ]},
    { label: "Shopping", items: [
      { label: "Marketplace", href: '/marketplace' },
      { label: "Favorites", href: '#' },
      { label: "Purchases", href: '#' }
    ]},
    { label: "Community", items: [
      { label: "Search", href: '#' },
      { label: "Blogs", href: '#' },
      { label: "Forums", href: '#' }
    ]}
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled || mobileMenuOpen ? 'bg-black/90 backdrop-blur-md' : 'bg-black/10 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="images/logo.png" 
                alt="AviTron Logo" 
                className="h-10 w-10 mr-2"
              />
              <span className="text-xl md:text-2xl font-bold cyberpunk-text tracking-wider neon-pulse">AviTron</span>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex space-x-6">
            {menuItems.map((section, index) => (
              <div key={index} className="relative group">
                <button className="text-sm text-[#00F0FF] hover:text-white transition-colors uppercase tracking-wider px-2 py-1">
                  {section.label}
                </button>
                <div className="absolute top-full left-0 w-48 bg-black/90 backdrop-blur-md rounded-lg shadow-[0_0_10px_rgba(0,240,255,0.3)] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#00F0FF]/20">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.href}
                      className="block px-4 py-2 text-sm text-[#00F0FF] hover:text-white hover:bg-[#00F0FF]/10 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/auth"
              className="cyberpunk-button text-sm py-1.5 px-4"
            >
              Sign In
            </Link>
            <Link
              to="/auth?register=true"
              className="cyberpunk-button-pink text-sm py-1.5 px-4"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button 
              className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className={`block w-6 h-0.5 bg-[#00F0FF] transition-transform duration-300 ${mobileMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-[#00F0FF] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-[#00F0FF] transition-transform duration-300 ${mobileMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-black/90 backdrop-blur-lg ${
        mobileMenuOpen ? 'max-h-screen' : 'max-h-0'
      }`}>
        <div className="container mx-auto px-4 py-4">
          {/* Menu sections */}
          <div className="space-y-2">
            {menuItems.map((section, index) => (
              <div key={index}>
                <button
                  className="flex w-full justify-between items-center py-2 text-[#00F0FF] text-sm uppercase tracking-wider"
                  onClick={() => toggleMobileSection(index)}
                >
                  <span>{section.label}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-300 ${activeMobileSection === index ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Submenu items */}
                <div className={`overflow-hidden transition-all duration-300 pl-4 ${
                  activeMobileSection === index ? 'max-h-96 py-2' : 'max-h-0'
                }`}>
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.href}
                      className="block py-2 text-sm text-white/80 hover:text-[#00F0FF]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col space-y-3 mt-6 pt-6 border-t border-[#00F0FF]/10">
            <Link
              to="/auth"
              className="cyberpunk-button w-full py-2 px-4 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/auth?register=true"
              className="cyberpunk-button-pink w-full py-2 px-4 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;