import {
    AnimatedBackground,
    InteractiveButton,
    NotificationSystem,
    ProgressIndicator,
    TodoStats
} from '@/components';
import { commonShortcuts, useDebounce, useKeyboardShortcuts, useLocalStorage } from '@/hooks';
import { BaseComponent, Notification, Todo } from '@/types';
import { useCallback, useMemo, useState } from 'react';

interface HomeProps extends BaseComponent {}

const Home = ({ className }: HomeProps) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [showTools, setShowTools] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'created' | 'priority' | 'dueDate'>('created');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTodoPriority, setNewTodoPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTodoCategory, setNewTodoCategory] = useState('');
  const [newTodoDueDate, setNewTodoDueDate] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // 添加通知
  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
    };
    setNotifications(prev => [...prev, newNotification]);
  }, []);

  // 移除通知
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const addTodo = useCallback(() => {
    if (newTodo.trim()) {
      const newTodoItem: Todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        priority: newTodoPriority,
        category: newTodoCategory || undefined,
        dueDate: newTodoDueDate || undefined,
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
  }, [newTodo, newTodoPriority, newTodoCategory, newTodoDueDate, setTodos, addNotification]);

  const updateTodo = useCallback((id: number, updates: Partial<Todo>) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  }, [setTodos]);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, [setTodos]);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, [setTodos]);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, [setTodos]);

  // 智能篩選和排序
  const filteredTodos = useMemo(() => {
    let filtered = todos.filter(todo => {
      // 狀態篩選
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      
      // 搜尋篩選
      if (debouncedSearchQuery) {
        return todo.text.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
               (todo.category && todo.category.toLowerCase().includes(debouncedSearchQuery.toLowerCase()));
      }
      
      return true;
    });

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return (priorityOrder[b.priority || 'medium'] - priorityOrder[a.priority || 'medium']) ||
                 new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'created':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  }, [todos, filter, debouncedSearchQuery, sortBy]);

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;
  const overdueCount = todos.filter(todo => 
    !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date()
  ).length;

  // 鍵盤快捷鍵
  const shortcuts = useMemo(() => [
    commonShortcuts.search(() => {
      setSearchQuery('');
      document.querySelector('input[type="text"]')?.focus();
    }),
    commonShortcuts.new(() => setShowAddForm(true)),
    commonShortcuts.all(() => setFilter('all')),
    commonShortcuts.active(() => setFilter('active')),
    commonShortcuts.completed(() => setFilter('completed')),
    commonShortcuts.escape(() => {
      setShowAddForm(false);
      setShowTools(false);
    }),
  ], []);

  useKeyboardShortcuts(shortcuts);

  // 獲取優先級顏色
  const getPriorityColor = (priority: string = 'medium') => {
    switch (priority) {
      case 'high': return 'text-error-600 dark:text-error-400';
      case 'medium': return 'text-warning-600 dark:text-warning-400';
      case 'low': return 'text-success-600 dark:text-success-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  // 獲取優先級圖標
  const getPriorityIcon = (priority: string = 'medium') => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  // 檢查是否過期
  const isOverdue = (dueDate?: string) => {
    return dueDate && new Date(dueDate) < new Date() && !todos.find(t => t.dueDate === dueDate)?.completed;
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${className || ''}`}>
      {/* 動畫背景 */}
      <AnimatedBackground 
        type="particles" 
        intensity="medium" 
        color="rainbow" 
        className="z-0"
      />
      
      {/* 主要內容 */}
      <div className="relative z-10 container mx-auto container-padding py-8">
        {/* 標題區域 */}
        <div className="text-center mb-12 fade-in-up">
          <h1 className="text-5xl font-bold mb-6 neon-text animate-pulse-slow">
            ✨ 智能待辦事項管理 ✨
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            一個融合現代設計與先進技術的任務管理工具，為您帶來前所未有的工作效率體驗
          </p>
          
          {/* 進度指示器 */}
          <div className="mt-8 max-w-md mx-auto">
            <ProgressIndicator
              progress={Math.round((completedCount / Math.max(todos.length, 1)) * 100)}
              variant="wave"
              color="rainbow"
              size="lg"
              label="整體完成度"
              animated={true}
            />
          </div>
        </div>

        {/* 統計組件 */}
        <div className="mb-8 fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="card-premium particles">
            <TodoStats todos={todos} showDetails={showTools} />
          </div>
        </div>

        {/* 搜尋和篩選區域 */}
        <div className="glass-card max-w-4xl mx-auto mb-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="label text-white/90">🔍 搜尋任務</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜尋任務或分類... (Ctrl+K)"
                className="input glass bg-white/10 border-white/20 text-white placeholder-white/60"
              />
            </div>
            <div className="flex gap-3">
              <InteractiveButton
                onClick={() => setShowAddForm(!showAddForm)}
                variant="magic"
                size="md"
                icon={showAddForm ? '✕' : '➕'}
                iconPosition="left"
              >
                {showAddForm ? '取消' : '新增任務'}
              </InteractiveButton>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="input glass bg-white/10 border-white/20 text-white"
              >
                <option value="created">按創建時間</option>
                <option value="priority">按優先級</option>
                <option value="dueDate">按截止日期</option>
              </select>
            </div>
          </div>
        </div>

        {/* 添加任務表單 */}
        {showAddForm && (
          <div className="card-premium max-w-2xl mx-auto mb-8 fade-in-up animate-scale-in">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              ✨ 添加新任務 ✨
            </h2>
            <div className="space-y-6">
              <div>
                <label className="label text-white/90">📝 任務內容 *</label>
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                  placeholder="輸入您的任務..."
                  className="input glass bg-white/10 border-white/20 text-white placeholder-white/60"
                  autoFocus
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="label text-white/90">⚡ 優先級</label>
                  <select
                    value={newTodoPriority}
                    onChange={(e) => setNewTodoPriority(e.target.value as any)}
                    className="input glass bg-white/10 border-white/20 text-white"
                  >
                    <option value="low">🟢 低</option>
                    <option value="medium">🟡 中</option>
                    <option value="high">🔴 高</option>
                  </select>
                </div>
                <div>
                  <label className="label text-white/90">🏷️ 分類</label>
                  <input
                    type="text"
                    value={newTodoCategory}
                    onChange={(e) => setNewTodoCategory(e.target.value)}
                    placeholder="工作、生活、學習..."
                    className="input glass bg-white/10 border-white/20 text-white placeholder-white/60"
                  />
                </div>
                <div>
                  <label className="label text-white/90">📅 截止日期</label>
                  <input
                    type="date"
                    value={newTodoDueDate}
                    onChange={(e) => setNewTodoDueDate(e.target.value)}
                    className="input glass bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <InteractiveButton
                  onClick={addTodo}
                  disabled={!newTodo.trim()}
                  variant="liquid"
                  size="lg"
                  icon="✨"
                  iconPosition="left"
                >
                  添加任務
                </InteractiveButton>
                <InteractiveButton
                  onClick={() => setShowAddForm(false)}
                  variant="glass"
                  size="lg"
                  icon="✕"
                  iconPosition="left"
                >
                  取消
                </InteractiveButton>
              </div>
            </div>
          </div>
        )}

        {/* 篩選按鈕 */}
        <div className="flex justify-center gap-3 mb-8 fade-in-up" style={{ animationDelay: '0.3s' }}>
          {([
            { id: 'all', label: '全部', icon: '📋', variant: 'neon' as const },
            { id: 'active', label: '待完成', icon: '⏳', variant: 'magnetic' as const },
            { id: 'completed', label: '已完成', icon: '✅', variant: 'ripple' as const }
          ] as const).map((filterType) => (
            <InteractiveButton
              key={filterType.id}
              onClick={() => setFilter(filterType.id as any)}
              variant={filter === filterType.id ? 'magic' : filterType.variant}
              size="md"
              icon={filterType.icon}
              iconPosition="left"
              className={filter === filterType.id ? 'animate-pulse' : ''}
            >
              {filterType.label}
            </InteractiveButton>
          ))}
        </div>

        {/* 任務列表 */}
        <div className="max-w-4xl mx-auto fade-in-up" style={{ animationDelay: '0.4s' }}>
          {filteredTodos.length === 0 ? (
            <div className="glass-card text-center py-16">
              <div className="text-6xl mb-6 animate-bounce-slow">📝</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {filter === 'all' ? '還沒有任務' : 
                 filter === 'active' ? '沒有待完成的任務' : '沒有已完成的任務'}
              </h3>
              <p className="text-white/80 text-lg mb-6">
                {filter === 'all' ? '添加您的第一個任務吧！' : '切換篩選條件查看其他任務'}
              </p>
              <InteractiveButton
                onClick={() => setShowAddForm(true)}
                variant="magic"
                size="lg"
                icon="✨"
                iconPosition="left"
              >
                立即添加任務
              </InteractiveButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTodos.map((todo, index) => (
                <div
                  key={todo.id}
                  className={`card-premium magnetic transition-all duration-300 ${
                    todo.completed ? 'opacity-75' : ''
                  } ${isOverdue(todo.dueDate) ? 'border-error-400 bg-error-500/10' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <InteractiveButton
                      onClick={() => toggleTodo(todo.id)}
                      variant={todo.completed ? 'success' : 'glass'}
                      size="sm"
                      icon={todo.completed ? '✓' : '○'}
                      className="flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`text-lg font-semibold transition-all ${
                            todo.completed
                              ? 'line-through text-white/60'
                              : 'text-white'
                          }`}
                        >
                          {todo.text}
                        </span>
                        {isOverdue(todo.dueDate) && (
                          <span className="text-xs bg-error-500/20 text-error-300 px-3 py-1 rounded-full animate-pulse">
                            ⚠️ 已過期
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        {todo.priority && (
                          <span className={`flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 text-white`}>
                            {getPriorityIcon(todo.priority)}
                            {todo.priority === 'high' ? '高' : todo.priority === 'medium' ? '中' : '低'}
                          </span>
                        )}
                        {todo.category && (
                          <span className="px-2 py-1 rounded-full bg-white/10 text-white/90">
                            🏷️ {todo.category}
                          </span>
                        )}
                        {todo.dueDate && (
                          <span className={`px-2 py-1 rounded-full bg-white/10 text-white/90 ${isOverdue(todo.dueDate) ? 'animate-pulse' : ''}`}>
                            📅 {new Date(todo.dueDate).toLocaleDateString('zh-TW')}
                          </span>
                        )}
                        <span className="text-white/60 text-xs">
                          {new Date(todo.createdAt).toLocaleDateString('zh-TW')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <InteractiveButton
                        onClick={() => updateTodo(todo.id, { 
                          priority: todo.priority === 'high' ? 'medium' : 
                                  todo.priority === 'medium' ? 'low' : 'high' 
                        })}
                        variant="glass"
                        size="sm"
                        icon={getPriorityIcon(todo.priority)}
                        className="opacity-70 hover:opacity-100"
                      />
                      <InteractiveButton
                        onClick={() => deleteTodo(todo.id)}
                        variant="error"
                        size="sm"
                        icon="🗑️"
                        className="opacity-70 hover:opacity-100"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 操作按鈕 */}
        {todos.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mt-12 fade-in-up" style={{ animationDelay: '0.5s' }}>
            {completedCount > 0 && (
              <InteractiveButton
                onClick={clearCompleted}
                variant="glass"
                size="md"
                icon="🧹"
                iconPosition="left"
              >
                清除已完成 ({completedCount})
              </InteractiveButton>
            )}
            {overdueCount > 0 && (
              <InteractiveButton
                onClick={() => setFilter('active')}
                variant="warning"
                size="md"
                icon="⚠️"
                iconPosition="left"
              >
                查看過期任務 ({overdueCount})
              </InteractiveButton>
            )}
            <InteractiveButton
              onClick={() => {
                const dataStr = JSON.stringify(todos, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
                link.click();
                URL.revokeObjectURL(url);
              }}
              variant="neon"
              size="md"
              icon="💾"
              iconPosition="left"
            >
              匯出數據
            </InteractiveButton>
            <InteractiveButton
              onClick={() => setShowTools(!showTools)}
              variant="flip"
              size="md"
              icon={showTools ? '🔧' : '⚙️'}
              iconPosition="left"
            >
              {showTools ? '隱藏' : '顯示'} 開發工具
            </InteractiveButton>
          </div>
        )}

        {/* 快捷鍵提示 */}
        <div className="text-center mt-8 fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="glass-card max-w-2xl mx-auto">
            <div className="text-sm text-white/90">
              <span className="font-bold text-lg">⌨️ 快捷鍵：</span>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                <span className="px-3 py-1 bg-white/10 rounded-full">Ctrl+K 搜尋</span>
                <span className="px-3 py-1 bg-white/10 rounded-full">Ctrl+N 新增</span>
                <span className="px-3 py-1 bg-white/10 rounded-full">Ctrl+A 全部</span>
                <span className="px-3 py-1 bg-white/10 rounded-full">Ctrl+T 待完成</span>
                <span className="px-3 py-1 bg-white/10 rounded-full">Ctrl+D 已完成</span>
              </div>
            </div>
          </div>
        </div>

        {/* 開發工具區域 */}
        {showTools && (
          <div className="mt-12 glass-card max-w-6xl mx-auto fade-in-up animate-scale-in">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              🛠️ 開發工具展示
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card-premium magnetic">
                <h4 className="font-bold text-white mb-4 text-lg">⚡ 性能優化</h4>
                <ul className="text-white/90 space-y-2">
                  <li className="flex items-center gap-2">✨ 組件記憶化</li>
                  <li className="flex items-center gap-2">🚀 懶加載</li>
                  <li className="flex items-center gap-2">📊 虛擬列表</li>
                  <li className="flex items-center gap-2">⏱️ 防抖節流</li>
                </ul>
              </div>
              <div className="card-premium magnetic">
                <h4 className="font-bold text-white mb-4 text-lg">🎨 現代設計</h4>
                <ul className="text-white/90 space-y-2">
                  <li className="flex items-center gap-2">📱 響應式設計</li>
                  <li className="flex items-center gap-2">🌙 暗色主題</li>
                  <li className="flex items-center gap-2">✨ 流暢動畫</li>
                  <li className="flex items-center gap-2">♿ 無障礙支援</li>
                </ul>
              </div>
              <div className="card-premium magnetic">
                <h4 className="font-bold text-white mb-4 text-lg">🛠️ 開發體驗</h4>
                <ul className="text-white/90 space-y-2">
                  <li className="flex items-center gap-2">🔥 熱重載</li>
                  <li className="flex items-center gap-2">🔍 型別檢查</li>
                  <li className="flex items-center gap-2">🎯 自動格式化</li>
                  <li className="flex items-center gap-2">🛡️ 錯誤邊界</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 通知系統 */}
        <NotificationSystem
          notifications={notifications}
          onRemove={removeNotification}
          position="top-right"
        />
      </div>
    </div>
  );
};

export default Home;
