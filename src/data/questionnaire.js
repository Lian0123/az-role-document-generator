export const roleCatalog = {
  appServiceContributor: {
    name: 'Website Contributor',
    scope: 'Azure App Service',
    justification: '部署與維運 Web App、API 與應用程式設定。'
  },
  planContributor: {
    name: 'Web Plan Contributor',
    scope: 'App Service Plan',
    justification: '調整 App Service Plan SKU、擴縮與容量配置。'
  },
  sqlContributor: {
    name: 'SQL DB Contributor',
    scope: 'Azure SQL Database',
    justification: '建立資料庫、調整防火牆、Auditing 與效能設定。'
  },
  sqlDbReader: {
    name: 'db_datareader',
    scope: 'Azure SQL Database',
    justification: '提供資料查詢與報表讀取能力。'
  },
  sqlDbWriter: {
    name: 'db_datawriter',
    scope: 'Azure SQL Database',
    justification: '允許新增、修改與刪除應用程式資料。'
  },
  sqlDbDdlAdmin: {
    name: 'db_ddladmin',
    scope: 'Azure SQL Database',
    justification: '允許調整 schema、索引與資料庫物件結構。'
  },
  postgresContributor: {
    name: 'Contributor',
    scope: 'Azure Database for PostgreSQL',
    justification: '管理 PostgreSQL 伺服器、參數與網路存取。'
  },
  storageBlobDataContributor: {
    name: 'Storage Blob Data Contributor',
    scope: 'Azure Storage',
    justification: '管理 Blob、文件、匯出報表與檔案上傳。'
  },
  keyVaultSecretsOfficer: {
    name: 'Key Vault Secrets Officer',
    scope: 'Azure Key Vault',
    justification: '建立、輪替與撤銷應用程式機密。'
  },
  keyVaultSecretsUser: {
    name: 'Key Vault Secrets User',
    scope: 'Azure Key Vault',
    justification: '供執行階段讀取已授權的機密內容。'
  },
  networkContributor: {
    name: 'Network Contributor',
    scope: 'VNet / Application Gateway / WAF',
    justification: '配置網段、WAF Policy、Ingress 與 Private Endpoint。'
  },
  monitoringContributor: {
    name: 'Monitoring Contributor',
    scope: 'Azure Monitor / Application Insights',
    justification: '建立監控、告警規則、儀表板與查詢。'
  },
  cognitiveServicesUser: {
    name: 'Cognitive Services OpenAI User',
    scope: 'Azure OpenAI / Azure AI Services',
    justification: '執行模型推論、生成式問答與應用呼叫。'
  },
  cognitiveServicesContributor: {
    name: 'Cognitive Services Contributor',
    scope: 'Azure AI Services',
    justification: '建立 AI 資源、部署模型與設定內容安全規則。'
  },
  containerRegistryReader: {
    name: 'AcrPull',
    scope: 'Azure Container Registry',
    justification: '允許部署環境抓取容器映像。'
  },
  reader: {
    name: 'Reader',
    scope: 'Subscription / Resource Group',
    justification: '供申請審核、資源檢閱與跨團隊對焦。'
  },
  securityReader: {
    name: 'Security Reader',
    scope: 'Microsoft Defender for Cloud',
    justification: '檢視安全建議、弱點與合規狀態。'
  }
};

