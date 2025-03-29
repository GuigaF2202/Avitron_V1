import React from 'react';

function Map() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mapa do Metaverso</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg">
          {/* Aqui você pode adicionar sua implementação do mapa */}
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Mapa em desenvolvimento</p>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Localização Atual</h2>
          <p className="text-gray-600">Coordenadas: X: 0, Y: 0</p>
        </div>
      </div>
    </div>
  );
}

export default Map;
