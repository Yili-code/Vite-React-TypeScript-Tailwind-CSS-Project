import React from 'react';

// 通用型別定義
export interface BaseComponent {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'data-testid'?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  role?: string;
  tabIndex?: number;
}

// 待辦事項相關型別
export interface Todo {
  readonly id: number;
  text: string;
  completed: boolean;
  readonly createdAt: string;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  dueDate?: string;
  updatedAt?: string;
  tags?: readonly string[];
  notes?: string;
  archived?: boolean;
  starred?: boolean;
  estimatedTime?: number; // 預估時間（分鐘）
  actualTime?: number; // 實際時間（分鐘）
  dependencies?: readonly number[]; // 依賴的任務 ID
  subtasks?: readonly Todo[]; // 子任務
}

export interface TodoFilters {
  status: 'all' | 'active' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  searchQuery?: string;
  dueDateRange?: {
    start: string;
    end: string;
  };
}

export interface TodoSortOptions {
  field: 'created' | 'priority' | 'dueDate' | 'updated' | 'text';
  direction: 'asc' | 'desc';
}

// 主題相關型別
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// 按鈕相關型別
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends BaseComponent {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// 導航相關型別
export interface NavItem {
  label: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// 卡片相關型別
export interface CardProps extends BaseComponent {
  title?: string;
  subtitle?: string;
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

// 表單相關型別
export interface FormFieldProps extends BaseComponent {
  label: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface InputProps extends FormFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

// 載入狀態型別
export interface LoadingState {
  isLoading: boolean;
  error?: string;
  progress?: number;
}

// API 回應型別
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  error?: string;
}

// 分頁型別
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showSizeChanger?: boolean;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
}

// 動畫相關型別
export interface AnimatedComponentProps extends BaseComponent {
  animation?: AnimationType;
  delay?: number;
  duration?: number;
}

// 路由相關型別
export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  protected?: boolean;
  title?: string;
}

// 使用者相關型別
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: 'admin' | 'user' | 'moderator';
}

// 設定相關型別
export interface AppSettings {
  theme: Theme;
  language: string;
  notifications: boolean;
  autoSave: boolean;
  defaultPriority: 'low' | 'medium' | 'high';
  defaultCategory: string;
  showCompletedTasks: boolean;
  sortBy: 'created' | 'priority' | 'dueDate' | 'updated' | 'text';
  sortDirection: 'asc' | 'desc';
}

// 工具函數型別
export type DebounceFunction<T extends (...args: unknown[]) => unknown> = (
  ...args: Parameters<T>
) => void;

export type ThrottleFunction<T extends (...args: unknown[]) => unknown> = (
  ...args: Parameters<T>
) => void;

// 事件處理器型別
export type EventHandler<T = Event> = (event: T) => void;
export type MouseEventHandler = EventHandler<React.MouseEvent>;
export type KeyboardEventHandler = EventHandler<React.KeyboardEvent>;
export type ChangeEventHandler = EventHandler<
  React.ChangeEvent<HTMLInputElement>
>;

// 鍵盤快捷鍵型別
export interface KeyboardShortcut {
  readonly key: string;
  readonly ctrlKey?: boolean;
  readonly metaKey?: boolean;
  readonly shiftKey?: boolean;
  readonly altKey?: boolean;
  readonly action: () => void;
  readonly description: string;
  readonly global?: boolean; // 是否為全域快捷鍵
  readonly preventDefault?: boolean; // 是否阻止預設行為
  readonly stopPropagation?: boolean; // 是否停止事件冒泡
}

// 統計數據型別
export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  overdue: number;
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
  byCategory: Record<string, number>;
  completionRate: number;
}

// 設定相關型別
export interface AppSettings {
  theme: Theme;
  language: string;
  notifications: boolean;
  autoSave: boolean;
  defaultPriority: 'low' | 'medium' | 'high';
  defaultCategory: string;
  showCompletedTasks: boolean;
  sortBy: 'created' | 'priority' | 'dueDate' | 'updated' | 'text';
  sortDirection: 'asc' | 'desc';
}

// 通知相關型別
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// 載入狀態型別
export interface LoadingState {
  isLoading: boolean;
  error?: string;
  progress?: number;
}

// 表單驗證型別
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
}

