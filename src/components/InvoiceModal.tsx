import React from 'react';
import { Court, TimeSlot } from '../types';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  court: Court;
  timeSlots: TimeSlot[];
  userName: string;
  date: string;
  paymentMethod: string;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  court,
  timeSlots,
  date,
  paymentMethod,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">¡Reserva exitosa!</h2>
          <p className="text-gray-600 mt-2">Tu reserva ha sido confirmada</p>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Espacio</p>
            <p className="font-medium">{court.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fecha</p>
            <p className="font-medium">
              {format(parseISO(date), "EEEE d 'de' MMMM 'de' yyyy", { locale: es })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Horarios</p>
            <div className="space-y-1">
              {timeSlots.map((slot) => (
                <p key={slot.id} className="font-medium">
                  {slot.startTime} - {slot.endTime}
                </p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total pagado</p>
            <p className="font-bold text-blue-600">
              ${(timeSlots.length * court.price).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Método de pago</p>
            <p className="font-medium">
              {paymentMethod === 'cash' ? 'Efectivo' : 
               paymentMethod === 'card' ? 'Tarjeta de crédito/débito' : 
               'Pago móvil'}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}; 