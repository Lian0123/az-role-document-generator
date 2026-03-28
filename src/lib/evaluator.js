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
  dataSensitivity: 3,
  databaseNeed: 3,
  databaseTier: 2,
  databaseAccess: 3,
  internetExposure: 2,
  identityModel: 2,
  secretAccess: 2,
  aiCapability: 3,
  opsNeeds: 2,
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

const resolveDatabasePlan = (answers) => {
  const tier = databaseTierCatalog[answers.databaseTier];

  if (!tier || answers.databaseNeed === 'none') {
    return null;
  }

  const accessMode = {
    'read-only': '唯讀查詢',
    'read-write': '交易式讀寫',
    'schema-change': 'Schema 調整與 migration',
    'not-applicable': '不適用'
  }[answers.databaseAccess] ?? '未指定';

  return {
    engine: tier.serviceId === 'sqlDatabase' ? 'Azure SQL Database' : 'Azure Database for PostgreSQL',
    sku: tier.sku,
    label: tier.label,
    sizing: tier.sizing,
    note: tier.note,
    accessMode
  };
};

const resolveServiceSku = (serviceId, answers, databasePlan) => {
  switch (serviceId) {
    case 'appService':
      return answers.scaleExpectation === 'mission-critical' ? 'P1v3' : 'S1';
    case 'sqlDatabase':
    case 'postgresql':
      return databasePlan?.sku ?? '待定';
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

  if (answers.secretAccess && answers.secretAccess !== 'none') {
    controls.push('應用程式應以 Managed Identity 或受控身分讀取機密，避免硬編碼帳密。');
  }

  if (Array.isArray(answers.aiCapability) && answers.aiCapability.some((item) => item !== 'none')) {
    controls.push('AI 服務應啟用內容安全、模型存取審核與知識庫來源管控。');
  }

  return controls;
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
  const securityControls = deriveSecurityControls(mergedAnswers);
  const serviceAccessMatrix = buildServiceAccessMatrix(services, permissions, mergedAnswers, databasePlan);

  const executiveSummary = [
    projectProfile.projectName ? `專案名稱：${projectProfile.projectName}` : null,
    projectProfile.department ? `申請單位：${projectProfile.department}` : null,
    projectProfile.owner ? `負責人：${projectProfile.owner}` : null,
    `申請狀態：${applicationStatus}`,
    `問卷完成度：${readiness}%`,
    `治理風險等級：${riskLevel}`,
    services.length ? `核心服務：${services.slice(0, 4).map((item) => item.name).join('、')}` : null,
    databasePlan ? `資料庫方案：${databasePlan.label}` : null
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
    serviceAccessMatrix,
    securityControls,
    generatedAt: new Date().toLocaleString('zh-TW', { hour12: false })
  };
};

export const buildReportMarkdown = (projectProfile, result) => {
  const profileLines = [
    `- 專案名稱：${projectProfile.projectName || '未填寫'}`,
    `- 申請單位：${projectProfile.department || '未填寫'}`,
    `- 負責人：${projectProfile.owner || '未填寫'}`,
    `- 預計上線日：${projectProfile.launchDate || '未填寫'}`,
    `- 申請狀態：${result.applicationStatus}`,
    `- 產生時間：${result.generatedAt}`,
    `- 風險等級：${result.riskLevel}`,
    `- 問卷完成度：${result.readiness}%`
  ];

  const databaseLines = result.databasePlan
    ? [
        `- 引擎：${result.databasePlan.engine}`,
        `- 方案：${result.databasePlan.label}`,
        `- SKU：${result.databasePlan.sku}`,
        `- 容量：${result.databasePlan.sizing}`,
        `- 存取模式：${result.databasePlan.accessMode}`,
        `- 備註：${result.databasePlan.note}`
      ]
    : ['- 無資料庫方案需求'];

  const serviceLines = result.serviceAccessMatrix.map(
    (service) => `- ${service.serviceName}｜${service.status}｜SKU ${service.sku}｜角色 ${service.roles.map((role) => role.name).join('、') || '無'}`
  );

  const permissionLines = result.permissions.map(
    (permission) => `- ${permission.name}｜${permission.scope}｜需求強度 ${permission.level}｜${permission.justification}`
  );

  const securityLines = result.securityControls.map((item) => `- ${item}`);
  const rationaleLines = result.rationale.map((item) => `- ${item.question} -> ${item.answer}`);

  return [
    '# Azure 服務與權限平台申請單',
    '',
    '## 專案摘要',
    ...profileLines,
    '',
    '## 資料庫方案',
    ...databaseLines,
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
    '## 判定依據',
    ...(rationaleLines.length ? rationaleLines : ['- 無'])
  ].join('\n');
};