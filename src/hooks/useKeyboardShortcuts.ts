import { KeyboardShortcut } from '@/types';
import { useCallback, useEffect, useRef } from 'react';

/**
 * 鍵盤快捷鍵 Hook
 * @param shortcuts 快捷鍵配置數組
 */
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const shortcutsRef = useRef(shortcuts);
  
  // 更新 ref 以確保總是使用最新的 shortcuts
  useEffect(() => {
    shortcutsRef.current = shortcuts;
  }, [shortcuts]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // 如果焦點在輸入元素上，跳過某些快捷鍵
    const target = event.target as HTMLElement;
    const isInputElement = target.tagName === 'INPUT' || 
                          target.tagName === 'TEXTAREA' || 
                          target.contentEditable === 'true';

    shortcutsRef.current.forEach(shortcut => {
      const {
        key,
        ctrlKey = false,
        metaKey = false,
        shiftKey = false,
        altKey = false,
        action
      } = shortcut;

      // 檢查是否匹配修飾鍵
      const isCtrlMatch = ctrlKey === event.ctrlKey;
      const isMetaMatch = metaKey === event.metaKey;
      const isShiftMatch = shiftKey === event.shiftKey;
      const isAltMatch = altKey === event.altKey;
      const isKeyMatch = key.toLowerCase() === event.key.toLowerCase();

      // 如果匹配且不在輸入元素中，則執行動作
      if (isCtrlMatch && isMetaMatch && isShiftMatch && isAltMatch && isKeyMatch) {
        // 對於某些快捷鍵，即使在輸入元素中也要執行
        const globalShortcuts = ['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
        const isGlobalShortcut = globalShortcuts.includes(key);
        
        if (!isInputElement || isGlobalShortcut) {
          event.preventDefault();
          event.stopPropagation();
          action();
        }
      }
    });
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

// 預定義的常用快捷鍵
export const commonShortcuts = {
  search: (action: () => void): KeyboardShortcut => ({
    key: 'k',
    ctrlKey: true,
    action,
    description: '搜尋任務'
  }),
  new: (action: () => void): KeyboardShortcut => ({
    key: 'n',
    ctrlKey: true,
    action,
    description: '新增任務'
  }),
  all: (action: () => void): KeyboardShortcut => ({
    key: 'a',
    ctrlKey: true,
    action,
    description: '顯示全部任務'
  }),
  active: (action: () => void): KeyboardShortcut => ({
    key: 't',
    ctrlKey: true,
    action,
    description: '顯示待完成任務'
  }),
  completed: (action: () => void): KeyboardShortcut => ({
    key: 'd',
    ctrlKey: true,
    action,
    description: '顯示已完成任務'
  }),
  escape: (action: () => void): KeyboardShortcut => ({
    key: 'Escape',
    action,
    description: '取消/關閉'
  }),
  enter: (action: () => void): KeyboardShortcut => ({
    key: 'Enter',
    action,
    description: '確認/提交'
  }),
  delete: (action: () => void): KeyboardShortcut => ({
    key: 'Delete',
    action,
    description: '刪除選中項目'
  }),
  save: (action: () => void): KeyboardShortcut => ({
    key: 's',
    ctrlKey: true,
    action,
    description: '保存'
  }),
  help: (action: () => void): KeyboardShortcut => ({
    key: '?',
    action,
    description: '顯示幫助'
  })
};
