# Vercel 完整部署指南

本指南將幫助您從零開始將專案部署到 Vercel。

## 📋 前置準備

### 1. 確認 GitHub 倉庫
- 確保您的專案已經推送到 GitHub：`https://github.com/Masq2005/other-dimension-inator`
- 確認 `main` 分支是最新的

### 2. 準備環境變數
您需要以下環境變數（請準備好這些值）：

#### 必需的環境變數：
- ✅ `DATABASE_URL` - PostgreSQL 資料庫連接字符串
- ✅ `JWT_SECRET` - JWT 認證密鑰
- ✅ `REACT_APP_GOOGLE_MAPS_API_KEY` - Google Maps API 金鑰
- ✅ `CLOUDINARY_URL` - Cloudinary 圖片上傳配置

#### 可選的環境變數：
- `FRONTEND_URL` - 前端 URL（用於 CORS，通常不需要，Vercel 會自動處理）
- `NODE_ENV` - 環境模式（已在 vercel.json 中設置為 `production`）

---

## 🚀 部署步驟

### 步驟 1：登入 Vercel

1. 前往 [https://vercel.com](https://vercel.com)
2. 使用您的 GitHub 帳號登入
3. 如果還沒有帳號，點擊 "Sign Up" 並使用 GitHub 授權

### 步驟 2：創建新專案

1. 在 Vercel Dashboard 中，點擊 **"Add New..."** → **"Project"**
2. 在 "Import Git Repository" 中，選擇或搜尋您的倉庫：
   - `Masq2005/other-dimension-inator`
3. 點擊 **"Import"**

### 步驟 3：配置專案設置

在專案配置頁面，確認以下設置：

#### Framework Preset
- **Framework Preset**: `Create React App`（應該會自動偵測）

#### Build Settings
- **Root Directory**: 留空（使用根目錄）
- **Build Command**: `npm run build`（應該會自動填入）
- **Output Directory**: `build`（應該會自動填入）
- **Install Command**: `npm install`（應該會自動填入）

#### Environment Variables
**重要：現在先不要設置環境變數，我們會在下一步設置**

### 步驟 4：設置環境變數

在專案配置頁面，找到 **"Environment Variables"** 區塊，點擊 **"Add"** 按鈕，依序添加以下變數：

#### 1. DATABASE_URL
- **Key**: `DATABASE_URL`
- **Value**: `postgresql://neondb_owner:npg_w40PsyVfkUiB@ep-spring-violet-a1iubsib-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
- **Environment**: 勾選所有環境（Production, Preview, Development）

#### 2. JWT_SECRET
- **Key**: `JWT_SECRET`
- **Value**: `89c6c4dd78f1b52b`
- **Environment**: 勾選所有環境（Production, Preview, Development）

#### 3. REACT_APP_GOOGLE_MAPS_API_KEY
- **Key**: `REACT_APP_GOOGLE_MAPS_API_KEY`
- **Value**: `AIzaSyAv1BKvyMI5BV1gtCWmB7L0ADbTJDGCyEA`
- **Environment**: 勾選所有環境（Production, Preview, Development）

#### 4. CLOUDINARY_URL
- **Key**: `CLOUDINARY_URL`
- **Value**: `cloudinary://664597584678965:m8Ray2tuGNmjA28sPd8iRns97-w@db76a8e0w`
- **Environment**: 勾選所有環境（Production, Preview, Development）

**注意事項：**
- 每個環境變數添加後，都要確認已勾選所有環境（Production, Preview, Development）
- 環境變數名稱必須完全一致（大小寫敏感）
- 值中不要有多餘的空格或引號

### 步驟 5：部署

1. 確認所有設置都正確後，點擊 **"Deploy"** 按鈕
2. 等待構建完成（通常需要 2-5 分鐘）
3. 構建過程中，您可以在 Dashboard 看到實時日誌

### 步驟 6：檢查部署狀態

部署完成後，您會看到：

#### ✅ 成功標誌
- 狀態顯示為 **"Ready"**（綠色）
- 顯示部署的 URL（例如：`https://other-dimension-inator.vercel.app`）

#### ❌ 如果部署失敗
- 狀態顯示為 **"Error"**（紅色）
- 點擊部署項目，查看 **"Build Logs"** 找出錯誤原因
- 常見問題請參考下方的「故障排除」章節

### 步驟 7：測試部署

部署成功後，測試以下功能：

1. **訪問首頁**
   - 打開部署的 URL
   - 確認頁面正常載入

2. **測試 API**
   - 訪問 `https://your-project.vercel.app/api/health`
   - 應該返回：`{"status":"ok","timestamp":"..."}`

3. **測試前端功能**
   - 測試 Google Maps 功能（需要 API Key）
   - 測試用戶註冊/登入（需要資料庫連接）
   - 測試圖片上傳（需要 Cloudinary）

---

## 🔧 專案配置說明

### vercel.json 配置

專案已包含 `vercel.json` 配置文件，包含以下設置：

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "installCommand": "npm install",
  "framework": "create-react-app",
  "builds": [
    {
      "src": "api/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "api/index.ts"
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

**配置說明：**
- **前端**：React 應用構建到 `build` 目錄
- **後端 API**：通過 `api/index.ts` 作為 serverless function
- **路由**：
  - `/api/*` → 後端 API
  - `/*` → React 前端（支持 React Router）

### 專案結構

```
專案根目錄/
├── api/
│   └── index.ts          # Vercel serverless function 入口點
├── backend/
│   └── src/
│       └── server.ts     # Express 後端服務器
├── src/                  # React 前端源碼
├── public/               # 靜態資源
├── package.json          # 前端依賴
├── backend/package.json  # 後端依賴
└── vercel.json           # Vercel 配置文件
```

---

## 🐛 故障排除

### 問題 1：構建失敗 - "Module not found"

**原因**：依賴未正確安裝

**解決方法**：
1. 確認 `package.json` 和 `backend/package.json` 都存在
2. 檢查 Vercel 構建日誌，確認 `npm install` 成功執行
3. 如果問題持續，嘗試在本地運行 `npm install` 確認依賴正確

### 問題 2：API 路由 404

**原因**：API 入口點配置錯誤

**解決方法**：
1. 確認 `api/index.ts` 文件存在
2. 確認 `vercel.json` 中的路由配置正確
3. 檢查構建日誌，確認 `@vercel/node` 正確構建

### 問題 3：資料庫連接失敗

**原因**：環境變數未正確設置

**解決方法**：
1. 確認 `DATABASE_URL` 環境變數已設置
2. 確認環境變數在所有環境中都已設置（Production, Preview, Development）
3. 檢查 `DATABASE_URL` 格式是否正確（包含 `sslmode=require`）
4. 確認 NeonDB 資料庫允許來自 Vercel 的連接

### 問題 4：Google Maps 無法載入

**原因**：API Key 未設置或無效

**解決方法**：
1. 確認 `REACT_APP_GOOGLE_MAPS_API_KEY` 環境變數已設置
2. 確認 API Key 在 Google Cloud Console 中已啟用以下 API：
   - Maps JavaScript API
   - Places API
   - Geocoding API（可選）
3. 確認 API Key 的 HTTP 引用限制允許您的 Vercel 域名

### 問題 5：圖片上傳失敗

**原因**：Cloudinary 配置錯誤

**解決方法**：
1. 確認 `CLOUDINARY_URL` 環境變數已設置
2. 確認 Cloudinary URL 格式正確
3. 檢查 Cloudinary Dashboard 確認帳號狀態正常

### 問題 6：前端路由 404（刷新頁面後）

**原因**：SPA 路由重寫配置錯誤

**解決方法**：
1. 確認 `vercel.json` 中的 `rewrites` 配置正確
2. 確認所有非 API 路由都重寫到 `/index.html`

---

## 📝 環境變數檢查清單

部署前，請確認以下環境變數都已設置：

- [ ] `DATABASE_URL` - PostgreSQL 連接字符串
- [ ] `JWT_SECRET` - JWT 認證密鑰
- [ ] `REACT_APP_GOOGLE_MAPS_API_KEY` - Google Maps API 金鑰
- [ ] `CLOUDINARY_URL` - Cloudinary 配置

**重要提示：**
- 所有環境變數都應該在 **Production**、**Preview** 和 **Development** 環境中設置
- 環境變數名稱必須完全一致（大小寫敏感）
- 值中不要包含引號（除非值本身需要引號）

---

## 🔄 更新部署

### 自動部署

Vercel 會自動監聽 GitHub 倉庫的推送：
- 當您推送到 `main` 分支時，會自動觸發生產環境部署
- 當您推送到其他分支時，會創建預覽部署

### 手動重新部署

如果需要手動重新部署：

1. 前往 Vercel Dashboard
2. 選擇您的專案
3. 點擊 **"Deployments"** 標籤
4. 找到要重新部署的版本
5. 點擊右側的 **"..."** 選單
6. 選擇 **"Redeploy"**

### 回滾到之前的版本

如果新部署有問題，可以回滾：

1. 前往 **"Deployments"** 標籤
2. 找到之前成功的部署
3. 點擊右側的 **"..."** 選單
4. 選擇 **"Promote to Production"**

---

## 📞 獲取幫助

如果遇到問題：

1. **查看構建日誌**：在 Vercel Dashboard 中查看詳細的構建日誌
2. **檢查環境變數**：確認所有環境變數都已正確設置
3. **查看 Vercel 文檔**：[https://vercel.com/docs](https://vercel.com/docs)
4. **聯繫支持**：在 Vercel Dashboard 中提交支持請求

---

## ✅ 部署成功檢查清單

部署完成後，請確認：

- [ ] 網站可以正常訪問
- [ ] API 健康檢查端點正常：`/api/health`
- [ ] 前端頁面正常載入
- [ ] Google Maps 功能正常
- [ ] 用戶註冊/登入功能正常（需要資料庫）
- [ ] 圖片上傳功能正常（需要 Cloudinary）
- [ ] 所有路由正常工作（包括 React Router 路由）

---

## 🎉 完成！

如果所有檢查項目都通過，恭喜您！專案已成功部署到 Vercel。

您的網站現在應該可以通過 Vercel 提供的 URL 訪問了。

**記住：**
- 每次推送到 GitHub 的 `main` 分支都會自動觸發部署
- 環境變數的更改需要重新部署才能生效
- 如果遇到問題，請查看構建日誌找出原因

