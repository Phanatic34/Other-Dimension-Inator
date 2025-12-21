# Vercel 自動部署問題排查指南

## 🔍 可能的原因

### 1. Vercel 連接到錯誤的 Branch

**問題：** Vercel 可能連接到 `main` branch，但你推送到了 `Josh` branch。

**解決方法：**

1. 前往 [Vercel Dashboard](https://vercel.com/dashboard)
2. 選擇你的專案 `other-dimension-inator`
3. 進入 **Settings** → **Git**
4. 檢查 **Production Branch** 設置
5. 如果顯示 `main`，改為 `Josh`
6. 或者，在 **Deployments** 標籤中，手動觸發部署

### 2. GitHub Webhook 未正確設置

**檢查方法：**

1. 在 Vercel 專案設置中，進入 **Settings** → **Git**
2. 確認 GitHub repository 已正確連接
3. 如果顯示 "Disconnected"，點擊 "Connect" 重新連接

### 3. 自動部署被禁用

**檢查方法：**

1. 在 Vercel 專案設置中，進入 **Settings** → **Git**
2. 確認 **"Automatically deploy every push"** 已啟用
3. 如果未啟用，啟用它

### 4. 推送到了錯誤的 Repository

**檢查方法：**

```bash
# 確認當前 remote URL
git remote -v

# 應該顯示：
# origin  https://github.com/Phanatic34/Other-Dimension-Inator.git
```

如果 URL 不正確，需要更新：

```bash
git remote set-url origin https://github.com/Phanatic34/Other-Dimension-Inator.git
```

## 🚀 快速解決方案

### 方案 1：更改 Vercel 的 Production Branch

1. 登入 [Vercel Dashboard](https://vercel.com/dashboard)
2. 選擇專案 `other-dimension-inator`
3. **Settings** → **Git**
4. 在 **Production Branch** 中，將 `main` 改為 `Josh`
5. 點擊 **Save**
6. Vercel 會自動觸發一次部署

### 方案 2：手動觸發部署

1. 登入 [Vercel Dashboard](https://vercel.com/dashboard)
2. 選擇專案 `other-dimension-inator`
3. 進入 **Deployments** 標籤
4. 點擊右上角的 **"..."** → **"Redeploy"**
5. 選擇要部署的 branch（選擇 `Josh`）
6. 點擊 **"Redeploy"**

### 方案 3：推送一個空 commit 觸發部署

```bash
git commit --allow-empty -m "Trigger Vercel deployment"
git push origin Josh
```

### 方案 4：檢查 Vercel 的 GitHub Integration

1. 前往 [Vercel Dashboard](https://vercel.com/dashboard)
2. 點擊右上角頭像 → **Settings**
3. 進入 **Git** 標籤
4. 確認 GitHub 已連接
5. 如果未連接，點擊 **"Connect"** 連接 GitHub

## 📋 檢查清單

在 Vercel Dashboard 中確認：

- [ ] 專案已連接到正確的 GitHub repository
- [ ] Production Branch 設置為 `Josh`（或你想要的 branch）
- [ ] "Automatically deploy every push" 已啟用
- [ ] GitHub webhook 狀態正常（在 GitHub repository 的 Settings → Webhooks 中檢查）

## 🔧 如果以上方法都不行

### 方法 1：重新連接 GitHub

1. 在 Vercel 專案設置中，**Settings** → **Git**
2. 點擊 **"Disconnect"**
3. 然後點擊 **"Connect Git Repository"**
4. 重新選擇 repository 和 branch

### 方法 2：檢查 GitHub Repository 設置

1. 前往 GitHub repository: https://github.com/Phanatic34/Other-Dimension-Inator
2. 進入 **Settings** → **Webhooks**
3. 確認有 Vercel 的 webhook
4. 如果沒有，Vercel 會在重新連接時自動創建

### 方法 3：使用 Vercel CLI 手動部署

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入 Vercel
vercel login

# 在專案目錄中部署
cd C:\Users\erf\Desktop\wp-final
vercel --prod
```

## 📝 確認部署狀態

部署後，檢查：

1. **Vercel Dashboard** → **Deployments** 標籤
   - 應該看到最新的部署記錄
   - 狀態應該是 "Ready" 或 "Building"

2. **GitHub Repository** → **Actions** 標籤（如果啟用了 GitHub Actions）
   - 檢查是否有 Vercel 的部署動作

3. **瀏覽器控制台**
   - 訪問 https://other-dimension-inator.vercel.app/
   - 檢查 Network 標籤，確認 API 請求是否正常

## ⚠️ 常見問題

### Q: 為什麼推送後沒有自動部署？

**A:** 最常見的原因是 Vercel 連接到 `main` branch，但你推送到了 `Josh` branch。

### Q: 如何確認 Vercel 監聽哪個 branch？

**A:** 在 Vercel Dashboard → Settings → Git 中查看 **Production Branch** 設置。

### Q: 可以同時監聽多個 branch 嗎？

**A:** 可以！Vercel 會為每個 branch 創建 Preview Deployments。但只有 Production Branch 會自動部署到生產環境。

### Q: 如何為特定 branch 設置自動部署？

**A:** 在 Vercel Dashboard → Settings → Git 中，可以設置：
- **Production Branch**: 生產環境的 branch
- **Preview Deployments**: 所有其他 branch 會自動創建 preview 部署

## 🎯 推薦設置

為了確保自動部署正常工作，建議：

1. **設置 Production Branch 為 `Josh`**
   - 這樣每次推送到 `Josh` branch 都會自動部署到生產環境

2. **啟用自動部署**
   - Settings → Git → "Automatically deploy every push"

3. **檢查 GitHub Webhook**
   - 確保 GitHub repository 中有 Vercel 的 webhook

完成以上設置後，每次推送到 `Josh` branch 都會自動觸發 Vercel 部署！🚀