// 搜尋結果型別
export interface SearchResult<T> {
  items: T[];
  total: number;
  query: string;
  filters: Record<string, any>;
  sortBy: string;
  page: number;
  pageSize: number;
}

// 匯出/匯入型別
export interface ExportData {
  todos: Todo[];
  settings: AppSettings;
  version: string;
  exportedAt: string;
}

// 性能監控型別
export interface PerformanceMetrics {
  readonly fps: number;
  readonly memory: number;
  readonly renderTime: number;
  readonly componentCount: number;
  readonly reRenderCount: number;
  readonly timestamp: number;
}

// 動畫型別
export type AnimationType =
  | 'fade-in'
  | 'fade-in-up'
  | 'slide-in-right'
  | 'slide-in-left'
  | 'scale-in'
  | 'bounce';

export interface AnimationProps {
  type: AnimationType;
  delay?: number;
  duration?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

// 錯誤邊界型別
export interface ErrorBoundaryState {
  readonly hasError: boolean;
  readonly error?: Error;
  readonly errorInfo?: React.ErrorInfo;
  readonly errorId?: string;
}

// 環境變數型別
export interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_API_URL: string;
  readonly VITE_PORT: string;
  readonly VITE_HOST: string;
  readonly VITE_OPEN: string;
  readonly VITE_PREVIEW_PORT: string;
}

// 建構資訊型別
export interface BuildInfo {
  readonly version: string;
  readonly buildTime: string;
  readonly gitHash?: string;
  readonly gitBranch?: string;
  readonly environment: 'development' | 'staging' | 'production';
}

// 主題配置型別
export interface ThemeConfig {
  readonly name: string;
  readonly colors: {
    readonly primary: string;
    readonly secondary: string;
    readonly accent: string;
    readonly background: string;
    readonly surface: string;
    readonly text: string;
    readonly textSecondary: string;
  };
  readonly fonts: {
    readonly primary: string;
    readonly secondary: string;
    readonly mono: string;
  };
  readonly spacing: {
    readonly xs: string;
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
    readonly xl: string;
  };
  readonly borderRadius: {
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
    readonly xl: string;
  };
}

// 響應式斷點型別
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ResponsiveValue<T> {
  readonly xs?: T;
  readonly sm?: T;
  readonly md?: T;
  readonly lg?: T;
  readonly xl?: T;
  readonly '2xl'?: T;
}

// 表單驗證型別
export interface ValidationRule<T = unknown> {
  readonly required?: boolean;
  readonly min?: number;
  readonly max?: number;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly pattern?: RegExp;
  readonly custom?: (value: T) => string | null;
  readonly message?: string;
}

export interface FormField<T = unknown> {
  readonly name: string;
  readonly label: string;
  readonly type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio';
  readonly value: T;
  readonly error?: string;
  readonly disabled?: boolean;
  readonly required?: boolean;
  readonly placeholder?: string;
  readonly options?: readonly { label: string; value: string }[];
  readonly validation?: ValidationRule<T>;
}

// 狀態管理型別
export interface StateAction<T> {
  readonly type: string;
  readonly payload?: T;
  readonly meta?: Record<string, unknown>;
}

export interface StateReducer<T, A extends StateAction<unknown>> {
  (state: T, action: A): T;
}

// 事件系統型別
export interface EventEmitter<T = Record<string, unknown>> {
  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void;
  off<K extends keyof T>(event: K, listener: (data: T[K]) => void): void;
  emit<K extends keyof T>(event: K, data: T[K]): void;
  once<K extends keyof T>(event: K, listener: (data: T[K]) => void): void;
}

// 快取型別
export interface CacheItem<T> {
  readonly data: T;
  readonly timestamp: number;
  readonly ttl: number; // 生存時間（毫秒）
}

export interface Cache<T> {
  get(key: string): T | null;
  set(key: string, value: T, ttl?: number): void;
  delete(key: string): boolean;
  clear(): void;
  has(key: string): boolean;
  size(): number;
}

// 工具函數型別
export type Predicate<T> = (value: T) => boolean;
export type Mapper<T, U> = (value: T) => U;
export type Reducer<T, U> = (accumulator: U, currentValue: T) => U;
export type Comparator<T> = (a: T, b: T) => number;
export type AsyncFunction<T, R> = (value: T) => Promise<R>;
export type VoidFunction = () => void;
export type AsyncVoidFunction = () => Promise<void>;
