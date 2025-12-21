# Git 工作流程說明

## 📋 Repository 設置

### 自己的專案 (Phanatic34)
- **Repository**: `Phanatic34/Other-Dimension-Inator`
- **Remote**: `origin`
- **Branch**: `main`（直接使用 main branch，不需要分支）

### 別人的專案 (Masq2005 - Vercel 部署)
- **Repository**: `Masq2005/other-dimension-inator`
- **Remote**: `masq2005`
- **Branch**: `Josh`（使用分支，因為是別人的專案）

## 🚀 日常工作流程

### 開發和提交

```bash
# 1. 確保在 main branch
git checkout main

# 2. 進行開發和更改

# 3. 提交更改
git add .
git commit -m "你的提交訊息"

# 4. 推送到自己的專案（main branch）
git push origin main
```

### 同步到 Vercel 專案

```bash
# 推送到 Masq2005 的 repository（Josh branch）
git push masq2005 main:Josh
```

或者，如果你想保持兩個 repository 同步：

```bash
# 同時推送到兩個 repository
git push origin main && git push masq2005 main:Josh
```

## 📝 工作流程總結

1. **在自己的專案中**：
   - 使用 `main` branch
   - 直接 push 到 `origin/main`
   - 不需要創建分支

2. **在別人的專案中（Vercel）**：
   - 推送到 `masq2005/Josh` branch
   - 使用 `git push masq2005 main:Josh` 將 main 的內容推送到 Josh branch

## 🔧 常用命令

### 查看當前狀態
```bash
git status
git branch -a
```

### 推送到自己的專案
```bash
git push origin main
```

### 推送到 Vercel 專案
```bash
git push masq2005 main:Josh
```

### 同時推送到兩個專案
```bash
git push origin main && git push masq2005 main:Josh
```

## ⚠️ 注意事項

1. **保持 main branch 乾淨**
   - 在自己的專案中，main branch 就是主開發分支
   - 不需要額外的分支

2. **Vercel 部署**
   - Vercel 連接到 `Masq2005/other-dimension-inator`
   - Production Branch 設置為 `Josh`
   - 每次推送到 `masq2005/Josh` 都會觸發自動部署

3. **同步策略**
   - 自己的專案：`main` branch
   - Vercel 專案：`Josh` branch（從 main 推送過去）

## 🎯 快速參考

```bash
# 開發完成後
git add .
git commit -m "更新說明"
git push origin main                    # 推送到自己的專案
git push masq2005 main:Josh            # 推送到 Vercel 專案（觸發部署）
```

