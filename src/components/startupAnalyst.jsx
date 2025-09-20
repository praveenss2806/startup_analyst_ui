import React, { useState, useEffect } from 'react';
import PDFExport from './PDFExport';
import { uploadFile, analyzeStartup } from '../api';
import agentResponseData from '../agent-response.json';
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

// Professional LAX Logo Component - Clean & Modern Design
const LAXLogo = ({ size = 32, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background rectangle */}
    <rect 
      x="10" 
      y="20" 
      width="80" 
      height="60" 
      rx="8" 
      fill="#192452"
    />
    {/* LAX Text */}
    <text 
      x="50" 
      y="58" 
      textAnchor="middle" 
      fontSize="28" 
      fontWeight="bold" 
      fill="#f7ffff"
      fontFamily="Arial, sans-serif"
    >
      LAX
    </text>
    {/* Accent line */}
    <rect 
      x="15" 
      y="72" 
      width="70" 
      height="3" 
      rx="1.5" 
      fill="#0099ff"
    />
  </svg>
);

const StartupAnalystPlatform = () => {
  // App state management
  const [appState, setAppState] = useState('upload'); // 'upload', 'loading', 'dashboard'
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  
  // Dashboard state
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [showPDFExport, setShowPDFExport] = useState(false);
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

  // Use agent response data
  const analyzedStartup = agentResponseData.startup;
  const keyMetrics = agentResponseData.keyMetrics;

  const competitorComparisons = agentResponseData.competitorAnalysis;

  const enhancedRiskFlags = agentResponseData.riskAssessment;

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

  const financialData = agentResponseData.financialData;

  const teamData = agentResponseData.teamData;

  const marketData = agentResponseData.marketData;

  const riskFlags = [
    { type: 'Financial', issue: 'High customer concentration (top 3 customers = 60% revenue)', severity: 'High' },
    { type: 'Market', issue: 'Increasing competition from well-funded startups', severity: 'Medium' },
    { type: 'Technical', issue: 'Dependency on third-party AI models', severity: 'Medium' },
    { type: 'Regulatory', issue: 'Potential data privacy regulations', severity: 'Low' }
  ];

  const benchmarks = agentResponseData.benchmarks;

  const growthPotentialData = agentResponseData.growthPotential;

  // PDF Export function
  const exportToPDF = () => {
    setShowPDFExport(true);
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

  const handleFileUpload = async (file) => {
    if (!file || file.type !== 'application/pdf') {
      setUploadError('Please upload a PDF file');
      return;
    }
    
    if (file.size > 50 * 1024 * 1024) {
      setUploadError('File size exceeds 50MB limit');
      return;
    }

    setUploadError(null);
    setUploadedFile(file);
    setLoadingStage(0);
    setLoadingProgress(0);
    setAppState('loading');

    try {
      // Call the real upload API
      const result = await uploadFile(file);
      
      if (result.success) {
        setUploadResponse(result.data);
        console.log('Upload successful:', result.data);
        // Continue with the loading stages simulation
        // The loading stages will eventually transition to dashboard
      } else {
        setUploadError(result.error);
        setAppState('upload');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadError('Upload failed. Please try again.');
      setAppState('upload');
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
      {showPDFExport && (
        <PDFExport 
          startupData={analyzedStartup} 
          onClose={() => setShowPDFExport(false)} 
        />
      )}
    </div>
  );

  function renderUploadPage() {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 overflow-hidden">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 border-2 border-orange-500 rounded-3xl mb-6">
              <LAXLogo size={40} />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              LetsAnalyse
            </h1>
            <p className="text-xl text-gray-300 max-w-lg mx-auto">
              Upload your pitch deck and get instant AI-powered investment analysis
            </p>
          </div>

          <div 
            className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-500 bg-gray-800/50 ${
              isDragOver 
                ? 'border-orange-400 bg-orange-900/20 scale-105 shadow-2xl shadow-orange-500/25' 
                : 'border-gray-600 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/20'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CloudUpload className={`w-16 h-16 mx-auto mb-6 transition-all duration-300 ${
              isDragOver ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'
            }`} />
            
            <h3 className="text-2xl font-semibold text-white mb-3">
              {isDragOver ? 'Drop your pitch deck here' : 'Upload Pitch Deck'}
            </h3>
            
            <p className="text-gray-300 mb-8 text-lg">
              Drag and drop your PDF here, or click to browse
            </p>
            
            <label className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
              <Upload size={20} className="mr-3" />
              Choose File
              <input 
                type="file" 
                className="hidden" 
                accept=".pdf"
                onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
              />
            </label>
            
            <p className="text-gray-400 text-sm mt-6 flex items-center justify-center space-x-2">
              <Shield size={14} className="text-green-400" />
              <span>Supports PDF files up to 50MB • Your data is processed securely</span>
            </p>
            
            {uploadError && (
              <div className="mt-6 p-4 bg-red-900/50 border border-red-500 rounded-xl">
                <div className="flex items-center space-x-2">
                  <AlertCircle size={16} className="text-red-400" />
                  <span className="text-red-300 text-sm">{uploadError}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  function renderLoadingPage() {
    const currentStageData = loadingStages[loadingStage];
    const StageIcon = currentStageData.icon;
    
    return (
      <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 overflow-hidden">
        <div className="max-w-2xl w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 border-2 border-orange-500 rounded-3xl mb-8">
            <LAXLogo size={40} />
          </div>
          
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-800 border border-orange-500 rounded-3xl mb-6">
              <StageIcon size={48} className="text-orange-500" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">{currentStageData.label}</h2>
            <p className="text-gray-300 text-lg">AI is analyzing your startup's potential</p>
          </div>
          
          <div className="flex justify-center space-x-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i <= loadingStage ? 'bg-orange-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderDashboard() {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800/80 border-b border-gray-700 px-6 py-4 flex-shrink-0 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-700 rounded-2xl flex items-center justify-center">
                <LAXLogo size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">LetsAnalyse</h1>
                <p className="text-xs text-gray-300">AI Investment Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={exportToPDF}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-all duration-300 font-medium shadow-lg hover:scale-105"
              >
                <Download size={14} />
                <span>Export PDF</span>
              </button>
              <button 
                onClick={() => setAppState('upload')}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-all duration-300 font-medium shadow-lg hover:scale-105"
              >
                <Upload size={14} />
                <span>New</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6 w-full overflow-hidden">
          {/* Compact Startup Header */}
          <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 mb-6 flex-shrink-0 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                  <Building className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{analyzedStartup.name}</h2>
                  <p className="text-sm text-gray-300">{analyzedStartup.tagline}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-400 mt-1">
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
                <div className="text-3xl font-bold text-green-400 mb-1">
                  {analyzedStartup.investmentScore}/10
                </div>
                <div className="text-xs text-gray-400 mb-2">Investment Score</div>
                <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-green-900/40 text-green-400 border border-green-700">
                  <Crown size={12} className="mr-1" />
                  {analyzedStartup.recommendation}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-gray-800/60 border border-gray-700 rounded-2xl flex-1 flex flex-col overflow-hidden shadow-lg backdrop-blur-sm">
            <div className="border-b border-gray-700 flex-shrink-0">
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
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-orange-600 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-400" style={{scrollbarWidth: 'thin'}}>
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-4 gap-4">
                    {Object.entries(keyMetrics).map(([key, metric], index) => (
                      <div key={key} className="bg-gray-700/50 border border-gray-600 rounded-xl p-4 hover:border-orange-500 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-300 uppercase text-xs tracking-wider">
                            {key === 'arr' ? 'ARR' : key === 'cac' ? 'CAC' : key.charAt(0).toUpperCase() + key.slice(1)}
                          </h4>
                          <ArrowUp className="text-green-400" size={14} />
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                        <p className="text-xs text-green-400 font-semibold">{metric.change}</p>
                      </div>
                    ))}
                  </div>

                  {/* AI Investment Summary */}
                  <div className="bg-blue-900/30 border border-blue-700 p-6 rounded-2xl hover:border-blue-600 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <Brain className="text-blue-400" size={20} />
                      <h3 className="text-xl font-bold text-white">AI Investment Summary</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {agentResponseData.aiSummary.investmentThesis}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-green-400 font-semibold mb-2">Key Highlights</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {agentResponseData.aiSummary.keyHighlights.slice(0, 2).map((highlight, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <CheckCircle size={12} className="text-green-400 mt-1 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-red-400 font-semibold mb-2">Main Concerns</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {agentResponseData.aiSummary.mainConcerns.slice(0, 2).map((concern, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <AlertCircle size={12} className="text-red-400 mt-1 flex-shrink-0" />
                              <span>{concern}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'competitors' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <BarChart3 className="text-blue-400" size={20} />
                    <h3 className="text-xl font-bold text-white">Competitor Analysis</h3>
                  </div>
                  <div className="grid gap-4">
                    {competitorComparisons.slice(0, 2).map((competitor, idx) => (
                      <div key={idx} className="bg-gray-700/50 p-4 rounded-xl border border-gray-600 hover:border-blue-500 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-bold text-white mb-1">{competitor.name}</h4>
                            <p className="text-blue-400 text-sm">{competitor.sector}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-400">{competitor.arr} ARR</div>
                            <div className="text-sm text-blue-400">{competitor.growth} growth</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Funding</p>
                            <p className="text-white font-semibold text-sm">{competitor.funding}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Valuation</p>
                            <p className="text-white font-semibold text-sm">{competitor.valuation}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm font-semibold text-green-400 mb-2">Strengths</p>
                            <ul className="text-sm text-gray-300 space-y-1">
                              {competitor.strengths.slice(0, 1).map((strength, i) => (
                                <li key={i} className="flex items-center space-x-2">
                                  <CheckCircle size={10} className="text-green-400" />
                                  <span>{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-red-400 mb-2">Weaknesses</p>
                            <ul className="text-sm text-gray-300 space-y-1">
                              {competitor.weaknesses.slice(0, 1).map((weakness, i) => (
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
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertTriangle className="text-red-400" size={20} />
                    <h3 className="text-xl font-bold text-white">Risk Assessment</h3>
                  </div>
                  {enhancedRiskFlags.slice(0, 2).map((risk, idx) => (
                    <div key={idx} className="bg-gray-700/50 p-4 rounded-xl border border-gray-600 hover:border-red-500 transition-all duration-300">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            risk.severity === 'High' ? 'bg-red-500' :
                            risk.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          <div>
                            <h4 className="text-lg font-bold text-white">{risk.issue}</h4>
                            <p className="text-sm text-gray-300">{risk.type}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                          risk.severity === 'High' ? 'bg-red-900/40 text-red-400 border border-red-700' :
                          risk.severity === 'Medium' ? 'bg-yellow-900/40 text-yellow-400 border border-yellow-700' :
                          'bg-green-900/40 text-green-400 border border-green-700'
                        }`}>
                          {risk.severity}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-3">{risk.description}</p>
                      <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-600">
                        <p className="text-gray-300 text-sm mb-2"><strong className="text-blue-400">Evidence:</strong> {risk.evidence}</p>
                        <p className="text-gray-300 text-sm"><strong className="text-green-400">Mitigation:</strong> {risk.mitigation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'growth' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Rocket className="text-purple-400" size={20} />
                    <h3 className="text-xl font-bold text-white">Growth Potential</h3>
                  </div>

                  {/* Growth Factors */}
                  <div className="grid grid-cols-2 gap-4">
                    {growthPotentialData.factors.slice(0, 2).map((factor, idx) => (
                      <div key={idx} className="bg-gray-700/50 p-4 rounded-xl border border-gray-600 hover:border-purple-500 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-white text-sm">{factor.name}</h4>
                          <div className="text-lg font-bold text-purple-400">{factor.score}/10</div>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full transition-all duration-1000" 
                            style={{ width: `${factor.score * 10}%` }}
                          />
                        </div>
                        <p className="text-gray-300 text-xs">{factor.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                      <Lightbulb className="text-yellow-400" size={18} />
                      <span>Key Recommendations</span>
                    </h4>
                    <div className="space-y-3">
                      {growthPotentialData.recommendations.slice(0, 1).map((rec, idx) => (
                        <div key={idx} className="bg-gray-700/50 p-4 rounded-xl border border-gray-600 hover:border-yellow-500 transition-all duration-300">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                                  rec.priority === 'High' ? 'bg-red-900/40 text-red-400 border border-red-700' : 'bg-yellow-900/40 text-yellow-400 border border-yellow-700'
                                }`}>
                                  {rec.priority}
                                </span>
                                <span className="px-2 py-1 rounded-lg text-xs font-bold bg-blue-900/40 text-blue-400 border border-blue-700">
                                  {rec.category}
                                </span>
                              </div>
                              <h5 className="text-lg font-bold text-white">{rec.title}</h5>
                            </div>
                            <div className="text-right text-sm text-gray-300">
                              <Clock size={12} className="inline mr-1" />
                              {rec.timeline}
                            </div>
                          </div>
                          <p className="text-gray-300 mb-3 text-sm">{rec.description}</p>
                          <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-600">
                            <p className="text-gray-300 text-sm"><strong className="text-green-400">Expected Impact:</strong> {rec.impact}</p>
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