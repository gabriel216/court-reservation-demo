import { Court, TimeSlot } from '../types';

export const courts: Court[] = [
  {
    id: 1,
    name: 'Campo de Softbol',
    type: 'softball',
    imageUrl: '/images/softball_field.jpg',
  },
  {
    id: 2,
    name: 'Cancha intermedia - Fútbol 5',
    type: 'soccer',
    imageUrl: '/images/intermediate_court.jpg',
  },
  {
    id: 3,
    name: 'Cancha Manuel Carrero',
    type: 'soccer',
    imageUrl: '/images/manuel_carrero_court.jpg',
  },
  {
    id: 4,
    name: 'Cancha Multicancha',
    type: 'soccer',
    imageUrl: '/images/multicancha.jpg',
  },
  {
    id: 5,
    name: 'Salón Ten Completa - Fútbol 7',
    type: 'soccer',
    imageUrl: '/images/salon_ten.jpg',
  },{
    id: 6,
    name: 'Salón Ten 1 o 2 - Fútbol 5',
    type: 'soccer',
    imageUrl: '/images/salon_ten.jpg',
  },
  {
    id: 7,
    name: 'Churuata',
    type: 'event',
    imageUrl: '/images/churuata.jpg',
  },
];

const generateTimeSlots = (courtId: number, date: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 8; hour < 22; hour++) {
    slots.push({
      id: hour + courtId * 100,
      courtId,
      startTime: `${hour}:00`,
      endTime: `${hour + 1}:00`,
      isAvailable: Math.random() > 0.3, // Randomly set availability
      date,
    });
  }
  return slots;
};

export const getTimeSlots = (courtId: number, date: string): Promise<TimeSlot[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateTimeSlots(courtId, date));
    }, 500);
  });
};