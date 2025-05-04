import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Court, TimeSlot } from '../types';
import { InvoiceModal } from '../components/InvoiceModal';

interface LocationState {
  court: Court;
  timeSlots: TimeSlot[];
  userName: string;
  date: string;
}

export const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { court, timeSlots, userName, date } = location.state as LocationState;
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'method' | 'details' | 'processing'>('method');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handlePayment = () => {
    if (paymentMethod === 'cash') {
      setShowPaymentModal(true);
    } else if (paymentMethod === 'card') {
      if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
        setError('Por favor completa todos los campos de la tarjeta');
        return;
      }
      setShowPaymentModal(true);
    } else if (paymentMethod === 'mobile') {
      if (!phoneNumber) {
        setError('Por favor ingresa tu número de teléfono');
        return;
      }
      setShowPaymentModal(true);
    }
  };

  const handleCloseInvoice = () => {
    setShowPaymentModal(false);
    setTimeout(() => {
      navigate('/');
    }, 100);
  };

  const handleBack = () => {
    if (paymentStep === 'details') {
      setPaymentStep('method');
    } else {
      navigate(-1);
    }
  };

  const handleNext = () => {
    if (paymentMethod === 'cash') {
      handlePayment();
    } else {
      setPaymentStep('details');
    }
  };

  const formatCardNumber = (value: string) => {
    // Eliminar todos los caracteres que no sean números
    const v = value.replace(/\D/g, '');
    // Limitar a 16 dígitos
    const limited = v.slice(0, 16);
    // Agrupar en bloques de 4
    const parts = [];
    for (let i = 0; i < limited.length; i += 4) {
      parts.push(limited.substring(i, i + 4));
    }
    return parts.join(' ');
  };

  const formatExpiry = (value: string) => {
    // Eliminar todos los caracteres que no sean números
    const v = value.replace(/\D/g, '');
    // Limitar a 4 dígitos
    const limited = v.slice(0, 4);
    // Formatear como MM/AA
    if (limited.length >= 2) {
      return `${limited.substring(0, 2)}/${limited.substring(2, 4)}`;
    }
    return limited;
  };

  if (!timeSlots || timeSlots.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">No hay horarios seleccionados</h2>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Volver a seleccionar horarios
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <button
              onClick={handleBack}
              className="text-gray-500 hover:text-gray-700 mr-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Proceso de Pago</h1>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Detalles de la reserva</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <p className="text-sm text-gray-500">Horario</p>
                  <div className="space-y-1">
                    {timeSlots.map((slot) => (
                      <p key={slot.id} className="font-medium">
                        {slot.startTime} - {slot.endTime}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total a pagar</p>
                  <p className="font-bold text-blue-600">
                    ${(timeSlots.length * court.price).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {paymentStep === 'method' && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Selecciona un método de pago</h2>
              <div className="space-y-3">
                {/* <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-4 rounded-lg border-2 flex items-center ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Tarjeta de crédito/débito</p>
                    <p className="text-sm text-gray-500">Pago seguro con tarjeta</p>
                  </div>
                </button> */}

                <button
                  onClick={() => setPaymentMethod('mobile')}
                  className={`w-full p-4 rounded-lg border-2 flex items-center ${
                    paymentMethod === 'mobile'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Pago móvil C2P</p>
                    <p className="text-sm text-gray-500">Pago con tu teléfono móvil</p>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`w-full p-4 rounded-lg border-2 flex items-center ${
                    paymentMethod === 'cash'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Efectivo</p>
                    <p className="text-sm text-gray-500">Paga al llegar al complejo</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {paymentStep === 'details' && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">
                {paymentMethod === 'card' ? 'Detalles de la tarjeta' : 'Detalles del pago móvil'}
              </h2>
              {paymentMethod === 'card' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número de tarjeta
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      maxLength={19}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre en la tarjeta
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      placeholder="JUAN PEREZ"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de expiración
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                        placeholder="MM/AA"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        maxLength={5}
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, '').slice(0, 3))}
                        placeholder="123"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        maxLength={3}
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de teléfono
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 11))}
                    placeholder="04121234567"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    maxLength={11}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Te enviaremos un enlace para completar el pago a través de tu banco móvil.
                  </p>
                </div>
              )}
            </div>
          )}

          {paymentStep === 'processing' && (
            <div className="mb-6 text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg font-medium text-gray-700">
                Procesando tu pago...
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Por favor, no cierres esta ventana.
              </p>
            </div>
          )}

          {paymentStep !== 'processing' && (
            <button
              onClick={paymentStep === 'method' ? handleNext : handlePayment}
              disabled={
                !paymentMethod || 
                (paymentStep === 'details' && paymentMethod === 'card' && 
                  (!cardNumber || cardNumber.length < 19 || 
                   !cardName || 
                   !cardExpiry || cardExpiry.length < 5 || 
                   !cardCvv || cardCvv.length < 3)) || 
                (paymentStep === 'details' && paymentMethod === 'mobile' && 
                  (!phoneNumber || phoneNumber.length < 11))
              }
              className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                !paymentMethod || 
                (paymentStep === 'details' && paymentMethod === 'card' && 
                  (!cardNumber || cardNumber.length < 19 || 
                   !cardName || 
                   !cardExpiry || cardExpiry.length < 5 || 
                   !cardCvv || cardCvv.length < 3)) || 
                (paymentStep === 'details' && paymentMethod === 'mobile' && 
                  (!phoneNumber || phoneNumber.length < 11))
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {paymentStep === 'method' ? 'Continuar' : `Pagar $${(timeSlots.length * court.price).toFixed(2)}`}
            </button>
          )}
        </div>
      </div>

      {showPaymentModal && (
        <InvoiceModal
          isOpen={showPaymentModal}
          onClose={handleCloseInvoice}
          court={court}
          timeSlots={timeSlots}
          userName={userName}
          date={date}
          paymentMethod={paymentMethod}
        />
      )}
    </div>
  );
}; 