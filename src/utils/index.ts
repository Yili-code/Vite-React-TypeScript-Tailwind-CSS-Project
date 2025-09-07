// 工具函數集合

/**
 * 防抖函數 - 在指定時間內只執行最後一次調用
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 節流函數 - 在指定時間內最多執行一次
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * 深拷貝物件
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }
  
  if (typeof obj === 'object') {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  
  return obj;
}

/**
 * 生成唯一 ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
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
      minute: '2-digit' 
    },
  }[format];
  
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
  const letterValue = letters.indexOf(idNumber[0]) + 10;
  
  let sum = Math.floor(letterValue / 10) * weights[0] + (letterValue % 10) * weights[1];
  
  for (let i = 1; i < 10; i++) {
    sum += parseInt(idNumber[i]) * weights[i + 1];
  }
  
  return sum % 10 === 0;
}

/**
 * 隨機生成密碼
 */
export function generatePassword(length: number = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
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
export function truncateString(str: string, maxLength: number, suffix: string = '...'): string {
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
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
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
 * 本地儲存工具
 */
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch {
      return defaultValue || null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('儲存到本地儲存失敗:', error);
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('從本地儲存移除失敗:', error);
    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('清空本地儲存失敗:', error);
    }
  },
};
