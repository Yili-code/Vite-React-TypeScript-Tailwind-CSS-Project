import { storage } from '@/utils';
import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // 獲取初始值
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = storage.get<T>(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.error(`讀取本地儲存失敗 (${key}):`, error);
      return initialValue;
    }
  });

  // 設定值到本地儲存
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        storage.set(key, valueToStore);
      } catch (error) {
        console.error(`儲存到本地儲存失敗 (${key}):`, error);
      }
    },
    [key, storedValue]
  );

  // 移除值
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      storage.remove(key);
    } catch (error) {
      console.error(`從本地儲存移除失敗 (${key}):`, error);
    }
  }, [key, initialValue]);

  // 監聽其他標籤頁的變化
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`解析本地儲存資料失敗 (${key}):`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
}
