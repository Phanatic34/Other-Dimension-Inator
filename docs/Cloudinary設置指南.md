# ☁️ Cloudinary 圖片上傳設置指南

本指南將幫助您設置 Cloudinary 用於圖片上傳功能。

## 📋 第一步：獲取 Cloudinary URL

### 1. 登錄 Cloudinary Dashboard

1. 訪問 [cloudinary.com](https://cloudinary.com/)
2. 點擊右上角 **"Login"** 登錄您的帳號

### 2. 進入 Dashboard

登錄後，您會看到 Dashboard 主頁面，顯示：
- **Account Details**（帳號詳情）
- **Usage Statistics**（使用統計）
- **Media Library**（媒體庫）

### 3. 獲取 Cloudinary URL

在 Dashboard 的右上角或左側欄，找到 **"Account Details"** 或點擊您的帳號名稱。

您會看到以下信息：

```
Cloud name: your-cloud-name
API Key: 123456789012345
API Secret: abcdefghijklmnopqrstuvwxyz123456
```

**重要：** 您需要的是 **Cloudinary URL**，格式如下：

```
cloudinary://API_KEY:API_SECRET@CLOUD_NAME
```

或者使用環境變數格式：

```
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
```

**範例：**
```
CLOUDINARY_URL=cloudinary://123456789012345:abcdefghijklmnopqrstuvwxyz123456@your-cloud-name
```

### 4. 複製 Cloudinary URL

1. 在 Dashboard 中，找到 **"Account Details"** 區塊
2. 您可以直接複製 **"Cloudinary URL"**（如果顯示）
3. 或者手動組合：
   - `cloudinary://` + `API Key` + `:` + `API Secret` + `@` + `Cloud name`

---

## 📝 第二步：設置環境變數

### 1. 打開後端環境變數文件

打開 `backend/.env` 文件

### 2. 填入 Cloudinary URL

找到 `CLOUDINARY_URL=` 這一行，填入您剛才獲取的 URL：

```env
CLOUDINARY_URL=cloudinary://123456789012345:abcdefghijklmnopqrstuvwxyz123456@your-cloud-name
```

**重要提示：**
- 不要包含空格
- 確保格式正確：`cloudinary://API_KEY:API_SECRET@CLOUD_NAME`
- 不要將此 URL 提交到 Git（已在 `.gitignore` 中）

---

## 📦 第三步：安裝 Cloudinary SDK

### 1. 進入後端目錄

```bash
cd backend
```

### 2. 安裝 Cloudinary 套件

```bash
npm install cloudinary
```

### 3. 安裝 Multer（用於處理文件上傳）

```bash
npm install multer
npm install --save-dev @types/multer
```

---

## 🔧 第四步：配置 Cloudinary

### 1. 創建 Cloudinary 配置文件

在 `backend/src/` 目錄下創建 `config/cloudinary.ts`：

```typescript
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// 從環境變數或 CLOUDINARY_URL 配置 Cloudinary
if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    // Cloudinary 會自動從 CLOUDINARY_URL 解析配置
  });
} else {
  // 或者手動配置（如果使用單獨的環境變數）
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export default cloudinary;
```

### 2. 創建圖片上傳中間件

在 `backend/src/middleware/` 目錄下創建 `upload.ts`：

```typescript
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';

// 配置 Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'rendezvous', // 在 Cloudinary 中創建的文件夾名稱
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' }, // 限制最大尺寸
        { quality: 'auto' }, // 自動優化品質
      ],
    };
  },
});

// 配置 Multer
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB 限制
  },
  fileFilter: (req, file, cb) => {
    // 只允許圖片格式
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('只允許上傳圖片文件'));
    }
  },
});
```

**注意：** 需要安裝 `multer-storage-cloudinary`：

```bash
npm install multer-storage-cloudinary
```

---

## 🚀 第五步：創建圖片上傳 API

### 1. 創建上傳路由

在 `backend/src/routes/` 目錄下創建 `upload.ts`：

```typescript
import { Router, Request, Response } from 'express';
import { upload } from '../middleware/upload';

const router = Router();

// 單張圖片上傳
router.post('/image', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '沒有上傳圖片' });
    }

    // req.file.path 是 Cloudinary 返回的圖片 URL
    const imageUrl = (req.file as any).path;

    res.json({
      success: true,
      imageUrl: imageUrl,
      message: '圖片上傳成功',
    });
  } catch (error) {
    console.error('圖片上傳失敗:', error);
    res.status(500).json({ error: '圖片上傳失敗' });
  }
});

// 多張圖片上傳
router.post('/images', upload.array('images', 10), async (req: Request, res: Response) => {
  try {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ error: '沒有上傳圖片' });
    }

    const files = req.files as Express.Multer.File[];
    const imageUrls = files.map((file) => (file as any).path);

    res.json({
      success: true,
      imageUrls: imageUrls,
      message: '圖片上傳成功',
    });
  } catch (error) {
    console.error('圖片上傳失敗:', error);
    res.status(500).json({ error: '圖片上傳失敗' });
  }
});

export default router;
```

### 2. 在主服務器中註冊路由

在 `backend/src/server.ts` 中添加：

```typescript
import uploadRouter from './routes/upload';

// ... 其他導入

// API Routes
app.use('/api/boards', boardsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/restaurants', restaurantsRouter);
app.use('/api/upload', uploadRouter); // 添加這一行
```

---

## 🧪 第六步：測試圖片上傳

### 使用 Postman 或 curl 測試

#### 單張圖片上傳

```bash
curl -X POST http://localhost:3001/api/upload/image \
  -F "image=@/path/to/your/image.jpg"
```

#### 多張圖片上傳

```bash
curl -X POST http://localhost:3001/api/upload/images \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg"
```

### 使用前端測試

在前端代碼中：

```typescript
const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('http://localhost:3001/api/upload/image', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data.imageUrl; // 返回 Cloudinary 的圖片 URL
};
```

---

## 📸 第七步：在貼文中使用

### 更新 ReviewPost 創建

在 `backend/src/routes/posts.ts` 中，當創建貼文時：

```typescript
// 如果前端已經上傳圖片到 Cloudinary，直接使用 URL
// 或者在上傳貼文時同時上傳圖片

router.post('/review', upload.array('images', 10), async (req: Request, res: Response) => {
  try {
    const { title, content, restaurantName, ... } = req.body;
    
    // 獲取上傳的圖片 URLs
    const imageUrls = req.files 
      ? (req.files as Express.Multer.File[]).map(file => (file as any).path)
      : [];

    // 創建貼文並保存圖片 URLs
    // ...
  } catch (error) {
    // 錯誤處理
  }
});
```

---

## ✅ 驗證設置

### 1. 檢查環境變數

確認 `backend/.env` 中有：

```env
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
```

### 2. 檢查套件安裝

```bash
cd backend
npm list cloudinary multer multer-storage-cloudinary
```

### 3. 測試連接

創建測試文件 `backend/test-cloudinary.ts`：

```typescript
import cloudinary from './src/config/cloudinary';

cloudinary.api.ping((error, result) => {
  if (error) {
    console.error('Cloudinary 連接失敗:', error);
  } else {
    console.log('✅ Cloudinary 連接成功!', result);
  }
});
```

運行測試：

```bash
npx ts-node backend/test-cloudinary.ts
```

---

## 🎯 常見問題

### 問題 1：找不到 Cloudinary URL

**解決方案：**
- 確認您已登錄 Cloudinary Dashboard
- 在 Dashboard 的 "Account Details" 中查找
- 如果沒有顯示，可以手動組合：`cloudinary://API_KEY:API_SECRET@CLOUD_NAME`

### 問題 2：上傳失敗 "Invalid credentials"

**解決方案：**
- 檢查 `CLOUDINARY_URL` 格式是否正確
- 確認 API Key 和 API Secret 沒有多餘的空格
- 確認 Cloud name 正確

### 問題 3：圖片太大無法上傳

**解決方案：**
- 檢查 `multer` 的 `limits.fileSize` 設置
- 在 Cloudinary 配置中添加圖片壓縮
- 前端上傳前先壓縮圖片

### 問題 4：找不到 multer-storage-cloudinary

**解決方案：**
```bash
npm install multer-storage-cloudinary
```

---

## 📚 參考資源

- [Cloudinary 官方文檔](https://cloudinary.com/documentation)
- [Multer 文檔](https://github.com/expressjs/multer)
- [Cloudinary Node.js SDK](https://cloudinary.com/documentation/node_integration)

---

## 🎉 完成！

現在您已經設置好 Cloudinary，可以開始上傳圖片了！

**下一步：**
1. 測試圖片上傳功能
2. 在創建貼文時集成圖片上傳
3. 優化圖片大小和品質設置

---

**祝開發順利！** 🚀




