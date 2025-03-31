import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/api/verificar-email?token=${token}`);
        setStatus('success');
        setMessage(response.data.message);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || t('email.verification.failed_message'));
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus('error');
      setMessage(t('email.verification.token_missing', 'Token de verificação não fornecido.'));
    }
  }, [token, t]);

  if (status === 'loading') {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto text-center">
        <div className="animate-pulse mb-4">
          <svg className="mx-auto h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{t('email.verification.verifying')}</h2>
        <p className="text-gray-400">{t('email.verification.wait')}</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto text-center">
        <div className="mb-4 text-indigo-500">
          <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{t('email.verification.success')}</h2>
        <p className="text-gray-300 mb-6">{t('email.verification.success_message')}</p>
        <div className="flex flex-col space-y-3">
          <Link 
            to="/auth" 
            className="py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg text-white font-medium transition-colors"
          >
            {t('email.verification.enter_account')}
          </Link>
          <Link 
            to="/" 
            className="py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            {t('email.verification.go_home')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto text-center">
      <div className="mb-4 text-red-500">
        <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">{t('email.verification.failed')}</h2>
      <p className="text-gray-300 mb-6">{message || t('email.verification.failed_message')}</p>
      <div className="flex flex-col space-y-3">
        <Link 
          to="/reenviar-verificacao" 
          className="py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg text-white font-medium transition-colors"
        >
          {t('email.verification.resend')}
        </Link>
        <Link 
          to="/auth" 
          className="py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
        >
          {t('email.verification.back_login')}
        </Link>
      </div>
    </div>
  );
};

export default EmailVerification;