# 環境變數設置指南

本指南說明如何設置專案所需的所有環境變數。

## 📋 需要的環境變數

### 前端 (.env.local)

在專案根目錄創建 `.env.local` 文件：

```env
# Google Maps API Key
# Required for location search and map features
# Get your API key from: https://console.cloud.google.com/
# Enable: Maps JavaScript API, Places API, Geocoding API
REACT_APP_GOOGLE_MAPS_API_KEY=
```

**如何獲取 Google Maps API Key：**
1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 創建或選擇專案
3. 啟用以下 API：
   - Maps JavaScript API
   - Places API
   - Geocoding API（可選，用於反向地理編碼）
4. 進入「憑證」→「建立憑證」→「API 金鑰」
5. 複製 API 金鑰並貼到 `.env.local` 中

### 後端 (backend/.env)

在 `backend` 目錄創建 `.env` 文件：

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Secret (generate a random string)
# Generate with: openssl rand -hex 64
# Or: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=

# NeonDB Database Connection
# Get this from your NeonDB project dashboard
# Format: postgresql://username:password@host.neon.tech/dbname?sslmode=require
DATABASE_URL=

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

## 🚀 快速設置

### 前端

1. 在專案根目錄創建 `.env.local`：
   ```bash
   # Windows PowerShell
   Copy-Item .env.example .env.local
   
   # Linux/Mac
   cp .env.example .env.local
   ```

2. 編輯 `.env.local` 並添加您的 Google Maps API 金鑰：
   ```env
   REACT_APP_GOOGLE_MAPS_API_KEY=your-api-key-here
   ```

### 後端

1. 在 `backend` 目錄創建 `.env`：
   ```bash
   cd backend
   
   # Windows PowerShell
   Copy-Item .env.example .env
   
   # Linux/Mac
   cp .env.example .env
   ```

2. 編輯 `.env` 並填入：
   - `JWT_SECRET`：生成隨機字符串（見下方）
   - `DATABASE_URL`：您的 NeonDB 連接字符串
   - `FRONTEND_URL`：通常是 `http://localhost:3000`

## 🔑 生成 JWT Secret

### Windows PowerShell
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(64))
```

### Linux/Mac
```bash
openssl rand -hex 64
```

### Node.js
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📝 文件位置

```
wp-final/
├── .env.local          # 前端環境變數（創建此文件）
├── .env.example        # 前端範例（模板）
└── backend/
    ├── .env            # 後端環境變數（創建此文件）
    └── .env.example    # 後端範例（模板）
```

## ⚠️ 重要注意事項

1. **永遠不要**將 `.env` 或 `.env.local` 提交到 Git - 它們已在 `.gitignore` 中
2. **更改環境變數後需重啟服務器**
3. **前端**：Create React App 要求環境變數以 `REACT_APP_` 開頭
4. **後端**：所有變數通過 `dotenv` 套件載入

## ✅ 驗證

設置完成後，驗證您的配置：

### 前端
```bash
npm start
# 檢查瀏覽器控制台是否有 API 金鑰錯誤
```

### 後端
```bash
cd backend
npm run dev
# 應該看到：✅ Connected to NeonDB PostgreSQL database
```

## 🆘 故障排除

### 前端：Google Maps 無法載入
- 檢查 `REACT_APP_GOOGLE_MAPS_API_KEY` 是否正確設置
- 確認 API 金鑰已啟用所需的 API
- 檢查瀏覽器控制台的錯誤訊息

### 後端：資料庫連接失敗
- 確認 `DATABASE_URL` 是否正確
- 檢查 NeonDB 專案是否為活動狀態
- 確保連接字符串包含 `?sslmode=require`

### 環境變數不生效
- 確認文件名稱正確（前端用 `.env.local`，後端用 `.env`）
- 更改後重啟開發服務器
- 檢查變數名稱是否有拼寫錯誤
