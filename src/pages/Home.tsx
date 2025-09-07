import Counter from '@/components/Counter';
import { BaseComponent } from '@/types';
import { useCallback, useState } from 'react';

interface HomeProps extends BaseComponent {}

const Home = ({ className }: HomeProps) => {
  const [counterValue, setCounterValue] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleCounterChange = useCallback((count: number) => {
    setCounterValue(count);
  }, []);

  const toggleAdvanced = useCallback(() => {
    setShowAdvanced(prev => !prev);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-primary ${className || ''}`}>
      <div className="container mx-auto container-padding py-16">
        <div className="text-center mb-12 fade-in-up">
          <h1 className="text-responsive-xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-gradient">
            歡迎來到 React 專案
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            這是一個使用 Vite + React + TypeScript + Tailwind CSS 建構的現代化前端應用程式。
            下方是一個互動式計數器組件，展示 React 的狀態管理功能。
          </p>
        </div>
        
        <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Counter 
            onCountChange={handleCounterChange}
            min={-100}
            max={100}
            step={1}
          />
        </div>

        {/* 進階功能區域 */}
        <div className="mt-12 text-center fade-in-up" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={toggleAdvanced}
            className="btn-secondary mb-6"
          >
            {showAdvanced ? '隱藏' : '顯示'} 進階功能
          </button>

          {showAdvanced && (
            <div className="card max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                計數器資訊
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <span className="text-gray-600 dark:text-gray-400">目前數值:</span>
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {counterValue}
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-gray-600 dark:text-gray-400">數值狀態:</span>
                  <div className="text-lg font-semibold">
                    {counterValue === 0 ? (
                      <span className="text-gray-500 dark:text-gray-400">零</span>
                    ) : counterValue > 0 ? (
                      <span className="text-success-600 dark:text-success-400">正數</span>
                    ) : (
                      <span className="text-error-600 dark:text-error-400">負數</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-16 text-center fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-gray-500 dark:text-gray-400">
            點擊上方按鈕來體驗計數器的功能，或直接輸入數值
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
