import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Ícones (você pode substituir por uma biblioteca como react-icons ou heroicons)
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const InventoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
  </svg>
);

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
  </svg>
);

const EventsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);

const FriendsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
  </svg>
);

const MarketplaceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);

// Componentes de Avatar
const MaleAvatar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-16 h-16">
    <circle cx="50" cy="36" r="24" fill="#4F46E5" />
    <circle cx="50" cy="30" r="18" fill="#818CF8" />
    <path d="M50 55 C25 55 20 75 20 95 L80 95 C80 75 75 55 50 55" fill="#4F46E5" />
    <circle cx="41" cy="28" r="3" fill="#1E1B4B" />
    <circle cx="59" cy="28" r="3" fill="#1E1B4B" />
    <path d="M43 38 C46 42 54 42 57 38" stroke="#1E1B4B" strokeWidth="2" fill="none" />
  </svg>
);

const FemaleAvatar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-16 h-16">
    <circle cx="50" cy="36" r="24" fill="#DB2777" />
    <circle cx="50" cy="30" r="18" fill="#F472B6" />
    <path d="M25 95 L40 65 C40 65 45 55 50 55 C55 55 60 65 60 65 L75 95 Z" fill="#DB2777" />
    <circle cx="41" cy="28" r="3" fill="#831843" />
    <circle cx="59" cy="28" r="3" fill="#831843" />
    <path d="M43 38 C46 42 54 42 57 38" stroke="#831843" strokeWidth="2" fill="none" />
  </svg>
);

