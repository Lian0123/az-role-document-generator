# Azure 服務與權限平台申請產生器

以 React + Vite 建立的 Azure 專案需求調查表，透過選擇題問卷自動評估平台所需 Azure 服務、角色權限、資料庫方案等級、治理權限與申請依據，並支援匯出申請報表與 GitHub Pages 部署。

## 功能重點

- 以專案需求問卷即時計算 Azure 服務建議
- 內建 Azure App Service、Azure SQL、PostgreSQL、WAF、Azure OpenAI、Azure AI Services、Key Vault、Storage 等平台建議
- 支援 Azure DevOps、Azure Resource Manager、MFA / Conditional Access 權限需求
- 支援資料庫方案等級，例如 Azure SQL S0、S1、S2 與 PostgreSQL 不同等級
- 支援 App Service Plan、App Service Runtime、Blob Storage、Query Store、Generator Key / URL、雲端地區、IP 白名單與帳單評估題目
- 產出對應角色權限清單，例如 Website Contributor、Web Plan Contributor、db_datareader、db_datawriter、db_owner、Key Vault Secrets Officer、Key Vault Secrets User
- 顯示技術文件連結、月費粗估與架構圖預覽
- 專案基本資料輸入、RWD 介面、Markdown 報表匯出
- 內建評估邏輯測試，降低規則回歸風險

## 啟動方式

```bash
npm install
npm run dev
```

## 測試與建置

```bash
npm test
npm run build
```

## GitHub Pages 部署

此專案已設定 Vite base path 與 GitHub Actions 工作流程。

1. 將此資料夾推送到 GitHub Repository，名稱維持 azure-role-document-generator
2. 在 GitHub Repository 的 Settings > Pages 中，確認來源使用 GitHub Actions
3. 推送到 main 分支後，Actions 會自動建置並部署到 GitHub Pages

## 評估邏輯位置

- 問卷題庫與 Azure 服務/角色資料：[src/data/questionnaire.js](src/data/questionnaire.js)
- 評估規則與報表產生器：[src/lib/evaluator.js](src/lib/evaluator.js)
- 介面主頁：[src/App.jsx](src/App.jsx)