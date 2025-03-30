import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ScrollSections.module.css';

const ScrollSections = () => {
  const { t } = useTranslation();
  
  // Estado para controlar qual seção está ativa
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Referencias para os elementos
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

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
  
  // Função para rolar para uma seção específica
  const scrollToSection = (index) => {
    if (!isScrolling && containerRef.current) {
      setIsScrolling(true);
      setActiveSection(index);
      
      sectionsRef.current[index].scrollIntoView({ behavior: 'smooth' });
      
      // Previne múltiplos scrolls em sequência
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };
  
  // Monitora o scroll para atualizar os pontos de navegação
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && !isScrolling) {
        // Encontra a seção mais visível na viewport
        const container = containerRef.current;
        const containerTop = container.scrollTop;
        const containerHeight = container.clientHeight;

        let maxVisibleSection = 0;
        let maxVisibleArea = 0;

        sectionsRef.current.forEach((section, index) => {
          if (!section) return;
          
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top - container.getBoundingClientRect().top;
          const visibleTop = Math.max(0, sectionTop);
          const visibleBottom = Math.min(containerHeight, sectionTop + rect.height);
          const visibleArea = Math.max(0, visibleBottom - visibleTop);
          
          if (visibleArea > maxVisibleArea) {
            maxVisibleArea = visibleArea;
            maxVisibleSection = index;
          }
        });

        if (maxVisibleSection !== activeSection) {
          setActiveSection(maxVisibleSection);
        }
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeSection, isScrolling]);
  
  // Dados das seções para facilitar a manutenção
  const sections = [
    {
      id: "FUTURE",
      imageUrl: "images/Scroll1.jpg",
      imageAlt: t('sections.future.title'),
      eyebrow: t('sections.future.eyebrow'),
      title: t('sections.future.title'),
      description: t('sections.future.description'),
      buttonText: t('sections.future.button'),
      gradient: "from-neutral-950/70 to-neutral-950/50",
      bgColor: "bg-neutral-950",
      imageLeft: true
    },
    {
      id: "NOMAD",
      imageUrl: "images/Scroll2.jpg",
      imageAlt: t('sections.nomad.title'),
      eyebrow: t('sections.nomad.eyebrow'),
      title: t('sections.nomad.title'),
      description: t('sections.nomad.description'),
      buttonText: t('sections.nomad.button'),
      gradient: "from-neutral-950/70 to-neutral-950/50",
      bgColor: "bg-neutral-900",
      imageLeft: false
    },
    {
      id: "INTERFACE",
      imageUrl: "images/Scroll3.jpg",
      imageAlt: t('sections.interface.title'),
      eyebrow: t('sections.interface.eyebrow'),
      title: t('sections.interface.title'),
      description: t('sections.interface.description'),
      buttonText: t('sections.interface.button'),
      gradient: "from-neutral-950/70 to-neutral-950/50",
      bgColor: "bg-neutral-950",
      imageLeft: true
    }
  ];
  
  return (
    <div 
      ref={containerRef}
      className="scroll-container overflow-y-auto overflow-x-hidden" 
      style={{ 
        height: "calc(100vh - 72px)",
        scrollSnapType: isMobile ? 'none' : 'y mandatory',
        WebkitOverflowScrolling: 'touch'
      }}
    >
        {sections.map((section, index) => (
          <section 
            key={section.id}
            ref={el => sectionsRef.current[index] = el}
            className={`relative flex flex-col ${isMobile ? '' : 'md:flex-row'}`}
            style={{ 
              minHeight: isMobile ? 'auto' : '100vh', 
              height: isMobile ? 'auto' : '100vh',
              scrollSnapAlign: isMobile ? 'none' : 'start',
              scrollSnapStop: isMobile ? 'none' : 'always'
            }}
          >
            {/* Layout adaptável com base no tamanho da tela e configuração da seção */}
            {(section.imageLeft || isMobile) ? (
              <>
                {/* Lado da imagem */}
                <div className={`w-full ${isMobile ? 'h-64 sm:h-80' : 'md:w-1/2 md:h-full'} relative overflow-hidden group ${styles.shineEffect}`}>
                  <img 
                    src={section.imageUrl} 
                    alt={section.imageAlt} 
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1" 
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${section.gradient} transition-opacity duration-300 group-hover:opacity-0`}></div>
                </div>
                
                {/* Lado do texto */}
                <div className={`w-full ${isMobile ? 'py-12 px-6' : 'md:w-1/2 md:h-full p-8 lg:p-12'} flex items-center justify-center ${section.bgColor}`}>
                  <div className={styles.floatAnimation}>
                    <span className="text-neutral-400 tracking-wider text-xs sm:text-sm font-mono">{section.eyebrow}</span>
                    <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-none bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">{section.title}</h2>
                    <p className="mt-4 sm:mt-6 text-neutral-400 text-base sm:text-lg leading-relaxed">{section.description}</p>
                    <button className="mt-6 sm:mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-all duration-300 hover:tracking-wider">{section.buttonText}</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Layout invertido - texto primeiro, depois imagem */}
                <div className={`w-full md:w-1/2 h-auto md:h-full flex items-center justify-center p-6 md:p-8 lg:p-12 ${section.bgColor}`}>
                  <div className={styles.floatAnimation}>
                    <span className="text-neutral-400 tracking-wider text-xs sm:text-sm font-mono">{section.eyebrow}</span>
                    <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-none bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">{section.title}</h2>
                    <p className="mt-4 sm:mt-6 text-neutral-400 text-base sm:text-lg leading-relaxed">{section.description}</p>
                    <button className="mt-6 sm:mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-all duration-300 hover:tracking-wider">{section.buttonText}</button>
                  </div>
                </div>
                
                <div className={`w-full md:w-1/2 h-64 sm:h-80 md:h-full relative overflow-hidden group ${styles.shineEffect}`}>
                  <img 
                    src={section.imageUrl} 
                    alt={section.imageAlt} 
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1" 
                  />
                  <div className={`absolute inset-0 bg-gradient-to-l ${section.gradient} transition-opacity duration-300 group-hover:opacity-0`}></div>
                </div>
              </>
            )}
          </section>
        ))}
      
      {/* Navigation dots on the side - hidden on mobile */}
      <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-50">
        {sections.map((_, index) => (
          <button 
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeSection 
                ? 'bg-white scale-150' 
                : 'bg-white/20 hover:bg-white hover:scale-150'
            }`}
            title={`Ir para a seção ${index + 1}`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Navegação alternativa para mobile - botões no final de cada seção */}
      {isMobile && (
        <div className="flex justify-center py-4 gap-2">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`w-2 h-2 rounded-full mx-1 ${
                index === activeSection ? 'bg-white' : 'bg-white/30'
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>  
  );
};

export default ScrollSections;