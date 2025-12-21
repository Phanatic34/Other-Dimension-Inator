# 設置指南

## 快速開始

### 1. 安裝依賴

```bash
cd backend
npm install
```

### 2. 配置環境變數

**重要：這是必須的步驟！**

複製 `.env.example` 為 `.env`：

```bash
cp .env.example .env
```

然後編輯 `.env` 文件，填入您的配置：

#### 必需的環境變數

- **`DATABASE_URL`** - PostgreSQL 資料庫連接字符串
  - 如果使用本地 PostgreSQL：
    ```
    DATABASE_URL=postgresql://username:password@localhost:5432/rendezvous
    ```
  - 如果使用 NeonDB（推薦）：
    ```
    DATABASE_URL=postgresql://user:password@ep-xxx.region.neon.tech/dbname?sslmode=require
    ```
  - 獲取 NeonDB 連接字符串：
    1. 前往 [NeonDB](https://neon.tech)
    2. 創建免費帳號
    3. 創建新專案
    4. 在專案設置中複製連接字符串

- **`JWT_SECRET`** - JWT 認證密鑰（請使用隨機字符串）
  ```
  JWT_SECRET=your-random-secret-key-here
  ```

#### 可選的環境變數

- **`PORT`** - 服務器端口（默認：5000）
- **`NODE_ENV`** - 環境模式（development/production）
- **`FRONTEND_URL`** - 前端 URL（用於 CORS）
- **`CLOUDINARY_*`** - Cloudinary 圖片上傳配置（如果未配置，將使用本地存儲）

### 3. 初始化資料庫

```bash
# 運行遷移以創建表結構
npm run db:migrate

# 填充初始測試資料
npm run db:seed
```

### 4. 啟動服務器

```bash
# 開發模式（自動重啟）
npm run dev

# 生產模式
npm run build
npm start
```

服務器將在 `http://localhost:5000` 啟動。

## 常見問題

### ❌ 錯誤：Database not configured

**原因：** 沒有設置 `DATABASE_URL` 環境變數。

**解決方法：**
1. 確認已創建 `.env` 文件
2. 確認 `.env` 文件中包含 `DATABASE_URL`
3. 確認 `DATABASE_URL` 格式正確
4. 重啟服務器

### ❌ 錯誤：Connection refused / Connection timeout

**原因：** 無法連接到資料庫。

**解決方法：**
1. 確認資料庫服務正在運行（本地 PostgreSQL）
2. 確認連接字符串中的主機、端口、用戶名、密碼正確
3. 如果使用 NeonDB，確認連接字符串包含 `?sslmode=require`
4. 檢查防火牆設置

### ❌ 錯誤：relation "users" does not exist

**原因：** 資料庫表尚未創建。

**解決方法：**
```bash
npm run db:migrate
```

### ❌ 錯誤：JWT secret not configured

**原因：** 沒有設置 `JWT_SECRET`。

**解決方法：**
在 `.env` 文件中添加：
```
JWT_SECRET=your-random-secret-key
```

## 測試連接

啟動服務器後，訪問：
- `http://localhost:5000/api/health` - 健康檢查
- `http://localhost:5000/api/boards` - 獲取看板列表

如果看到數據，說明連接成功！

## 需要幫助？

如果遇到問題：
1. 檢查終端機的錯誤訊息
2. 確認所有環境變數都已正確設置
3. 確認資料庫服務正在運行
4. 查看 `backend/README.md` 了解更多信息

