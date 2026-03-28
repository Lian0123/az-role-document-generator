import { describe, expect, it } from 'vitest';
import { buildReportMarkdown, evaluateSurvey } from './evaluator';

describe('evaluateSurvey', () => {
  it('根據資料庫方案與安全需求產出服務、角色與狀態', () => {
    const result = evaluateSurvey({
      projectType: 'web-app',
      dataSensitivity: 'restricted',
      databaseNeed: 'sql',
      databaseTier: 'sql-s2',
      databaseAccess: 'schema-change',
      internetExposure: 'public',
      identityModel: 'hybrid',
      secretAccess: 'hybrid',
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
    expect(roleNames).toContain('Key Vault Secrets User');
    expect(result.databasePlan?.sku).toBe('S2');
    expect(result.applicationStatus).toBe('待安全審核');
  });

  it('可輸出含資料庫方案與安全控制的申請報表', () => {
    const result = evaluateSurvey({
      projectType: 'internal-tool',
      dataSensitivity: 'internal',
      databaseNeed: 'postgres',
      databaseTier: 'postgres-gp',
      databaseAccess: 'not-applicable',
      internetExposure: 'private',
      identityModel: 'entra-id',
      secretAccess: 'runtime-read',
      aiCapability: ['none'],
      opsNeeds: ['backup'],
      scaleExpectation: 'standard'
    });

    const markdown = buildReportMarkdown(
      {
        projectName: '知識平台',
        department: '資訊處',
        owner: '王小明',
        launchDate: '2026-07-01'
      },
      result
    );

    expect(markdown).toContain('# Azure 服務與權限平台申請單');
    expect(markdown).toContain('知識平台');
    expect(markdown).toContain('PostgreSQL General Purpose');
    expect(markdown).toContain('申請狀態');
    expect(markdown).toContain('安全控制');
  });
});