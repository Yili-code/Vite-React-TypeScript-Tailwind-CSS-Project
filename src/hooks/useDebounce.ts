import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 防抖 Hook - 在指定延遲後更新值
 * @param value 要防抖的值
 * @param delay 延遲時間（毫秒）
 * @returns 防抖後的值
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<number | null>(null);

  const updateDebouncedValue = useCallback(() => {
    setDebouncedValue(value);
  }, [value]);

  useEffect(() => {
    // 清除之前的定時器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 設置新的定時器
    timeoutRef.current = setTimeout(updateDebouncedValue, delay);

    // 清理函數
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, updateDebouncedValue]);

  return debouncedValue;
}
