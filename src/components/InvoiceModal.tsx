import React from 'react';
import { Court, TimeSlot } from '../types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  court: Court;
  timeSlot: TimeSlot;
  userName: string;
  date: string;
  paymentMethod: string;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  court,
  timeSlot,
  userName,
  date,
  paymentMethod
}) => {
  if (!isOpen) return null;

  // Generate a random control number
  const controlNumber = Math.floor(100000 + Math.random() * 900000);
  
  // Format the date
  const formattedDate = format(new Date(date), "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
  
  // Format the payment method
  const formatPaymentMethod = (method: string): string => {
    const methodMap: Record<string, string> = {
      'card': 'Tarjeta de crédito/débito',
      'transfer': 'Transferencia bancaria',
      'cash': 'Efectivo'
    };
    
    return methodMap[method] || method;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-5">
          <div className="relative mb-4">
            <button
              onClick={onClose}
              className="absolute right-0 top-0 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 rounded-full p-2 mb-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 text-center">
                ¡Reserva exitosa!
              </h2>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Número de control</p>
              <p className="text-2xl font-bold text-blue-600">{controlNumber}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Espacio:</span>
                <span className="font-medium">{court.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha:</span>
                <span className="font-medium">{formattedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Horario:</span>
                <span className="font-medium">{timeSlot.startTime} - {timeSlot.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total pagado:</span>
                <span className="font-bold text-blue-600">$58.00</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
            <p>Recibirá un correo electrónico con los detalles completos de su reserva y el número de control para presentar en la entrada.</p>
          </div>
          
          <div className="mt-5 flex justify-center">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 