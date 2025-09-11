import React, { memo, useCallback, useEffect, useState } from 'react';

interface ProgressIndicatorProps {
  progress: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  variant?: 'circular' | 'linear';
  color?: 'primary' | 'success' | 'warning' | 'error';
  showPercentage?: boolean;
  animated?: boolean;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = memo(
  ({
    progress,
    size = 'md',
    variant = 'circular',
    color = 'primary',
    showPercentage = true,
    animated = true,
    className = '',
  }) => {
    const [displayProgress, setDisplayProgress] = useState(0);

    const sizeClasses = {
      sm: variant === 'circular' ? 'w-8 h-8' : 'h-2',
      md: variant === 'circular' ? 'w-12 h-12' : 'h-3',
      lg: variant === 'circular' ? 'w-16 h-16' : 'h-4',
    };

    const colorClasses = {
      primary: 'text-primary-600',
      success: 'text-success-600',
      warning: 'text-warning-600',
      error: 'text-error-600',
    };

    const bgColorClasses = {
      primary: 'bg-primary-100 dark:bg-primary-900/20',
      success: 'bg-success-100 dark:bg-success-900/20',
      warning: 'bg-warning-100 dark:bg-warning-900/20',
      error: 'bg-error-100 dark:bg-error-900/20',
    };

    const animateProgress = useCallback(() => {
      if (!animated) {
        setDisplayProgress(progress);
        return;
      }

      const startTime = performance.now();
      const startProgress = displayProgress;
      const targetProgress = progress;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const duration = 500; // 500ms animation
        const progressRatio = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progressRatio, 3);
        const currentProgress =
          startProgress + (targetProgress - startProgress) * easeOut;

        setDisplayProgress(currentProgress);

        if (progressRatio < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [progress, displayProgress, animated]);

    useEffect(() => {
      animateProgress();
    }, [animateProgress]);

    if (variant === 'circular') {
      const radius = size === 'sm' ? 12 : size === 'md' ? 20 : 28;
      const strokeWidth = size === 'sm' ? 2 : size === 'md' ? 3 : 4;
      const circumference = 2 * Math.PI * radius;
      const strokeDasharray = circumference;
      const strokeDashoffset =
        circumference - (displayProgress / 100) * circumference;

      return (
        <div className={`relative ${sizeClasses[size]} ${className}`}>
          <svg
            className='w-full h-full transform -rotate-90'
            viewBox={`0 0 ${(radius + strokeWidth) * 2} ${(radius + strokeWidth) * 2}`}
          >
            {/* Background circle */}
            <circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              stroke='currentColor'
              strokeWidth={strokeWidth}
              fill='none'
              className={`${bgColorClasses[color]} opacity-30`}
            />
            {/* Progress circle */}
            <circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              stroke='currentColor'
              strokeWidth={strokeWidth}
              fill='none'
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap='round'
              className={`${colorClasses[color]} transition-all duration-300`}
              style={{
                strokeDasharray,
                strokeDashoffset,
              }}
            />
          </svg>

          {showPercentage && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className={`text-xs font-semibold ${colorClasses[color]}`}>
                {Math.round(displayProgress)}%
              </span>
            </div>
          )}
        </div>
      );
    }

    // Linear variant
    return (
      <div className={`w-full ${className}`}>
        <div
          className={`w-full ${sizeClasses[size]} ${bgColorClasses[color]} rounded-full overflow-hidden`}
        >
          <div
            className={`h-full ${colorClasses[color]} transition-all duration-300 ease-out rounded-full`}
            style={{
              width: `${displayProgress}%`,
              transition: animated ? 'width 0.3s ease-out' : 'none',
            }}
          />
        </div>

        {showPercentage && (
          <div className='mt-1 text-right'>
            <span className={`text-xs font-semibold ${colorClasses[color]}`}>
              {Math.round(displayProgress)}%
            </span>
          </div>
        )}
      </div>
    );
  }
);

ProgressIndicator.displayName = 'ProgressIndicator';

export default ProgressIndicator;
