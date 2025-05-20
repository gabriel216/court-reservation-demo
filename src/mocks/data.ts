import { Court, TimeSlot } from '../types';

export const courts: Court[] = [
  {
    id: 1,
    name: 'Campo de Softbol',
    type: 'softball',
    images: ['/court-reservation-demo/images/softball_field.jpg', '/court-reservation-demo/images/softball_field.jpg', '/court-reservation-demo/images/softball_field.jpg'],
    price: 42,
    capacity: 40,
    surface: '',
    description: 'Campo de Softbol con césped natural',
  },
  {
    id: 2,
    name: 'Cancha intermedia - Fútbol 5',
    type: 'soccer',
    images: ['/court-reservation-demo/images/intermediate_court.jpg', '/court-reservation-demo/images/intermediate_court.jpg', '/court-reservation-demo/images/intermediate_court.jpg'],
    price: 42,
    capacity: 10,
    surface: 'Césped',
    description: 'Cancha de Fútbol 5 con césped natural',
  },
  {
    id: 3,
    name: 'Cancha Manuel Carrero',
    type: 'soccer',
    images: ['/court-reservation-demo/images/manuel_carrero_court.jpg', '/court-reservation-demo/images/manuel_carrero_court.jpg', '/court-reservation-demo/images/manuel_carrero_court.jpg'],
    price: 62,
    capacity: 10,
    surface: 'Césped',
    description: 'Cancha Manuel Carrero',
  },
  {
    id: 4,
    name: 'Cancha Multicancha',
    type: 'soccer',
    images: ['/court-reservation-demo/images/multicancha.jpg', '/court-reservation-demo/images/multicancha.jpg', '/court-reservation-demo/images/multicancha.jpg'],
    price: 42,
    capacity: 10,
    surface: 'Césped',
    description: 'Cancha de Fútbol 5 con césped natural',
  },
  {
    id: 5,
    name: 'Salón Ten Completa - Fútbol 7',
    type: 'soccer',
    images: ['/court-reservation-demo/images/salon_ten.jpg', '/court-reservation-demo/images/salon_ten.jpg', '/court-reservation-demo/images/salon_ten.jpg'],
    price: 72,
    capacity: 10,
    surface: 'Césped',
    description: 'Cancha de Fútbol 5 con césped natural',
  },
  {
    id: 6,
    name: 'Salón Ten 1 o 2 - Fútbol 5', 
    type: 'soccer',
    images: ['/court-reservation-demo/images/salon_ten.jpg', '/court-reservation-demo/images/salon_ten.jpg', '/court-reservation-demo/images/salon_ten.jpg'],
    price: 42,
    capacity: 10,
    surface: 'Césped',
    description: 'Cancha de Fútbol 5 con césped natural',
  },
  {
    id: 7,
    name: 'Churuata', 
    type: 'event',
    images: ['/court-reservation-demo/images/churuata.jpg', '/court-reservation-demo/images/churuata.jpg', '/court-reservation-demo/images/churuata.jpg'],
    price: 68.52,
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