export const serviceCatalog = {
  appService: {
    name: 'Azure App Service',
    category: '應用運算',
    description: '託管前後端 Web/API，適合快速交付企業應用。'
  },
  sqlDatabase: {
    name: 'Azure SQL Database',
    category: '資料庫',
    description: '關聯式資料儲存，適合企業交易資料、權限與報表。'
  },
  postgresql: {
    name: 'Azure Database for PostgreSQL',
    category: '資料庫',
    description: '適用開源應用、彈性 schema 與內容平台。'
  },
  storage: {
    name: 'Azure Storage Account',
    category: '儲存',
    description: '存放匯出報表、靜態內容、知識庫與備份檔。'
  },
  keyVault: {
    name: 'Azure Key Vault',
    category: '安全',
    description: '集中管理憑證、連線字串與 API 金鑰。'
  },
  appInsights: {
    name: 'Application Insights',
    category: '觀測性',
    description: '提供追蹤、錯誤分析、RUM 與效能監控。'
  },
  logAnalytics: {
    name: 'Log Analytics Workspace',
    category: '觀測性',
    description: '彙整日誌、支援稽核查詢與安全追溯。'
  },
  waf: {
    name: 'Application Gateway WAF',
    category: '安全',
    description: '提供第 7 層防護、Web Firewall 與反向代理。'
  },
  frontDoor: {
    name: 'Azure Front Door',
    category: '邊緣網路',
    description: '全球流量分配、TLS 終結與高可用入口。'
  },
  vnet: {
    name: 'Azure Virtual Network',
    category: '網路',
    description: '建立私有網段、子網與服務隔離。'
  },
  privateEndpoint: {
    name: 'Private Endpoint',
    category: '網路',
    description: '以私有連線方式連接 PaaS 服務。'
  },
  openAi: {
    name: 'Azure OpenAI Service',
    category: 'AI',
    description: '提供生成式 AI 模型與安全可控的推論能力。'
  },
  aiSearch: {
    name: 'Azure AI Search',
    category: 'AI',
    description: '支援 RAG、全文搜尋與語意搜尋。'
  },
  aiServices: {
    name: 'Azure AI Services',
    category: 'AI',
    description: '提供 OCR、語音、翻譯與視覺能力。'
  },
  entraId: {
    name: 'Microsoft Entra ID',
    category: '身份識別',
    description: '整合企業登入、SSO 與 RBAC。'
  },
  backup: {
    name: 'Azure Backup',
    category: '營運',
    description: '保護資料與設定，支援還原需求。'
  },
  containerRegistry: {
    name: 'Azure Container Registry',
    category: '容器',
    description: '儲存與管理容器映像，支援 CI/CD 佈署。'
  }
};

export const databaseTierCatalog = {
  'sql-s0': {
    label: 'Azure SQL S0',
    serviceId: 'sqlDatabase',
    sku: 'S0',
    sizing: '10 DTUs / 250 GB',
    note: '適合小型正式環境、低至中流量後台。'
  },
  'sql-s1': {
    label: 'Azure SQL S1',
    serviceId: 'sqlDatabase',
    sku: 'S1',
    sizing: '20 DTUs / 250 GB',
    note: '適合多使用者交易與中量查詢。'
  },
  'sql-s2': {
    label: 'Azure SQL S2',
    serviceId: 'sqlDatabase',
    sku: 'S2',
    sizing: '50 DTUs / 250 GB',
    note: '適合關鍵業務、較高併發與查詢壓力。'
  },
  'postgres-b1ms': {
    label: 'PostgreSQL Burstable B1ms',
    serviceId: 'postgresql',
    sku: 'B1ms',
    sizing: '1 vCore / Burstable',
    note: '適合開發、測試與內部輕量工作負載。'
  },
  'postgres-gp': {
    label: 'PostgreSQL General Purpose',
    serviceId: 'postgresql',
    sku: 'GP_Standard_D2s_v3',
    sizing: '2 vCores / General Purpose',
    note: '適合正式環境與一般交易型應用。'
  },
  'postgres-mo': {
    label: 'PostgreSQL Memory Optimized',
    serviceId: 'postgresql',
    sku: 'MO_E2s_v3',
    sizing: '2 vCores / Memory Optimized',
    note: '適合高記憶體需求、搜尋或高併發工作負載。'
  }
};

export const servicePermissionTemplates = {
  appService: ['appServiceContributor', 'planContributor', 'reader'],
  sqlDatabase: ['sqlContributor', 'sqlDbReader', 'sqlDbWriter', 'sqlDbDdlAdmin'],
  postgresql: ['postgresContributor', 'reader'],
  storage: ['storageBlobDataContributor', 'reader'],
  keyVault: ['keyVaultSecretsOfficer', 'keyVaultSecretsUser'],
  appInsights: ['monitoringContributor', 'reader'],
  logAnalytics: ['monitoringContributor', 'securityReader'],
  waf: ['networkContributor', 'securityReader'],
  frontDoor: ['networkContributor', 'reader'],
  vnet: ['networkContributor', 'reader'],
  privateEndpoint: ['networkContributor', 'reader'],
  openAi: ['cognitiveServicesUser', 'cognitiveServicesContributor'],
  aiSearch: ['reader'],
  aiServices: ['cognitiveServicesContributor', 'cognitiveServicesUser'],
  entraId: ['reader'],
  backup: ['reader', 'storageBlobDataContributor'],
  containerRegistry: ['containerRegistryReader', 'reader']
};

