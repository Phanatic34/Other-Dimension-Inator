# Vercel 部署指南

本指南說明如何將 Rendezvous 專案部署到 Vercel，包括前端和後端的環境變數設置。

## 📋 部署架構

- **前端**：部署到 Vercel（靜態網站）
- **後端**：可以部署到 Vercel Serverless Functions 或單獨的服務器（如 Railway、Render）

## 🚀 前端部署到 Vercel

### 1. 準備專案

確保專案已推送到 GitHub。

### 2. 在 Vercel 創建專案

1. 前往 [vercel.com](https://vercel.com) 並登入
2. 點擊 "Add New..." → "Project"
3. 選擇你的 GitHub repository
4. 選擇 `Josh` branch（或你想要的 branch）

### 3. 配置專案設置

- **Framework Preset**: `Create React App`
- **Root Directory**: 留空（如果專案在根目錄）
- **Build Command**: `npm run build`（自動偵測）
- **Output Directory**: `build`（Create React App 預設）
- **Install Command**: `npm install`

### 4. 設置環境變數

在 Vercel 專案設置中，進入 **Settings** → **Environment Variables**，添加以下變數：

#### 必需的環境變數

| 變數名稱 | 說明 | 範例值 |
|---------|------|--------|
| `REACT_APP_GOOGLE_MAPS_API_KEY` | Google Maps API Key（用於地圖和地點搜尋） | `AIzaSy...` |
| `REACT_APP_API_URL` | 後端 API URL（如果後端部署在其他地方） | `https://your-backend.vercel.app` 或 `https://your-backend.railway.app` |

#### 環境變數設置說明

1. **REACT_APP_GOOGLE_MAPS_API_KEY**
   - 前往 [Google Cloud Console](https://console.cloud.google.com/)
   - 創建或選擇專案
   - 啟用 **Maps JavaScript API** 和 **Places API**
   - 創建 API Key
   - 在 Vercel 中設置此變數

2. **REACT_APP_API_URL**
   - 如果後端部署在 Vercel：`https://your-backend-project.vercel.app`
   - 如果後端部署在 Railway：`https://your-backend.railway.app`
   - 如果後端部署在其他地方：你的後端 URL
   - **注意**：如果前端和後端在同一個 Vercel 專案中，可以設置為相對路徑或使用 Vercel 的環境變數
   - **實際部署連結**：[https://other-dimension-inator.vercel.app/](https://other-dimension-inator.vercel.app/)

### 5. 部署

點擊 "Deploy" 按鈕，等待構建完成。

---

## 🔧 後端部署選項

### 選項 1：部署到 Vercel Serverless Functions

如果後端代碼在 `backend/` 目錄，可以將後端作為 Vercel Serverless Functions 部署。

#### 設置步驟

1. **創建 `vercel.json` 配置**（如果還沒有）

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/src/server.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/src/server.ts"
    }
  ]
}
```

2. **在 Vercel 設置後端環境變數**

進入專案設置 → **Environment Variables**，添加：

| 變數名稱 | 說明 | 必需 | 範例值 |
|---------|------|------|--------|
| `DATABASE_URL` | PostgreSQL 連接字符串 | ✅ 是 | `postgresql://user:pass@host:5432/db?sslmode=require` |
| `JWT_SECRET` | JWT 認證密鑰 | ✅ 是 | `your-random-secret-key` |
| `NODE_ENV` | 環境模式 | ❌ 否 | `production` |
| `FRONTEND_URL` | 前端 URL（用於 CORS） | ❌ 否 | `https://other-dimension-inator.vercel.app` |
| `CLOUDINARY_URL` | Cloudinary 連接字符串 | ❌ 否 | `cloudinary://key:secret@cloud_name` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary 雲名稱 | ❌ 否* | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | ❌ 否* | `your-api-key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | ❌ 否* | `your-api-secret` |

*如果設置了 `CLOUDINARY_URL`，則不需要單獨設置其他 Cloudinary 變數。

### 選項 2：部署到 Railway（推薦）

Railway 更適合長時間運行的 Node.js 應用。

#### 設置步驟

1. 前往 [railway.app](https://railway.app) 並登入
2. 創建新專案
3. 連接 GitHub repository
4. 選擇 `backend` 目錄作為根目錄
5. 設置環境變數（見下方）

#### Railway 環境變數設置

在 Railway 專案設置中，添加以下環境變數：

| 變數名稱 | 說明 | 必需 |
|---------|------|------|
| `DATABASE_URL` | PostgreSQL 連接字符串 | ✅ |
| `JWT_SECRET` | JWT 認證密鑰 | ✅ |
| `NODE_ENV` | `production` | ❌ |
| `FRONTEND_URL` | 前端 Vercel URL | ❌ |
| `CLOUDINARY_URL` | Cloudinary 連接字符串 | ❌ |

**Railway 會自動提供 PostgreSQL 資料庫**，你可以在專案設置中找到 `DATABASE_URL`。

### 選項 3：部署到 Render

類似 Railway，Render 也適合 Node.js 應用。

---

## 📝 完整的環境變數清單

### 前端環境變數（Vercel）

```bash
# 必需的
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSy...
REACT_APP_API_URL=https://your-backend.railway.app

