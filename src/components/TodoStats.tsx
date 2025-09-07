import { BaseComponent, Todo, TodoStats as TodoStatsType } from '@/types';
import React from 'react';

interface TodoStatsProps extends BaseComponent {
  todos: Todo[];
  showDetails?: boolean;
}

const TodoStats = ({ todos, showDetails = false, className }: TodoStatsProps) => {
  const stats: TodoStatsType = React.useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    const overdue = todos.filter(todo => 
      !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date()
    ).length;

    const byPriority = {
      high: todos.filter(todo => todo.priority === 'high' && !todo.completed).length,
      medium: todos.filter(todo => todo.priority === 'medium' && !todo.completed).length,
      low: todos.filter(todo => todo.priority === 'low' && !todo.completed).length,
    };

    const byCategory = todos.reduce((acc, todo) => {
      if (todo.category && !todo.completed) {
        acc[todo.category] = (acc[todo.category] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      active,
      overdue,
      byPriority,
      byCategory,
      completionRate
    };
  }, [todos]);

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return 'text-success-600 dark:text-success-400';
    if (rate >= 60) return 'text-warning-600 dark:text-warning-400';
    return 'text-error-600 dark:text-error-400';
  };

  const getPriorityColor = (priority: keyof typeof stats.byPriority) => {
    switch (priority) {
      case 'high': return 'text-error-600 dark:text-error-400';
      case 'medium': return 'text-warning-600 dark:text-warning-400';
      case 'low': return 'text-success-600 dark:text-success-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className={`card ${className || ''}`}>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        任務統計
      </h3>
      
      {/* 基本統計 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {stats.total}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">總任務</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-warning-600 dark:text-warning-400">
            {stats.active}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">待完成</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success-600 dark:text-success-400">
            {stats.completed}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">已完成</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-error-600 dark:text-error-400">
            {stats.overdue}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">已過期</div>
        </div>
      </div>

      {/* 完成率 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">完成率</span>
          <span className={`text-sm font-bold ${getCompletionColor(stats.completionRate)}`}>
            {stats.completionRate}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              stats.completionRate >= 80 ? 'bg-success-500' :
              stats.completionRate >= 60 ? 'bg-warning-500' : 'bg-error-500'
            }`}
            style={{ width: `${stats.completionRate}%` }}
          />
        </div>
      </div>

      {showDetails && (
        <>
          {/* 優先級分佈 */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              優先級分佈
            </h4>
            <div className="space-y-2">
              {Object.entries(stats.byPriority).map(([priority, count]) => (
                <div key={priority} className="flex justify-between items-center">
                  <span className={`text-sm ${getPriorityColor(priority as keyof typeof stats.byPriority)}`}>
                    {priority === 'high' ? '高' : priority === 'medium' ? '中' : '低'}
                  </span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 分類分佈 */}
          {Object.keys(stats.byCategory).length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                分類分佈
              </h4>
              <div className="space-y-2">
                {Object.entries(stats.byCategory)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([category, count]) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {category}
                      </span>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {count}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TodoStats;
