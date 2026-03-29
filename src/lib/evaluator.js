import {
  databaseTierCatalog,
  defaultAnswers,
  questionnaire,
  roleCatalog,
  serviceCatalog,
  servicePermissionTemplates
} from '../data/questionnaire';

const uniqueById = (items) => {
  const map = new Map();

  items.forEach((item) => {
    map.set(item.id, item);
  });

  return [...map.values()];
};

const scoreWeight = {
  projectType: 3,
  region: 1,
  billingPriority: 2,
  dataSensitivity: 3,
  databaseNeed: 3,
  databaseTier: 2,
  databasePerformance: 2,
  databaseBackup: 2,
  queryStoreAccess: 2,
  blobUsage: 2,
  computePlatform: 3,
  appServicePlan: 3,
  appServiceRuntime: 2,
  functionPlan: 2,
  functionRuntime: 2,
  messagingService: 2,
  cacheService: 2,
  databaseAccess: 3,
  internetExposure: 2,
  externalAccessControl: 2,
  identityModel: 2,
  secretAccess: 2,
  governanceControls: 3,
  generatorAccess: 2,
  aiCapability: 3,
  opsNeeds: 2,
  autoscaleMode: 2,
  scaleExpectation: 2
};

const normalizeSelections = (question, answers) => {
  const answer = answers[question.id];

  if (question.type === 'multi') {
    return Array.isArray(answer) ? answer : [];
  }

  return answer ? [answer] : [];
};

const determineApplicationStatus = (readiness, riskLevel) => {
  if (readiness < 70) {
    return '待補件';
  }

  if (riskLevel === '高') {
    return '待安全審核';
  }

  return '可送審';
};

const regionLabelMap = {
  'east-asia': '東亞',
  taiwan: '台灣',
  'southeast-asia': '東南亞',
  'north-america': '北美',
  'west-europe': '西歐',
  'japan-east': '日本東部',
  'japan-west': '日本西部',
  'australia-east': '澳洲東部'
};

const billingLabelMap = {
  prototype: '先求低成本 PoC',
  balanced: '平衡成本與穩定性',
  resilient: '優先穩定與可擴充',
  premium: '高可用與高性能優先',
  finops: '需符合 FinOps 追蹤與標記'
};

const runtimeLabelMap = {
  dotnet: '.NET',
  node: 'Node.js',
  python: 'Python',
  java: 'Java',
  php: 'PHP',
  'static-web': 'Static + API',
  container: 'Custom Container',
  'not-applicable': '未指定 / 不適用'
};

const computePlatformLabelMap = {
  'app-service': 'Azure App Service 為主',
  'function-app': 'Azure Functions 為主',
  mixed: 'App Service + Azure Functions 混合',
  undecided: '尚未決定 / 由平台建議'
};

const planLabelMap = {
  b1: 'B1',
  s1: 'S1',
  s2: 'S2',
  p1v3: 'P1v3',
  p2v3: 'P2v3',
  'container-plan': 'Container on App Service',
  'not-applicable': '未指定 / 不使用 App Service'
};

const functionPlanLabelMap = {
  consumption: 'Consumption',
  premium: 'Premium',
  dedicated: 'Dedicated (App Service Plan)',
  'not-applicable': '未指定 / 不使用 Azure Functions'
};

const functionRuntimeLabelMap = {
  'dotnet-isolated': '.NET Isolated',
  node: 'Node.js',
  python: 'Python',
  powershell: 'PowerShell',
  'not-applicable': '未指定 / 不適用'
};

const generatorLabelMap = {
  'key-only': '只提供 Generator Key',
  'url-only': '只提供 Endpoint URL',
  'key-and-url': '同時提供 Key 與 URL',
  'not-applicable': '不適用'
};

const externalAccessLabelMap = {
  'public-with-waf': '公開服務，交由 WAF 保護',
  'ip-whitelist': '僅允許指定外部 IP 白名單',
  'private-only': '完全限制在內部網路',
  'partner-vpn': '合作夥伴經 VPN / 專線存取'
};

const messagingLabelMap = {
  'service-bus-queue': 'Service Bus Queue',
  'service-bus-topic': 'Service Bus Topic / Subscription',
  'hybrid-messaging': 'Queue + Topic 混合',
  none: '不使用 Messaging'
};

