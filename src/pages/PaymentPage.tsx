import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Court, TimeSlot } from '../types';
import { InvoiceModal } from '../components/InvoiceModal';

interface LocationState {
  court: Court;
  timeSlot: TimeSlot;
  userName: string;
  date: string;
}

export const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { court, timeSlot, userName, date } = location.state as LocationState;
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [showInvoice, setShowInvoice] = useState(false);

  const handlePayment = () => {
    if (!selectedPayment) return;
    
    setShowInvoice(true);
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false);
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  const formattedDate = format(parseISO(date), "EEEE d 'de' MMMM 'de' yyyy", { locale: es });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Detalles de la Reserva */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Detalles de la Reserva</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{court.name}</h3>
                <p className="text-gray-600 capitalize">{court.type}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Fecha</h4>
                <p className="text-gray-900">{formattedDate}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Horario</h4>
                <p className="text-gray-900">
                  {timeSlot.startTime} - {timeSlot.endTime}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Reservado por</h4>
                <p className="text-gray-900">{userName}</p>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total a pagar</span>
                  <span className="text-2xl font-bold text-blue-600">$50.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Métodos de Pago */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Método de Pago</h2>
            
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setSelectedPayment('card')}
                  className={`w-full p-4 flex items-center justify-between ${
                    selectedPayment === 'card' ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      selectedPayment === 'card' ? 'border-blue-500' : 'border-gray-300'
                    }`}>
                      {selectedPayment === 'card' && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium">Tarjeta de crédito/débito</span>
                  </div>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setSelectedPayment('transfer')}
                  className={`w-full p-4 flex items-center justify-between ${
                    selectedPayment === 'transfer' ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      selectedPayment === 'transfer' ? 'border-blue-500' : 'border-gray-300'
                    }`}>
                      {selectedPayment === 'transfer' && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium">Transferencia bancaria</span>
                  </div>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setSelectedPayment('cash')}
                  className={`w-full p-4 flex items-center justify-between ${
                    selectedPayment === 'cash' ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      selectedPayment === 'cash' ? 'border-blue-500' : 'border-gray-300'
                    }`}>
                      {selectedPayment === 'cash' && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium">Efectivo</span>
                  </div>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="mt-8">
              <button
                onClick={handlePayment}
                disabled={!selectedPayment}
                className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                  selectedPayment
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Confirmar Pago
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showInvoice && (
        <InvoiceModal
          isOpen={showInvoice}
          onClose={handleCloseInvoice}
          court={court}
          timeSlot={timeSlot}
          userName={userName}
          date={date}
          paymentMethod={selectedPayment || ''}
        />
      )}
    </div>
  );
}; 