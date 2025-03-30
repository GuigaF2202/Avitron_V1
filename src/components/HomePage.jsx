import React from 'react';
import ScrollSections from './ScrollSections';
import AnimatedImageGallery from './AnimatedImageGallery';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* ScrollSections */}
      <div className="w-full h-[85vh] relative">
        <ScrollSections />
        
        {/* Indicador de rolagem */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce text-white z-10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs font-light tracking-wider block text-center mt-1">Role para a Galeria</span>
        </div>
      </div>
      
      {/* AnimatedImageGallery */}
      <div className="w-full py-16 bg-zinc-900">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Galeria de Imagens</h2>
        <AnimatedImageGallery />
      </div>
    </div>
  );
};

export default HomePage;