export const questionnaire = [
  {
    id: 'projectType',
    section: '專案輪廓',
    title: '專案主要交付型態是什麼？',
    type: 'single',
    options: [
      {
        value: 'web-app',
        label: '企業 Web 平台',
        description: '前後台、入口網站、管理系統',
        services: ['appService', 'appInsights', 'entraId'],
        roles: ['appServiceContributor', 'reader']
      },
      {
        value: 'api-platform',
        label: 'API / 微服務平台',
        description: '對內或對外 API、整合型平台',
        services: ['appService', 'appInsights', 'logAnalytics'],
        roles: ['appServiceContributor', 'reader']
      },
      {
        value: 'internal-tool',
        label: '內部作業工具',
        description: '流程自動化、報表與作業支援',
        services: ['appService', 'storage', 'entraId'],
        roles: ['appServiceContributor', 'storageBlobDataContributor']
      }
    ]
  },
  {
    id: 'dataSensitivity',
    section: '資料與合規',
    title: '資料敏感等級為何？',
    type: 'single',
    options: [
      {
        value: 'public',
        label: '一般公開或低敏感資料',
        services: ['storage'],
        roles: ['storageBlobDataContributor']
      },
      {
        value: 'internal',
        label: '內部資料',
        services: ['keyVault', 'logAnalytics'],
        roles: ['keyVaultSecretsOfficer', 'monitoringContributor']
      },
      {
        value: 'restricted',
        label: '機敏或受管制資料',
        services: ['keyVault', 'waf', 'privateEndpoint', 'logAnalytics'],
        roles: ['keyVaultSecretsOfficer', 'networkContributor', 'securityReader']
      }
    ]
  },
  {
    id: 'databaseNeed',
    section: '資料與合規',
    title: '系統需要哪種類型的資料庫？',
    type: 'single',
    options: [
      {
        value: 'sql',
        label: '關聯式交易資料庫（Azure SQL）',
        services: ['sqlDatabase'],
        roles: ['sqlContributor']
      },
      {
        value: 'postgres',
        label: '開源型資料庫（PostgreSQL）',
        services: ['postgresql'],
        roles: ['postgresContributor']
      },
      {
        value: 'none',
        label: '暫無結構化資料庫需求',
        services: ['storage'],
        roles: ['storageBlobDataContributor']
      }
    ]
  },
  {
    id: 'databaseTier',
    section: '資料與合規',
    title: '資料庫方案等級為何？',
    type: 'single',
    options: [
      {
        value: 'sql-s0',
        label: 'Azure SQL S0',
        description: '小型正式環境 / 輕量交易',
        services: ['sqlDatabase'],
        roles: ['sqlContributor']
      },
      {
        value: 'sql-s1',
        label: 'Azure SQL S1',
        description: '一般正式環境 / 中等交易量',
        services: ['sqlDatabase'],
        roles: ['sqlContributor']
      },
      {
        value: 'sql-s2',
        label: 'Azure SQL S2',
        description: '高併發或較關鍵系統',
        services: ['sqlDatabase'],
        roles: ['sqlContributor', 'monitoringContributor']
      },
      {
        value: 'postgres-b1ms',
        label: 'PostgreSQL B1ms',
        description: '開發 / 測試 / 內部輕量',
        services: ['postgresql'],
        roles: ['postgresContributor']
      },
      {
        value: 'postgres-gp',
        label: 'PostgreSQL General Purpose',
        description: '正式環境 / 一般交易工作負載',
        services: ['postgresql'],
        roles: ['postgresContributor']
      },
      {
        value: 'postgres-mo',
        label: 'PostgreSQL Memory Optimized',
        description: '高併發 / 高記憶體需求',
        services: ['postgresql'],
        roles: ['postgresContributor', 'monitoringContributor']
      },
      {
        value: 'not-applicable',
        label: '不適用 / 尚未決定',
        services: [],
        roles: []
      }
    ]
  },
  {
    id: 'databaseAccess',
    section: '身份與權限',
    title: '資料庫存取模式為何？',
    type: 'single',
    options: [
      {
        value: 'read-only',
        label: '唯讀查詢 / 報表',
        services: ['sqlDatabase'],
        roles: ['sqlDbReader']
      },
      {
        value: 'read-write',
        label: '交易式讀寫',
        services: ['sqlDatabase'],
        roles: ['sqlDbReader', 'sqlDbWriter']
      },
      {
        value: 'schema-change',
        label: '需調整 schema / migration',
        services: ['sqlDatabase'],
        roles: ['sqlDbReader', 'sqlDbWriter', 'sqlDbDdlAdmin']
      },
      {
        value: 'not-applicable',
        label: '不適用',
        services: [],
        roles: []
      }
    ]
  },
  {
    id: 'internetExposure',
    section: '安全與網路',
    title: '系統是否對外網開放？',
    type: 'single',
    options: [
      {
        value: 'public',
        label: '是，需對外提供服務',
        services: ['waf', 'frontDoor'],
        roles: ['networkContributor', 'reader']
      },
      {
        value: 'private',
        label: '否，僅內網或特定來源可存取',
        services: ['vnet', 'privateEndpoint'],
        roles: ['networkContributor']
      }
    ]
  },
  {
    id: 'identityModel',
    section: '身份與權限',
    title: '使用者登入模式為何？',
    type: 'single',
    options: [
      {
        value: 'entra-id',
        label: '企業帳號與 SSO',
        services: ['entraId'],
        roles: ['reader']
      },
      {
        value: 'local',
        label: '應用程式本地帳號',
        services: ['sqlDatabase', 'keyVault'],
        roles: ['sqlContributor', 'keyVaultSecretsOfficer']
      },
      {
        value: 'hybrid',
        label: '企業 SSO + 應用帳號混合',
        services: ['entraId', 'keyVault', 'sqlDatabase'],
        roles: ['reader', 'keyVaultSecretsOfficer', 'sqlContributor']
      }
    ]
  },
  {
    id: 'secretAccess',
    section: '身份與權限',
    title: 'Key Vault 機密的使用方式？',
    type: 'single',
    options: [
      {
        value: 'runtime-read',
        label: '應用程式只需讀取機密',
        services: ['keyVault'],
        roles: ['keyVaultSecretsUser']
      },
      {
        value: 'manage-secrets',
        label: '平台管理者需建立與輪替機密',
        services: ['keyVault'],
        roles: ['keyVaultSecretsOfficer']
      },
      {
        value: 'hybrid',
        label: '同時需要讀取與管理機密',
        services: ['keyVault'],
        roles: ['keyVaultSecretsUser', 'keyVaultSecretsOfficer']
      },
      {
        value: 'none',
        label: '暫不使用 Key Vault',
        services: [],
        roles: []
      }
    ]
  },
  {
    id: 'aiCapability',
    section: 'AI 能力',
    title: '是否需要 AI 或智慧化能力？',
    type: 'multi',
    options: [
      {
        value: 'gen-ai',
        label: '生成式問答 / 內容產生',
        services: ['openAi', 'aiSearch', 'storage'],
        roles: ['cognitiveServicesUser', 'storageBlobDataContributor']
      },
      {
        value: 'ocr',
        label: 'OCR / 文件辨識',
        services: ['aiServices', 'storage'],
        roles: ['cognitiveServicesContributor', 'storageBlobDataContributor']
      },
      {
        value: 'speech',
        label: '語音辨識 / TTS',
        services: ['aiServices'],
        roles: ['cognitiveServicesContributor']
      },
      {
        value: 'none',
        label: '暫不需要 AI 能力',
        services: [],
        roles: []
      }
    ]
  },
  {
    id: 'opsNeeds',
    section: '維運與治理',
    title: '需要哪些維運能力？',
    type: 'multi',
    options: [
      {
        value: 'monitoring',
        label: '集中監控與告警',
        services: ['appInsights', 'logAnalytics'],
        roles: ['monitoringContributor']
      },
      {
        value: 'backup',
        label: '備份與還原',
        services: ['backup', 'storage'],
        roles: ['storageBlobDataContributor', 'reader']
      },
      {
        value: 'container',
        label: '容器化部署',
        services: ['containerRegistry', 'appService'],
        roles: ['containerRegistryReader', 'appServiceContributor']
      },
      {
        value: 'security-audit',
        label: '安全稽核與合規檢視',
        services: ['logAnalytics', 'keyVault'],
        roles: ['securityReader', 'keyVaultSecretsOfficer']
      }
    ]
  },
  {
    id: 'scaleExpectation',
    section: '容量與可用性',
    title: '預期流量與可用性需求？',
    type: 'single',
    options: [
      {
        value: 'standard',
        label: '一般業務系統',
        services: ['appService', 'appInsights'],
        roles: ['planContributor']
      },
      {
        value: 'mission-critical',
        label: '高流量或關鍵系統',
        services: ['frontDoor', 'waf', 'logAnalytics'],
        roles: ['planContributor', 'networkContributor', 'monitoringContributor']
      }
    ]
  }
];

export const defaultAnswers = questionnaire.reduce((accumulator, question) => {
  accumulator[question.id] = question.type === 'multi' ? [] : '';
  return accumulator;
}, {});