const cacheLabelMap = {
  'redis-basic': 'Redis Basic',
  'redis-standard': 'Redis Standard',
  'redis-premium': 'Redis Premium',
  none: '不使用 Redis'
};

const databasePerformanceLabelMap = {
  'sql-dtu': 'Azure SQL DTU 模型',
  'sql-vcore': 'Azure SQL vCore 模型',
  'postgres-vcore': 'PostgreSQL vCore 模型',
  'mongo-ru': 'MongoDB RU 模型',
  'mongo-vcore': 'MongoDB vCore 模型',
  'memory-optimized': '高記憶體 / 高併發模型',
  'not-applicable': '不適用 / 尚未決定'
};

const databaseBackupLabelMap = {
  'local-retention': '本地保留與短期還原',
  pitr: 'Point-in-Time Restore',
  'geo-redundant': '異地備份 / Geo-Redundant',
  'long-term-retention': '長期保留與稽核封存',
  'not-applicable': '不適用 / 由平台預設'
};

const autoscaleLabelMap = {
  'manual-only': '手動調整容量',
  'scheduled-scale': '依排程自動擴縮',
  'metric-based-scale': '依 CPU / Queue / Request 指標自動擴縮',
  'serverless-burst': '依事件量自動擴展（Serverless）',
  'not-applicable': '不適用 / 尚未決定'
};

const resolveDatabasePlan = (answers) => {
  const tier = databaseTierCatalog[answers.databaseTier];

  if (!tier || answers.databaseNeed === 'none') {
    return null;
  }

  const accessMode = {
    'read-only': '唯讀查詢',
    'read-write': '交易式讀寫',
    'schema-change': 'Schema 調整與 migration',
    'ops-admin': '平台或 DBA 完整管理',
    'not-applicable': '不適用'
  }[answers.databaseAccess] ?? '未指定';

  return {
    engine:
      tier.serviceId === 'sqlDatabase'
        ? 'Azure SQL Database'
        : tier.serviceId === 'postgresql'
          ? 'Azure Database for PostgreSQL'
          : 'Azure Cosmos DB for MongoDB',
    sku: tier.sku,
    label: tier.label,
    sizing: tier.sizing,
    note: tier.note,
    accessMode: tier.serviceId === 'cosmosMongo' ? '文件資料讀寫 / 集合管理' : accessMode,
    performanceModel: databasePerformanceLabelMap[answers.databasePerformance] ?? '未指定',
    backupPolicy: databaseBackupLabelMap[answers.databaseBackup] ?? '未指定'
  };
};

const resolveAppServiceConfig = (answers) => ({
  plan: planLabelMap[answers.appServicePlan] ?? '未指定',
  runtime: runtimeLabelMap[answers.appServiceRuntime] ?? '未指定'
});

const resolveFunctionConfig = (answers) => ({
  enabled: ['function-app', 'mixed'].includes(answers.computePlatform),
  plan: functionPlanLabelMap[answers.functionPlan] ?? '未指定',
  runtime: functionRuntimeLabelMap[answers.functionRuntime] ?? '未指定'
});

const resolveAutoscaleProfile = (answers) => ({
  mode: autoscaleLabelMap[answers.autoscaleMode] ?? '未指定',
  guidance:
    answers.autoscaleMode === 'scheduled-scale'
      ? '建議依營運時段設定 instance 最小/最大值與排程。'
      : answers.autoscaleMode === 'metric-based-scale'
        ? '建議定義 CPU、HTTP request、Queue 長度等指標門檻。'
        : answers.autoscaleMode === 'serverless-burst'
          ? '建議搭配 Functions 或 Queue Trigger，確認突發事件量上限。'
          : answers.autoscaleMode === 'manual-only'
            ? '不使用自動擴縮，需建立人工調整與容量監控流程。'
            : '可由平台預設後續補充。'
});

const resolveGeneratorProfile = (answers) => ({
  mode: generatorLabelMap[answers.generatorAccess] ?? '未指定',
  endpointDelivery: answers.generatorAccess === 'key-only' ? '由平台持有 URL，僅交付 Key' : answers.generatorAccess === 'url-only' ? '僅交付 URL' : answers.generatorAccess === 'key-and-url' ? '交付 Key 與 URL，需經 Key Vault 管理' : '不適用'
});

