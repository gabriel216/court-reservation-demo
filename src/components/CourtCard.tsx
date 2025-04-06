import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Court } from '../types';

interface CourtCardProps {
  court: Court;
}

export const CourtCard: React.FC<CourtCardProps> = ({ court }) => {
  const navigate = useNavigate();
  
  // Format type for display in Spanish
  const formatType = (type: string): string => {
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
    <div
      onClick={() => navigate(`/court/${court.id}`)}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
    >
      <div className="relative h-48">
        <img
          src={court.imageUrl}
          alt={court.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{court.name}</h3>
        <p className="text-gray-600">{formatType(court.type)}</p>
      </div>
    </div>
  );
};