import { describe, expect, it } from 'vitest';
import { buildReportMarkdown, evaluateSurvey } from './evaluator';

describe('evaluateSurvey', () => {
  it('根據資料庫方案與安全需求產出服務、角色與狀態', () => {
    const result = evaluateSurvey({
      projectType: 'web-app',
      region: 'east-asia',
      billingPriority: 'premium',
      dataSensitivity: 'restricted',
      databaseNeed: 'sql',
      databaseTier: 'sql-s2',
      databasePerformance: 'sql-vcore',
      databaseBackup: 'geo-redundant',
      queryStoreAccess: 'query-admin',
      blobUsage: ['report-export', 'rag-kb'],
      appServicePlan: 'p1v3',
      appServiceRuntime: 'dotnet',
      databaseAccess: 'schema-change',
      internetExposure: 'public',
      externalAccessControl: 'ip-whitelist',
      identityModel: 'hybrid',
      secretAccess: 'hybrid',
      governanceControls: ['azure-devops', 'arm-rbac', 'mfa'],
      generatorAccess: 'key-and-url',
      aiCapability: ['gen-ai', 'ocr'],
      opsNeeds: ['monitoring', 'security-audit'],
      scaleExpectation: 'mission-critical'
    });

    const serviceNames = result.services.map((service) => service.name);
    const roleNames = result.permissions.map((permission) => permission.name);

    expect(serviceNames).toContain('Azure App Service');
    expect(serviceNames).toContain('Application Gateway WAF');
    expect(serviceNames).toContain('Azure OpenAI Service');
    expect(roleNames).toContain('Network Contributor');
    expect(roleNames).toContain('db_datareader');
    expect(roleNames).toContain('db_datawriter');
    expect(roleNames).toContain('db_owner');
    expect(roleNames).toContain('Key Vault Secrets User');
    expect(roleNames).toContain('Azure DevOps Project Administrators');
    expect(roleNames).toContain('Conditional Access Administrator');
    expect(result.databasePlan?.sku).toBe('S2');
    expect(result.databasePlan?.performanceModel).toBe('Azure SQL vCore 模型');
    expect(result.databasePlan?.backupPolicy).toBe('異地備份 / Geo-Redundant');
    expect(result.appServiceConfig.plan).toBe('P1v3');
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
        applicantEmail: 'owner@example.com',
        owner: '王小明',
        launchDate: '2026-07-01',
        publicResourceScope: '內部文件入口',
        externalIps: '10.10.10.10'
      },
      result
    );

    expect(markdown).toContain('# Azure 服務與權限平台申請單');
    expect(markdown).toContain('知識平台');
    expect(markdown).toContain('PostgreSQL General Purpose');
    expect(markdown).toContain('效能模型：PostgreSQL vCore 模型');
    expect(markdown).toContain('備份策略：Point-in-Time Restore');
    expect(markdown).toContain('申請狀態');
    expect(markdown).toContain('安全控制');
    expect(markdown).toContain('技術參考');
    expect(result.referenceLinks.length).toBeGreaterThan(0);
  });
});