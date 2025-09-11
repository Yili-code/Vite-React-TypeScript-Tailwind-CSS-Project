import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 節流 Hook - 在指定時間內最多執行一次更新
 * @param value 要節流的值
 * @param delay 節流延遲時間（毫秒）
 * @returns 節流後的值
 */
export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());
  const timeoutRef = useRef<number | null>(null);

  const updateThrottledValue = useCallback(() => {
    lastExecuted.current = Date.now();
    setThrottledValue(value);
  }, [value]);

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecuted.current;

    if (timeSinceLastExecution >= delay) {
      // 立即執行
      updateThrottledValue();
    } else {
      // 清除之前的定時器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 設置定時器在剩餘時間後執行
      const remainingTime = delay - timeSinceLastExecution;
      timeoutRef.current = setTimeout(updateThrottledValue, remainingTime);
    }

    // 清理函數
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, updateThrottledValue]);

  return throttledValue;
}
