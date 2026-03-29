export const supportedLocales = [
  { value: 'zh-TW', label: '繁中' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' }
];

const uiMessages = {
  'zh-TW': {
    brand: 'Azure Intake Studio',
    heroTitle: 'Azure 服務與權限平台申請單產生器',
    heroDescription: '以專案需求選擇題問卷，自動產出 Azure 服務建議、角色權限、治理控制與資源申請報表，讓平台申請從訪談草稿直接進入可審核交付物。',
    downloadMarkdown: '下載 Markdown',
    downloadPdf: '下載 PDF',
    previewDiagram: '預覽 Azure 架構圖',
    completion: '問卷完成度',
    decisionSummary: '平台決策摘要',
    recommendedServices: '建議服務',
    recommendedPermissions: '建議權限',
    readiness: '完成度',
    databaseSku: '資料庫 SKU',
    monthlyEstimate: '月費粗估',
    monthlyUnit: 'USD / 月',
    projectIntake: 'Project Intake',
    basicInfo: '專案基本資料',
    reportTitle: '平台申請建議',
    reportEyebrow: 'Generated Report',
    projectName: '專案名稱',
    department: '申請單位',
    applicantName: '申請人',
    applicantEmail: '申請人 Email',
    owner: '負責人',
    launchDate: '預計上線日',
    publicResources: '對外開放資源說明',
    externalIps: '外部 IP 白名單',
    language: '語言',
    single: '單選',
    multi: '可複選',
    regionAndBilling: '區域與帳單評估',
    cloudRegion: '雲端位置',
    perMonth: '/ 月',
    appServiceAndGenerator: 'App Service 與 Generator',
    databasePlan: '資料庫方案',
    databasePerformance: '效能模型',
    databaseBackup: '備份策略',
    notSpecified: '未指定',
    architecturePreview: 'Azure 架構預覽',
    openDialog: '開啟 Dialog',
    architectureHint: '使用圖形化 Azure 架構視圖檢查入口、安全、應用、資料、AI 與治理元件的配置關係。',
    serviceMatrix: '服務與權限矩陣',
    suggestedRoles: '建議角色權限',
    securityControls: '安全控制',
    securityRequirement: '安全要求',
    references: '技術參考',
    rationale: '評估依據',
    notes: '申請注意事項',
    openDiagramTitle: '預覽 Azure 架構圖',
    close: '關閉',
    diagramDescription: '依目前問卷答案即時繪製 Azure 風格的服務關係圖，協助你檢查入口層、安全層、App Service、APIM、資料層與治理能力的配置。',
    applicationStatus: '申請狀態',
    governanceRisk: '治理風險',
    required: '必須申請',
    suggested: '建議申請',
    optional: '可選申請',
    high: '高',
    medium: '中',
    low: '低',
    draftProjectName: '例如：智慧客服平台',
    draftDepartment: '例如：數位轉型處',
    draftApplicant: '例如：李小華',
    draftEmail: '例如：owner@example.com',
    draftOwner: '例如：陳經理',
    draftResources: '例如：公開入口網站、Partner API、管理後台',
    draftIps: '例如：203.0.113.10/32, 198.51.100.20/32',
    questionHint: '選擇最符合需求的項目，系統將即時計算 Azure 服務、角色權限與申請輸出。',
    projectSummary: '專案摘要',
    runtime: 'Runtime',
    generatedRolesCount: '個建議角色',
    dialogButton: '開啟架構圖',
    noDatabase: '未使用資料庫或尚未決定',
    noDatabaseNote: '若未使用資料庫，可維持檔案或物件儲存方案。'
  },
  en: {
    brand: 'Azure Intake Studio',
    heroTitle: 'Azure Service and Access Request Generator',
    heroDescription: 'Answer a project intake questionnaire to generate Azure service recommendations, access roles, governance controls, and a review-ready request report.',
    downloadMarkdown: 'Download Markdown',
    downloadPdf: 'Download PDF',
    previewDiagram: 'Preview Azure Diagram',
    completion: 'Completion',
    decisionSummary: 'Decision Summary',
    recommendedServices: 'Services',
    recommendedPermissions: 'Permissions',
    readiness: 'Readiness',
    databaseSku: 'Database SKU',
    monthlyEstimate: 'Monthly Estimate',
    monthlyUnit: 'USD / month',
    projectIntake: 'Project Intake',
    basicInfo: 'Project Information',
    reportTitle: 'Generated Recommendation',
    reportEyebrow: 'Generated Report',
    projectName: 'Project Name',
    department: 'Department',
    applicantName: 'Applicant',
    applicantEmail: 'Applicant Email',
    owner: 'Owner',
    launchDate: 'Launch Date',
    publicResources: 'Public Resource Scope',
    externalIps: 'External IP Allowlist',
    language: 'Language',
    single: 'Single choice',
    multi: 'Multiple choice',
    regionAndBilling: 'Region and Cost',
    cloudRegion: 'Cloud Region',
    perMonth: '/ month',
    appServiceAndGenerator: 'App Service and Generator',
    databasePlan: 'Database Plan',
    databasePerformance: 'Performance Model',
    databaseBackup: 'Backup Policy',
    notSpecified: 'Not specified',
    architecturePreview: 'Azure Architecture Preview',
    openDialog: 'Open dialog',
    architectureHint: 'Use a graphical Azure diagram to inspect ingress, security, application, data, AI, and governance topology.',
    serviceMatrix: 'Service and Access Matrix',
    suggestedRoles: 'Recommended Roles',
    securityControls: 'Security Controls',
    securityRequirement: 'Security requirement',
    references: 'Technical References',
    rationale: 'Evaluation Rationale',
    notes: 'Implementation Notes',
    openDiagramTitle: 'Azure Architecture Diagram',
    close: 'Close',
    diagramDescription: 'This diagram is generated from the current questionnaire answers to visualize Azure ingress, security, App Service, APIM, data, and governance components.',
    applicationStatus: 'Application Status',
    governanceRisk: 'Governance Risk',
    required: 'Required',
    suggested: 'Recommended',
    optional: 'Optional',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    draftProjectName: 'Example: Smart Support Portal',
    draftDepartment: 'Example: Digital Transformation Office',
    draftApplicant: 'Example: Jane Lee',
    draftEmail: 'Example: owner@example.com',
    draftOwner: 'Example: Project Manager Chen',
    draftResources: 'Example: public portal, partner API, admin console',
    draftIps: 'Example: 203.0.113.10/32, 198.51.100.20/32',
    questionHint: 'Choose the options that best fit the project. The platform evaluates Azure services, roles, and request outputs immediately.',
    projectSummary: 'Project Summary',
    runtime: 'Runtime',
    generatedRolesCount: 'recommended roles',
    dialogButton: 'Open diagram',
    noDatabase: 'No database selected yet',
    noDatabaseNote: 'If no database is required, object storage or file-based delivery can be kept.'
  },
  ja: {
    brand: 'Azure Intake Studio',
    heroTitle: 'Azure サービス・権限申請書ジェネレーター',
    heroDescription: 'プロジェクト要件アンケートから Azure サービス推奨、権限ロール、ガバナンス制御、申請レポートを自動生成します。',
    downloadMarkdown: 'Markdown をダウンロード',
    downloadPdf: 'PDF をダウンロード',
    previewDiagram: 'Azure 図を表示',
    completion: '回答完了率',
    decisionSummary: '判定サマリー',
    recommendedServices: 'サービス',
    recommendedPermissions: '権限',
    readiness: '完了率',
    databaseSku: 'DB SKU',
    monthlyEstimate: '月額概算',
    monthlyUnit: 'USD / 月',
    projectIntake: 'Project Intake',
    basicInfo: 'プロジェクト基本情報',
    reportTitle: '申請推奨結果',
    reportEyebrow: 'Generated Report',
    projectName: 'プロジェクト名',
    department: '部門',
    applicantName: '申請者',
    applicantEmail: '申請者メール',
    owner: '責任者',
    launchDate: '公開予定日',
    publicResources: '公開対象リソース',
    externalIps: '外部 IP 許可リスト',
    language: '言語',
    single: '単一選択',
    multi: '複数選択',
    regionAndBilling: 'リージョンと費用',
    cloudRegion: 'クラウドリージョン',
    perMonth: '/ 月',
    appServiceAndGenerator: 'App Service と Generator',
    databasePlan: 'データベース計画',
    databasePerformance: '性能モデル',
    databaseBackup: 'バックアップ方針',
    notSpecified: '未指定',
    architecturePreview: 'Azure 構成プレビュー',
    openDialog: 'ダイアログを開く',
    architectureHint: 'Azure の図形ビューで入口、セキュリティ、アプリ、データ、AI、運用統制の関係を確認します。',
    serviceMatrix: 'サービス・権限マトリクス',
    suggestedRoles: '推奨ロール',
    securityControls: 'セキュリティ制御',
    securityRequirement: 'セキュリティ要件',
    references: '技術参考',
    rationale: '判定根拠',
    notes: '申請メモ',
    openDiagramTitle: 'Azure 構成図',
    close: '閉じる',
    diagramDescription: '現在の回答内容に基づいて Azure の入口層、セキュリティ、App Service、APIM、データ層、運用統制を可視化します。',
    applicationStatus: '申請状態',
    governanceRisk: 'ガバナンスリスク',
    required: '必須',
    suggested: '推奨',
    optional: '任意',
    high: '高',
    medium: '中',
    low: '低',
    draftProjectName: '例: スマートサポートポータル',
    draftDepartment: '例: デジタル変革部',
    draftApplicant: '例: 山田 花子',
    draftEmail: '例: owner@example.com',
    draftOwner: '例: 陳マネージャー',
    draftResources: '例: 公開ポータル、Partner API、管理画面',
    draftIps: '例: 203.0.113.10/32, 198.51.100.20/32',
    questionHint: '要件に最も近い項目を選択してください。Azure サービス、ロール、申請出力を即時評価します。',
    projectSummary: 'プロジェクト概要',
    runtime: 'Runtime',
    generatedRolesCount: '推奨ロール',
    dialogButton: '図を開く',
    noDatabase: 'データベース未選択',
    noDatabaseNote: 'データベースが不要な場合は、オブジェクトストレージやファイル配布を維持できます。'
  }
};

const sectionTranslations = {
  '專案輪廓': { en: 'Project Profile', ja: 'プロジェクト概要' },
  '資料與合規': { en: 'Data and Compliance', ja: 'データとコンプライアンス' },
  '應用與平台': { en: 'Application and Platform', ja: 'アプリケーションとプラットフォーム' },
  '安全與網路': { en: 'Security and Network', ja: 'セキュリティとネットワーク' },
  '身份與權限': { en: 'Identity and Access', ja: 'ID と権限' },
  'AI 能力': { en: 'AI Capability', ja: 'AI 機能' },
  '維運與治理': { en: 'Operations and Governance', ja: '運用とガバナンス' },
  '容量與可用性': { en: 'Scale and Availability', ja: '容量と可用性' }
};

const questionTranslations = {
  projectType: { en: 'What is the main project delivery type?', ja: 'プロジェクトの主要な提供形態は何ですか。' },
  region: { en: 'Which cloud region is preferred?', ja: '主なクラウドリージョンはどこですか。' },
  billingPriority: { en: 'What is the billing strategy preference?', ja: 'コスト戦略の優先度は何ですか。' },
  dataSensitivity: { en: 'What is the data sensitivity level?', ja: 'データの機密度はどれですか。' },
  databaseNeed: { en: 'Which type of database is needed?', ja: 'どの種類のデータベースが必要ですか。' },
  databaseTier: { en: 'Which database tier is expected?', ja: '想定するデータベース層はどれですか。' },
  databasePerformance: { en: 'What database performance model is needed?', ja: '必要なデータベース性能モデルは何ですか。' },
  databaseBackup: { en: 'What backup and restore strategy is required?', ja: '必要なバックアップ・復元方針は何ですか。' },
  queryStoreAccess: { en: 'Does MSSQL Query Store need to be viewed or managed?', ja: 'MSSQL Query Store の参照または管理が必要ですか。' },
  blobUsage: { en: 'What is Blob Storage used for?', ja: 'Blob Storage の用途は何ですか。' },
  appServicePlan: { en: 'Which App Service Plan is expected?', ja: '想定する App Service Plan はどれですか。' },
  appServiceRuntime: { en: 'What App Service runtime is required?', ja: '必要な App Service Runtime は何ですか。' },
  databaseAccess: { en: 'What is the database access mode?', ja: 'データベースのアクセス方式は何ですか。' },
  internetExposure: { en: 'Will the system be exposed to the internet?', ja: 'システムはインターネット公開されますか。' },
  externalAccessControl: { en: 'How should external access be controlled?', ja: '外部アクセスはどのように制御しますか。' },
  apiManagementNeed: { en: 'Is API Management required?', ja: 'API Management は必要ですか。' },
  identityModel: { en: 'What is the sign-in model?', ja: 'ログイン方式は何ですか。' },
  secretAccess: { en: 'How will Key Vault secrets be used?', ja: 'Key Vault シークレットの利用方式は何ですか。' },
  governanceControls: { en: 'Which governance and identity controls are required?', ja: '必要なガバナンス・認証制御は何ですか。' },
  generatorAccess: { en: 'How should Generator Key / URL be delivered?', ja: 'Generator Key / URL の受け渡し方式は何ですか。' },
  aiCapability: { en: 'Are AI capabilities required?', ja: 'AI 機能は必要ですか。' },
  opsNeeds: { en: 'What operational capabilities are needed?', ja: '必要な運用機能は何ですか。' },
  scaleExpectation: { en: 'What scale and availability is expected?', ja: '想定する負荷と可用性はどれですか。' }
};

const optionTranslations = {
  region: {
    'east-asia': { en: 'East Asia', ja: '東アジア' },
    taiwan: { en: 'Taiwan', ja: '台湾' },
    'southeast-asia': { en: 'Southeast Asia', ja: '東南アジア' },
    'north-america': { en: 'North America', ja: '北米' },
    'west-europe': { en: 'West Europe', ja: '西ヨーロッパ' },
    'japan-east': { en: 'Japan East', ja: '日本東部' },
    'japan-west': { en: 'Japan West', ja: '日本西部' },
    'australia-east': { en: 'Australia East', ja: 'オーストラリア東部' }
  },
  databasePerformance: {
    'sql-dtu': { en: 'Azure SQL DTU model', ja: 'Azure SQL DTU モデル' },
    'sql-vcore': { en: 'Azure SQL vCore model', ja: 'Azure SQL vCore モデル' },
    'postgres-vcore': { en: 'PostgreSQL vCore model', ja: 'PostgreSQL vCore モデル' },
    'memory-optimized': { en: 'Memory optimized / high concurrency', ja: '高メモリ / 高同時実行モデル' },
    'not-applicable': { en: 'Not applicable / undecided', ja: '該当なし / 未決定' }
  },
  databaseBackup: {
    'local-retention': { en: 'Local retention and short-term restore', ja: 'ローカル保持と短期復元' },
    pitr: { en: 'Point-in-Time Restore', ja: 'ポイントインタイム復元' },
    'geo-redundant': { en: 'Geo-redundant backup', ja: '地理冗長バックアップ' },
    'long-term-retention': { en: 'Long-term retention and archive', ja: '長期保持と監査アーカイブ' },
    'not-applicable': { en: 'Not applicable / platform default', ja: '該当なし / プラットフォーム既定' }
  }
};

export const getUiMessages = (locale) => uiMessages[locale] ?? uiMessages['zh-TW'];

export const translateSection = (section, locale) => {
  if (locale === 'zh-TW') {
    return section;
  }

  return sectionTranslations[section]?.[locale] ?? section;
};

export const localizeQuestion = (question, locale) => {
  if (locale === 'zh-TW') {
    return question;
  }

  return {
    ...question,
    section: translateSection(question.section, locale),
    title: questionTranslations[question.id]?.[locale] ?? question.title,
    options: question.options.map((option) => ({
      ...option,
      label: optionTranslations[question.id]?.[option.value]?.[locale] ?? option.label
    }))
  };
};

export const translatePriority = (value, locale) => {
  const ui = getUiMessages(locale);
  if (value === '必須申請') {
    return ui.required;
  }
  if (value === '建議申請') {
    return ui.suggested;
  }
  return ui.optional;
};

export const translateRisk = (value, locale) => {
  const ui = getUiMessages(locale);
  if (value === '高') {
    return ui.high;
  }
  if (value === '中') {
    return ui.medium;
  }
  if (value === '低') {
    return ui.low;
  }
  return value;
};

export const translateApplicationStatus = (value, locale) => {
  if (locale === 'zh-TW') {
    return value;
  }

  const map = {
    '待補件': { en: 'Pending information', ja: '追加情報待ち' },
    '待安全審核': { en: 'Pending security review', ja: 'セキュリティ審査待ち' },
    '可送審': { en: 'Ready for review', ja: '審査提出可能' }
  };

  return map[value]?.[locale] ?? value;
};