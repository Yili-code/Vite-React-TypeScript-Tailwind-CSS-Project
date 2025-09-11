// 工具函數集合

/**
 * 防抖函數 - 在指定時間內只執行最後一次調用
 * @param func 要防抖的函數
 * @param wait 等待時間（毫秒）
 * @param immediate 是否立即執行第一次調用
 * @returns 防抖後的函數
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: number | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);

    if (callNow) func(...args);
  };
}

/**
 * 節流函數 - 在指定時間內最多執行一次
 * @param func 要節流的函數
 * @param limit 時間限制（毫秒）
 * @param options 選項配置
 * @returns 節流後的函數
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): (...args: Parameters<T>) => void {
  const { leading = true, trailing = true } = options;
  let inThrottle: boolean;
  let lastArgs: Parameters<T> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      if (leading) {
        func(...args);
      } else {
        lastArgs = args;
      }
      inThrottle = true;
      setTimeout(() => {
        if (trailing && lastArgs) {
          func(...lastArgs);
          lastArgs = null;
        }
        inThrottle = false;
      }, limit);
    } else {
      lastArgs = args;
    }
  };
}

/**
 * 深拷貝物件 - 支援循環引用檢測
 * @param obj 要拷貝的物件
 * @param seen 已訪問的物件映射（用於檢測循環引用）
 * @returns 深拷貝後的物件
 */
export function deepClone<T>(obj: T, seen = new WeakMap()): T {
  // 處理基本類型
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 處理循環引用
  if (seen.has(obj)) {
    return seen.get(obj);
  }

  // 處理 Date 物件
  if (obj instanceof Date) {
    const cloned = new Date(obj.getTime()) as unknown as T;
    seen.set(obj, cloned);
    return cloned;
  }

  // 處理 RegExp 物件
  if (obj instanceof RegExp) {
    const cloned = new RegExp(obj.source, obj.flags) as unknown as T;
    seen.set(obj, cloned);
    return cloned;
  }

  // 處理 Array
  if (Array.isArray(obj)) {
    const cloned = [] as unknown as T;
    seen.set(obj, cloned);
    (cloned as unknown as unknown[]).push(
      ...obj.map(item => deepClone(item, seen))
    );
    return cloned;
  }

  // 處理普通物件
  if (typeof obj === 'object') {
    const cloned = {} as T;
    seen.set(obj, cloned);

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        (cloned as Record<string, unknown>)[key] = deepClone(
          (obj as Record<string, unknown>)[key],
          seen
        );
      }
    }
    return cloned;
  }

  return obj;
}

/**
 * 生成唯一 ID
 * @param prefix 前綴字串
 * @param length ID 長度
 * @returns 唯一 ID
 */
export function generateId(prefix = '', length = 12): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = prefix;

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result + Date.now().toString(36);
}

/**
 * 格式化日期
 */
export function formatDate(
  date: Date | string | number,
  format: 'short' | 'long' | 'time' | 'datetime' = 'short'
): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return '無效日期';
  }

  const options: Intl.DateTimeFormatOptions = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    datetime: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  }[format] as Intl.DateTimeFormatOptions;

  return d.toLocaleDateString('zh-TW', options);
}

/**
 * 格式化數字
 */
export function formatNumber(
  num: number,
  options: {
    decimals?: number;
    thousands?: boolean;
    currency?: string;
  } = {}
): string {
  const { decimals = 0, thousands = true, currency } = options;

  const formatOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: thousands,
  };

  if (currency) {
    formatOptions.style = 'currency';
    formatOptions.currency = currency;
  }

  return num.toLocaleString('zh-TW', formatOptions);
}

/**
 * 驗證電子郵件格式
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 驗證手機號碼格式
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^09\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * 驗證身分證字號格式
 */
export function isValidIdNumber(idNumber: string): boolean {
  const idRegex = /^[A-Z][12]\d{8}$/;
  if (!idRegex.test(idNumber)) return false;

  const weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];
  const letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
  const firstChar = idNumber[0];
  if (!firstChar) return false;

  const letterValue = letters.indexOf(firstChar) + 10;

  let sum =
    Math.floor(letterValue / 10) * weights[0]! +
    (letterValue % 10) * weights[1]!;

  for (let i = 1; i < 10; i++) {
    const char = idNumber[i];
    if (!char) return false;
    sum += parseInt(char) * weights[i + 1]!;
  }

  return sum % 10 === 0;
}

/**
 * 隨機生成密碼
 */
export function generatePassword(length: number = 12): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';

  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return password;
}

/**
 * 計算字串長度（支援中文字元）
 */
export function getStringLength(str: string): number {
  let length = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    if (char.match(/[\u4e00-\u9fa5]/)) {
      length += 2; // 中文字元算 2 個字元
    } else {
      length += 1;
    }
  }
  return length;
}

/**
 * 截取字串（支援中文字元）
 */
export function truncateString(
  str: string,
  maxLength: number,
  suffix: string = '...'
): string {
  if (getStringLength(str) <= maxLength) {
    return str;
  }

  let result = '';
  let length = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    const charLength = char.match(/[\u4e00-\u9fa5]/) ? 2 : 1;

    if (length + charLength > maxLength) {
      break;
    }

    result += char;
    length += charLength;
  }

  return result + suffix;
}

/**
 * 獲取檔案副檔名
 */
export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

/**
 * 格式化檔案大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 檢查是否為空值
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * 等待指定時間
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 重試函數
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt === maxAttempts) {
        throw lastError;
      }
      await sleep(delay * attempt);
    }
  }

  throw lastError!;
}

/**
 * 合併類名
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * 本地儲存工具 - 增強版本
 */
export const storage = {
  /**
   * 獲取本地儲存的值
   * @param key 鍵名
   * @param defaultValue 預設值
   * @returns 儲存的值或預設值
   */
  get: <T>(key: string, defaultValue?: T): T | null => {
    if (typeof window === 'undefined') {
      return defaultValue || null;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error(`讀取本地儲存失敗 (${key}):`, error);
      return defaultValue || null;
    }
  },

  /**
   * 設定本地儲存的值
   * @param key 鍵名
   * @param value 要儲存的值
   * @returns 是否成功儲存
   */
  set: <T>(key: string, value: T): boolean => {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`儲存到本地儲存失敗 (${key}):`, error);
      return false;
    }
  },

  /**
   * 移除本地儲存的值
   * @param key 鍵名
   * @returns 是否成功移除
   */
  remove: (key: string): boolean => {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`從本地儲存移除失敗 (${key}):`, error);
      return false;
    }
  },

  /**
   * 清空所有本地儲存
   * @returns 是否成功清空
   */
  clear: (): boolean => {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('清空本地儲存失敗:', error);
      return false;
    }
  },

  /**
   * 檢查鍵是否存在
   * @param key 鍵名
   * @returns 是否存在
   */
  has: (key: string): boolean => {
    if (typeof window === 'undefined') {
      return false;
    }

    return localStorage.getItem(key) !== null;
  },

  /**
   * 獲取所有鍵名
   * @returns 所有鍵名數組
   */
  keys: (): string[] => {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error('獲取本地儲存鍵名失敗:', error);
      return [];
    }
  },

  /**
   * 獲取儲存大小（位元組）
   * @returns 儲存大小
   */
  size: (): number => {
    if (typeof window === 'undefined') {
      return 0;
    }

    try {
      let total = 0;
      for (const key in localStorage) {
        if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
          total += localStorage[key].length + key.length;
        }
      }
      return total;
    } catch (error) {
      console.error('計算本地儲存大小失敗:', error);
      return 0;
    }
  },
};
