import React, { useState } from 'react';
import { Court, TimeSlot } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userName: string) => void;
  court: Court;
  timeSlot: TimeSlot;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  court,
  timeSlot,
}) => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!userName.trim()) {
      setError('Por favor ingresa tu nombre');
      return;
    }

    if (userName.length < 2) {
      setError('El nombre debe tener al menos 2 caracteres');
      return;
    }

    onSubmit(userName.trim());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 transform transition-all">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Completa tu Reserva</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
              Tu Nombre
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setError('');
              }}
              className={`
                w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                ${error ? 'border-red-500' : 'border-gray-300'}
              `}
              placeholder="Ingresa tu nombre"
              autoFocus
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Detalles de la Reserva</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Cancha:</span> {court.name}</p>
              <p><span className="font-medium">Hora:</span> {timeSlot.startTime} - {timeSlot.endTime}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors duration-200 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2"
          >
            Confirmar Reserva
          </button>
        </div>
      </div>
    </div>
  );
}; 