const resolveReferenceLinks = (answers) => {
  const selectedQuestions = questionnaire.filter((question) => {
    const answer = answers[question.id];
    return Array.isArray(answer) ? answer.length > 0 : Boolean(answer);
  });

  const uniqueReferences = new Map();

  selectedQuestions.forEach((question) => {
    (question.references ?? []).forEach((reference) => {
      uniqueReferences.set(reference.url, reference);
    });
  });

  return [...uniqueReferences.values()];
};

const calculateCostEstimate = (answers, services, databasePlan) => {
  const serviceCosts = {
    appService: { b1: 55, s1: 110, s2: 150, p1v3: 240, p2v3: 360, 'container-plan': 260 },
    functionApp: { consumption: 18, premium: 95, dedicated: 40, 'not-applicable': 0 },
    apiManagement: 180,
    sqlDatabase: { S0: 18, S1: 32, S2: 75, S3: 145, GP_Gen5_2: 168, BC_Gen5_4: 420 },
    postgresql: { B1ms: 20, GP_Standard_D2s_v3: 125, MO_E2s_v3: 210 },
    cosmosMongo: { Serverless: 25, M30: 180, M50: 320 },
    storage: 12,
    messaging: { 'service-bus-queue': 12, 'service-bus-topic': 34, 'hybrid-messaging': 52, none: 0 },
    redis: { 'redis-basic': 16, 'redis-standard': 48, 'redis-premium': 135, none: 0 },
    autoscale: { 'manual-only': 0, 'scheduled-scale': 12, 'metric-based-scale': 20, 'serverless-burst': 10, 'not-applicable': 0 },
    keyVault: 6,
    appInsights: 18,
    logAnalytics: 25,
    waf: 220,
    frontDoor: 40,
    vnet: 12,
    privateEndpoint: 18,
    openAi: 65,
    aiSearch: 90,
    aiServices: 35,
    azureDevOps: 15,
    containerRegistry: 22,
    backup: 28,
    mfa: 8,
    azureResourceManager: 0,
    entraId: 0
  };

  const planKey = answers.appServicePlan || 's1';
  const appCost = serviceCosts.appService[planKey] ?? 110;
  const functionCost = serviceCosts.functionApp[answers.functionPlan] ?? 0;
  const dbCost = databasePlan
    ? (serviceCosts[
        databasePlan.engine === 'Azure SQL Database'
          ? 'sqlDatabase'
          : databasePlan.engine === 'Azure Database for PostgreSQL'
            ? 'postgresql'
            : 'cosmosMongo'
      ][databasePlan.sku] ?? 0)
    : 0;
  const messagingCost = serviceCosts.messaging[answers.messagingService] ?? 0;
  const cacheCost = serviceCosts.redis[answers.cacheService] ?? 0;
  const autoscaleCost = serviceCosts.autoscale[answers.autoscaleMode] ?? 0;
  const performancePremium = {
    'sql-dtu': 0,
    'sql-vcore': 35,
    'postgres-vcore': 28,
    'mongo-ru': 18,
    'mongo-vcore': 42,
    'memory-optimized': 65,
    'not-applicable': 0
  }[answers.databasePerformance] ?? 0;
  const backupPremium = {
    'local-retention': 8,
    pitr: 18,
    'geo-redundant': 36,
    'long-term-retention': 24,
    'not-applicable': 0
  }[answers.databaseBackup] ?? 0;

  let total = 0;

  services.forEach((service) => {
    if (service.id === 'appService') {
      total += appCost;
      return;
    }

    if (service.id === 'functionApp') {
      total += functionCost;
      return;
    }

    if (service.id === 'sqlDatabase' || service.id === 'postgresql' || service.id === 'cosmosMongo') {
      total += dbCost;
      return;
    }

    if (service.id === 'messaging') {
      total += messagingCost;
      return;
    }

    if (service.id === 'redis') {
      total += cacheCost;
      return;
    }

    if (service.id === 'autoscale') {
      total += autoscaleCost;
      return;
    }

    const cost = serviceCosts[service.id];
    total += typeof cost === 'number' ? cost : 0;
  });

  const multiplier = {
    prototype: 0.8,
    balanced: 1,
    resilient: 1.25,
    premium: 1.5
  }[answers.billingPriority] ?? 1;

  const adjusted = Math.round((total + performancePremium + backupPremium) * multiplier);

  return {
    currency: 'USD',
    low: Math.max(0, Math.round(adjusted * 0.85)),
    high: Math.round(adjusted * 1.2),
    strategy: billingLabelMap[answers.billingPriority] ?? '平衡成本與穩定性',
    note: '此為粗估月費區間（單位：USD/月），未含實際流量、出站頻寬、保留執行體與 AI token 消耗。'
  };
};

