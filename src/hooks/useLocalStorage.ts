import { storage } from '@/utils';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 本地儲存 Hook
 * @param key 儲存鍵名
 * @param initialValue 初始值
 * @returns [值, 設定函數, 移除函數]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // 使用 ref 來避免不必要的重新渲染
  const keyRef = useRef(key);
  const initialValueRef = useRef(initialValue);

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

  // 更新 refs
  useEffect(() => {
    keyRef.current = key;
    initialValueRef.current = initialValue;
  }, [key, initialValue]);

  // 設定值到本地儲存
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        storage.set(keyRef.current, valueToStore);
      } catch (error) {
        console.error(`儲存到本地儲存失敗 (${keyRef.current}):`, error);
      }
    },
    [storedValue]
  );

  // 移除值
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValueRef.current);
      storage.remove(keyRef.current);
    } catch (error) {
      console.error(`從本地儲存移除失敗 (${keyRef.current}):`, error);
    }
  }, []);

  // 監聽其他標籤頁的變化
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === keyRef.current && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue);
          setStoredValue(newValue);
        } catch (error) {
          console.error(`解析本地儲存資料失敗 (${keyRef.current}):`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return [storedValue, setValue, removeValue];
}
