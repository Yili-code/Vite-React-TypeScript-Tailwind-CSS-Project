import { BaseComponent } from '@/types';

interface AboutProps extends BaseComponent {}

const About = ({ className }: AboutProps) => {
  const features = [
    {
      title: '技術棧',
      description: '本專案採用現代化的前端技術棧，包括 Vite 作為建構工具、React 18 作為 UI 框架、TypeScript 提供型別安全，以及 Tailwind CSS 實現響應式設計。',
      icon: '⚡',
    },
    {
      title: '專案特色',
      description: '專案整合了 React Router 實現單頁應用路由，提供流暢的頁面切換體驗。所有組件都使用 TypeScript 編寫，確保程式碼品質和開發效率。',
      icon: '🚀',
    },
    {
      title: '性能優化',
      description: '採用懶加載、代碼分割、記憶化等技術優化應用性能。使用 ESLint 和 Prettier 確保代碼品質，並支援暗色主題。',
      icon: '⚡',
    },
    {
      title: '開發體驗',
      description: '配置了完整的開發工具鏈，包括熱重載、型別檢查、自動格式化等，提供優質的開發體驗。',
      icon: '🛠️',
    },
  ];

  const techStack = [
    { name: 'Vite', version: '5.0.0', description: '快速建構工具' },
    { name: 'React', version: '18.2.0', description: 'UI 框架' },
    { name: 'TypeScript', version: '5.3.2', description: '型別安全' },
    { name: 'Tailwind CSS', version: '3.3.6', description: 'CSS 框架' },
    { name: 'React Router', version: '6.20.1', description: '路由管理' },
    { name: 'ESLint', version: '8.54.0', description: '代碼檢查' },
  ];

  return (
    <div className={`min-h-screen bg-gradient-secondary ${className || ''}`}>
      <div className="container mx-auto container-padding py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h1 className="text-responsive-xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-gradient">
              關於本專案
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              這是一個展示現代前端開發最佳實踐的範例專案，
              整合了多種先進技術和開發工具，為開發者提供完整的解決方案。
            </p>
          </div>
          
          {/* 功能特色 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="card-hover fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4 text-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* 技術棧 */}
          <div className="card mb-16 fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8 text-center">
              技術棧詳情
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStack.map((tech, index) => (
                <div 
                  key={tech.name}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      {tech.name}
                    </h3>
                    <span className="text-sm text-primary-600 dark:text-primary-400 font-mono">
                      v{tech.version}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* 開發理念 */}
          <div className="card text-center fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              開發理念
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg max-w-4xl mx-auto">
              這個專案展示了如何快速建立一個現代化的 React 應用程式，
              結合了最佳實踐和開發者體驗優化，為後續功能擴展奠定了堅實的基礎。
              我們注重代碼品質、性能優化、可維護性和開發者體驗，
              希望為前端開發者提供一個優秀的起點。
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium">
                🎯 型別安全
              </div>
              <div className="px-4 py-2 bg-success-100 dark:bg-success-900/30 text-success-800 dark:text-success-200 rounded-full text-sm font-medium">
                ⚡ 性能優化
              </div>
              <div className="px-4 py-2 bg-warning-100 dark:bg-warning-900/30 text-warning-800 dark:text-warning-200 rounded-full text-sm font-medium">
                🛠️ 開發體驗
              </div>
              <div className="px-4 py-2 bg-error-100 dark:bg-error-900/30 text-error-800 dark:text-error-200 rounded-full text-sm font-medium">
                🎨 現代設計
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