# 可選的（如果後端在同一個 Vercel 專案）
# REACT_APP_API_URL=/api
```

### 後端環境變數（Railway/Render/Vercel）

```bash
# 必需的
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
JWT_SECRET=your-random-secret-key-at-least-32-characters-long

# 可選的
NODE_ENV=production
FRONTEND_URL=https://other-dimension-inator.vercel.app
PORT=5000

# Cloudinary（可選，如果未設置則使用本地存儲）
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
# 或者分別設置：
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 🔐 安全建議

1. **JWT_SECRET**
   - 使用至少 32 個字符的隨機字符串
   - 可以使用：`openssl rand -base64 32`

2. **DATABASE_URL**
   - 不要將連接字符串提交到 Git
   - 使用環境變數管理
   - 如果使用 NeonDB，連接字符串已包含 SSL 配置

3. **API Keys**
   - 在 Google Cloud Console 中限制 API Key 的使用範圍
   - 只啟用必要的 API（Maps JavaScript API、Places API）

---

## 🧪 測試部署

### 前端測試

1. 訪問你的 Vercel URL：[https://other-dimension-inator.vercel.app/](https://other-dimension-inator.vercel.app/)
2. 檢查瀏覽器控制台是否有錯誤
3. 測試 Google Maps 功能是否正常

### 後端測試

1. 訪問健康檢查端點：`https://your-backend.railway.app/api/health`
2. 應該返回：`{"status":"ok","timestamp":"..."}`

### 資料庫測試

1. 確保資料庫已初始化（運行 migration 和 seed）
2. 測試 API 端點：`https://your-backend.railway.app/api/boards`

---

## 🐛 常見問題

### 問題 1：前端無法連接到後端

**原因**：`REACT_APP_API_URL` 設置錯誤或 CORS 問題

**解決方法**：
1. 確認 `REACT_APP_API_URL` 指向正確的後端 URL
2. 在後端設置 `FRONTEND_URL` 環境變數
3. 檢查後端的 CORS 設置

### 問題 2：Google Maps 不顯示

**原因**：API Key 未設置或無效

**解決方法**：
1. 確認 `REACT_APP_GOOGLE_MAPS_API_KEY` 已設置
2. 檢查 Google Cloud Console 中的 API Key 是否啟用了正確的 API
3. 檢查 API Key 的使用限制（HTTP referrer）

### 問題 3：資料庫連接失敗

**原因**：`DATABASE_URL` 設置錯誤或資料庫未初始化

**解決方法**：
1. 確認 `DATABASE_URL` 格式正確
2. 如果使用 NeonDB，確保連接字符串包含 `?sslmode=require`
3. 運行資料庫 migration：`npm run db:migrate`

### 問題 4：圖片上傳失敗

**原因**：Cloudinary 未配置或本地存儲路徑錯誤

**解決方法**：
1. 如果使用 Cloudinary，設置 `CLOUDINARY_URL` 或相關變數
2. 如果使用本地存儲，確保上傳目錄有寫入權限
3. 在 Vercel Serverless Functions 中，本地存儲不持久，建議使用 Cloudinary

---

## 📚 相關文檔

- [Vercel 文檔](https://vercel.com/docs)
- [Railway 文檔](https://docs.railway.app)
- [後端設置指南](./backend/SETUP.md)
- [環境變數設置指南](./docs/ENV_SETUP.md)

---

## ✅ 部署檢查清單

### 前端（Vercel）
- [ ] 專案已推送到 GitHub
- [ ] 在 Vercel 創建專案並連接 GitHub
- [ ] 設置 `REACT_APP_GOOGLE_MAPS_API_KEY`
- [ ] 設置 `REACT_APP_API_URL`（指向後端）
- [ ] 構建成功
- [ ] 前端可以訪問

### 後端（Railway/Render/Vercel）
- [ ] 後端已部署
- [ ] 設置 `DATABASE_URL`
- [ ] 設置 `JWT_SECRET`
- [ ] 設置 `FRONTEND_URL`（用於 CORS）
- [ ] 資料庫已初始化（migration + seed）
- [ ] 健康檢查端點正常
- [ ] API 端點可以訪問

### 測試
- [ ] 前端可以加載
- [ ] Google Maps 正常顯示
- [ ] 可以登入/註冊
- [ ] 可以創建貼文
- [ ] 圖片可以上傳
- [ ] API 請求正常

---

完成以上步驟後，你的應用應該已經成功部署到 Vercel！🎉

