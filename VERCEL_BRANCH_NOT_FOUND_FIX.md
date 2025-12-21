# Vercel 找不到 Branch 的解決方法

## ✅ 確認 Branch 存在

從檢查結果可以看到，`Josh` branch **確實存在**於 GitHub：
- Remote URL: `https://github.com/Phanatic34/Other-Dimension-Inator.git`
- Branch: `origin/Josh` ✅

## 🔧 解決方法

### 方法 1：重新連接 GitHub Repository（推薦）

1. **前往 Vercel Dashboard**
   - 登入 [vercel.com](https://vercel.com)
   - 選擇專案 `other-dimension-inator`

2. **斷開並重新連接 Git**
   - 進入 **Settings** → **Git**
   - 找到 **"Connected Git Repository"** 部分
   - 點擊 **"Disconnect"** 或 **"Change Git Repository"**
   - 然後點擊 **"Connect Git Repository"**
   - 重新選擇 repository: `Phanatic34/Other-Dimension-Inator`
   - 確認連接

3. **等待同步**
   - Vercel 會自動同步所有分支
   - 等待幾秒鐘讓分支列表更新

4. **設置 Production Branch**
   - 在 **Settings** → **Git** 中
   - 找到 **"Production Branch"** 設置
   - 現在應該可以看到 `Josh` branch 了
   - 選擇 `Josh` 作為 Production Branch

### 方法 2：手動刷新分支列表

1. **在 Vercel Dashboard 中**
   - 進入 **Settings** → **Git**
   - 找到 **"Connected Git Repository"** 部分
   - 點擊 **"..."** 或 **"Refresh"** 按鈕（如果有）
   - 或者點擊 **"Reconnect"** 來刷新連接

### 方法 3：檢查 GitHub 權限

1. **檢查 Vercel 的 GitHub 權限**
   - 前往 GitHub: https://github.com/settings/applications
   - 找到 **"Authorized OAuth Apps"** 或 **"Installed GitHub Apps"**
   - 確認 Vercel 有權限訪問 `Phanatic34/Other-Dimension-Inator` repository
   - 如果沒有，需要重新授權

2. **在 GitHub 中檢查 Repository 設置**
   - 前往: https://github.com/Phanatic34/Other-Dimension-Inator/settings
   - 進入 **"Webhooks"** 標籤
   - 確認有 Vercel 的 webhook
   - 如果沒有，Vercel 會在重新連接時自動創建

### 方法 4：使用 Deploy Hooks（臨時解決方案）

如果上述方法都不行，可以使用 Deploy Hooks：

1. **在 Vercel Dashboard 中**
   - 進入 **Settings** → **Git** → **Deploy Hooks**
   - 但這需要先解決 branch 找不到的問題

## 🔍 檢查步驟

### 1. 確認 Repository 連接正確

在 Vercel Dashboard → Settings → Git 中，確認：
- **Repository**: `Phanatic34/Other-Dimension-Inator`
- **Provider**: GitHub
- **Status**: Connected

### 2. 確認 Branch 名稱大小寫

- GitHub 上的 branch 名稱：`Josh`（大寫 J）
- 在 Vercel 中輸入時，確保大小寫完全一致

### 3. 檢查 Vercel 的 GitHub App 權限

1. 前往 GitHub: https://github.com/settings/installations
2. 找到 **"Vercel"** 應用
3. 點擊 **"Configure"**
4. 確認 `Other-Dimension-Inator` repository 已授權
5. 如果沒有，點擊 **"Select repositories"** 並選擇該 repository

## 🚀 完整重置步驟（如果以上都不行）

### 步驟 1：在 Vercel 中斷開連接

1. Vercel Dashboard → Settings → Git
2. 點擊 **"Disconnect"**
3. 確認斷開

### 步驟 2：重新連接

1. 點擊 **"Connect Git Repository"**
2. 選擇 **GitHub**
3. 選擇 repository: `Phanatic34/Other-Dimension-Inator`
4. 確認連接

### 步驟 3：設置 Production Branch

1. 連接後，進入 **Settings** → **Git**
2. 在 **"Production Branch"** 下拉選單中
3. 應該可以看到所有分支，包括 `Josh`
4. 選擇 `Josh`

### 步驟 4：觸發首次部署

1. 進入 **Deployments** 標籤
2. 點擊 **"..."** → **"Redeploy"**
3. 選擇 branch: `Josh`
4. 點擊 **"Redeploy"**

## ⚠️ 常見問題

### Q: 為什麼 Vercel 找不到我的 branch？

**A:** 最常見的原因是：
1. Vercel 沒有同步到最新的分支信息
2. GitHub 權限問題
3. Repository 連接有問題

### Q: 重新連接會影響現有部署嗎？

**A:** 不會。重新連接只是刷新連接狀態，不會刪除現有部署。

### Q: 需要重新設置環境變數嗎？

**A:** 不需要。環境變數是專案級別的，不會因為重新連接 Git 而丟失。

## 📝 驗證步驟

完成重新連接後，確認：

1. ✅ Vercel Dashboard → Settings → Git 顯示正確的 repository
2. ✅ Production Branch 可以選擇 `Josh`
3. ✅ 在 Deployments 中可以看到 `Josh` branch 的部署
4. ✅ 推送新 commit 到 `Josh` branch 會自動觸發部署

## 🎯 推薦操作順序

1. **首先嘗試方法 1**（重新連接 GitHub Repository）
2. 如果不行，檢查 GitHub 權限（方法 3）
3. 如果還是不行，執行完整重置（完整重置步驟）

完成後，Vercel 應該就能找到 `Josh` branch 了！🚀

