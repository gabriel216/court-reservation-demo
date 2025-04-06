import React from 'react';
import { TimeSlot } from '../types';

interface TimeSlotListProps {
  slots: TimeSlot[];
  onSelect: (slot: TimeSlot) => void;
  selectedSlot: TimeSlot | null;
}

export const TimeSlotList: React.FC<TimeSlotListProps> = ({
  slots,
  onSelect,
  selectedSlot,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {slots.map((slot) => (
        <button
          key={slot.id}
          onClick={() => slot.isAvailable && onSelect(slot)}
          disabled={!slot.isAvailable}
          className={`
            p-4 rounded-lg text-center transition-all duration-200
            ${slot.isAvailable
              ? selectedSlot?.id === slot.id
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed opacity-75'
            }
          `}
        >
          <div className="text-lg font-medium">
            {slot.startTime} - {slot.endTime}
          </div>
          {!slot.isAvailable && (
            <div className="text-sm mt-1">No disponible</div>
          )}
        </button>
      ))}
    </div>
  );
};