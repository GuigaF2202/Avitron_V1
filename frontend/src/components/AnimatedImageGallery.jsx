import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AnimatedImageGallery = () => {
  const { t } = useTranslation();
  const [expandedImageIndex, setExpandedImageIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar dispositivo móvel
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Função para alternar a expansão da imagem
  const toggleImageExpansion = (index) => {
    if (expandedImageIndex === index) {
      setExpandedImageIndex(null); // Fecha se já estiver aberta
    } else {
      setExpandedImageIndex(index); // Abre a imagem clicada
    }
  };

  // Funções para navegar entre as imagens quando expandidas
  const goToNextImage = (e) => {
    e.stopPropagation();
    if (expandedImageIndex !== null) {
      const nextIndex = (expandedImageIndex + 1) % images.length;
      setExpandedImageIndex(nextIndex);
    }
  };

  const goToPrevImage = (e) => {
    e.stopPropagation();
    if (expandedImageIndex !== null) {
      const prevIndex = (expandedImageIndex - 1 + images.length) % images.length;
      setExpandedImageIndex(prevIndex);
    }
  };

  // Tratamento de teclas do teclado para navegação
  const handleKeyDown = React.useCallback((e) => {
    if (expandedImageIndex !== null) {
      if (e.key === 'ArrowRight') {
        const nextIndex = (expandedImageIndex + 1) % images.length;
        setExpandedImageIndex(nextIndex);
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (expandedImageIndex - 1 + images.length) % images.length;
        setExpandedImageIndex(prevIndex);
      } else if (e.key === 'Escape') {
        setExpandedImageIndex(null);
      }
    }
  }, [expandedImageIndex]);

  // Adicionar e remover event listener de teclado
  React.useEffect(() => {
    if (expandedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [expandedImageIndex, handleKeyDown]);

  // Dados das imagens para facilitar a manutenção
  const images = [
    {
      src: "images/animation1.jpg",
      rotation: isMobile ? "rotate-3" : "rotate-6",
      alt: t("gallery.images.1")
    },
    {
      src: "images/animation2.jpg",
      rotation: isMobile ? "-rotate-3" : "-rotate-6",
      alt: t("gallery.images.2")
    },
    {
      src: "images/animation3.jpg",
      rotation: isMobile ? "rotate-3" : "rotate-6",
      alt: t("gallery.images.3")
    },
    {
      src: "images/animation4.jpg",
      rotation: isMobile ? "-rotate-3" : "-rotate-6",
      alt: t("gallery.images.4")
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gray-1000 py-12 px-4 sm:py-16 sm:px-6 lg:py-24 lg:px-8">
      {/* Fundo estilo cyberpunk com grid de linhas */}
      <div className="absolute inset-0 z-0" 
           style={{
             backgroundImage: 'linear-gradient(transparent 1px, transparent 1px), linear-gradient(90deg, rgba(206, 230, 231, 0.055) 1px, transparent 1px)',
             backgroundSize: '20px 20px',
             backgroundPosition: 'center center'
           }}>
        {/* Camada adicional com grid vertical */}
        <div className="absolute inset-0"
             style={{
               backgroundImage: 'linear-gradient(rgba(5, 75, 80, 0.075) 1px, transparent 1px), linear-gradient(90deg, transparent 1px, transparent 1px)',
               backgroundSize: '20px 20px',
               backgroundPosition: 'center center'
             }}>
        </div>
        
        {/* Efeitos de iluminação cyberpunk */}
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-purple-700/20 blur-3xl"></div>
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-cyan-700/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-pink-500/10 animate-pulse"></div>
      </div>
      
      {/* Modal de imagem expandida que cobre tudo */}
      {expandedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setExpandedImageIndex(null)}
        >
          <div 
            className="relative w-full h-full max-w-6xl max-h-screen flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={images[expandedImageIndex].src}
              alt={images[expandedImageIndex].alt}
              className="max-w-full max-h-full object-contain animate-fadeIn"
            />
            
            {/* Informações sobre a imagem */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 sm:p-6 text-white">
              <span className="text-cyan-400 text-xs sm:text-sm font-mono block mb-1 sm:mb-2">
                {expandedImageIndex + 1} / {images.length}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{images[expandedImageIndex].alt}</h3>
              <p className="text-sm sm:text-base text-neutral-300 max-w-3xl">
                {t("gallery.viewerInfo")}
              </p>
            </div>
            
            {/* Botão de fechar */}
            <button 
              className="absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setExpandedImageIndex(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Setas de navegação - adaptadas para mobile */}
            <button 
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white/20 transition-colors transform hover:scale-110"
              onClick={goToPrevImage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white/20 transition-colors transform hover:scale-110"
              onClick={goToNextImage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Dica de navegação - apenas em desktop */}
            {!isMobile && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-1 text-white/70 text-sm opacity-70">
                {t("gallery.navigation")}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Conteúdo principal - Galeria de imagens responsiva */}
      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Título da seção */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">{t("gallery.title")}</h2>
          <p className="mt-4 text-cyan-400/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">{t("gallery.subtitle")}</p>
        </div>
        
        {/* Grid responsivo para imagens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Componente de imagens animadas */}
          {images.map((image, index) => (
            <div 
              key={index} 
              className="group relative rounded-xl overflow-hidden cursor-pointer aspect-[3/4] sm:aspect-[1/1]"
              onClick={() => toggleImageExpansion(index)}
            >
              {/* Contêiner de imagem com overflow hidden */}
              <div className="relative w-full h-full overflow-hidden rounded-xl">
                <img 
                  src={image.src}
                  className={`w-full h-full object-cover transition-all duration-700 ease-in-out
                    ${image.rotation} group-hover:rotate-0 group-hover:scale-110`}
                  alt={image.alt}
                  loading="lazy"
                />
              </div>
              
              {/* Overlay de gradiente com texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="p-4 w-full transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-cyan-400 uppercase font-mono text-xs block">
                    {index + 1}
                  </span>
                  <span className="text-white font-medium text-sm mt-1 block line-clamp-2">
                    {image.alt}
                  </span>
                </div>
              </div>
              
              {/* Ícone de expansão */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        
        {/* Dica de interação - visível apenas quando nenhuma imagem está expandida */}
        {expandedImageIndex === null && (
          <div className="text-center mt-8">
            <p className="text-cyan-500/50 text-sm font-mono inline-block py-2 px-4 rounded-full border border-cyan-500/10">
              <span className="inline-block animate-pulse mr-1">»</span> 
              {t("gallery.clickToExpand")} 
              <span className="inline-block animate-pulse ml-1">«</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnimatedImageGallery;