import React, { memo, useCallback, useEffect, useState } from 'react';

interface CounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  animated?: boolean;
  onComplete?: () => void;
}

const Counter: React.FC<CounterProps> = memo(
  ({
    value,
    duration = 1000,
    decimals = 0,
    prefix = '',
    suffix = '',
    className = '',
    animated = true,
    onComplete,
  }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const animateValue = useCallback(
      (startValue: number, endValue: number) => {
        if (!animated) {
          setDisplayValue(endValue);
          onComplete?.();
          return;
        }

        setIsAnimating(true);
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Easing function (ease-out cubic)
          const easeOutCubic = 1 - Math.pow(1 - progress, 3);
          const currentValue =
            startValue + (endValue - startValue) * easeOutCubic;

          setDisplayValue(currentValue);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setIsAnimating(false);
            onComplete?.();
          }
        };

        requestAnimationFrame(animate);
      },
      [duration, animated, onComplete]
    );

    useEffect(() => {
      animateValue(displayValue, value);
    }, [value, animateValue]);

    const formatValue = useCallback(
      (val: number) => {
        return val.toFixed(decimals);
      },
      [decimals]
    );

    return (
      <span className={`${className} ${isAnimating ? 'animate-pulse' : ''}`}>
        {prefix}
        {formatValue(displayValue)}
        {suffix}
      </span>
    );
  }
);

Counter.displayName = 'Counter';

export default Counter;
