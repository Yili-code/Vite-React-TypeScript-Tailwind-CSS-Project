import { BaseComponent } from '@/types';
import { Link } from 'react-router-dom';

interface ErrorPageProps extends BaseComponent {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
}

const ErrorPage = ({ 
  title = '頁面不存在', 
  message = '抱歉，您訪問的頁面不存在或已被移除。',
  showHomeButton = true,
  className 
}: ErrorPageProps) => {
  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 ${className || ''}`}>
      <div className="card max-w-md mx-auto text-center">
        <div className="mb-6">
          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            404
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {message}
          </p>
        </div>
        
        {showHomeButton && (
          <Link
            to="/"
            className="btn-primary"
          >
            返回首頁
          </Link>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
