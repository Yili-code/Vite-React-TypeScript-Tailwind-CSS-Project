import { useTheme } from '@/hooks';
import About from '@/pages/About';
import Home from '@/pages/Home';
import { NavItem } from '@/types';
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';

// 懶加載組件
const ErrorPage = lazy(() => import('@/components/ErrorPage'));

// 導航項目配置
const navItems: NavItem[] = [
  { label: '首頁', path: '/' },
  { label: '關於', path: '/about' },
];

// 錯誤回退組件
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="card max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-error-600 dark:text-error-400 mb-4">
          發生錯誤
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error.message || '應用程式發生未預期的錯誤'}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="btn-primary"
        >
          重新載入
        </button>
      </div>
    </div>
  );
}

const Navigation = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto container-padding">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
          >
            React App
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={isActive(item.path) ? 'nav-link-active' : 'nav-link-inactive'}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label={`切換到${theme === 'light' ? '暗色' : '亮色'}主題`}
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('應用程式錯誤:', error, errorInfo);
      }}
    >
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Navigation />
          <main>
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="loading-spinner w-8 h-8"></div>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
