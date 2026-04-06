import { describe, expect, it } from 'vitest';
import { buildReportMarkdown, evaluateSurvey } from './evaluator';

describe('evaluateSurvey', () => {
  it('根據資料庫方案與安全需求產出服務、角色與狀態', () => {
    const result = evaluateSurvey(
      {
        projectType: 'web-app',
        region: 'east-asia',
        billingPriority: 'premium',
        dataSensitivity: 'restricted',
        databaseNeed: ['sql', 'mongo'],
        databaseTier: ['sql-s2', 'mongo-m30'],
        databasePerformance: ['sql-vcore', 'mongo-vcore'],
        databaseBackup: 'geo-redundant',
        queryStoreAccess: 'query-admin',
        blobUsage: ['report-export', 'rag-kb'],
        computePlatform: 'app-service',
        appServiceWorkloads: ['web', 'server'],
        appServicePlan: 'p1v3',
        appServiceRuntime: 'dotnet',
        databaseAccess: 'schema-change',
        internetExposure: 'public',
        externalAccessControl: 'ip-whitelist',
        identityModel: 'hybrid',
        secretAccess: 'hybrid',
        serviceIamControls: ['system-assigned-mi', 'user-assigned-mi', 'least-privilege-rbac'],
        governanceControls: ['azure-devops', 'arm-rbac', 'mfa'],
        generatorAccess: 'key-and-url',
        aiCapability: ['gen-ai', 'ocr'],
        opsNeeds: ['monitoring', 'security-audit'],
        scaleExpectation: 'mission-critical'
      },
      {
        projectName: '多庫平台',
        appServiceDescription: 'web 提供外部入口，server 提供內部 API 與整合服務'
      }
    );

    const serviceNames = result.services.map((service) => service.name);
    const roleNames = result.permissions.map((permission) => permission.name);

    expect(serviceNames).toContain('Azure App Service');
    expect(serviceNames).toContain('Application Gateway WAF');
    expect(serviceNames).toContain('Azure OpenAI Service');
    expect(serviceNames).toContain('Azure Cosmos DB for MongoDB');
    expect(roleNames).toContain('Network Contributor');
    expect(roleNames).toContain('db_datareader');
    expect(roleNames).toContain('db_datawriter');
    expect(roleNames).toContain('db_owner');
    expect(roleNames).toContain('Cosmos DB Built-in Data Contributor');
    expect(roleNames).toContain('Key Vault Secrets User');
    expect(roleNames).toContain('Azure DevOps Project Administrators');
    expect(roleNames).toContain('Conditional Access Administrator');
    expect(roleNames).toContain('Managed Identity Operator');
    expect(result.databasePlan?.sku).toBe('S2');
    expect(result.databasePlans).toHaveLength(2);
    expect(result.databasePlan?.performanceModel).toBe('Azure SQL vCore 模型');
    expect(result.databasePlan?.backupPolicy).toBe('異地備份 / Geo-Redundant');
    expect(result.appServiceConfig.plan).toBe('P1v3');
    expect(result.appServiceWorkloadProfile.labels).toEqual(['Web 前台站台', 'Server / API 後端']);
    expect(result.serviceIamProfile.labels).toContain('啟用 System-assigned Managed Identity');
    expect(result.azureCliPlan.commandGroups.some((group) => group.title === 'Azure App Service')).toBe(true);
    expect(result.azureCliPlan.commandGroups.some((group) => group.title === '服務 IAM 控制')).toBe(true);
    expect(result.azureCliPlan.commandGroups.some((group) => group.title === 'Azure RBAC 指派')).toBe(true);
    expect(result.azureCliPlan.commandGroups.find((group) => group.title === '初始化與共用變數')?.commands.join('\n')).toContain('WEBAPP_WEB_NAME');
    expect(result.azureCliPlan.commandGroups.find((group) => group.title === '初始化與共用變數')?.commands.join('\n')).toContain('WEBAPP_SERVER_NAME');
    expect(result.costEstimate.high).toBeGreaterThan(result.costEstimate.low);
    expect(result.applicationStatus).toBe('待安全審核');
  });

  it('可輸出含資料庫方案與安全控制的申請報表', () => {
    const result = evaluateSurvey({
      projectType: 'internal-tool',
      region: 'southeast-asia',
      billingPriority: 'balanced',
      dataSensitivity: 'internal',
      databaseNeed: 'postgres',
      databaseTier: 'postgres-gp',
      databasePerformance: 'postgres-vcore',
      databaseBackup: 'pitr',
      queryStoreAccess: 'not-applicable',
      blobUsage: ['private-upload'],
      appServicePlan: 's1',
      appServiceRuntime: 'node',
      databaseAccess: 'not-applicable',
      internetExposure: 'private',
      externalAccessControl: 'private-only',
      identityModel: 'entra-id',
      secretAccess: 'runtime-read',
      serviceIamControls: ['system-assigned-mi'],
      governanceControls: ['mfa'],
      generatorAccess: 'url-only',
      aiCapability: ['none'],
      opsNeeds: ['backup'],
      scaleExpectation: 'standard'
    });

    const markdown = buildReportMarkdown(
      {
        projectName: '知識平台',
        department: '資訊處',
        applicantName: '李小華',
        employeeId: 'EMP-1024',
        applicantEmail: 'owner@example.com',
        launchDate: '2026-07-01',
        publicResourceScope: '內部文件入口',
        externalIps: '10.10.10.10',
        appServiceDescription: '提供文件入口與 API 整合服務'
      },
      result
    );

    expect(markdown).toContain('# Azure 服務與權限平台申請單');
    expect(markdown).toContain('知識平台');
    expect(markdown).toContain('EMP-1024');
    expect(markdown).toContain('PostgreSQL General Purpose');
    expect(markdown).toContain('效能模型：PostgreSQL vCore 模型');
    expect(markdown).toContain('備份策略：Point-in-Time Restore');
    expect(markdown).toContain('App Service 工作負載');
    expect(markdown).toContain('提供文件入口與 API 整合服務');
    expect(markdown).toContain('申請狀態');
    expect(markdown).toContain('服務 IAM 控制');
    expect(markdown).toContain('Azure CLI 建置指令');
    expect(markdown).toContain('az group create --name "$RG_NAME" --location "$LOCATION"');
    expect(markdown).toContain('安全控制');
    expect(markdown).toContain('技術參考');
    expect(result.referenceLinks.length).toBeGreaterThan(0);
  });

  it('可評估 Functions、MongoDB、Messaging、Redis 與 Auto Scale', () => {
    const result = evaluateSurvey({
      projectType: 'api-platform',
      region: 'taiwan',
      billingPriority: 'resilient',
      dataSensitivity: 'confidential',
      databaseNeed: 'mongo',
      databaseTier: 'mongo-m50',
      databasePerformance: 'mongo-vcore',
      databaseBackup: 'geo-redundant',
      queryStoreAccess: 'not-applicable',
      blobUsage: ['private-upload'],
      computePlatform: 'mixed',
      appServicePlan: 'p1v3',
      appServiceRuntime: 'node',
      functionPlan: 'premium',
      functionRuntime: 'python',
      messagingService: 'hybrid-messaging',
      cacheService: 'redis-premium',
      databaseAccess: 'not-applicable',
      internetExposure: 'hybrid',
      externalAccessControl: 'partner-vpn',
      apiManagementNeed: 'hybrid-api',
      identityModel: 'b2b',
      secretAccess: 'hybrid',
      serviceIamControls: ['system-assigned-mi', 'privileged-approval'],
      governanceControls: ['azure-devops', 'arm-rbac', 'mfa'],
      generatorAccess: 'key-and-url',
      aiCapability: ['agent'],
      opsNeeds: ['monitoring', 'api-observability'],
      autoscaleMode: 'serverless-burst',
      scaleExpectation: 'global-multi-region'
    });

    const serviceNames = result.services.map((service) => service.name);
    const roleNames = result.permissions.map((permission) => permission.name);

    expect(serviceNames).toContain('Azure Functions');
    expect(serviceNames).toContain('Azure Cosmos DB for MongoDB');
    expect(serviceNames).toContain('Azure Messaging Services');
    expect(serviceNames).toContain('Azure Cache for Redis');
    expect(serviceNames).toContain('Azure Monitor Autoscale');
    expect(roleNames).toContain('Cosmos DB Built-in Data Contributor');
    expect(roleNames).toContain('Azure Service Bus Data Owner');
    expect(roleNames).toContain('Redis Cache Contributor');
    expect(result.databasePlan?.engine).toBe('Azure Cosmos DB for MongoDB');
    expect(result.databasePlan?.sizing).toContain('16 GB RAM');
    expect(result.functionConfig.enabled).toBe(true);
    expect(result.functionConfig.plan).toBe('Premium');
    expect(result.autoscaleProfile.mode).toBe('依事件量自動擴展（Serverless）');
    expect(result.azureCliPlan.commandGroups.some((group) => group.title === 'Azure Functions')).toBe(true);
    expect(result.azureCliPlan.commandGroups.some((group) => group.title === 'Azure Messaging Services')).toBe(true);
    expect(result.costEstimate.high).toBeGreaterThan(result.costEstimate.low);
  });
});