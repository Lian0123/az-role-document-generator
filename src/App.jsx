import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Database,
  DollarSign,
  Download,
  ExternalLink,
  Eye,
  FileDown,
  Globe,
  Lock,
  Network,
  ShieldCheck,
  Shield,
  Sparkles,
  SquareChartGantt,
  Workflow,
  X
} from 'lucide-react';
import { defaultAnswers, questionnaire } from './data/questionnaire';
import { getUiMessages, localizeQuestion, supportedLocales, translateApplicationStatus, translatePriority, translateRisk } from './lib/i18n';
import { buildReportMarkdown, evaluateSurvey } from './lib/evaluator';

const iconMap = {
  '專案輪廓': Workflow,
  'Project Profile': Workflow,
  'プロジェクト概要': Workflow,
  '資料與合規': Lock,
  'Data and Compliance': Lock,
  'データとコンプライアンス': Lock,
  '應用與平台': Network,
  'Application and Platform': Network,
  'アプリケーションとプラットフォーム': Network,
  '安全與網路': Shield,
  'Security and Network': Shield,
  'セキュリティとネットワーク': Shield,
  '身份與權限': BadgeCheck,
  'Identity and Access': BadgeCheck,
  'ID と権限': BadgeCheck,
  'AI 能力': BrainCircuit,
  'AI Capability': BrainCircuit,
  'AI 機能': BrainCircuit,
  '維運與治理': SquareChartGantt,
  'Operations and Governance': SquareChartGantt,
  '運用とガバナンス': SquareChartGantt,
  '容量與可用性': Network
  , 'Scale and Availability': Network
  , '容量と可用性': Network
};

const initialProfile = {
  projectName: '新建 Azure 平台專案',
  department: '資訊處',
  applicantName: '',
  employeeId: '',
  applicantEmail: '',
  launchDate: '',
  publicResourceScope: '',
  externalIps: '',
  appServiceDescription: ''
};

const getSelectedValues = (value) => (Array.isArray(value) ? value : value ? [value] : []);

const getVisibleOptions = (question, answers) => {
  const selectedDatabases = getSelectedValues(answers.databaseNeed).filter((value) => value !== 'none');

  if (question.id === 'databaseTier') {
    if (!selectedDatabases.length) {
      return question.options.filter((option) => option.value === 'not-applicable');
    }

    return question.options.filter((option) => {
      if (option.value === 'not-applicable') {
        return true;
      }

      return (selectedDatabases.includes('sql') && option.value.startsWith('sql-'))
        || (selectedDatabases.includes('postgres') && option.value.startsWith('postgres-'))
        || (selectedDatabases.includes('mongo') && option.value.startsWith('mongo-'));
    });
  }

  if (question.id === 'databasePerformance') {
    if (!selectedDatabases.length) {
      return question.options.filter((option) => option.value === 'not-applicable');
    }

    return question.options.filter((option) => {
      if (option.value === 'not-applicable' || option.value === 'memory-optimized') {
        return true;
      }

      return (selectedDatabases.includes('sql') && ['sql-dtu', 'sql-vcore'].includes(option.value))
        || (selectedDatabases.includes('postgres') && option.value === 'postgres-vcore')
        || (selectedDatabases.includes('mongo') && ['mongo-ru', 'mongo-vcore'].includes(option.value));
    });
  }

  if (question.id === 'databaseBackup' && !selectedDatabases.length) {
    return question.options.filter((option) => option.value === 'not-applicable');
  }

  if (question.id === 'databaseAccess' && !selectedDatabases.includes('sql')) {
    return question.options.filter((option) => option.value === 'not-applicable');
  }

  if (question.id === 'queryStoreAccess' && !selectedDatabases.includes('sql')) {
    return question.options.filter((option) => option.value === 'not-applicable');
  }

  if (question.id === 'appServiceWorkloads') {
    return ['app-service', 'mixed'].includes(answers.computePlatform)
      ? question.options
      : question.options.filter((option) => option.value === 'none');
  }

  if (question.id === 'appServicePlan' || question.id === 'appServiceRuntime') {
    return ['app-service', 'mixed'].includes(answers.computePlatform)
      ? question.options
      : question.options.filter((option) => option.value === 'not-applicable');
  }

  if (question.id === 'functionPlan' || question.id === 'functionRuntime') {
    return ['function-app', 'mixed'].includes(answers.computePlatform)
      ? question.options
      : question.options.filter((option) => option.value === 'not-applicable');
  }

  if (question.id === 'autoscaleMode' && answers.computePlatform === 'undecided') {
    return question.options.filter((option) => option.value === 'manual-only' || option.value === 'not-applicable');
  }

  return question.options;
};

const getRegionDisplay = (questions, answers) => questions
  .find((question) => question.id === 'region')
  ?.options.find((option) => option.value === answers.region)?.label;

const getOptionDisplay = (questions, questionId, value) => questions
  .find((question) => question.id === questionId)
  ?.options.find((option) => option.value === value)?.label;

const getOptionLabels = (questions, questionId, values) => {
  const lookup = new Map((questions.find((question) => question.id === questionId)?.options ?? []).map((option) => [option.value, option.label]));
  return getSelectedValues(values).map((value) => lookup.get(value)).filter(Boolean);
};