const resolveServiceSku = (serviceId, answers, databasePlan) => {
  switch (serviceId) {
    case 'appService':
      return planLabelMap[answers.appServicePlan] ?? (answers.scaleExpectation === 'mission-critical' ? 'P1v3' : 'S1');
    case 'functionApp':
      return functionPlanLabelMap[answers.functionPlan] ?? 'Consumption';
    case 'apiManagement':
      return answers.apiManagementNeed === 'hybrid-api' ? 'Standard v2' : 'Developer';
    case 'sqlDatabase':
    case 'postgresql':
    case 'cosmosMongo':
      return databasePlan?.sku ?? '待定';
    case 'messaging':
      return messagingLabelMap[answers.messagingService] ?? 'Standard';
    case 'redis':
      return cacheLabelMap[answers.cacheService] ?? 'Basic';
    case 'autoscale':
      return autoscaleLabelMap[answers.autoscaleMode] ?? '未指定';
    case 'storage':
      return answers.dataSensitivity === 'restricted' ? 'Standard_ZRS' : 'Standard_LRS';
    case 'waf':
      return 'WAF_v2';
    case 'frontDoor':
      return 'Standard';
    case 'appInsights':
      return 'Workspace-based';
    case 'logAnalytics':
      return 'PerGB2018';
    case 'openAi':
      return 'Standard';
    case 'aiSearch':
      return answers.scaleExpectation === 'mission-critical' ? 'Standard S2' : 'Basic';
    case 'containerRegistry':
      return 'Standard';
    case 'backup':
      return 'Vault Standard';
    case 'vnet':
      return answers.externalAccessControl === 'partner-vpn' ? 'VPN Gateway' : 'Standard';
    default:
      return '標準';
  }
};

const deriveSecurityControls = (answers) => {
  const controls = [
    '所有申請資源應配置於受控 Resource Group，並透過 RBAC 最小權限原則授權。'
  ];

  if (answers.internetExposure === 'public') {
    controls.push('對外系統需納入 Application Gateway WAF 或 Front Door，並限制管理介面來源。');
  }

  if (answers.dataSensitivity === 'restricted') {
    controls.push('機敏資料建議強制使用 Key Vault、Private Endpoint 與集中稽核日誌。');
  }

  if (answers.databaseBackup && answers.databaseBackup !== 'not-applicable') {
    controls.push(`資料庫需配置備份策略：${databaseBackupLabelMap[answers.databaseBackup]}，並確認定期還原演練。`);
  }

  if (answers.databaseNeed === 'mongo') {
    controls.push('MongoDB 建議限制可信來源、啟用備份策略，並檢查集合索引與 throughput 配置。');
  }

  if (answers.secretAccess && answers.secretAccess !== 'none') {
    controls.push('應用程式應以 Managed Identity 或受控身分讀取機密，避免硬編碼帳密。');
  }

  if (Array.isArray(answers.aiCapability) && answers.aiCapability.some((item) => item !== 'none')) {
    controls.push('AI 服務應啟用內容安全、模型存取審核與知識庫來源管控。');
  }

  if (answers.externalAccessControl === 'ip-whitelist') {
    controls.push('對外資源應維護外部 IP 白名單，並定期審查例外來源。');
  }

  if (Array.isArray(answers.governanceControls) && answers.governanceControls.includes('mfa')) {
    controls.push('管理者與高權限帳號應強制啟用 MFA 與條件式存取政策。');
  }

  if (answers.apiManagementNeed && answers.apiManagementNeed !== 'none') {
    controls.push('APIM 應配置 Subscription / Product 規則、API Policy 與必要的存取節流設定。');
  }

  if (answers.messagingService && answers.messagingService !== 'none') {
    controls.push('訊息服務應設定 dead-letter、重試與佇列監控，避免訊息堆積未被處理。');
  }

  if (answers.cacheService === 'redis-premium') {
    controls.push('Redis Premium 建議搭配 VNet、持久化與快取鍵名治理策略。');
  }

  if (answers.autoscaleMode && answers.autoscaleMode !== 'not-applicable') {
    controls.push(`Auto Scale 策略：${autoscaleLabelMap[answers.autoscaleMode]}，需同步建立容量告警與上限保護。`);
  }

  return controls;
};

