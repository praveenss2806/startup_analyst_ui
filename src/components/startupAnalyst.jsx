import React, { useState, useEffect, useRef } from 'react';
import PDFExport from './PDFExport';
import { uploadFile, analyzeStartup } from '../api';
import { PDFDocument } from 'pdf-lib';
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
  const [showRecommendationTooltip, setShowRecommendationTooltip] = useState(false);
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

  // Reset all state for new analysis
  const handleNewAnalysis = () => {
    setAppState('upload');
    setUploadedFile(null);
    setUploadResponse(null);
    setUploadError(null);
    setAnalysisData(null);
    setAnalysisError(null);
    analysisStartedRef.current = false;
    setLoadingStage(0);
    setLoadingProgress(0);
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

  // Helper function to check and truncate PDF to 30 pages
  const truncatePDFTo30Pages = async (file) => {
    try {
      // Read the PDF file
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      const pageCount = pdfDoc.getPageCount();
      
      // If PDF has 30 or fewer pages, return the original file
      if (pageCount <= 30) {
        return file;
      }
      
      // Create a new PDF with only the first 30 pages
      const newPdfDoc = await PDFDocument.create();
      const pages = await newPdfDoc.copyPages(pdfDoc, Array.from({length: 30}, (_, i) => i));
      
      pages.forEach(page => {
        newPdfDoc.addPage(page);
      });
      
      // Save the truncated PDF
      const pdfBytes = await newPdfDoc.save();
      
      // Create a new File object with the truncated PDF
      const truncatedFile = new File(
        [pdfBytes], 
        file.name, 
        { type: 'application/pdf' }
      );
      
      return truncatedFile;
    } catch (error) {
      console.error('Error truncating PDF:', error);
      // If there's an error, return the original file
      return file;
    }
  };

  const handleFileUpload = async (file) => {
    const allowedTypes = [
      'application/pdf',
      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
      'audio/wave',
      'audio/x-wav',
      'audio/mp4',
      'audio/m4a',
      'audio/x-m4a',
      'audio/ogg',
      'audio/flac',
      'audio/webm'
    ];
    
    if (!file || !allowedTypes.includes(file.type)) {
      setUploadError('Please upload a PDF or audio file (MP3, WAV, M4A, OGG, FLAC)');
      return;
    }
    
    if (file.size > 50 * 1024 * 1024) {
      setUploadError('File size exceeds 50MB limit');
      return;
    }

    setUploadError(null);
    setLoadingStage(0);
    setLoadingProgress(0);
    setAnalysisData(null);
    setAnalysisError(null);
    analysisStartedRef.current = false;
    setAppState('loading');

    try {
      let fileToUpload = file;
      
      // If it's a PDF, check and truncate to 30 pages if needed
      if (file.type === 'application/pdf') {
        fileToUpload = await truncatePDFTo30Pages(file);
      }
      
      setUploadedFile(fileToUpload);
      
      // Call the real upload API
      const result = await uploadFile(fileToUpload);
      
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
      <div className="min-h-screen max-h-screen overflow-y-auto flex flex-col lg:flex-row" style={{backgroundColor: '#192452'}}>
        {/* Left side with logo */}
        <div className="w-full lg:w-1/3 flex items-center justify-center py-6 sm:py-8 lg:py-0 px-4 lg:px-0 min-h-[150px] sm:min-h-[200px] lg:min-h-screen" style={{backgroundColor: '#192452'}}>
          <div className="flex items-center justify-center">
            <LAXLogo size={60} className="sm:w-20 sm:h-20 lg:w-48 lg:h-48" />
          </div>
        </div>
        
        {/* Right side with upload form */}
        <div className="w-full lg:w-2/3 flex items-center justify-center py-6 sm:py-8 lg:py-0 px-4 sm:px-6 lg:px-6 min-h-screen lg:min-h-0 overflow-y-auto" style={{backgroundColor: '#f7ffff'}}>
          <div className="max-w-xl w-full">
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <h1 className="text-xl sm:text-2xl lg:text-5xl font-bold mb-2 sm:mb-3 lg:mb-4" style={{color: '#192452'}}>
                LetsAnalyse
              </h1>
              <p className="text-sm sm:text-base lg:text-xl max-w-lg mx-auto px-2 sm:px-4" style={{color: '#192452', opacity: 0.8}}>
                Upload your pitch deck and get instant AI-powered Startup analysis
              </p>
            </div>

            <div 
              className={`border-2 border-dashed rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 text-center transition-all duration-500 mx-2 sm:mx-4 lg:mx-0 ${
                isDragOver 
                  ? 'scale-105 shadow-2xl' 
                  : 'hover:shadow-xl active:scale-95'
              }`}
              style={{
                backgroundColor: isDragOver ? 'rgba(0, 153, 255, 0.1)' : 'rgba(25, 36, 82, 0.05)',
                borderColor: isDragOver ? '#0099ff' : '#8d51ff',
                minHeight: '280px'
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <CloudUpload className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-5 lg:mb-6 transition-all duration-300`} 
                style={{color: isDragOver ? '#0099ff' : '#8d51ff'}} />
              
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 lg:mb-3" style={{color: '#192452'}}>
                {isDragOver ? 'Drop your pitch deck here' : 'Upload Pitch Deck'}
              </h3>
              
              <p className="mb-6 sm:mb-7 lg:mb-8 text-sm sm:text-base lg:text-lg px-2 leading-relaxed" style={{color: '#192452', opacity: 0.7}}>
                Drag and drop your PDF or audio file here, or click to browse
              </p>
              
              <label className="inline-flex items-center px-6 sm:px-7 lg:px-8 py-3 sm:py-3.5 lg:py-4 text-white font-semibold rounded-xl lg:rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg text-base sm:text-base lg:text-base min-h-[48px] touch-manipulation"
                style={{backgroundColor: '#0099ff'}}>
                <Upload size={16} className="mr-2 lg:mr-3" />
                Choose File
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.mp3,.wav,.m4a,.ogg,.flac,.webm"
                  onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
                />
              </label>
              
              <p className="text-xs sm:text-sm lg:text-sm mt-4 sm:mt-5 lg:mt-6 flex items-center justify-center space-x-2 px-2" style={{color: '#192452', opacity: 0.6}}>
                <Shield size={12} style={{color: '#08ce6b'}} />
                <span>Supports PDF & audio files (MP3, WAV, M4A, OGG, FLAC) up to 50MB</span>
              </p>
              
              {uploadError && (
                <div className="mt-4 sm:mt-5 lg:mt-6 p-3 sm:p-4 lg:p-4 border rounded-xl mx-0" style={{backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#ef4444'}}>
                  <div className="flex items-center space-x-2">
                    <AlertCircle size={14} style={{color: '#ef4444'}} />
                    <span className="text-sm sm:text-sm lg:text-sm" style={{color: '#ef4444'}}>{uploadError}</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Add some bottom padding for mobile */}
            <div className="h-6 sm:h-8 lg:h-0"></div>
          </div>
        </div>
      </div>
    );
  }

  function renderLoadingPage() {
    return (
      <div className="min-h-screen max-h-screen overflow-y-auto flex items-center justify-center px-4" style={{backgroundColor: '#192452'}}>
        <div className="text-center max-w-md w-full">
          {/* Animated Brain/Analysis Icon */}
          <div className="relative mb-8 sm:mb-10 lg:mb-12">
            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto relative">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-3 sm:border-4 border-transparent animate-spin" 
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
                <Brain size={32} className="sm:w-10 sm:h-10 lg:w-12 lg:h-12" style={{color: '#f7ffff'}} />
              </div>
              
              {/* Floating particles */}
              <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce" 
                style={{backgroundColor: '#0099ff', animationDelay: '0s'}}></div>
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce" 
                style={{backgroundColor: '#8d51ff', animationDelay: '0.5s'}}></div>
              <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce" 
                style={{backgroundColor: '#fa8524', animationDelay: '1s'}}></div>
              <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce" 
                style={{backgroundColor: '#08ce6b', animationDelay: '1.5s'}}></div>
            </div>
          </div>
          
          {/* Loading Text */}
          <div className="mb-6 sm:mb-8 px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4" style={{color: '#f7ffff'}}>
              Analyzing Your Startup
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-2 leading-relaxed" style={{color: '#f7ffff', opacity: 0.8}}>
              Our AI is diving deep into your pitch deck
            </p>
            <p className="text-sm sm:text-base lg:text-lg" style={{color: '#0099ff'}}>
              This may take 3-5 minutes for comprehensive analysis
            </p>
          </div>
          
          {/* Animated Progress Waves */}
          <div className="flex justify-center space-x-1.5 sm:space-x-2 mb-8">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-1 rounded-full animate-pulse"
                style={{
                  height: '32px',
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
              onClick={handleNewAnalysis}
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
      <div className="min-h-screen max-h-screen text-white flex flex-col" style={{backgroundColor: '#192452'}}>
        {/* Header */}
        <header className="border-b px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex-shrink-0 shadow-lg" style={{backgroundColor: '#192452', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <div className="flex items-center justify-center flex-shrink-0">
                <LAXLogo size={20} className="sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg lg:text-xl font-bold truncate" style={{color: '#f7ffff'}}>LetsAnalyse</h1>
                <p className="text-xs hidden sm:block" style={{color: '#f7ffff', opacity: 0.7}}>AI Startup Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-3 flex-shrink-0">
              <button 
                onClick={exportToPDF}
                className="text-white px-2.5 sm:px-3 lg:px-4 py-2 rounded-lg sm:rounded-xl flex items-center space-x-1 lg:space-x-2 transition-all duration-300 font-medium shadow-lg hover:scale-105 active:scale-95 text-xs sm:text-sm lg:text-base min-h-[36px] sm:min-h-[40px] touch-manipulation"
                style={{backgroundColor: '#08ce6b'}}
              >
                <Download size={12} className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                <span className="hidden md:inline">Export as PDF</span>
              </button>
              <button 
                onClick={handleNewAnalysis}
                className="text-white px-2.5 sm:px-3 lg:px-4 py-2 rounded-lg sm:rounded-xl flex items-center space-x-1 lg:space-x-2 transition-all duration-300 font-medium shadow-lg hover:scale-105 active:scale-95 text-xs sm:text-sm lg:text-base min-h-[36px] sm:min-h-[40px] touch-manipulation"
                style={{backgroundColor: '#0099ff'}}
              >
                <Upload size={12} className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                <span>New Analysis</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-3 sm:p-4 lg:p-6 w-full overflow-y-auto">
          {/* Compact Startup Header */}
          <div className="border rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 mb-3 sm:mb-4 lg:mb-6 flex-shrink-0 shadow-lg" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
            <div className="flex flex-col space-y-3 sm:space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
              <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#0099ff'}}>
                  <Building className="text-white" size={14} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold truncate" style={{color: '#f7ffff'}}>{analyzedStartup.name}</h2>
                  <p className="text-xs sm:text-sm truncate" style={{color: '#f7ffff', opacity: 0.8}}>{analyzedStartup.tagline}</p>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 lg:gap-4 text-xs mt-1" style={{color: '#f7ffff', opacity: 0.6}}>
                    <span className="flex items-center space-x-1">
                      <MapPin size={8} className="sm:w-2.5 sm:h-2.5" />
                      <span className="text-xs">{analyzedStartup.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar size={8} className="sm:w-2.5 sm:h-2.5" />
                      <span className="text-xs">{analyzedStartup.founded}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users size={8} className="sm:w-2.5 sm:h-2.5" />
                      <span className="text-xs">{analyzedStartup.employees} employees</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center sm:text-right flex-shrink-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1" style={{color: '#08ce6b'}}>
                  {analyzedStartup.investmentScore}/10
                </div>
                <div className="text-xs mb-2" style={{color: '#f7ffff', opacity: 0.6}}>Investment Score</div>
                <div className="relative inline-block">
                  <span 
                    className="inline-flex items-center px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl text-xs font-bold border max-w-[200px] sm:max-w-[250px] lg:max-w-[300px] cursor-help" 
                    style={{backgroundColor: 'rgba(8, 206, 107, 0.2)', color: '#08ce6b', borderColor: '#08ce6b'}}
                    onMouseEnter={() => setShowRecommendationTooltip(true)}
                    onMouseLeave={() => setShowRecommendationTooltip(false)}
                  >
                    <Crown size={8} className="mr-1 flex-shrink-0 sm:w-2.5 sm:h-2.5" />
                  <span className="truncate text-xs">{analyzedStartup.recommendation}</span>
                </span>
                  {showRecommendationTooltip && (
                    <div 
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs rounded-lg shadow-lg whitespace-normal max-w-xs z-50"
                      style={{
                        backgroundColor: '#192452',
                        color: '#f7ffff',
                        border: '1px solid rgba(8, 206, 107, 0.3)'
                      }}
                    >
                      {analyzedStartup.recommendation}
                      <div 
                        className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
                        style={{
                          borderLeft: '6px solid transparent',
                          borderRight: '6px solid transparent',
                          borderTop: '6px solid #192452'
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border rounded-xl sm:rounded-2xl flex-1 flex flex-col overflow-hidden shadow-lg" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
            <div className="border-b flex-shrink-0" style={{borderColor: 'rgba(247, 255, 255, 0.1)'}}>
              <nav className="flex overflow-x-auto scrollbar-thin space-x-0.5 sm:space-x-1 px-2 sm:px-3 lg:px-6 py-2 sm:py-2.5" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                {[
                  { id: 'overview', label: 'Overview', icon: Eye, shortLabel: 'Overview' },
                  { id: 'competitors', label: 'Competitors', icon: BarChart3, shortLabel: 'Compete' },
                  { id: 'risks', label: 'Risks', icon: AlertTriangle, shortLabel: 'Risks' },
                  { id: 'growth', label: 'Growth', icon: Rocket, shortLabel: 'Growth' },
                  { id: 'financials', label: 'Financials', icon: DollarSign, shortLabel: 'Finance' },
                  { id: 'team', label: 'Team', icon: Users, shortLabel: 'Team' },
                  { id: 'market', label: 'Market', icon: TrendingUp, shortLabel: 'Market' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-1 sm:space-x-1.5 lg:space-x-2 px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm lg:text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 min-h-[36px] sm:min-h-[40px] touch-manipulation`}
                    style={{
                      backgroundColor: activeTab === tab.id ? '#0099ff' : 'transparent',
                      color: activeTab === tab.id ? '#f7ffff' : '#f7ffff',
                      opacity: activeTab === tab.id ? 1 : 0.7
                    }}
                  >
                    <tab.icon size={12} className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 flex-shrink-0" />
                    <span className="hidden xs:inline sm:hidden">{tab.shortLabel}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-3 sm:p-4 lg:p-6 flex-1 overflow-y-auto" style={{scrollbarWidth: 'thin', scrollbarColor: 'rgba(247, 255, 255, 0.3) rgba(247, 255, 255, 0.1)'}}>
              {activeTab === 'overview' && (
                <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                    {Object.entries(keyMetrics).map(([key, metric], index) => (
                      <div key={key} className="border rounded-lg sm:rounded-xl p-2.5 sm:p-3 lg:p-4 transition-all duration-300" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                          <h4 className="font-bold uppercase text-xs tracking-wider" style={{color: '#f7ffff', opacity: 0.7}}>
                            {key === 'arr' ? 'ARR' : key === 'cac' ? 'CAC' : key.charAt(0).toUpperCase() + key.slice(1)}
                          </h4>
                          <ArrowUp style={{color: '#08ce6b'}} size={10} className="sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                        </div>
                        <p className="text-base sm:text-lg lg:text-2xl font-bold mb-1" style={{color: '#f7ffff'}}>{metric.value}</p>
                        <p className="text-xs font-semibold" style={{color: '#08ce6b'}}>{metric.change}</p>
                      </div>
                    ))}
                  </div>

                  {/* Benchmarks */}
                  {benchmarks && benchmarks.length > 0 && (
                    <div className="border p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl transition-all duration-300" style={{backgroundColor: 'rgba(141, 81, 255, 0.1)', borderColor: '#8d51ff'}}>
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                        <BarChart3 style={{color: '#8d51ff'}} size={16} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
                        <h3 className="text-lg sm:text-xl font-bold" style={{color: '#f7ffff'}}>Performance Benchmarks</h3>
                      </div>
                      <div className="grid grid-cols-1 gap-2.5 sm:gap-3 lg:grid-cols-2 lg:gap-4">
                        {benchmarks.map((benchmark, idx) => (
                          <div key={idx} className="p-3 sm:p-4 rounded-lg sm:rounded-xl" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)'}}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 space-y-1 sm:space-y-0">
                              <p className="text-sm" style={{color: '#f7ffff', opacity: 0.8}}>{benchmark.metric}</p>
                              <span className="px-2 py-1 rounded-lg text-xs font-bold border self-start sm:self-auto" style={{
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
                            <p className="font-bold text-sm sm:text-base" style={{color: '#f7ffff'}}>{benchmark.value}</p>
                            <p className="text-xs" style={{color: '#f7ffff', opacity: 0.6}}>vs {benchmark.benchmark}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Investment Summary */}
                  <div className="border p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl transition-all duration-300" style={{backgroundColor: 'rgba(0, 153, 255, 0.1)', borderColor: '#0099ff'}}>
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                      <Brain style={{color: '#0099ff'}} size={16} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
                      <h3 className="text-lg sm:text-xl font-bold" style={{color: '#f7ffff'}}>AI Investment Summary</h3>
                    </div>
                    <p className="leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base" style={{color: '#f7ffff', opacity: 0.8}}>
                      {analysisData?.analysis?.aiSummary?.investmentThesis || 'Analysis in progress...'}
                    </p>
                    <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm sm:text-base" style={{color: '#08ce6b'}}>Key Highlights</h4>
                        <ul className="text-sm space-y-1.5 sm:space-y-2" style={{color: '#f7ffff', opacity: 0.8}}>
                          {(analysisData?.analysis?.aiSummary?.keyHighlights || []).map((highlight, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <CheckCircle size={10} className="sm:w-3 sm:h-3" style={{color: '#08ce6b'}} />
                              <span className="text-xs sm:text-sm leading-relaxed">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm sm:text-base" style={{color: '#ef4444'}}>Main Concerns</h4>
                        <ul className="text-sm space-y-1.5 sm:space-y-2" style={{color: '#f7ffff', opacity: 0.8}}>
                          {(analysisData?.analysis?.aiSummary?.mainConcerns || []).map((concern, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <AlertCircle size={10} className="sm:w-3 sm:h-3" style={{color: '#ef4444'}} />
                              <span className="text-xs sm:text-sm leading-relaxed">{concern}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'competitors' && (
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <BarChart3 style={{color: '#0099ff'}} size={16} className="sm:w-5 sm:h-5" />
                    <h3 className="text-lg sm:text-xl font-bold" style={{color: '#f7ffff'}}>Competitor Analysis</h3>
                  </div>
                  <div className="grid gap-3 sm:gap-4">
                    {competitorComparisons.map((competitor, idx) => (
                      <div key={idx} className="p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all duration-300" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-base sm:text-lg font-bold mb-1" style={{color: '#f7ffff'}}>{competitor.name}</h4>
                            <p className="text-xs sm:text-sm" style={{color: '#0099ff'}}>{competitor.sector}</p>
                          </div>
                          <div className="text-left sm:text-right flex-shrink-0">
                            <div className="text-sm sm:text-lg font-bold" style={{color: '#08ce6b'}}>{competitor.arr} ARR</div>
                            <div className="text-xs sm:text-sm" style={{color: '#0099ff'}}>{competitor.growth} growth</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3">
                          <div>
                            <p className="text-xs uppercase tracking-wide" style={{color: '#f7ffff', opacity: 0.6}}>Funding</p>
                            <p className="font-semibold text-xs sm:text-sm" style={{color: '#f7ffff'}}>{competitor.funding}</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wide" style={{color: '#f7ffff', opacity: 0.6}}>Valuation</p>
                            <p className="font-semibold text-xs sm:text-sm" style={{color: '#f7ffff'}}>{competitor.valuation}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs sm:text-sm font-semibold mb-2" style={{color: '#08ce6b'}}>Strengths</p>
                            <ul className="text-xs sm:text-sm space-y-1" style={{color: '#f7ffff', opacity: 0.8}}>
                              {competitor.strengths.map((strength, i) => (
                                <li key={i} className="flex items-start space-x-2">
                                  <CheckCircle size={8} className="sm:w-2.5 sm:h-2.5 mt-0.5 flex-shrink-0" style={{color: '#08ce6b'}} />
                                  <span className="leading-relaxed">{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-semibold mb-2" style={{color: '#ef4444'}}>Weaknesses</p>
                            <ul className="text-xs sm:text-sm space-y-1" style={{color: '#f7ffff', opacity: 0.8}}>
                              {competitor.weaknesses.map((weakness, i) => (
                                <li key={i} className="flex items-start space-x-2">
                                  <XCircle size={8} className="sm:w-2.5 sm:h-2.5 mt-0.5 flex-shrink-0" style={{color: '#ef4444'}} />
                                  <span className="leading-relaxed">{weakness}</span>
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
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <AlertTriangle style={{color: '#ef4444'}} size={16} className="sm:w-5 sm:h-5" />
                    <h3 className="text-lg sm:text-xl font-bold" style={{color: '#f7ffff'}}>Risk Assessment</h3>
                  </div>
                  {enhancedRiskFlags.map((risk, idx) => (
                    <div key={idx} className="p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all duration-300" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-2 sm:space-y-0">
                        <div className="flex items-start space-x-2 sm:space-x-3 min-w-0 flex-1">
                          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 mt-1" style={{
                            backgroundColor: risk.severity === 'High' ? '#ef4444' :
                                           risk.severity === 'Medium' ? '#fa8524' : '#08ce6b'
                          }} />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm sm:text-base lg:text-lg font-bold leading-tight" style={{color: '#f7ffff'}}>{risk.issue}</h4>
                            <p className="text-xs sm:text-sm" style={{color: '#f7ffff', opacity: 0.8}}>{risk.type}</p>
                          </div>
                        </div>
                        <span className="px-2 py-1 rounded-lg text-xs font-bold border self-start sm:self-auto flex-shrink-0" style={{
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
                      <p className="mb-3 text-xs sm:text-sm leading-relaxed" style={{color: '#f7ffff', opacity: 0.8}}>{risk.description}</p>
                      <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                        <p className="text-xs sm:text-sm mb-2 leading-relaxed" style={{color: '#f7ffff', opacity: 0.8}}><strong style={{color: '#0099ff'}}>Evidence:</strong> {risk.evidence}</p>
                        <p className="text-xs sm:text-sm leading-relaxed" style={{color: '#f7ffff', opacity: 0.8}}><strong style={{color: '#08ce6b'}}>Mitigation:</strong> {risk.mitigation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'growth' && (
                <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <Rocket style={{color: '#8d51ff'}} size={16} className="sm:w-5 sm:h-5" />
                    <h3 className="text-lg sm:text-xl font-bold" style={{color: '#f7ffff'}}>Growth Potential</h3>
                  </div>

                  {/* Growth Factors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {(growthPotentialData.factors || []).map((factor, idx) => (
                      <div key={idx} className="p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all duration-300" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-xs sm:text-sm" style={{color: '#f7ffff'}}>{factor.name}</h4>
                          <div className="text-sm sm:text-lg font-bold" style={{color: '#8d51ff'}}>{factor.score}/10</div>
                        </div>
                        <div className="w-full rounded-full h-1.5 sm:h-2 mb-2" style={{backgroundColor: 'rgba(247, 255, 255, 0.1)'}}>
                          <div 
                            className="h-1.5 sm:h-2 rounded-full transition-all duration-1000" 
                            style={{ width: `${factor.score * 10}%`, backgroundColor: '#8d51ff' }}
                          />
                        </div>
                        <p className="text-xs leading-relaxed" style={{color: '#f7ffff', opacity: 0.8}}>{factor.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center space-x-2" style={{color: '#f7ffff'}}>
                      <Lightbulb style={{color: '#fa8524'}} size={16} className="sm:w-4.5 sm:h-4.5" />
                      <span>Key Recommendations</span>
                    </h4>
                    <div className="space-y-3">
                      {(growthPotentialData.recommendations || []).map((rec, idx) => (
                        <div key={idx} className="p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all duration-300" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-2 sm:space-y-0">
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
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
                              <h5 className="text-sm sm:text-base lg:text-lg font-bold leading-tight" style={{color: '#f7ffff'}}>{rec.title}</h5>
                            </div>
                            <div className="text-left sm:text-right text-xs sm:text-sm flex-shrink-0" style={{color: '#f7ffff', opacity: 0.8}}>
                              <Clock size={10} className="inline mr-1 sm:w-3 sm:h-3" />
                              {rec.timeline}
                            </div>
                          </div>
                          <p className="mb-3 text-xs sm:text-sm leading-relaxed" style={{color: '#f7ffff', opacity: 0.8}}>{rec.description}</p>
                          <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                            <p className="text-xs sm:text-sm leading-relaxed" style={{color: '#f7ffff', opacity: 0.8}}><strong style={{color: '#08ce6b'}}>Expected Impact:</strong> {rec.impact}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'financials' && (
                <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <DollarSign style={{color: '#08ce6b'}} size={16} className="sm:w-5 sm:h-5" />
                    <h3 className="text-lg sm:text-xl font-bold" style={{color: '#f7ffff'}}>Financial Analysis</h3>
                  </div>

                  {/* Revenue Overview */}
                  <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                    <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center space-x-2" style={{color: '#f7ffff'}}>
                      <TrendingUp style={{color: '#08ce6b'}} size={14} className="sm:w-4 sm:h-4" />
                      <span>Revenue Overview</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div>
                        <p className="text-xs sm:text-sm" style={{color: '#f7ffff', opacity: 0.6}}>Current Revenue</p>
                        <p className="text-lg sm:text-2xl font-bold" style={{color: '#08ce6b'}}>{financialData?.revenue?.current || 'N/A'}</p>
                        <p className="text-xs sm:text-sm" style={{color: '#08ce6b'}}>{financialData?.revenue?.growth || 'N/A'} growth</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm" style={{color: '#f7ffff', opacity: 0.6}}>Projection</p>
                        <p className="text-base sm:text-xl font-bold" style={{color: '#0099ff'}}>{financialData?.revenue?.projection || 'N/A'}</p>
                      </div>
                    </div>
                    
                    {/* Revenue Breakdown */}
                    {financialData?.revenue?.breakdown && (
                      <div>
                        <h5 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base" style={{color: '#f7ffff'}}>Monthly Breakdown</h5>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                          {financialData.revenue.breakdown.map((item, idx) => (
                            <div key={idx} className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)'}}>
                              <p className="text-xs" style={{color: '#f7ffff', opacity: 0.6}}>{item.month}</p>
                              <p className="font-bold text-xs sm:text-sm" style={{color: '#f7ffff'}}>${(item.value / 1000000).toFixed(1)}M</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Financial Metrics */}
                  <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                    <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{color: '#f7ffff'}}>Key Financial Metrics</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {(financialData?.metrics || []).map((metric, idx) => (
                        <div key={idx} className="p-3 sm:p-4 rounded-lg sm:rounded-xl" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)'}}>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs sm:text-sm" style={{color: '#f7ffff', opacity: 0.6}}>{metric.label}</p>
                            {metric.positive ? (
                              <ArrowUp style={{color: '#08ce6b'}} size={12} className="sm:w-3.5 sm:h-3.5" />
                            ) : (
                              <ArrowDown style={{color: '#ef4444'}} size={12} className="sm:w-3.5 sm:h-3.5" />
                            )}
                          </div>
                          <p className="font-bold text-sm sm:text-lg" style={{color: '#f7ffff'}}>{metric.value}</p>
                          <p className={`text-xs sm:text-sm`} style={{color: metric.positive ? '#08ce6b' : '#ef4444'}}>
                            {metric.change}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Funding Information */}
                  {financialData?.funding && (
                    <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                      <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{color: '#f7ffff'}}>Funding History</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div>
                          <p className="text-xs sm:text-sm" style={{color: '#f7ffff', opacity: 0.6}}>Total Raised</p>
                          <p className="text-base sm:text-xl font-bold" style={{color: '#8d51ff'}}>{financialData.funding.totalRaised}</p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm" style={{color: '#f7ffff', opacity: 0.6}}>Last Round</p>
                          <p className="text-sm sm:text-lg font-bold" style={{color: '#0099ff'}}>{financialData.funding.lastRound}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm mb-2" style={{color: '#f7ffff', opacity: 0.6}}>Key Investors</p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {(financialData.funding.investors || []).map((investor, idx) => (
                            <span key={idx} className="px-2 sm:px-3 py-1 rounded-lg text-xs" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', color: '#f7ffff', opacity: 0.8}}>
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
                <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <Users style={{color: '#0099ff'}} size={16} className="sm:w-5 sm:h-5" />
                    <h3 className="text-lg sm:text-xl font-bold" style={{color: '#f7ffff'}}>Team Analysis</h3>
                  </div>

                  {/* Team Overview */}
                  <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                    <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{color: '#f7ffff'}}>Team Overview</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div>
                        <p className="text-xs sm:text-sm" style={{color: '#f7ffff', opacity: 0.6}}>Team Size</p>
                        <p className="text-lg sm:text-2xl font-bold" style={{color: '#0099ff'}}>{teamData?.size || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm" style={{color: '#f7ffff', opacity: 0.6}}>Growth</p>
                        <p className="text-base sm:text-lg" style={{color: '#08ce6b'}}>{teamData?.growth || 'N/A'}</p>
                      </div>
                    </div>
                    
                    {/* Department Breakdown */}
                    {teamData?.departments && (
                      <div>
                        <h5 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base" style={{color: '#f7ffff'}}>Department Breakdown</h5>
                        <div className="space-y-2.5 sm:space-y-3">
                          {teamData.departments.map((dept, idx) => (
                            <div key={idx} className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)'}}>
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-xs sm:text-sm" style={{color: '#f7ffff'}}>{dept.name}</span>
                                <span className="font-bold text-xs sm:text-sm" style={{color: '#0099ff'}}>{dept.count}</span>
                              </div>
                              <div className="w-full rounded-full h-1.5 sm:h-2" style={{backgroundColor: 'rgba(247, 255, 255, 0.1)'}}>
                                <div 
                                  className="h-1.5 sm:h-2 rounded-full transition-all duration-1000" 
                                  style={{ width: `${dept.percentage}%`, backgroundColor: '#0099ff' }}
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
                    <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                      <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{color: '#f7ffff'}}>Leadership Team</h4>
                      <div className="space-y-3 sm:space-y-4">
                        {teamData.leadership.map((leader, idx) => (
                          <div key={idx} className="p-3 sm:p-4 rounded-lg sm:rounded-xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                            <div className="flex items-start justify-between mb-2 sm:mb-3">
                              <div className="min-w-0 flex-1">
                                <h5 className="font-bold text-sm sm:text-base" style={{color: '#f7ffff'}}>{leader.name}</h5>
                                <p className="font-medium text-xs sm:text-sm" style={{color: '#fa8524'}}>{leader.role}</p>
                              </div>
                              <User style={{color: '#f7ffff', opacity: 0.4}} size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                            </div>
                            <p className="text-xs sm:text-sm mb-2 leading-relaxed" style={{color: '#f7ffff', opacity: 0.8}}>{leader.experience}</p>
                            <p className="text-xs leading-relaxed" style={{color: '#f7ffff', opacity: 0.6}}>{leader.background}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Culture & Retention */}
                  {teamData?.culture && (
                    <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                      <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{color: '#f7ffff'}}>Culture & Retention</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs sm:text-sm" style={{color: '#f7ffff', opacity: 0.6}}>Culture</p>
                          <p className="text-sm sm:text-base" style={{color: '#f7ffff'}}>{teamData.culture.satisfaction}</p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm" style={{color: '#f7ffff', opacity: 0.6}}>Retention</p>
                          <p className="text-sm sm:text-base" style={{color: '#f7ffff'}}>{teamData.culture.retention}</p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm" style={{color: '#f7ffff', opacity: 0.6}}>Diversity</p>
                          <p className="text-sm sm:text-base" style={{color: '#f7ffff'}}>{teamData.culture.diversity}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'market' && (
                <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <TrendingUp style={{color: '#8d51ff'}} size={16} className="sm:w-5 sm:h-5" />
                    <h3 className="text-lg sm:text-xl font-bold" style={{color: '#f7ffff'}}>Market Analysis</h3>
                  </div>

                  {/* Market Size */}
                  {marketData?.size && (
                    <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                      <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{color: '#f7ffff'}}>Market Size</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl text-center" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)'}}>
                          <p className="text-xs sm:text-sm mb-1 sm:mb-2" style={{color: '#f7ffff', opacity: 0.6}}>TAM</p>
                          <p className="font-bold text-sm sm:text-base lg:text-lg" style={{color: '#8d51ff'}}>Total Addressable</p>
                          <p className="text-xs sm:text-sm" style={{color: '#f7ffff'}}>{marketData.size.tam}</p>
                        </div>
                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl text-center" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)'}}>
                          <p className="text-xs sm:text-sm mb-1 sm:mb-2" style={{color: '#f7ffff', opacity: 0.6}}>SAM</p>
                          <p className="font-bold text-sm sm:text-base lg:text-lg" style={{color: '#0099ff'}}>Serviceable Available</p>
                          <p className="text-xs sm:text-sm" style={{color: '#f7ffff'}}>{marketData.size.sam}</p>
                        </div>
                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl text-center" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)'}}>
                          <p className="text-xs sm:text-sm mb-1 sm:mb-2" style={{color: '#f7ffff', opacity: 0.6}}>SOM</p>
                          <p className="font-bold text-sm sm:text-base lg:text-lg" style={{color: '#08ce6b'}}>Serviceable Obtainable</p>
                          <p className="text-xs sm:text-sm" style={{color: '#f7ffff'}}>{marketData.size.som}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Market Trends */}
                  {marketData?.trends && (
                    <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                      <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{color: '#f7ffff'}}>Market Trends</h4>
                      <div className="space-y-2.5 sm:space-y-3">
                        {marketData.trends.map((trend, idx) => (
                          <div key={idx} className="p-3 sm:p-4 rounded-lg sm:rounded-xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-2 sm:space-y-0">
                              <h5 className="font-medium text-sm sm:text-base" style={{color: '#f7ffff'}}>{trend.trend}</h5>
                              <span className={`px-2 py-1 rounded-lg text-xs font-bold border self-start sm:self-auto ${
                                trend.impact === 'High' ? '' : trend.impact === 'Medium' ? '' : ''
                              }`} style={{
                                backgroundColor: trend.impact === 'High' ? 'rgba(239, 68, 68, 0.2)' : trend.impact === 'Medium' ? 'rgba(250, 133, 36, 0.2)' : 'rgba(8, 206, 107, 0.2)',
                                color: trend.impact === 'High' ? '#ef4444' : trend.impact === 'Medium' ? '#fa8524' : '#08ce6b',
                                borderColor: trend.impact === 'High' ? '#ef4444' : trend.impact === 'Medium' ? '#fa8524' : '#08ce6b'
                              }}>
                                {trend.impact} Impact
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm" style={{color: '#f7ffff', opacity: 0.8}}>{trend.timeline}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Customer Segments */}
                  {marketData?.customerSegments && (
                    <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                      <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{color: '#f7ffff'}}>Customer Segments</h4>
                      <div className="space-y-2.5 sm:space-y-3">
                        {marketData.customerSegments.map((segment, idx) => (
                          <div key={idx} className="p-3 sm:p-4 rounded-lg sm:rounded-xl" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)'}}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-xs sm:text-sm" style={{color: '#f7ffff'}}>{segment.segment}</span>
                              <span className="font-bold text-xs sm:text-sm" style={{color: '#8d51ff'}}>{segment.percentage}%</span>
                            </div>
                            <div className="w-full rounded-full h-1.5 sm:h-2" style={{backgroundColor: 'rgba(247, 255, 255, 0.1)'}}>
                              <div 
                                className="h-1.5 sm:h-2 rounded-full transition-all duration-1000" 
                                style={{ width: `${segment.percentage}%`, backgroundColor: '#8d51ff' }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Competition Overview */}
                  {marketData?.competition && (
                    <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                      <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{color: '#f7ffff'}}>Competition Overview</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {marketData.competition.map((competitor, idx) => (
                          <div key={idx} className="p-3 sm:p-4 rounded-lg sm:rounded-xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-bold text-sm sm:text-base" style={{color: '#f7ffff'}}>{competitor.name}</h5>
                              <Building style={{color: '#f7ffff', opacity: 0.4}} size={14} className="sm:w-4 sm:h-4" />
                            </div>
                            <p className="text-xs sm:text-sm mb-1" style={{color: '#f7ffff', opacity: 0.8}}>Market Share: {competitor.marketShare}</p>
                            <p className="text-xs sm:text-sm mb-2" style={{color: '#f7ffff', opacity: 0.8}}>Funding: {competitor.funding}</p>
                            <p className="text-xs sm:text-sm font-medium" style={{color: '#0099ff'}}>{competitor.strength}</p>
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