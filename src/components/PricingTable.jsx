import React from 'react';

const PricingTable = () => {
  return (
<section className="pricing-table flex flex-col items-center gap-8 text-white">
      <h2>Escolha seu Terreno no Metaverso</h2>
      
<div className="plan bg-gray-800 border border-blue-700 shadow-neon rounded-lg p-6 w-full max-w-sm">
        <h3>Básico</h3>
<p className="price text-3xl font-bold mb-4">R$ 50<span className="text-xl text-gray-400">/mês</span></p>
        <ul>
          <li>1024 m²</li>
          <li>500 Prims</li>
          <li>Suporte por Email</li>
        </ul>
<button className="bg-blue-600 hover:bg-blue-700 rounded-full py-2 px-6 mt-auto">Assinar</button>
      </div>
      
<div className="plan bg-gray-800 border border-blue-700 shadow-neon rounded-lg p-6 w-full max-w-sm">
        <h3>Padrão</h3>
<p className="price text-3xl font-bold mb-4">R$ 100<span className="text-xl text-gray-400">/mês</span></p>
        <ul>
          <li>4096 m²</li>
          <li>2000 Prims</li>
          <li>Suporte por Email e Chat</li>
        </ul>
<button className="bg-blue-600 hover:bg-blue-700 rounded-full py-2 px-6 mt-auto">Assinar</button>
      </div>
      
<div className="plan bg-gray-800 border border-blue-700 shadow-neon rounded-lg p-6 w-full max-w-sm">
        <h3>Premium</h3>
<p className="price text-3xl font-bold mb-4">R$ 200<span className="text-xl text-gray-400">/mês</span></p>
        <ul>
          <li>16384 m²</li>
          <li>10000 Prims</li>
          <li>Suporte por Email, Chat e Telefone</li>
          <li>Domínio Personalizado</li>
          <li>Backup Semanal</li>
        </ul>
<button className="bg-blue-600 hover:bg-blue-700 rounded-full py-2 px-6 mt-auto">Assinar</button>
      </div>
      
    </section>
  );
};

export default PricingTable;
