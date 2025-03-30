import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traduções básicas embutidas
const resources = {
  en: {
    translation: {
      "language": {
        "en": "English",
        "es": "Spanish", 
        "pt": "Portuguese"
      },
      "welcome": "Welcome to AviTron",
      "explore": "Explore the metaverse and connect with people around the world",
      "worlds": "Explore Worlds",
      "worldsDesc": "Discover immersive environments created by our community",
      "avatar": "Customize Avatar",
      "avatarDesc": "Create your unique identity in the metaverse"
    }
  },
  es: {
    translation: {
      "language": {
        "en": "Inglés",
        "es": "Español",
        "pt": "Portugués"
      },
      "welcome": "Bienvenido a AviTron",
      "explore": "Explora el metaverso y conéctate con personas de todo el mundo",
      "worlds": "Explorar Mundos",
      "worldsDesc": "Descubre entornos inmersivos creados por nuestra comunidad",
      "avatar": "Personalizar Avatar",
      "avatarDesc": "Crea tu identidad única en el metaverso"
    }
  },
  pt: {
    translation: {
      "language": {
        "en": "Inglês",
        "es": "Espanhol",
        "pt": "Português"
      },
      "welcome": "Bem-vindo ao AviTron",
      "explore": "Explore o metaverso e conecte-se com pessoas de todo o mundo",
      "worlds": "Explorar Mundos",
      "worldsDesc": "Descubra ambientes imersivos criados por nossa comunidade",
      "avatar": "Personalizar Avatar",
      "avatarDesc": "Crie sua identidade única no metaverso"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;