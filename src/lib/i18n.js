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
    installApp: '安裝 App',
    installReady: '可安裝離線版',
    seoTitle: 'Azure Intake Studio | Azure 服務與權限申請產生器',
    seoDescription: '多語系 Azure 平台申請問卷，支援服務評估、RBAC 權限、成本估算、架構圖、PDF/Markdown 匯出與 PWA 離線使用。',
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
    installApp: 'Install app',
    installReady: 'Installable offline app',
    seoTitle: 'Azure Intake Studio | Azure Service and Access Request Generator',
    seoDescription: 'A multilingual Azure intake questionnaire with RBAC recommendations, cost estimation, architecture diagrams, exports, and offline PWA support.',
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
    installApp: 'アプリをインストール',
    installReady: 'オフライン版をインストール可能',
    seoTitle: 'Azure Intake Studio | Azure サービス・権限申請書ジェネレーター',
    seoDescription: '多言語対応の Azure 申請アンケート。RBAC 推奨、コスト見積、構成図、PDF/Markdown 出力、PWA オフライン利用をサポートします。',
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
  projectType: {
    'web-app': { en: 'Enterprise web platform', ja: '企業向け Web プラットフォーム' },
    'api-platform': { en: 'API / microservice platform', ja: 'API / マイクロサービス基盤' },
    'internal-tool': { en: 'Internal operations tool', ja: '社内業務ツール' },
    'integration-hub': { en: 'Integration hub / BFF / API Gateway', ja: '統合ハブ / BFF / API Gateway' },
    'ai-assistant': { en: 'AI assistant / generative platform', ja: 'AI アシスタント / 生成 AI 基盤' }
  },
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
  billingPriority: {
    prototype: { en: 'Low-cost PoC first', ja: '低コスト PoC 優先' },
    balanced: { en: 'Balanced cost and stability', ja: 'コストと安定性のバランス' },
    resilient: { en: 'Stability and scalability first', ja: '安定性と拡張性を優先' },
    premium: { en: 'High availability and performance first', ja: '高可用性と高性能を優先' },
    finops: { en: 'FinOps tracking required', ja: 'FinOps 追跡が必要' }
  },
  dataSensitivity: {
    public: { en: 'Public or low sensitivity data', ja: '公開または低機密データ' },
    internal: { en: 'Internal data', ja: '社内データ' },
    confidential: { en: 'Confidential data', ja: '機密データ' },
    restricted: { en: 'Restricted or regulated data', ja: '規制対象または高機密データ' }
  },
  databaseNeed: {
    sql: { en: 'Relational transaction database (Azure SQL)', ja: 'リレーショナル DB (Azure SQL)' },
    postgres: { en: 'Open-source database (PostgreSQL)', ja: 'オープンソース DB (PostgreSQL)' },
    none: { en: 'No structured database needed now', ja: '現時点では構造化 DB 不要' },
    'hybrid-db': { en: 'SQL and unstructured storage together', ja: 'SQL と非構造化ストレージを併用' }
  },
  databaseTier: {
    'sql-s0': { en: 'Azure SQL S0', ja: 'Azure SQL S0' },
    'sql-s1': { en: 'Azure SQL S1', ja: 'Azure SQL S1' },
    'sql-s2': { en: 'Azure SQL S2', ja: 'Azure SQL S2' },
    'postgres-b1ms': { en: 'PostgreSQL B1ms', ja: 'PostgreSQL B1ms' },
    'postgres-gp': { en: 'PostgreSQL General Purpose', ja: 'PostgreSQL General Purpose' },
    'postgres-mo': { en: 'PostgreSQL Memory Optimized', ja: 'PostgreSQL Memory Optimized' },
    'not-applicable': { en: 'Not applicable / undecided', ja: '該当なし / 未決定' }
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
  },
  queryStoreAccess: {
    'query-read': { en: 'View Query Store and execution plans', ja: 'Query Store と実行計画を参照' },
    'query-admin': { en: 'Tune Query Store and performance settings', ja: 'Query Store と性能設定を調整' },
    'not-applicable': { en: 'Not applicable', ja: '該当なし' }
  },
  blobUsage: {
    'static-assets': { en: 'Static site or frontend assets', ja: '静的サイトまたはフロント資産' },
    'report-export': { en: 'Report export and file download', ja: 'レポート出力とファイル配布' },
    'private-upload': { en: 'Private uploads and archival', ja: '社内アップロードと保管' },
    'hot-media': { en: 'Hot media or public downloads', ja: '高頻度メディアまたは公開配布' },
    'rag-kb': { en: 'AI knowledge base source', ja: 'AI ナレッジベースの文書ソース' },
    none: { en: 'Do not use Blob Storage', ja: 'Blob Storage を使用しない' }
  },
  appServicePlan: {
    b1: { en: 'B1', ja: 'B1' },
    s1: { en: 'S1', ja: 'S1' },
    s2: { en: 'S2', ja: 'S2' },
    p1v3: { en: 'P1v3', ja: 'P1v3' },
    p2v3: { en: 'P2v3', ja: 'P2v3' },
    'container-plan': { en: 'Container on App Service', ja: 'App Service 上のコンテナー' },
    'not-applicable': { en: 'Undecided / do not use App Service', ja: '未定 / App Service を使用しない' }
  },
  appServiceRuntime: {
    dotnet: { en: '.NET', ja: '.NET' },
    node: { en: 'Node.js', ja: 'Node.js' },
    python: { en: 'Python', ja: 'Python' },
    java: { en: 'Java', ja: 'Java' },
    php: { en: 'PHP', ja: 'PHP' },
    'static-web': { en: 'Static + API', ja: 'Static + API' },
    container: { en: 'Custom Container', ja: 'Custom Container' },
    'not-applicable': { en: 'Undecided / do not use App Service runtime', ja: '未定 / App Service Runtime を使用しない' }
  },
  databaseAccess: {
    'read-only': { en: 'Read-only queries / reporting', ja: '参照専用 / レポート' },
    'read-write': { en: 'Transactional read/write', ja: 'トランザクションの読書き' },
    'schema-change': { en: 'Schema changes / migrations', ja: 'スキーマ変更 / migration' },
    'ops-admin': { en: 'Full DBA or platform administration', ja: 'DBA / プラットフォームによる完全管理' },
    'not-applicable': { en: 'Not applicable', ja: '該当なし' }
  },
  internetExposure: {
    public: { en: 'Yes, public internet exposure required', ja: 'はい、インターネット公開が必要' },
    hybrid: { en: 'Partially public, core services private', ja: '一部公開、コアは内部のみ' },
    private: { en: 'No, internal or restricted sources only', ja: 'いいえ、内部または制限された送信元のみ' }
  },
  externalAccessControl: {
    'public-with-waf': { en: 'Public service protected by WAF', ja: 'WAF で保護された公開サービス' },
    'ip-whitelist': { en: 'Allow only specified external IPs', ja: '指定した外部 IP のみ許可' },
    'private-only': { en: 'Internal network only', ja: '内部ネットワークのみ' },
    'partner-vpn': { en: 'Partner access through VPN/private link', ja: 'VPN / 専用線経由のパートナー接続' }
  },
  apiManagementNeed: {
    'external-api': { en: 'Need an external API gateway', ja: '外部向け API Gateway が必要' },
    'internal-api': { en: 'Need internal API governance', ja: '内部 API ガバナンスが必要' },
    'hybrid-api': { en: 'Need both internal and external API management', ja: '内外 API 管理の両方が必要' },
    none: { en: 'No APIM needed now', ja: '現時点で APIM は不要' }
  },
  identityModel: {
    'entra-id': { en: 'Enterprise accounts and SSO', ja: '企業アカウントと SSO' },
    b2b: { en: 'Enterprise accounts with external collaborators', ja: '企業アカウント + 外部協力者' },
    local: { en: 'Local application accounts', ja: 'アプリケーション独自アカウント' },
    hybrid: { en: 'Hybrid of enterprise SSO and app accounts', ja: '企業 SSO とアプリ独自アカウントの併用' }
  },
  secretAccess: {
    'runtime-read': { en: 'Application runtime only reads secrets', ja: '実行時にシークレットを参照のみ' },
    'manage-secrets': { en: 'Platform team manages and rotates secrets', ja: 'プラットフォーム管理者がシークレットを管理・更新' },
    hybrid: { en: 'Both read and manage secrets', ja: '参照と管理の両方が必要' },
    none: { en: 'Do not use Key Vault now', ja: '現時点で Key Vault を使用しない' }
  },
  governanceControls: {
    'azure-devops': { en: 'Azure DevOps Repo / Pipeline / Service Connection', ja: 'Azure DevOps Repo / Pipeline / Service Connection' },
    'arm-rbac': { en: 'Azure Resource Manager and RBAC assignment', ja: 'Azure Resource Manager と RBAC 割当' },
    mfa: { en: 'MFA / Conditional Access', ja: 'MFA / 条件付きアクセス' },
    none: { en: 'No additional governance controls now', ja: '追加ガバナンス制御は不要' }
  },
  generatorAccess: {
    'key-only': { en: 'Provide generator key only', ja: 'Generator Key のみ提供' },
    'url-only': { en: 'Provide endpoint URL only', ja: 'Endpoint URL のみ提供' },
    'key-and-url': { en: 'Provide both key and URL', ja: 'Key と URL の両方を提供' },
    'not-applicable': { en: 'Not applicable', ja: '該当なし' }
  },
  aiCapability: {
    'gen-ai': { en: 'Generative Q&A / content creation', ja: '生成 AI / コンテンツ生成' },
    ocr: { en: 'OCR / document recognition', ja: 'OCR / 文書認識' },
    speech: { en: 'Speech recognition / TTS', ja: '音声認識 / TTS' },
    agent: { en: 'AI agent / tool calling', ja: 'AI Agent / Tool Calling' },
    none: { en: 'No AI capability needed now', ja: '現時点で AI 機能は不要' }
  },
  opsNeeds: {
    monitoring: { en: 'Centralized monitoring and alerts', ja: '集中監視とアラート' },
    backup: { en: 'Backup and restore', ja: 'バックアップと復元' },
    container: { en: 'Container-based deployment', ja: 'コンテナー配備' },
    'api-observability': { en: 'API monitoring and traffic analytics', ja: 'API 監視とトラフィック分析' },
    'security-audit': { en: 'Security audit and compliance review', ja: 'セキュリティ監査とコンプライアンス確認' },
    none: { en: 'No additional operations capability needed', ja: '追加の運用機能は不要' }
  },
  scaleExpectation: {
    standard: { en: 'Standard business workload', ja: '標準的な業務システム' },
    'mission-critical': { en: 'High traffic or mission critical', ja: '高トラフィックまたは重要システム' },
    'global-multi-region': { en: 'Global multi-region or DR', ja: 'グローバル多地域または災害対策' },
    'not-applicable': { en: 'Undecided / platform default', ja: '未定 / プラットフォーム既定' }
  }
};

