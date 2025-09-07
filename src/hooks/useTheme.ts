import { Theme } from '@/types';
import { storage } from '@/utils';
import { useCallback, useEffect, useState } from 'react';

const THEME_KEY = 'app-theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // 從本地儲存獲取主題，如果沒有則使用系統偏好
    const savedTheme = storage.get<Theme>(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    
    // 檢查系統偏好
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  // 監聽系統主題變化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // 只有在沒有手動設定主題時才跟隨系統
      if (!storage.get(THEME_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 應用主題到 DOM
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // 儲存到本地儲存
    storage.set(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setLightTheme = useCallback(() => {
    setTheme('light');
  }, []);

  const setDarkTheme = useCallback(() => {
    setTheme('dark');
  }, []);

  return {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };
}
