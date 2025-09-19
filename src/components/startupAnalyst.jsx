import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Upload, 
  BarChart3,
  PieChart,
  Users,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  ArrowUp,
  ArrowDown,
  Star,
  Building,
  Globe,
  Eye,
  Menu,
  User,
  Settings,
  Home,
  Briefcase,
  MapPin,
  Award,
  Shield,
  Loader2,
  CheckCircle2,
  CloudUpload,
  Activity,
  Zap,
  TrendingDown,
  Percent,
  Clock,
  AlertCircle,
  Info,
  Sliders,
  RefreshCw,
  Download,
  Lightbulb,
  Rocket,
  Crown,
  Sparkles,
  TrendingUpIcon,
  Brain,
  Layers,
  Hexagon
} from 'lucide-react';

// Custom SVG Logo Component
const VentureScopeLogo = ({ size = 32, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" opacity="0.1" />
    <path 
      d="M25 35 L50 20 L75 35 L75 65 L50 80 L25 65 Z" 
      fill="none" 
      stroke="url(#logoGradient)" 
      strokeWidth="3" 
      strokeLinejoin="round"
    />
    <circle cx="50" cy="40" r="8" fill="#8B5CF6" />
    <circle cx="35" cy="55" r="6" fill="#06B6D4" />
    <circle cx="65" cy="55" r="6" fill="#10B981" />
    <path 
      d="M42 40 L35 55 M58 40 L65 55 M35 55 L65 55" 
      stroke="url(#logoGradient)" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

const StartupAnalystPlatform = () => {
  // App state management
  const [appState, setAppState] = useState('upload'); // 'upload', 'loading', 'dashboard'
  const [uploadFile, setUploadFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Dashboard state
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [scenarioValues, setScenarioValues] = useState({
    growthRate: 150,
    cac: 450,
    churnRate: 8
  });
  const [exportWeights, setExportWeights] = useState({
    financial: 30,
    market: 25,
    team: 20,
    product: 15,
    risk: 10
  });

  // Loading stages for the analysis process
  const loadingStages = [
    { label: 'Uploading pitch deck...', icon: Upload, duration: 2000 },
    { label: 'Parsing slides & extracting text...', icon: FileText, duration: 3000 },
    { label: 'Benchmarking against competitors...', icon: BarChart3, duration: 2500 },
    { label: 'Analyzing risks & opportunities...', icon: AlertTriangle, duration: 2000 },
    { label: 'Generating investment recommendations...', icon: CheckCircle2, duration: 1500 }
  ];

  // Enhanced mock data for the analyzed startup
  const analyzedStartup = {
    name: 'NeuralFlow AI',
    tagline: 'AI-Powered Workflow Automation for Enterprise',
    sector: 'AI/ML',
    stage: 'Series A',
    founded: '2022',
    location: 'San Francisco, CA',
    employees: 28,
    website: 'neuralflow.ai',
    investmentScore: 8.4,
    recommendation: 'Strong Buy'
  };

  const keyMetrics = {
    arr: { value: '$2.8M', change: '+220%', trend: 'up' },
    mrr: { value: '$233K', change: '+18%', trend: 'up' },
    customers: { value: '1,450', change: '+65%', trend: 'up' },
    nps: { value: '74', change: '+8', trend: 'up' },
    runway: { value: '22 mo', change: '+4mo', trend: 'up' },
    burnRate: { value: '$78K/mo', change: '-15%', trend: 'up' },
    ltv: { value: '$12.5K', change: '+25%', trend: 'up' },
    cac: { value: '$420', change: '-18%', trend: 'up' }
  };

  const competitorComparisons = [
    {
      name: 'AutomateFlow Pro',
      sector: 'AI/ML Automation',
      funding: '$45M Series B',
      valuation: '$180M',
      arr: '$8.2M',
      growth: '180%',
      employees: 85,
      strengths: ['Enterprise focus', 'Strong partnerships'],
      weaknesses: ['Higher CAC', 'Limited SMB presence']
    },
    {
      name: 'WorkflowAI',
      sector: 'AI/ML Automation', 
      funding: '$25M Series A',
      valuation: '$95M',
      arr: '$4.1M',
      growth: '240%',
      employees: 52,
      strengths: ['Rapid growth', 'Strong product-market fit'],
      weaknesses: ['Customer concentration', 'Limited international presence']
    },
    {
      name: 'SmartProcess',
      sector: 'Process Automation',
      funding: '$60M Series B',
      valuation: '$220M', 
      arr: '$12M',
      growth: '120%',
      employees: 120,
      strengths: ['Market leader', 'Strong brand'],
      weaknesses: ['Slower innovation', 'Legacy tech stack']
    },
    {
      name: 'FlowGenius',
      sector: 'AI Automation',
      funding: '$15M Seed',
      valuation: '$45M',
      arr: '$1.8M', 
      growth: '320%',
      employees: 28,
      strengths: ['Innovative AI', 'Strong team'],
      weaknesses: ['Early stage', 'Limited resources']
    }
  ];

  const enhancedRiskFlags = [
    { 
      type: 'Financial', 
      issue: 'Customer concentration risk', 
      severity: 'High',
      description: 'Top 3 customers represent 58% of ARR',
      evidence: 'Slide 12: Customer breakdown shows heavy reliance on enterprise accounts',
      mitigation: 'Diversify customer base, focus on mid-market expansion'
    },
    { 
      type: 'Market', 
      issue: 'Competitive pressure increasing', 
      severity: 'Medium',
      description: 'New well-funded competitors entering space',
      evidence: 'Market analysis shows 3 new Series B+ competitors in Q4 2023',
      mitigation: 'Accelerate product development, strengthen IP position'
    },
    { 
      type: 'Technical', 
      issue: 'Third-party AI model dependency', 
      severity: 'Medium',
      description: 'Core functionality relies on OpenAI GPT models',
      evidence: 'Technical architecture diagram (Slide 8)',
      mitigation: 'Develop proprietary models, multi-vendor strategy'
    },
    { 
      type: 'Regulatory', 
      issue: 'Data privacy compliance', 
      severity: 'Low',
      description: 'Potential GDPR/CCPA implications for EU expansion',
      evidence: 'Expansion roadmap mentions EU market entry (Slide 15)',
      mitigation: 'Implement privacy-by-design, hire compliance officer'
    }
  ];

  const startups = [
    {
      name: 'TechFlow AI',
      sector: 'AI/ML',
      stage: 'Series A',
      valuation: '$15M',
      score: 8.2,
      risk: 'Medium',
      status: 'Under Review'
    },
    {
      name: 'GreenEnergy Solutions',
      sector: 'CleanTech',
      stage: 'Seed',
      valuation: '$5M',
      score: 7.8,
      risk: 'Low',
      status: 'Completed'
    },
    {
      name: 'HealthTrack Pro',
      sector: 'HealthTech',
      stage: 'Pre-Seed',
      valuation: '$2M',
      score: 6.5,
      risk: 'High',
      status: 'Red Flag'
    }
  ];

  // Mock data for different tabs
  const financialData = {
    revenue: {
      current: '$2.4M',
      growth: '+180%',
      projection: '$8.5M',
      breakdown: [
        { month: 'Jan', value: 180000 },
        { month: 'Feb', value: 195000 },
        { month: 'Mar', value: 210000 },
        { month: 'Apr', value: 225000 },
        { month: 'May', value: 240000 },
        { month: 'Jun', value: 260000 }
      ]
    },
    metrics: [
      { label: 'ARR', value: '$2.4M', change: '+180%', positive: true },
      { label: 'MRR', value: '$200K', change: '+15%', positive: true },
      { label: 'Gross Margin', value: '85%', change: '+5%', positive: true },
      { label: 'Burn Rate', value: '$85K/mo', change: '-12%', positive: true },
      { label: 'Runway', value: '18 months', change: '+3mo', positive: true },
      { label: 'CAC', value: '$450', change: '-20%', positive: true }
    ],
    funding: {
      totalRaised: '$15M',
      lastRound: 'Series A',
      investors: ['Sequoia Capital', 'Andreessen Horowitz', 'First Round'],
      valuation: '$50M'
    }
  };

  const teamData = {
    size: 28,
    growth: '+40%',
    departments: [
      { name: 'Engineering', count: 12, percentage: 43 },
      { name: 'Sales & Marketing', count: 8, percentage: 29 },
      { name: 'Product', count: 4, percentage: 14 },
      { name: 'Operations', count: 4, percentage: 14 }
    ],
    leadership: [
      {
        name: 'Sarah Chen',
        role: 'CEO & Co-founder',
        experience: '15 years',
        background: 'Former VP at Google, Stanford MBA',
        linkedin: '#'
      },
      {
        name: 'Michael Rodriguez',
        role: 'CTO & Co-founder',
        experience: '12 years',
        background: 'Ex-Tesla Senior Engineer, MIT PhD',
        linkedin: '#'
      },
      {
        name: 'Emily Watson',
        role: 'VP of Sales',
        experience: '10 years',
        background: 'Former Salesforce Director, Wharton MBA',
        linkedin: '#'
      }
    ],
    culture: {
      satisfaction: '4.8/5',
      retention: '95%',
      diversity: '45% women, 60% minorities'
    }
  };

  const marketData = {
    size: {
      tam: '$50B',
      sam: '$8B',
      som: '$800M'
    },
    competition: [
      { name: 'Competitor A', marketShare: '25%', funding: '$100M', strength: 'Enterprise focus' },
      { name: 'Competitor B', marketShare: '18%', funding: '$75M', strength: 'AI capabilities' },
      { name: 'Competitor C', marketShare: '12%', funding: '$50M', strength: 'Price point' }
    ],
    trends: [
      { trend: 'AI Automation Adoption', impact: 'High', timeline: '2024-2025' },
      { trend: 'Remote Work Tools', impact: 'Medium', timeline: '2024' },
      { trend: 'Enterprise Digital Transformation', impact: 'High', timeline: '2024-2026' }
    ],
    customerSegments: [
      { segment: 'Enterprise (1000+ employees)', percentage: 45, revenue: '$1.08M' },
      { segment: 'Mid-market (100-1000 employees)', percentage: 35, revenue: '$840K' },
      { segment: 'SMB (<100 employees)', percentage: 20, revenue: '$480K' }
    ]
  };

  const riskFlags = [
    { type: 'Financial', issue: 'High customer concentration (top 3 customers = 60% revenue)', severity: 'High' },
    { type: 'Market', issue: 'Increasing competition from well-funded startups', severity: 'Medium' },
    { type: 'Technical', issue: 'Dependency on third-party AI models', severity: 'Medium' },
    { type: 'Regulatory', issue: 'Potential data privacy regulations', severity: 'Low' }
  ];

  const benchmarks = [
    { metric: 'Revenue Growth', value: '450%', benchmark: '280%', status: 'outperform' },
    { metric: 'CAC/LTV Ratio', value: '1:4.2', benchmark: '1:3.0', status: 'outperform' },
    { metric: 'Churn Rate', value: '8%', benchmark: '12%', status: 'outperform' },
    { metric: 'Burn Rate', value: '$85k/mo', benchmark: '$120k/mo', status: 'outperform' }
  ];

  const growthPotentialData = {
    score: 8.7,
    factors: [
      { name: 'Market Size', score: 9.2, weight: 25, description: 'TAM of $50B with 15% CAGR' },
      { name: 'Product Innovation', score: 8.8, weight: 20, description: 'Proprietary AI models with strong IP' },
      { name: 'Team Execution', score: 8.5, weight: 20, description: 'Proven leadership with enterprise experience' },
      { name: 'Financial Health', score: 8.9, weight: 15, description: 'Strong unit economics and growth metrics' },
      { name: 'Competitive Position', score: 8.1, weight: 10, description: 'Differentiated offering in crowded market' },
      { name: 'Scalability', score: 9.0, weight: 10, description: 'Platform architecture supports rapid scaling' }
    ],
    recommendations: [
      {
        category: 'Strategic',
        priority: 'High',
        title: 'Accelerate International Expansion',
        description: 'Enter European market within 12 months to capture first-mover advantage',
        impact: 'Could increase TAM by 40% and reduce customer concentration risk',
        timeline: '6-12 months'
      },
      {
        category: 'Financial', 
        priority: 'High',
        title: 'Optimize Customer Acquisition',
        description: 'Invest in mid-market segment to diversify customer base',
        impact: 'Reduce customer concentration from 58% to <40%',
        timeline: '3-6 months'
      },
      {
        category: 'Product',
        priority: 'Medium', 
        title: 'Develop Proprietary AI Models',
        description: 'Reduce dependency on third-party AI providers',
        impact: 'Improve margins by 15-20% and strengthen competitive moat',
        timeline: '9-15 months'
      },
      {
        category: 'Operational',
        priority: 'Medium',
        title: 'Scale Customer Success Team',
        description: 'Hire 5-8 customer success managers to improve retention',
        impact: 'Increase NRR from 125% to 135%+',
        timeline: '2-4 months'
      }
    ]
  };

  // PDF Export function
  const exportToPDF = () => {
    // This would integrate with a PDF generation library like jsPDF or Puppeteer
    alert('PDF export functionality would be implemented here with comprehensive analysis report');
  };

  // Loading simulation effect
  useEffect(() => {
    if (appState === 'loading') {
      let currentStage = 0;
      
      const stageInterval = setInterval(() => {
        if (currentStage < loadingStages.length - 1) {
          currentStage++;
          setLoadingStage(currentStage);
        } else {
          clearInterval(stageInterval);
          setTimeout(() => setAppState('dashboard'), 1000);
        }
      }, 2500);
      
      return () => {
        clearInterval(stageInterval);
      };
    }
  }, [appState, loadingStages.length]);

  const handleFileUpload = (file) => {
    if (file && file.type === 'application/pdf' && file.size <= 50 * 1024 * 1024) {
      setUploadFile(file);
      setLoadingStage(0);
      setLoadingProgress(0);
      setAppState('loading');
    } else {
      alert('Please upload a PDF file under 50MB');
    }
  };

  const handleScenarioChange = (key, value) => {
    setScenarioValues(prev => ({ ...prev, [key]: value }));
  };

  const calculateScenarioImpact = () => {
    const baseScore = 8.4;
    const growthImpact = (scenarioValues.growthRate - 150) * 0.01;
    const cacImpact = (450 - scenarioValues.cac) * 0.002;
    const churnImpact = (8 - scenarioValues.churnRate) * 0.1;
    
    return Math.max(1, Math.min(10, baseScore + growthImpact + cacImpact + churnImpact)).toFixed(1);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      {appState === 'upload' && renderUploadPage()}
      {appState === 'loading' && renderLoadingPage()}
      {appState === 'dashboard' && renderDashboard()}
    </div>
  );

  function renderUploadPage() {
    return (
      <div className="h-screen bg-slate-900 flex items-center justify-center p-6 overflow-hidden">
        <div className="max-w-2xl w-full animate-fade-in">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800 border-2 border-purple-500 rounded-3xl mb-6 animate-float">
              <VentureScopeLogo size={40} />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 animate-slide-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400">
                VentureScope AI
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-lg mx-auto animate-slide-up-delay">
              Upload your pitch deck and get instant AI-powered investment analysis
            </p>
          </div>

          <div 
            className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-500 bg-slate-800/50 backdrop-blur-sm animate-slide-up-delay-2 ${
              isDragOver 
                ? 'border-cyan-400 bg-cyan-500/10 scale-105 shadow-2xl shadow-cyan-500/20' 
                : 'border-slate-600 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CloudUpload className={`w-16 h-16 mx-auto mb-6 transition-all duration-300 ${
              isDragOver ? 'text-cyan-400 animate-bounce' : 'text-slate-400 hover:text-purple-400'
            }`} />
            
            <h3 className="text-2xl font-semibold text-white mb-3">
              {isDragOver ? 'Drop your pitch deck here' : 'Upload Pitch Deck'}
            </h3>
            
            <p className="text-slate-400 mb-8 text-lg">
              Drag and drop your PDF here, or click to browse
            </p>
            
            <label className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 animate-pulse-slow">
              <Upload size={20} className="mr-3" />
              Choose File
              <input 
                type="file" 
                className="hidden" 
                accept=".pdf"
                onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
              />
            </label>
            
            <p className="text-slate-500 text-sm mt-6 flex items-center justify-center space-x-2">
              <Shield size={14} className="text-emerald-400" />
              <span>Supports PDF files up to 50MB • Your data is processed securely</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  function renderLoadingPage() {
    const currentStageData = loadingStages[loadingStage];
    const StageIcon = currentStageData.icon;
    
    return (
      <div className="h-screen bg-slate-900 flex items-center justify-center p-6 overflow-hidden">
        <div className="max-w-2xl w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800 border-2 border-cyan-500 rounded-3xl mb-8 animate-float">
            <VentureScopeLogo size={40} />
          </div>
          
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-800/50 border border-cyan-500/30 rounded-3xl mb-6 animate-pulse-glow">
              <StageIcon size={48} className="text-cyan-400 animate-spin-slow" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-2 animate-slide-up">{currentStageData.label}</h2>
            <p className="text-slate-400 text-lg animate-slide-up-delay">AI is analyzing your startup's potential</p>
          </div>
          
          <div className="flex justify-center space-x-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i <= loadingStage ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderDashboard() {
    return (
      <div className="h-screen bg-slate-900 text-white flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 px-6 py-3 flex-shrink-0 animate-slide-down">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-700 border border-purple-500/50 rounded-2xl flex items-center justify-center animate-float">
                <VentureScopeLogo size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">VentureScope AI</h1>
                <p className="text-xs text-slate-400">Investment Intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={exportToPDF}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-all duration-300 font-medium shadow-lg hover:scale-105 hover:shadow-emerald-500/25"
              >
                <Download size={14} />
                <span>Export</span>
              </button>
              <button 
                onClick={() => setAppState('upload')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-all duration-300 font-medium shadow-lg hover:scale-105 hover:shadow-purple-500/25"
              >
                <Upload size={14} />
                <span>New</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6 max-w-7xl mx-auto w-full overflow-hidden">
          {/* Compact Startup Header */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 mb-4 flex-shrink-0 animate-slide-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-slate-700 border border-purple-500/50 rounded-2xl flex items-center justify-center animate-pulse-glow">
                  <Building className="text-purple-400" size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{analyzedStartup.name}</h2>
                  <p className="text-sm text-slate-400">{analyzedStartup.tagline}</p>
                  <div className="flex items-center space-x-4 text-xs text-slate-500 mt-1">
                    <span className="flex items-center space-x-1">
                      <MapPin size={12} />
                      <span>{analyzedStartup.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{analyzedStartup.founded}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users size={12} />
                      <span>{analyzedStartup.employees} employees</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-400 mb-1 animate-number-count">
                  {analyzedStartup.investmentScore}/10
                </div>
                <div className="text-xs text-slate-500 mb-2">Investment Score</div>
                <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Crown size={12} className="mr-1" />
                  {analyzedStartup.recommendation}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl flex-1 flex flex-col overflow-hidden animate-slide-up-delay">
            <div className="border-b border-slate-700/50 flex-shrink-0">
              <nav className="flex space-x-1 px-6 py-2">
                {[
                  { id: 'overview', label: 'Overview', icon: Eye },
                  { id: 'competitors', label: 'Competitors', icon: BarChart3 },
                  { id: 'risks', label: 'Risks', icon: AlertTriangle },
                  { id: 'growth', label: 'Growth', icon: Rocket }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 ${
                      activeTab === tab.id
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <tab.icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600">
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-fade-in">
                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-4 gap-4">
                    {Object.entries(keyMetrics).map(([key, metric], index) => (
                      <div key={key} className="bg-slate-700/50 backdrop-blur-xl border border-slate-600/50 rounded-xl p-4 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-slate-300 uppercase text-xs tracking-wider">
                            {key === 'arr' ? 'ARR' : key === 'mrr' ? 'MRR' : key === 'nps' ? 'NPS' : key.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <ArrowUp className="text-emerald-400 animate-bounce-slow" size={14} />
                        </div>
                        <p className="text-2xl font-bold text-white mb-1 animate-number-count">{metric.value}</p>
                        <p className="text-xs text-emerald-400 font-semibold">{metric.change}</p>
                      </div>
                    ))}
                  </div>

                  {/* AI Investment Summary */}
                  <div className="bg-slate-700/30 border border-cyan-500/30 p-6 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 animate-slide-up-delay">
                    <div className="flex items-center space-x-3 mb-4">
                      <Brain className="text-cyan-400 animate-pulse-glow" size={20} />
                      <h3 className="text-xl font-bold text-white">AI Investment Summary</h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      NeuralFlow AI demonstrates exceptional product-market fit with outstanding growth metrics. 
                      The company has successfully scaled its AI-powered workflow automation platform, showing 220% YoY revenue growth 
                      while maintaining healthy unit economics. Strong leadership team with proven track record in enterprise AI.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'competitors' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center space-x-3 mb-4">
                    <BarChart3 className="text-cyan-400 animate-pulse-glow" size={20} />
                    <h3 className="text-xl font-bold text-white">Competitor Analysis</h3>
                  </div>
                  <div className="grid gap-4">
                    {competitorComparisons.map((competitor, idx) => (
                      <div key={idx} className="bg-slate-700/50 p-4 rounded-xl border border-slate-600/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] animate-slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-white mb-1">{competitor.name}</h4>
                            <p className="text-purple-300 text-sm">{competitor.sector}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-400">{competitor.arr} ARR</div>
                            <div className="text-sm text-purple-300">{competitor.growth} growth</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wide">Funding</p>
                            <p className="text-white font-semibold text-sm">{competitor.funding}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wide">Valuation</p>
                            <p className="text-white font-semibold text-sm">{competitor.valuation}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wide">Team Size</p>
                            <p className="text-white font-semibold text-sm">{competitor.employees} employees</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm font-semibold text-emerald-400 mb-2">Strengths</p>
                            <ul className="text-sm text-slate-300 space-y-1">
                              {competitor.strengths.map((strength, i) => (
                                <li key={i} className="flex items-center space-x-2">
                                  <CheckCircle size={10} className="text-emerald-400" />
                                  <span>{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-red-400 mb-2">Weaknesses</p>
                            <ul className="text-sm text-slate-300 space-y-1">
                              {competitor.weaknesses.map((weakness, i) => (
                                <li key={i} className="flex items-center space-x-2">
                                  <XCircle size={10} className="text-red-400" />
                                  <span>{weakness}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'risks' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertTriangle className="text-red-400 animate-pulse-glow" size={20} />
                    <h3 className="text-xl font-bold text-white">Risk Assessment</h3>
                  </div>
                  {enhancedRiskFlags.map((risk, idx) => (
                    <div key={idx} className="bg-slate-700/50 p-4 rounded-xl border border-slate-600/50 hover:border-red-500/50 transition-all duration-300 hover:scale-[1.02] animate-slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full animate-pulse ${
                            risk.severity === 'High' ? 'bg-red-400' :
                            risk.severity === 'Medium' ? 'bg-yellow-400' : 'bg-emerald-400'
                          }`} />
                          <div>
                            <h4 className="text-lg font-bold text-white">{risk.issue}</h4>
                            <p className="text-sm text-slate-400">{risk.type}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                          risk.severity === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          risk.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                          'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {risk.severity}
                        </span>
                      </div>
                      <p className="text-slate-300 mb-3">{risk.description}</p>
                      <details className="text-sm">
                        <summary className="text-cyan-400 cursor-pointer hover:text-cyan-300 font-semibold transition-colors">View Evidence & Mitigation</summary>
                        <div className="mt-3 p-3 bg-slate-800/50 rounded-xl border border-slate-600/30">
                          <p className="text-slate-300 mb-2"><strong className="text-cyan-400">Evidence:</strong> {risk.evidence}</p>
                          <p className="text-slate-300"><strong className="text-emerald-400">Mitigation:</strong> {risk.mitigation}</p>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'growth' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center space-x-3 mb-4">
                    <Rocket className="text-purple-400 animate-pulse-glow" size={20} />
                    <h3 className="text-xl font-bold text-white">Growth Potential & Recommendations</h3>
                  </div>
                  
                  {/* Growth Score */}
                  <div className="bg-slate-700/30 border border-purple-500/30 p-6 rounded-2xl text-center hover:border-purple-500/50 transition-all duration-300 animate-slide-up">
                    <div className="text-5xl font-bold text-purple-400 mb-2 animate-number-count">
                      {growthPotentialData.score}/10
                    </div>
                    <p className="text-slate-400">Growth Potential Score</p>
                  </div>

                  {/* Growth Factors */}
                  <div className="grid grid-cols-2 gap-4">
                    {growthPotentialData.factors.map((factor, idx) => (
                      <div key={idx} className="bg-slate-700/50 p-4 rounded-xl border border-slate-600/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 animate-slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-white text-sm">{factor.name}</h4>
                          <div className="text-lg font-bold text-purple-400">{factor.score}/10</div>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full transition-all duration-1000 animate-progress" 
                            style={{ width: `${factor.score * 10}%` }}
                          />
                        </div>
                        <p className="text-slate-300 text-xs">{factor.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                      <Lightbulb className="text-yellow-400 animate-pulse-glow" size={18} />
                      <span>Investment Recommendations</span>
                    </h4>
                    <div className="space-y-3">
                      {growthPotentialData.recommendations.map((rec, idx) => (
                        <div key={idx} className="bg-slate-700/50 p-4 rounded-xl border border-slate-600/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] animate-slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                                  rec.priority === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                }`}>
                                  {rec.priority}
                                </span>
                                <span className="px-2 py-1 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                                  {rec.category}
                                </span>
                              </div>
                              <h5 className="text-lg font-bold text-white">{rec.title}</h5>
                            </div>
                            <div className="text-right text-sm text-slate-400">
                              <Clock size={12} className="inline mr-1" />
                              {rec.timeline}
                            </div>
                          </div>
                          <p className="text-slate-300 mb-3 text-sm">{rec.description}</p>
                          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-600/30">
                            <p className="text-slate-300 text-sm"><strong className="text-emerald-400">Expected Impact:</strong> {rec.impact}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default StartupAnalystPlatform;