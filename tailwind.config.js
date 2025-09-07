/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  // 啟用暗色主題
  darkMode: 'class',
  
  theme: {
    extend: {
      // ===========================================
      // 字體配置
      // ===========================================
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'serif': ['Georgia', 'Times New Roman', 'serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },

      // ===========================================
      // 顏色系統
      // ===========================================
      colors: {
        // 主色調 - 現代藍色系
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        
        // 次要色調 - 中性灰色系
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        
        // 強調色 - 紫色系
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        
        // 語意化顏色
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        
        // 表面顏色
        surface: {
          light: '#ffffff',
          dark: '#0f0f0f',
          glass: 'rgba(255, 255, 255, 0.1)',
          'glass-dark': 'rgba(0, 0, 0, 0.1)',
        },
      },

      // ===========================================
      // 容器配置
      // ===========================================
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },

      // ===========================================
      // 間距系統
      // ===========================================
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },

      // ===========================================
      // 響應式斷點
      // ===========================================
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },

      // ===========================================
      // 動畫配置
      // ===========================================
      transitionDuration: {
        '0': '0ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '1000': '1000ms',
      },

      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'snappy': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      animation: {
        // 基本動畫
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'fade-in-left': 'fadeInLeft 0.5s ease-out',
        'fade-in-right': 'fadeInRight 0.5s ease-out',
        
        // 滑動動畫
        'slide-in-up': 'slideInUp 0.3s ease-out',
        'slide-in-down': 'slideInDown 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        
        // 縮放動畫
        'scale-in': 'scaleIn 0.3s ease-out',
        'scale-out': 'scaleOut 0.3s ease-in',
        'zoom-in': 'zoomIn 0.2s ease-out',
        'zoom-out': 'zoomOut 0.2s ease-in',
        
        // 彈跳動畫
        'bounce-in': 'bounceIn 0.6s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        
        // 旋轉動畫
        'spin-slow': 'spin 3s linear infinite',
        'rotate-in': 'rotateIn 0.5s ease-out',
        
        // 特殊效果
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'shake': 'shake 0.5s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
        
        // 進階動畫
        'morph': 'morph 0.3s ease-in-out',
        'flip': 'flip 0.6s ease-in-out',
        'elastic': 'elastic 0.6s ease-out',
        'magnetic': 'magnetic 0.3s ease-out',
        'ripple': 'ripple 0.6s ease-out',
        
        // 文字動畫
        'typewriter': 'typewriter 2s steps(40) 1s both',
        'blink': 'blink 1s infinite',
        
        // 生命週期動畫
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        
        // 視覺效果
        'rainbow': 'rainbow 3s linear infinite',
        'neon': 'neon 2s ease-in-out infinite alternate',
        'hologram': 'hologram 2s ease-in-out infinite',
      },

      keyframes: {
        // 淡入動畫
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        
        // 滑動動畫
        slideInUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        
        // 縮放動畫
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.9)' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        zoomOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.5)', opacity: '0' },
        },
        
        // 彈跳動畫
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        
        // 旋轉動畫
        rotateIn: {
          '0%': { transform: 'rotate(-180deg) scale(0.5)', opacity: '0' },
          '100%': { transform: 'rotate(0deg) scale(1)', opacity: '1' },
        },
        
        // 特殊效果
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        
        // 進階動畫
        morph: {
          '0%': { borderRadius: '50%', transform: 'scale(0.8)' },
          '50%': { borderRadius: '20%', transform: 'scale(1.1)' },
          '100%': { borderRadius: '50%', transform: 'scale(1)' },
        },
        flip: {
          '0%': { transform: 'perspective(400px) rotateY(0)' },
          '40%': { transform: 'perspective(400px) rotateY(-90deg)' },
          '60%': { transform: 'perspective(400px) rotateY(-90deg)' },
          '100%': { transform: 'perspective(400px) rotateY(0)' },
        },
        elastic: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '70%': { transform: 'scale(0.9)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        magnetic: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(2px, -2px) scale(1.05)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        
        // 文字動畫
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        
        // 生命週期動畫
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(1)' },
        },
        
        // 視覺效果
        rainbow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        neon: {
          '0%': { 
            textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6',
            color: '#fff'
          },
          '100%': { 
            textShadow: '0 0 2px #fff, 0 0 5px #fff, 0 0 8px #0073e6, 0 0 12px #0073e6',
            color: '#0073e6'
          },
        },
        hologram: {
          '0%': { 
            transform: 'perspective(1000px) rotateX(0deg)',
            filter: 'hue-rotate(0deg)'
          },
          '50%': { 
            transform: 'perspective(1000px) rotateX(5deg)',
            filter: 'hue-rotate(180deg)'
          },
          '100%': { 
            transform: 'perspective(1000px) rotateX(0deg)',
            filter: 'hue-rotate(360deg)'
          },
        },
      },

      // ===========================================
      // 陰影系統
      // ===========================================
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'hard': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.4)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },

      // ===========================================
      // 背景模糊
      // ===========================================
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '40px',
      },

      // ===========================================
      // 邊框圓角
      // ===========================================
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },

      // ===========================================
      // 字體大小
      // ===========================================
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },

      // ===========================================
      // 行高
      // ===========================================
      lineHeight: {
        '3': '.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
      },

      // ===========================================
      // 字重
      // ===========================================
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },

      // ===========================================
      // 透明度
      // ===========================================
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '65': '0.65',
        '85': '0.85',
      },

      // ===========================================
      // 漸變
      // ===========================================
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        'gradient-aurora': 'linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)',
        'gradient-sunset': 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
      },
    },
  },

  // ===========================================
  // 插件配置
  // ===========================================
  plugins: [
    // 自定義工具類和組件插件
    function({ addUtilities, addComponents, theme, addVariant }) {
      // 添加自定義工具類
      addUtilities({
        // 文字陰影
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0,0,0,0.10)',
        },
        '.text-shadow-md': {
          textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
        },
        '.text-shadow-lg': {
          textShadow: '0 15px 35px rgba(0,0,0,0.12), 0 5px 15px rgba(0,0,0,0.07)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
        
        // 滾動條樣式
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.scrollbar-default': {
          '-ms-overflow-style': 'auto',
          'scrollbar-width': 'auto',
          '&::-webkit-scrollbar': {
            display: 'block'
          }
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme('colors.gray.300'),
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: theme('colors.gray.400'),
          },
        },
        
        // 選擇樣式
        '.select-none': {
          userSelect: 'none',
        },
        '.select-text': {
          userSelect: 'text',
        },
        '.select-all': {
          userSelect: 'all',
        },
        '.select-auto': {
          userSelect: 'auto',
        },
        
        // 游標樣式
        '.cursor-grab': {
          cursor: 'grab',
        },
        '.cursor-grabbing': {
          cursor: 'grabbing',
        },
        
        // 過渡效果
        '.transition-all': {
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '150ms',
        },
        
        // 變換原點
        '.origin-center': {
          transformOrigin: 'center',
        },
        '.origin-top': {
          transformOrigin: 'top',
        },
        '.origin-bottom': {
          transformOrigin: 'bottom',
        },
        '.origin-left': {
          transformOrigin: 'left',
        },
        '.origin-right': {
          transformOrigin: 'right',
        },
      });

      // 添加自定義組件
      addComponents({
        // 按鈕組件
        '.btn': {
          '@apply inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed': {},
        },
        '.btn-sm': {
          '@apply px-3 py-1.5 text-xs': {},
        },
        '.btn-lg': {
          '@apply px-6 py-3 text-base': {},
        },
        '.btn-xl': {
          '@apply px-8 py-4 text-lg': {},
        },
        '.btn-primary': {
          '@apply btn bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 active:bg-primary-800': {},
        },
        '.btn-secondary': {
          '@apply btn bg-secondary-200 text-secondary-800 hover:bg-secondary-300 focus:ring-secondary-500 active:bg-secondary-400': {},
        },
        '.btn-success': {
          '@apply btn bg-success-600 text-white hover:bg-success-700 focus:ring-success-500 active:bg-success-800': {},
        },
        '.btn-warning': {
          '@apply btn bg-warning-600 text-white hover:bg-warning-700 focus:ring-warning-500 active:bg-warning-800': {},
        },
        '.btn-error': {
          '@apply btn bg-error-600 text-white hover:bg-error-700 focus:ring-error-500 active:bg-error-800': {},
        },
        '.btn-outline': {
          '@apply btn border-2 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800': {},
        },
        '.btn-ghost': {
          '@apply btn border-0 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700': {},
        },
        
        // 卡片組件
        '.card': {
          '@apply bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200': {},
        },
        '.card-hover': {
          '@apply card hover:shadow-medium hover:-translate-y-1': {},
        },
        '.card-interactive': {
          '@apply card-hover cursor-pointer active:scale-95': {},
        },
        
        // 輸入框組件
        '.input': {
          '@apply block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200': {},
        },
        '.input-sm': {
          '@apply px-2 py-1 text-sm': {},
        },
        '.input-lg': {
          '@apply px-4 py-3 text-lg': {},
        },
        '.input-error': {
          '@apply input border-error-500 focus:ring-error-500 focus:border-error-500': {},
        },
        '.input-success': {
          '@apply input border-success-500 focus:ring-success-500 focus:border-success-500': {},
        },
        
        // 標籤組件
        '.label': {
          '@apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1': {},
        },
        '.label-required': {
          '@apply label after:content-["*"] after:text-error-500 after:ml-1': {},
        },
        
        // 徽章組件
        '.badge': {
          '@apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium': {},
        },
        '.badge-primary': {
          '@apply badge bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200': {},
        },
        '.badge-secondary': {
          '@apply badge bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200': {},
        },
        '.badge-success': {
          '@apply badge bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200': {},
        },
        '.badge-warning': {
          '@apply badge bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200': {},
        },
        '.badge-error': {
          '@apply badge bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200': {},
        },
        
        // 載入動畫
        '.loading': {
          '@apply animate-spin rounded-full border-2 border-gray-300 border-t-primary-600': {},
        },
        '.loading-sm': {
          '@apply loading w-4 h-4': {},
        },
        '.loading-md': {
          '@apply loading w-6 h-6': {},
        },
        '.loading-lg': {
          '@apply loading w-8 h-8': {},
        },
        
        // 分隔線
        '.divider': {
          '@apply border-t border-gray-200 dark:border-gray-700 my-4': {},
        },
        '.divider-vertical': {
          '@apply border-l border-gray-200 dark:border-gray-700 mx-4 h-full': {},
        },
        
        // 容器
        '.container-fluid': {
          '@apply w-full px-4 mx-auto': {},
        },
        '.container-sm': {
          '@apply container-fluid max-w-sm': {},
        },
        '.container-md': {
          '@apply container-fluid max-w-md': {},
        },
        '.container-lg': {
          '@apply container-fluid max-w-lg': {},
        },
        '.container-xl': {
          '@apply container-fluid max-w-xl': {},
        },
        '.container-2xl': {
          '@apply container-fluid max-w-2xl': {},
        },
      });

      // 添加自定義變體
      addVariant('hocus', ['&:hover', '&:focus']);
      addVariant('group-hocus', ['.group:hover &', '.group:focus &']);
      addVariant('not-disabled', '&:not(:disabled)');
      addVariant('not-first', '&:not(:first-child)');
      addVariant('not-last', '&:not(:last-child)');
      addVariant('only-child', '&:only-child');
      addVariant('first-of-type', '&:first-of-type');
      addVariant('last-of-type', '&:last-of-type');
      addVariant('odd', '&:nth-child(odd)');
      addVariant('even', '&:nth-child(even)');
    },
  ],
}