import { Theme } from '@/types';
import { storage } from '@/utils';
import { useCallback, useEffect, useRef, useState } from 'react';

const THEME_KEY = 'app-theme';

/**
 * 主題管理 Hook
 * @returns 主題相關的狀態和方法
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // 從本地儲存獲取主題，如果沒有則使用系統偏好
    const savedTheme = storage.get<Theme>(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    
    // 檢查系統偏好
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  const hasManualOverride = useRef(false);

  // 監聽系統主題變化
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // 只有在沒有手動設定主題時才跟隨系統
      if (!hasManualOverride.current) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 應用主題到 DOM
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    
    // 移除舊的主題類別
    root.classList.remove('light', 'dark');
    // 添加新的主題類別
    root.classList.add(theme);
    
    // 儲存到本地儲存
    storage.set(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    hasManualOverride.current = true;
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setLightTheme = useCallback(() => {
    hasManualOverride.current = true;
    setTheme('light');
  }, []);

  const setDarkTheme = useCallback(() => {
    hasManualOverride.current = true;
    setTheme('dark');
  }, []);

  const resetToSystem = useCallback(() => {
    hasManualOverride.current = false;
    storage.remove(THEME_KEY);
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  return {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    resetToSystem,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };
}
