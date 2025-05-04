import { Court, TimeSlot } from '../types';

export const courts: Court[] = [
  {
    id: 1,
    name: 'Campo de Softbol',
    type: 'softball',
    images: ['/images/softball_field.jpg', '/images/softball_field.jpg', '/images/softball_field.jpg'],
    price: 30,
    capacity: 40,
    surface: '',
    description: 'Campo de Softbol con césped natural',
  },
  {
    id: 2,
    name: 'Cancha intermedia - Fútbol 5',
    type: 'soccer',
    images: ['/images/intermediate_court.jpg', '/images/intermediate_court.jpg', '/images/intermediate_court.jpg'],
    price: 30,
    capacity: 10,
    surface: 'Césped',
    description: 'Cancha de Fútbol 5 con césped natural',
  },
  {
    id: 3,
    name: 'Cancha Manuel Carrero',
    type: 'soccer',
    images: ['/images/manuel_carrero_court.jpg', '/images/manuel_carrero_court.jpg', '/images/manuel_carrero_court.jpg'],
    price: 50,
    capacity: 10,
    surface: 'Césped',
    description: 'Cancha Manuel Carrero',
  },
  {
    id: 4,
    name: 'Cancha Multicancha',
    type: 'soccer',
    images: ['/images/multicancha.jpg', '/images/multicancha.jpg', '/images/multicancha.jpg'],
    price: 30,
    capacity: 10,
    surface: 'Césped',
    description: 'Cancha de Fútbol 5 con césped natural',
  },
  {
    id: 5,
    name: 'Salón Ten Completa - Fútbol 7',
    type: 'soccer',
    images: ['/images/salon_ten.jpg', '/images/salon_ten.jpg', '/images/salon_ten.jpg'],
    price: 60,
    capacity: 10,
    surface: 'Césped',
    description: 'Cancha de Fútbol 5 con césped natural',
  },
  {
    id: 6,
    name: 'Salón Ten 1 o 2 - Fútbol 5', 
    type: 'soccer',
    images: ['/images/salon_ten.jpg', '/images/salon_ten.jpg', '/images/salon_ten.jpg'],
    price: 30,
    capacity: 10,
    surface: 'Césped',
    description: 'Cancha de Fútbol 5 con césped natural',
  },
  {
    id: 7,
    name: 'Churuata', 
    type: 'event',
    images: ['/images/churuata.jpg', '/images/churuata.jpg', '/images/churuata.jpg'],
    price: 56.25,
    capacity: 10,
    surface: 'Césped',
    description: 'Cancha de Fútbol 5 con césped natural',
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
      available: Math.random() > 0.3, // Randomly set availability
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