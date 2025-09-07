import { BaseComponent } from '@/types';
import { useEffect, useState } from 'react';

interface ProgressIndicatorProps extends BaseComponent {
  progress: number; // 0-100
  variant?: 'linear' | 'circular' | 'step' | 'wave' | 'pulse' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'success' | 'warning' | 'error' | 'accent' | 'rainbow';
  showPercentage?: boolean;
  animated?: boolean;
  label?: string;
  steps?: Array<{ label: string; completed: boolean }>;
}

const ProgressIndicator = ({
  progress,
  variant = 'linear',
  size = 'md',
  color = 'primary',
  showPercentage = true,
  animated = true,
  label,
  steps,
  className = '',
}: ProgressIndicatorProps) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, animated]);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'h-2';
      case 'md': return 'h-3';
      case 'lg': return 'h-4';
      case 'xl': return 'h-6';
      default: return 'h-3';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'primary': return 'from-primary-500 to-primary-600';
      case 'success': return 'from-success-500 to-success-600';
      case 'warning': return 'from-warning-500 to-warning-600';
      case 'error': return 'from-error-500 to-error-600';
      case 'accent': return 'from-accent-500 to-accent-600';
      case 'rainbow': return 'from-cyan-400 via-blue-500 to-purple-600';
      default: return 'from-primary-500 to-primary-600';
    }
  };

  const getCircularSize = () => {
    switch (size) {
      case 'sm': return 'w-16 h-16';
      case 'md': return 'w-24 h-24';
      case 'lg': return 'w-32 h-32';
      case 'xl': return 'w-40 h-40';
      default: return 'w-24 h-24';
    }
  };

  const renderLinear = () => (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${getSizeClasses()}`}>
      <div
        className={`h-full bg-gradient-to-r ${getColorClasses()} transition-all duration-1000 ease-out ${
          animated ? 'animate-pulse' : ''
        }`}
        style={{ width: `${displayProgress}%` }}
      />
    </div>
  );

  const renderCircular = () => {
    const radius = size === 'sm' ? 24 : size === 'md' ? 36 : size === 'lg' ? 48 : 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (displayProgress / 100) * circumference;

    return (
      <div className={`${getCircularSize()} relative`}>
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`text-transparent bg-gradient-to-r ${getColorClasses()} bg-clip-text transition-all duration-1000 ease-out ${
              animated ? 'animate-pulse' : ''
            }`}
            style={{
              stroke: 'url(#gradient)',
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="100%" stopColor="currentColor" />
            </linearGradient>
          </defs>
        </svg>
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {Math.round(displayProgress)}%
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderStep = () => (
    <div className="w-full">
      {steps?.map((step, index) => (
        <div key={index} className="flex items-center mb-2">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mr-3 transition-all duration-300 ${
              step.completed
                ? `bg-gradient-to-r ${getColorClasses()} text-white`
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}
          >
            {step.completed ? '' : index + 1}
          </div>
          <span
            className={`text-sm ${
              step.completed
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );

  const renderWave = () => (
    <div className="w-full relative">
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${getSizeClasses()}`}>
        <div
          className={`h-full bg-gradient-to-r ${getColorClasses()} transition-all duration-1000 ease-out ${
            animated ? 'animate-wave' : ''
          }`}
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      {animated && (
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className={`h-full bg-gradient-to-r ${getColorClasses()} opacity-30 animate-wave`}
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      )}
    </div>
  );

  const renderPulse = () => (
    <div className="w-full relative">
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${getSizeClasses()}`}>
        <div
          className={`h-full bg-gradient-to-r ${getColorClasses()} transition-all duration-1000 ease-out ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      {animated && (
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className={`h-full bg-gradient-to-r ${getColorClasses()} opacity-50 animate-ping`}
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      )}
    </div>
  );

  const renderGlow = () => (
    <div className="w-full relative">
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${getSizeClasses()}`}>
        <div
          className={`h-full bg-gradient-to-r ${getColorClasses()} transition-all duration-1000 ease-out ${
            animated ? 'animate-glow' : ''
          }`}
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      {animated && (
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className={`h-full bg-gradient-to-r ${getColorClasses()} opacity-30 animate-glow`}
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      )}
    </div>
  );

  const renderProgress = () => {
    switch (variant) {
      case 'linear': return renderLinear();
      case 'circular': return renderCircular();
      case 'step': return renderStep();
      case 'wave': return renderWave();
      case 'pulse': return renderPulse();
      case 'glow': return renderGlow();
      default: return renderLinear();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && variant !== 'circular' && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {Math.round(displayProgress)}%
            </span>
          )}
        </div>
      )}
      {renderProgress()}
    </div>
  );
};

export default ProgressIndicator;
