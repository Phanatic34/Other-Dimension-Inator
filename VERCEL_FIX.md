# Vercel 部署修復說明

## 🔧 已修復的問題

1. ✅ **前端 API URL 自動檢測**：現在在生產環境中會自動使用相對路徑 `/api`（如果後端在同一個 Vercel 專案中）
2. ✅ **後端 CORS 設置**：已更新以支持 Vercel 部署
3. ✅ **資料庫 SSL 連接**：已修復以支持包含 `sslmode=require` 的連接字符串
4. ✅ **vercel.json 配置**：已更新以支持後端 API 路由

## 📋 環境變數設置

### 在 Vercel 專案設置中，你需要設置以下環境變數：

#### 必需的環境變數

1. **`DATABASE_URL`** ✅（你已經設置了）
   - PostgreSQL 連接字符串
   - 格式：`postgresql://user:password@host:port/database?sslmode=require`

2. **`JWT_SECRET`** ✅（你已經設置了）
   - JWT 認證密鑰

3. **`REACT_APP_GOOGLE_MAPS_API_KEY`** ✅（你已經設置了）
   - Google Maps API Key

4. **`CLOUDINARY_URL`** ✅（你已經設置了，可選）
   - Cloudinary 圖片上傳配置

#### 可選的環境變數

5. **`REACT_APP_API_URL`** ⚠️ **重要**
   - **如果後端也在同一個 Vercel 專案中**：**不需要設置**（會自動使用 `/api`）
   - **如果後端部署在其他地方**（如 Railway）：設置為後端的完整 URL
     - 例如：`https://your-backend.railway.app`
   - **如果未設置且後端在同一個 Vercel 專案中**：前端會自動使用 `/api`

6. **`FRONTEND_URL`**（可選）
   - 前端 URL，用於 CORS
   - 例如：`https://your-project.vercel.app`

7. **`NODE_ENV`**（可選）
   - 設置為 `production`

## 🚀 部署步驟

### 1. 確保所有環境變數已設置

在 Vercel 專案設置 → **Environment Variables** 中，確認以下變數：

- ✅ `DATABASE_URL`
- ✅ `JWT_SECRET`
- ✅ `REACT_APP_GOOGLE_MAPS_API_KEY`
- ✅ `CLOUDINARY_URL`（如果使用）
- ⚠️ `REACT_APP_API_URL`（**僅在後端部署在其他地方時需要**）

### 2. 重新部署

1. 在 Vercel Dashboard 中，點擊 **Deployments**
2. 找到最新的部署
3. 點擊 **"..."** → **"Redeploy"**
4. 或者推送新的 commit 到 GitHub，Vercel 會自動重新部署

### 3. 測試部署

部署完成後，測試以下功能：

1. **健康檢查**：訪問 `https://your-project.vercel.app/api/health`
   - 應該返回：`{"status":"ok","timestamp":"..."}`

2. **登入功能**：嘗試登入
   - 應該不再出現 `ERR_CONNECTION_REFUSED` 錯誤

3. **資料庫連接**：創建一個新貼文
   - 應該能成功保存到資料庫

## 🔍 故障排除

### 問題 1：仍然出現 `ERR_CONNECTION_REFUSED`

**可能原因：**
- 後端沒有正確部署
- `vercel.json` 配置有問題

**解決方法：**
1. 檢查 Vercel 部署日誌，確認後端是否成功構建
2. 確認 `vercel.json` 文件已正確提交到 GitHub
3. 如果後端部署失敗，檢查 `backend/package.json` 中的依賴

### 問題 2：API 請求返回 404

**可能原因：**
- API 路由配置不正確
- 後端代碼沒有正確部署

**解決方法：**
1. 檢查 Vercel 部署日誌中的構建輸出
2. 確認 `backend/src/server.ts` 文件存在
3. 訪問 `https://your-project.vercel.app/api/health` 測試 API

### 問題 3：資料庫連接失敗

**可能原因：**
- `DATABASE_URL` 格式不正確
- 資料庫未初始化

**解決方法：**
1. 確認 `DATABASE_URL` 包含 `?sslmode=require`（如果使用 NeonDB）
2. 在本地運行 `npm run db:migrate` 和 `npm run db:seed` 初始化資料庫
3. 或者創建一個 Vercel Serverless Function 來運行 migration

### 問題 4：CORS 錯誤

**可能原因：**
- `FRONTEND_URL` 未設置或設置錯誤

**解決方法：**
1. 在 Vercel 環境變數中設置 `FRONTEND_URL` 為你的 Vercel 前端 URL
2. 或者後端已經配置為允許所有來源（開發模式）

## 📝 重要提示

1. **如果後端在同一個 Vercel 專案中**：
   - 不需要設置 `REACT_APP_API_URL`
   - 前端會自動使用相對路徑 `/api`

2. **如果後端部署在其他地方**（如 Railway、Render）：
   - 必須設置 `REACT_APP_API_URL` 為後端的完整 URL
   - 例如：`REACT_APP_API_URL=https://your-backend.railway.app`

3. **資料庫初始化**：
   - 確保資料庫已經運行 migration 和 seed
   - 可以在本地運行，或者創建一個臨時的 Serverless Function 來運行

4. **環境變數更新後**：
   - 需要重新部署才能生效
   - 或者等待 Vercel 自動重新部署

## ✅ 檢查清單

部署前確認：

- [ ] 所有必需的環境變數已設置
- [ ] `vercel.json` 已正確配置
- [ ] 代碼已推送到 GitHub
- [ ] Vercel 已連接到 GitHub repository
- [ ] 資料庫已初始化（migration + seed）
- [ ] 重新部署後測試登入功能
- [ ] 測試 API 端點是否正常

完成以上步驟後，你的應用應該可以在 Vercel 上正常運行了！🎉

