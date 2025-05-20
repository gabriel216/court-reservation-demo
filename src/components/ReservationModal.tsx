import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Court, TimeSlot } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userName: string) => void;
  court: Court;
  timeSlots: TimeSlot[];
  date: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  court,
  timeSlots,
  date,
}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Confirmar reserva</h2>
          <p className="text-gray-600 mt-2">
            ¿Deseas reservar el espacio para el día{' '}
            <span className="font-medium">
              {format(parseISO(date), "EEEE d 'de' MMMM 'de' yyyy", { locale: es })}
            </span>
            ?
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Detalles de la Reserva</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p><span className="font-medium">Cancha:</span> {court.name}</p>
            <p><span className="font-medium">Fecha:</span> {date ? format(parseISO(date), "EEEE d 'de' MMMM 'de' yyyy", { locale: es }) : ''}</p>
            <div>
              <p className="font-medium mb-1">Horarios seleccionados:</p>
              {timeSlots.map((slot) => (
                <p key={slot.id} className="ml-2">
                  {slot.startTime} - {slot.endTime}
                </p>
              ))}
            </div>
            <p><span className="font-medium">Total a pagar:</span> <span className='font-bold'>${(timeSlots.length * court.price).toFixed(2)}</span></p>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ingresa tu nombre completo"
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
            Correo
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ingresa tu nombre correo electrónico"
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancelar
          </button>
          <button
            disabled={userName.length < 2 || email.length < 2}
            type="submit"
            onClick={handleSubmit}
            className={`px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              userName.length < 2 || email.length < 2
                ? 'bg-blue-600 opacity-50 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}; 