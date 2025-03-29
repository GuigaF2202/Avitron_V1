import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'pt', name: t('language.pt') },
    { code: 'en', name: t('language.en') },
    { code: 'es', name: t('language.es') }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    setIsLanguageOpen(false);
  };

  const menuItems = [
    { label: t('header.menu.whatNext'), items: [
      { label: t('header.menu.basics'), href: '#' },
      { label: t('header.menu.tutorials'), href: '#' },
      { label: t('header.menu.create'), href: '#' },
      { label: t('header.menu.quickstart'), href: '#' },
      { label: t('header.menu.destinations'), href: '#' },
      { label: t('header.menu.worldMap'), href: '#' }
    ]},
    { label: t('header.menu.shopping'), items: [
      { label: t('header.menu.marketplace'), href: '/marketplace' },
      { label: t('header.menu.favorites'), href: '#' },
      { label: t('header.menu.purchases'), href: '#' },
      { label: t('header.menu.wishlist'), href: '#' },
      { label: t('header.menu.buyLinden'), href: '#' }
    ]},
    { label: t('header.menu.buyLand'), items: [
      { label: t('header.menu.aboutLand'), href: '#' },
      { label: t('header.menu.undevelopedLand'), href: '#' },
      { label: t('header.menu.auctions'), href: '#' },
      { label: t('header.menu.landRentals'), href: '#' },
      { label: t('header.menu.privateRegion'), href: '#' },
      { label: t('header.menu.myLindenHome'), href: '#' }
    ]},
    { label: t('header.menu.community'), items: [
      { label: t('header.menu.community'), href: '#' },
      { label: t('header.menu.search'), href: '#' },
      { label: t('header.menu.blogs'), href: '#' },
      { label: t('header.menu.forums'), href: '#' },
      { label: t('header.menu.events'), href: '#' },
      { label: t('header.menu.groups'), href: '#' },
      { label: t('header.menu.classifieds'), href: '#' }
    ]},
    { label: t('header.menu.destinations'), items: [
      { label: t('header.menu.allDestinations'), href: '#' },
      { label: t('header.menu.editorsPicks'), href: '#' },
      { label: t('header.menu.recentlyAdded'), href: '#' },
      { label: t('header.menu.popularPlaces'), href: '#' }
    ]},
    { label: t('header.menu.help'), items: [
      { label: t('header.menu.support'), href: '#' },
      { label: t('header.menu.downloads'), href: '/downloads' },
      { label: t('header.menu.systemRequirements'), href: '#' },
      { label: t('header.menu.changePassword'), href: '#' },
      { label: t('header.menu.knowledgeBase'), href: '#' },
      { label: t('header.menu.issueTracker'), href: '#' },
      { label: t('header.menu.newFeatures'), href: '#' },
      { label: t('header.menu.answers'), href: '#' },
      { label: t('header.menu.supportHistory'), href: '#' }
    ]}
  ];

  return (
    <header className="fixed w-full z-50 bg-black/10 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold cyberpunk-text tracking-wider neon-pulse">AVITRON</Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((section, index) => (
              <div key={index} className="relative group">
                <button className="text-sm text-[#00F0FF] hover:text-white transition-colors uppercase tracking-wider">
                  {section.label}
                </button>
                <div className="absolute top-full left-0 w-48 bg-black/80 backdrop-blur-md rounded-lg shadow-[0_0_10px_rgba(0,240,255,0.3)] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#00F0FF]/20">
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

          {/* Ações do usuário */}
          <div className="flex items-center space-x-6">
            {/* Language Selector */}
            <div className="flex space-x-4 border-r border-[#00F0FF]/10 pr-6">
              <button
                onClick={() => changeLanguage('pt')}
                className="text-sm uppercase tracking-wider hover:text-[#00F0FF] transition-colors duration-300"
              >
                PT
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className="text-sm uppercase tracking-wider hover:text-[#00F0FF] transition-colors duration-300"
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage('es')}
                className="text-sm uppercase tracking-wider hover:text-[#00F0FF] transition-colors duration-300"
              >
                ES
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/auth"
                className="cyberpunk-button text-sm py-1.5 px-4"
              >
                {t('auth.login.button')}
              </Link>
              <Link
                to="/auth?register=true"
                className="cyberpunk-button-pink text-sm py-1.5 px-4"
              >
                {t('auth.register.link')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 