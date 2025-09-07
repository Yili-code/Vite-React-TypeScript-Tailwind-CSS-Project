import { BaseComponent } from '@/types';
import React, { useRef, useState } from 'react';

interface InteractiveButtonProps extends BaseComponent {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'magic' | 'glass' | 'neon' | 'liquid' | 'magnetic' | 'ripple' | 'flip';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const InteractiveButton = ({
  children,
  onClick,
  variant = 'magic',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}: InteractiveButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'px-4 py-2 text-sm';
      case 'md': return 'px-6 py-3 text-base';
      case 'lg': return 'px-8 py-4 text-lg';
      case 'xl': return 'px-10 py-5 text-xl';
      default: return 'px-6 py-3 text-base';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'magic':
        return 'btn-magic';
      case 'glass':
        return 'glass-button text-white hover:text-gray-900 dark:hover:text-white';
      case 'neon':
        return 'neon-border bg-transparent text-cyan-400 hover:bg-cyan-400/10';
      case 'liquid':
        return 'liquid bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700';
      case 'magnetic':
        return 'magnetic bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600';
      case 'ripple':
        return 'relative overflow-hidden bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600';
      case 'flip':
        return 'flip-card bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600';
      default:
        return 'btn-magic';
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    
    setIsPressed(true);
    
    if (variant === 'ripple') {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newRipple = {
          id: Date.now(),
          x,
          y,
        };
        setRipples(prev => [...prev, newRipple]);
        
        setTimeout(() => {
          setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        }, 600);
      }
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = () => {
    if (disabled || loading) return;
    onClick?.();
  };

  const renderRipples = () => (
    <>
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute animate-ripple bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </>
  );

  const renderContent = () => (
    <div className="flex items-center justify-center gap-2">
      {icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            icon
          )}
        </span>
      )}
      <span className={loading ? 'opacity-70' : ''}>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            icon
          )}
        </span>
      )}
    </div>
  );

  if (variant === 'flip') {
    return (
      <div className={`flip-card ${className}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front flex items-center justify-center">
            {renderContent()}
          </div>
          <div className="flip-card-back flex items-center justify-center">
            <span className="text-sm">點擊我！</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      disabled={disabled || loading}
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${isPressed ? 'scale-95' : 'scale-100'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        transition-all duration-200 ease-out
        font-semibold rounded-xl
        focus:outline-none focus:ring-4 focus:ring-primary-500/50
        ${className}
      `}
      {...props}
    >
      {variant === 'ripple' && renderRipples()}
      {renderContent()}
    </button>
  );
};

export default InteractiveButton;
