import React from 'react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { TimeSlot } from '../types';

interface TimeSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  timeSlot: TimeSlot;
  date: string;
}

export const TimeSlotModal: React.FC<TimeSlotModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  timeSlot,
  date,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Confirmar reserva</h2>
          <p className="text-gray-600 mt-2">
            ¿Deseas reservar el espacio para el día{' '}
            <span className="font-medium">
              {format(parseISO(date), "EEEE d 'de' MMMM 'de' yyyy", { locale: es })}
            </span>{' '}
            de {timeSlot.startTime} a {timeSlot.endTime}?
          </p>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}; 