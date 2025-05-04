import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Court } from '../types';

interface CourtCardProps {
  court: Court;
}

export const CourtCard: React.FC<CourtCardProps> = ({ court }) => {
  const navigate = useNavigate();
  
  return (
    <div
      onClick={() => navigate(`/court/${court.id}`)}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
    >
      <div className="relative h-48">
        <img
          src={court.images[0]}
          alt={court.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 mr-2">{court.name}</h3>
          <span className="text-blue-600 font-medium">${court.price.toFixed(2)}/hora</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="mr-4">{court.capacity} jugadores</span>
          <span>{court.surface}</span>
        </div>
      </div>
    </div>
  );
};