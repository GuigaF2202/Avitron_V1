import React, { useState, useEffect } from 'react';

function CookieBanner() {
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
          Este site utiliza cookies para melhorar a sua experiência. 
          Ao continuar a navegar, você concorda com a nossa política de cookies.
        </p>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors duration-200"
          onClick={handleCookieAccept}
        >
          Aceitar cookies
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;
