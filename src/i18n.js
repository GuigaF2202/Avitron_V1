import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  pt: {
    translation: {
      hero: {
        title: "EXPLORE. DISCOVER. CREATE.",
        subtitle: "Seu mundo. Sua imaginação.",
        joinButton: "Entrar Gratuitamente",
        launchButton: "Lançar no navegador"
      },
      register: {
        title: "Criar conta",
        subtitle: "Junte-se ao Avitron Metaverse!",
        avatar: {
          title: "Escolha seu Avatar",
          select: "Selecionar Avatar"
        },
        account: {
          title: "Informações da Conta",
          username: "Nome de usuário",
          password: "Senha",
          email: "Email",
          birthMonth: "Mês de nascimento",
          birthDay: "Dia",
          birthYear: "Ano",
          month: "Mês",
          day: "Dia",
          year: "Ano",
          months: {
            1: "Janeiro",
            2: "Fevereiro",
            3: "Março",
            4: "Abril",
            5: "Maio",
            6: "Junho",
            7: "Julho",
            8: "Agosto",
            9: "Setembro",
            10: "Outubro",
            11: "Novembro",
            12: "Dezembro"
          }
        },
        security: {
          question: "Pergunta de segurança",
          select: "Selecione uma pergunta",
          answer: "Resposta",
          questions: {
            0: "Em qual cidade você nasceu?",
            1: "Qual é o nome de solteira da sua mãe?",
            2: "Em qual rua você cresceu?",
            3: "Qual é o título do seu livro favorito?",
            4: "Qual é seu local de férias favorito?",
            5: "Qual é o nome do seu animal de estimação?"
          }
        },
        consent: {
          news: "Gostaria de receber notícias e ofertas especiais",
          terms: "Eu concordo com os Termos de Serviço"
        },
        submit: "Criar conta"
      },
      footer: {
        company: {
          title: "Empresa",
          links: {
            mobileBeta: "Versão Mobile",
            download: "Download",
            marketplace: "Mercado",
            enterprise: "Empresas/Educação",
            premium: "Premium",
            destinations: "Destinos",
            blog: "Blog",
            community: "Comunidade",
            support: "Suporte"
          }
        },
        partnerships: {
          title: "Parcerias",
          links: {
            business: "Desenvolvimento de Negócios",
            affiliate: "Programa de Afiliados"
          }
        },
        legal: {
          title: "Legal",
          links: {
            terms: "Termos de Serviço",
            privacy: "Política de Privacidade",
            customer: "Atendimento ao Cliente",
            licenses: "Licenças"
          }
        },
        about: {
          title: "Sobre",
          links: {
            contact: "Contato",
            about: "Sobre Nós",
            jobs: "Carreiras",
            press: "Imprensa"
          }
        },
        copyright: "© 2025 Avitron Metaverse. Todos os direitos reservados.",
        bottomLinks: {
          terms: "Termos e Condições",
          privacy: "Política de Privacidade",
          cookies: "Cookies"
        }
      },
      marketplace: {
        title: "Mercado Avitron",
        cart: "Carrinho",
        account: "Minha Conta",
        search: {
          placeholder: "Buscar produtos...",
          button: "Buscar"
        },
        categories: {
          title: "Categorias",
          all: "Todos",
          avatar: "Avatares",
          clothing: "Roupas",
          accessories: "Acessórios",
          homes: "Casas",
          furniture: "Móveis",
          land: "Terrenos",
          vehicles: "Veículos"
        },
        products: {
          avatar1: "Avatar Premium Masculino",
          clothing1: "Terno Executivo",
          home1: "Mansão Moderna"
        },
        image: {
          placeholder: "Imagem não disponível"
        },
        reviews: "avaliações"
      },
      downloads: {
        title: "Firestorm Viewer",
        subtitle: "Baixe o Firestorm Viewer para começar sua jornada no Avitron Metaverse",
        versions: {
          title: "Versões disponíveis para",
          size: "Tamanho",
          download: "Baixar"
        },
        systemRequirements: {
          title: "Requisitos do Sistema",
          minimum: "Mínimo",
          recommended: "Recomendado",
          processor: "Processador",
          ram: "Memória RAM",
          graphics: "Placa de vídeo",
          internet: "Conexão de internet"
        }
      },
      news: {
        title: "Notícias",
        subtitle: "Fique por dentro das últimas novidades",
        categories: {
          all: "Todos",
          featured: "Destaque",
          updates: "Atualizações",
          events: "Eventos",
          community: "Comunidade"
        },
        items: {
          featured1: {
            title: "Novo Sistema de Avatares Personalizados",
            excerpt: "Apresentamos nosso novo sistema de personalização de avatares com mais opções e melhor qualidade visual."
          },
          update1: {
            title: "Atualização de Performance",
            excerpt: "Melhorias significativas na performance do servidor e otimização de recursos."
          },
          event1: {
            title: "Festival de Inverno 2024",
            excerpt: "Participe do nosso primeiro festival de inverno com atividades especiais e recompensas exclusivas."
          }
        },
        image: {
          placeholder: "Imagem não disponível"
        },
        readMore: "Ver mais"
      },
      header: {
        signIn: "Entrar",
        joinFree: "Junte-se Gratuitamente",
        search: {
          placeholder: "Buscar no Avitron...",
          button: "Buscar"
        },
        menu: {
          whatNext: "O que Próximo?",
          basics: "Básicos",
          tutorials: "Tutoriais",
          create: "Criar",
          quickstart: "Início Rápido",
          destinations: "Destinos",
          worldMap: "Mapa do Mundo",
          shopping: "Compras",
          marketplace: "Mercado",
          favorites: "Favoritos",
          purchases: "Compras",
          wishlist: "Lista de Desejos",
          buyLinden: "Comprar Linden",
          buyLand: "Comprar Terreno",
          aboutLand: "Sobre Terreno",
          undevelopedLand: "Terreno Não Desenvolvido",
          auctions: "Leilões",
          landRentals: "Aluguéis de Terreno",
          privateRegion: "Região Privada",
          myLindenHome: "Minha Casa Linden",
          community: "Comunidade",
          search: "Buscar",
          blogs: "Blogs",
          forums: "Fóruns",
          events: "Eventos",
          groups: "Grupos",
          classifieds: "Classificados",
          destinations: "Destinos",
          allDestinations: "Todos os Destinos",
          editorsPicks: "Escolhas do Editor",
          recentlyAdded: "Adicionados Recentemente",
          popularPlaces: "Lugares Populares",
          help: "Ajuda",
          support: "Suporte",
          downloads: "Downloads",
          systemRequirements: "Requisitos do Sistema",
          changePassword: "Alterar Senha",
          knowledgeBase: "Base de Conhecimento",
          issueTracker: "Rastreador de Problemas",
          newFeatures: "Novas Funcionalidades",
          answers: "Respostas",
          supportHistory: "Histórico de Suporte"
        }
      },
      language: {
        pt: "Português",
        en: "English",
        es: "Español",
        fr: "Français"
      },
      auth: {
        login: {
          title: "Entrar",
          subtitle: "Bem-vindo de volta",
          button: "Login"
        },
        email: "Email",
        password: "Senha",
        forgotPassword: "Problemas com a senha",
        backToLogin: "Voltar",
        register: {
          link: "Registra-se"
        }
      }
    }
  },
  en: {
    translation: {
      hero: {
        title: "EXPLORE. DISCOVER. CREATE.",
        subtitle: "Your world. Your imagination.",
        joinButton: "Join Free",
        launchButton: "Launch in browser"
      },
      register: {
        title: "Create account",
        subtitle: "Join Avitron Metaverse!",
        avatar: {
          title: "Choose your Avatar",
          select: "Select Avatar"
        },
        account: {
          title: "Account Information",
          username: "Username",
          password: "Password",
          email: "Email",
          birthMonth: "Birth month",
          birthDay: "Day",
          birthYear: "Year",
          month: "Month",
          day: "Day",
          year: "Year",
          months: {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
          }
        },
        security: {
          question: "Security question",
          select: "Select a question",
          answer: "Answer",
          questions: {
            0: "What city were you born in?",
            1: "What is your mother's maiden name?",
            2: "What street did you grow up on?",
            3: "What is the title of your favorite book?",
            4: "What is your favorite vacation spot?",
            5: "What is your pet's name?"
          }
        },
        consent: {
          news: "I would like to receive news and special offers",
          terms: "I agree to the Terms of Service"
        },
        submit: "Create account"
      },
      footer: {
        company: {
          title: "Company",
          links: {
            mobileBeta: "Mobile Version",
            download: "Download",
            marketplace: "Marketplace",
            enterprise: "Enterprise/Education",
            premium: "Premium",
            destinations: "Destinations",
            blog: "Blog",
            community: "Community",
            support: "Support"
          }
        },
        partnerships: {
          title: "Partnerships",
          links: {
            business: "Business Development",
            affiliate: "Affiliate Program"
          }
        },
        legal: {
          title: "Legal",
          links: {
            terms: "Terms of Service",
            privacy: "Privacy Policy",
            customer: "Customer Service",
            licenses: "Licenses"
          }
        },
        about: {
          title: "About",
          links: {
            contact: "Contact",
            about: "About Us",
            jobs: "Careers",
            press: "Press"
          }
        },
        copyright: "© 2025 Avitron Metaverse. All rights reserved.",
        bottomLinks: {
          terms: "Terms and Conditions",
          privacy: "Privacy Policy",
          cookies: "Cookies"
        }
      },
      marketplace: {
        title: "Avitron Marketplace",
        cart: "Cart",
        account: "My Account",
        search: {
          placeholder: "Search products...",
          button: "Search"
        },
        categories: {
          title: "Categories",
          all: "All",
          avatar: "Avatars",
          clothing: "Clothing",
          accessories: "Accessories",
          homes: "Homes",
          furniture: "Furniture",
          land: "Land",
          vehicles: "Vehicles"
        },
        products: {
          avatar1: "Premium Male Avatar",
          clothing1: "Executive Suit",
          home1: "Modern Mansion"
        },
        image: {
          placeholder: "Image not available"
        },
        reviews: "reviews"
      },
      downloads: {
        title: "Firestorm Viewer",
        subtitle: "Download Firestorm Viewer to begin your journey in Avitron Metaverse",
        versions: {
          title: "Available versions for",
          size: "Size",
          download: "Download"
        },
        systemRequirements: {
          title: "System Requirements",
          minimum: "Minimum",
          recommended: "Recommended",
          processor: "Processor",
          ram: "RAM",
          graphics: "Graphics Card",
          internet: "Internet Connection"
        }
      },
      news: {
        title: "News",
        subtitle: "Stay up to date with the latest news",
        categories: {
          all: "All",
          featured: "Featured",
          updates: "Updates",
          events: "Events",
          community: "Community"
        },
        items: {
          featured1: {
            title: "New Custom Avatar System",
            excerpt: "Introducing our new avatar customization system with more options and better visual quality."
          },
          update1: {
            title: "Performance Update",
            excerpt: "Significant improvements in server performance and resource optimization."
          },
          event1: {
            title: "Winter Festival 2024",
            excerpt: "Join our first winter festival with special activities and exclusive rewards."
          }
        },
        image: {
          placeholder: "Image not available"
        },
        readMore: "View more"
      },
      header: {
        signIn: "Sign in",
        joinFree: "Join free now",
        search: {
          placeholder: "Search in Avitron...",
          button: "Search"
        },
        menu: {
          whatNext: "What Next?",
          basics: "Basics",
          tutorials: "Tutorials",
          create: "Create",
          quickstart: "Quickstart",
          destinations: "Destinations",
          worldMap: "World Map",
          shopping: "Shopping",
          marketplace: "Marketplace",
          favorites: "Favorites",
          purchases: "Purchases",
          wishlist: "Wishlist",
          buyLinden: "Buy Linden",
          buyLand: "Buy Land",
          aboutLand: "About Land",
          undevelopedLand: "Undeveloped Land",
          auctions: "Auctions",
          landRentals: "Land Rentals",
          privateRegion: "Private Region",
          myLindenHome: "My Linden Home",
          community: "Community",
          search: "Search",
          blogs: "Blogs",
          forums: "Forums",
          events: "Events",
          groups: "Groups",
          classifieds: "Classifieds",
          destinations: "Destinations",
          allDestinations: "All Destinations",
          editorsPicks: "Editor's Picks",
          recentlyAdded: "Recently Added",
          popularPlaces: "Popular Places",
          help: "Help",
          support: "Support",
          downloads: "Downloads",
          systemRequirements: "System Requirements",
          changePassword: "Change Password",
          knowledgeBase: "Knowledge Base",
          issueTracker: "Issue Tracker",
          newFeatures: "New Features",
          answers: "Answers",
          supportHistory: "Support History"
        }
      },
      language: {
        pt: "Português",
        en: "English",
        es: "Español",
        fr: "Français"
      },
      auth: {
        login: {
          title: "Sign in",
          subtitle: "Welcome back",
          button: "Login"
        },
        email: "Email",
        password: "Password",
        forgotPassword: "Password issues",
        backToLogin: "Back",
        register: {
          link: "Register"
        }
      }
    }
  },
  es: {
    translation: {
      hero: {
        title: "EXPLORA. DESCUBRE. CREA.",
        subtitle: "Tu mundo. Tu imaginación.",
        joinButton: "Únete Gratis",
        launchButton: "Lanzar en navegador"
      },
      register: {
        title: "Crear cuenta",
        subtitle: "¡Únete a Avitron Metaverse!",
        avatar: {
          title: "Elige tu Avatar",
          select: "Seleccionar Avatar"
        },
        account: {
          title: "Información de la cuenta",
          username: "Nombre de usuario",
          password: "Contraseña",
          email: "Email",
          birthMonth: "Mes de nacimiento",
          birthDay: "Día",
          birthYear: "Año",
          month: "Mes",
          day: "Día",
          year: "Año",
          months: {
            1: "Enero",
            2: "Febrero",
            3: "Marzo",
            4: "Abril",
            5: "Mayo",
            6: "Junio",
            7: "Julio",
            8: "Agosto",
            9: "Septiembre",
            10: "Octubre",
            11: "Noviembre",
            12: "Diciembre"
          }
        },
        security: {
          question: "Pregunta de seguridad",
          select: "Selecciona una pregunta",
          answer: "Respuesta",
          questions: {
            0: "¿En qué ciudad naciste?",
            1: "¿Cuál es el apellido de soltera de tu madre?",
            2: "¿En qué calle creciste?",
            3: "¿Cuál es el título de tu libro favorito?",
            4: "¿Cuál es tu lugar de vacaciones favorito?",
            5: "¿Cuál es el nombre de tu mascota?"
          }
        },
        consent: {
          news: "Me gustaría recibir noticias y ofertas especiales",
          terms: "Acepto los Términos de Servicio"
        },
        submit: "Crear cuenta"
      },
      footer: {
        company: {
          title: "Empresa",
          links: {
            mobileBeta: "Versión Móvil",
            download: "Descargar",
            marketplace: "Mercado",
            enterprise: "Empresas/Educación",
            premium: "Premium",
            destinations: "Destinos",
            blog: "Blog",
            community: "Comunidad",
            support: "Soporte"
          }
        },
        partnerships: {
          title: "Alianzas",
          links: {
            business: "Desarrollo de Negocios",
            affiliate: "Programa de Afiliados"
          }
        },
        legal: {
          title: "Legal",
          links: {
            terms: "Términos de Servicio",
            privacy: "Política de Privacidad",
            customer: "Servicio al Cliente",
            licenses: "Licencias"
          }
        },
        about: {
          title: "Sobre Nosotros",
          links: {
            contact: "Contacto",
            about: "Sobre Nosotros",
            jobs: "Empleos",
            press: "Prensa"
          }
        },
        copyright: "© 2025 Avitron Metaverse. Todos los derechos reservados.",
        bottomLinks: {
          terms: "Términos y Condiciones",
          privacy: "Política de Privacidad",
          cookies: "Cookies"
        }
      },
      marketplace: {
        title: "Mercado Avitron",
        cart: "Carrito",
        account: "Mi Cuenta",
        search: {
          placeholder: "Buscar productos...",
          button: "Buscar"
        },
        categories: {
          title: "Categorías",
          all: "Todos",
          avatar: "Avatares",
          clothing: "Ropa",
          accessories: "Accesorios",
          homes: "Casas",
          furniture: "Muebles",
          land: "Terrenos",
          vehicles: "Vehículos"
        },
        products: {
          avatar1: "Avatar Premium Masculino",
          clothing1: "Traje Ejecutivo",
          home1: "Mansión Moderna"
        },
        image: {
          placeholder: "Imagen no disponible"
        },
        reviews: "reseñas"
      },
      downloads: {
        title: "Firestorm Viewer",
        subtitle: "Descarga Firestorm Viewer para comenzar tu viaje en Avitron Metaverse",
        versions: {
          title: "Versiones disponibles para",
          size: "Tamaño",
          download: "Descargar"
        },
        systemRequirements: {
          title: "Requisitos del Sistema",
          minimum: "Mínimo",
          recommended: "Recomendado",
          processor: "Procesador",
          ram: "Memoria RAM",
          graphics: "Tarjeta gráfica",
          internet: "Conexión a internet"
        }
      },
      news: {
        title: "Noticias",
        subtitle: "Mantente al día con las últimas novedades",
        categories: {
          all: "Todos",
          featured: "Destacados",
          updates: "Actualizaciones",
          events: "Eventos",
          community: "Comunidad"
        },
        items: {
          featured1: {
            title: "Nuevo Sistema de Avatares Personalizados",
            excerpt: "Presentamos nuestro nuevo sistema de personalización de avatares con más opciones y mejor calidad visual."
          },
          update1: {
            title: "Actualización de Rendimiento",
            excerpt: "Mejoras significativas en el rendimiento del servidor y optimización de recursos."
          },
          event1: {
            title: "Festival de Invierno 2024",
            excerpt: "Únete a nuestro primer festival de invierno con actividades especiales y recompensas exclusivas."
          }
        },
        image: {
          placeholder: "Imagen no disponible"
        },
        readMore: "Ver más"
      },
      header: {
        signIn: "Iniciar sesión",
        joinFree: "Únete gratis",
        search: {
          placeholder: "Buscar en Avitron...",
          button: "Buscar"
        },
        menu: {
          whatNext: "¿Qué sigue?",
          basics: "Básicos",
          tutorials: "Tutoriales",
          create: "Crear",
          quickstart: "Inicio Rápido",
          destinations: "Destinos",
          worldMap: "Mapa del Mundo",
          shopping: "Compras",
          marketplace: "Mercado",
          favorites: "Favoritos",
          purchases: "Compras",
          wishlist: "Lista de Deseos",
          buyLinden: "Comprar Linden",
          buyLand: "Comprar Terreno",
          aboutLand: "Sobre Terrenos",
          undevelopedLand: "Terreno sin Desarrollar",
          auctions: "Subastas",
          landRentals: "Alquiler de Terrenos",
          privateRegion: "Región Privada",
          myLindenHome: "Mi Casa Linden",
          community: "Comunidad",
          search: "Buscar",
          blogs: "Blogs",
          forums: "Foros",
          events: "Eventos",
          groups: "Grupos",
          classifieds: "Clasificados",
          destinations: "Destinos",
          allDestinations: "Todos los Destinos",
          editorsPicks: "Selección del Editor",
          recentlyAdded: "Recién Añadidos",
          popularPlaces: "Lugares Populares",
          help: "Ayuda",
          support: "Soporte",
          downloads: "Descargas",
          systemRequirements: "Requisitos del Sistema",
          changePassword: "Cambiar Contraseña",
          knowledgeBase: "Base de Conocimientos",
          issueTracker: "Seguimiento de Problemas",
          newFeatures: "Nuevas Funciones",
          answers: "Respuestas",
          supportHistory: "Historial de Soporte"
        }
      },
      language: {
        pt: "Português",
        en: "English",
        es: "Español"
      },
      auth: {
        login: {
          title: "Iniciar sesión",
          subtitle: "Bienvenido de nuevo",
          button: "Entrar"
        },
        email: "Email",
        password: "Contraseña",
        forgotPassword: "Problemas con la contraseña",
        backToLogin: "Volver",
        register: {
          link: "Regístrate"
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    supportedLngs: ['pt', 'en', 'es'],
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 