const buildArchitecturePreview = (answers, services, databasePlan) => {
  const hasPublicEntry = answers.internetExposure === 'public';
  const hasAi = Array.isArray(answers.aiCapability) && answers.aiCapability.some((item) => item !== 'none');

  return {
    ingress: [
      hasPublicEntry ? 'Internet / 外部使用者' : '內部使用者 / VPN',
      hasPublicEntry ? 'WAF / Front Door' : 'Private Endpoint / VNet',
      answers.externalAccessControl === 'ip-whitelist' ? '外部 IP 白名單' : '一般入口政策'
    ],
    identity: [
      'Microsoft Entra ID',
      Array.isArray(answers.governanceControls) && answers.governanceControls.includes('mfa') ? 'MFA / Conditional Access' : '基本登入治理',
      answers.secretAccess && answers.secretAccess !== 'none' ? 'Key Vault 存取控制' : '應用程式存取控制'
    ],
    application: [
      `運算平台：${computePlatformLabelMap[answers.computePlatform] ?? '未指定'}`,
      `Azure App Service (${planLabelMap[answers.appServicePlan] ?? '未指定'})`,
      `App Runtime: ${runtimeLabelMap[answers.appServiceRuntime] ?? '未指定'}`,
      `Azure Functions (${functionPlanLabelMap[answers.functionPlan] ?? '未指定'}) / ${functionRuntimeLabelMap[answers.functionRuntime] ?? '未指定'}`,
      answers.apiManagementNeed && answers.apiManagementNeed !== 'none' ? 'Azure API Management' : '直接應用入口',
      answers.messagingService && answers.messagingService !== 'none' ? `Messaging: ${messagingLabelMap[answers.messagingService]}` : '無訊息佇列需求',
      answers.cacheService && answers.cacheService !== 'none' ? `Redis: ${cacheLabelMap[answers.cacheService]}` : '無 Redis 快取需求',
      Array.isArray(answers.governanceControls) && answers.governanceControls.includes('azure-devops') ? 'Azure DevOps Pipeline' : 'CI/CD 自行規劃'
    ],
    data: [
      databasePlan ? `${databasePlan.engine} (${databasePlan.sku})` : '無關聯式資料庫',
      databasePlan ? `效能模型：${databasePlan.performanceModel}` : '無資料庫效能需求',
      databasePlan ? `備份策略：${databasePlan.backupPolicy}` : '無資料庫備份需求',
      Array.isArray(answers.blobUsage) && answers.blobUsage.some((item) => item !== 'none') ? 'Azure Blob Storage' : '無 Blob 儲存需求',
      hasAi ? 'Azure OpenAI / AI Search' : '無 AI 模組'
    ],
    governance: [
      Array.isArray(answers.governanceControls) && answers.governanceControls.includes('arm-rbac') ? 'Azure Resource Manager / RBAC' : '標準 Azure RBAC',
      services.some((service) => service.id === 'appInsights') ? 'Application Insights' : '基本監控',
      services.some((service) => service.id === 'logAnalytics') ? 'Log Analytics / 稽核' : '輕量日誌',
      answers.autoscaleMode && answers.autoscaleMode !== 'not-applicable' ? `Auto Scale：${autoscaleLabelMap[answers.autoscaleMode]}` : 'Auto Scale 未指定'
    ]
  };
};

