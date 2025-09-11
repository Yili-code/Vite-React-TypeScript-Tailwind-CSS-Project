# 🚀 Vite + React + TypeScript + Tailwind CSS 專案

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.2-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.6-38B2AC)](https://tailwindcss.com/)

這是一個現代化的前端專案模板，整合了最新的技術棧和最佳實踐。專為快速開發和生產環境優化而設計。

## ✨ 快速開始

### 前置要求

- Node.js >= 18.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安裝與運行

```bash
# 1. 克隆專案
git clone https://github.com/Yili-code/Vite-React-TypeScript-Tailwind-CSS-Project.git

# 2. 進入專案目錄
cd Vite-React-TypeScript-Tailwind-CSS-Project

# 3. 安裝依賴
npm install

# 4. 啟動開發伺服器
npm run dev

# 5. 在瀏覽器中打開 http://localhost:3000
```

### 一鍵部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Yili-code/Vite-React-TypeScript-Tailwind-CSS-Project)
[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Yili-code/Vite-React-TypeScript-Tailwind-CSS-Project)

## 技術棧

- **Vite 5.0.0** - 快速建構工具
- **React 18.2.0** - UI 框架
- **TypeScript 5.3.2** - 型別安全
- **Tailwind CSS 3.3.6** - CSS 框架
- **React Router 6.20.1** - 路由管理
- **ESLint 8.54.0** - 代碼檢查
- **Prettier 3.1.0** - 代碼格式化

## 🌟 功能特色

- **⚡ 極速開發** - Vite 提供毫秒級熱重載
- **🔒 型別安全** - 完整的 TypeScript 支援和型別檢查
- **🚀 性能優化** - 懶加載、代碼分割、虛擬列表、記憶化
- **🎨 現代設計** - 響應式設計、暗色主題、動畫效果
- **🛠️ 開發體驗** - ESLint、Prettier、VS Code 配置、除錯支援
- **📱 移動優先** - 完全響應式，支援所有設備
- **♿ 無障礙** - 遵循 WCAG 指南，支援鍵盤導航
- **🧪 測試就緒** - 內建 Vitest 測試框架

## 🛠️ 可用腳本

### 開發相關
```bash
npm run dev          # 啟動開發伺服器
npm run build        # 建構生產版本
npm run preview      # 預覽生產版本
```

### 代碼品質
```bash
npm run lint         # 檢查代碼風格
npm run lint:fix     # 自動修復代碼問題
npm run type-check   # TypeScript 型別檢查
npm run format       # 格式化代碼
npm run format:check # 檢查代碼格式
```

### 測試相關
```bash
npm run test         # 運行測試
npm run test:ui      # 測試 UI 介面
npm run test:coverage # 測試覆蓋率報告
npm run test:watch   # 監聽模式測試
```

### 其他工具
```bash
npm run clean        # 清理建構檔案
npm run analyze      # 分析打包大小
npm run pre-commit   # 提交前檢查
npm run pre-push     # 推送前檢查
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

## 🚀 部署指南

### Vercel 部署
1. 點擊上方的 "Deploy with Vercel" 按鈕
2. 連接您的 GitHub 帳戶
3. 選擇此專案並點擊 "Deploy"
4. 等待部署完成，獲得您的專案 URL

### Netlify 部署
1. 點擊上方的 "Deploy with Netlify" 按鈕
2. 連接您的 GitHub 帳戶
3. 選擇此專案並點擊 "Deploy site"
4. 等待部署完成，獲得您的專案 URL

### 手動部署
```bash
# 建構專案
npm run build

# 將 dist 目錄上傳到您的靜態網站託管服務
# 例如：GitHub Pages、Vercel、Netlify 等
```

## 🔧 故障排除

### 常見問題

**Q: 安裝依賴時出現錯誤**
```bash
# 清除快取並重新安裝
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Q: 開發伺服器無法啟動**
```bash
# 檢查端口是否被占用
npm run dev -- --port 3001
```

**Q: TypeScript 型別錯誤**
```bash
# 運行型別檢查
npm run type-check
```

**Q: 建構失敗**
```bash
# 清理並重新建構
npm run clean
npm run build
```

### 獲取幫助

- 📖 查看 [Vite 文檔](https://vitejs.dev/)
- 📖 查看 [React 文檔](https://react.dev/)
- 📖 查看 [Tailwind CSS 文檔](https://tailwindcss.com/)
- 🐛 提交 [Issue](https://github.com/Yili-code/Vite-React-TypeScript-Tailwind-CSS-Project/issues)

## 🤝 貢獻

我們歡迎任何形式的貢獻！

### 如何貢獻
1. Fork 此專案
2. 創建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

### 貢獻指南
- 遵循現有的代碼風格
- 添加適當的註釋和文檔
- 確保所有測試通過
- 更新相關文檔

## 📄 授權

此專案使用 MIT 授權 - 查看 [LICENSE](LICENSE) 檔案了解詳情。

## 🙏 致謝

- [Vite](https://vitejs.dev/) - 快速的前端建構工具
- [React](https://react.dev/) - 用於構建用戶界面的 JavaScript 庫
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [Tailwind CSS](https://tailwindcss.com/) - 實用優先的 CSS 框架

---

⭐ 如果這個專案對您有幫助，請給它一個星標！