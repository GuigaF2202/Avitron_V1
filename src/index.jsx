import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './containers/App';
import './i18n';
import axios from 'axios';

// Usar URL relativa para todas as requisições API
// Isso permite que o Nginx faça proxy para o backend
axios.defaults.baseURL = '';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);