const NeutralAvatar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-16 h-16">
    <circle cx="50" cy="36" r="24" fill="#10B981" />
    <circle cx="50" cy="30" r="18" fill="#34D399" />
    <path d="M30 95 L33 60 C33 60 40 55 50 55 C60 55 67 60 67 60 L70 95 Z" fill="#10B981" />
    <circle cx="41" cy="28" r="3" fill="#065F46" />
    <circle cx="59" cy="28" r="3" fill="#065F46" />
    <path d="M43 38 C46 42 54 42 57 38" stroke="#065F46" strokeWidth="2" fill="none" />
  </svg>
);

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [user, setUser] = useState(null);
  const [recentLocations, setRecentLocations] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para formulário de alteração de senha
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordUpdateLoading, setPasswordUpdateLoading] = useState(false);
  const [passwordUpdateError, setPasswordUpdateError] = useState('');
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState('');

  // Estados para formulário de alteração de e-mail
  const [newEmail, setNewEmail] = useState('');
  const [emailUpdatePassword, setEmailUpdatePassword] = useState('');
  const [emailUpdateLoading, setEmailUpdateLoading] = useState(false);
  const [emailUpdateError, setEmailUpdateError] = useState('');
  const [emailUpdateSuccess, setEmailUpdateSuccess] = useState('');

  // API URL - Usar caminho relativo para funcionar em produção
  const API_URL = '/api';

  // Buscar dados do usuário
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Verificar se há dados do usuário no localStorage
        const userData = localStorage.getItem('user');
        
        if (!userData) {
          navigate('/auth');
          return;
        }
        
        // Usar os dados já salvos no localStorage
        setUser(JSON.parse(userData));
        
        // Carregar outros dados (você pode manter o setTimeout para simular)
        setTimeout(() => {
          // Defina dados de exemplo para os outros estados
          setRecentLocations([
            { id: 1, name: 'Neo Tokyo Plaza', visitors: 124, coordinates: '128, 128, 30' },
            { id: 2, name: 'Cyber Gardens', visitors: 87, coordinates: '200, 45, 20' },
            { id: 3, name: 'Quantum Beach', visitors: 203, coordinates: '85, 230, 10' }
          ]);
          
          setUpcomingEvents([
            { id: 1, name: 'Virtual Concert: Neon Pulse', time: '2023-03-29T20:00:00Z', location: 'Harmony Stadium' },
            { id: 2, name: 'Tech Talk: Future of Metaverse', time: '2023-03-30T18:30:00Z', location: 'Innovation Hub' },
            { id: 3, name: 'Art Exhibition Opening', time: '2023-04-02T17:00:00Z', location: 'Digital Gallery' }
          ]);
          
          setInventoryItems([
            { id: 1, name: 'Cyber Jacket', category: 'Clothing', rarity: 'Rare' },
            { id: 2, name: 'Holo Glasses', category: 'Accessories', rarity: 'Uncommon' },
            { id: 3, name: 'Quantum Blade', category: 'Weapons', rarity: 'Legendary' },
            { id: 4, name: 'Neon Boots', category: 'Clothing', rarity: 'Common' }
          ]);
          
          setNews([
            { id: 1, title: 'New Region Opening: Crystal Peaks', date: '2023-03-25T10:00:00Z', preview: 'Explore the stunning new crystalline mountains region...' },
            { id: 2, title: 'Spring Collection Available Now', date: '2023-03-22T14:30:00Z', preview: 'Check out the latest fashion items in our marketplace...' },
            { id: 3, title: 'System Upgrade Complete', date: '2023-03-20T08:45:00Z', preview: 'The platform has been upgraded with new features...' }
          ]);
          
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        navigate('/auth');
      }
    };

    fetchUserData();
  }, [navigate]);

  // Função para logout
  const handleLogout = () => {
    // Limpar os dados de autenticação
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirecionar para a página inicial (index.html)
    window.location.href = '/';
  };

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Format time function
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate experience percentage
  const experiencePercentage = user ? (user.experience / user.nextLevel) * 100 : 0;

  // Função para atualizar senha
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    // Resetar mensagens
    setPasswordUpdateError('');
    setPasswordUpdateSuccess('');
    
    // Validar entrada
    if (newPassword !== confirmNewPassword) {
      setPasswordUpdateError(t('dashboard.settings.passwordsDoNotMatch', 'As senhas não coincidem'));
      return;
    }
    
    setPasswordUpdateLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/user/update-password`, {
        userId: user.id,
        currentPassword,
        newPassword
      });
      
      setPasswordUpdateSuccess(response.data.message);
      
      // Limpar campos após sucesso
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      setPasswordUpdateError(
        error.response?.data?.message || 
        t('dashboard.settings.errorUpdatingPassword', 'Erro ao atualizar senha')
      );
    } finally {
      setPasswordUpdateLoading(false);
    }
  };

  // Função para atualizar e-mail
  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    
    // Resetar mensagens
    setEmailUpdateError('');
    setEmailUpdateSuccess('');
    
    setEmailUpdateLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/user/update-email`, {
        userId: user.id,
        password: emailUpdatePassword,
        newEmail
      });
      
      setEmailUpdateSuccess(response.data.message);
      
      // Atualizar estado do usuário com o novo e-mail
      setUser({
        ...user,
        email: newEmail
      });
      
      // Atualizar no localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem('user', JSON.stringify({
        ...storedUser,
        email: newEmail
      }));
      
      // Limpar campos após sucesso
      setNewEmail('');
      setEmailUpdatePassword('');
    } catch (error) {
      setEmailUpdateError(
        error.response?.data?.message || 
        t('dashboard.settings.errorUpdatingEmail', 'Erro ao atualizar e-mail')
      );
    } finally {
      setEmailUpdateLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-white">{t('dashboard.loading', 'Carregando...')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-black/40 backdrop-blur-sm border-b border-purple-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                  Avitron
                </h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <button className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-purple-800/30 transition-colors">
                  {t('dashboard.nav.help', 'Ajuda')}
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-purple-700/50 hover:bg-purple-700/80 transition-colors"
                >
                  {t('dashboard.nav.logout', 'Sair')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-black/30 md:min-h-screen">
          <div className="p-4">
            <div className="flex flex-col items-center p-4 mb-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
              <div className="mb-3 p-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                {user.avatar === 'male' ? <MaleAvatar /> : user.avatar === 'female' ? <FemaleAvatar /> : <NeutralAvatar />}
              </div>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <div className="mt-2 text-sm text-gray-400">
                {t('dashboard.level', 'Nível')} {user.level || 1}
              </div>
              <div className="w-full mt-2 bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full" 
                  style={{ width: `${experiencePercentage}%` }}
                ></div>
              </div>
              <div className="mt-1 text-xs text-gray-400">
                {user.experience || 0} / {user.nextLevel || 1000} XP
              </div>
            </div>

            <ul className="space-y-2">
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${activeSection === 'home' ? 'bg-purple-900/60 text-white' : 'text-gray-300 hover:bg-gray-800/60'}`}
                  onClick={() => setActiveSection('home')}
                >
                  <HomeIcon />
                  <span className="ml-3">{t('dashboard.sidebar.home', 'Início')}</span>
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${activeSection === 'inventory' ? 'bg-purple-900/60 text-white' : 'text-gray-300 hover:bg-gray-800/60'}`}
                  onClick={() => setActiveSection('inventory')}
                >
                  <InventoryIcon />
                  <span className="ml-3">{t('dashboard.sidebar.inventory', 'Inventário')}</span>
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${activeSection === 'map' ? 'bg-purple-900/60 text-white' : 'text-gray-300 hover:bg-gray-800/60'}`}
                  onClick={() => setActiveSection('map')}
                >
                  <MapIcon />
                  <span className="ml-3">{t('dashboard.sidebar.map', 'Mapa')}</span>
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${activeSection === 'events' ? 'bg-purple-900/60 text-white' : 'text-gray-300 hover:bg-gray-800/60'}`}
                  onClick={() => setActiveSection('events')}
                >
                  <EventsIcon />
                  <span className="ml-3">{t('dashboard.sidebar.events', 'Eventos')}</span>
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${activeSection === 'friends' ? 'bg-purple-900/60 text-white' : 'text-gray-300 hover:bg-gray-800/60'}`}
                  onClick={() => setActiveSection('friends')}
                >
                  <FriendsIcon />
                  <span className="ml-3">{t('dashboard.sidebar.friends', 'Amigos')}</span>
                  <span className="ml-auto bg-indigo-600 text-xs px-2 py-1 rounded-full">{user.onlineFriends || 0}</span>
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${activeSection === 'marketplace' ? 'bg-purple-900/60 text-white' : 'text-gray-300 hover:bg-gray-800/60'}`}
                  onClick={() => setActiveSection('marketplace')}
                >
                  <MarketplaceIcon />
                  <span className="ml-3">{t('dashboard.sidebar.marketplace', 'Mercado')}</span>
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${activeSection === 'settings' ? 'bg-purple-900/60 text-white' : 'text-gray-300 hover:bg-gray-800/60'}`}
                  onClick={() => setActiveSection('settings')}
                >
                  <SettingsIcon />
                  <span className="ml-3">{t('dashboard.sidebar.settings', 'Configurações')}</span>
                </button>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex justify-between items-center px-4 text-sm">
                <div className="text-gray-400">{t('dashboard.wallet.currency', 'Moedas')}:</div>
                <div className="font-medium text-indigo-400">{user.currency || 0}</div>
              </div>
              <div className="flex justify-between items-center px-4 mt-2 text-sm">
                <div className="text-gray-400">{t('dashboard.wallet.credits', 'Créditos')}:</div>
                <div className="font-medium text-pink-400">{user.credits || 0}</div>
              </div>
              <button className="w-full mt-4 px-4 py-2 text-sm text-center text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-colors">
                {t('dashboard.wallet.addCredits', 'Adicionar Créditos')}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          {/* Home Section */}
          {activeSection === 'home' && (
            <div className="space-y-8">
              <h1 className="text-3xl font-bold">{t('dashboard.welcome', 'Bem-vindo de volta')}, {user.username ? user.username.split(' ')[0] : ''}!</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Locations */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h2 className="text-xl font-semibold">{t('dashboard.recentLocations.title', 'Locais Recentes')}</h2>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-4">
                      {recentLocations.map((location) => (
                        <li key={location.id} className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{location.name}</h3>
                            <p className="text-sm text-gray-400">{location.coordinates}</p>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="mr-2 text-gray-400">{location.visitors} {t('dashboard.recentLocations.visitors', 'visitantes')}</span>
                            <button className="px-3 py-1 bg-indigo-600/60 hover:bg-indigo-600/80 rounded-md transition-colors">
                              {t('dashboard.recentLocations.teleport', 'Teleportar')}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full mt-6 py-2 text-sm text-indigo-300 hover:text-indigo-200 transition-colors">
                      {t('dashboard.recentLocations.viewAll', 'Ver todos os locais')} →
                    </button>
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h2 className="text-xl font-semibold">{t('dashboard.upcomingEvents.title', 'Próximos Eventos')}</h2>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <li key={event.id} className="p-3 rounded-lg bg-gray-700/30 border border-gray-700/50">
                          <h3 className="font-medium">{event.name}</h3>
                          <p className="text-sm text-gray-400">
                            {formatDate(event.time)} {t('dashboard.upcomingEvents.at', 'às')} {formatTime(event.time)}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-400">{event.location}</span>
                            <button className="px-3 py-1 text-sm bg-purple-600/60 hover:bg-purple-600/80 rounded-md transition-colors">
                              {t('dashboard.upcomingEvents.interested', 'Interessado')}
                            </button>
                          </div>
                          </li>
                      ))}
                    </ul>
                    <button className="w-full mt-6 py-2 text-sm text-indigo-300 hover:text-indigo-200 transition-colors">
                      {t('dashboard.upcomingEvents.viewAll', 'Ver todos os eventos')} →
                    </button>
                  </div>
                </div>

                {/* News & Updates */}
                <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-700">
                    <h2 className="text-xl font-semibold">{t('dashboard.news.title', 'Notícias & Atualizações')}</h2>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-6">
                      {news.map((item) => (
                        <li key={item.id} className="pb-6 border-b border-gray-700/50 last:border-0 last:pb-0">
                          <div className="flex items-start justify-between">
                            <h3 className="font-medium text-lg">{item.title}</h3>
                            <span className="text-sm text-gray-400">{formatDate(item.date)}</span>
                          </div>
                          <p className="mt-2 text-gray-300">{item.preview}</p>
                          <button className="mt-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                            {t('dashboard.news.readMore', 'Ler mais')}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
                    <h3 className="text-gray-400 text-sm">{t('dashboard.stats.friends', 'Amigos')}</h3>
                    <p className="mt-2 text-2xl font-semibold">{user.totalFriends}</p>
                    <p className="mt-1 text-sm text-indigo-400">{user.onlineFriends} {t('dashboard.stats.online', 'online')}</p>
                  </div>
                  <div className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
                    <h3 className="text-gray-400 text-sm">{t('dashboard.stats.inventory', 'Inventário')}</h3>
                    <p className="mt-2 text-2xl font-semibold">{inventoryItems.length}</p>
                    <p className="mt-1 text-sm text-indigo-400">{inventoryItems.filter(i => i.rarity === 'Legendary').length} {t('dashboard.stats.legendary', 'lendários')}</p>
                  </div>
                  <div className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
                    <h3 className="text-gray-400 text-sm">{t('dashboard.stats.lastLogin', 'Último Login')}</h3>
                    <p className="mt-2 text-xl font-semibold">{formatDate(user.lastLogin)}</p>
                    <p className="mt-1 text-sm text-indigo-400">{formatTime(user.lastLogin)}</p>
                  </div>
                  <div className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
                    <h3 className="text-gray-400 text-sm">{t('dashboard.stats.memberSince', 'Membro Desde')}</h3>
                    <p className="mt-2 text-xl font-semibold">{formatDate(user.createdAt)}</p>
                    <p className="mt-1 text-sm text-indigo-400">{Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))} {t('dashboard.stats.days', 'dias')}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === 'settings' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <h1 className="text-3xl font-bold">{t('dashboard.settings.title', 'Configurações de Conta')}</h1>
              
              {/* Alterar E-mail */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700">
                  <h2 className="text-xl font-semibold">{t('dashboard.settings.changeEmail', 'Alterar E-mail')}</h2>
                </div>
                <div className="p-6">
                  <form onSubmit={handleEmailUpdate} className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2">{t('dashboard.settings.currentEmail', 'E-mail Atual')}</label>
                      <input 
                        type="text" 
                        value={user.email || ''} 
                        disabled 
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{t('dashboard.settings.newEmail', 'Novo E-mail')}</label>
                      <input 
                        type="email" 
                        value={newEmail} 
                        onChange={e => setNewEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{t('dashboard.settings.confirmPassword', 'Confirme sua Senha')}</label>
                      <input 
                        type="password" 
                        value={emailUpdatePassword} 
                        onChange={e => setEmailUpdatePassword(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                        required 
                      />
                    </div>
                    <div>
                      <button 
                        type="submit" 
                        disabled={emailUpdateLoading}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${emailUpdateLoading ? 'bg-gray-700 text-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white'}`}
                      >
                        {emailUpdateLoading ? t('dashboard.settings.updating', 'Atualizando...') : t('dashboard.settings.updateEmail', 'Atualizar E-mail')}
                      </button>
                    </div>
                    {emailUpdateError && <div className="text-red-400">{emailUpdateError}</div>}
                    {emailUpdateSuccess && <div className="text-green-400">{emailUpdateSuccess}</div>}
                  </form>
                </div>
              </div>
              
              {/* Alterar Senha */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700">
                  <h2 className="text-xl font-semibold">{t('dashboard.settings.changePassword', 'Alterar Senha')}</h2>
                </div>
                <div className="p-6">
                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2">{t('dashboard.settings.currentPassword', 'Senha Atual')}</label>
                      <input 
                        type="password" 
                        value={currentPassword} 
                        onChange={e => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{t('dashboard.settings.newPassword', 'Nova Senha')}</label>
                      <input 
                        type="password" 
                        value={newPassword} 
                        onChange={e => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{t('dashboard.settings.confirmNewPassword', 'Confirme a Nova Senha')}</label>
                      <input 
                        type="password" 
                        value={confirmNewPassword} 
                        onChange={e => setConfirmNewPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                        required 
                      />
                    </div>
                    <div>
                      <button 
                        type="submit" 
                        disabled={passwordUpdateLoading}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${passwordUpdateLoading ? 'bg-gray-700 text-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white'}`}
                      >
                        {passwordUpdateLoading ? t('dashboard.settings.updating', 'Atualizando...') : t('dashboard.settings.updatePassword', 'Atualizar Senha')}
                      </button>
                    </div>
                    {passwordUpdateError && <div className="text-red-400">{passwordUpdateError}</div>}
                    {passwordUpdateSuccess && <div className="text-green-400">{passwordUpdateSuccess}</div>}
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other sections */}
          {activeSection !== 'home' && activeSection !== 'settings' && (
            <div className="flex flex-col items-center justify-center h-96">
              <h2 className="text-3xl font-bold mb-4 text-gray-400">{t('dashboard.sectionUnderDevelopment', 'Em Desenvolvimento')}</h2>
              <p className="text-center text-gray-500 max-w-md">
                {t('dashboard.sectionComingSoon', 'Esta seção estará disponível em breve. Estamos trabalhando para trazer novas funcionalidades para o Avitron Metaverse.')}
              </p>
              <button 
                className="mt-8 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-colors"
                onClick={() => setActiveSection('home')}
              >
                {t('dashboard.backToHome', 'Voltar para o Início')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;