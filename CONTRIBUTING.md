# 貢獻指南

感謝您對這個專案的關注！我們歡迎任何形式的貢獻，包括但不限於：

- 🐛 錯誤報告
- ✨ 新功能建議
- 📝 文檔改進
- 🎨 代碼優化
- 🧪 測試用例

## 如何貢獻

### 1. Fork 專案

點擊 GitHub 頁面右上角的 "Fork" 按鈕，將專案複製到您的帳戶。

### 2. 克隆專案

```bash
git clone https://github.com/您的用戶名/Vite-React-TypeScript-Tailwind-CSS-Project.git
cd Vite-React-TypeScript-Tailwind-CSS-Project
```

### 3. 設置開發環境

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

### 4. 創建功能分支

```bash
# 創建並切換到新分支
git checkout -b feature/您的功能名稱

# 或者修復錯誤
git checkout -b fix/錯誤描述
```

### 5. 進行開發

- 遵循現有的代碼風格
- 添加適當的註釋
- 確保代碼通過所有檢查

### 6. 運行測試和檢查

```bash
# 運行所有檢查
npm run validate

# 或者分別運行
npm run type-check  # TypeScript 檢查
npm run lint        # 代碼風格檢查
npm run test:run    # 運行測試
```

### 7. 提交變更

```bash
# 添加變更
git add .

# 提交變更（請使用清晰的提交訊息）
git commit -m "feat: 添加新功能描述"

# 推送到您的分支
git push origin feature/您的功能名稱
```

### 8. 創建 Pull Request

1. 前往您的 GitHub 專案頁面
2. 點擊 "Compare & pull request"
3. 填寫 PR 描述
4. 等待審查

## 代碼規範

### TypeScript

- 使用嚴格的型別檢查
- 避免使用 `any` 型別
- 為函數和組件添加適當的型別註解

### React

- 使用函數組件和 Hooks
- 遵循 React Hooks 規則
- 使用 `React.memo` 進行性能優化（如需要）

### 樣式

- 使用 Tailwind CSS 類別
- 遵循移動優先的響應式設計
- 保持一致的間距和顏色

### 命名規範

- 組件：PascalCase（如：`UserProfile`）
- 函數和變數：camelCase（如：`getUserData`）
- 常數：UPPER_SNAKE_CASE（如：`API_BASE_URL`）
- 檔案：kebab-case（如：`user-profile.tsx`）

## 提交訊息規範

我們使用 [Conventional Commits](https://www.conventionalcommits.org/) 規範：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 類型

- `feat`: 新功能
- `fix`: 錯誤修復
- `docs`: 文檔變更
- `style`: 代碼格式變更
- `refactor`: 代碼重構
- `test`: 測試相關
- `chore`: 建構過程或輔助工具的變動

### 範例

```
feat: 添加用戶登入功能
fix: 修復路由跳轉問題
docs: 更新 README 安裝說明
style: 調整按鈕樣式
refactor: 重構 API 調用邏輯
test: 添加用戶組件測試
chore: 更新依賴版本
```

## 問題報告

在提交 Issue 之前，請：

1. 檢查是否已有相關 Issue
2. 使用最新的代碼版本
3. 提供詳細的重現步驟
4. 包含錯誤訊息和截圖（如適用）

### Issue 模板

```markdown
## 問題描述
簡潔明瞭地描述問題

## 重現步驟
1. 前往 '...'
2. 點擊 '...'
3. 滾動到 '...'
4. 看到錯誤

## 預期行為
描述您預期的行為

## 實際行為
描述實際發生的行為

## 環境信息
- OS: [如 Windows 10]
- 瀏覽器: [如 Chrome 91]
- Node.js 版本: [如 18.0.0]
- 專案版本: [如 1.0.0]

## 額外信息
添加任何其他相關信息
```

## 功能請求

在提交功能請求之前，請：

1. 檢查是否已有相關 Issue
2. 詳細描述功能需求
3. 說明為什麼需要這個功能
4. 提供使用場景

## 審查流程

1. 所有 PR 都會經過代碼審查
2. 審查者會檢查代碼品質、測試覆蓋率和文檔
3. 可能需要根據反饋進行修改
4. 審查通過後會合併到主分支

## 獲取幫助

如果您在貢獻過程中遇到問題，可以：

- 查看 [GitHub Issues](https://github.com/Yili-code/Vite-React-TypeScript-Tailwind-CSS-Project/issues)
- 查看專案文檔
- 聯繫維護者

## 感謝

再次感謝您的貢獻！您的努力讓這個專案變得更好。

---

**注意**: 請確保您同意將您的貢獻授權給此專案使用 MIT 授權。
