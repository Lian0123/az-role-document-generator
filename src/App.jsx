import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Database,
  Download,
  Lock,
  Network,
  ShieldCheck,
  Shield,
  Sparkles,
  SquareChartGantt,
  Workflow
} from 'lucide-react';
import { defaultAnswers, questionnaire } from './data/questionnaire';
import { buildReportMarkdown, evaluateSurvey } from './lib/evaluator';

const iconMap = {
  '專案輪廓': Workflow,
  '資料與合規': Lock,
  '安全與網路': Shield,
  '身份與權限': BadgeCheck,
  'AI 能力': BrainCircuit,
  '維運與治理': SquareChartGantt,
  '容量與可用性': Network
};

const initialProfile = {
  projectName: '新建 Azure 平台專案',
  department: '資訊服務處',
  owner: '',
  launchDate: ''
};

const groupedQuestions = questionnaire.reduce((accumulator, question) => {
  if (!accumulator[question.section]) {
    accumulator[question.section] = [];
  }

  accumulator[question.section].push(question);
  return accumulator;
}, {});

const getVisibleOptions = (question, answers) => {
  if (question.id === 'databaseTier') {
    if (answers.databaseNeed === 'sql') {
      return question.options.filter((option) => option.value.startsWith('sql-') || option.value === 'not-applicable');
    }

    if (answers.databaseNeed === 'postgres') {
      return question.options.filter((option) => option.value.startsWith('postgres-') || option.value === 'not-applicable');
    }

    return question.options.filter((option) => option.value === 'not-applicable');
  }

  if (question.id === 'databaseAccess' && answers.databaseNeed !== 'sql') {
    return question.options.filter((option) => option.value === 'not-applicable');
  }

  return question.options;
};