const buildArchitectureMermaid = (result) => {
  const appNode = `APP[Azure App Service\\n${result.appServiceConfig.plan} / ${result.appServiceConfig.runtime}]`;
  const functionNode = result.functionConfig.enabled ? `FUNC[Azure Functions\\n${result.functionConfig.plan} / ${result.functionConfig.runtime}]` : null;
  const apiNode = result.services.some((service) => service.id === 'apiManagement') ? 'APIM[Azure API Management]' : 'EDGE[Ingress Control]';
  const dbNode = result.databasePlan ? `DB[( ${result.databasePlan.engine}\\n${result.databasePlan.sku} )]` : 'DB[(No Relational DB)]';
  const blobNode = result.services.some((service) => service.id === 'storage') ? 'BLOB[(Azure Blob Storage)]' : 'BLOB[(No Blob)]';
  const aiNode = result.services.some((service) => service.id === 'openAi') ? 'AI[Azure OpenAI / AI Search]' : 'AI[No AI Service]';
  const messageNode = result.services.some((service) => service.id === 'messaging') ? 'MSG[Azure Messaging Services]' : null;
  const cacheNode = result.services.some((service) => service.id === 'redis') ? 'CACHE[Azure Cache for Redis]' : null;
  const identityNode = result.services.some((service) => service.id === 'mfa') ? 'ID[Entra ID + MFA]' : 'ID[Microsoft Entra ID]';
  const monitorNode = result.services.some((service) => service.id === 'logAnalytics') ? 'MON[App Insights + Log Analytics]' : 'MON[Basic Monitoring]';

  return [
    '```mermaid',
    'flowchart LR',
    'USER[使用者 / 系統整合方] --> EDGE1[Internet / VPN]',
    `EDGE1 --> ${apiNode}`,
    `${apiNode} --> ${appNode}`,
    functionNode ? `${appNode} --> ${functionNode}` : null,
    messageNode ? `${appNode} --> ${messageNode}` : null,
    messageNode && functionNode ? `${messageNode} --> ${functionNode}` : null,
    `${appNode} --> ${dbNode}`,
    `${appNode} --> ${blobNode}`,
    cacheNode ? `${appNode} --> ${cacheNode}` : null,
    `${appNode} --> KV[Azure Key Vault]`,
    `${appNode} --> ${aiNode}`,
    `${identityNode} --> ${appNode}`,
    `${appNode} --> ${monitorNode}`,
    'DEVOPS[Azure DevOps / ARM] -. 管理與部署 .-> APP',
    '```'
  ].filter(Boolean).join('\n');
};

const buildServiceAccessMatrix = (services, permissions, answers, databasePlan) => {
  const permissionMap = new Map(permissions.map((permission) => [permission.id, permission]));

  return services.map((service) => {
    const roleIds = servicePermissionTemplates[service.id] ?? [];
    const roles = roleIds
      .map((roleId) => {
        const permission = permissionMap.get(roleId);
        const role = permission ?? roleCatalog[roleId];

        if (!role) {
          return null;
        }

        return {
          id: roleId,
          name: role.name,
          scope: role.scope,
          level: permission?.level ?? '低'
        };
      })
      .filter(Boolean);

    return {
      id: service.id,
      serviceName: service.name,
      sku: resolveServiceSku(service.id, answers, databasePlan),
      roles,
      status: service.priority === '必要' ? '必須申請' : service.priority === '建議' ? '建議申請' : '可選申請'
    };
  });
};

