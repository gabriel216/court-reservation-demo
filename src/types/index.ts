export interface Court {
  id: number;
  name: string;
  type: 'tennis' | 'basketball' | 'football' | 'softball' | 'soccer' | 'event';
  imageUrl: string;
}

export interface TimeSlot {
  id: number;
  courtId: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  date: string;
}

export interface Reservation {
  id: number;
  courtId: number;
  timeSlotId: number;
  userName: string;
  date: string;
}