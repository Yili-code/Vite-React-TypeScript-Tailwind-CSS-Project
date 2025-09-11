import { Todo } from '@/types';
import React, { memo, useMemo } from 'react';
import Counter from './Counter';
import { Icons } from './Icons';
import ProgressIndicator from './ProgressIndicator';

interface TodoStatsProps {
  todos: Todo[];
  className?: string;
}

const TodoStats: React.FC<TodoStatsProps> = memo(
  ({ todos, className = '' }) => {
    const stats = useMemo(() => {
      const total = todos.length;
      const completed = todos.filter(todo => todo.completed).length;
      const active = total - completed;
      const overdue = todos.filter(
        todo =>
          !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date()
      ).length;

      const byPriority = {
        high: todos.filter(todo => todo.priority === 'high').length,
        medium: todos.filter(todo => todo.priority === 'medium').length,
        low: todos.filter(todo => todo.priority === 'low').length,
      };

      const byCategory = todos.reduce(
        (acc, todo) => {
          if (todo.category) {
            acc[todo.category] = (acc[todo.category] || 0) + 1;
          }
          return acc;
        },
        {} as Record<string, number>
      );

      const completionRate =
        total > 0 ? Math.round((completed / total) * 100) : 0;

      return {
        total,
        completed,
        active,
        overdue,
        byPriority,
        byCategory,
        completionRate,
      };
    }, [todos]);

    const statCards = [
      {
        title: '總任務',
        value: stats.total,
        icon: Icons.TotalIcon,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      },
      {
        title: '待完成',
        value: stats.active,
        icon: Icons.ActiveTasksIcon,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      },
      {
        title: '已完成',
        value: stats.completed,
        icon: Icons.CompletedTasksIcon,
        color: 'text-green-600',
        bgColor: 'bg-green-100 dark:bg-green-900/20',
      },
      {
        title: '已過期',
        value: stats.overdue,
        icon: Icons.OverdueTasksIcon,
        color: 'text-red-600',
        bgColor: 'bg-red-100 dark:bg-red-900/20',
      },
    ];

    return (
      <div className={`space-y-6 ${className}`}>
        {/* 主要統計卡片 */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {statCards.map((card, index) => (
            <div
              key={card.title}
              className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft border border-gray-200 dark:border-gray-700 hover:shadow-medium transition-all duration-300'
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className='flex items-center justify-between mb-4'>
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <div className='text-right'>
                  <div className={`text-2xl font-bold ${card.color}`}>
                    <Counter value={card.value} />
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-400'>
                    {card.title}
                  </div>
                </div>
              </div>

              {/* 進度條 */}
              <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    card.title === '已完成'
                      ? 'bg-green-500'
                      : card.title === '待完成'
                        ? 'bg-yellow-500'
                        : card.title === '已過期'
                          ? 'bg-red-500'
                          : 'bg-blue-500'
                  }`}
                  style={{
                    width: `${stats.total > 0 ? (card.value / stats.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 完成率進度 */}
        <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
              完成進度
            </h3>
            <div className='text-2xl font-bold text-blue-600'>
              <Counter value={stats.completionRate} suffix='%' />
            </div>
          </div>

          <ProgressIndicator
            progress={stats.completionRate}
            variant='linear'
            size='lg'
            color='primary'
            animated
          />
        </div>

        {/* 優先級分佈 */}
        <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft border border-gray-200 dark:border-gray-700'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4'>
            優先級分佈
          </h3>

          <div className='space-y-3'>
            {Object.entries(stats.byPriority).map(([priority, count]) => {
              const percentage =
                stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
              const priorityColors = {
                high: {
                  color: 'text-red-600',
                  bg: 'bg-red-100 dark:bg-red-900/20',
                  bar: 'bg-red-500',
                },
                medium: {
                  color: 'text-yellow-600',
                  bg: 'bg-yellow-100 dark:bg-yellow-900/20',
                  bar: 'bg-yellow-500',
                },
                low: {
                  color: 'text-green-600',
                  bg: 'bg-green-100 dark:bg-green-900/20',
                  bar: 'bg-green-500',
                },
              };

              const colors =
                priorityColors[priority as keyof typeof priorityColors];

              return (
                <div
                  key={priority}
                  className='flex items-center justify-between'
                >
                  <div className='flex items-center gap-3'>
                    <div className={`p-2 rounded-lg ${colors.bg}`}>
                      {priority === 'high' && (
                        <Icons.HighPriorityIcon
                          className={`w-4 h-4 ${colors.color}`}
                        />
                      )}
                      {priority === 'medium' && (
                        <Icons.MediumPriorityIcon
                          className={`w-4 h-4 ${colors.color}`}
                        />
                      )}
                      {priority === 'low' && (
                        <Icons.LowPriorityIcon
                          className={`w-4 h-4 ${colors.color}`}
                        />
                      )}
                    </div>
                    <span className='capitalize text-gray-700 dark:text-gray-300'>
                      {priority === 'high'
                        ? '高'
                        : priority === 'medium'
                          ? '中'
                          : '低'}
                      優先級
                    </span>
                  </div>

                  <div className='flex items-center gap-3'>
                    <div className='w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${colors.bar}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span
                      className={`text-sm font-semibold ${colors.color} w-8 text-right`}
                    >
                      <Counter value={count} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 分類統計 */}
        {Object.keys(stats.byCategory).length > 0 && (
          <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft border border-gray-200 dark:border-gray-700'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4'>
              分類統計
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              {Object.entries(stats.byCategory).map(([category, count]) => {
                const percentage =
                  stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;

                return (
                  <div
                    key={category}
                    className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'
                  >
                    <span className='text-gray-700 dark:text-gray-300'>
                      {category}
                    </span>
                    <div className='flex items-center gap-2'>
                      <div className='w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2'>
                        <div
                          className='h-2 bg-blue-500 rounded-full transition-all duration-1000'
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className='text-sm font-semibold text-blue-600 w-6 text-right'>
                        <Counter value={count} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);

TodoStats.displayName = 'TodoStats';

export default TodoStats;
