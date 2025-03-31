import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Register from './Register';

const Auth = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isRegister = searchParams.get('register') === 'true';
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // API URL - Usar caminho relativo para funcionar em produção
  const API_URL = '/api';

  // Verificar se o usuário já está autenticado
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      // Se já estiver autenticado, redirecionar para o dashboard
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/login`, { 
        username,
        password 
      });

      // Armazenar informações do usuário
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Também armazenar um token (se a API retornar um)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      setSuccess(t('auth.login.success', 'Login realizado com sucesso!'));
      
      // Redirecionar para o dashboard após login
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(t('auth.login.error', 'Credenciais inválidas. Tente novamente.'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email) {
      setError(t('auth.forgotPassword.emailRequired', 'Por favor, informe seu e-mail'));
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API_URL}/forgot-password`, { email });
      setSuccess(t('auth.forgotPassword.success', 'Instruções de recuperação enviadas para seu email.'));
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError(t('auth.forgotPassword.error', 'Erro ao processar sua solicitação. Tente novamente.'));
      }
    } finally {
      setLoading(false);
    }
  };

  if (isRegister) {
    return <Register />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      {/* Grid cyberpunk */}
      <div className="cyberpunk-grid"></div>

      {/* Container do formulário */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-black/40 backdrop-blur-xl p-8 rounded-lg cyberpunk-border">
          {/* Logo ou título */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold cyberpunk-text neon-pulse tracking-wider mb-2">
              {!isForgotPassword ? t('auth.login.title', 'Entrar') : t('auth.forgotPassword', 'Esqueci minha senha')}
            </h2>
            {!isForgotPassword && (
              <p className="text-[#00F0FF] tracking-wide">{t('auth.login.subtitle', 'Acesse o Metaverso Avitron')}</p>
            )}
          </div>

          {/* Mensagens de erro e sucesso */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded mb-6">
              {success}
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={isForgotPassword ? handleForgotPassword : handleLogin} className="space-y-6">
            {!isForgotPassword ? (
              <div>
                <label className="block text-[#00F0FF] text-sm font-medium mb-2 uppercase tracking-wider">
                  {t('auth.username', 'Nome de Usuário')}
                </label>
                <input
  type="text"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  className="w-full bg-black/50 border-2 border-[#00F0FF]/50 text-white px-4 py-2 rounded focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all"
  required
  autoComplete="username"
/>
              </div>
            ) : (
              <div>
                <label className="block text-[#00F0FF] text-sm font-medium mb-2 uppercase tracking-wider">
                  {t('auth.email', 'E-mail')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border-2 border-[#00F0FF]/50 text-white px-4 py-2 rounded focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all"
                  required
                />
              </div>
            )}

            {!isForgotPassword && (
              <div>
                <label className="block text-[#00F0FF] text-sm font-medium mb-2 uppercase tracking-wider">
                  {t('auth.password', 'Senha')}
                </label>
                <input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full bg-black/50 border-2 border-[#00F0FF]/50 text-white px-4 py-2 rounded focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all"
  required
  autoComplete="current-password"
/>
              </div>
            )}

            {/* Botões de ação */}
            <div className="space-y-4">
              <button 
                type="submit" 
                className="w-full cyberpunk-button text-lg py-3"
                disabled={loading}
              >
                {loading ? (
                  <span className="inline-block animate-pulse">
                    {!isForgotPassword ? t('auth.login.processing', 'Conectando...') : t('auth.resetPassword.processing', 'Enviando...')}
                  </span>
                ) : (
                  !isForgotPassword ? t('auth.login.button', 'Entrar') : t('auth.resetPassword', 'Redefinir Senha')
                )}
              </button>

              <div className="flex flex-col items-center space-y-4 text-sm">
                {!isForgotPassword ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-[#FF0055] hover:text-white transition-colors duration-300 tracking-wider"
                    >
                      {t('auth.forgotPassword', 'Esqueci minha senha')}
                    </button>
                    <Link
                      to="?register=true"
                      className="text-[#00F0FF] hover:text-white transition-colors duration-300 tracking-wider"
                    >
                      {t('auth.register.link', 'Criar nova conta')}
                    </Link>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="text-[#00F0FF] hover:text-white transition-colors duration-300 tracking-wider"
                  >
                    {t('auth.backToLogin', 'Voltar para o login')}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;