import React, { useState, useMemo } from 'react';
import { courts } from '../mocks/data';
import { CourtCard } from '../components/CourtCard';
import { Court } from '../types';

export const Home: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  
  // Get unique court types from the data
  const courtTypes = useMemo(() => {
    const types = new Set(courts.map(court => court.type));
    return ['all', ...Array.from(types)];
  }, []);
  
  // Filter courts based on selected type
  const filteredCourts = useMemo(() => {
    if (selectedType === 'all') {
      return courts;
    }
    return courts.filter(court => court.type === selectedType);
  }, [selectedType]);
  
  // Format type for display
  const formatType = (type: string): string => {
    if (type === 'all') return 'Todos los espacios';
    
    const typeMap: Record<string, string> = {
      'tennis': 'Tenis',
      'basketball': 'Baloncesto',
      'football': 'Fútbol Americano',
      'softball': 'Softbol',
      'soccer': 'Fútbol',
      'event': 'Eventos'
    };
    
    return typeMap[type] || type;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Reserva tu espacio
            </h1>
            <p className="text-xl text-gray-600">
              Selecciona el espacio que deseas reservar
            </p>
          </div>
          
          {/* Filter Selector */}
          <div className="mt-4 md:mt-0 md:ml-8">
            <label htmlFor="court-type" className="block text-sm font-medium text-gray-700 mb-2">
              Filtrar por tipo
            </label>
            <select
              id="court-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full md:w-64 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {courtTypes.map((type) => (
                <option key={type} value={type}>
                  {formatType(type)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Courts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourts.map((court) => (
            <CourtCard key={court.id} court={court} />
          ))}
        </div>
        
        {/* No results message */}
        {filteredCourts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No hay espacios disponibles para este tipo.</p>
          </div>
        )}
      </div>
    </div>
  );
}; 