function App() {
  const [projectProfile, setProjectProfile] = useState(initialProfile);
  const [answers, setAnswers] = useState(defaultAnswers);

  const result = useMemo(() => evaluateSurvey(answers, projectProfile), [answers, projectProfile]);

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
            databaseAccess: current.databaseAccess === 'not-applicable' ? '' : current.databaseAccess
          };
        }

        if (optionValue === 'postgres') {
          return {
            ...current,
            databaseNeed: optionValue,
            databaseTier: current.databaseTier?.startsWith('postgres-') ? current.databaseTier : '',
            databaseAccess: 'not-applicable'
          };
        }

        return {
          ...current,
          databaseNeed: optionValue,
          databaseTier: 'not-applicable',
          databaseAccess: 'not-applicable'
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

  const exportReport = () => {
    const content = buildReportMarkdown(projectProfile, result);
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${projectProfile.projectName || 'azure-request'}-application.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="hero">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">Azure Intake Studio</span>
          <h1>Azure 服務與權限平台申請單產生器</h1>
          <p>
            以專案需求選擇題問卷，自動產出 Azure 服務建議、角色權限與申請依據，讓平台申請從訪談草稿直接進入可審核報表。
          </p>

          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={exportReport}>
              <Download size={18} />
              匯出申請報表
            </button>
            <div className="status-pill">
              <Sparkles size={16} />
              問卷完成度 {progress}%
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
            <span>平台決策摘要</span>
            <strong>{result.applicationStatus}</strong>
          </div>
          <div className="metric-grid">
            <article>
              <span>建議服務</span>
              <strong>{result.services.length}</strong>
            </article>
            <article>
              <span>建議權限</span>
              <strong>{result.permissions.length}</strong>
            </article>
            <article>
              <span>完成度</span>
              <strong>{result.readiness}%</strong>
            </article>
            <article>
              <span>資料庫 SKU</span>
              <strong>{result.databasePlan?.sku ?? 'N/A'}</strong>
            </article>
          </div>
          <ul className="summary-list">
            {result.executiveSummary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.div>
      </header>

      <main className="content-grid">
        <section className="panel form-panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Project Intake</span>
              <h2>專案基本資料</h2>
            </div>
            <span className="section-tag">RWD / GitHub Pages Actions</span>
          </div>

          <div className="profile-grid">
            <label>
              <span>專案名稱</span>
              <input
                value={projectProfile.projectName}
                onChange={(event) => handleProfileChange('projectName', event.target.value)}
                placeholder="例如：智慧客服平台"
              />
            </label>
            <label>
              <span>申請單位</span>
              <input
                value={projectProfile.department}
                onChange={(event) => handleProfileChange('department', event.target.value)}
                placeholder="例如：數位轉型處"
              />
            </label>
            <label>
              <span>負責人</span>
              <input
                value={projectProfile.owner}
                onChange={(event) => handleProfileChange('owner', event.target.value)}
                placeholder="例如：陳經理"
              />
            </label>
            <label>
              <span>預計上線日</span>
              <input
                type="date"
                value={projectProfile.launchDate}
                onChange={(event) => handleProfileChange('launchDate', event.target.value)}
              />
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
                    <p>選擇最符合需求的項目，系統將即時計算 Azure 服務與角色建議。</p>
                  </div>
                </div>

                <div className="question-list">
                  {questions.map((question) => (
                    <article key={question.id} className="question-card">
                      <div className="question-title-row">
                        <h4>{question.title}</h4>
                        <span>{question.type === 'multi' ? '可複選' : '單選'}</span>
                      </div>

                      <div className="option-grid">
                        {getVisibleOptions(question, answers).map((option) => {
                          const checked = question.type === 'multi'
                            ? (answers[question.id] ?? []).includes(option.value)
                            : answers[question.id] === option.value;

                          return (
                            <label
                              key={option.value}
                              className={checked ? 'option-card active' : 'option-card'}
                            >
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
              <h2>平台申請建議</h2>
            </div>
            <button type="button" className="ghost-button" onClick={exportReport}>
              <Download size={16} />
              下載
            </button>
          </div>

          <div className="score-banner">
            <div>
              <span>申請狀態</span>
              <strong>{result.applicationStatus}</strong>
            </div>
            <div>
              <span>治理風險</span>
              <strong>{result.riskLevel}</strong>
            </div>
            <div>
              <span>問卷完成度</span>
              <strong>{result.readiness}%</strong>
            </div>
          </div>

          <section className="report-section">
            <h3>資料庫方案</h3>
            <article className="insight-card">
              <div className="insight-title-row">
                <strong>{result.databasePlan?.label ?? '未使用資料庫或尚未決定'}</strong>
                <span className="priority priority-建議">{result.databasePlan?.sku ?? 'N/A'}</span>
              </div>
              <p>{result.databasePlan?.note ?? '若未使用資料庫，可維持檔案或物件儲存方案。'}</p>
              <div className="insight-meta">
                <span>{result.databasePlan?.engine ?? '無'}</span>
                <span>{result.databasePlan?.sizing ?? '未指定容量'}</span>
                <span>{result.databasePlan?.accessMode ?? '未指定存取模式'}</span>
              </div>
            </article>
          </section>

          <section className="report-section">
            <h3>服務與權限矩陣</h3>
            <div className="stack-list">
              {result.serviceAccessMatrix.map((service) => (
                <article key={service.id} className="insight-card">
                  <div className="insight-title-row">
                    <strong>{service.serviceName}</strong>
                    <span className={`priority priority-${service.status === '必須申請' ? '必要' : service.status === '建議申請' ? '建議' : '選配'}`}>{service.status}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-chip"><Database size={14} />SKU {service.sku}</span>
                  </div>
                  <div className="role-pill-list">
                    {service.roles.map((role) => (
                      <span key={`${service.id}-${role.id}`} className="role-pill">
                        {role.name}
                      </span>
                    ))}
                  </div>
                  <div className="insight-meta">
                    <span>{service.roles.length} 個建議角色</span>
                    <span>{service.status}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="report-section">
            <h3>建議角色權限</h3>
            <div className="stack-list compact-list">
              {result.permissions.map((permission) => (
                <article key={permission.id} className="insight-card compact-card">
                  <div className="insight-title-row">
                    <strong>{permission.name}</strong>
                    <span className={`priority priority-${permission.level}`}>{permission.level}</span>
                  </div>
                  <p>{permission.scope}</p>
                  <small>{permission.justification}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="report-section">
            <h3>安全控制</h3>
            <div className="stack-list compact-list">
              {result.securityControls.map((control) => (
                <article key={control} className="insight-card compact-card">
                  <div className="callout-header inline-start">
                    <ShieldCheck size={16} />
                    <strong>安全要求</strong>
                  </div>
                  <small>{control}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="report-section">
            <h3>評估依據</h3>
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
              <h3>申請注意事項</h3>
            </div>
            <ul>
              <li>建議將高敏感資料工作負載佈署於受管控的 Resource Group。</li>
              <li>AI 服務若涉及企業知識庫，應同步規劃 Key Vault、Storage 與存取審核。</li>
              <li>對外系統應至少納入 WAF、監控與日誌查詢能力。</li>
            </ul>
          </section>
        </aside>
      </main>
    </div>
  );
}

export default App;