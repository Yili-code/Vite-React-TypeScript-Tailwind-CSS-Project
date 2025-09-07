// 通用型別定義
export interface BaseComponent {
  className?: string;
  children?: React.ReactNode;
}

// 主題相關型別
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// 按鈕相關型別
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
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
export type AnimationType = 'fade-in' | 'fade-in-up' | 'slide-in-right' | 'slide-in-left';

export interface AnimatedComponentProps extends BaseComponent {
  animation?: AnimationType;
  delay?: number;
  duration?: number;
}

// 錯誤邊界型別
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
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
export type ChangeEventHandler = EventHandler<React.ChangeEvent<HTMLInputElement>>;
