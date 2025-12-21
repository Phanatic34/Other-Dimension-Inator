# ⚡ Cloudinary 快速設置指南

這是一個簡化版的設置指南，幫助您快速開始使用 Cloudinary。

## 📋 第一步：獲取 Cloudinary URL

### 1. 登錄 Cloudinary Dashboard

1. 訪問 [cloudinary.com](https://cloudinary.com/) 並登錄

### 2. 找到您的憑證

在 Dashboard 中，點擊右上角的 **"Account Details"** 或您的帳號名稱。

您會看到：
- **Cloud name**: `your-cloud-name`
- **API Key**: `123456789012345`
- **API Secret**: `abcdefghijklmnopqrstuvwxyz123456`

### 3. 組合 Cloudinary URL

格式：`cloudinary://API_KEY:API_SECRET@CLOUD_NAME`

**範例：**
```
cloudinary://123456789012345:abcdefghijklmnopqrstuvwxyz123456@your-cloud-name
```

---

## 📝 第二步：設置環境變數

打開 `backend/.env` 文件，找到 `CLOUDINARY_URL=` 這一行，填入您的 URL：

```env
CLOUDINARY_URL=cloudinary://123456789012345:abcdefghijklmnopqrstuvwxyz123456@your-cloud-name
```

---

## 📦 第三步：安裝依賴

在 `backend` 目錄下運行：

```bash
cd backend
npm install cloudinary multer multer-storage-cloudinary
npm install --save-dev @types/multer
```

---

## ✅ 第四步：驗證設置

### 1. 重啟後端服務器

```bash
npm run dev
```

您應該看到：
```
✅ Cloudinary configured from CLOUDINARY_URL
🚀 Server running on http://localhost:3001
```

### 2. 測試圖片上傳

使用 Postman 或 curl 測試：

```bash
curl -X POST http://localhost:3001/api/upload/image \
  -F "image=@/path/to/your/image.jpg"
```

如果成功，您會收到：

```json
{
  "success": true,
  "imageUrl": "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/rendezvous/xxx.jpg",
  "message": "Image uploaded successfully"
}
```

---

## 🎯 使用方式

### 在前端上傳圖片

```typescript
const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('http://localhost:3001/api/upload/image', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data.imageUrl; // 這是 Cloudinary 的圖片 URL
};
```

### 上傳多張圖片

```typescript
const uploadImages = async (files: File[]) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('images', file);
  });

  const response = await fetch('http://localhost:3001/api/upload/images', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data.imageUrls; // 這是圖片 URL 陣列
};
```

---

## 📚 已創建的文件

我已經為您創建了以下文件：

1. **`backend/src/config/cloudinary.ts`** - Cloudinary 配置
2. **`backend/src/middleware/upload.ts`** - 圖片上傳中間件
3. **`backend/src/routes/upload.ts`** - 圖片上傳 API 路由
4. **`backend/src/server.ts`** - 已更新，添加了上傳路由

---

## 🆘 常見問題

### 問題 1：找不到 Cloudinary URL

**解決方案：**
- 確認您已登錄 Cloudinary Dashboard
- 在 "Account Details" 中查找
- 手動組合：`cloudinary://API_KEY:API_SECRET@CLOUD_NAME`

### 問題 2：上傳失敗 "Invalid credentials"

**解決方案：**
- 檢查 `CLOUDINARY_URL` 格式是否正確
- 確認沒有多餘的空格
- 確認 API Key、API Secret 和 Cloud name 都正確

### 問題 3：找不到 multer-storage-cloudinary

**解決方案：**
```bash
npm install multer-storage-cloudinary
```

---

## 📖 詳細文檔

查看完整指南：**[docs/Cloudinary設置指南.md](./Cloudinary設置指南.md)**

---

**完成！現在您可以開始上傳圖片了！** 🎉