const optionDescriptionTranslations = {
  projectType: {
    'web-app': { en: 'Portal, admin console, and business web application', ja: 'ポータル、管理画面、業務 Web アプリ' },
    'api-platform': { en: 'Internal or external APIs and integration services', ja: '内外 API と統合サービス' },
    'internal-tool': { en: 'Workflow automation, reports, and internal support tools', ja: '業務自動化、レポート、社内支援ツール' },
    'integration-hub': { en: 'Governed integration layer for internal and external systems', ja: '内外システムを統合するガバナンス層' },
    'ai-assistant': { en: 'Uses OpenAI, search, and controlled document sources', ja: 'OpenAI、検索、文書ソース制御を利用' }
  },
  region: {
    'east-asia': { en: 'Low-latency deployment near Hong Kong and Taiwan', ja: '香港・台湾近接の低遅延配置' },
    taiwan: { en: 'For Taiwan-adjacent experience and data locality planning', ja: '台湾近接体験やデータ所在地検討向け' },
    'southeast-asia': { en: 'Singapore region for common enterprise production use', ja: '一般的な本番利用で多いシンガポール地域' },
    'north-america': { en: 'Suitable for global or North America-centric services', ja: '北米中心またはグローバル向け' },
    'west-europe': { en: 'Suitable for Europe-focused users and redundancy planning', ja: '欧州ユーザーと冗長構成向け' },
    'japan-east': { en: 'Suitable for Japan/Korea users and regional recovery', ja: '日本・韓国向けと地域 DR 向け' },
    'japan-west': { en: 'Useful for Japan West landing or cross-region redundancy', ja: '日本西部配置やクロスリージョン冗長向け' },
    'australia-east': { en: 'Suitable for extended APAC deployment', ja: 'APAC 拡張配置向け' }
  },
  billingPriority: {
    prototype: { en: 'Minimize cost for proof-of-concept delivery', ja: 'PoC のため最小コストを優先' },
    balanced: { en: 'Default production balance between cost and resilience', ja: '本番向けの標準バランス' },
    resilient: { en: 'Favor resilience and future scaling over lowest cost', ja: '最低コストより安定性と拡張性を優先' },
    premium: { en: 'Optimize for performance and availability', ja: '性能と可用性を重視' },
    finops: { en: 'Require stronger cost tagging and operational tracking', ja: 'コストタグと運用追跡を強化' }
  },
  databaseTier: {
    'sql-s0': { en: 'Small production environment with light transaction load', ja: '軽いトランザクション向け小規模本番' },
    'sql-s1': { en: 'General production with medium transaction volume', ja: '中程度トランザクションの一般本番' },
    'sql-s2': { en: 'Higher concurrency and more critical workloads', ja: '高同時実行・重要業務向け' },
    'postgres-b1ms': { en: 'Development, testing, and light internal workloads', ja: '開発・検証・軽量社内用途' },
    'postgres-gp': { en: 'General production PostgreSQL workload', ja: '一般的な本番 PostgreSQL ワークロード' },
    'postgres-mo': { en: 'High concurrency and memory-heavy workload', ja: '高同時実行・メモリ重視の負荷' }
  },
  databasePerformance: {
    'sql-dtu': { en: 'Estimate combined transaction and query capacity through DTUs', ja: 'DTU でトランザクションと照会負荷を評価' },
    'sql-vcore': { en: 'Plan compute and memory explicitly with vCore sizing', ja: 'vCore で CPU・メモリを明示的に計画' },
    'postgres-vcore': { en: 'Plan PostgreSQL compute and storage separately', ja: 'PostgreSQL の計算資源とストレージを個別計画' },
    'memory-optimized': { en: 'For search-heavy or memory-intensive workloads', ja: '検索集中または高メモリ負荷向け' }
  },
  databaseBackup: {
    'local-retention': { en: 'Suitable for general restore and routine protection', ja: '一般的な復旧と日常保護向け' },
    pitr: { en: 'Restore to a precise point in time', ja: '特定時点への復元が必要' },
    'geo-redundant': { en: 'Cross-region backup and disaster recovery capability', ja: '異地域バックアップと DR に対応' },
    'long-term-retention': { en: 'For compliance-driven retention and archival', ja: 'コンプライアンス保管や長期保存向け' }
  },
  queryStoreAccess: {
    'query-read': { en: 'Analyze performance trends and plans', ja: '性能傾向と実行計画を分析' },
    'query-admin': { en: 'Includes forcing plans and advanced tuning', ja: 'プラン固定や高度なチューニングを含む' }
  },
  blobUsage: {
    'static-assets': { en: 'Store frontend files, images, and static content', ja: 'フロント資産、画像、静的コンテンツを保存' },
    'report-export': { en: 'Used for system-generated Excel, CSV, or PDF outputs', ja: 'Excel、CSV、PDF 出力に使用' },
    'private-upload': { en: 'Restricted to authorized users and applications', ja: '許可された利用者とアプリに限定' },
    'hot-media': { en: 'Suitable for CDN-backed or high-read scenarios', ja: 'CDN 連携や高頻度読取に適合' },
    'rag-kb': { en: 'Document source for Azure OpenAI and AI Search', ja: 'Azure OpenAI と AI Search の文書ソース' }
  },
  appServicePlan: {
    b1: { en: 'PoC and development validation', ja: 'PoC / 開発検証向け' },
    s1: { en: 'General production environment', ja: '一般的な本番環境' },
    s2: { en: 'Medium-to-high traffic production workload', ja: '中高負荷の本番環境' },
    p1v3: { en: 'Higher performance and stronger isolation', ja: '高性能とより良い分離' },
    p2v3: { en: 'High traffic multi-instance production system', ja: '高トラフィック・多インスタンス本番' },
    'container-plan': { en: 'Deploy with container images', ja: 'コンテナーイメージで配置' },
    'not-applicable': { en: 'Keep other compute options open for now', ja: '他の計算基盤を保留する' }
  },
  appServiceRuntime: {
    dotnet: { en: 'Common choice for enterprise systems and APIs', ja: '企業システムや API で一般的' },
    node: { en: 'JavaScript or TypeScript based backend/frontend services', ja: 'JavaScript / TypeScript サービス向け' },
    python: { en: 'Suitable for AI and data processing workloads', ja: 'AI やデータ処理に適合' },
    java: { en: 'Traditional enterprise platforms and large services', ja: '伝統的な企業基盤や大規模サービス向け' },
    php: { en: 'Legacy portals or CMS-style applications', ja: '既存ポータルや CMS 系アプリ向け' },
    'static-web': { en: 'Static frontend with backend APIs', ja: '静的フロントエンド + API' },
    container: { en: 'Need custom runtime and image control', ja: '独自 runtime とイメージ制御が必要' },
    'not-applicable': { en: 'Keep runtime decision for later', ja: 'Runtime 決定を後回しにする' }
  },
  externalAccessControl: {
    'public-with-waf': { en: 'Good for public portals and external users', ja: '公開ポータルや外部利用者向け' },
    'ip-whitelist': { en: 'Best for fixed partner or office source ranges', ja: '固定送信元のパートナーや拠点向け' },
    'private-only': { en: 'Access through Private Endpoint or VNet only', ja: 'Private Endpoint / VNet のみで接続' },
    'partner-vpn': { en: 'For B2B or cross-organization connectivity', ja: 'B2B や組織間接続向け' }
  },
  apiManagementNeed: {
    'external-api': { en: 'Rate limit, key control, and developer portal needed', ja: '流量制御、キー管理、開発者ポータルが必要' },
    'internal-api': { en: 'Central governance for internal service APIs', ja: '内部 API の集中ガバナンス' },
    'hybrid-api': { en: 'Both external publication and internal integration are needed', ja: '外部公開と内部連携の両方が必要' }
  },
  governanceControls: {
    'azure-devops': { en: 'Project, repo, pipeline, or environment access required', ja: 'プロジェクト、Repo、Pipeline、環境の権限が必要' },
    'arm-rbac': { en: 'Manage infrastructure via ARM, Bicep, or Terraform', ja: 'ARM、Bicep、Terraform で基盤管理' },
    mfa: { en: 'Protect sign-in and privileged identities', ja: 'サインインと高権限 ID を保護' }
  },
  generatorAccess: {
    'key-only': { en: 'URL is retained by the platform and only the key is delivered', ja: 'URL はプラットフォーム管理、Key のみ提供' },
    'url-only': { en: 'Only the endpoint URL is shared with the integration team', ja: '統合チームへ URL のみ共有' },
    'key-and-url': { en: 'Deliver both through audited Key Vault handling', ja: 'Key Vault と監査統制のもとで両方提供' }
  },
  opsNeeds: {
    monitoring: { en: 'Centralized monitoring, queries, and alerting', ja: '集中監視、クエリ、アラート' },
    backup: { en: 'Operational backup and restore capability', ja: '運用上のバックアップと復元' },
    container: { en: 'Container-based delivery or image promotion flow', ja: 'コンテナー配備やイメージ昇格が必要' },
    'api-observability': { en: 'Track API latency, errors, and traffic patterns', ja: 'API 遅延、エラー、流量傾向を把握' },
    'security-audit': { en: 'Provide auditability and compliance visibility', ja: '監査証跡とコンプライアンス可視化' },
    none: { en: 'Use platform defaults or minimal operations features first', ja: 'まずは最小限の運用機能で開始' }
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
      label: optionTranslations[question.id]?.[option.value]?.[locale] ?? option.label,
      description: optionDescriptionTranslations[question.id]?.[option.value]?.[locale] ?? option.description
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