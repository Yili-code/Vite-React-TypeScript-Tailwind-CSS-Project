import { Notification } from '@/types';
import { memo, useCallback, useEffect, useState } from 'react';
import { Icons } from './Icons';

interface NotificationSystemProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
}

const NotificationSystem = memo(
  ({
    notifications,
    onRemove,
    position = 'top-right',
  }: NotificationSystemProps) => {
    const [visibleNotifications, setVisibleNotifications] = useState<
      Set<string>
    >(new Set());

    useEffect(() => {
      notifications.forEach(notification => {
        if (!visibleNotifications.has(notification.id)) {
          setVisibleNotifications(prev => new Set(prev).add(notification.id));

          // 自動移除通知
          const duration = notification.duration || 5000;
          if (duration > 0) {
            setTimeout(() => {
              onRemove(notification.id);
              setVisibleNotifications(prev => {
                const newSet = new Set(prev);
                newSet.delete(notification.id);
                return newSet;
              });
            }, duration);
          }
        }
      });
    }, [notifications, onRemove, visibleNotifications]);

    const getPositionClasses = useCallback(() => {
      switch (position) {
        case 'top-left':
          return 'top-4 left-4';
        case 'top-center':
          return 'top-4 left-1/2 transform -translate-x-1/2';
        case 'top-right':
          return 'top-4 right-4';
        case 'bottom-left':
          return 'bottom-4 left-4';
        case 'bottom-center':
          return 'bottom-4 left-1/2 transform -translate-x-1/2';
        case 'bottom-right':
          return 'bottom-4 right-4';
        default:
          return 'top-4 right-4';
      }
    }, [position]);

    const getNotificationIcon = useCallback((type: Notification['type']) => {
      switch (type) {
        case 'success':
          return <Icons.SuccessIcon className='w-5 h-5' />;
        case 'error':
          return <Icons.ErrorIcon className='w-5 h-5' />;
        case 'warning':
          return <Icons.WarningIcon className='w-5 h-5' />;
        case 'info':
          return <Icons.InfoIcon className='w-5 h-5' />;
        default:
          return <Icons.InfoIcon className='w-5 h-5' />;
      }
    }, []);

    const getNotificationColor = useCallback((type: Notification['type']) => {
      switch (type) {
        case 'success':
          return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200';
        case 'error':
          return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
        case 'warning':
          return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200';
        case 'info':
          return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
        default:
          return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200';
      }
    }, []);

    if (notifications.length === 0) return null;

    return (
      <div className={`fixed z-50 ${getPositionClasses()}`}>
        <div className='space-y-2'>
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`
              max-w-sm w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-4
              transform transition-all duration-300 ease-in-out
              ${getNotificationColor(notification.type)}
              animate-slide-in-right
            `}
            >
              <div className='flex items-start gap-3'>
                <div className='text-lg flex-shrink-0'>
                  {getNotificationIcon(notification.type)}
                </div>
                <div className='flex-1 min-w-0'>
                  <h4 className='font-semibold text-sm mb-1'>
                    {notification.title}
                  </h4>
                  <p className='text-sm opacity-90'>{notification.message}</p>
                  {notification.action && (
                    <button
                      onClick={notification.action.onClick}
                      className='mt-2 text-sm font-medium underline hover:no-underline'
                    >
                      {notification.action.label}
                    </button>
                  )}
                </div>
                <button
                  onClick={() => onRemove(notification.id)}
                  className='flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
                >
                  <Icons.CloseIcon className='w-4 h-4' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

NotificationSystem.displayName = 'NotificationSystem';

export default NotificationSystem;
