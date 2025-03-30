import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// SVGs incorporados para os avatares
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

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    securityQuestion: '',
    securityAnswer: '',
    newsConsent: false,
    termsConsent: false,
    avatar: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [info, setInfo] = useState('');

  // API URL - Usar caminho relativo para funcionar em produção
  const API_URL = '/api';

  const avatars = [
    { id: 'male', label: 'Masculino', component: <MaleAvatar /> },
    { id: 'female', label: 'Feminino', component: <FemaleAvatar /> },
    { id: 'neutral', label: 'Neutro', component: <NeutralAvatar /> }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAvatarSelect = (avatarId) => {
    setFormData(prev => ({
      ...prev,
      avatar: avatarId
    }));
  };

  const validateUsername = (username) => {
    if (!username) return '';
    return username.includes(' ') ? username : username + " Resident";
  };

  const validateForm = () => {
    if (!formData.avatar) {
      setError(t('register.error.avatarRequired', 'Por favor, selecione um avatar'));
      return false;
    }
    if (!formData.termsConsent) {
      setError(t('register.error.termsRequired', 'Você deve aceitar os termos e condições'));
      return false;
    }
    if (!formData.username.includes(' ')) {
      setInfo(t('register.info.usernameResident', 'Sobrenome não fornecido. "Resident" será adicionado automaticamente.'));
    } else {
      setInfo('');
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validateForm()) return;

    setLoading(true);
    let submissionData = { ...formData };
    submissionData.username = validateUsername(submissionData.username);

    try {
      const response = await axios.post(`${API_URL}/register`, submissionData);
      
      // Não armazenamos o usuário no localStorage até que a conta esteja verificada
      // localStorage.setItem('user', JSON.stringify(response.data.user));
      
      setSuccess('Registro realizado com sucesso! Um email de verificação foi enviado para o seu endereço de email. Por favor, verifique sua caixa de entrada e clique no link para ativar sua conta.');
      
      setFormData({
        username: '',
        password: '',
        email: '',
        securityQuestion: '',
        securityAnswer: '',
        newsConsent: false,
        termsConsent: false,
        avatar: ''
      });
      setInfo('');
      
      // Não redirecionamos automaticamente para o dashboard
      // Esperamos que o usuário verifique o email primeiro
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.message || t('register.error.general', 'Ocorreu um erro durante o registro. Tente novamente.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white py-8">
      <div className="w-full max-w-3xl px-6">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {t('register.title', 'Criar Conta')}
          </h1>
          <p className="text-gray-400">{t('register.subtitle', 'Junte-se ao metaverso Avitron')}</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg mb-6">{error}</div>}
        {info && <div className="bg-blue-500/10 border border-blue-500/30 text-blue-200 px-4 py-3 rounded-lg mb-6">{info}</div>}
        {success && <div className="bg-green-500/10 border border-green-500/30 text-green-200 px-4 py-3 rounded-lg mb-6">{success}</div>}

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">{t('register.avatar.title', 'Escolha seu Avatar')}</h2>
              <div className="grid grid-cols-3 gap-6">
                {avatars.map((avatar) => (
                  <button key={avatar.id} type="button" onClick={() => handleAvatarSelect(avatar.id)} className={`flex flex-col items-center justify-center rounded-xl p-4 transition-all ${formData.avatar === avatar.id ? 'bg-gradient-to-b from-indigo-900/60 to-purple-900/60 border border-indigo-500/50 shadow-lg shadow-indigo-500/20' : 'bg-gray-800/80 border border-gray-700 hover:border-gray-600'}`}>
                    <div className="mb-3">{avatar.component}</div>
                    <span className="text-sm font-medium">{avatar.label}</span>
                  </button>
                ))}
              </div>
              {!formData.avatar && <p className="text-red-400 text-sm mt-2">{t('register.avatar.required', 'Por favor, selecione um avatar')}</p>}
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">{t('register.account.title', 'Informações da Conta')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">{t('register.account.username', 'Nome de Usuário')}</label>
                  <input type="text" name="username" autoComplete="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                  <p className="text-xs text-gray-400 mt-1">{t('register.account.usernameHelp', 'Insira seu nome e sobrenome. Se não informar um sobrenome, "Resident" será adicionado automaticamente.')}</p>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">{t('register.account.email', 'Email')}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">{t('register.account.password', 'Senha')}</label>
                <input type="password" name="password" autoComplete="new-password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
              </div>
            </div>

            <div className="space-y-4 mt-8 border-t border-gray-700 pt-6">
              <label className="flex items-start space-x-3">
                <input type="checkbox" name="newsConsent" checked={formData.newsConsent} onChange={handleChange} className="mt-1 rounded border-gray-700 bg-gray-900/50 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0" />
                <span className="text-sm text-gray-300">{t('register.consent.news', 'Desejo receber atualizações e novidades por email')}</span>
              </label>
              <label className="flex items-start space-x-3">
                <input type="checkbox" name="termsConsent" checked={formData.termsConsent} onChange={handleChange} className="mt-1 rounded border-gray-700 bg-gray-900/50 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0" required />
                <span className="text-sm text-gray-300">{t('register.consent.terms', 'Li e concordo com os Termos de Serviço e Política de Privacidade')}</span>
              </label>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">{t('register.security.question', 'Pergunta de Segurança')}</label>
              <select name="securityQuestion" value={formData.securityQuestion} onChange={handleChange} className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required>
                <option value="">{t('register.security.select', 'Selecione uma pergunta')}</option>
                {Array.from({ length: 6 }, (_, i) => (
                  <option key={i} value={i}>{t(`register.security.questions.${i}`)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">{t('register.security.answer', 'Resposta')}</label>
              <input type="text" name="securityAnswer" value={formData.securityAnswer} onChange={handleChange} className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
            </div>

            <div className="mt-8">
              <button type="submit" disabled={loading} className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${loading ? 'bg-gray-700 text-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/20'}`}>
                {loading ? t('register.submitting', 'Processando...') : t('register.submit', 'Criar Conta')}
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-400">
              {t('register.haveAccount', 'Já tem uma conta?')} {' '}
              <Link to="/auth" className="text-indigo-400 hover:text-indigo-300 transition-colors">{t('register.login', 'Faça login')}</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;