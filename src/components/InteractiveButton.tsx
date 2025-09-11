import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Icons } from './Icons';

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right';
  className?: string;
  ripple?: boolean;
  magnetic?: boolean;
  tooltip?: string;
}

const InteractiveButton: React.FC<InteractiveButtonProps> = memo(
  ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    icon: Icon,
    iconPosition = 'left',
    className = '',
    ripple = true,
    magnetic = false,
    tooltip,
  }) => {
    const [isPressed, setIsPressed] = useState(false);
    const [ripples, setRipples] = useState<
      Array<{ id: number; x: number; y: number }>
    >([]);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const rippleIdRef = useRef(0);

    const variantClasses = {
      primary:
        'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600',
      secondary:
        'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200',
      success:
        'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600',
      warning:
        'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600',
      error:
        'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600',
      ghost:
        'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-gray-500',
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || loading) return;

        if (ripple) {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const newRipple = {
            id: rippleIdRef.current++,
            x,
            y,
          };

          setRipples(prev => [...prev, newRipple]);

          // Remove ripple after animation
          setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
          }, 600);
        }

        onClick?.();
      },
      [disabled, loading, onClick, ripple]
    );

    const handleMouseDown = useCallback(() => {
      setIsPressed(true);
    }, []);

    const handleMouseUp = useCallback(() => {
      setIsPressed(false);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsPressed(false);
    }, []);

    // Magnetic effect
    useEffect(() => {
      if (!magnetic || !buttonRef.current) return;

      const button = buttonRef.current;
      let isHovering = false;

      const handleMouseMove = (e: MouseEvent) => {
        if (!isHovering) return;

        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.1;
        const deltaY = (e.clientY - centerY) * 0.1;

        button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      };

      const handleMouseEnter = () => {
        isHovering = true;
      };

      const handleMouseLeave = () => {
        isHovering = false;
        button.style.transform = 'translate(0, 0)';
      };

      button.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        button.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [magnetic]);

    return (
      <button
        ref={buttonRef}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        disabled={disabled || loading}
        className={`
        relative inline-flex items-center justify-center
        font-medium rounded-lg shadow-sm
        focus:outline-none focus:ring-2 focus:ring-offset-2
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isPressed ? 'scale-95' : 'hover:scale-105'}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
        title={tooltip}
      >
        {ripple && (
          <div className='absolute inset-0 overflow-hidden rounded-lg'>
            {ripples.map(ripple => (
              <div
                key={ripple.id}
                className='absolute bg-white opacity-30 rounded-full animate-ping'
                style={{
                  left: ripple.x - 10,
                  top: ripple.y - 10,
                  width: 20,
                  height: 20,
                  animationDuration: '600ms',
                }}
              />
            ))}
          </div>
        )}

        {loading && (
          <Icons.SettingsIcon className='animate-spin w-4 h-4 mr-2' />
        )}

        {Icon && iconPosition === 'left' && !loading && (
          <Icon className='w-4 h-4 mr-2' />
        )}

        <span className='relative z-10'>{children}</span>

        {Icon && iconPosition === 'right' && !loading && (
          <Icon className='w-4 h-4 ml-2' />
        )}
      </button>
    );
  }
);

InteractiveButton.displayName = 'InteractiveButton';

export default InteractiveButton;
