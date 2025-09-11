import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 任務相關圖標
export const TaskIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M9 11l3 3L22 4' />
    <path d='M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' />
  </svg>
);

export const AddIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <line x1='12' y1='5' x2='12' y2='19' />
    <line x1='5' y1='12' x2='19' y2='12' />
  </svg>
);

export const DeleteIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <polyline points='3,6 5,6 21,6' />
    <path d='M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2' />
    <line x1='10' y1='11' x2='10' y2='17' />
    <line x1='14' y1='11' x2='14' y2='17' />
  </svg>
);

export const EditIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
    <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <polyline points='20,6 9,17 4,12' />
  </svg>
);

// 優先級圖標
export const HighPriorityIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}
  >
    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
  </svg>
);

export const MediumPriorityIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}
  >
    <path d='M12 2l2.09 4.26L19 7.27l-3 2.93L17.18 15 12 12.77 6.82 15 8 10.2 5 7.27l4.91-1.01L12 2z' />
  </svg>
);

export const LowPriorityIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}
  >
    <path d='M12 2l1.09 2.26L15 5.27l-2 1.93L14.18 10 12 8.77 9.82 10 11 7.2 9 5.27l2.91-.01L12 2z' />
  </svg>
);

// 狀態圖標
export const AllIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
    <line x1='9' y1='9' x2='15' y2='15' />
    <line x1='15' y1='9' x2='9' y2='15' />
  </svg>
);

export const ActiveIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <circle cx='12' cy='12' r='10' />
    <path d='M8 12l2 2 4-4' />
  </svg>
);

export const CompletedIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
    <polyline points='22,4 12,14.01 9,11.01' />
  </svg>
);

// 通知圖標
export const SuccessIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
    <polyline points='22,4 12,14.01 9,11.01' />
  </svg>
);

export const ErrorIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <circle cx='12' cy='12' r='10' />
    <line x1='15' y1='9' x2='9' y2='15' />
    <line x1='9' y1='9' x2='15' y2='15' />
  </svg>
);

export const WarningIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' />
    <line x1='12' y1='9' x2='12' y2='13' />
    <line x1='12' y1='17' x2='12.01' y2='17' />
  </svg>
);

export const InfoIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <circle cx='12' cy='12' r='10' />
    <line x1='12' y1='16' x2='12' y2='12' />
    <line x1='12' y1='8' x2='12.01' y2='8' />
  </svg>
);

// 功能圖標
export const SearchIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <circle cx='11' cy='11' r='8' />
    <path d='M21 21l-4.35-4.35' />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <circle cx='12' cy='12' r='3' />
    <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z' />
  </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
    <polyline points='7,10 12,15 17,10' />
    <line x1='12' y1='15' x2='12' y2='3' />
  </svg>
);

export const CleanIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M3 6h18' />
    <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
    <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
  </svg>
);

export const OverdueIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <circle cx='12' cy='12' r='10' />
    <polyline points='12,6 12,12 16,14' />
  </svg>
);

// 統計圖標
export const StatsIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <line x1='18' y1='20' x2='18' y2='10' />
    <line x1='12' y1='20' x2='12' y2='4' />
    <line x1='6' y1='20' x2='6' y2='14' />
  </svg>
);

export const TotalIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
    <line x1='9' y1='9' x2='15' y2='15' />
    <line x1='15' y1='9' x2='9' y2='15' />
  </svg>
);

export const ActiveTasksIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <circle cx='12' cy='12' r='10' />
    <path d='M8 12l2 2 4-4' />
  </svg>
);

export const CompletedTasksIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
    <polyline points='22,4 12,14.01 9,11.01' />
  </svg>
);

export const OverdueTasksIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <circle cx='12' cy='12' r='10' />
    <polyline points='12,6 12,12 16,14' />
  </svg>
);

// 功能特色圖標
export const SmartIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M9 11l3 3L22 4' />
    <path d='M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' />
  </svg>
);

export const StorageIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <rect x='2' y='3' width='20' height='14' rx='2' ry='2' />
    <line x1='8' y1='21' x2='16' y2='21' />
    <line x1='12' y1='17' x2='12' y2='21' />
  </svg>
);

export const ResponsiveIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <rect x='2' y='3' width='20' height='14' rx='2' ry='2' />
    <line x1='8' y1='21' x2='16' y2='21' />
    <line x1='12' y1='17' x2='12' y2='21' />
  </svg>
);

export const ThemeIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <circle cx='12' cy='12' r='5' />
    <line x1='12' y1='1' x2='12' y2='3' />
    <line x1='12' y1='21' x2='12' y2='23' />
    <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
    <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
    <line x1='1' y1='12' x2='3' y2='12' />
    <line x1='21' y1='12' x2='23' y2='12' />
    <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
    <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
  </svg>
);

// 技術棧圖標
export const ViteIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}
  >
    <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
  </svg>
);

export const ReactIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}
  >
    <circle cx='12' cy='12' r='2' />
    <path d='M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1zm0 19a8 8 0 1 1 8-8 8 8 0 0 1-8 8z' />
  </svg>
);

export const TypeScriptIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}
  >
    <rect x='2' y='3' width='20' height='14' rx='2' ry='2' />
    <path d='M8 21l4-7 4 7' />
    <path d='M12 3l0 14' />
  </svg>
);

export const TailwindIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}
  >
    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
  </svg>
);

export const RouterIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
    <polyline points='9,22 9,12 15,12 15,22' />
  </svg>
);

export const ESLintIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}
  >
    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
  </svg>
);

// 關閉圖標
export const CloseIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <line x1='18' y1='6' x2='6' y2='18' />
    <line x1='6' y1='6' x2='18' y2='18' />
  </svg>
);

// 導出所有圖標
export const Icons = {
  TaskIcon,
  AddIcon,
  DeleteIcon,
  EditIcon,
  CheckIcon,
  HighPriorityIcon,
  MediumPriorityIcon,
  LowPriorityIcon,
  AllIcon,
  ActiveIcon,
  CompletedIcon,
  SuccessIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  SearchIcon,
  SettingsIcon,
  DownloadIcon,
  CleanIcon,
  OverdueIcon,
  StatsIcon,
  TotalIcon,
  ActiveTasksIcon,
  CompletedTasksIcon,
  OverdueTasksIcon,
  SmartIcon,
  StorageIcon,
  ResponsiveIcon,
  ThemeIcon,
  ViteIcon,
  ReactIcon,
  TypeScriptIcon,
  TailwindIcon,
  RouterIcon,
  ESLintIcon,
  CloseIcon,
};
