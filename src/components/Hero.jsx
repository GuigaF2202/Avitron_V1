import React from 'react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Imagem de fundo em vez do vídeo */}
      <div className="absolute inset-0">
        <img
          src="/images/avitron-multiverse.jpg" 
          alt="Avitron Multiverse"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      {/* Grid cyberpunk */}
      <div className="cyberpunk-grid"></div>

      {/* Conteúdo principal - posicionado na parte inferior mas não tão baixo */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col justify-end min-h-screen pb-48">
        <div className="max-w-4xl mx-auto text-center">
          {/* Efeito de brilho neon */}
          <div className="absolute inset-0 bg-[#00F0FF]/1 blur-3xl -z-10"></div>
          
          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button className="cyberpunk-button w-48 h-14 text-lg">
              Join Free
            </button>
            <button className="cyberpunk-button-pink w-48 h-14 text-lg">
              Launch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;