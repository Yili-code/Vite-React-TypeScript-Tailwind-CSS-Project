import { KeyboardShortcut } from '@/types';
import { useCallback, useEffect } from 'react';

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    shortcuts.forEach(shortcut => {
      const {
        key,
        ctrlKey = false,
        metaKey = false,
        shiftKey = false,
        altKey = false,
        action
      } = shortcut;

      const isCtrlMatch = ctrlKey === event.ctrlKey;
      const isMetaMatch = metaKey === event.metaKey;
      const isShiftMatch = shiftKey === event.shiftKey;
      const isAltMatch = altKey === event.altKey;
      const isKeyMatch = key.toLowerCase() === event.key.toLowerCase();

      if (isCtrlMatch && isMetaMatch && isShiftMatch && isAltMatch && isKeyMatch) {
        event.preventDefault();
        action();
      }
    });
  }, [shortcuts]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
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
