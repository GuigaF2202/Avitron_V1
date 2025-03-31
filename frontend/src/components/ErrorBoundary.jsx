// src/components/ErrorBoundary.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Você pode registrar o erro em um serviço de relatório de erros
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
          <div className="max-w-lg w-full bg-zinc-900 rounded-lg border border-[#00F0FF]/20 p-8">
            <h1 className="text-3xl font-bold mb-4 text-[#00F0FF]">Algo deu errado</h1>
            <p className="mb-6">Desculpe pelo inconveniente. Encontramos um erro inesperado.</p>
            
            <div className="bg-black/40 p-4 rounded-md mb-6 overflow-auto max-h-40">
              <pre className="text-sm text-red-400">{this.state.error?.toString()}</pre>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 text-[#00F0FF] rounded-md transition-colors"
              >
                Tentar novamente
              </button>
              <button 
                onClick={() => window.location.href = '/'} 
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
              >
                Voltar para a página inicial
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Componente wrapper para ter acesso ao hook useNavigate
export default function ErrorBoundaryWithNav(props) {
  const navigate = useNavigate();
  return <ErrorBoundary navigate={navigate} {...props} />;
}