const renderBoxIcon = (icon, x, y) => {
  switch (icon) {
    case 'users':
      return (
        <g>
          <circle cx={x + 14} cy={y + 12} r="7" fill="#ffffff" opacity="0.96" />
          <path d={`M ${x + 3} ${y + 28} Q ${x + 14} ${y + 18} ${x + 25} ${y + 28}`} fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case 'shield':
      return <path d={`M ${x + 14} ${y + 2} L ${x + 27} ${y + 7} L ${x + 24} ${y + 23} L ${x + 14} ${y + 30} L ${x + 4} ${y + 23} L ${x + 1} ${y + 7} Z`} fill="none" stroke="#ffffff" strokeWidth="3" strokeLinejoin="round" />;
    case 'api':
      return (
        <g>
          <circle cx={x + 6} cy={y + 16} r="4" fill="#ffffff" />
          <circle cx={x + 22} cy={y + 7} r="4" fill="#ffffff" />
          <circle cx={x + 22} cy={y + 25} r="4" fill="#ffffff" />
          <path d={`M ${x + 10} ${y + 16} L ${x + 18} ${y + 8} M ${x + 10} ${y + 16} L ${x + 18} ${y + 24}`} stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case 'app':
      return (
        <g>
          <rect x={x + 2} y={y + 4} width="24" height="20" rx="4" fill="none" stroke="#ffffff" strokeWidth="3" />
          <path d={`M ${x + 2} ${y + 11} H ${x + 26}`} stroke="#ffffff" strokeWidth="3" />
        </g>
      );
    case 'identity':
      return (
        <g>
          <circle cx={x + 14} cy={y + 10} r="6" fill="none" stroke="#ffffff" strokeWidth="3" />
          <path d={`M ${x + 5} ${y + 28} Q ${x + 14} ${y + 18} ${x + 23} ${y + 28}`} fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case 'key':
      return (
        <g>
          <circle cx={x + 10} cy={y + 14} r="6" fill="none" stroke="#ffffff" strokeWidth="3" />
          <path d={`M ${x + 16} ${y + 14} H ${x + 28} M ${x + 23} ${y + 14} V ${y + 19} M ${x + 27} ${y + 14} V ${y + 18}`} stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case 'network':
      return (
        <g>
          <circle cx={x + 6} cy={y + 16} r="4" fill="#ffffff" />
          <circle cx={x + 22} cy={y + 6} r="4" fill="#ffffff" />
          <circle cx={x + 22} cy={y + 26} r="4" fill="#ffffff" />
          <path d={`M ${x + 10} ${y + 16} L ${x + 18} ${y + 8} M ${x + 10} ${y + 16} L ${x + 18} ${y + 24}`} stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case 'database':
      return (
        <g>
          <ellipse cx={x + 14} cy={y + 6} rx="11" ry="4" fill="none" stroke="#ffffff" strokeWidth="3" />
          <path d={`M ${x + 3} ${y + 6} V ${y + 24} C ${x + 3} ${y + 29} ${x + 25} ${y + 29} ${x + 25} ${y + 24} V ${y + 6}`} fill="none" stroke="#ffffff" strokeWidth="3" />
          <path d={`M ${x + 3} ${y + 15} C ${x + 3} ${y + 20} ${x + 25} ${y + 20} ${x + 25} ${y + 15}`} fill="none" stroke="#ffffff" strokeWidth="3" />
        </g>
      );
    case 'storage':
      return (
        <g>
          <rect x={x + 3} y={y + 7} width="22" height="18" rx="6" fill="none" stroke="#ffffff" strokeWidth="3" />
          <path d={`M ${x + 3} ${y + 15} H ${x + 25}`} stroke="#ffffff" strokeWidth="3" />
        </g>
      );
    case 'ai':
      return (
        <g>
          <path d={`M ${x + 14} ${y + 2} L ${x + 17} ${y + 11} L ${x + 26} ${y + 14} L ${x + 17} ${y + 17} L ${x + 14} ${y + 26} L ${x + 11} ${y + 17} L ${x + 2} ${y + 14} L ${x + 11} ${y + 11} Z`} fill="none" stroke="#ffffff" strokeWidth="3" strokeLinejoin="round" />
        </g>
      );
    case 'ops':
      return (
        <g>
          <rect x={x + 2} y={y + 6} width="10" height="10" rx="2" fill="none" stroke="#ffffff" strokeWidth="3" />
          <rect x={x + 18} y={y + 14} width="10" height="10" rx="2" fill="none" stroke="#ffffff" strokeWidth="3" />
          <path d={`M ${x + 12} ${y + 11} L ${x + 18} ${y + 19}`} stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case 'monitor':
      return (
        <g>
          <rect x={x + 2} y={y + 5} width="24" height="16" rx="3" fill="none" stroke="#ffffff" strokeWidth="3" />
          <path d={`M ${x + 7} ${y + 25} H ${x + 21} M ${x + 14} ${y + 21} V ${y + 25}`} stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case 'queue':
      return (
        <g>
          <rect x={x + 2} y={y + 6} width="24" height="18" rx="4" fill="none" stroke="#ffffff" strokeWidth="3" />
          <path d={`M ${x + 8} ${y + 12} H ${x + 20} M ${x + 8} ${y + 18} H ${x + 18}`} stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case 'cache':
      return (
        <g>
          <path d={`M ${x + 4} ${y + 10} H ${x + 24} V ${y + 22} H ${x + 4} Z`} fill="none" stroke="#ffffff" strokeWidth="3" />
          <path d={`M ${x + 8} ${y + 6} V ${y + 10} M ${x + 14} ${y + 6} V ${y + 10} M ${x + 20} ${y + 6} V ${y + 10} M ${x + 8} ${y + 22} V ${y + 26} M ${x + 14} ${y + 22} V ${y + 26} M ${x + 20} ${y + 22} V ${y + 26}`} stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    default:
      return null;
  }
};

function ArchitectureSvg({ result, regionLabel, externalAccessLabel }) {
  const services = new Set(result.services.map((service) => service.id));
  const usesFunctionsOnly = result.functionConfig.enabled && result.appServiceConfig.plan === '未指定 / 不使用 App Service';
  const usesMixedCompute = result.functionConfig.enabled && result.appServiceConfig.plan !== '未指定 / 不使用 App Service';
  const computeTitle = usesFunctionsOnly ? 'Azure Functions' : usesMixedCompute ? 'App Service + Functions' : 'Azure App Service';
  const computeSubtitle = usesFunctionsOnly
    ? `${result.functionConfig.plan} / ${result.functionConfig.runtime}`
    : usesMixedCompute
      ? `${result.appServiceConfig.plan} + ${result.functionConfig.plan}`
      : `${result.appServiceConfig.plan} / ${result.appServiceConfig.runtime}`;
  const databaseSummary = result.databasePlans.length
    ? result.databasePlans.map((plan) => plan.engine.replace('Azure ', '')).join(' + ')
    : (result.databasePlan?.engine || 'Data Layer');
  const databaseSkuSummary = result.databasePlans.length
    ? result.databasePlans.map((plan) => plan.sku).join(' / ')
    : (result.databasePlan?.sku || 'Not Applicable');
  const appWorkloadSummary = result.appServiceWorkloadProfile.labels.length
    ? result.appServiceWorkloadProfile.labels.join(' / ')
    : computeSubtitle;

  const boxes = [
    { id: 'users', x: 24, y: 46, width: 150, height: 64, title: 'Users / Partner', subtitle: 'Internet / VPN', color: '#0f4c81', icon: 'users' },
    { id: 'edge', x: 212, y: 46, width: 170, height: 64, title: services.has('waf') ? 'WAF / Front Door' : 'Ingress Control', subtitle: regionLabel, color: '#1479c9', icon: 'shield' },
    { id: 'apim', x: 420, y: 46, width: 170, height: 64, title: services.has('apiManagement') ? 'Azure API Management' : 'API Access Layer', subtitle: services.has('apiManagement') ? 'Policy / Product / Subscription' : 'Direct App Access', color: '#008272', icon: 'api' },
    { id: 'app', x: 628, y: 46, width: 180, height: 64, title: computeTitle, subtitle: appWorkloadSummary, color: '#0b6bc7', icon: 'app' },
    { id: 'identity', x: 24, y: 170, width: 170, height: 64, title: 'Entra ID / MFA', subtitle: services.has('mfa') ? 'Conditional Access Enabled' : 'Identity Control', color: '#5c2d91', icon: 'identity' },
    { id: 'kv', x: 232, y: 170, width: 170, height: 64, title: 'Key Vault', subtitle: result.generatorProfile.mode, color: '#ca5010', icon: 'key' },
    { id: 'vnet', x: 440, y: 170, width: 170, height: 64, title: services.has('vnet') ? 'VNet / Private Endpoint' : 'Network Control', subtitle: externalAccessLabel || 'Network Policy', color: '#486991', icon: 'network' },
    { id: 'sql', x: 648, y: 170, width: 180, height: 64, title: databaseSummary, subtitle: databaseSkuSummary, color: '#0063b1', icon: 'database' },
    { id: 'blob', x: 856, y: 170, width: 170, height: 64, title: services.has('storage') ? 'Blob Storage' : 'Storage Optional', subtitle: services.has('storage') ? 'Document / Media / Export' : 'No Blob Selected', color: '#2d7d9a', icon: 'storage' },
    { id: 'ai', x: 856, y: 46, width: 170, height: 64, title: services.has('openAi') ? 'Azure OpenAI / AI Search' : 'AI Layer', subtitle: services.has('openAi') ? 'RAG / Generator' : 'No AI Required', color: '#7fba00', icon: 'ai' },
    { id: 'msg', x: 24, y: 294, width: 170, height: 64, title: services.has('messaging') ? 'Messaging Services' : 'Messaging Optional', subtitle: services.has('messaging') ? 'Queue / Topic / Event' : 'No Queue Selected', color: '#7a4f01', icon: 'queue' },
    { id: 'cache', x: 232, y: 294, width: 150, height: 64, title: services.has('redis') ? 'Azure Cache for Redis' : 'Cache Optional', subtitle: services.has('redis') ? 'Session / Hot Data' : 'No Cache Selected', color: '#c23934', icon: 'cache' },
    { id: 'ops', x: 420, y: 294, width: 190, height: 64, title: 'Azure DevOps / ARM', subtitle: services.has('azureDevOps') || services.has('azureResourceManager') ? 'Pipeline / IaC / RBAC' : 'Governance Ready', color: '#8764b8', icon: 'ops' },
    { id: 'monitor', x: 648, y: 294, width: 180, height: 64, title: services.has('logAnalytics') ? 'App Insights + Log Analytics' : 'Monitoring Layer', subtitle: `${result.costEstimate.currency} ${result.costEstimate.low}-${result.costEstimate.high} / month`, color: '#004578', icon: 'monitor' }
  ];

  const connectors = [
    ['users', 'edge'],
    ['edge', 'apim'],
    ['apim', 'app'],
    ['identity', 'app'],
    ['kv', 'app'],
    ['app', 'sql'],
    ['app', 'blob'],
    ['app', 'ai'],
    ['app', 'msg'],
    ['app', 'cache'],
    ['vnet', 'app'],
    ['ops', 'app'],
    ['app', 'monitor']
  ];

  const boxMap = Object.fromEntries(boxes.map((box) => [box.id, box]));

  return (
    <svg viewBox="0 0 1050 390" className="azure-architecture-svg" role="img" aria-label="Azure architecture diagram preview">
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <path d="M0,0 L10,3 L0,6 Z" fill="#2f5d8a" />
        </marker>
      </defs>
      {connectors.map(([fromId, toId]) => {
        const from = boxMap[fromId];
        const to = boxMap[toId];

        return (
          <line
            key={`${fromId}-${toId}`}
            x1={from.x + from.width}
            y1={from.y + from.height / 2}
            x2={to.x}
            y2={to.y + to.height / 2}
            stroke="#2f5d8a"
            strokeWidth="3"
            markerEnd="url(#arrow)"
            opacity="0.75"
          />
        );
      })}
      {boxes.map((box) => (
        <g key={box.id}>
          <rect x={box.x} y={box.y} width={box.width} height={box.height} rx="18" fill={box.color} opacity="0.96" />
          <rect x={box.x + 2} y={box.y + 2} width={box.width - 4} height={box.height - 4} rx="16" fill="none" stroke="rgba(255,255,255,0.25)" />
          {renderBoxIcon(box.icon, box.x + 10, box.y + 14)}
          <text x={box.x + 48} y={box.y + 26} fill="#ffffff" fontSize="14" fontWeight="700">{box.title}</text>
          <text x={box.x + 48} y={box.y + 46} fill="rgba(255,255,255,0.9)" fontSize="11">{box.subtitle}</text>
        </g>
      ))}
    </svg>
  );
}

function PrintableReport({ profile, result, ui, regionDisplay, externalAccessDisplay, applicationStatusDisplay }) {
  return (
    <div className="print-report-surface">
      <header className="print-report-header">
        <span className="eyebrow">Azure Intake Studio</span>
        <h1>{ui.heroTitle}</h1>
        <p>供平台治理、資源申請、權限審核與交付對焦使用。</p>
      </header>

      <section className="print-section">
        <h2>{ui.projectSummary}</h2>
        <div className="print-grid two-col">
          <div><strong>{ui.projectName}</strong><span>{profile.projectName || ui.notSpecified}</span></div>
          <div><strong>{ui.department}</strong><span>{profile.department || ui.notSpecified}</span></div>
          <div><strong>{ui.applicantName}</strong><span>{profile.applicantName || ui.notSpecified}</span></div>
          <div><strong>{ui.employeeId}</strong><span>{profile.employeeId || ui.notSpecified}</span></div>
          <div><strong>{ui.applicantEmail}</strong><span>{profile.applicantEmail || ui.notSpecified}</span></div>
          <div><strong>{ui.launchDate}</strong><span>{profile.launchDate || ui.notSpecified}</span></div>
          <div><strong>{ui.cloudRegion}</strong><span>{regionDisplay || result.regionLabel}</span></div>
          <div><strong>{ui.applicationStatus}</strong><span>{applicationStatusDisplay}</span></div>
          <div><strong>App Service 工作負載</strong><span>{result.appServiceWorkloadProfile.labels.join('、') || ui.notSpecified}</span></div>
          <div><strong>{ui.appServiceDescription}</strong><span>{profile.appServiceDescription || ui.notSpecified}</span></div>
        </div>
      </section>

      <section className="print-section">
        <h2>{ui.databasePlan}</h2>
        <div className="print-grid">
          {result.databasePlans.length ? result.databasePlans.map((plan) => (
            <div key={plan.id}>
              <strong>{plan.label}</strong>
              <span>{`${plan.engine} / ${plan.sku} / ${plan.performanceModel}`}</span>
            </div>
          )) : (
            <div>
              <strong>{ui.noDatabase}</strong>
              <span>{ui.noDatabaseNote}</span>
            </div>
          )}
        </div>
      </section>

      <section className="print-section">
        <h2>{ui.architecturePreview}</h2>
        <ArchitectureSvg result={result} regionLabel={regionDisplay || result.regionLabel} externalAccessLabel={externalAccessDisplay} />
      </section>

      <section className="print-section">
        <h2>服務與權限矩陣</h2>
        <table className="print-table">
          <thead>
            <tr>
              <th>服務</th>
              <th>狀態</th>
              <th>SKU</th>
              <th>角色</th>
            </tr>
          </thead>
          <tbody>
            {result.serviceAccessMatrix.map((service) => (
              <tr key={service.id}>
                <td>{service.serviceName}</td>
                <td>{service.status}</td>
                <td>{service.sku}</td>
                <td>{service.roles.map((role) => role.name).join('、') || '無'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="print-section">
        <h2>角色權限</h2>
        <table className="print-table">
          <thead>
            <tr>
              <th>角色</th>
              <th>Scope</th>
              <th>強度</th>
              <th>說明</th>
            </tr>
          </thead>
          <tbody>
            {result.permissions.map((permission) => (
              <tr key={permission.id}>
                <td>{permission.name}</td>
                <td>{permission.scope}</td>
                <td>{permission.level}</td>
                <td>{permission.justification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="print-section">
        <h2>{ui.serviceIamControls}</h2>
        <div className="print-grid">
          {(result.serviceIamProfile.labels.length ? result.serviceIamProfile.labels : [ui.notSpecified]).map((label, index) => (
            <div key={`${label}-${index}`}>
              <strong>{label}</strong>
              <span>{result.serviceIamProfile.guidance[index] || ui.notSpecified}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="print-section">
        <h2>{ui.azureCliCommands}</h2>
        <div className="print-cli-list">
          {result.azureCliPlan.commandGroups.map((group) => (
            <article key={group.title} className="print-cli-card">
              <strong>{group.title}</strong>
              <pre>{group.commands.join('\n')}</pre>
              {group.notes?.length ? (
                <ul>
                  {group.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="print-section">
        <h2>{ui.cliManualNotes}</h2>
        <ul className="print-bullet-list">
          {result.azureCliPlan.manualSteps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function App() {
  const [projectProfile, setProjectProfile] = useState(initialProfile);
  const [answers, setAnswers] = useState(defaultAnswers);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [locale, setLocale] = useState('zh-TW');
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const printableRef = useRef(null);
  const ui = useMemo(() => getUiMessages(locale), [locale]);
  const localizedQuestions = useMemo(() => questionnaire.map((question) => localizeQuestion(question, locale)), [locale]);
  const groupedQuestions = useMemo(() => localizedQuestions.reduce((accumulator, question) => {
    if (!accumulator[question.section]) {
      accumulator[question.section] = [];
    }

    accumulator[question.section].push(question);
    return accumulator;
  }, {}), [localizedQuestions]);

  const result = useMemo(() => evaluateSurvey(answers, projectProfile), [answers, projectProfile]);
  const regionDisplay = useMemo(() => getRegionDisplay(localizedQuestions, answers) ?? result.regionLabel, [localizedQuestions, answers, result.regionLabel]);
  const externalAccessDisplay = useMemo(() => getOptionDisplay(localizedQuestions, 'externalAccessControl', answers.externalAccessControl), [localizedQuestions, answers.externalAccessControl]);
  const appServiceWorkloadLabels = useMemo(() => getOptionLabels(localizedQuestions, 'appServiceWorkloads', answers.appServiceWorkloads), [localizedQuestions, answers.appServiceWorkloads]);
  const applicationStatusDisplay = useMemo(() => translateApplicationStatus(result.applicationStatus, locale), [result.applicationStatus, locale]);
  const summaryItems = useMemo(() => {
    const items = [
      projectProfile.projectName ? `${ui.projectName}: ${projectProfile.projectName}` : null,
      projectProfile.department ? `${ui.department}: ${projectProfile.department}` : null,
      projectProfile.employeeId ? `${ui.employeeId}: ${projectProfile.employeeId}` : null,
      `${ui.applicationStatus}: ${applicationStatusDisplay}`,
      `${ui.readiness}: ${result.readiness}%`,
      `${ui.cloudRegion}: ${regionDisplay}`,
      appServiceWorkloadLabels.length ? `App Service: ${appServiceWorkloadLabels.join('、')}` : null,
      `${ui.monthlyEstimate}: ${result.costEstimate.currency} ${result.costEstimate.low}-${result.costEstimate.high} ${ui.perMonth}`
    ];

    return items.filter(Boolean);
  }, [projectProfile, result, regionDisplay, ui, applicationStatusDisplay, appServiceWorkloadLabels]);

  const answeredCount = questionnaire.filter((question) => {
    const value = answers[question.id];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  }).length;

  const progress = Math.round((answeredCount / questionnaire.length) * 100);

  useEffect(() => {
    document.documentElement.lang = locale === 'zh-TW' ? 'zh-Hant' : locale;
    document.title = ui.seoTitle;

    const descriptionMeta = document.querySelector('meta[name="description"]');
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
    const twitterDescriptionMeta = document.querySelector('meta[name="twitter:description"]');

    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', ui.seoDescription);
    }

    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', ui.seoTitle);
    }

    if (ogDescriptionMeta) {
      ogDescriptionMeta.setAttribute('content', ui.seoDescription);
    }

    if (twitterTitleMeta) {
      twitterTitleMeta.setAttribute('content', ui.seoTitle);
    }

    if (twitterDescriptionMeta) {
      twitterDescriptionMeta.setAttribute('content', ui.seoDescription);
    }
  }, [locale, ui]);

  useEffect(() => {
    const onBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    const onInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    setIsInstalled(window.matchMedia('(display-mode: standalone)').matches);
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const handleProfileChange = (field, value) => {
    setProjectProfile((current) => ({
      ...current,
      [field]: value
    }));
  };

  const handleSingleAnswer = (questionId, optionValue) => {
    setAnswers((current) => {
      if (questionId === 'computePlatform') {
        if (optionValue === 'app-service') {
          return {
            ...current,
            computePlatform: optionValue,
            appServiceWorkloads: current.appServiceWorkloads?.includes('none') ? [] : current.appServiceWorkloads,
            appServicePlan: current.appServicePlan === 'not-applicable' ? '' : current.appServicePlan,
            appServiceRuntime: current.appServiceRuntime === 'not-applicable' ? '' : current.appServiceRuntime,
            functionPlan: 'not-applicable',
            functionRuntime: 'not-applicable'
          };
        }

        if (optionValue === 'function-app') {
          return {
            ...current,
            computePlatform: optionValue,
            appServiceWorkloads: ['none'],
            appServicePlan: 'not-applicable',
            appServiceRuntime: 'not-applicable',
            functionPlan: current.functionPlan === 'not-applicable' ? '' : current.functionPlan,
            functionRuntime: current.functionRuntime === 'not-applicable' ? '' : current.functionRuntime
          };
        }

        if (optionValue === 'mixed') {
          return {
            ...current,
            computePlatform: optionValue,
            appServiceWorkloads: current.appServiceWorkloads?.includes('none') ? [] : current.appServiceWorkloads,
            appServicePlan: current.appServicePlan === 'not-applicable' ? '' : current.appServicePlan,
            appServiceRuntime: current.appServiceRuntime === 'not-applicable' ? '' : current.appServiceRuntime,
            functionPlan: current.functionPlan === 'not-applicable' ? '' : current.functionPlan,
            functionRuntime: current.functionRuntime === 'not-applicable' ? '' : current.functionRuntime
          };
        }

        return {
          ...current,
          computePlatform: optionValue,
          appServiceWorkloads: ['none'],
          appServicePlan: 'not-applicable',
          appServiceRuntime: 'not-applicable',
          functionPlan: 'not-applicable',
          functionRuntime: 'not-applicable',
          autoscaleMode: current.autoscaleMode || 'not-applicable'
        };
      }

      return {
        ...current,
        [questionId]: optionValue
      };
    });
  };

  const handleMultiAnswer = (questionId, optionValue) => {
    setAnswers((current) => {
      const existingValues = getSelectedValues(current[questionId]);

      if (questionId === 'databaseNeed') {
        const nextValues = optionValue === 'none'
          ? ['none']
          : existingValues.includes(optionValue)
            ? existingValues.filter((value) => value !== optionValue && value !== 'none')
            : [...existingValues.filter((value) => value !== 'none'), optionValue];
        const selectedDatabases = nextValues.filter((value) => value !== 'none');
        const filterTierValues = getSelectedValues(current.databaseTier).filter((value) => value !== 'not-applicable').filter((value) => {
          return (selectedDatabases.includes('sql') && value.startsWith('sql-'))
            || (selectedDatabases.includes('postgres') && value.startsWith('postgres-'))
            || (selectedDatabases.includes('mongo') && value.startsWith('mongo-'));
        });
        const filterPerformanceValues = getSelectedValues(current.databasePerformance).filter((value) => value !== 'not-applicable').filter((value) => {
          return value === 'memory-optimized'
            || (selectedDatabases.includes('sql') && ['sql-dtu', 'sql-vcore'].includes(value))
            || (selectedDatabases.includes('postgres') && value === 'postgres-vcore')
            || (selectedDatabases.includes('mongo') && ['mongo-ru', 'mongo-vcore'].includes(value));
        });

        return {
          ...current,
          databaseNeed: nextValues.length ? nextValues : ['none'],
          databaseTier: selectedDatabases.length ? filterTierValues : ['not-applicable'],
          databasePerformance: selectedDatabases.length ? filterPerformanceValues : ['not-applicable'],
          databaseBackup: selectedDatabases.length ? (current.databaseBackup === 'not-applicable' ? '' : current.databaseBackup) : 'not-applicable',
          databaseAccess: selectedDatabases.includes('sql') ? (current.databaseAccess === 'not-applicable' ? '' : current.databaseAccess) : 'not-applicable',
          queryStoreAccess: selectedDatabases.includes('sql') ? (current.queryStoreAccess === 'not-applicable' ? '' : current.queryStoreAccess) : 'not-applicable'
        };
      }

      if (questionId === 'databaseTier') {
        if (optionValue === 'not-applicable') {
          return {
            ...current,
            databaseTier: ['not-applicable']
          };
        }

        const family = optionValue.startsWith('sql-') ? 'sql-' : optionValue.startsWith('postgres-') ? 'postgres-' : 'mongo-';
        const nextValues = existingValues.includes(optionValue)
          ? existingValues.filter((value) => value !== optionValue)
          : [...existingValues.filter((value) => value !== 'not-applicable' && !value.startsWith(family)), optionValue];

        return {
          ...current,
          databaseTier: nextValues.length ? nextValues : []
        };
      }

      if (questionId === 'databasePerformance') {
        if (optionValue === 'not-applicable') {
          return {
            ...current,
            databasePerformance: ['not-applicable']
          };
        }

        const family = optionValue === 'memory-optimized'
          ? 'memory-optimized'
          : optionValue.startsWith('sql-')
            ? 'sql'
            : optionValue.startsWith('postgres-')
              ? 'postgres'
              : 'mongo';
        const nextValues = existingValues.includes(optionValue)
          ? existingValues.filter((value) => value !== optionValue)
          : [
              ...existingValues.filter((value) => {
                if (value === 'not-applicable') {
                  return false;
                }

                if (family === 'memory-optimized') {
                  return value !== 'memory-optimized';
                }

                return !value.startsWith(`${family}-`);
              }),
              optionValue
            ];

        return {
          ...current,
          databasePerformance: nextValues.length ? nextValues : []
        };
      }

      const nextValues = optionValue === 'none' && !existingValues.includes('none')
        ? ['none']
        : existingValues.includes(optionValue)
          ? existingValues.filter((value) => value !== optionValue)
          : [...existingValues.filter((value) => value !== 'none'), optionValue];

      return {
        ...current,
        [questionId]: nextValues.length ? nextValues : questionId === 'appServiceWorkloads' ? ['none'] : []
      };
    });
  };

  const exportMarkdown = () => {
    const content = buildReportMarkdown(projectProfile, result);
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${projectProfile.projectName || 'azure-request'}-application.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = async () => {
    if (!printableRef.current) {
      return;
    }

    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf')
    ]);

    const canvas = await html2canvas(printableRef.current, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true
    });
    const imageData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 10;
    const imageWidth = pageWidth - margin * 2;
    const imageHeight = (canvas.height * imageWidth) / canvas.width;
    let remainingHeight = imageHeight;
    let position = margin;

    pdf.addImage(imageData, 'PNG', margin, position, imageWidth, imageHeight, undefined, 'FAST');
    remainingHeight -= pageHeight - margin * 2;

    while (remainingHeight > 0) {
      pdf.addPage();
      position = margin - (imageHeight - remainingHeight);
      pdf.addImage(imageData, 'PNG', margin, position, imageWidth, imageHeight, undefined, 'FAST');
      remainingHeight -= pageHeight - margin * 2;
    }

    pdf.save(`${projectProfile.projectName || 'azure-request'}-application.pdf`);
  };

  const installApplication = async () => {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <div className="print-report-shell" aria-hidden="true">
        <div ref={printableRef}>
          <PrintableReport profile={projectProfile} result={result} ui={ui} regionDisplay={regionDisplay} externalAccessDisplay={externalAccessDisplay} applicationStatusDisplay={applicationStatusDisplay} />
        </div>
      </div>

      <header className="hero">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">{ui.brand}</span>
          <h1>{ui.heroTitle}</h1>
          <p>{ui.heroDescription}</p>

          <div className="hero-highlights">
            <article>
              <strong>Enterprise Intake</strong>
              <span>整合資源申請、RBAC、成本與治理輸出</span>
            </article>
            <article>
              <strong>Review Ready</strong>
              <span>可直接產出 Markdown、PDF 與架構預覽</span>
            </article>
            <article>
              <strong>Secure Delivery</strong>
              <span>支援 PWA、離線快取、多語系與 RWD</span>
            </article>
          </div>

          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={exportMarkdown}>
              <Download size={18} />
              {ui.downloadMarkdown}
            </button>
            <button type="button" className="ghost-button" onClick={exportPdf}>
              <FileDown size={18} />
              {ui.downloadPdf}
            </button>
            <button type="button" className="ghost-button" onClick={() => setIsArchitectureOpen(true)}>
              <Eye size={18} />
              {ui.previewDiagram}
            </button>
            {installPrompt && !isInstalled ? (
              <button type="button" className="ghost-button install-button" onClick={installApplication}>
                <FileDown size={18} />
                {ui.installApp}
              </button>
            ) : null}
            <label className="locale-switcher">
              <span>{ui.language}</span>
              <select value={locale} onChange={(event) => setLocale(event.target.value)}>
                {supportedLocales.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </label>
            {installPrompt && !isInstalled ? (
              <div className="status-pill install-pill">
                <Sparkles size={16} />
                {ui.installReady}
              </div>
            ) : null}
            <div className="status-pill">
              <Sparkles size={16} />
              {ui.completion} {progress}%
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-panel"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <div className="hero-panel-top">
            <span>{ui.decisionSummary}</span>
            <strong>{applicationStatusDisplay}</strong>
          </div>
          <div className="metric-grid">
            <article>
              <span>{ui.recommendedServices}</span>
              <strong>{result.services.length}</strong>
            </article>
            <article>
              <span>{ui.recommendedPermissions}</span>
              <strong>{result.permissions.length}</strong>
            </article>
            <article>
              <span>{ui.readiness}</span>
              <strong>{result.readiness}%</strong>
            </article>
            <article>
              <span>{ui.databaseSku}</span>
              <strong>{result.databaseSummarySku}</strong>
            </article>
            <article>
              <span>{ui.monthlyEstimate}</span>
              <strong>{`${result.costEstimate.currency} ${result.costEstimate.low}`}</strong>
            </article>
          </div>
          <ul className="summary-list">
            {summaryItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.div>
      </header>

      <main className="content-grid">
        <section className="panel form-panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{ui.projectIntake}</span>
              <h2>{ui.basicInfo}</h2>
            </div>
            <span className="section-tag">Build Azure Plan</span>
          </div>

          <section className="intake-banner">
            <div>
              <strong>Enterprise Request Context</strong>
              <span>請完整填寫專案識別、申請人與員工資訊，讓後續權限審核與資源交付可直接引用。</span>
            </div>
            <div className="intake-banner-chip">Azure RBAC Intake</div>
          </section>

          <div className="profile-grid">
            <label>
              <span>{ui.projectName}</span>
              <input value={projectProfile.projectName} onChange={(event) => handleProfileChange('projectName', event.target.value)} placeholder={ui.draftProjectName} />
            </label>
            <label>
              <span>{ui.department}</span>
              <input value={projectProfile.department} onChange={(event) => handleProfileChange('department', event.target.value)} placeholder={ui.draftDepartment} />
            </label>
            <label>
              <span>{ui.applicantName}</span>
              <input value={projectProfile.applicantName} onChange={(event) => handleProfileChange('applicantName', event.target.value)} placeholder={ui.draftApplicant} />
            </label>
            <label>
              <span>{ui.employeeId}</span>
              <input value={projectProfile.employeeId} onChange={(event) => handleProfileChange('employeeId', event.target.value)} placeholder={ui.draftEmployeeId} />
            </label>
            <label>
              <span>{ui.applicantEmail}</span>
              <input type="email" value={projectProfile.applicantEmail} onChange={(event) => handleProfileChange('applicantEmail', event.target.value)} placeholder={ui.draftEmail} />
            </label>
            <label>
              <span>{ui.launchDate}</span>
              <input type="date" value={projectProfile.launchDate} onChange={(event) => handleProfileChange('launchDate', event.target.value)} />
            </label>
            <label className="full-span">
              <span>{ui.publicResources}</span>
              <textarea value={projectProfile.publicResourceScope} onChange={(event) => handleProfileChange('publicResourceScope', event.target.value)} placeholder={ui.draftResources} />
            </label>
            <label className="full-span">
              <span>{ui.externalIps}</span>
              <textarea value={projectProfile.externalIps} onChange={(event) => handleProfileChange('externalIps', event.target.value)} placeholder={ui.draftIps} />
            </label>
            {['app-service', 'mixed'].includes(answers.computePlatform) ? (
              <label className="full-span">
                <span>{ui.appServiceDescription}</span>
                <textarea value={projectProfile.appServiceDescription} onChange={(event) => handleProfileChange('appServiceDescription', event.target.value)} placeholder={ui.draftAppServiceDescription} />
              </label>
            ) : null}
          </div>

          {Object.entries(groupedQuestions).map(([section, questions]) => {
            const Icon = iconMap[section] ?? Workflow;

            return (
              <section key={section} className="question-section">
                <div className="question-section-header">
                  <div className="section-icon">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3>{section}</h3>
                    <p>{ui.questionHint}</p>
                  </div>
                </div>

                <div className="question-list">
                  {questions.map((question) => (
                    <article key={question.id} className="question-card">
                      <div className="question-title-row">
                        <h4>{question.title}</h4>
                        <span>{question.type === 'multi' ? ui.multi : ui.single}</span>
                      </div>

                      {question.references?.length ? (
                        <div className="reference-link-list">
                          {question.references.map((reference) => (
                            <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer" className="reference-link">
                              <ExternalLink size={14} />
                              {reference.title}
                            </a>
                          ))}
                        </div>
                      ) : null}

                      <div className="option-grid">
                        {getVisibleOptions(question, answers).map((option) => {
                          const checked = question.type === 'multi'
                            ? (answers[question.id] ?? []).includes(option.value)
                            : answers[question.id] === option.value;

                          return (
                            <label key={option.value} className={checked ? 'option-card active' : 'option-card'}>
                              <input
                                type={question.type === 'multi' ? 'checkbox' : 'radio'}
                                name={question.id}
                                checked={checked}
                                onChange={() => {
                                  if (question.type === 'multi') {
                                    handleMultiAnswer(question.id, option.value);
                                    return;
                                  }

                                  handleSingleAnswer(question.id, option.value);
                                }}
                              />
                              <div>
                                <strong>{option.label}</strong>
                                {option.description ? <p>{option.description}</p> : null}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </section>

        <aside className="panel result-panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Generated Report</span>
              <h2>{ui.reportTitle}</h2>
            </div>
            <div className="header-actions">
              <button type="button" className="ghost-button" onClick={exportMarkdown}>
                <Download size={16} />
                MD
              </button>
              <button type="button" className="ghost-button" onClick={exportPdf}>
                <FileDown size={16} />
                PDF
              </button>
            </div>
          </div>

          <div className="score-banner">
            <div>
              <span>{ui.applicationStatus}</span>
              <strong>{applicationStatusDisplay}</strong>
            </div>
            <div>
              <span>{ui.governanceRisk}</span>
              <strong>{translateRisk(result.riskLevel, locale)}</strong>
            </div>
            <div>
              <span>{ui.completion}</span>
              <strong>{result.readiness}%</strong>
            </div>
          </div>

          <section className="report-section">
            <h3>{ui.regionAndBilling}</h3>
            <div className="stack-list compact-list">
              <article className="insight-card compact-card">
                <div className="callout-header inline-start">
                  <Globe size={16} />
                  <strong>{ui.cloudRegion}</strong>
                </div>
                <small>{regionDisplay}</small>
              </article>
              <article className="insight-card compact-card">
                <div className="callout-header inline-start">
                  <DollarSign size={16} />
                  <strong>{ui.monthlyEstimate}</strong>
                </div>
                <small>{`${result.costEstimate.currency} ${result.costEstimate.low}-${result.costEstimate.high} ${ui.perMonth}`}</small>
                <small>{result.costEstimate.note}</small>
              </article>
            </div>
          </section>

          <section className="report-section">
            <h3>{ui.appServiceAndGenerator}</h3>
            <div className="stack-list compact-list">
              <article className="insight-card compact-card">
                <div className="insight-title-row">
                  <strong>App Service</strong>
                  <span className="priority priority-建議">{result.appServiceConfig.plan}</span>
                </div>
                <small>{`Runtime: ${result.appServiceConfig.runtime}`}</small>
                <small>{`Workloads: ${result.appServiceWorkloadProfile.labels.join('、') || ui.notSpecified}`}</small>
                {result.appServiceWorkloadProfile.description ? <small>{result.appServiceWorkloadProfile.description}</small> : null}
              </article>
              <article className="insight-card compact-card">
                <div className="insight-title-row">
                  <strong>Azure Functions</strong>
                  <span className="priority priority-建議">{result.functionConfig.plan}</span>
                </div>
                <small>{`Runtime: ${result.functionConfig.runtime}`}</small>
              </article>
              <article className="insight-card compact-card">
                <div className="insight-title-row">
                  <strong>Auto Scale</strong>
                  <span className="priority priority-建議">{result.autoscaleProfile.mode}</span>
                </div>
                <small>{result.autoscaleProfile.guidance}</small>
              </article>
              <article className="insight-card compact-card">
                <div className="insight-title-row">
                  <strong>Generator Key / URL</strong>
                  <span className="priority priority-建議">{result.generatorProfile.mode}</span>
                </div>
                <small>{result.generatorProfile.endpointDelivery}</small>
              </article>
            </div>
          </section>

          <section className="report-section">
            <h3>{ui.databasePlan}</h3>
            {result.databasePlans.length ? result.databasePlans.map((plan) => (
              <article key={plan.id} className="insight-card">
                <div className="insight-title-row">
                  <strong>{plan.label}</strong>
                  <span className="priority priority-建議">{plan.sku}</span>
                </div>
                <p>{plan.note}</p>
                <div className="insight-meta">
                  <span>{plan.engine}</span>
                  <span>{plan.sizing}</span>
                  <span>{plan.accessMode}</span>
                  <span>{`${ui.databasePerformance} ${plan.performanceModel}`}</span>
                  <span>{`${ui.databaseBackup} ${plan.backupPolicy}`}</span>
                </div>
              </article>
            )) : (
              <article className="insight-card">
                <div className="insight-title-row">
                  <strong>{ui.noDatabase}</strong>
                  <span className="priority priority-建議">N/A</span>
                </div>
                <p>{ui.noDatabaseNote}</p>
              </article>
            )}
          </section>

          <section className="report-section">
            <div className="section-heading no-margin">
              <div>
                <h3>{ui.architecturePreview}</h3>
              </div>
              <button type="button" className="ghost-button" onClick={() => setIsArchitectureOpen(true)}>
                <Eye size={16} />
                {ui.dialogButton}
              </button>
            </div>
            <article className="insight-card compact-card">
              <small>{ui.architectureHint}</small>
            </article>
          </section>

          <section className="report-section">
            <h3>{ui.serviceMatrix}</h3>
            <div className="stack-list">
              {result.serviceAccessMatrix.map((service) => (
                <article key={service.id} className="insight-card">
                  <div className="insight-title-row">
                    <strong>{service.serviceName}</strong>
                    <span className={`priority priority-${service.status === '必須申請' ? '必要' : service.status === '建議申請' ? '建議' : '選配'}`}>{translatePriority(service.status, locale)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-chip"><Database size={14} />SKU {service.sku}</span>
                  </div>
                  <div className="role-pill-list">
                    {service.roles.map((role) => (
                      <span key={`${service.id}-${role.id}`} className="role-pill">{role.name}</span>
                    ))}
                  </div>
                  <div className="insight-meta">
                    <span>{`${service.roles.length} ${ui.generatedRolesCount}`}</span>
                    <span>{translatePriority(service.status, locale)}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="report-section">
            <h3>{ui.suggestedRoles}</h3>
            <div className="stack-list compact-list">
              {result.permissions.map((permission) => (
                <article key={permission.id} className="insight-card compact-card">
                  <div className="insight-title-row">
                    <strong>{permission.name}</strong>
                    <span className={`priority priority-${permission.level}`}>{translateRisk(permission.level, locale)}</span>
                  </div>
                  <p>{permission.scope}</p>
                  <small>{permission.justification}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="report-section">
            <h3>{ui.serviceIamControls}</h3>
            <div className="stack-list compact-list">
              {result.serviceIamProfile.labels.length ? result.serviceIamProfile.labels.map((label, index) => (
                <article key={`${label}-${index}`} className="insight-card compact-card">
                  <div className="callout-header inline-start">
                    <BadgeCheck size={16} />
                    <strong>{label}</strong>
                  </div>
                  <small>{result.serviceIamProfile.guidance[index]}</small>
                </article>
              )) : (
                <article className="insight-card compact-card">
                  <div className="callout-header inline-start">
                    <BadgeCheck size={16} />
                    <strong>{ui.notSpecified}</strong>
                  </div>
                  <small>{ui.serviceIamHint}</small>
                </article>
              )}
            </div>
          </section>

          <section className="report-section">
            <h3>{ui.azureCliCommands}</h3>
            <div className="stack-list">
              {result.azureCliPlan.commandGroups.map((group) => (
                <article key={group.title} className="insight-card cli-card">
                  <div className="insight-title-row">
                    <strong>{group.title}</strong>
                    <span className="priority priority-建議">CLI</span>
                  </div>
                  <pre className="cli-pre">{group.commands.join('\n')}</pre>
                  {group.notes?.length ? (
                    <div className="insight-meta cli-note-list">
                      {group.notes.map((note) => (
                        <span key={note}>{note}</span>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          <section className="report-section">
            <h3>{ui.cliManualNotes}</h3>
            <div className="stack-list compact-list">
              {result.azureCliPlan.manualSteps.map((item) => (
                <article key={item} className="insight-card compact-card">
                  <div className="callout-header inline-start">
                    <AlertTriangle size={16} />
                    <strong>{ui.notes}</strong>
                  </div>
                  <small>{item}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="report-section">
            <h3>{ui.securityControls}</h3>
            <div className="stack-list compact-list">
              {result.securityControls.map((control) => (
                <article key={control} className="insight-card compact-card">
                  <div className="callout-header inline-start">
                    <ShieldCheck size={16} />
                    <strong>{ui.securityRequirement}</strong>
                  </div>
                  <small>{control}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="report-section">
            <h3>{ui.references}</h3>
            <div className="stack-list compact-list">
              {result.referenceLinks.map((reference) => (
                <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer" className="reference-card">
                  <ExternalLink size={14} />
                  <span>{reference.title}</span>
                </a>
              ))}
            </div>
          </section>

          <section className="report-section">
            <h3>{ui.rationale}</h3>
            <div className="decision-flow">
              {result.rationale.map((item) => (
                <div key={`${item.question}-${item.answer}`} className="decision-item">
                  <span>{item.question}</span>
                  <ArrowRight size={16} />
                  <strong>{item.answer}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="report-section callout">
            <div className="callout-header">
              <AlertTriangle size={18} />
              <h3>{ui.notes}</h3>
            </div>
            <ul>
              <li>建議將高敏感資料工作負載佈署於受管控的 Resource Group。</li>
              <li>AI 服務若涉及企業知識庫，應同步規劃 Key Vault、Storage 與存取審核。</li>
              <li>對外系統應至少納入 WAF、監控、流量限制與日誌查詢能力。</li>
            </ul>
          </section>
        </aside>
      </main>

      <dialog open={isArchitectureOpen} className="architecture-dialog">
        <div className="architecture-dialog-header">
          <div>
            <span className="eyebrow">Azure Diagram</span>
            <h2>{ui.openDiagramTitle}</h2>
          </div>
          <button type="button" className="ghost-button" onClick={() => setIsArchitectureOpen(false)}>
            <X size={16} />
            {ui.close}
          </button>
        </div>
        <p className="architecture-dialog-copy">{ui.diagramDescription}</p>
        <ArchitectureSvg result={result} regionLabel={regionDisplay} externalAccessLabel={externalAccessDisplay} />
      </dialog>
    </div>
  );
}

export default App;