export const evaluateSurvey = (answers, projectProfile = {}) => {
  const mergedAnswers = { ...defaultAnswers, ...answers };
  const serviceScores = new Map();
  const roleScores = new Map();
  const rationale = [];

  questionnaire.forEach((question) => {
    const selections = normalizeSelections(question, mergedAnswers);
    const selectedOptions = question.options.filter((option) => selections.includes(option.value));

    selectedOptions.forEach((option) => {
      const weight = scoreWeight[question.id] ?? 1;

      option.services.forEach((serviceId) => {
        serviceScores.set(serviceId, (serviceScores.get(serviceId) ?? 0) + weight);
      });

      option.roles.forEach((roleId) => {
        roleScores.set(roleId, (roleScores.get(roleId) ?? 0) + weight);
      });

      rationale.push({
        question: question.title,
        answer: option.label,
        services: option.services,
        roles: option.roles
      });
    });
  });

  const services = uniqueById(
    [...serviceScores.entries()]
      .sort((left, right) => right[1] - left[1])
      .map(([serviceId, score]) => ({
        id: serviceId,
        score,
        priority: score >= 7 ? '必要' : score >= 4 ? '建議' : '選配',
        ...serviceCatalog[serviceId]
      }))
      .filter((service) => service.name)
  );

  const permissions = uniqueById(
    [...roleScores.entries()]
      .sort((left, right) => right[1] - left[1])
      .map(([roleId, score]) => ({
        id: roleId,
        score,
        level: score >= 7 ? '高' : score >= 4 ? '中' : '低',
        ...roleCatalog[roleId]
      }))
      .filter((role) => role.name)
  );

  const sectionsCompleted = questionnaire.filter((question) => {
    const answer = mergedAnswers[question.id];
    return Array.isArray(answer) ? answer.length > 0 : Boolean(answer);
  }).length;

  const readiness = Math.round((sectionsCompleted / questionnaire.length) * 100);
  const riskLevel =
    mergedAnswers.dataSensitivity === 'restricted' ||
    mergedAnswers.internetExposure === 'public' ||
    mergedAnswers.scaleExpectation === 'mission-critical'
      ? '高'
      : mergedAnswers.dataSensitivity === 'internal'
        ? '中'
        : '一般';

  const applicationStatus = determineApplicationStatus(readiness, riskLevel);
  const databasePlan = resolveDatabasePlan(mergedAnswers);
  const appServiceConfig = resolveAppServiceConfig(mergedAnswers);
  const functionConfig = resolveFunctionConfig(mergedAnswers);
  const autoscaleProfile = resolveAutoscaleProfile(mergedAnswers);
  const generatorProfile = resolveGeneratorProfile(mergedAnswers);
  const securityControls = deriveSecurityControls(mergedAnswers);
  const serviceAccessMatrix = buildServiceAccessMatrix(services, permissions, mergedAnswers, databasePlan);
  const referenceLinks = resolveReferenceLinks(mergedAnswers);
  const costEstimate = calculateCostEstimate(mergedAnswers, services, databasePlan);
  const architecturePreview = buildArchitecturePreview(mergedAnswers, services, databasePlan);
  const regionLabel = regionLabelMap[mergedAnswers.region] ?? '未指定';

  const executiveSummary = [
    projectProfile.projectName ? `專案名稱：${projectProfile.projectName}` : null,
    projectProfile.department ? `申請單位：${projectProfile.department}` : null,
    projectProfile.applicantName ? `申請人：${projectProfile.applicantName}` : null,
    projectProfile.employeeId ? `員工編號：${projectProfile.employeeId}` : null,
    `申請狀態：${applicationStatus}`,
    `問卷完成度：${readiness}%`,
    `治理風險等級：${riskLevel}`,
    services.length ? `核心服務：${services.slice(0, 4).map((item) => item.name).join('、')}` : null,
    databasePlan ? `資料庫方案：${databasePlan.label}` : null,
    `運算平台：${computePlatformLabelMap[mergedAnswers.computePlatform] ?? '未指定'}`,
    `Auto Scale：${autoscaleProfile.mode}`,
    `雲端位置：${regionLabel}`,
    `月費粗估：${costEstimate.currency} ${costEstimate.low}-${costEstimate.high} / 月`,
    `對外存取：${externalAccessLabelMap[mergedAnswers.externalAccessControl] ?? '未指定'}`
  ].filter(Boolean);

  return {
    readiness,
    riskLevel,
    applicationStatus,
    services,
    permissions,
    rationale,
    executiveSummary,
    databasePlan,
    appServiceConfig,
    functionConfig,
    autoscaleProfile,
    generatorProfile,
    regionLabel,
    serviceAccessMatrix,
    securityControls,
    referenceLinks,
    costEstimate,
    architecturePreview,
    generatedAt: new Date().toLocaleString('zh-TW', { hour12: false })
  };
};

