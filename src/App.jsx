import { useMemo, useRef, useState } from 'react';
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
  department: '資訊服務處',
  applicantName: '',
  applicantEmail: '',
  owner: '',
  launchDate: '',
  publicResourceScope: '',
  externalIps: ''
};

const getVisibleOptions = (question, answers) => {
  if (question.id === 'databaseTier') {
    if (answers.databaseNeed === 'sql') {
      return question.options.filter((option) => option.value.startsWith('sql-') || option.value === 'not-applicable');
    }

    if (answers.databaseNeed === 'postgres') {
      return question.options.filter((option) => option.value.startsWith('postgres-') || option.value === 'not-applicable');
    }

    if (answers.databaseNeed === 'hybrid-db') {
      return question.options.filter((option) => option.value !== 'not-applicable');
    }

    return question.options.filter((option) => option.value === 'not-applicable');
  }

  if (question.id === 'databasePerformance') {
    if (answers.databaseNeed === 'sql') {
      return question.options.filter((option) => ['sql-dtu', 'sql-vcore', 'memory-optimized', 'not-applicable'].includes(option.value));
    }

    if (answers.databaseNeed === 'postgres') {
      return question.options.filter((option) => ['postgres-vcore', 'memory-optimized', 'not-applicable'].includes(option.value));
    }

    if (answers.databaseNeed === 'hybrid-db') {
      return question.options.filter((option) => option.value !== 'not-applicable');
    }

    return question.options.filter((option) => option.value === 'not-applicable');
  }

  if (question.id === 'databaseBackup' && !['sql', 'postgres', 'hybrid-db'].includes(answers.databaseNeed)) {
    return question.options.filter((option) => option.value === 'not-applicable');
  }

  if (question.id === 'databaseAccess' && !['sql', 'hybrid-db'].includes(answers.databaseNeed)) {
    return question.options.filter((option) => option.value === 'not-applicable');
  }

  if (question.id === 'queryStoreAccess' && !['sql', 'hybrid-db'].includes(answers.databaseNeed)) {
    return question.options.filter((option) => option.value === 'not-applicable');
  }

  return question.options;
};

const getRegionDisplay = (questions, answers) => questions
  .find((question) => question.id === 'region')
  ?.options.find((option) => option.value === answers.region)?.label;

const getOptionDisplay = (questions, questionId, value) => questions
  .find((question) => question.id === questionId)
  ?.options.find((option) => option.value === value)?.label;

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
    default:
      return null;
  }
};

function ArchitectureSvg({ result, regionLabel, externalAccessLabel }) {
  const services = new Set(result.services.map((service) => service.id));

  const boxes = [
    { id: 'users', x: 24, y: 46, width: 150, height: 64, title: 'Users / Partner', subtitle: 'Internet / VPN', color: '#0f4c81', icon: 'users' },
    { id: 'edge', x: 212, y: 46, width: 170, height: 64, title: services.has('waf') ? 'WAF / Front Door' : 'Ingress Control', subtitle: regionLabel, color: '#1479c9', icon: 'shield' },
    { id: 'apim', x: 420, y: 46, width: 170, height: 64, title: services.has('apiManagement') ? 'Azure API Management' : 'API Access Layer', subtitle: services.has('apiManagement') ? 'Policy / Product / Subscription' : 'Direct App Access', color: '#008272', icon: 'api' },
    { id: 'app', x: 628, y: 46, width: 180, height: 64, title: 'Azure App Service', subtitle: `${result.appServiceConfig.plan} / ${result.appServiceConfig.runtime}`, color: '#0b6bc7', icon: 'app' },
    { id: 'identity', x: 24, y: 170, width: 170, height: 64, title: 'Entra ID / MFA', subtitle: services.has('mfa') ? 'Conditional Access Enabled' : 'Identity Control', color: '#5c2d91', icon: 'identity' },
    { id: 'kv', x: 232, y: 170, width: 170, height: 64, title: 'Key Vault', subtitle: result.generatorProfile.mode, color: '#ca5010', icon: 'key' },
    { id: 'vnet', x: 440, y: 170, width: 170, height: 64, title: services.has('vnet') ? 'VNet / Private Endpoint' : 'Network Control', subtitle: externalAccessLabel || 'Network Policy', color: '#486991', icon: 'network' },
    { id: 'sql', x: 648, y: 170, width: 180, height: 64, title: result.databasePlan?.engine || 'Relational Data', subtitle: result.databasePlan?.sku || 'Not Applicable', color: '#0063b1', icon: 'database' },
    { id: 'blob', x: 856, y: 170, width: 170, height: 64, title: services.has('storage') ? 'Blob Storage' : 'Storage Optional', subtitle: services.has('storage') ? 'Document / Media / Export' : 'No Blob Selected', color: '#2d7d9a', icon: 'storage' },
    { id: 'ai', x: 856, y: 46, width: 170, height: 64, title: services.has('openAi') ? 'Azure OpenAI / AI Search' : 'AI Layer', subtitle: services.has('openAi') ? 'RAG / Generator' : 'No AI Required', color: '#7fba00', icon: 'ai' },
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
          <div><strong>{ui.applicantEmail}</strong><span>{profile.applicantEmail || ui.notSpecified}</span></div>
          <div><strong>{ui.owner}</strong><span>{profile.owner || ui.notSpecified}</span></div>
          <div><strong>{ui.launchDate}</strong><span>{profile.launchDate || ui.notSpecified}</span></div>
          <div><strong>{ui.cloudRegion}</strong><span>{regionDisplay || result.regionLabel}</span></div>
          <div><strong>{ui.applicationStatus}</strong><span>{applicationStatusDisplay}</span></div>
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
    </div>
  );
}

