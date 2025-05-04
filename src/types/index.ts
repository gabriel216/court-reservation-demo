export interface Court {
  id: number;
  name: string;
  price: number;
  capacity: number;
  surface: string;
  description: string;
  type: 'soccer' | 'tennis' | 'basketball' | 'football' | 'softball' | 'event';
  images: string[];
}

export interface TimeSlot {
  id: number;
  courtId: number;
  startTime: string;
  endTime: string;
  available: boolean;
  date: string;
}

export interface Reservation {
  id: number;
  courtId: number;
  date: string;
  timeSlot: TimeSlot;
  userName: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}