export const buildReportMarkdown = (projectProfile, result) => {
  const profileLines = [
    `- 專案名稱：${projectProfile.projectName || '未填寫'}`,
    `- 申請單位：${projectProfile.department || '未填寫'}`,
    `- 申請人：${projectProfile.applicantName || '未填寫'}`,
    `- 員工編號：${projectProfile.employeeId || '未填寫'}`,
    `- 申請人信箱：${projectProfile.applicantEmail || '未填寫'}`,
    `- 預計上線日：${projectProfile.launchDate || '未填寫'}`,
    `- 雲端位置：${result.regionLabel}`,
    `- 對外資源：${projectProfile.publicResourceScope || '未填寫'}`,
    `- 外部 IP 白名單：${projectProfile.externalIps || '未填寫'}`,
    `- 申請狀態：${result.applicationStatus}`,
    `- 產生時間：${result.generatedAt}`,
    `- 風險等級：${result.riskLevel}`,
    `- 問卷完成度：${result.readiness}%`
  ];

  const costLines = [
    `| 項目 | 內容 |`,
    `| --- | --- |`,
    `| 月費粗估 | ${result.costEstimate.currency} ${result.costEstimate.low}-${result.costEstimate.high} / 月 |`,
    `| 成本策略 | ${result.costEstimate.strategy} |`,
    `| 備註 | ${result.costEstimate.note} |`
  ];

  const databaseLines = result.databasePlan
    ? [
        `- 引擎：${result.databasePlan.engine}`,
        `- 方案：${result.databasePlan.label}`,
        `- SKU：${result.databasePlan.sku}`,
        `- 容量：${result.databasePlan.sizing}`,
        `- 存取模式：${result.databasePlan.accessMode}`,
        `- 效能模型：${result.databasePlan.performanceModel}`,
        `- 備份策略：${result.databasePlan.backupPolicy}`,
        `- 備註：${result.databasePlan.note}`
      ]
    : ['- 無資料庫方案需求'];

  const serviceLines = [
    `| Azure 服務 | 申請狀態 | SKU / 層級 | 建議角色 |`,
    `| --- | --- | --- | --- |`,
    ...result.serviceAccessMatrix.map(
      (service) => `| ${service.serviceName} | ${service.status} | ${service.sku} | ${service.roles.map((role) => role.name).join('<br/>') || '無'} |`
    )
  ];

  const permissionLines = [
    `| 角色 | Scope | 需求強度 | 用途說明 |`,
    `| --- | --- | --- | --- |`,
    ...result.permissions.map(
      (permission) => `| ${permission.name} | ${permission.scope} | ${permission.level} | ${permission.justification} |`
    )
  ];

  const securityLines = result.securityControls.map((item) => `- ${item}`);
  const rationaleLines = result.rationale.map((item) => `- ${item.question} -> ${item.answer}`);
  const referenceLines = result.referenceLinks.map((item) => `- ${item.title}：${item.url}`);
  const architectureMermaid = buildArchitectureMermaid(result);

  return [
    '# Azure 服務與權限平台申請單',
    '',
    '> 此文件由 Azure Intake Studio 自動產生，供平台治理、權限申請與資源審查使用。',
    '',
    '## 專案摘要',
    ...profileLines,
    '',
    '## 運算與 Generator 配置',
    `| 項目 | 內容 |`,
    `| --- | --- |`,
    `| 主要運算平台 | ${result.functionConfig.enabled && result.appServiceConfig.plan !== '未指定 / 不使用 App Service' ? 'App Service + Azure Functions' : result.functionConfig.enabled ? 'Azure Functions' : 'Azure App Service'} |`,
    `| App Service Plan | ${result.appServiceConfig.plan} |`,
    `| App Service Runtime | ${result.appServiceConfig.runtime} |`,
    `| Azure Functions Plan | ${result.functionConfig.plan} |`,
    `| Azure Functions Runtime | ${result.functionConfig.runtime} |`,
    `| Auto Scale | ${result.autoscaleProfile.mode} |`,
    `| Auto Scale 補充 | ${result.autoscaleProfile.guidance} |`,
    `| Generator 交付模式 | ${result.generatorProfile.mode} |`,
    `| Generator 補充說明 | ${result.generatorProfile.endpointDelivery} |`,
    '',
    '## 資料庫方案',
    ...databaseLines,
    '',
    '## 帳單評估',
    ...costLines,
    '',
    '## 建議 Azure 服務與對應權限',
    ...(serviceLines.length ? serviceLines : ['- 無']),
    '',
    '## 全域角色權限',
    ...(permissionLines.length ? permissionLines : ['- 無']),
    '',
    '## 安全控制',
    ...(securityLines.length ? securityLines : ['- 無']),
    '',
    '## 技術參考',
    ...(referenceLines.length ? referenceLines : ['- 無']),
    '',
    '## 預覽架構圖',
    architectureMermaid,
    '',
    '## 判定依據',
    ...(rationaleLines.length ? rationaleLines : ['- 無'])
  ].join('\n');
};