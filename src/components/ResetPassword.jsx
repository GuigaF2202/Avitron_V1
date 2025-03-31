import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Extrair o token da URL quando a página carregar
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tokenFromUrl = query.get('token');
    
    if (!tokenFromUrl) {
      setError(t('reset_password.token_missing', 'Token de redefinição não fornecido'));
      setLoading(false);
      return;
    }

    setToken(tokenFromUrl);
    
    // Verificar se o token é válido
    const verifyToken = async () => {
      try {
        const response = await axios.get(`/api/verify-reset-token?token=${tokenFromUrl}`);
        if (response.data.status === 'success') {
          setTokenValid(true);
        } else {
          setError(t('reset_password.token_invalid', 'Token inválido ou expirado'));
        }
      } catch (err) {
        setError(t('reset_password.token_expired', 'O token é inválido ou expirou. Por favor, solicite uma nova redefinição de senha.'));
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [location, t]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação básica
    if (password !== confirmPassword) {
      setError(t('reset_password.passwords_not_match', 'As senhas não coincidem'));
      return;
    }

    if (password.length < 8) {
      setError(t('reset_password.password_too_short', 'A senha deve ter pelo menos 8 caracteres'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/reset-password', {
        token,
        newPassword: password
      });

      if (response.data.status === 'success') {
        setSuccess(true);
        // Redirecionar para a página de login após alguns segundos
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(t('reset_password.reset_error', 'Erro ao redefinir a senha'));
      }
    } catch (err) {
      setError(err.response?.data?.message || t('reset_password.reset_error', 'Erro ao redefinir a senha'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
            {t('reset_password.verifying')}
          </h1>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !tokenValid) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-red-600 mb-6">
            {t('reset_password.error_title')}
          </h1>
          <p className="text-center text-gray-700 mb-6">{error}</p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/forgot-password')}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              {t('reset_password.request_new')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
            {t('reset_password.success_title')}
          </h1>
          <p className="text-center text-gray-700 mb-6">
            {t('reset_password.success_message')}
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              {t('reset_password.go_login')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          {t('reset_password.title')}
        </h1>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              {t('reset_password.new_password')}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={t('reset_password.password_placeholder')}
              required
              autoComplete="new-password"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
              {t('reset_password.confirm_password')}
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={t('reset_password.confirm_placeholder')}
              required
              autoComplete="new-password"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? t('reset_password.processing') : t('reset_password.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;