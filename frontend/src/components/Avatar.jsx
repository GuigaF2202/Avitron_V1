import React from 'react';

function Avatar() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Seu Avatar</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Nome do Avatar</h2>
          <p className="text-gray-600">Nível 1</p>
        </div>
      </div>
    </div>
  );
}

export default Avatar;
