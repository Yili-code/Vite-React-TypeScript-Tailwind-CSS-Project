import { Icons, NotificationSystem } from '@/components';
import {
  commonShortcuts,
  useDebounce,
  useKeyboardShortcuts,
  useLocalStorage,
} from '@/hooks';
import { BaseComponent, Notification, Todo } from '@/types';
import { memo, useCallback, useMemo, useState } from 'react';

interface HomeProps extends BaseComponent {}

const Home = memo(({ className }: HomeProps) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [showTools, setShowTools] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'created' | 'priority' | 'dueDate'>(
    'created'
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTodoPriority, setNewTodoPriority] = useState<
    'low' | 'medium' | 'high'
  >('medium');
  const [newTodoCategory, setNewTodoCategory] = useState('');
  const [newTodoDueDate, setNewTodoDueDate] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // 添加通知
  const addNotification = useCallback(
    (notification: Omit<Notification, 'id'>) => {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
      };
      setNotifications((prev: Notification[]) => [...prev, newNotification]);
    },
    []
  );

  // 移除通知
  const removeNotification = useCallback((id: string) => {
    setNotifications((prev: Notification[]) => prev.filter(n => n.id !== id));
  }, []);

  const addTodo = useCallback(() => {
    if (newTodo.trim()) {
      const newTodoItem: Todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        priority: newTodoPriority,
        ...(newTodoCategory && { category: newTodoCategory }),
        ...(newTodoDueDate && { dueDate: newTodoDueDate }),
      };
      setTodos(prev => [...prev, newTodoItem]);
      setNewTodo('');
      setNewTodoCategory('');
      setNewTodoDueDate('');
      setNewTodoPriority('medium');
      setShowAddForm(false);

      // 添加成功通知
      addNotification({
        type: 'success',
        title: '任務已添加',
        message: `"${newTodoItem.text}" 已成功添加到您的任務列表`,
        duration: 3000,
      });
    }
  }, [
    newTodo,
    newTodoPriority,
    newTodoCategory,
    newTodoDueDate,
    setTodos,
    addNotification,
  ]);

  const updateTodo = useCallback(
    (id: number, updates: Partial<Todo>) => {
      setTodos(prev =>
        prev.map(todo => (todo.id === id ? { ...todo, ...updates } : todo))
      );
    },
    [setTodos]
  );

  const toggleTodo = useCallback(
    (id: number) => {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    },
    [setTodos]
  );

  const deleteTodo = useCallback(
    (id: number) => {
      setTodos(prev => prev.filter(todo => todo.id !== id));
    },
    [setTodos]
  );

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, [setTodos]);

  // 智能篩選和排序
  const filteredTodos = useMemo(() => {
    const filtered = todos.filter(todo => {
      // 狀態篩選
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;

      // 搜尋篩選
      if (debouncedSearchQuery) {
        return (
          todo.text
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase()) ||
          (todo.category &&
            todo.category
              .toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase()))
        );
      }

      return true;
    });

    // 排序
    const sortedFiltered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'priority': {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return (
            priorityOrder[b.priority || 'medium'] -
              priorityOrder[a.priority || 'medium'] ||
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        case 'dueDate': {
          if (!a.dueDate && !b.dueDate)
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        case 'created':
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    return sortedFiltered;
  }, [todos, filter, debouncedSearchQuery, sortBy]);

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;
  const overdueCount = todos.filter(
    todo =>
      !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date()
  ).length;

  // 鍵盤快捷鍵
  const shortcuts = useMemo(
    () => [
      commonShortcuts.search(() => {
        setSearchQuery('');
        (
          document.querySelector('input[type="text"]') as HTMLInputElement
        )?.focus();
      }),
      commonShortcuts.new(() => setShowAddForm(true)),
      commonShortcuts.all(() => setFilter('all')),
      commonShortcuts.active(() => setFilter('active')),
      commonShortcuts.completed(() => setFilter('completed')),
      commonShortcuts.escape(() => {
        setShowAddForm(false);
        setShowTools(false);
      }),
    ],
    []
  );

  useKeyboardShortcuts(shortcuts);

  // 獲取優先級圖標
  const getPriorityIcon = (priority: string = 'medium') => {
    switch (priority) {
      case 'high':
        return <Icons.HighPriorityIcon className='w-4 h-4' />;
      case 'medium':
        return <Icons.MediumPriorityIcon className='w-4 h-4' />;
      case 'low':
        return <Icons.LowPriorityIcon className='w-4 h-4' />;
      default:
        return <Icons.MediumPriorityIcon className='w-4 h-4' />;
    }
  };

  // 檢查是否過期
  const isOverdue = (dueDate?: string) => {
    return (
      dueDate &&
      new Date(dueDate) < new Date() &&
      !todos.find(t => t.dueDate === dueDate)?.completed
    );
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ${className || ''}`}
    >
      {/* 動畫背景 */}
      <div
        className='fixed inset-0 opacity-20'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* 主要內容 */}
      <div className='relative z-10 container mx-auto px-4 py-12'>
        {/* 標題區域 */}
        <div className='text-center mb-16'>
          <div className='inline-block relative'>
            <h1 className='text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6 tracking-tight'>
              TaskFlow
            </h1>
            <div className='absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg blur opacity-30 animate-pulse'></div>
          </div>
          <p className='text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12'>
            優雅、高效、直觀的任務管理體驗
          </p>

          {/* 進度指示器 */}
          <div className='max-w-sm mx-auto'>
            <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20'>
              <div className='text-sm text-gray-300 mb-3'>完成進度</div>
              <div className='w-full bg-gray-700 rounded-full h-3 overflow-hidden'>
                <div
                  className='h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out'
                  style={{
                    width: `${Math.round((completedCount / Math.max(todos.length, 1)) * 100)}%`,
                  }}
                />
              </div>
              <div className='text-right text-sm text-gray-400 mt-2'>
                {Math.round((completedCount / Math.max(todos.length, 1)) * 100)}
                %
              </div>
            </div>
          </div>
        </div>

        {/* 統計組件 */}
        <div className='mb-12'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
            <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-400 text-sm'>總任務</p>
                  <p className='text-3xl font-bold text-white'>
                    {todos.length}
                  </p>
                </div>
                <div className='w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center'>
                  <Icons.TotalIcon className='text-2xl text-blue-400' />
                </div>
              </div>
            </div>

            <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-400 text-sm'>待完成</p>
                  <p className='text-3xl font-bold text-yellow-400'>
                    {activeCount}
                  </p>
                </div>
                <div className='w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center'>
                  <Icons.ActiveTasksIcon className='text-2xl text-yellow-400' />
                </div>
              </div>
            </div>

            <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-400 text-sm'>已完成</p>
                  <p className='text-3xl font-bold text-green-400'>
                    {completedCount}
                  </p>
                </div>
                <div className='w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center'>
                  <Icons.CompletedTasksIcon className='text-2xl text-green-400' />
                </div>
              </div>
            </div>

            <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-400 text-sm'>已過期</p>
                  <p className='text-3xl font-bold text-red-400'>
                    {overdueCount}
                  </p>
                </div>
                <div className='w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center'>
                  <Icons.OverdueTasksIcon className='text-2xl text-red-400' />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 搜尋和篩選區域 */}
        <div className='max-w-6xl mx-auto mb-12'>
          <div className='bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10'>
            <div className='flex flex-col lg:flex-row gap-6'>
              <div className='flex-1'>
                <div className='relative'>
                  <input
                    type='text'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder='搜尋任務...'
                    className='w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300'
                  />
                  <div className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400'>
                    <Icons.SearchIcon className='w-5 h-5' />
                  </div>
                </div>
              </div>

              <div className='flex flex-col sm:flex-row gap-4'>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2'
                >
                  {showAddForm ? (
                    <Icons.CloseIcon className='w-5 h-5' />
                  ) : (
                    <Icons.AddIcon className='w-5 h-5' />
                  )}
                  {showAddForm ? '取消' : '新增任務'}
                </button>

                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className='bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300'
                >
                  <option value='created'>按創建時間</option>
                  <option value='priority'>按優先級</option>
                  <option value='dueDate'>按截止日期</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 添加任務表單 */}
        {showAddForm && (
          <div className='max-w-2xl mx-auto mb-12'>
            <div className='bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10'>
              <h2 className='text-3xl font-bold text-white mb-8 text-center'>
                添加新任務
              </h2>
              <div className='space-y-6'>
                <div>
                  <label className='block text-gray-300 text-sm font-medium mb-3'>
                    任務內容 *
                  </label>
                  <input
                    type='text'
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && addTodo()}
                    placeholder='輸入您的任務...'
                    className='w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300'
                    autoFocus
                  />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <div>
                    <label className='block text-gray-300 text-sm font-medium mb-3'>
                      優先級
                    </label>
                    <select
                      value={newTodoPriority}
                      onChange={e => setNewTodoPriority(e.target.value as any)}
                      className='w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300'
                    >
                      <option value='low'>低</option>
                      <option value='medium'>中</option>
                      <option value='high'>高</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-gray-300 text-sm font-medium mb-3'>
                      分類
                    </label>
                    <input
                      type='text'
                      value={newTodoCategory}
                      onChange={e => setNewTodoCategory(e.target.value)}
                      placeholder='工作、生活、學習...'
                      className='w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300'
                    />
                  </div>
                  <div>
                    <label className='block text-gray-300 text-sm font-medium mb-3'>
                      截止日期
                    </label>
                    <input
                      type='date'
                      value={newTodoDueDate}
                      onChange={e => setNewTodoDueDate(e.target.value)}
                      className='w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300'
                    />
                  </div>
                </div>
                <div className='flex gap-4 justify-center pt-4'>
                  <button
                    onClick={addTodo}
                    disabled={!newTodo.trim()}
                    className='bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2'
                  >
                    <Icons.AddIcon className='w-4 h-4' />
                    添加任務
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className='bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2'
                  >
                    <Icons.CloseIcon className='w-4 h-4' />
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 篩選按鈕 */}
        <div className='flex justify-center gap-4 mb-12'>
          {(
            [
              { id: 'all', label: '全部', icon: Icons.AllIcon },
              { id: 'active', label: '待完成', icon: Icons.ActiveIcon },
              { id: 'completed', label: '已完成', icon: Icons.CompletedIcon },
            ] as const
          ).map(filterType => (
            <button
              key={filterType.id}
              onClick={() => setFilter(filterType.id as any)}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                filter === filterType.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              <filterType.icon className='w-5 h-5' />
              {filterType.label}
            </button>
          ))}
        </div>

        {/* 任務列表 */}
        <div className='max-w-6xl mx-auto'>
          {filteredTodos.length === 0 ? (
            <div className='text-center py-20'>
              <div className='bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 max-w-md mx-auto'>
                <Icons.TaskIcon className='text-6xl mb-6 text-gray-400' />
                <h3 className='text-2xl font-bold text-white mb-4'>
                  {filter === 'all'
                    ? '還沒有任務'
                    : filter === 'active'
                      ? '沒有待完成的任務'
                      : '沒有已完成的任務'}
                </h3>
                <p className='text-gray-300 mb-8'>
                  {filter === 'all'
                    ? '添加您的第一個任務吧！'
                    : '切換篩選條件查看其他任務'}
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 mx-auto'
                >
                  <Icons.AddIcon className='w-4 h-4' />
                  立即添加任務
                </button>
              </div>
            </div>
          ) : (
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {filteredTodos.map((todo: Todo, index: number) => (
                <div
                  key={todo.id}
                  className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 ${
                    todo.completed ? 'opacity-60' : ''
                  } ${isOverdue(todo.dueDate) ? 'border-red-500/50 bg-red-500/5' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className='flex items-start gap-4'>
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        todo.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-400 hover:border-blue-500'
                      }`}
                    >
                      {todo.completed && (
                        <Icons.CheckIcon className='w-3 h-3' />
                      )}
                    </button>

                    <div className='flex-1 min-w-0'>
                      <div className='flex items-start justify-between mb-3'>
                        <h3
                          className={`text-lg font-semibold transition-all ${
                            todo.completed
                              ? 'line-through text-gray-400'
                              : 'text-white'
                          }`}
                        >
                          {todo.text}
                        </h3>
                        {isOverdue(todo.dueDate) && (
                          <span className='text-xs bg-red-500/20 text-red-300 px-3 py-1 rounded-full'>
                            已過期
                          </span>
                        )}
                      </div>

                      <div className='flex flex-wrap items-center gap-2 text-sm mb-4'>
                        {todo.priority && (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              todo.priority === 'high'
                                ? 'bg-red-500/20 text-red-300'
                                : todo.priority === 'medium'
                                  ? 'bg-yellow-500/20 text-yellow-300'
                                  : 'bg-green-500/20 text-green-300'
                            }`}
                          >
                            {getPriorityIcon(todo.priority)}{' '}
                            {todo.priority === 'high'
                              ? '高'
                              : todo.priority === 'medium'
                                ? '中'
                                : '低'}
                          </span>
                        )}
                        {todo.category && (
                          <span className='px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs'>
                            {todo.category}
                          </span>
                        )}
                        {todo.dueDate && (
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              isOverdue(todo.dueDate)
                                ? 'bg-red-500/20 text-red-300'
                                : 'bg-white/10 text-gray-300'
                            }`}
                          >
                            {new Date(todo.dueDate).toLocaleDateString('zh-TW')}
                          </span>
                        )}
                      </div>

                      <div className='text-xs text-gray-400'>
                        {new Date(todo.createdAt).toLocaleDateString('zh-TW')}
                      </div>
                    </div>

                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() =>
                          updateTodo(todo.id, {
                            priority:
                              todo.priority === 'high'
                                ? 'medium'
                                : todo.priority === 'medium'
                                  ? 'low'
                                  : 'high',
                          })
                        }
                        className='p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-all duration-300'
                        title='切換優先級'
                      >
                        {getPriorityIcon(todo.priority)}
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className='p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-all duration-300'
                        title='刪除任務'
                      >
                        <Icons.DeleteIcon className='w-4 h-4' />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 操作按鈕 */}
        {todos.length > 0 && (
          <div className='flex flex-wrap justify-center gap-4 mt-16'>
            {completedCount > 0 && (
              <button
                onClick={clearCompleted}
                className='bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2'
              >
                <Icons.CleanIcon className='w-4 h-4' />
                清除已完成 ({completedCount})
              </button>
            )}
            {overdueCount > 0 && (
              <button
                onClick={() => setFilter('active')}
                className='bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2'
              >
                <Icons.OverdueIcon className='w-4 h-4' />
                查看過期任務 ({overdueCount})
              </button>
            )}
            <button
              onClick={() => {
                const dataStr = JSON.stringify(todos, null, 2);
                const dataBlob = new Blob([dataStr], {
                  type: 'application/json',
                });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
                link.click();
                URL.revokeObjectURL(url);
              }}
              className='bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2'
            >
              <Icons.DownloadIcon className='w-4 h-4' />
              匯出數據
            </button>
            <button
              onClick={() => setShowTools(!showTools)}
              className='bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2'
            >
              <Icons.SettingsIcon className='w-4 h-4' />
              {showTools ? '隱藏' : '顯示'} 開發工具
            </button>
          </div>
        )}

        {/* 快捷鍵提示 */}
        <div className='text-center mt-12'>
          <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto'>
            <div className='text-sm text-gray-300'>
              <span className='font-bold text-lg text-white'>快捷鍵</span>
              <div className='flex flex-wrap justify-center gap-3 mt-4'>
                <span className='px-4 py-2 bg-white/10 rounded-xl text-xs'>
                  Ctrl+K 搜尋
                </span>
                <span className='px-4 py-2 bg-white/10 rounded-xl text-xs'>
                  Ctrl+N 新增
                </span>
                <span className='px-4 py-2 bg-white/10 rounded-xl text-xs'>
                  Ctrl+A 全部
                </span>
                <span className='px-4 py-2 bg-white/10 rounded-xl text-xs'>
                  Ctrl+T 待完成
                </span>
                <span className='px-4 py-2 bg-white/10 rounded-xl text-xs'>
                  Ctrl+D 已完成
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 開發工具區域 */}
        {showTools && (
          <div className='mt-16'>
            <div className='bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 max-w-6xl mx-auto'>
              <h3 className='text-3xl font-bold text-white mb-12 text-center'>
                開發工具展示
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                <div className='bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300'>
                  <h4 className='font-bold text-white mb-6 text-xl'>
                    性能優化
                  </h4>
                  <ul className='text-gray-300 space-y-3'>
                    <li className='flex items-center gap-3'>組件記憶化</li>
                    <li className='flex items-center gap-3'>懶加載</li>
                    <li className='flex items-center gap-3'>虛擬列表</li>
                    <li className='flex items-center gap-3'>防抖節流</li>
                  </ul>
                </div>
                <div className='bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300'>
                  <h4 className='font-bold text-white mb-6 text-xl'>
                    現代設計
                  </h4>
                  <ul className='text-gray-300 space-y-3'>
                    <li className='flex items-center gap-3'>響應式設計</li>
                    <li className='flex items-center gap-3'>暗色主題</li>
                    <li className='flex items-center gap-3'>流暢動畫</li>
                    <li className='flex items-center gap-3'>無障礙支援</li>
                  </ul>
                </div>
                <div className='bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300'>
                  <h4 className='font-bold text-white mb-6 text-xl'>
                    開發體驗
                  </h4>
                  <ul className='text-gray-300 space-y-3'>
                    <li className='flex items-center gap-3'>熱重載</li>
                    <li className='flex items-center gap-3'>型別檢查</li>
                    <li className='flex items-center gap-3'>自動格式化</li>
                    <li className='flex items-center gap-3'>錯誤邊界</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 通知系統 */}
        <NotificationSystem
          notifications={notifications}
          onRemove={removeNotification}
          position='top-right'
        />
      </div>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
