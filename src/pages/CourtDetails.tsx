import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { format, addDays, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import { Court, TimeSlot } from '../types';
import { courts, getTimeSlots } from '../mocks/data';
import { TimeSlotList } from '../components/TimeSlotList';
import { ReservationModal } from '../components/ReservationModal';
import { Notification } from '../components/Notification';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const CourtDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [court, setCourt] = useState<Court | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [loading, setLoading] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [weekDays, setWeekDays] = useState<Date[]>([]);

  useEffect(() => {
    const courtData = courts.find(c => c.id === Number(id));
    if (!courtData) {
      navigate('/');
      return;
    }
    setCourt(courtData);
  }, [id, navigate]);

  useEffect(() => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    setWeekDays(days);
  }, []);

  useEffect(() => {
    if (court) {
      loadTimeSlots(court.id, selectedDate);
    }
  }, [court, selectedDate]);

  const loadTimeSlots = async (courtId: number, date: string) => {
    setLoading(true);
    try {
      const slots = await getTimeSlots(courtId, date);
      setTimeSlots(slots);
    } catch (error) {
      setNotification({
        message: 'Error al cargar los horarios. Por favor, intenta de nuevo.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReservation = (userName: string) => {
    if (court && selectedSlot) {
      setShowReservation(false);
      navigate('/payment', {
        state: {
          court,
          timeSlot: selectedSlot,
          userName,
          date: selectedDate
        },
        replace: true
      });
    }
  };

  if (!court) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">{court.name}</h1>
        <p className="text-gray-600 mb-8 capitalize">{court.type}</p>

        <div className="mb-12">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="w-full h-[400px] rounded-lg overflow-hidden"
          >
            <SwiperSlide>
              <img
                src={court.imageUrl}
                alt={`${court.name} - Vista principal`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/images/softball_field.jpg"
                alt={`${court.name} - Campo de softbol`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/images/intermediate_court.jpg"
                alt={`${court.name} - Cancha intermedia`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/images/manuel_carrero_court.jpg"
                alt={`${court.name} - Cancha Manuel Carrero`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/images/multicancha.jpg"
                alt={`${court.name} - Multicancha`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/images/salon_ten.jpg"
                alt={`${court.name} - Salón Ten`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/images/churuata.jpg"
                alt={`${court.name} - Churuata`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Horarios Disponibles</h2>
          
          <div className="grid grid-cols-7 gap-4 mb-6">
            {weekDays.map((day) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const isSelected = selectedDate === dateStr;
              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`
                    flex flex-col items-center justify-center p-3 rounded-lg
                    transition-all duration-200
                    ${isSelected
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  <div className="text-sm font-medium mb-1">
                    {format(day, 'EEE', { locale: es })}
                  </div>
                  <div className="text-sm">
                    {format(day, 'd MMM', { locale: es })}
                  </div>
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <TimeSlotList
              slots={timeSlots}
              onSelect={(slot) => {
                setSelectedSlot(slot);
                setShowReservation(true);
              }}
              selectedSlot={selectedSlot}
            />
          )}
        </div>

        {showReservation && selectedSlot && (
          <ReservationModal
            isOpen={showReservation}
            onClose={() => {
              setShowReservation(false);
              setSelectedSlot(null);
            }}
            onSubmit={handleReservation}
            court={court}
            timeSlot={selectedSlot}
          />
        )}

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </div>
  );
}; 