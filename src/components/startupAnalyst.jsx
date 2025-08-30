import React, { useState } from 'react';
import { 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Upload, 
  Search, 
  Filter,
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
  Phone,
  Mail,
  Eye,
  MessageCircle,
  Send,
  Menu,
  X,
  Bot,
  User,
  Settings,
  Bell,
  Home,
  Database
} from 'lucide-react';

const StartupAnalystPlatform = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStartup, setSelectedStartup] = useState('TechFlow AI');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot', message: 'Hello! I can help you analyze startup data, metrics, and provide insights. What would you like to know?' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [sidePanelOpen, setSidePanelOpen] = useState(true);
  const [chatMode, setChatMode] = useState('floating'); // 'floating', 'sidebar', 'fullscreen'

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

  const riskFlags = [
    { type: 'Financial', issue: 'Inconsistent revenue reporting', severity: 'High' },
    { type: 'Market', issue: 'Inflated TAM estimates', severity: 'Medium' },
    { type: 'Team', issue: 'High executive turnover', severity: 'Low' }
  ];

  const benchmarks = [
    { metric: 'Revenue Growth', value: '450%', benchmark: '280%', status: 'outperform' },
    { metric: 'CAC/LTV Ratio', value: '1:4.2', benchmark: '1:3.0', status: 'outperform' },
    { metric: 'Churn Rate', value: '8%', benchmark: '12%', status: 'outperform' },
    { metric: 'Burn Rate', value: '$85k/mo', benchmark: '$120k/mo', status: 'outperform' }
  ];

  const sideMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'startups', label: 'Startups', icon: Building },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        type: 'user',
        message: chatInput
      };
      
      setChatMessages([...chatMessages, newMessage]);
      setChatInput('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: chatMessages.length + 2,
          type: 'bot',
          message: 'I understand you\'re asking about the startup analysis. Based on the current data for TechFlow AI, I can see strong growth metrics with 180% YoY revenue growth. Would you like me to dive deeper into any specific area?'
        };
        setChatMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(25,36,82)] text-white">
      {/* Header */}
      <header className="bg-[rgb(25,36,82)] border-b border-white/10 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between max-w-full mx-auto">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidePanelOpen(!sidePanelOpen)}
              className="text-white/70 hover:text-[rgb(0,153,254)] transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="bg-[rgb(0,153,254)] text-white p-2 rounded-lg">
              <BarChart3 size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">InvestAI Analyst</h1>
              <p className="text-sm text-white/70">AI-Powered Startup Intelligence Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-[rgb(0,153,254)] text-white px-4 py-2 rounded-lg hover:bg-[rgb(0,153,254)]/80 flex items-center space-x-2 transition-colors font-medium">
              <Upload size={16} />
              <span>Upload Materials</span>
            </button>
            <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Side Panel */}
        <div className={`bg-[rgb(25,36,82)] border-r border-white/10 transition-all duration-300 ${
          sidePanelOpen ? 'w-64' : 'w-16'
        }`}>
          <div className={`${sidePanelOpen ? 'p-4' : 'p-2'}`}>
            <nav className="space-y-1">
              {sideMenuItems.map((item) => (
                <button
                  key={item.id}
                  className={`w-full flex items-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors ${
                    sidePanelOpen ? 'space-x-3 px-3 py-2' : 'justify-center p-3'
                  }`}
                  title={!sidePanelOpen ? item.label : undefined}
                >
                  <item.icon size={20} />
                  {sidePanelOpen && <span className="font-medium">{item.label}</span>}
                </button>
              ))}
            </nav>
            
            {sidePanelOpen && (
              <div className="mt-6">
                <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-3 px-3">Active Startups</h3>
                <div className="space-y-2">
                  {startups.slice(0, 3).map((startup, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setSelectedStartup(startup.name)}
                      className={`w-full p-2 rounded-lg border text-left transition-all ${
                        selectedStartup === startup.name 
                          ? 'border-[rgb(0,153,254)] bg-[rgb(0,153,254)]/20' 
                          : 'border-white/20 hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-white text-xs truncate">{startup.name}</h4>
                        <span className="text-xs font-bold text-[rgb(0,153,254)]">{startup.score}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/60">{startup.sector}</span>
                        <span className={`w-2 h-2 rounded-full ${
                          startup.risk === 'Low' ? 'bg-[rgb(8,206,105)]' :
                          startup.risk === 'Medium' ? 'bg-[rgb(250,133,36)]' :
                          'bg-red-500'
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          <div className="flex-1 p-6 overflow-auto">
            {/* Startup Header */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[rgb(0,153,254)] rounded-lg flex items-center justify-center">
                    <Building className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedStartup}</h2>
                    <div className="flex items-center space-x-4 text-sm text-white/70">
                      <span className="flex items-center space-x-1">
                        <Globe size={14} />
                        <span>San Francisco, CA</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>Founded 2022</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users size={14} />
                        <span>28 employees</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">8.2/10</div>
                    <div className="text-sm text-white/70">Investment Score</div>
                  </div>
                  <button className="bg-[rgb(8,206,105)] text-white px-4 py-2 rounded-lg hover:bg-[rgb(8,206,105)]/80 transition-colors font-medium">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-6">
              <div className="border-b border-white/10">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: Eye },
                    { id: 'analysis', label: 'Analysis', icon: BarChart3 },
                    { id: 'risks', label: 'Risk Flags', icon: AlertTriangle },
                    { id: 'benchmarks', label: 'Benchmarks', icon: Target }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-semibold text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-[rgb(0,153,254)] text-[rgb(0,153,254)]'
                          : 'border-transparent text-white/70 hover:text-white'
                      }`}
                    >
                      <tab.icon size={16} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-[rgb(8,206,105)]/10 p-4 rounded-lg border border-[rgb(8,206,105)]/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-[rgb(8,206,105)] font-semibold">ARR</p>
                            <p className="text-2xl font-bold text-white">$2.4M</p>
                          </div>
                          <DollarSign className="text-[rgb(8,206,105)]" size={24} />
                        </div>
                        <div className="flex items-center space-x-1 mt-2">
                          <ArrowUp size={14} className="text-[rgb(8,206,105)]" />
                          <span className="text-sm text-[rgb(8,206,105)] font-semibold">+180% YoY</span>
                        </div>
                      </div>
                      
                      <div className="bg-[rgb(0,153,254)]/10 p-4 rounded-lg border border-[rgb(0,153,254)]/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-[rgb(0,153,254)] font-semibold">Customers</p>
                            <p className="text-2xl font-bold text-white">1,240</p>
                          </div>
                          <Users className="text-[rgb(0,153,254)]" size={24} />
                        </div>
                        <div className="flex items-center space-x-1 mt-2">
                          <ArrowUp size={14} className="text-[rgb(0,153,254)]" />
                          <span className="text-sm text-[rgb(0,153,254)] font-semibold">+45% QoQ</span>
                        </div>
                      </div>

                      <div className="bg-[rgb(141,81,255)]/10 p-4 rounded-lg border border-[rgb(141,81,255)]/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-[rgb(141,81,255)] font-semibold">Runway</p>
                            <p className="text-2xl font-bold text-white">18 mo</p>
                          </div>
                          <Calendar className="text-[rgb(141,81,255)]" size={24} />
                        </div>
                        <div className="flex items-center space-x-1 mt-2">
                          <span className="text-sm text-[rgb(141,81,255)] font-semibold">Healthy</span>
                        </div>
                      </div>

                      <div className="bg-[rgb(250,133,36)]/10 p-4 rounded-lg border border-[rgb(250,133,36)]/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-[rgb(250,133,36)] font-semibold">NPS Score</p>
                            <p className="text-2xl font-bold text-white">72</p>
                          </div>
                          <Star className="text-[rgb(250,133,36)]" size={24} />
                        </div>
                        <div className="flex items-center space-x-1 mt-2">
                          <span className="text-sm text-[rgb(250,133,36)] font-semibold">Excellent</span>
                        </div>
                      </div>
                    </div>

                    {/* AI Analysis Summary */}
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                      <h3 className="text-lg font-bold text-white mb-3">AI Investment Summary</h3>
                      <p className="text-white/80 leading-relaxed">
                        TechFlow AI demonstrates strong product-market fit with exceptional growth metrics and customer satisfaction. 
                        The company has successfully scaled its AI-powered workflow automation platform, showing 180% YoY revenue growth 
                        and maintaining healthy unit economics. Management team has strong domain expertise with previous successful exits. 
                        Key strengths include proprietary AI technology, expanding market opportunity, and strong customer retention.
                      </p>
                      <div className="mt-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[rgb(8,206,105)]/20 text-[rgb(8,206,105)] border border-[rgb(8,206,105)]/30">
                          <CheckCircle size={16} className="mr-1" />
                          Recommended for Investment
                        </span>
                      </div>
                    </div>

                    {/* Materials Analyzed */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Materials Analyzed</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { type: 'Pitch Deck', date: '2024-01-15', status: 'Analyzed' },
                          { type: 'Financial Model', date: '2024-01-10', status: 'Analyzed' },
                          { type: 'Founder Call Transcript', date: '2024-01-08', status: 'Analyzed' },
                          { type: 'Due Diligence Package', date: '2024-01-05', status: 'Processing' }
                        ].map((material, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="flex items-center space-x-3">
                              <FileText size={18} className="text-white/70" />
                              <div>
                                <p className="font-semibold text-white">{material.type}</p>
                                <p className="text-sm text-white/60">{material.date}</p>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              material.status === 'Analyzed' ? 'bg-[rgb(8,206,105)]/20 text-[rgb(8,206,105)]' : 'bg-[rgb(250,133,36)]/20 text-[rgb(250,133,36)]'
                            }`}>
                              {material.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'risks' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Risk Assessment</h3>
                    {riskFlags.map((risk, idx) => (
                      <div key={idx} className="p-4 border border-white/10 rounded-lg bg-white/5">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle size={18} className={`${
                              risk.severity === 'High' ? 'text-red-400' :
                              risk.severity === 'Medium' ? 'text-[rgb(250,133,36)]' :
                              'text-[rgb(8,206,105)]'
                            }`} />
                            <span className="font-semibold text-white">{risk.type} Risk</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            risk.severity === 'High' ? 'bg-red-500/20 text-red-400' :
                            risk.severity === 'Medium' ? 'bg-[rgb(250,133,36)]/20 text-[rgb(250,133,36)]' :
                            'bg-[rgb(8,206,105)]/20 text-[rgb(8,206,105)]'
                          }`}>
                            {risk.severity}
                          </span>
                        </div>
                        <p className="text-white/80">{risk.issue}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'benchmarks' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Sector Benchmarking</h3>
                    <div className="space-y-3">
                      {benchmarks.map((benchmark, idx) => (
                        <div key={idx} className="p-4 border border-white/10 rounded-lg bg-white/5">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-white">{benchmark.metric}</p>
                              <p className="text-sm text-white/60">vs. sector average</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-white">{benchmark.value}</p>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-white/60">{benchmark.benchmark}</span>
                                {benchmark.status === 'outperform' ? (
                                  <ArrowUp size={14} className="text-[rgb(8,206,105)]" />
                                ) : (
                                  <ArrowDown size={14} className="text-red-400" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat Panel - Conditional Rendering */}
          {chatMode === 'sidebar' && (
            <div className="w-80 bg-white/5 backdrop-blur-sm border-l border-white/10 flex flex-col animate-in slide-in-from-right duration-300">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[rgb(0,153,254)] rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">AI Assistant</h3>
                      <p className="text-xs text-white/60">Ask me anything about the data</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setChatMode('fullscreen')}
                      className="p-1 text-white/60 hover:text-white transition-colors"
                      title="Expand to fullscreen"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setChatMode('floating')}
                      className="p-1 text-white/60 hover:text-white transition-colors"
                      title="Minimize to floating icon"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto p-4 space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === 'user' 
                        ? 'bg-[rgb(0,153,254)] text-white' 
                        : 'bg-white/10 text-white border border-white/20'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-white/10">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about the startup..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-[rgb(0,153,254)] focus:ring-1 focus:ring-[rgb(0,153,254)]"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-[rgb(0,153,254)] text-white p-2 rounded-lg hover:bg-[rgb(0,153,254)]/80 transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Chat Icon */}
      {chatMode === 'floating' && (
        <button
          onClick={() => setChatMode('sidebar')}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[rgb(0,153,254)] text-white rounded-full shadow-lg hover:bg-[rgb(0,153,254)]/80 transition-all duration-300 hover:scale-110 flex items-center justify-center z-50"
          title="Open AI Assistant"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Fullscreen Chat Modal */}
      {chatMode === 'fullscreen' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[rgb(0,153,254)] rounded-full flex items-center justify-center">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">AI Assistant</h2>
                    <p className="text-sm text-gray-600">Full conversation mode</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setChatMode('sidebar')}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    title="Switch to sidebar"
                  >
                    Sidebar
                  </button>
                  <button
                    onClick={() => setChatMode('floating')}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    title="Close chat"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-6 space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-4 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-[rgb(0,153,254)] text-white' 
                      : 'bg-gray-100 text-gray-900 border border-gray-200'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about the startup analysis..."
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-[rgb(0,153,254)] text-white px-4 py-3 rounded-lg hover:bg-[rgb(0,153,254)]/80 transition-colors font-medium"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupAnalystPlatform;