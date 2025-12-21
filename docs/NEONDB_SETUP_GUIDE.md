# NeonDB 資料庫串接完整指南

本指南將一步一步帶您完成 NeonDB 資料庫的設置和串接。

## 📋 前置要求

- [x] GitHub 帳號
- [x] NeonDB 帳號（免費註冊）
- [x] Node.js 已安裝

## 🗄️ 第一步：創建 NeonDB 專案

### 1. 註冊/登錄 NeonDB

1. 訪問 [neon.tech](https://neon.tech)
2. 點擊 **"Sign Up"** 或 **"Log In"**
3. 使用 GitHub 帳號登錄（推薦）

### 2. 創建新專案

1. 登錄後，點擊 **"Create Project"** 或 **"New Project"**
2. 填寫專案信息：
   - **Project Name**: `rendezvous-db`（或您喜歡的名稱）
   - **Region**: 選擇離您最近的區域（例如：`Asia Pacific (Singapore)`）
   - **PostgreSQL Version**: 選擇最新版本（預設即可）
3. 點擊 **"Create Project"**
4. 等待專案創建完成（約 30 秒）

### 3. 獲取連接字符串

1. 在專案 Dashboard，找到 **"Connection Details"** 或 **"Connection String"** 區塊
2. 點擊 **"Copy"** 按鈕複製連接字符串
3. 連接字符串格式如下：
   ```
   postgresql://username:password@ep-xxx-xxx.region.neon.tech/dbname?sslmode=require
   ```
4. **重要：保存這個連接字符串，稍後會用到！**

## 🔧 第二步：設置後端環境變數

### 1. 創建環境變數文件

在 `backend` 目錄下創建 `.env` 文件：

```bash
cd backend
```

如果沒有 `.env` 文件，複製範例文件：

```bash
# Windows PowerShell
Copy-Item .env.example .env

# Linux/Mac
cp .env.example .env
```

### 2. 編輯 `.env` 文件

打開 `backend/.env` 文件，填入以下內容：

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# NeonDB Database Connection
# Paste your connection string from NeonDB dashboard here
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.region.neon.tech/dbname?sslmode=require

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

**重要：**
- 將 `DATABASE_URL` 替換為您從 NeonDB 複製的連接字符串
- 生成一個隨機字符串作為 `JWT_SECRET`：
  ```bash
  # Windows PowerShell
  [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(64))
  
  # Linux/Mac
  openssl rand -hex 64
  ```

## 📦 第三步：安裝後端依賴

```bash
cd backend
npm install
```

等待安裝完成。

## 🗃️ 第四步：初始化資料庫

### 1. 運行資料庫遷移（創建表結構）

```bash
npm run db:migrate
```

您應該看到類似以下的輸出：
```
Running database migrations...
✓ Executed: CREATE TABLE IF NOT EXISTS boards...
✓ Executed: CREATE TABLE IF NOT EXISTS users...
...
✅ Database migrations completed successfully!
```

### 2. 填充初始資料（Seed Data）

```bash
npm run db:seed
```

您應該看到類似以下的輸出：
```
Seeding database...
✓ Inserted 24 boards
✓ Inserted 8 users
✓ Inserted 7 review posts
✓ Inserted 4 meetup posts
✓ Inserted 5 saved restaurants
✅ Database seeding completed!
```

## 🚀 第五步：啟動後端服務器

```bash
npm run dev
```

您應該看到：
```
🚀 Server running on http://localhost:3001
🌍 Environment: development
✅ Connected to NeonDB PostgreSQL database
```

## ✅ 第六步：驗證連接

### 1. 測試健康檢查端點

打開瀏覽器或使用 curl：

```bash
# 瀏覽器
http://localhost:3001/api/health

# 或使用 curl
curl http://localhost:3001/api/health
```

應該返回：
```json
{"status":"ok","timestamp":"2024-01-01T00:00:00.000Z"}
```

### 2. 測試 API 端點

```bash
# 獲取看板
curl http://localhost:3001/api/boards

# 獲取貼文
curl http://localhost:3001/api/posts

# 獲取用戶資料
curl http://localhost:3001/api/users/lorry930811/profile
```

## 🔗 第七步：連接前端

### 1. 更新前端 API 配置

創建或更新 `src/config/api.ts`：

```typescript
// API Configuration
const isDevelopment = process.env.NODE_ENV === 'development';

// In development, use local backend
// In production, use relative paths (same domain)
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3001/api'
  : '/api';

export default API_BASE_URL;
```

### 2. 更新前端 API 調用

更新 `src/api/mock.ts` 中的函數，改為調用真實 API：

```typescript
import API_BASE_URL from '../config/api';

export async function fetchBoards(): Promise<Board[]> {
  const response = await fetch(`${API_BASE_URL}/boards`);
  if (!response.ok) {
    throw new Error('Failed to fetch boards');
  }
  return response.json();
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(`${API_BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}
```

同樣更新 `src/api/mockProfile.ts` 和 `src/api/mockSavedRestaurants.ts`。

## 🐛 常見問題

### 問題 1：連接失敗 "Connection refused"

**解決方案：**
- 檢查 `DATABASE_URL` 是否正確
- 確認 NeonDB 專案狀態為 "Active"
- 檢查防火牆設置

### 問題 2：SSL 連接錯誤

**解決方案：**
- 確保連接字符串包含 `?sslmode=require`
- 檢查 `backend/src/db/database.ts` 中的 SSL 配置

### 問題 3：表已存在錯誤

**解決方案：**
- 這是正常的，遷移腳本會跳過已存在的表
- 如果需要重新創建，可以在 NeonDB Dashboard 中刪除表或重置資料庫

### 問題 4：CORS 錯誤

**解決方案：**
- 檢查 `FRONTEND_URL` 環境變數是否正確
- 確認前端運行在 `http://localhost:3000`

## 📊 驗證資料庫內容

### 使用 NeonDB Dashboard

1. 登錄 NeonDB Dashboard
2. 選擇您的專案
3. 點擊 **"SQL Editor"** 或 **"Query"**
4. 運行查詢：

```sql
-- 查看所有看板
SELECT * FROM boards;

-- 查看所有用戶
SELECT id, display_name, handle FROM users;

-- 查看所有貼文
SELECT id, restaurant_name, title FROM review_posts;
```

## 🔐 安全注意事項

1. **永遠不要**將 `.env` 文件提交到 Git
2. **永遠不要**在代碼中硬編碼連接字符串
3. 定期輪換密碼和密鑰
4. 使用強隨機字符串作為 `JWT_SECRET`

## 📚 下一步

- 查看 `backend/README.md` 了解 API 端點詳情
- 查看 `backend/src/db/schema.sql` 了解資料庫結構
- 開始開發新功能！

## 🎉 完成！

您的資料庫現在已經成功串接！如果遇到任何問題，請檢查：

1. NeonDB 專案狀態
2. 環境變數設置
3. 後端服務器日誌
4. 資料庫連接字符串格式

祝開發順利！🚀

