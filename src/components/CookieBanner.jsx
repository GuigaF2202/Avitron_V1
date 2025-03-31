import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function CookieBanner() {
  const { t } = useTranslation();
  const [cookieAccepted, setCookieAccepted] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookieAccepted');
    if (accepted) {
      setCookieAccepted(true);
    }
  }, []);

  const handleCookieAccept = () => {
    setCookieAccepted(true);
    localStorage.setItem('cookieAccepted', 'true');
  };

  if (cookieAccepted) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center z-50">
      <div className="container mx-auto max-w-4xl">
        <p className="mb-4">
          {t('cookies.message')}
        </p>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors duration-200"
          onClick={handleCookieAccept}
        >
          {t('cookies.accept')}
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;