function App() {
  const [projectProfile, setProjectProfile] = useState(initialProfile);
  const [answers, setAnswers] = useState(defaultAnswers);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [locale, setLocale] = useState('zh-TW');
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
  const applicationStatusDisplay = useMemo(() => translateApplicationStatus(result.applicationStatus, locale), [result.applicationStatus, locale]);
  const summaryItems = useMemo(() => {
    const items = [
      projectProfile.projectName ? `${ui.projectName}: ${projectProfile.projectName}` : null,
      projectProfile.department ? `${ui.department}: ${projectProfile.department}` : null,
      `${ui.applicationStatus}: ${applicationStatusDisplay}`,
      `${ui.readiness}: ${result.readiness}%`,
      `${ui.cloudRegion}: ${regionDisplay}`,
      `${ui.monthlyEstimate}: ${result.costEstimate.currency} ${result.costEstimate.low}-${result.costEstimate.high} ${ui.perMonth}`
    ];

    return items.filter(Boolean);
  }, [projectProfile, result, regionDisplay, ui, applicationStatusDisplay]);

  const answeredCount = questionnaire.filter((question) => {
    const value = answers[question.id];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  }).length;

  const progress = Math.round((answeredCount / questionnaire.length) * 100);

  const handleProfileChange = (field, value) => {
    setProjectProfile((current) => ({
      ...current,
      [field]: value
    }));
  };

  const handleSingleAnswer = (questionId, optionValue) => {
    setAnswers((current) => {
      if (questionId === 'databaseNeed') {
        if (optionValue === 'sql') {
          return {
            ...current,
            databaseNeed: optionValue,
            databaseTier: current.databaseTier?.startsWith('sql-') ? current.databaseTier : '',
            databasePerformance: ['sql-dtu', 'sql-vcore', 'memory-optimized'].includes(current.databasePerformance) ? current.databasePerformance : '',
            databaseBackup: current.databaseBackup === 'not-applicable' ? '' : current.databaseBackup,
            databaseAccess: current.databaseAccess === 'not-applicable' ? '' : current.databaseAccess,
            queryStoreAccess: current.queryStoreAccess === 'not-applicable' ? '' : current.queryStoreAccess
          };
        }

        if (optionValue === 'postgres') {
          return {
            ...current,
            databaseNeed: optionValue,
            databaseTier: current.databaseTier?.startsWith('postgres-') ? current.databaseTier : '',
            databasePerformance: ['postgres-vcore', 'memory-optimized'].includes(current.databasePerformance) ? current.databasePerformance : '',
            databaseBackup: current.databaseBackup === 'not-applicable' ? '' : current.databaseBackup,
            databaseAccess: 'not-applicable',
            queryStoreAccess: 'not-applicable'
          };
        }

        return {
          ...current,
          databaseNeed: optionValue,
          databaseTier: optionValue === 'hybrid-db' ? current.databaseTier : 'not-applicable',
          databasePerformance: optionValue === 'hybrid-db' ? current.databasePerformance : 'not-applicable',
          databaseBackup: optionValue === 'hybrid-db' ? current.databaseBackup : 'not-applicable',
          databaseAccess: optionValue === 'hybrid-db' ? current.databaseAccess : 'not-applicable',
          queryStoreAccess: optionValue === 'hybrid-db' ? current.queryStoreAccess : 'not-applicable'
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
      const existingValues = current[questionId] ?? [];
      const nextValues = existingValues.includes(optionValue)
        ? existingValues.filter((value) => value !== optionValue)
        : [...existingValues.filter((value) => value !== 'none'), optionValue];

      return {
        ...current,
        [questionId]: optionValue === 'none' && !existingValues.includes('none') ? ['none'] : nextValues
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
            <label className="locale-switcher">
              <span>{ui.language}</span>
              <select value={locale} onChange={(event) => setLocale(event.target.value)}>
                {supportedLocales.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </label>
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
              <strong>{result.databasePlan?.sku ?? 'N/A'}</strong>
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
            <span className="section-tag">RWD / GitHub Pages Actions</span>
          </div>

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
              <span>{ui.applicantEmail}</span>
              <input type="email" value={projectProfile.applicantEmail} onChange={(event) => handleProfileChange('applicantEmail', event.target.value)} placeholder={ui.draftEmail} />
            </label>
            <label>
              <span>{ui.owner}</span>
              <input value={projectProfile.owner} onChange={(event) => handleProfileChange('owner', event.target.value)} placeholder={ui.draftOwner} />
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
          <div className="section-heading sticky-heading">
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
            <article className="insight-card">
              <div className="insight-title-row">
                <strong>{result.databasePlan?.label ?? ui.noDatabase}</strong>
                <span className="priority priority-建議">{result.databasePlan?.sku ?? 'N/A'}</span>
              </div>
              <p>{result.databasePlan?.note ?? ui.noDatabaseNote}</p>
              <div className="insight-meta">
                <span>{result.databasePlan?.engine ?? '無'}</span>
                <span>{result.databasePlan?.sizing ?? '未指定容量'}</span>
                <span>{result.databasePlan?.accessMode ?? '未指定存取模式'}</span>
                <span>{`${ui.databasePerformance} ${result.databasePlan?.performanceModel ?? ui.notSpecified}`}</span>
                <span>{`${ui.databaseBackup} ${result.databasePlan?.backupPolicy ?? ui.notSpecified}`}</span>
              </div>
            </article>
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