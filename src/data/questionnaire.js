export const roleCatalog = {
  appServiceContributor: {
    name: 'Website Contributor',
    scope: 'Azure App Service',
    justification: '部署與維運 Web App、API 與應用程式設定。'
  },
  functionAppContributor: {
    name: 'Website Contributor',
    scope: 'Azure Functions',
    justification: '部署與維運 Function App、App Settings、觸發器與函式版本。'
  },
  apiManagementServiceContributor: {
    name: 'API Management Service Contributor',
    scope: 'Azure API Management',
    justification: '管理 API、Product、Policy、Subscription 與 Gateway 設定。'
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
    justification: '提供資料查詢、報表與 Query Store 讀取能力。'
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
  dbOwner: {
    name: 'db_owner',
    scope: 'Azure SQL Database',
    justification: '負責 Query Store tuning、效能調校與資料庫完整管理。'
  },
  postgresContributor: {
    name: 'Contributor',
    scope: 'Azure Database for PostgreSQL',
    justification: '管理 PostgreSQL 伺服器、參數與網路存取。'
  },
  cosmosDbOperator: {
    name: 'Cosmos DB Operator',
    scope: 'Azure Cosmos DB for MongoDB',
    justification: '建立 MongoDB API 帳戶、調整網路與備援設定。'
  },
  cosmosDbDataContributor: {
    name: 'Cosmos DB Built-in Data Contributor',
    scope: 'Azure Cosmos DB for MongoDB',
    justification: '管理資料庫、集合與文件資料的讀寫。'
  },
  storageBlobDataReader: {
    name: 'Storage Blob Data Reader',
    scope: 'Azure Storage Blob',
    justification: '供靜態網站、內容配發與唯讀檔案存取。'
  },
  storageBlobDataContributor: {
    name: 'Storage Blob Data Contributor',
    scope: 'Azure Storage Blob',
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
  managedIdentityOperator: {
    name: 'Managed Identity Operator',
    scope: 'User Assigned Managed Identity',
    justification: '建立、指派與維護可重用的 Managed Identity。'
  },
  networkContributor: {
    name: 'Network Contributor',
    scope: 'VNet / Application Gateway / WAF',
    justification: '配置網段、WAF Policy、Ingress、IP 白名單與 Private Endpoint。'
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
  serviceBusDataSender: {
    name: 'Azure Service Bus Data Sender',
    scope: 'Azure Messaging Services',
    justification: '允許應用程式發送 queue 或 topic 訊息。'
  },
  serviceBusDataReceiver: {
    name: 'Azure Service Bus Data Receiver',
    scope: 'Azure Messaging Services',
    justification: '允許背景工作或整合端接收 queue 或 subscription 訊息。'
  },
  serviceBusDataOwner: {
    name: 'Azure Service Bus Data Owner',
    scope: 'Azure Messaging Services',
    justification: '管理 queue、topic、subscription 與存取權。'
  },
  redisContributor: {
    name: 'Redis Cache Contributor',
    scope: 'Azure Cache for Redis',
    justification: '建立與調整 Redis SKU、網路與存取設定。'
  },
  containerRegistryReader: {
    name: 'AcrPull',
    scope: 'Azure Container Registry',
    justification: '允許部署環境抓取容器映像。'
  },
  azureDevOpsAdministrator: {
    name: 'Azure DevOps Project Administrators',
    scope: 'Azure DevOps Project',
    justification: '管理 Repo、Pipeline、Service Connection 與 Project 設定。'
  },
  azureDevOpsReader: {
    name: 'Azure DevOps Readers',
    scope: 'Azure DevOps Project',
    justification: '提供 Azure DevOps 專案唯讀檢視與稽核。'
  },
  armContributor: {
    name: 'Contributor',
    scope: 'Azure Resource Manager',
    justification: '透過 ARM/Bicep/Terraform 建立與管理 Azure 資源。'
  },
  userAccessAdministrator: {
    name: 'User Access Administrator',
    scope: 'Subscription / Resource Group',
    justification: '管理 RBAC 指派與角色授權流程。'
  },
  conditionalAccessAdministrator: {
    name: 'Conditional Access Administrator',
    scope: 'Microsoft Entra ID',
    justification: '設定 MFA、條件式存取與高風險登入控制。'
  },
  authenticationAdministrator: {
    name: 'Authentication Administrator',
    scope: 'Microsoft Entra ID',
    justification: '管理使用者驗證方法與 MFA 登錄需求。'
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
  functionApp: {
    name: 'Azure Functions',
    category: '應用運算',
    description: '以事件驅動與 Serverless 方式執行背景作業、Webhook 與 API。'
  },
  apiManagement: {
    name: 'Azure API Management',
    category: 'API 閘道',
    description: '提供 API Gateway、Rate Limit、Policy、安全控管與開發者入口。'
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
  cosmosMongo: {
    name: 'Azure Cosmos DB for MongoDB',
    category: '資料庫',
    description: '支援 MongoDB API 的文件型資料庫，適合彈性 schema 與高擴充讀寫。'
  },
  storage: {
    name: 'Azure Storage Account',
    category: '儲存',
    description: '存放 Blob、匯出報表、靜態內容與知識庫檔案。'
  },
  messaging: {
    name: 'Azure Messaging Services',
    category: '整合',
    description: '提供 Queue、Topic、Pub/Sub 與非同步整合流程。'
  },
  redis: {
    name: 'Azure Cache for Redis',
    category: '效能',
    description: '提供快取、Session、熱資料與低延遲存取能力。'
  },
  autoscale: {
    name: 'Azure Monitor Autoscale',
    category: '容量治理',
    description: '依流量、排程或佇列深度自動調整計算資源。'
  },
  keyVault: {
    name: 'Azure Key Vault',
    category: '安全',
    description: '集中管理憑證、連線字串、Generator Key 與 API 金鑰。'
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
  mfa: {
    name: 'Microsoft Entra MFA',
    category: '身份安全',
    description: '以多因素驗證與條件式存取保護登入安全。'
  },
  azureDevOps: {
    name: 'Azure DevOps',
    category: 'DevSecOps',
    description: '管理 Repo、Boards、Pipelines 與服務連線。'
  },
  azureResourceManager: {
    name: 'Azure Resource Manager',
    category: '治理',
    description: '透過 ARM/Bicep/Terraform 控制基礎設施與 RBAC。'
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
  'sql-s3': {
    label: 'Azure SQL S3',
    serviceId: 'sqlDatabase',
    sku: 'S3',
    sizing: '100 DTUs / 1 TB',
    note: '適合高交易量、核心業務與較大資料量需求。'
  },
  'sql-gp-vcore': {
    label: 'Azure SQL General Purpose vCore',
    serviceId: 'sqlDatabase',
    sku: 'GP_Gen5_2',
    sizing: '2 vCores / 10.4 GB RAM / General Purpose',
    note: '適合需精準控制 CPU / 記憶體與授權成本的正式環境。'
  },
  'sql-bc-vcore': {
    label: 'Azure SQL Business Critical vCore',
    serviceId: 'sqlDatabase',
    sku: 'BC_Gen5_4',
    sizing: '4 vCores / 20.8 GB RAM / Business Critical',
    note: '適合低延遲、高可用與關鍵交易系統。'
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
  },
  'mongo-serverless': {
    label: 'MongoDB Serverless',
    serviceId: 'cosmosMongo',
    sku: 'Serverless',
    sizing: 'Consumption / 自動依請求擴展',
    note: '適合波動流量、PoC 或低維運的文件型工作負載。'
  },
  'mongo-m30': {
    label: 'MongoDB M30 vCore Cluster',
    serviceId: 'cosmosMongo',
    sku: 'M30',
    sizing: '2 vCores / 8 GB RAM',
    note: '適合一般正式環境與 API 後端文件資料。'
  },
  'mongo-m50': {
    label: 'MongoDB M50 vCore Cluster',
    serviceId: 'cosmosMongo',
    sku: 'M50',
    sizing: '4 vCores / 16 GB RAM',
    note: '適合高併發、較大工作集與較高吞吐需求。'
  }
};

export const servicePermissionTemplates = {
  appService: ['appServiceContributor', 'planContributor', 'reader'],
  functionApp: ['functionAppContributor', 'reader'],
  apiManagement: ['apiManagementServiceContributor', 'reader'],
  sqlDatabase: ['sqlContributor', 'sqlDbReader', 'sqlDbWriter', 'sqlDbDdlAdmin', 'dbOwner'],
  postgresql: ['postgresContributor', 'reader'],
  cosmosMongo: ['cosmosDbOperator', 'cosmosDbDataContributor', 'reader'],
  storage: ['storageBlobDataReader', 'storageBlobDataContributor', 'reader'],
  messaging: ['serviceBusDataSender', 'serviceBusDataReceiver', 'serviceBusDataOwner'],
  redis: ['redisContributor', 'reader'],
  autoscale: ['planContributor', 'monitoringContributor'],
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
  mfa: ['conditionalAccessAdministrator', 'authenticationAdministrator'],
  azureDevOps: ['azureDevOpsAdministrator', 'azureDevOpsReader'],
  azureResourceManager: ['armContributor', 'userAccessAdministrator'],
  backup: ['reader', 'storageBlobDataContributor'],
  containerRegistry: ['containerRegistryReader', 'reader']
};

export const questionnaire = [
  {
    id: 'projectType',
    section: '專案輪廓',
    title: '專案主要交付型態是什麼？',
    type: 'single',
    references: [
      {
        title: 'Azure Architecture Center',
        url: 'https://learn.microsoft.com/azure/architecture/'
      }
    ],
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
        services: ['appService', 'apiManagement', 'appInsights', 'logAnalytics'],
        roles: ['appServiceContributor', 'apiManagementServiceContributor', 'reader']
      },
      {
        value: 'internal-tool',
        label: '內部作業工具',
        description: '流程自動化、報表與作業支援',
        services: ['appService', 'storage', 'entraId'],
        roles: ['appServiceContributor', 'storageBlobDataContributor']
      },
      {
        value: 'integration-hub',
        label: '整合中台 / BFF / API Gateway',
        description: '整合內外部系統、API 治理與流量管控',
        services: ['apiManagement', 'appService', 'logAnalytics'],
        roles: ['apiManagementServiceContributor', 'appServiceContributor', 'reader']
      },
      {
        value: 'ai-assistant',
        label: 'AI 助理 / 生成式平台',
        description: '需要 OpenAI、知識檢索與檔案來源控管',
        services: ['openAi', 'aiSearch', 'storage', 'appService'],
        roles: ['cognitiveServicesUser', 'storageBlobDataContributor', 'appServiceContributor']
      }
    ]
  },
  {
    id: 'region',
    section: '專案輪廓',
    title: '主要雲端位置為何？',
    type: 'single',
    references: [
      {
        title: 'Azure 全球區域',
        url: 'https://learn.microsoft.com/azure/reliability/regions-list'
      }
    ],
    options: [
      { value: 'east-asia', label: '東亞', description: '香港/台灣鄰近，低延遲亞洲部署', services: [], roles: [] },
      { value: 'taiwan', label: '台灣', description: '適合台灣近端體驗或資料落地需求評估', services: [], roles: [] },
      { value: 'southeast-asia', label: '東南亞', description: '新加坡區域，常見企業正式環境', services: [], roles: [] },
      { value: 'north-america', label: '北美', description: '適合全球性平台或北美主要客群', services: [], roles: [] },
      { value: 'west-europe', label: '西歐', description: '適合歐洲客群與跨區冗餘規劃', services: [], roles: [] },
      { value: 'japan-east', label: '日本東部', description: '適合日韓客群與區域容災', services: [], roles: [] },
      { value: 'japan-west', label: '日本西部', description: '適合日本西部落地或跨區容災規劃', services: [], roles: [] },
      { value: 'australia-east', label: '澳洲東部', description: '適合 APAC 延伸與跨區部署', services: [], roles: [] }
    ]
  },
  {
    id: 'billingPriority',
    section: '專案輪廓',
    title: '帳單評估偏好為何？',
    type: 'single',
    references: [
      {
        title: 'Azure Pricing Calculator',
        url: 'https://azure.microsoft.com/pricing/calculator/'
      }
    ],
    options: [
      { value: 'prototype', label: '先求低成本 PoC', description: '偏向最小可行規模', services: [], roles: [] },
      { value: 'balanced', label: '平衡成本與穩定性', description: '正式環境常用選擇', services: [], roles: [] },
      { value: 'resilient', label: '優先穩定與可擴充', description: '適合正式營運與成長型平台', services: ['appInsights', 'logAnalytics'], roles: ['monitoringContributor'] },
      { value: 'premium', label: '高可用與高性能優先', description: '適合關鍵或高流量系統', services: ['frontDoor', 'waf'], roles: ['networkContributor'] },
      { value: 'finops', label: '需符合 FinOps 追蹤與標記', description: '需強化成本標記與監控', services: ['logAnalytics'], roles: ['reader'] }
    ]
  },
  {
    id: 'dataSensitivity',
    section: '資料與合規',
    title: '資料敏感等級為何？',
    type: 'single',
    references: [
      {
        title: 'Azure Key Vault 概觀',
        url: 'https://learn.microsoft.com/azure/key-vault/general/overview'
      }
    ],
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
        value: 'confidential',
        label: '機密資料',
        services: ['keyVault', 'privateEndpoint', 'logAnalytics'],
        roles: ['keyVaultSecretsOfficer', 'securityReader', 'networkContributor']
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
    references: [
      {
        title: 'Azure SQL Database 文件',
        url: 'https://learn.microsoft.com/azure/azure-sql/database/'
      },
      {
        title: 'Azure PostgreSQL 文件',
        url: 'https://learn.microsoft.com/azure/postgresql/'
      }
    ],
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
        value: 'mongo',
        label: '文件型資料庫（MongoDB）',
        description: '適合彈性 schema、事件資料與高擴充讀寫',
        services: ['cosmosMongo'],
        roles: ['cosmosDbOperator', 'cosmosDbDataContributor']
      },
      {
        value: 'none',
        label: '暫無結構化資料庫需求',
        services: ['storage'],
        roles: ['storageBlobDataContributor']
      },
      {
        value: 'hybrid-db',
        label: '同時需要 SQL、NoSQL 與非結構化儲存',
        services: ['sqlDatabase', 'cosmosMongo', 'storage'],
        roles: ['sqlContributor', 'cosmosDbOperator', 'storageBlobDataContributor']
      }
    ]
  },
  {
    id: 'databaseTier',
    section: '資料與合規',
    title: '資料庫方案等級為何？',
    type: 'single',
    references: [
      {
        title: 'Azure SQL 服務層級',
        url: 'https://learn.microsoft.com/azure/azure-sql/database/service-tiers-sql-database-vcore'
      },
      {
        title: 'Azure PostgreSQL 定價層級',
        url: 'https://learn.microsoft.com/azure/postgresql/flexible-server/concepts-service-tiers-storage'
      }
    ],
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
        value: 'sql-s3',
        label: 'Azure SQL S3',
        description: '高交易量與較大容量需求',
        services: ['sqlDatabase'],
        roles: ['sqlContributor', 'monitoringContributor']
      },
      {
        value: 'sql-gp-vcore',
        label: 'Azure SQL General Purpose vCore',
        description: 'vCore 模型的一般正式環境',
        services: ['sqlDatabase'],
        roles: ['sqlContributor', 'monitoringContributor']
      },
      {
        value: 'sql-bc-vcore',
        label: 'Azure SQL Business Critical vCore',
        description: '低延遲高可用的關鍵業務方案',
        services: ['sqlDatabase'],
        roles: ['sqlContributor', 'dbOwner', 'monitoringContributor']
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
        value: 'mongo-serverless',
        label: 'MongoDB Serverless',
        description: '請求驅動、自動擴展的文件型資料庫',
        services: ['cosmosMongo'],
        roles: ['cosmosDbOperator', 'cosmosDbDataContributor']
      },
      {
        value: 'mongo-m30',
        label: 'MongoDB M30',
        description: '2 vCores / 8 GB RAM，一般正式環境',
        services: ['cosmosMongo'],
        roles: ['cosmosDbOperator', 'cosmosDbDataContributor']
      },
      {
        value: 'mongo-m50',
        label: 'MongoDB M50',
        description: '4 vCores / 16 GB RAM，高併發正式環境',
        services: ['cosmosMongo'],
        roles: ['cosmosDbOperator', 'cosmosDbDataContributor', 'monitoringContributor']
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
    id: 'queryStoreAccess',
    section: '資料與合規',
    title: 'MSSQL 是否需要查看或管理 Query Store？',
    type: 'single',
    references: [
      {
        title: 'Query Store 概觀',
        url: 'https://learn.microsoft.com/sql/relational-databases/performance/monitoring-performance-by-using-the-query-store'
      }
    ],
    options: [
      {
        value: 'query-read',
        label: '需要查看 Query Store 與執行計畫',
        description: '以分析效能與查詢趨勢為主',
        services: ['sqlDatabase'],
        roles: ['sqlDbReader']
      },
      {
        value: 'query-admin',
        label: '需要調整 Query Store 與效能參數',
        description: '包含 plan forcing 與進階調校',
        services: ['sqlDatabase'],
        roles: ['dbOwner']
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
    id: 'databasePerformance',
    section: '資料與合規',
    title: '資料庫效能模型需求為何？',
    type: 'single',
    references: [
      {
        title: 'Azure SQL DTU 與 vCore 比較',
        url: 'https://learn.microsoft.com/azure/azure-sql/database/service-tiers-sql-database-vcore'
      },
      {
        title: 'Azure PostgreSQL 效能層級',
        url: 'https://learn.microsoft.com/azure/postgresql/flexible-server/concepts-service-tiers-storage'
      }
    ],
    options: [
      {
        value: 'sql-dtu',
        label: 'Azure SQL DTU 模型',
        description: '以 DTU 模型評估交易與查詢負載',
        services: ['sqlDatabase'],
        roles: ['sqlContributor']
      },
      {
        value: 'sql-vcore',
        label: 'Azure SQL vCore 模型',
        description: '以 vCore 模型精準控制 CPU / 記憶體與授權',
        services: ['sqlDatabase'],
        roles: ['sqlContributor', 'monitoringContributor']
      },
      {
        value: 'postgres-vcore',
        label: 'PostgreSQL vCore 模型',
        description: '依 vCore 與儲存分開規劃 PostgreSQL 資源',
        services: ['postgresql'],
        roles: ['postgresContributor']
      },
      {
        value: 'mongo-ru',
        label: 'MongoDB RU 模型',
        description: '以 RU/s 規劃文件寫入、查詢與吞吐量',
        services: ['cosmosMongo'],
        roles: ['cosmosDbOperator']
      },
      {
        value: 'mongo-vcore',
        label: 'MongoDB vCore 模型',
        description: '以 vCore 與記憶體規劃文件型資料庫資源',
        services: ['cosmosMongo'],
        roles: ['cosmosDbOperator', 'monitoringContributor']
      },
      {
        value: 'memory-optimized',
        label: '高記憶體 / 高併發模型',
        description: '適合 Memory Optimized 或查詢密集型資料庫',
        services: ['postgresql', 'sqlDatabase', 'cosmosMongo', 'appInsights'],
        roles: ['postgresContributor', 'sqlContributor', 'cosmosDbOperator', 'monitoringContributor']
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
    id: 'databaseBackup',
    section: '資料與合規',
    title: '資料庫備份與還原需求為何？',
    type: 'single',
    references: [
      {
        title: 'Azure SQL 備份與還原',
        url: 'https://learn.microsoft.com/azure/azure-sql/database/automated-backups-overview'
      },
      {
        title: 'Azure Backup 概觀',
        url: 'https://learn.microsoft.com/azure/backup/backup-overview'
      }
    ],
    options: [
      {
        value: 'local-retention',
        label: '本地保留與短期還原',
        description: '適合一般正式環境與日常還原需求',
        services: ['backup'],
        roles: ['reader']
      },
      {
        value: 'pitr',
        label: 'Point-in-Time Restore',
        description: '需要精確回復到指定時間點',
        services: ['backup', 'storage'],
        roles: ['reader', 'storageBlobDataContributor']
      },
      {
        value: 'geo-redundant',
        label: '異地備份 / Geo-Redundant',
        description: '需要跨區備援與災難復原能力',
        services: ['backup', 'storage', 'frontDoor'],
        roles: ['reader', 'storageBlobDataContributor', 'networkContributor']
      },
      {
        value: 'long-term-retention',
        label: '長期保留與稽核封存',
        description: '適合合規要求或年度封存',
        services: ['backup', 'storage', 'logAnalytics'],
        roles: ['reader', 'storageBlobDataContributor', 'securityReader']
      },
      {
        value: 'not-applicable',
        label: '不適用 / 由平台預設',
        services: [],
        roles: []
      }
    ]
  },
  {
    id: 'blobUsage',
    section: '資料與合規',
    title: 'BLOB Storage 的用途為何？',
    type: 'multi',
    references: [
      {
        title: 'Azure Blob Storage 概觀',
        url: 'https://learn.microsoft.com/azure/storage/blobs/storage-blobs-introduction'
      }
    ],
    options: [
      {
        value: 'static-assets',
        label: '靜態網站或前端資產',
        description: '存放前端檔案、圖片與靜態內容',
        services: ['storage'],
        roles: ['storageBlobDataReader', 'storageBlobDataContributor']
      },
      {
        value: 'report-export',
        label: '報表匯出與檔案下載',
        description: '供系統輸出 Excel、CSV、PDF',
        services: ['storage'],
        roles: ['storageBlobDataContributor']
      },
      {
        value: 'private-upload',
        label: '內部文件上傳與封存',
        description: '限制在授權使用者與應用程式存取',
        services: ['storage', 'keyVault'],
        roles: ['storageBlobDataContributor', 'keyVaultSecretsUser']
      },
      {
        value: 'hot-media',
        label: '高頻媒體檔或公開下載',
        description: '搭配 CDN / 大量讀取情境',
        services: ['storage', 'frontDoor'],
        roles: ['storageBlobDataReader', 'storageBlobDataContributor']
      },
      {
        value: 'rag-kb',
        label: 'AI 知識庫檔案來源',
        description: '供 Azure OpenAI / AI Search 讀取文件',
        services: ['storage', 'aiSearch', 'openAi'],
        roles: ['storageBlobDataContributor', 'cognitiveServicesUser']
      },
      {
        value: 'none',
        label: '暫不使用 Blob Storage',
        services: [],
        roles: []
      }
    ]
  },
  {
    id: 'computePlatform',
    section: '應用與平台',
    title: '主要運算平台為何？',
    type: 'single',
    references: [
      {
        title: 'Azure App Service 與 Azure Functions 比較',
        url: 'https://learn.microsoft.com/azure/azure-functions/functions-compare-logic-apps-ms-flow-webjobs'
      }
    ],
    options: [
      {
        value: 'app-service',
        label: 'Azure App Service 為主',
        description: '適合長時運行的 Web、API 與企業平台',
        services: ['appService'],
        roles: ['appServiceContributor', 'planContributor']
      },
      {
        value: 'function-app',
        label: 'Azure Functions 為主',
        description: '適合事件驅動、排程、Webhook 與背景作業',
        services: ['functionApp'],
        roles: ['functionAppContributor']
      },
      {
        value: 'mixed',
        label: 'App Service + Azure Functions 混合',
        description: '前台/API 與背景事件處理同時存在',
        services: ['appService', 'functionApp'],
        roles: ['appServiceContributor', 'functionAppContributor', 'planContributor']
      },
      {
        value: 'undecided',
        label: '尚未決定 / 由平台建議',
        services: [],
        roles: []
      }
    ]
  },
  {
    id: 'appServicePlan',
    section: '應用與平台',
    title: 'App Service Plan 預計使用哪個等級？',
    type: 'single',
    references: [
      {
        title: 'App Service Plan 概觀',
        url: 'https://learn.microsoft.com/azure/app-service/overview-hosting-plans'
      }
    ],
    options: [
      { value: 'b1', label: 'B1', description: 'PoC / 開發驗證', services: ['appService'], roles: ['planContributor'] },
      { value: 's1', label: 'S1', description: '一般正式環境', services: ['appService'], roles: ['planContributor'] },
      { value: 's2', label: 'S2', description: '中高流量正式環境', services: ['appService', 'appInsights'], roles: ['planContributor', 'monitoringContributor'] },
      { value: 'p1v3', label: 'P1v3', description: '高效能與較佳隔離', services: ['appService', 'appInsights'], roles: ['planContributor', 'monitoringContributor'] },
      { value: 'p2v3', label: 'P2v3', description: '高流量與多實例生產系統', services: ['appService', 'appInsights', 'logAnalytics'], roles: ['planContributor', 'monitoringContributor'] },
      { value: 'container-plan', label: 'Container on App Service', description: '以容器映像部署', services: ['appService', 'containerRegistry'], roles: ['planContributor', 'containerRegistryReader'] },
      { value: 'not-applicable', label: '尚未決定 / 不使用 App Service', description: '保留其他運算方案或後續再決定', services: [], roles: [] }
    ]
  },
  {
    id: 'appServiceRuntime',
    section: '應用與平台',
    title: 'App Service Run Time 需求為何？',
    type: 'single',
    references: [
      {
        title: 'App Service 支援語言與 Runtime',
        url: 'https://learn.microsoft.com/azure/app-service/overview'
      }
    ],
    options: [
      { value: 'dotnet', label: '.NET', description: '企業系統與 API 常見選擇', services: ['appService'], roles: ['appServiceContributor'] },
      { value: 'node', label: 'Node.js', description: '前後端 JavaScript/TypeScript 服務', services: ['appService'], roles: ['appServiceContributor'] },
      { value: 'python', label: 'Python', description: 'AI 與資料處理工作負載', services: ['appService'], roles: ['appServiceContributor'] },
      { value: 'java', label: 'Java', description: '傳統企業服務與中大型平台', services: ['appService'], roles: ['appServiceContributor'] },
      { value: 'php', label: 'PHP', description: '舊版入口網站或 CMS 類型應用', services: ['appService'], roles: ['appServiceContributor'] },
      { value: 'static-web', label: 'Static + API', description: '前端靜態頁面搭配後端 API', services: ['appService', 'storage'], roles: ['appServiceContributor', 'storageBlobDataReader'] },
      { value: 'container', label: 'Custom Container', description: '需要自訂 runtime 與映像控制', services: ['appService', 'containerRegistry'], roles: ['appServiceContributor', 'containerRegistryReader'] },
      { value: 'not-applicable', label: '尚未決定 / 不使用 App Service Runtime', description: '保留其他部署方式或稍後決定', services: [], roles: [] }
    ]
  },
  {
    id: 'functionPlan',
    section: '應用與平台',
    title: 'Azure Functions Hosting Plan 為何？',
    type: 'single',
    references: [
      {
        title: 'Azure Functions Hosting Options',
        url: 'https://learn.microsoft.com/azure/azure-functions/functions-scale'
      }
    ],
    options: [
      { value: 'consumption', label: 'Consumption', description: '依執行次數計費，適合波動流量', services: ['functionApp'], roles: ['functionAppContributor'] },
      { value: 'premium', label: 'Premium', description: '需要 VNet、預熱實例與較快啟動', services: ['functionApp', 'vnet'], roles: ['functionAppContributor', 'networkContributor'] },
      { value: 'dedicated', label: 'Dedicated (App Service Plan)', description: '與既有 App Service Plan 共用容量', services: ['functionApp', 'appService'], roles: ['functionAppContributor', 'planContributor'] },
      { value: 'not-applicable', label: '不適用 / 尚未決定', services: [], roles: [] }
    ]
  },
  {
    id: 'functionRuntime',
    section: '應用與平台',
    title: 'Azure Functions Runtime 需求為何？',
    type: 'single',
    references: [
      {
        title: 'Azure Functions Supported Languages',
        url: 'https://learn.microsoft.com/azure/azure-functions/supported-languages'
      }
    ],
    options: [
      { value: 'dotnet-isolated', label: '.NET Isolated', description: '適合企業整合與長期維護', services: ['functionApp'], roles: ['functionAppContributor'] },
      { value: 'node', label: 'Node.js', description: '適合事件驅動 API 與 webhook', services: ['functionApp'], roles: ['functionAppContributor'] },
      { value: 'python', label: 'Python', description: '適合資料處理、AI 與自動化', services: ['functionApp'], roles: ['functionAppContributor'] },
      { value: 'powershell', label: 'PowerShell', description: '適合平台治理與自動化工作', services: ['functionApp'], roles: ['functionAppContributor'] },
      { value: 'not-applicable', label: '不適用 / 尚未決定', services: [], roles: [] }
    ]
  },
  {
    id: 'messagingService',
    section: '應用與平台',
    title: '是否需要 Azure Messaging Services？',
    type: 'single',
    references: [
      {
        title: 'Azure Messaging Services Overview',
        url: 'https://learn.microsoft.com/azure/service-bus-messaging/compare-messaging-services'
      }
    ],
    options: [
      {
        value: 'service-bus-queue',
        label: 'Service Bus Queue',
        description: '背景工作、排程處理與可靠訊息佇列',
        services: ['messaging'],
        roles: ['serviceBusDataSender', 'serviceBusDataReceiver']
      },
      {
        value: 'service-bus-topic',
        label: 'Service Bus Topic / Subscription',
        description: '多系統訂閱與事件扇出',
        services: ['messaging'],
        roles: ['serviceBusDataSender', 'serviceBusDataReceiver', 'serviceBusDataOwner']
      },
      {
        value: 'hybrid-messaging',
        label: 'Queue + Topic 混合',
        description: '同時需要非同步處理與事件廣播',
        services: ['messaging', 'functionApp'],
        roles: ['serviceBusDataSender', 'serviceBusDataReceiver', 'serviceBusDataOwner', 'functionAppContributor']
      },
      {
        value: 'none',
        label: '暫不需要 Messaging',
        services: [],
        roles: []
      }
    ]
  },
  {
    id: 'cacheService',
    section: '應用與平台',
    title: '是否需要 Azure Cache for Redis？',
    type: 'single',
    references: [
      {
        title: 'Azure Cache for Redis Overview',
        url: 'https://learn.microsoft.com/azure/azure-cache-for-redis/cache-overview'
      }
    ],
    options: [
      {
        value: 'redis-basic',
        label: 'Redis Basic',
        description: 'PoC、低流量快取或暫存 Session',
        services: ['redis'],
        roles: ['redisContributor']
      },
      {
        value: 'redis-standard',
        label: 'Redis Standard',
        description: '一般正式環境的快取需求',
        services: ['redis'],
        roles: ['redisContributor', 'reader']
      },
      {
        value: 'redis-premium',
        label: 'Redis Premium',
        description: '需要較佳隔離、持久化或 VNet 整合',
        services: ['redis', 'vnet'],
        roles: ['redisContributor', 'networkContributor']
      },
      {
        value: 'none',
        label: '暫不需要 Redis',
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
    references: [
      {
        title: 'SQL Database 安全性與角色',
        url: 'https://learn.microsoft.com/azure/azure-sql/database/security-overview'
      }
    ],
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
        value: 'ops-admin',
        label: '需由 DBA / 平台進行完整管理',
        services: ['sqlDatabase'],
        roles: ['dbOwner']
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
    references: [
      {
        title: 'Azure WAF 概觀',
        url: 'https://learn.microsoft.com/azure/web-application-firewall/ag/ag-overview'
      }
    ],
    options: [
      {
        value: 'public',
        label: '是，需對外提供服務',
        services: ['waf', 'frontDoor'],
        roles: ['networkContributor', 'reader']
      },
      {
        value: 'hybrid',
        label: '部分服務對外，核心服務內網',
        services: ['waf', 'vnet', 'privateEndpoint'],
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
    id: 'externalAccessControl',
    section: '安全與網路',
    title: '對外資源與 IP 控制方式？',
    type: 'single',
    references: [
      {
        title: 'App Service 存取限制',
        url: 'https://learn.microsoft.com/azure/app-service/app-service-ip-restrictions'
      }
    ],
    options: [
      {
        value: 'public-with-waf',
        label: '公開服務，交由 WAF 保護',
        description: '適合外部客戶或公開入口網站',
        services: ['waf', 'frontDoor'],
        roles: ['networkContributor']
      },
      {
        value: 'ip-whitelist',
        label: '僅允許指定外部 IP 白名單',
        description: '適合合作夥伴與固定來源存取',
        services: ['waf', 'vnet'],
        roles: ['networkContributor']
      },
      {
        value: 'private-only',
        label: '完全限制在內部網路',
        description: '透過 Private Endpoint / VNet 存取',
        services: ['privateEndpoint', 'vnet'],
        roles: ['networkContributor']
      },
      {
        value: 'partner-vpn',
        label: '合作夥伴經 VPN / 專線存取',
        description: '適合 B2B 或跨組織整合',
        services: ['vnet', 'privateEndpoint'],
        roles: ['networkContributor', 'reader']
      }
    ]
  },
  {
    id: 'apiManagementNeed',
    section: '應用與平台',
    title: '是否需要 API Management？',
    type: 'single',
    references: [
      {
        title: 'Azure API Management 文件',
        url: 'https://learn.microsoft.com/azure/api-management/'
      }
    ],
    options: [
      {
        value: 'external-api',
        label: '需要對外 API Gateway',
        description: '需做流量限制、金鑰、產品化與開發者入口',
        services: ['apiManagement'],
        roles: ['apiManagementServiceContributor']
      },
      {
        value: 'internal-api',
        label: '需要內部 API 治理',
        description: '集中控管內部微服務 API',
        services: ['apiManagement', 'vnet'],
        roles: ['apiManagementServiceContributor', 'networkContributor']
      },
      {
        value: 'hybrid-api',
        label: '同時需要內外部 API 管理',
        description: '對外開放與內部整合並存',
        services: ['apiManagement', 'waf', 'vnet'],
        roles: ['apiManagementServiceContributor', 'networkContributor']
      },
      {
        value: 'none',
        label: '暫不需要 APIM',
        services: [],
        roles: []
      }
    ]
  },
  {
    id: 'identityModel',
    section: '身份與權限',
    title: '使用者登入模式為何？',
    type: 'single',
    references: [
      {
        title: 'Microsoft Entra ID 概觀',
        url: 'https://learn.microsoft.com/entra/fundamentals/whatis'
      }
    ],
    options: [
      {
        value: 'entra-id',
        label: '企業帳號與 SSO',
        services: ['entraId'],
        roles: ['reader']
      },
      {
        value: 'b2b',
        label: '企業帳號 + 外部協作帳號',
        services: ['entraId', 'mfa'],
        roles: ['reader', 'conditionalAccessAdministrator']
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
    references: [
      {
        title: 'Key Vault RBAC 指南',
        url: 'https://learn.microsoft.com/azure/key-vault/general/rbac-guide'
      }
    ],
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
    id: 'serviceIamControls',
    section: '身份與權限',
    title: '服務 IAM 控制策略需要哪些設定？',
    type: 'multi',
    references: [
      {
        title: 'Azure Managed Identity 概觀',
        url: 'https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview'
      },
      {
        title: 'Azure RBAC 最小權限實務',
        url: 'https://learn.microsoft.com/azure/role-based-access-control/best-practices'
      }
    ],
    options: [
      {
        value: 'system-assigned-mi',
        label: '執行階段服務啟用 System-assigned Managed Identity',
        description: '讓 App Service / Functions 直接以受控身分存取 Key Vault、Storage、Service Bus 等資源',
        services: ['keyVault'],
        roles: []
      },
      {
        value: 'user-assigned-mi',
        label: '使用 User-assigned Managed Identity 供多服務共用',
        description: '適合多個服務共用同一組服務身分與 RBAC 指派',
        services: ['keyVault'],
        roles: ['managedIdentityOperator']
      },
      {
        value: 'least-privilege-rbac',
        label: '服務主體與自動化帳號需最小權限 RBAC',
        description: '要求服務帳號只能在限定 scope 執行必要操作，避免使用長期高權限身分',
        services: ['azureResourceManager'],
        roles: []
      },
      {
        value: 'privileged-approval',
        label: '高權限角色需經審批與限時授權',
        description: '適合正式環境的高權限變更與稽核要求',
        services: ['mfa', 'entraId'],
        roles: ['conditionalAccessAdministrator']
      },
      {
        value: 'none',
        label: '暫不需要額外服務 IAM 控制',
        services: [],
        roles: []
      }
    ]
  },
  {
    id: 'governanceControls',
    section: '身份與權限',
    title: '需要哪些平台治理與身份安全控制？',
    type: 'multi',
    references: [
      {
        title: 'Azure DevOps 安全性',
        url: 'https://learn.microsoft.com/azure/devops/organizations/security/about-security-identity'
      },
      {
        title: 'Azure RBAC 概觀',
        url: 'https://learn.microsoft.com/azure/role-based-access-control/overview'
      },
      {
        title: 'MFA 與條件式存取',
        url: 'https://learn.microsoft.com/entra/identity/authentication/concept-mfa-howitworks'
      }
    ],
    options: [
      {
        value: 'azure-devops',
        label: 'Azure DevOps Repo / Pipeline / Service Connection',
        description: '需要專案、Repo、Pipeline 或環境授權',
        services: ['azureDevOps'],
        roles: ['azureDevOpsAdministrator', 'azureDevOpsReader']
      },
      {
        value: 'arm-rbac',
        label: 'Azure Resource Manager 與 RBAC 指派',
        description: '以 ARM/Bicep/Terraform 管理基礎設施',
        services: ['azureResourceManager'],
        roles: ['armContributor', 'userAccessAdministrator']
      },
      {
        value: 'mfa',
        label: 'MFA / Conditional Access',
        description: '強化登入與高風險帳號保護',
        services: ['mfa', 'entraId'],
        roles: ['conditionalAccessAdministrator', 'authenticationAdministrator']
      },
      {
        value: 'none',
        label: '暫不需要額外治理控制',
        services: [],
        roles: []
      }
    ]
  },
  {
    id: 'generatorAccess',
    section: 'AI 能力',
    title: 'Generator Key / URL 交付方式為何？',
    type: 'single',
    references: [
      {
        title: 'Azure OpenAI 認證與 Endpoint',
        url: 'https://learn.microsoft.com/azure/ai-services/openai/reference'
      }
    ],
    options: [
      {
        value: 'key-only',
        label: '只提供 Generator Key',
        description: '由後端安全保存與代理呼叫',
        services: ['keyVault'],
        roles: ['keyVaultSecretsOfficer', 'keyVaultSecretsUser']
      },
      {
        value: 'url-only',
        label: '只提供 Endpoint URL',
        description: '僅提供 URL 給整合團隊，金鑰另管',
        services: ['openAi'],
        roles: ['reader']
      },
      {
        value: 'key-and-url',
        label: '同時提供 Key 與 URL',
        description: '需透過 Key Vault 與審計控管交付',
        services: ['keyVault', 'openAi'],
        roles: ['keyVaultSecretsOfficer', 'keyVaultSecretsUser', 'cognitiveServicesUser']
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
    id: 'aiCapability',
    section: 'AI 能力',
    title: '是否需要 AI 或智慧化能力？',
    type: 'multi',
    references: [
      {
        title: 'Azure OpenAI 文件',
        url: 'https://learn.microsoft.com/azure/ai-services/openai/'
      },
      {
        title: 'Azure AI Search 文件',
        url: 'https://learn.microsoft.com/azure/search/'
      }
    ],
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
        value: 'agent',
        label: 'AI Agent / Tool Calling',
        services: ['openAi', 'keyVault', 'storage'],
        roles: ['cognitiveServicesUser', 'keyVaultSecretsUser', 'storageBlobDataContributor']
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
    references: [
      {
        title: 'Application Insights 文件',
        url: 'https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview'
      }
    ],
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
        value: 'api-observability',
        label: 'API 監控與流量分析',
        services: ['apiManagement', 'appInsights', 'logAnalytics'],
        roles: ['apiManagementServiceContributor', 'monitoringContributor']
      },
      {
        value: 'security-audit',
        label: '安全稽核與合規檢視',
        services: ['logAnalytics', 'keyVault'],
        roles: ['securityReader', 'keyVaultSecretsOfficer']
      },
      {
        value: 'none',
        label: '暫不需要額外維運能力',
        description: '先以基本監控或平台預設交付',
        services: [],
        roles: []
      }
    ]
  },
  {
    id: 'autoscaleMode',
    section: '容量與可用性',
    title: '是否需要 Auto Scale 設定？',
    type: 'single',
    references: [
      {
        title: 'Azure Monitor Autoscale Overview',
        url: 'https://learn.microsoft.com/azure/azure-monitor/autoscale/autoscale-overview'
      }
    ],
    options: [
      {
        value: 'manual-only',
        label: '不啟用 Auto Scale，手動調整容量',
        description: '容量變更由平台或維運人員手動處理',
        services: [],
        roles: ['planContributor']
      },
      {
        value: 'scheduled-scale',
        label: '依排程自動擴縮',
        description: '配合尖峰時段或營運時段擴縮',
        services: ['autoscale'],
        roles: ['planContributor', 'monitoringContributor']
      },
      {
        value: 'metric-based-scale',
        label: '依 CPU / Queue / Request 指標自動擴縮',
        description: '適合 API、背景工作與波動流量平台',
        services: ['autoscale', 'appInsights'],
        roles: ['planContributor', 'monitoringContributor']
      },
      {
        value: 'serverless-burst',
        label: '依事件量自動擴展（Serverless）',
        description: '適合 Azure Functions 或訊息驅動工作負載',
        services: ['autoscale', 'functionApp', 'messaging'],
        roles: ['functionAppContributor', 'monitoringContributor', 'serviceBusDataReceiver']
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
    id: 'scaleExpectation',
    section: '容量與可用性',
    title: '預期流量與可用性需求？',
    type: 'single',
    references: [
      {
        title: '可靠性設計指南',
        url: 'https://learn.microsoft.com/azure/reliability/overview'
      }
    ],
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
      },
      {
        value: 'global-multi-region',
        label: '全球多區或跨區容災',
        services: ['frontDoor', 'waf', 'logAnalytics', 'appInsights'],
        roles: ['planContributor', 'networkContributor', 'monitoringContributor']
      },
      {
        value: 'not-applicable',
        label: '尚未決定 / 以平台預設為主',
        services: [],
        roles: []
      }
    ]
  }
];

export const defaultAnswers = questionnaire.reduce((accumulator, question) => {
  accumulator[question.id] = question.type === 'multi' ? [] : '';
  return accumulator;
}, {});