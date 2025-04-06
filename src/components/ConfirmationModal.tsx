import React from 'react';
import { Court, TimeSlot } from '../types';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  court: Court;
  timeSlot: TimeSlot;
  date: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  court,
  timeSlot,
  date,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 transform transition-all">
        <h3 className="text-xl font-semibold mb-4">Confirmar Reserva</h3>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600">Cancha:</p>
            <p className="font-medium">{court.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Fecha:</p>
            <p className="font-medium">{new Date(date).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Hora:</p>
            <p className="font-medium">{timeSlot.startTime} - {timeSlot.endTime}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}; 