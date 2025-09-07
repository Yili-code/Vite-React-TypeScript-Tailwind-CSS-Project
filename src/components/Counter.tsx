import { useDebounce } from '@/hooks';
import { BaseComponent } from '@/types';
import React, { memo, useCallback, useState } from 'react';

interface CounterProps extends BaseComponent {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onCountChange?: (count: number) => void;
  showReset?: boolean;
  disabled?: boolean;
}

const Counter = memo<CounterProps>(({
  initialValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
  onCountChange,
  showReset = true,
  disabled = false,
  className
}) => {
  const [count, setCount] = useState(initialValue);
  const debouncedCount = useDebounce(count, 300);

  // 當防抖後的計數值改變時，通知父組件
  React.useEffect(() => {
    if (onCountChange && debouncedCount !== initialValue) {
      onCountChange(debouncedCount);
    }
  }, [debouncedCount, onCountChange, initialValue]);

  const updateCount = useCallback((newCount: number) => {
    const clampedCount = Math.max(min, Math.min(max, newCount));
    setCount(clampedCount);
  }, [min, max]);

  const increment = useCallback(() => {
    if (!disabled) {
      updateCount(count + step);
    }
  }, [count, step, disabled, updateCount]);

  const decrement = useCallback(() => {
    if (!disabled) {
      updateCount(count - step);
    }
  }, [count, step, disabled, updateCount]);

  const reset = useCallback(() => {
    if (!disabled) {
      updateCount(initialValue);
    }
  }, [disabled, initialValue, updateCount]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value)) {
        updateCount(value);
      }
    }
  }, [disabled, updateCount]);

  const isAtMin = count <= min;
  const isAtMax = count >= max;

  return (
    <div className={`card max-w-md mx-auto ${className || ''}`}>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
        計數器
      </h3>
      
      <div className="text-center mb-6">
        <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
          {count}
        </span>
        {count !== debouncedCount && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            更新中...
          </div>
        )}
      </div>

      {/* 輸入框 */}
      <div className="mb-6">
        <label htmlFor="count-input" className="label">
          直接輸入數值
        </label>
        <input
          id="count-input"
          type="number"
          value={count}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className="input text-center text-lg font-semibold"
        />
      </div>
      
      <div className="flex gap-3 justify-center">
        <button
          onClick={decrement}
          disabled={disabled || isAtMin}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="減少"
        >
          -
        </button>
        
        {showReset && (
          <button
            onClick={reset}
            disabled={disabled || count === initialValue}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="重置"
          >
            重置
          </button>
        )}
        
        <button
          onClick={increment}
          disabled={disabled || isAtMax}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="增加"
        >
          +
        </button>
      </div>

      {/* 範圍提示 */}
      {(min !== -Infinity || max !== Infinity) && (
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
          範圍: {min === -Infinity ? '無限制' : min} ~ {max === Infinity ? '無限制' : max}
        </div>
      )}
    </div>
  );
});

Counter.displayName = 'Counter';

export default Counter;
