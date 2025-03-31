import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ResendVerification = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError(t('email.resend.email_required', 'Por favor, informe seu endereço de email.'));
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/reenviar-verificacao', { email });
      setSuccess(response.data.message || t('email.resend.success', 'Email de verificação reenviado com sucesso! Por favor, verifique sua caixa de entrada.'));
      setEmail('');
    } catch (error) {
      setError(error.response?.data?.message || t('email.resend.error', 'Não foi possível reenviar o email de verificação. Tente novamente mais tarde.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white py-8">
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {t('email.resend.title', 'Reenviar Email de Verificação')}
          </h1>
          <p className="text-gray-400">{t('email.resend.subtitle', 'Insira seu email para receber um novo link de verificação')}</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg mb-6">{error}</div>}
        {success && <div className="bg-green-500/10 border border-green-500/30 text-green-200 px-4 py-3 rounded-lg mb-6">{success}</div>}

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">{t('email.resend.email_label', 'Email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
 
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${loading ? 'bg-gray-700 text-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/20'}`}
            >
              {loading ? t('email.resend.sending', 'Enviando...') : t('email.resend.submit', 'Reenviar Email de Verificação')}
            </button>
 
            <div className="mt-6 text-center text-sm text-gray-400">
              <Link to="/auth" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                {t('email.resend.back_login', 'Voltar para Login')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default ResendVerification;