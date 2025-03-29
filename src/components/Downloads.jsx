import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Downloads = () => {
  const { t } = useTranslation();
  const [selectedOS, setSelectedOS] = useState('windows');

  const operatingSystems = {
    windows: {
      name: 'Windows',
      icon: '🪟',
      versions: [
        { name: 'Windows 10/11 64-bit', size: '64.5 MB' },
        { name: 'Windows 10/11 32-bit', size: '64.5 MB' }
      ]
    },
    macos: {
      name: 'macOS',
      icon: '🍎',
      versions: [
        { name: 'macOS 10.15+ (Catalina)', size: '64.5 MB' },
        { name: 'macOS 11+ (Big Sur)', size: '64.5 MB' }
      ]
    },
    linux: {
      name: 'Linux',
      icon: '🐧',
      versions: [
        { name: 'Ubuntu 20.04+', size: '64.5 MB' },
        { name: 'Fedora 34+', size: '64.5 MB' }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('downloads.title')}</h1>
          <p className="text-xl text-gray-300">{t('downloads.subtitle')}</p>
        </div>

        {/* Seleção de Sistema Operacional */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {Object.entries(operatingSystems).map(([key, os]) => (
            <button
              key={key}
              onClick={() => setSelectedOS(key)}
              className={`p-4 rounded-lg transition-all ${
                selectedOS === key
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              <div className="text-4xl mb-2">{os.icon}</div>
              <div className="font-semibold">{os.name}</div>
            </button>
          ))}
        </div>

        {/* Versões disponíveis */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {t('downloads.versions.title')} {operatingSystems[selectedOS].name}
          </h2>
          <div className="space-y-4">
            {operatingSystems[selectedOS].versions.map((version, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <div>
                  <h3 className="font-semibold">{version.name}</h3>
                  <p className="text-sm text-gray-400">{t('downloads.versions.size')}: {version.size}</p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors">
                  {t('downloads.versions.download')}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Requisitos do Sistema */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">{t('downloads.systemRequirements.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">{t('downloads.systemRequirements.minimum')}</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• {t('downloads.systemRequirements.processor')}: Intel Core i3 ou AMD equivalente</li>
                <li>• {t('downloads.systemRequirements.ram')}: 4GB</li>
                <li>• {t('downloads.systemRequirements.graphics')}: NVIDIA GeForce GTX 660 ou AMD equivalente</li>
                <li>• {t('downloads.systemRequirements.internet')}: 1 Mbps</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('downloads.systemRequirements.recommended')}</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• {t('downloads.systemRequirements.processor')}: Intel Core i5 ou AMD equivalente</li>
                <li>• {t('downloads.systemRequirements.ram')}: 8GB</li>
                <li>• {t('downloads.systemRequirements.graphics')}: NVIDIA GeForce GTX 1060 ou AMD equivalente</li>
                <li>• {t('downloads.systemRequirements.internet')}: 5 Mbps</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads; 