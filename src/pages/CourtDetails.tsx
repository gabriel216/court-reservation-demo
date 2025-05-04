import { addDays, format } from 'date-fns';
import { es } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ReservationModal } from '../components/ReservationModal';
import { courts } from '../mocks/data';
import { Court, TimeSlot } from '../types';

export const CourtDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [court, setCourt] = useState<Court | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weekdays, setWeekdays] = useState<Date[]>([]);

  useEffect(() => {
    const courtData = courts.find(c => c.id === Number(id));
    if (!courtData) {
      navigate('/');
      return;
    }
    setCourt(courtData);
    setLoading(false);
  }, [id, navigate]);

  useEffect(() => {
    // Generar lista de días de la semana
    const today = new Date();
    const tomorrow = addDays(today, 1);
    const days = Array.from({ length: 14 }, (_, i) => addDays(tomorrow, i));
    setWeekdays(days);
    setSelectedDate(format(days[0], 'yyyy-MM-dd'));
  }, []);

  useEffect(() => {
    if (selectedDate) {
      // Simular carga de horarios disponibles
      const slots = [
        { id: 1, startTime: '09:00', endTime: '10:00', available: true },
        { id: 2, startTime: '10:00', endTime: '11:00', available: true },
        { id: 3, startTime: '11:00', endTime: '12:00', available: true },
        { id: 4, startTime: '12:00', endTime: '13:00', available: true },
        { id: 5, startTime: '13:00', endTime: '14:00', available: true },
        { id: 6, startTime: '14:00', endTime: '15:00', available: true },
        { id: 7, startTime: '15:00', endTime: '16:00', available: true },
        { id: 8, startTime: '16:00', endTime: '17:00', available: true },
        { id: 9, startTime: '17:00', endTime: '18:00', available: true },
        { id: 10, startTime: '18:00', endTime: '19:00', available: true },
        { id: 11, startTime: '19:00', endTime: '20:00', available: true },
        { id: 12, startTime: '20:00', endTime: '21:00', available: true },
      ];
      const slotsWithDetails = slots.map(slot => ({
        ...slot,
        courtId: Number(id),
        date: selectedDate
      }));
      setTimeSlots(slotsWithDetails);
    }
  }, [selectedDate, id]);

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedTimeSlots(prev => {
        const isSelected = prev.some(s => s.id === slot.id);
        if (isSelected) {
          return prev.filter(s => s.id !== slot.id);
        } else {
          return [...prev, slot];
        }
      });
    }
  };

  const handleConfirmReservation = (userName: string) => {
    if (selectedTimeSlots.length === 0) {
      setError('Por favor selecciona al menos un horario');
      return;
    }

    navigate('/payment', {
      state: {
        court,
        timeSlots: selectedTimeSlots,
        date: selectedDate,
        userName,
      },
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  if (!court) {
    return <div className="flex justify-center items-center h-screen">Cancha no encontrada</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Card con carrusel */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{court.name}</h1>
              <div className="text-xl font-semibold text-blue-600">
                ${court.price.toFixed(2)}/hora
              </div>
            </div>
            
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className="w-full rounded-lg overflow-hidden"
              >
                {court && court.images && court.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={image}
                        alt={`${court.name} - Vista ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="mt-4">
              <p className="text-gray-600">{court.description}</p>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <span className="mr-4">{court.capacity} jugadores</span>
                <span>{court.surface}</span>
              </div>
            </div>
          </div>


          {/* Selector de horarios */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Seleccionar fecha</h2>
              <div className="overflow-x-auto">
                <div className="flex space-x-4 pb-4">
                  {weekdays.map((day) => (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelectedDate(format(day, 'yyyy-MM-dd'))}
                      className={`flex-shrink-0 px-4 py-2 rounded-lg ${
                        selectedDate === format(day, 'yyyy-MM-dd')
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-sm font-medium">
                          {format(day, 'EEE', { locale: es })}
                        </div>
                        <div className="text-lg font-bold">
                          {format(day, 'd')}
                        </div>
                        <div className="text-xs">
                          {format(day, 'MMMMMMMMM', { locale: es })}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {selectedTimeSlots.length > 0 && (
              <div className="flex justify-center lg:justify-end">
                <button
                  onClick={() => setShowReservationModal(true)}
                  className="px-6 py-3 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700"
                >
                  Reservar ({selectedTimeSlots.length} horarios seleccionados)
                </button>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Horarios disponibles</h2>
              <div className="grid grid-cols-2 gap-4">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => handleTimeSlotSelect(slot)}
                    disabled={!slot.available}
                    className={`p-4 rounded-lg text-center ${
                      selectedTimeSlots.some(s => s.id === slot.id)
                        ? 'bg-blue-600 text-white'
                        : slot.available
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <div className="font-medium">{slot.startTime} - {slot.endTime}</div>
                    <div className="text-sm">
                      {selectedTimeSlots.some(s => s.id === slot.id) ? 'Seleccionado' : slot.available ? 'Disponible' : 'No disponible'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      <ReservationModal
        isOpen={showReservationModal}
        onClose={() => setShowReservationModal(false)}
        onSubmit={handleConfirmReservation}
        court={court}
        timeSlots={selectedTimeSlots}
        date={selectedDate}
      />
    </div>
  );
}; 