# Rendezvous 後端 API

Rendezvous 美食社交平台的後端 API 服務器，使用 Node.js + Express + TypeScript + PostgreSQL (NeonDB) 構建。

## 功能特性

- ✅ RESTful API 設計
- ✅ PostgreSQL 資料庫（NeonDB）
- ✅ TypeScript 類型安全
- ✅ 所有 mock 資料已遷移到資料庫
- ✅ 用戶資料和保存餐廳功能支持

## 技術棧

- **Node.js** - 運行環境
- **Express** - Web 框架
- **TypeScript** - 類型安全
- **PostgreSQL** - 資料庫（通過 NeonDB）
- **pg** - PostgreSQL 客戶端

## 設置

### 1. 安裝依賴

```bash
cd backend
npm install
```

### 2. 配置環境變數 ⚠️ **重要：這是必須的步驟！**

複製 `.env.example` 為 `.env` 並填入您的值：

```bash
cp .env.example .env
```

編輯 `.env` 文件，**至少需要設置以下變數：**

```env
# 必需的環境變數
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-random-secret-key-here

# 可選的環境變數
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

**重要提示：**
- 如果沒有設置 `DATABASE_URL`，所有資料庫功能將無法使用
- `JWT_SECRET` 應該是一個隨機字符串，用於 JWT 認證
- 如果使用 NeonDB，連接字符串格式：`postgresql://user:password@ep-xxx.region.neon.tech/dbname?sslmode=require`

**詳細設置說明請查看 `SETUP.md`**

### 3. 初始化資料庫

```bash
# 運行遷移以創建表
npm run db:migrate

# 填充初始資料
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

服務器將在 `http://localhost:3001` 啟動。

## API 端點

### 看板 (Boards)

- `GET /api/boards` - 獲取所有看板
- `GET /api/boards/:id` - 獲取單個看板

### 貼文 (Posts)

- `GET /api/posts` - 獲取所有貼文
  - 查詢參數：`type` (review|meetup), `boardId`, `feedFilter` (all|following)
- `GET /api/posts/:id` - 獲取單個貼文

### 用戶 (Users)

- `GET /api/users/:username/profile` - 獲取用戶資料
- `GET /api/users/recommended` - 獲取推薦用戶

### 餐廳 (Restaurants)

- `GET /api/restaurants` - 獲取所有餐廳
- `POST /api/restaurants/:id/save` - 保存餐廳
- `DELETE /api/restaurants/:id/unsave` - 取消保存餐廳

## 資料庫結構

查看 `src/db/schema.sql` 了解完整的資料庫結構。

## 開發

### 專案結構

```
backend/
├── src/
│   ├── db/           # 資料庫相關
│   │   ├── database.ts
│   │   ├── schema.sql
│   │   ├── migrate.ts
│   │   └── seed.ts
│   ├── routes/      # API 路由
│   │   ├── boards.ts
│   │   ├── posts.ts
│   │   ├── users.ts
│   │   └── restaurants.ts
│   ├── types/       # TypeScript 類型
│   │   └── models.ts
│   └── server.ts    # 主服務器文件
├── dist/            # 編譯輸出
└── package.json
```

## 許可證

本專案僅供教育用途。
