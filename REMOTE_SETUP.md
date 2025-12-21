# Git Remote 設置說明

## 📋 當前 Remote 設置

專案現在連接到兩個 GitHub repository：

1. **origin** (原始 repository)
   - URL: `https://github.com/Phanatic34/Other-Dimension-Inator.git`
   - 用途：主要開發 repository

2. **masq2005** (Vercel 連接的 repository)
   - URL: `https://github.com/Masq2005/other-dimension-inator.git`
   - 用途：Vercel 部署使用的 repository

## 🚀 推送代碼到兩個 Repository

### 推送到原始 Repository (Phanatic34)

```bash
git push origin Josh
git push origin main
```

### 推送到 Vercel Repository (Masq2005)

```bash
git push masq2005 Josh
git push masq2005 main
```

### 同時推送到兩個 Repository

```bash
# 推送到兩個 remote
git push origin Josh && git push masq2005 Josh
```

## 🔧 更新 Vercel 設置

現在 `Josh` branch 已經在 `Masq2005/other-dimension-inator` repository 中了：

1. **前往 Vercel Dashboard**
   - 進入專案 `other-dimension-inator`
   - Settings → Git

2. **確認 Repository 連接**
   - 應該顯示：`Masq2005/other-dimension-inator`
   - 如果顯示其他，需要重新連接

3. **設置 Production Branch**
   - Settings → Environments → Production
   - 在 "Branch is" 中選擇 `Josh`
   - 現在應該可以找到了！

## 📝 日常使用

### 推送新更改

推送到兩個 repository：

```bash
# 推送到原始 repository
git push origin Josh

# 推送到 Vercel repository
git push masq2005 Josh
```

### 或者設置同時推送

```bash
# 設置 push.default 為推送所有 remote
git config push.default matching

# 或者使用腳本
```

## ⚠️ 注意事項

1. **保持兩個 Repository 同步**
   - 每次推送代碼時，記得推送到兩個 repository
   - 或者只推送到 `masq2005`（如果 Vercel 只用這個）

2. **Vercel 設置**
   - 確認 Vercel 連接到 `Masq2005/other-dimension-inator`
   - Production Branch 設置為 `Josh`

3. **環境變數**
   - 兩個 repository 的環境變數設置是獨立的
   - 確保 Vercel 專案中的環境變數已正確設置

## 🎯 下一步

1. ✅ `Josh` branch 已推送到 `Masq2005/other-dimension-inator`
2. ⏳ 在 Vercel Dashboard 中，重新連接或刷新 repository
3. ⏳ 設置 Production Branch 為 `Josh`
4. ⏳ 測試自動部署

完成後，每次推送到 `masq2005` remote 的 `Josh` branch 都會自動觸發 Vercel 部署！

