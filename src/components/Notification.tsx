import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`
          px-6 py-4 rounded-lg shadow-lg text-white
          transform transition-all duration-300 ease-in-out
          ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
        `}
      >
        {message}
      </div>
    </div>
  );
}; 