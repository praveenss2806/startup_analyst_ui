import React, { useState, useEffect, useRef } from 'react';
import PDFExport from './PDFExport';
import { uploadFile, analyzeStartup } from '../api';
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
  const [analysisData, setAnalysisData] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);
  const analysisStartedRef = useRef(false);
  
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

  // Use real analysis data or fallback to empty structure
  const analyzedStartup = analysisData?.analysis?.startup || {};
  const keyMetrics = analysisData?.analysis?.keyMetrics || {};

  const competitorComparisons = analysisData?.analysis?.competitorAnalysis || [];

  const enhancedRiskFlags = analysisData?.analysis?.riskAssessment || [];

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

  const financialData = analysisData?.analysis?.financialData || {};

  const teamData = analysisData?.analysis?.teamData || {};

  const marketData = analysisData?.analysis?.marketData || {};

  const riskFlags = [
    { type: 'Financial', issue: 'High customer concentration (top 3 customers = 60% revenue)', severity: 'High' },
    { type: 'Market', issue: 'Increasing competition from well-funded startups', severity: 'Medium' },
    { type: 'Technical', issue: 'Dependency on third-party AI models', severity: 'Medium' },
    { type: 'Regulatory', issue: 'Potential data privacy regulations', severity: 'Low' }
  ];

  const benchmarks = analysisData?.analysis?.benchmarks || [];

  const growthPotentialData = analysisData?.analysis?.growthPotential || {};

  // PDF Export function
  const exportToPDF = () => {
    setShowPDFExport(true);
  };

  // Loading and analysis effect
  useEffect(() => {
    if (appState === 'loading' && uploadResponse?.gcsUri && !analysisStartedRef.current) {
      analysisStartedRef.current = true;
      let currentStage = 0;
      let analysisCompleted = false;
      
      const stageInterval = setInterval(async () => {
        if (currentStage < loadingStages.length - 1) {
          currentStage++;
          setLoadingStage(currentStage);
          
          // Start analysis when we reach stage 2 (Processing) and not already completed
          if (currentStage === 2 && !analysisCompleted) {
            analysisCompleted = true;
            try {
              const result = await analyzeStartup(uploadResponse.gcsUri);
              if (result.success) {
                setAnalysisData(result.data);
              } else {
                setAnalysisError(result.error);
              }
            } catch (error) {
              console.error('Analysis failed:', error);
              setAnalysisError('Analysis failed. Please try again.');
            }
          }
        } else {
          clearInterval(stageInterval);
          // Transition to dashboard after stages complete
          setTimeout(() => {
            setAppState('dashboard');
          }, 1000);
        }
      }, 2500);
      
      return () => {
        clearInterval(stageInterval);
      };
    }
  }, [appState, uploadResponse?.gcsUri, loadingStages.length]);

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
    setAnalysisData(null);
    setAnalysisError(null);
    analysisStartedRef.current = false;
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
          startupData={{
            ...analyzedStartup,
            keyMetrics,
            competitorAnalysis: competitorComparisons,
            riskAssessment: enhancedRiskFlags,
            growthPotential: growthPotentialData,
            financialData,
            teamData,
            marketData,
            aiSummary: analysisData?.analysis?.aiSummary
          }} 
          onClose={() => setShowPDFExport(false)} 
        />
      )}
    </div>
  );

  function renderUploadPage() {
    return (
      <div className="h-screen flex overflow-hidden" style={{backgroundColor: '#192452'}}>
        {/* Left side with logo */}
        <div className="w-1/3 flex items-center justify-center" style={{backgroundColor: '#192452'}}>
          <div className="w-full h-full flex items-center justify-center">
            <LAXLogo size={200} className="w-full h-auto max-w-xs" />
          </div>
        </div>
        
        {/* Right side with upload form */}
        <div className="w-2/3 flex items-center justify-center p-6" style={{backgroundColor: '#f7ffff'}}>
          <div className="max-w-xl w-full">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4" style={{color: '#192452'}}>
                LetsAnalyse
              </h1>
              <p className="text-xl max-w-lg mx-auto" style={{color: '#192452', opacity: 0.8}}>
                Upload your pitch deck and get instant AI-powered Startup analysis
              </p>
            </div>

            <div 
              className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-500 ${
                isDragOver 
                  ? 'scale-105 shadow-2xl' 
                  : 'hover:shadow-xl'
              }`}
              style={{
                backgroundColor: isDragOver ? 'rgba(0, 153, 255, 0.1)' : 'rgba(25, 36, 82, 0.05)',
                borderColor: isDragOver ? '#0099ff' : '#8d51ff'
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <CloudUpload className={`w-16 h-16 mx-auto mb-6 transition-all duration-300`} 
                style={{color: isDragOver ? '#0099ff' : '#8d51ff'}} />
              
              <h3 className="text-2xl font-semibold mb-3" style={{color: '#192452'}}>
                {isDragOver ? 'Drop your pitch deck here' : 'Upload Pitch Deck'}
              </h3>
              
              <p className="mb-8 text-lg" style={{color: '#192452', opacity: 0.7}}>
                Drag and drop your PDF here, or click to browse
              </p>
              
              <label className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{backgroundColor: '#0099ff'}}>
                <Upload size={20} className="mr-3" />
                Choose File
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf"
                  onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
                />
              </label>
              
              <p className="text-sm mt-6 flex items-center justify-center space-x-2" style={{color: '#192452', opacity: 0.6}}>
                <Shield size={14} style={{color: '#08ce6b'}} />
                <span>Supports PDF files up to 50MB</span>
              </p>
              
              {uploadError && (
                <div className="mt-6 p-4 border rounded-xl" style={{backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#ef4444'}}>
                  <div className="flex items-center space-x-2">
                    <AlertCircle size={16} style={{color: '#ef4444'}} />
                    <span className="text-sm" style={{color: '#ef4444'}}>{uploadError}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderLoadingPage() {
    return (
      <div className="h-screen flex items-center justify-center overflow-hidden" style={{backgroundColor: '#192452'}}>
        <div className="text-center">
          {/* Animated Brain/Analysis Icon */}
          <div className="relative mb-12">
            <div className="w-32 h-32 mx-auto relative">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin" 
                style={{
                  borderTopColor: '#0099ff',
                  borderRightColor: '#8d51ff',
                  animation: 'spin 3s linear infinite'
                }}>
              </div>
              
              {/* Middle pulsing ring */}
              <div className="absolute inset-2 rounded-full border-2 border-transparent animate-pulse" 
                style={{
                  borderTopColor: '#fa8524',
                  borderBottomColor: '#08ce6b',
                  animation: 'spin 2s linear infinite reverse'
                }}>
              </div>
              
              {/* Inner brain icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain size={48} style={{color: '#f7ffff'}} className="animate-pulse" />
              </div>
              
              {/* Floating particles */}
              <div className="absolute -top-2 -left-2 w-2 h-2 rounded-full animate-bounce" 
                style={{backgroundColor: '#0099ff', animationDelay: '0s'}}></div>
              <div className="absolute -top-2 -right-2 w-2 h-2 rounded-full animate-bounce" 
                style={{backgroundColor: '#8d51ff', animationDelay: '0.5s'}}></div>
              <div className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full animate-bounce" 
                style={{backgroundColor: '#fa8524', animationDelay: '1s'}}></div>
              <div className="absolute -bottom-2 -right-2 w-2 h-2 rounded-full animate-bounce" 
                style={{backgroundColor: '#08ce6b', animationDelay: '1.5s'}}></div>
            </div>
          </div>
          
          {/* Loading Text */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4" style={{color: '#f7ffff'}}>
              Analyzing Your Startup
            </h2>
            <p className="text-xl mb-2" style={{color: '#f7ffff', opacity: 0.8}}>
              Our AI is diving deep into your pitch deck
            </p>
            <p className="text-lg" style={{color: '#0099ff'}}>
              This may take 3-5 minutes for comprehensive analysis
            </p>
          </div>
          
          {/* Animated Progress Waves */}
          <div className="flex justify-center space-x-2 mb-8">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-1 rounded-full animate-pulse"
                style={{
                  height: '40px',
                  backgroundColor: ['#0099ff', '#8d51ff', '#fa8524', '#08ce6b'][i % 4],
                  animationDelay: `${i * 0.2}s`,
                  animation: `pulse 1.5s ease-in-out infinite ${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderDashboard() {
    // Show error state if analysis failed
    if (analysisError) {
      return (
        <div className="h-screen flex items-center justify-center p-6" style={{backgroundColor: '#192452'}}>
          <div className="max-w-md w-full text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 border-2 rounded-3xl mb-6" style={{backgroundColor: 'rgba(239, 68, 68, 0.2)', borderColor: '#ef4444'}}>
              <AlertCircle size={40} style={{color: '#ef4444'}} />
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{color: '#f7ffff'}}>Analysis Failed</h2>
            <p className="mb-6" style={{color: '#f7ffff', opacity: 0.8}}>{analysisError}</p>
            <button 
              onClick={() => setAppState('upload')}
              className="text-white px-6 py-3 rounded-xl flex items-center space-x-2 mx-auto transition-all duration-300 font-medium"
              style={{backgroundColor: '#0099ff'}}
            >
              <Upload size={16} />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      );
    }

    // Show loading state if analysis data is not yet available
    if (!analysisData) {
      return renderLoadingPage();
    }

    return (
      <div className="h-screen text-white flex flex-col overflow-hidden" style={{backgroundColor: '#192452'}}>
        {/* Header */}
        <header className="border-b px-6 py-4 flex-shrink-0 shadow-lg" style={{backgroundColor: '#192452', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center">
                <LAXLogo size={32} />
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{color: '#f7ffff'}}>LetsAnalyse</h1>
                <p className="text-xs" style={{color: '#f7ffff', opacity: 0.7}}>AI Startup Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={exportToPDF}
                className="text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-all duration-300 font-medium shadow-lg hover:scale-105"
                style={{backgroundColor: '#08ce6b'}}
              >
                <Download size={14} />
                <span>Export PDF</span>
              </button>
              <button 
                onClick={() => setAppState('upload')}
                className="text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-all duration-300 font-medium shadow-lg hover:scale-105"
                style={{backgroundColor: '#0099ff'}}
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
          <div className="border rounded-2xl p-6 mb-6 flex-shrink-0 shadow-lg" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{backgroundColor: '#0099ff'}}>
                  <Building className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{color: '#f7ffff'}}>{analyzedStartup.name}</h2>
                  <p className="text-sm" style={{color: '#f7ffff', opacity: 0.8}}>{analyzedStartup.tagline}</p>
                  <div className="flex items-center space-x-4 text-xs mt-1" style={{color: '#f7ffff', opacity: 0.6}}>
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
                <div className="text-3xl font-bold mb-1" style={{color: '#08ce6b'}}>
                  {analyzedStartup.investmentScore}/10
                </div>
                <div className="text-xs mb-2" style={{color: '#f7ffff', opacity: 0.6}}>Investment Score</div>
                <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold border" style={{backgroundColor: 'rgba(8, 206, 107, 0.2)', color: '#08ce6b', borderColor: '#08ce6b'}}>
                  <Crown size={12} className="mr-1" />
                  {analyzedStartup.recommendation}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border rounded-2xl flex-1 flex flex-col overflow-hidden shadow-lg" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
            <div className="border-b flex-shrink-0" style={{borderColor: 'rgba(247, 255, 255, 0.1)'}}>
              <nav className="flex space-x-1 px-6 py-2">
                {[
                  { id: 'overview', label: 'Overview', icon: Eye },
                  { id: 'competitors', label: 'Competitors', icon: BarChart3 },
                  { id: 'risks', label: 'Risks', icon: AlertTriangle },
                  { id: 'growth', label: 'Growth', icon: Rocket },
                  { id: 'financials', label: 'Financials', icon: DollarSign },
                  { id: 'team', label: 'Team', icon: Users },
                  { id: 'market', label: 'Market', icon: TrendingUp }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300`}
                    style={{
                      backgroundColor: activeTab === tab.id ? '#0099ff' : 'transparent',
                      color: activeTab === tab.id ? '#f7ffff' : '#f7ffff',
                      opacity: activeTab === tab.id ? 1 : 0.7
                    }}
                  >
                    <tab.icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6 flex-1 overflow-y-auto scrollbar-thin" style={{scrollbarWidth: 'thin'}}>
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-4 gap-4">
                    {Object.entries(keyMetrics).map(([key, metric], index) => (
                      <div key={key} className="border rounded-xl p-4 transition-all duration-300" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold uppercase text-xs tracking-wider" style={{color: '#f7ffff', opacity: 0.7}}>
                            {key === 'arr' ? 'ARR' : key === 'cac' ? 'CAC' : key.charAt(0).toUpperCase() + key.slice(1)}
                          </h4>
                          <ArrowUp style={{color: '#08ce6b'}} size={14} />
                        </div>
                        <p className="text-2xl font-bold mb-1" style={{color: '#f7ffff'}}>{metric.value}</p>
                        <p className="text-xs font-semibold" style={{color: '#08ce6b'}}>{metric.change}</p>
                      </div>
                    ))}
                  </div>

                  {/* Benchmarks */}
                  {benchmarks && benchmarks.length > 0 && (
                    <div className="border p-6 rounded-2xl transition-all duration-300" style={{backgroundColor: 'rgba(141, 81, 255, 0.1)', borderColor: '#8d51ff'}}>
                      <div className="flex items-center space-x-3 mb-4">
                        <BarChart3 style={{color: '#8d51ff'}} size={20} />
                        <h3 className="text-xl font-bold" style={{color: '#f7ffff'}}>Performance Benchmarks</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {benchmarks.map((benchmark, idx) => (
                          <div key={idx} className="p-4 rounded-xl" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)'}}>
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm" style={{color: '#f7ffff', opacity: 0.8}}>{benchmark.metric}</p>
                              <span className="px-2 py-1 rounded-lg text-xs font-bold border" style={{
                                backgroundColor: benchmark.status === 'Outperforming' || benchmark.status === 'Leading' ? 'rgba(8, 206, 107, 0.2)' :
                                                benchmark.status === 'Significantly Outperforming' ? 'rgba(0, 153, 255, 0.2)' : 'rgba(250, 133, 36, 0.2)',
                                color: benchmark.status === 'Outperforming' || benchmark.status === 'Leading' ? '#08ce6b' :
                                       benchmark.status === 'Significantly Outperforming' ? '#0099ff' : '#fa8524',
                                borderColor: benchmark.status === 'Outperforming' || benchmark.status === 'Leading' ? '#08ce6b' :
                                            benchmark.status === 'Significantly Outperforming' ? '#0099ff' : '#fa8524'
                              }}>
                                {benchmark.status}
                              </span>
                            </div>
                            <p className="font-bold" style={{color: '#f7ffff'}}>{benchmark.value}</p>
                            <p className="text-xs" style={{color: '#f7ffff', opacity: 0.6}}>vs {benchmark.benchmark}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Investment Summary */}
                  <div className="border p-6 rounded-2xl transition-all duration-300" style={{backgroundColor: 'rgba(0, 153, 255, 0.1)', borderColor: '#0099ff'}}>
                    <div className="flex items-center space-x-3 mb-4">
                      <Brain style={{color: '#0099ff'}} size={20} />
                      <h3 className="text-xl font-bold" style={{color: '#f7ffff'}}>AI Investment Summary</h3>
                    </div>
                    <p className="leading-relaxed mb-4" style={{color: '#f7ffff', opacity: 0.8}}>
                      {analysisData?.analysis?.aiSummary?.investmentThesis || 'Analysis in progress...'}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2" style={{color: '#08ce6b'}}>Key Highlights</h4>
                        <ul className="text-sm space-y-1" style={{color: '#f7ffff', opacity: 0.8}}>
                          {(analysisData?.analysis?.aiSummary?.keyHighlights || []).map((highlight, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <CheckCircle size={12} style={{color: '#08ce6b'}} className="mt-1 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2" style={{color: '#ef4444'}}>Main Concerns</h4>
                        <ul className="text-sm space-y-1" style={{color: '#f7ffff', opacity: 0.8}}>
                          {(analysisData?.analysis?.aiSummary?.mainConcerns || []).map((concern, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <AlertCircle size={12} style={{color: '#ef4444'}} className="mt-1 flex-shrink-0" />
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
                    <BarChart3 style={{color: '#0099ff'}} size={20} />
                    <h3 className="text-xl font-bold" style={{color: '#f7ffff'}}>Competitor Analysis</h3>
                  </div>
                  <div className="grid gap-4">
                    {competitorComparisons.map((competitor, idx) => (
                      <div key={idx} className="p-4 rounded-xl border transition-all duration-300" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-bold mb-1" style={{color: '#f7ffff'}}>{competitor.name}</h4>
                            <p className="text-sm" style={{color: '#0099ff'}}>{competitor.sector}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold" style={{color: '#08ce6b'}}>{competitor.arr} ARR</div>
                            <div className="text-sm" style={{color: '#0099ff'}}>{competitor.growth} growth</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <p className="text-xs uppercase tracking-wide" style={{color: '#f7ffff', opacity: 0.6}}>Funding</p>
                            <p className="font-semibold text-sm" style={{color: '#f7ffff'}}>{competitor.funding}</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wide" style={{color: '#f7ffff', opacity: 0.6}}>Valuation</p>
                            <p className="font-semibold text-sm" style={{color: '#f7ffff'}}>{competitor.valuation}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm font-semibold mb-2" style={{color: '#08ce6b'}}>Strengths</p>
                            <ul className="text-sm space-y-1" style={{color: '#f7ffff', opacity: 0.8}}>
                              {competitor.strengths.map((strength, i) => (
                                <li key={i} className="flex items-center space-x-2">
                                  <CheckCircle size={10} style={{color: '#08ce6b'}} />
                                  <span>{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-semibold mb-2" style={{color: '#ef4444'}}>Weaknesses</p>
                            <ul className="text-sm space-y-1" style={{color: '#f7ffff', opacity: 0.8}}>
                              {competitor.weaknesses.map((weakness, i) => (
                                <li key={i} className="flex items-center space-x-2">
                                  <XCircle size={10} style={{color: '#ef4444'}} />
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
                    <AlertTriangle style={{color: '#ef4444'}} size={20} />
                    <h3 className="text-xl font-bold" style={{color: '#f7ffff'}}>Risk Assessment</h3>
                  </div>
                  {enhancedRiskFlags.map((risk, idx) => (
                    <div key={idx} className="p-4 rounded-xl border transition-all duration-300" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full" style={{
                            backgroundColor: risk.severity === 'High' ? '#ef4444' :
                                           risk.severity === 'Medium' ? '#fa8524' : '#08ce6b'
                          }} />
                          <div>
                            <h4 className="text-lg font-bold" style={{color: '#f7ffff'}}>{risk.issue}</h4>
                            <p className="text-sm" style={{color: '#f7ffff', opacity: 0.8}}>{risk.type}</p>
                          </div>
                        </div>
                        <span className="px-2 py-1 rounded-lg text-xs font-bold border" style={{
                          backgroundColor: risk.severity === 'High' ? 'rgba(239, 68, 68, 0.2)' :
                                          risk.severity === 'Medium' ? 'rgba(250, 133, 36, 0.2)' : 'rgba(8, 206, 107, 0.2)',
                          color: risk.severity === 'High' ? '#ef4444' :
                                 risk.severity === 'Medium' ? '#fa8524' : '#08ce6b',
                          borderColor: risk.severity === 'High' ? '#ef4444' :
                                      risk.severity === 'Medium' ? '#fa8524' : '#08ce6b'
                        }}>
                          {risk.severity}
                        </span>
                      </div>
                      <p className="mb-3" style={{color: '#f7ffff', opacity: 0.8}}>{risk.description}</p>
                      <div className="p-3 rounded-xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                        <p className="text-sm mb-2" style={{color: '#f7ffff', opacity: 0.8}}><strong style={{color: '#0099ff'}}>Evidence:</strong> {risk.evidence}</p>
                        <p className="text-sm" style={{color: '#f7ffff', opacity: 0.8}}><strong style={{color: '#08ce6b'}}>Mitigation:</strong> {risk.mitigation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'growth' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Rocket style={{color: '#8d51ff'}} size={20} />
                    <h3 className="text-xl font-bold" style={{color: '#f7ffff'}}>Growth Potential</h3>
                  </div>

                  {/* Growth Factors */}
                  <div className="grid grid-cols-2 gap-4">
                    {growthPotentialData.factors.map((factor, idx) => (
                      <div key={idx} className="p-4 rounded-xl border transition-all duration-300" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-sm" style={{color: '#f7ffff'}}>{factor.name}</h4>
                          <div className="text-lg font-bold" style={{color: '#8d51ff'}}>{factor.score}/10</div>
                        </div>
                        <div className="w-full rounded-full h-2 mb-2" style={{backgroundColor: 'rgba(247, 255, 255, 0.1)'}}>
                          <div 
                            className="h-2 rounded-full transition-all duration-1000" 
                            style={{ width: `${factor.score * 10}%`, backgroundColor: '#8d51ff' }}
                          />
                        </div>
                        <p className="text-xs" style={{color: '#f7ffff', opacity: 0.8}}>{factor.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="text-lg font-bold mb-4 flex items-center space-x-2" style={{color: '#f7ffff'}}>
                      <Lightbulb style={{color: '#fa8524'}} size={18} />
                      <span>Key Recommendations</span>
                    </h4>
                    <div className="space-y-3">
                      {growthPotentialData.recommendations.map((rec, idx) => (
                        <div key={idx} className="p-4 rounded-xl border transition-all duration-300" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="px-2 py-1 rounded-lg text-xs font-bold border" style={{
                                  backgroundColor: rec.priority === 'High' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(250, 133, 36, 0.2)',
                                  color: rec.priority === 'High' ? '#ef4444' : '#fa8524',
                                  borderColor: rec.priority === 'High' ? '#ef4444' : '#fa8524'
                                }}>
                                  {rec.priority}
                                </span>
                                <span className="px-2 py-1 rounded-lg text-xs font-bold border" style={{backgroundColor: 'rgba(0, 153, 255, 0.2)', color: '#0099ff', borderColor: '#0099ff'}}>
                                  {rec.category}
                                </span>
                              </div>
                              <h5 className="text-lg font-bold" style={{color: '#f7ffff'}}>{rec.title}</h5>
                            </div>
                            <div className="text-right text-sm" style={{color: '#f7ffff', opacity: 0.8}}>
                              <Clock size={12} className="inline mr-1" />
                              {rec.timeline}
                            </div>
                          </div>
                          <p className="mb-3 text-sm" style={{color: '#f7ffff', opacity: 0.8}}>{rec.description}</p>
                          <div className="p-3 rounded-xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                            <p className="text-sm" style={{color: '#f7ffff', opacity: 0.8}}><strong style={{color: '#08ce6b'}}>Expected Impact:</strong> {rec.impact}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'financials' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <DollarSign className="text-green-400" size={20} />
                    <h3 className="text-xl font-bold text-white">Financial Analysis</h3>
                  </div>

                  {/* Revenue Overview */}
                  <div className="bg-gray-700/50 p-6 rounded-2xl border border-gray-600">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                      <TrendingUp className="text-green-400" size={16} />
                      <span>Revenue Overview</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-300 text-sm">Current Revenue</p>
                        <p className="text-2xl font-bold text-green-400">{financialData?.revenue?.current || 'N/A'}</p>
                        <p className="text-green-400 text-sm">{financialData?.revenue?.growth || 'N/A'} growth</p>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">Projection</p>
                        <p className="text-xl font-bold text-blue-400">{financialData?.revenue?.projection || 'N/A'}</p>
                      </div>
                    </div>
                    
                    {/* Revenue Breakdown */}
                    {financialData?.revenue?.breakdown && (
                      <div>
                        <h5 className="text-white font-semibold mb-3">Monthly Breakdown</h5>
                        <div className="grid grid-cols-3 gap-3">
                          {financialData.revenue.breakdown.map((item, idx) => (
                            <div key={idx} className="bg-gray-800/50 p-3 rounded-xl">
                              <p className="text-gray-300 text-xs">{item.month}</p>
                              <p className="text-white font-bold">${(item.value / 1000000).toFixed(1)}M</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Financial Metrics */}
                  <div className="bg-gray-700/50 p-6 rounded-2xl border border-gray-600">
                    <h4 className="text-lg font-bold text-white mb-4">Key Financial Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {(financialData?.metrics || []).map((metric, idx) => (
                        <div key={idx} className="bg-gray-800/50 p-4 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-300 text-sm">{metric.label}</p>
                            {metric.positive ? (
                              <ArrowUp className="text-green-400" size={14} />
                            ) : (
                              <ArrowDown className="text-red-400" size={14} />
                            )}
                          </div>
                          <p className="text-white font-bold text-lg">{metric.value}</p>
                          <p className={`text-sm ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                            {metric.change}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Funding Information */}
                  {financialData?.funding && (
                    <div className="bg-gray-700/50 p-6 rounded-2xl border border-gray-600">
                      <h4 className="text-lg font-bold text-white mb-4">Funding History</h4>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-gray-300 text-sm">Total Raised</p>
                          <p className="text-xl font-bold text-purple-400">{financialData.funding.totalRaised}</p>
                        </div>
                        <div>
                          <p className="text-gray-300 text-sm">Last Round</p>
                          <p className="text-lg font-bold text-blue-400">{financialData.funding.lastRound}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm mb-2">Key Investors</p>
                        <div className="flex flex-wrap gap-2">
                          {(financialData.funding.investors || []).map((investor, idx) => (
                            <span key={idx} className="bg-gray-800/50 px-3 py-1 rounded-lg text-xs text-gray-300">
                              {investor}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'team' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="text-blue-400" size={20} />
                    <h3 className="text-xl font-bold text-white">Team Analysis</h3>
                  </div>

                  {/* Team Overview */}
                  <div className="bg-gray-700/50 p-6 rounded-2xl border border-gray-600">
                    <h4 className="text-lg font-bold text-white mb-4">Team Overview</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-300 text-sm">Team Size</p>
                        <p className="text-2xl font-bold text-blue-400">{teamData?.size || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">Growth</p>
                        <p className="text-lg text-green-400">{teamData?.growth || 'N/A'}</p>
                      </div>
                    </div>
                    
                    {/* Department Breakdown */}
                    {teamData?.departments && (
                      <div>
                        <h5 className="text-white font-semibold mb-3">Department Breakdown</h5>
                        <div className="space-y-3">
                          {teamData.departments.map((dept, idx) => (
                            <div key={idx} className="bg-gray-800/50 p-3 rounded-xl">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-white font-medium">{dept.name}</span>
                                <span className="text-blue-400 font-bold">{dept.count}</span>
                              </div>
                              <div className="w-full bg-gray-600 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000" 
                                  style={{ width: `${dept.percentage}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Leadership Team */}
                  {teamData?.leadership && (
                    <div className="bg-gray-700/50 p-6 rounded-2xl border border-gray-600">
                      <h4 className="text-lg font-bold text-white mb-4">Leadership Team</h4>
                      <div className="space-y-4">
                        {teamData.leadership.map((leader, idx) => (
                          <div key={idx} className="bg-gray-800/50 p-4 rounded-xl border border-gray-600">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h5 className="text-white font-bold">{leader.name}</h5>
                                <p className="text-orange-400 font-medium">{leader.role}</p>
                              </div>
                              <User className="text-gray-400" size={20} />
                            </div>
                            <p className="text-gray-300 text-sm mb-2">{leader.experience}</p>
                            <p className="text-gray-400 text-xs">{leader.background}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Culture & Retention */}
                  {teamData?.culture && (
                    <div className="bg-gray-700/50 p-6 rounded-2xl border border-gray-600">
                      <h4 className="text-lg font-bold text-white mb-4">Culture & Retention</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-gray-300 text-sm">Culture</p>
                          <p className="text-white">{teamData.culture.satisfaction}</p>
                        </div>
                        <div>
                          <p className="text-gray-300 text-sm">Retention</p>
                          <p className="text-white">{teamData.culture.retention}</p>
                        </div>
                        <div>
                          <p className="text-gray-300 text-sm">Diversity</p>
                          <p className="text-white">{teamData.culture.diversity}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'market' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <TrendingUp className="text-purple-400" size={20} />
                    <h3 className="text-xl font-bold text-white">Market Analysis</h3>
                  </div>

                  {/* Market Size */}
                  {marketData?.size && (
                    <div className="bg-gray-700/50 p-6 rounded-2xl border border-gray-600">
                      <h4 className="text-lg font-bold text-white mb-4">Market Size</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-800/50 p-4 rounded-xl text-center">
                          <p className="text-gray-300 text-sm mb-2">TAM</p>
                          <p className="text-purple-400 font-bold text-lg">Total Addressable</p>
                          <p className="text-white text-sm">{marketData.size.tam}</p>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-xl text-center">
                          <p className="text-gray-300 text-sm mb-2">SAM</p>
                          <p className="text-blue-400 font-bold text-lg">Serviceable Available</p>
                          <p className="text-white text-sm">{marketData.size.sam}</p>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-xl text-center">
                          <p className="text-gray-300 text-sm mb-2">SOM</p>
                          <p className="text-green-400 font-bold text-lg">Serviceable Obtainable</p>
                          <p className="text-white text-sm">{marketData.size.som}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Market Trends */}
                  {marketData?.trends && (
                    <div className="bg-gray-700/50 p-6 rounded-2xl border border-gray-600">
                      <h4 className="text-lg font-bold text-white mb-4">Market Trends</h4>
                      <div className="space-y-3">
                        {marketData.trends.map((trend, idx) => (
                          <div key={idx} className="bg-gray-800/50 p-4 rounded-xl border border-gray-600">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-white font-medium">{trend.trend}</h5>
                              <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                                trend.impact === 'High' ? 'bg-red-900/40 text-red-400 border border-red-700' :
                                trend.impact === 'Medium' ? 'bg-yellow-900/40 text-yellow-400 border border-yellow-700' :
                                'bg-green-900/40 text-green-400 border border-green-700'
                              }`}>
                                {trend.impact} Impact
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm">{trend.timeline}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Customer Segments */}
                  {marketData?.customerSegments && (
                    <div className="bg-gray-700/50 p-6 rounded-2xl border border-gray-600">
                      <h4 className="text-lg font-bold text-white mb-4">Customer Segments</h4>
                      <div className="space-y-3">
                        {marketData.customerSegments.map((segment, idx) => (
                          <div key={idx} className="bg-gray-800/50 p-4 rounded-xl">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-white font-medium">{segment.segment}</span>
                              <span className="text-purple-400 font-bold">{segment.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-purple-500 h-2 rounded-full transition-all duration-1000" 
                                style={{ width: `${segment.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Competition Overview */}
                  {marketData?.competition && (
                    <div className="bg-gray-700/50 p-6 rounded-2xl border border-gray-600">
                      <h4 className="text-lg font-bold text-white mb-4">Competition Overview</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {marketData.competition.map((competitor, idx) => (
                          <div key={idx} className="bg-gray-800/50 p-4 rounded-xl border border-gray-600">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-white font-bold">{competitor.name}</h5>
                              <Building className="text-gray-400" size={16} />
                            </div>
                            <p className="text-gray-300 text-sm mb-1">Market Share: {competitor.marketShare}</p>
                            <p className="text-gray-300 text-sm mb-2">Funding: {competitor.funding}</p>
                            <p className="text-blue-400 text-sm font-medium">{competitor.strength}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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