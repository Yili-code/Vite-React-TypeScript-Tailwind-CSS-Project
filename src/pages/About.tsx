import { Icons } from '@/components';
import { BaseComponent } from '@/types';
import { memo, useState } from 'react';

interface AboutProps extends BaseComponent {}

const About = memo(({ className }: AboutProps) => {
  const [activeTab, setActiveTab] = useState<'features' | 'tech' | 'usage'>(
    'features'
  );

  const features = [
    {
      title: '智能任務管理',
      description:
        '完整的待辦事項管理系統，支援添加、編輯、刪除、標記完成等功能，並提供實時統計。',
      icon: Icons.SmartIcon,
    },
    {
      title: '本地數據持久化',
      description:
        '使用 localStorage 自動保存您的任務數據，即使關閉瀏覽器也不會丟失。',
      icon: Icons.StorageIcon,
    },
    {
      title: '響應式設計',
      description: '完美適配各種設備，從手機到桌面都能提供最佳的使用體驗。',
      icon: Icons.ResponsiveIcon,
    },
    {
      title: '暗色主題支援',
      description: '內建亮色和暗色主題，可根據個人喜好或系統設定自動切換。',
      icon: Icons.ThemeIcon,
    },
  ];

  const techStack = [
    {
      name: 'Vite',
      version: '5.0.0',
      description: '快速建構工具',
      icon: Icons.ViteIcon,
    },
    {
      name: 'React',
      version: '18.2.0',
      description: 'UI 框架',
      icon: Icons.ReactIcon,
    },
    {
      name: 'TypeScript',
      version: '5.3.2',
      description: '型別安全',
      icon: Icons.TypeScriptIcon,
    },
    {
      name: 'Tailwind CSS',
      version: '3.3.6',
      description: 'CSS 框架',
      icon: Icons.TailwindIcon,
    },
    {
      name: 'React Router',
      version: '6.20.1',
      description: '路由管理',
      icon: Icons.RouterIcon,
    },
    {
      name: 'ESLint',
      version: '8.54.0',
      description: '代碼檢查',
      icon: Icons.ESLintIcon,
    },
  ];

  return (
    <div className={`min-h-screen bg-gradient-secondary ${className || ''}`}>
      <div className='container mx-auto container-padding py-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12 fade-in-up'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-gradient'>
              關於智能待辦事項管理
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed'>
              一個實用的任務管理工具，結合現代前端技術，為您提供高效的工作體驗
            </p>
          </div>

          {/* 標籤頁導航 */}
          <div
            className='flex justify-center mb-8 fade-in-up'
            style={{ animationDelay: '0.1s' }}
          >
            <div className='bg-gray-200 dark:bg-gray-700 rounded-lg p-1'>
              {[
                { id: 'features', label: '功能特色', icon: Icons.SmartIcon },
                { id: 'tech', label: '技術棧', icon: Icons.SettingsIcon },
                { id: 'usage', label: '使用指南', icon: Icons.InfoIcon },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <tab.icon className='w-4 h-4 mr-2' />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 功能特色標籤頁 */}
          {activeTab === 'features' && (
            <div className='fade-in-up' style={{ animationDelay: '0.2s' }}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                {features.map(feature => (
                  <div key={feature.title} className='card-hover'>
                    <div className='text-3xl mb-3 text-primary-600 dark:text-primary-400'>
                      <feature.icon className='w-8 h-8' />
                    </div>
                    <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3'>
                      {feature.title}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 技術棧標籤頁 */}
          {activeTab === 'tech' && (
            <div className='fade-in-up' style={{ animationDelay: '0.2s' }}>
              <div className='card mb-8'>
                <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center'>
                  技術棧詳情
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {techStack.map(tech => (
                    <div
                      key={tech.name}
                      className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200'
                    >
                      <div className='flex items-center justify-between mb-2'>
                        <div className='flex items-center gap-2'>
                          <tech.icon className='w-5 h-5 text-primary-600 dark:text-primary-400' />
                          <h3 className='font-semibold text-gray-800 dark:text-gray-200'>
                            {tech.name}
                          </h3>
                        </div>
                        <span className='text-sm text-primary-600 dark:text-primary-400 font-mono'>
                          v{tech.version}
                        </span>
                      </div>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>
                        {tech.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 使用指南標籤頁 */}
          {activeTab === 'usage' && (
            <div className='fade-in-up' style={{ animationDelay: '0.2s' }}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='card'>
                  <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4'>
                    快速開始
                  </h3>
                  <ol className='space-y-3 text-gray-600 dark:text-gray-400'>
                    <li className='flex items-start gap-2'>
                      <span className='bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold'>
                        1
                      </span>
                      <span>在輸入框中輸入您的任務</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold'>
                        2
                      </span>
                      <span>點擊「添加」按鈕或按 Enter 鍵</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold'>
                        3
                      </span>
                      <span>點擊任務前的方框標記為完成</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold'>
                        4
                      </span>
                      <span>使用篩選按鈕查看不同狀態的任務</span>
                    </li>
                  </ol>
                </div>

                <div className='card'>
                  <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4'>
                    使用技巧
                  </h3>
                  <ul className='space-y-3 text-gray-600 dark:text-gray-400'>
                    <li className='flex items-start gap-2'>
                      <Icons.StorageIcon className='w-4 h-4 text-success-600 dark:text-success-400 mt-0.5 flex-shrink-0' />
                      <span>任務會自動保存到本地儲存</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <Icons.SettingsIcon className='w-4 h-4 text-success-600 dark:text-success-400 mt-0.5 flex-shrink-0' />
                      <span>支援鍵盤快捷鍵（Enter 添加任務）</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <Icons.CleanIcon className='w-4 h-4 text-success-600 dark:text-success-400 mt-0.5 flex-shrink-0' />
                      <span>可以批量清除已完成的任務</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <Icons.ThemeIcon className='w-4 h-4 text-success-600 dark:text-success-400 mt-0.5 flex-shrink-0' />
                      <span>支援暗色主題，保護眼睛</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 底部資訊 */}
          <div
            className='text-center mt-12 fade-in-up'
            style={{ animationDelay: '0.4s' }}
          >
            <div className='card max-w-2xl mx-auto'>
              <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4'>
                為什麼選擇這個工具？
              </h3>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed mb-6'>
                這不僅僅是一個待辦事項應用，更是一個展示現代前端開發技術的完整範例。
                它結合了最新的 React 技術、TypeScript 型別安全、Tailwind CSS
                設計系統，
                以及各種性能優化技術，為開發者提供了一個優秀的學習和參考範本。
              </p>
              <div className='flex flex-wrap justify-center gap-2'>
                <span className='px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-sm'>
                  實用性
                </span>
                <span className='px-3 py-1 bg-success-100 dark:bg-success-900/30 text-success-800 dark:text-success-200 rounded-full text-sm'>
                  高性能
                </span>
                <span className='px-3 py-1 bg-warning-100 dark:bg-warning-900/30 text-warning-800 dark:text-warning-200 rounded-full text-sm'>
                  易維護
                </span>
                <span className='px-3 py-1 bg-error-100 dark:bg-error-900/30 text-error-800 dark:text-error-200 rounded-full text-sm'>
                  美觀
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

About.displayName = 'About';

export default About;
