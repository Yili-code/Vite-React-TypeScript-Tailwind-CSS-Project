# Vite + React + TypeScript + Tailwind CSS 專案

這是一個現代化的前端專案模板，整合了最新的技術棧和最佳實踐。

## 技術棧

- **Vite 5.0.0** - 快速建構工具
- **React 18.2.0** - UI 框架
- **TypeScript 5.3.2** - 型別安全
- **Tailwind CSS 3.3.6** - CSS 框架
- **React Router 6.20.1** - 路由管理
- **ESLint 8.54.0** - 代碼檢查
- **Prettier 3.1.0** - 代碼格式化

## 功能特色

- **型別安全** - 完整的 TypeScript 支援
- **性能優化** - 懶加載、代碼分割、記憶化
- **開發體驗** - 熱重載、型別檢查、自動格式化
- **現代設計** - 響應式設計、暗色主題支援
- **工具整合** - ESLint、Prettier、VS Code 配置

## 📦 安裝依賴

```bash
npm install
```

## 開發

```bash
npm run dev
```

## 建構

```bash
npm run build
```

## 代碼檢查

```bash
# 檢查代碼
npm run lint

# 自動修復
npm run lint:fix

# 型別檢查
npm run type-check
```

## 代碼格式化

```bash
# 格式化代碼
npm run format

# 檢查格式
npm run format:check
```

## 📁 專案結構

```
src/
├── components/          # 可重用組件
│   ├── Counter.tsx     # 計數器組件
│   ├── ErrorPage.tsx   # 錯誤頁面
│   ├── LazyImage.tsx   # 懶加載圖片
│   ├── VirtualList.tsx # 虛擬列表
│   ├── InfiniteScroll.tsx # 無限滾動
│   └── PerformanceMonitor.tsx # 性能監控
├── hooks/              # 自定義 Hooks
│   ├── useTheme.ts     # 主題管理
│   ├── useLocalStorage.ts # 本地儲存
│   ├── useDebounce.ts  # 防抖
│   └── useThrottle.ts  # 節流
├── pages/              # 頁面組件
│   ├── Home.tsx        # 首頁
│   └── About.tsx       # 關於頁面
├── types/              # 型別定義
│   └── index.ts        # 通用型別
├── utils/              # 工具函數
│   └── index.ts        # 通用工具
├── App.tsx             # 主應用組件
├── main.tsx            # 應用入口
└── index.css           # 全域樣式
```

## 主題支援

專案支援亮色和暗色主題，可以通過導航欄的主題切換按鈕進行切換。

## 開發工具

### VS Code 擴展推薦

專案包含了 VS Code 配置，推薦安裝以下擴展：

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag

### 除錯配置

專案包含了 Chrome 除錯配置，可以在 VS Code 中直接除錯 React 應用。

## 代碼規範

- 使用 ESLint 進行代碼檢查
- 使用 Prettier 進行代碼格式化
- 使用 TypeScript 進行型別檢查
- 遵循 React Hooks 最佳實踐

## 性能優化

- 組件懶加載
- 圖片懶加載
- 虛擬列表
- 無限滾動
- 記憶化組件
- 代碼分割

## 響應式設計

專案使用 Tailwind CSS 實現響應式設計，支援各種螢幕尺寸。

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License