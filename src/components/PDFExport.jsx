import React, { useRef, useState, useEffect } from 'react';
import { 
  Download, 
  Building, 
  TrendingUp, 
  Users, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  Rocket,
  Brain,
  BarChart3,
  Crown,
  MapPin,
  Calendar,
  XCircle,
  Lightbulb,
  Globe,
  Award,
  Target,
  Loader2
} from 'lucide-react';

const PDFExport = ({ startupData, onClose }) => {
  const pdfContentRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [html2pdfLib, setHtml2pdfLib] = useState(null);

  // Load html2pdf only on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('html2pdf.js').then((module) => {
        setHtml2pdfLib(() => module.default);
      });
    }
  }, []);

  const generatePDF = async () => {
    if (!html2pdfLib) {
      alert('PDF library is still loading. Please try again.');
      return;
    }

    setIsGenerating(true);
    
    try {
      const element = pdfContentRef.current;
      
      const opt = {
        margin: [0, 0, 0, 0],
        filename: `${startupData.name || 'Startup'}-Analysis-Report-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
          windowWidth: 794,
          windowHeight: 1123
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait'
        },
        pagebreak: { 
          mode: ['css', 'legacy'],
          before: '.page-break-before',
          after: '.page-break-after',
          avoid: '.page-break-avoid'
        }
      };

      await html2pdfLib().set(opt).from(element).save();
      onClose();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="border rounded-2xl max-w-md w-full mx-4 p-4 lg:p-6 shadow-2xl" style={{backgroundColor: '#192452', borderColor: 'rgba(247, 255, 255, 0.2)'}}>
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center" style={{backgroundColor: '#08ce6b'}}>
                <Download className="text-white" size={16} />
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-bold" style={{color: '#f7ffff'}}>Export PDF Report</h3>
                <p className="text-xs lg:text-sm" style={{color: '#f7ffff', opacity: 0.7}}>Generate comprehensive analysis</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="transition-colors p-1 rounded-lg hover:bg-white/10"
              style={{color: '#f7ffff', opacity: 0.7}}
            >
              ✕
            </button>
          </div>

          <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
            <div className="p-3 lg:p-4 rounded-xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
              <div className="flex items-center space-x-2 lg:space-x-3 mb-2">
                <Building style={{color: '#fa8524'}} size={14} />
                <span className="font-semibold text-sm lg:text-base" style={{color: '#f7ffff'}}>Executive Summary</span>
              </div>
              <p className="text-xs lg:text-sm" style={{color: '#f7ffff', opacity: 0.7}}>Company overview, metrics, and AI insights</p>
            </div>

            <div className="p-3 lg:p-4 rounded-xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
              <div className="flex items-center space-x-2 lg:space-x-3 mb-2">
                <BarChart3 style={{color: '#0099ff'}} size={14} />
                <span className="font-semibold text-sm lg:text-base" style={{color: '#f7ffff'}}>Market & Competition</span>
              </div>
              <p className="text-xs lg:text-sm" style={{color: '#f7ffff', opacity: 0.7}}>Competitor analysis and market positioning</p>
            </div>

            <div className="p-3 lg:p-4 rounded-xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
              <div className="flex items-center space-x-2 lg:space-x-3 mb-2">
                <Rocket style={{color: '#8d51ff'}} size={14} />
                <span className="font-semibold text-sm lg:text-base" style={{color: '#f7ffff'}}>Growth & Financials</span>
              </div>
              <p className="text-xs lg:text-sm" style={{color: '#f7ffff', opacity: 0.7}}>Financial metrics, projections, and team data</p>
            </div>

            <div className="p-3 lg:p-4 rounded-xl border" style={{backgroundColor: 'rgba(247, 255, 255, 0.05)', borderColor: 'rgba(247, 255, 255, 0.1)'}}>
              <div className="flex items-center space-x-2 lg:space-x-3 mb-2">
                <AlertTriangle style={{color: '#ef4444'}} size={14} />
                <span className="font-semibold text-sm lg:text-base" style={{color: '#f7ffff'}}>Risk Assessment</span>
              </div>
              <p className="text-xs lg:text-sm" style={{color: '#f7ffff', opacity: 0.7}}>Comprehensive risk analysis and mitigation</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={onClose}
              disabled={isGenerating}
              className="flex-1 px-4 py-2 lg:py-3 rounded-xl font-semibold transition-all duration-300 text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              style={{backgroundColor: 'rgba(247, 255, 255, 0.1)', color: '#f7ffff'}}
            >
              Cancel
            </button>
            <button
              onClick={generatePDF}
              disabled={isGenerating || !html2pdfLib}
              className="flex-1 px-4 py-2 lg:py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{backgroundColor: '#08ce6b', color: '#f7ffff'}}
            >
              {isGenerating ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Generating...</span>
                </>
              ) : !html2pdfLib ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <Download size={14} />
                  <span>Generate PDF</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-center mt-3 lg:mt-4" style={{color: '#f7ffff', opacity: 0.6}}>
            PDF will be downloaded directly to your device
          </p>
        </div>
      </div>

      {/* Hidden PDF Content - Styled for Professional PDF Output */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <div ref={pdfContentRef} style={{ 
          width: '794px',
          maxWidth: '794px',
          backgroundColor: '#ffffff',
          fontFamily: 'Arial, sans-serif',
          fontSize: '11pt',
          lineHeight: '1.6',
          color: '#1a1a1a',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          
          {/* Cover Page */}
          <div style={{ 
            padding: '40px 35px 30px 35px', 
            minHeight: '1123px',
            height: '1123px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#ffffff',
            pageBreakAfter: 'always',
            textAlign: 'center',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ flex: '0 0 auto' }}>
              <div style={{ 
                fontSize: '20pt',
                fontWeight: 'bold',
                color: '#ffffff',
                letterSpacing: '1px',
                marginBottom: '15px'
              }}>
                LetsAnalyse
              </div>
              <div style={{ 
                display: 'inline-block',
                padding: '8px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                fontSize: '9pt',
                fontWeight: '600',
                color: '#ffffff',
                letterSpacing: '1.2px'
              }}>
                CONFIDENTIAL INVESTMENT ANALYSIS
              </div>
            </div>

            <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
              <div style={{ 
                fontSize: '44pt', 
                fontWeight: 'bold',
                marginBottom: '15px',
                color: '#ffffff',
                lineHeight: '1.1'
              }}>
                {startupData.name}
              </div>
              <div style={{ 
                fontSize: '16pt',
                color: 'rgba(255, 255, 255, 0.95)',
                fontStyle: 'italic',
                marginBottom: '30px'
              }}>
                {startupData.tagline}
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '35px'
              }}>
                <span style={{ 
                  padding: '8px 16px',
                  backgroundColor: 'rgba(59, 130, 246, 0.9)',
                  borderRadius: '8px',
                  fontSize: '9pt',
                  fontWeight: '600'
                }}>{startupData.sector}</span>
                <span style={{ 
                  padding: '8px 16px',
                  backgroundColor: 'rgba(168, 85, 247, 0.9)',
                  borderRadius: '8px',
                  fontSize: '9pt',
                  fontWeight: '600'
                }}>{startupData.stage}</span>
                <span style={{ 
                  padding: '8px 16px',
                  backgroundColor: 'rgba(100, 116, 139, 0.9)',
                  borderRadius: '8px',
                  fontSize: '9pt',
                  fontWeight: '600'
                }}>{startupData.location}</span>
              </div>

              <div style={{ 
                margin: '0 auto 30px auto',
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ 
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: '10px'
                }}>
                  <div style={{ 
                    fontSize: '48pt',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    lineHeight: '0.9',
                    marginBottom: '0'
                  }}>
                    {startupData.investmentScore}
                  </div>
                  <div style={{ 
                    fontSize: '9pt',
                    color: '#ffffff',
                    fontWeight: '600',
                    opacity: 0.95,
                    marginTop: '6px'
                  }}>
                    out of 10
                  </div>
                </div>
              </div>

              <div style={{ 
                fontSize: '16pt',
                fontWeight: '600',
                color: '#ffffff',
                marginTop: '5px'
              }}>
                {startupData.recommendation || startupData.aiSummary?.investmentRecommendation}
              </div>
            </div>

            <div style={{ 
              flex: '0 0 auto',
              borderTop: '1px solid rgba(255, 255, 255, 0.3)',
              paddingTop: '15px',
              paddingBottom: '5px'
            }}>
              <div style={{ fontSize: '9pt', color: '#ffffff', opacity: 0.9, marginBottom: '5px' }}>
                Analysis Date: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div style={{ fontSize: '8pt', color: '#ffffff', opacity: 0.8 }}>
                Powered by LetsAnalyse • Version 1.0
              </div>
            </div>
          </div>

          {/* Executive Summary Page */}
          <div style={{ 
            padding: '30px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ 
                  fontSize: '12pt', 
                  fontWeight: 'bold',
                  color: '#667eea',
                  marginBottom: '3px'
                }}>
                  LetsAnalyse
                </div>
                <div style={{ 
                  fontSize: '8pt', 
                  color: '#64748b'
                }}>
                  Investment Analysis • {startupData.name}
                </div>
              </div>
              <div style={{ 
                fontSize: '8pt', 
                color: '#94a3b8',
                textAlign: 'right'
              }}>
                Page 1
              </div>
            </div>

            <h1 style={{ 
              fontSize: '22pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '20px'
            }}>
              Executive Summary
            </h1>

            {/* Confidence Score Banner */}
            <div className="page-break-avoid" style={{ 
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              padding: '18px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '2px solid #3b82f6',
              borderLeft: '4px solid #3b82f6',
              pageBreakInside: 'avoid'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <span style={{ 
                  fontSize: '10pt',
                  fontWeight: '600',
                  color: '#1e3a8a'
                }}>
                  Confidence Score
                </span>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{ 
                    width: '100%',
                    maxWidth: '130px',
                    height: '7px',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${(startupData.aiSummary?.confidenceScore || startupData.investmentScore) * 10}%`,
                      height: '100%',
                      backgroundColor: '#3b82f6',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                  <span style={{ 
                    fontSize: '14pt',
                    fontWeight: 'bold',
                    color: '#1e40af'
                  }}>
                    {startupData.aiSummary?.confidenceScore || startupData.investmentScore}/10
                  </span>
                </div>
              </div>
            </div>

            {/* Company Overview */}
            <h2 style={{ 
              fontSize: '14pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '12px'
            }}>
              Company Overview
            </h2>
            <div className="page-break-avoid" style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '10px',
              marginBottom: '20px',
              pageBreakInside: 'avoid'
            }}>
              <div style={{ 
                backgroundColor: '#f8fafc',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ 
                  fontSize: '8pt',
                  color: '#64748b',
                  marginBottom: '4px'
                }}>
                  Founded
                </div>
                <div style={{ 
                  fontSize: '14pt',
                  fontWeight: 'bold',
                  color: '#1e293b'
                }}>
                  {startupData.founded}
                </div>
              </div>
              <div style={{ 
                backgroundColor: '#f8fafc',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ 
                  fontSize: '8pt',
                  color: '#64748b',
                  marginBottom: '4px'
                }}>
                  Team Size
                </div>
                <div style={{ 
                  fontSize: '14pt',
                  fontWeight: 'bold',
                  color: '#1e293b'
                }}>
                  {startupData.employees}
                </div>
              </div>
              <div style={{ 
                backgroundColor: '#f8fafc',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ 
                  fontSize: '8pt',
                  color: '#64748b',
                  marginBottom: '4px'
                }}>
                  Website
                </div>
                <div style={{ 
                  fontSize: '9pt',
                  fontWeight: 'bold',
                  color: '#3b82f6'
                }}>
                  {startupData.website || 'N/A'}
                </div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <h2 style={{ 
              fontSize: '14pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '12px'
            }}>
              Key Metrics
            </h2>
            <div className="page-break-avoid" style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '20px',
              pageBreakInside: 'avoid'
            }}>
              {Object.entries(startupData.keyMetrics || {}).map(([key, metric], idx) => {
                const colors = [
                  { bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', border: '#10b981' },
                  { bg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', border: '#3b82f6' },
                  { bg: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)', border: '#a855f7' },
                  { bg: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)', border: '#f97316' }
                ];
                const color = colors[idx % colors.length];
                
                return (
                  <div key={idx} style={{ 
                    background: color.bg,
                    padding: '14px',
                    borderRadius: '8px',
                    border: `2px solid ${color.border}`
                  }}>
                    <div style={{ 
                      fontSize: '8pt',
                      color: '#64748b',
                      marginBottom: '6px',
                      fontWeight: '600'
                    }}>
                      {key === 'arr' ? 'Annual Recurring Revenue' : 
                       key === 'cac' ? 'Customer Acquisition Cost' : 
                       key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                    <div style={{ 
                      fontSize: '18pt',
                      fontWeight: 'bold',
                      color: '#1e293b',
                      marginBottom: '6px'
                    }}>
                      {metric.value}
                    </div>
                    <div style={{ 
                      fontSize: '8pt',
                      color: color.border,
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span>↑</span> {metric.change}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Investment Thesis */}
            <div className="page-break-avoid" style={{ 
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              padding: '16px',
              borderRadius: '8px',
              border: '2px solid #3b82f6',
              borderLeft: '4px solid #3b82f6',
              pageBreakInside: 'avoid'
            }}>
              <h3 style={{ 
                fontSize: '12pt', 
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '10px'
              }}>
                Investment Thesis
              </h3>
              <p style={{ 
                lineHeight: '1.6',
                color: '#334155',
                fontSize: '9pt',
                margin: 0
              }}>
                {startupData.aiSummary?.investmentThesis}
              </p>
            </div>
          </div>

          {/* AI Insights Page */}
          <div style={{ 
            padding: '30px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ 
                  fontSize: '12pt', 
                  fontWeight: 'bold',
                  color: '#667eea',
                  marginBottom: '3px'
                }}>
                  LetsAnalyse
                </div>
                <div style={{ 
                  fontSize: '8pt', 
                  color: '#64748b'
                }}>
                  Investment Analysis • {startupData.name}
                </div>
              </div>
              <div style={{ 
                fontSize: '8pt', 
                color: '#94a3b8',
                textAlign: 'right'
              }}>
                Page 2
              </div>
            </div>

            <h1 style={{ 
              fontSize: '22pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '20px'
            }}>
              Strengths & Concerns
            </h1>

            {/* Key Highlights */}
            <div className="page-break-avoid" style={{ marginBottom: '20px', pageBreakInside: 'avoid' }}>
              <h2 style={{ 
                fontSize: '14pt', 
                fontWeight: 'bold',
                color: '#10b981',
                marginBottom: '12px'
              }}>
                ✓ Key Highlights
              </h2>
              <div style={{ display: 'grid', gap: '8px' }}>
                {(startupData.aiSummary?.keyHighlights || []).map((highlight, idx) => (
                  <div key={idx} className="page-break-avoid" style={{ 
                    padding: '10px 12px',
                    background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                    borderLeft: '3px solid #10b981',
                    borderRadius: '6px',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'start',
                    pageBreakInside: 'avoid'
                  }}>
                    <span style={{
                      color: '#10b981',
                      fontSize: '11pt',
                      fontWeight: 'bold',
                      marginTop: '1px'
                    }}>✓</span>
                    <p style={{ 
                      lineHeight: '1.5', 
                      color: '#065f46',
                      margin: 0,
                      fontSize: '9pt'
                    }}>
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Concerns */}
            <div className="page-break-avoid" style={{ marginBottom: '20px', pageBreakInside: 'avoid' }}>
              <h2 style={{ 
                fontSize: '14pt', 
                fontWeight: 'bold',
                color: '#f59e0b',
                marginBottom: '12px'
              }}>
                ⚠ Main Concerns
              </h2>
              <div style={{ display: 'grid', gap: '8px' }}>
                {(startupData.aiSummary?.mainConcerns || []).map((concern, idx) => (
                  <div key={idx} className="page-break-avoid" style={{ 
                    padding: '10px 12px',
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    borderLeft: '3px solid #f59e0b',
                    borderRadius: '6px',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'start',
                    pageBreakInside: 'avoid'
                  }}>
                    <span style={{
                      color: '#f59e0b',
                      fontSize: '11pt',
                      fontWeight: 'bold',
                      marginTop: '1px'
                    }}>⚠</span>
                    <p style={{ 
                      lineHeight: '1.5', 
                      color: '#78350f',
                      margin: 0,
                      fontSize: '9pt'
                    }}>
                      {concern}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Potential */}
            <h2 style={{ 
              fontSize: '14pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '12px'
            }}>
              Growth Potential
            </h2>
            <div className="page-break-avoid" style={{ 
              background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
              padding: '16px',
              borderRadius: '8px',
              border: '2px solid #a855f7',
              marginBottom: '15px',
              pageBreakInside: 'avoid'
            }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <span style={{ 
                  fontSize: '12pt',
                  fontWeight: 'bold',
                  color: '#1e293b'
                }}>
                  Overall Score
                </span>
                <span style={{ 
                  fontSize: '24pt',
                  fontWeight: 'bold',
                  color: '#a855f7'
                }}>
                  {startupData.growthPotential?.score}/10
                </span>
              </div>
              <div style={{ 
                width: '100%',
                height: '8px',
                backgroundColor: 'rgba(168, 85, 247, 0.2)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${(startupData.growthPotential?.score || 0) * 10}%`,
                  height: '100%',
                  backgroundColor: '#a855f7',
                  borderRadius: '4px'
                }}></div>
              </div>
            </div>
          </div>

          {/* Competitor Analysis Page */}
          <div style={{ 
            padding: '30px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ 
                  fontSize: '12pt', 
                  fontWeight: 'bold',
                  color: '#667eea',
                  marginBottom: '3px'
                }}>
                  LetsAnalyse
                </div>
                <div style={{ 
                  fontSize: '8pt', 
                  color: '#64748b'
                }}>
                  Investment Analysis • {startupData.name}
                </div>
              </div>
              <div style={{ 
                fontSize: '8pt', 
                color: '#94a3b8',
                textAlign: 'right'
              }}>
                Page 3
              </div>
            </div>

            <h1 style={{ 
              fontSize: '22pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '20px'
            }}>
              Competitive Landscape
            </h1>

            {/* Competitor Table */}
            <div className="page-break-avoid" style={{ 
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '2px solid #e2e8f0',
              overflow: 'hidden',
              marginBottom: '16px',
              pageBreakInside: 'avoid'
            }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{ 
                    backgroundColor: '#f8fafc'
                  }}>
                    <th style={{ 
                      padding: '10px',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: '9pt',
                      color: '#1e293b',
                      borderBottom: '2px solid #e2e8f0'
                    }}>Competitor</th>
                    <th style={{ 
                      padding: '10px',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: '9pt',
                      color: '#1e293b',
                      borderBottom: '2px solid #e2e8f0'
                    }}>Funding</th>
                    <th style={{ 
                      padding: '10px',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: '9pt',
                      color: '#1e293b',
                      borderBottom: '2px solid #e2e8f0'
                    }}>ARR</th>
                    <th style={{ 
                      padding: '10px',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: '9pt',
                      color: '#1e293b',
                      borderBottom: '2px solid #e2e8f0'
                    }}>Key Strength</th>
                  </tr>
                </thead>
                <tbody>
                  {(startupData.competitorAnalysis || []).map((competitor, idx) => (
                    <tr key={idx} style={{ 
                      borderBottom: idx < (startupData.competitorAnalysis || []).length - 1 ? '1px solid #e2e8f0' : 'none'
                    }}>
                      <td style={{ 
                        padding: '10px',
                        fontWeight: 'bold',
                        fontSize: '9pt',
                        color: '#1e293b'
                      }}>{competitor.name}</td>
                      <td style={{ 
                        padding: '10px',
                        fontSize: '8pt',
                        color: '#64748b'
                      }}>{competitor.funding}</td>
                      <td style={{ 
                        padding: '10px',
                        fontSize: '9pt',
                        color: '#10b981',
                        fontWeight: '600'
                      }}>{competitor.arr}</td>
                      <td style={{ 
                        padding: '10px',
                        fontSize: '8pt',
                        color: '#64748b'
                      }}>{competitor.strength}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Competitive Advantage Box */}
            <div className="page-break-avoid" style={{ 
              background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
              padding: '14px',
              borderRadius: '8px',
              border: '2px solid #a855f7',
              borderLeft: '3px solid #a855f7',
              pageBreakInside: 'avoid'
            }}>
              <h3 style={{ 
                fontSize: '11pt',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '8px'
              }}>
                Competitive Advantage
              </h3>
              <p style={{ 
                fontSize: '9pt',
                color: '#581c87',
                lineHeight: '1.5',
                margin: 0
              }}>
                {startupData.name}'s unique positioning in the market provides a defensible moat through 
                innovative technology, strong market presence, and strategic partnerships that differentiate 
                from traditional competitors.
              </p>
            </div>
          </div>

          {/* Risk Assessment Page */}
          <div style={{ 
            padding: '30px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ 
                  fontSize: '12pt', 
                  fontWeight: 'bold',
                  color: '#667eea',
                  marginBottom: '3px'
                }}>
                  LetsAnalyse
                </div>
                <div style={{ 
                  fontSize: '8pt', 
                  color: '#64748b'
                }}>
                  Investment Analysis • {startupData.name}
                </div>
              </div>
              <div style={{ 
                fontSize: '8pt', 
                color: '#94a3b8',
                textAlign: 'right'
              }}>
                Page 4
              </div>
            </div>

            <h1 style={{ 
              fontSize: '22pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '20px'
            }}>
              Risk Assessment
            </h1>

            {(startupData.riskAssessment || []).map((risk, idx) => {
              const severityColors = {
                'High': { bg: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', border: '#ef4444', text: '#7f1d1d', badge: '#dc2626' },
                'Medium': { bg: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)', border: '#f97316', text: '#7c2d12', badge: '#ea580c' },
                'Low': { bg: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', border: '#10b981', text: '#064e3b', badge: '#059669' }
              };
              const color = severityColors[risk.severity] || severityColors['Medium'];
              
              return (
                <div key={idx} className="page-break-avoid" style={{ 
                  marginBottom: '12px',
                  padding: '14px',
                  background: color.bg,
                  borderLeft: `3px solid ${color.border}`,
                  borderRadius: '8px',
                  border: `2px solid ${color.border}`,
                  pageBreakInside: 'avoid'
                }}>
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '8px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        fontSize: '11pt', 
                        fontWeight: 'bold',
                        color: '#1e293b',
                        marginBottom: '4px'
                      }}>
                        {risk.issue}
                      </h3>
                      <div style={{ 
                        fontSize: '8pt',
                        color: '#64748b',
                        fontWeight: '600'
                      }}>
                        {risk.type}
                      </div>
                    </div>
                    <span style={{ 
                      padding: '4px 10px',
                      backgroundColor: color.badge,
                      color: '#ffffff',
                      borderRadius: '4px',
                      fontSize: '8pt',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                      marginLeft: '10px'
                    }}>
                      {risk.severity}
                    </span>
                  </div>
                  
                  <p style={{ 
                    marginBottom: '10px',
                    lineHeight: '1.5',
                    fontSize: '9pt',
                    color: color.text
                  }}>
                    {risk.description}
                  </p>
                  
                  <div style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid rgba(0, 0, 0, 0.05)'
                  }}>
                    <div style={{ 
                      fontSize: '8pt',
                      fontWeight: '600',
                      color: '#10b981',
                      marginBottom: '4px'
                    }}>
                      Mitigation
                    </div>
                    <p style={{ 
                      margin: 0,
                      fontSize: '8pt',
                      color: '#334155',
                      lineHeight: '1.5'
                    }}>
                      {risk.mitigation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Growth Potential Page */}
          <div style={{ 
            padding: '30px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ 
                  fontSize: '12pt', 
                  fontWeight: 'bold',
                  color: '#667eea',
                  marginBottom: '3px'
                }}>
                  LetsAnalyse
                </div>
                <div style={{ 
                  fontSize: '8pt', 
                  color: '#64748b'
                }}>
                  Investment Analysis • {startupData.name}
                </div>
              </div>
              <div style={{ 
                fontSize: '8pt', 
                color: '#94a3b8',
                textAlign: 'right'
              }}>
                Page 5
              </div>
            </div>

            <h1 style={{ 
              fontSize: '22pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '20px'
            }}>
              Growth Potential
            </h1>

            {/* Growth Score */}
            <div className="page-break-avoid" style={{ 
              textAlign: 'center',
              padding: '24px',
              background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
              borderRadius: '10px',
              marginBottom: '20px',
              border: '2px solid #a855f7',
              pageBreakInside: 'avoid'
            }}>
              <div style={{ 
                fontSize: '42pt',
                fontWeight: 'bold',
                color: '#a855f7',
                lineHeight: '1',
                marginBottom: '8px'
              }}>
                {startupData.growthPotential?.score}/10
              </div>
              <div style={{ 
                fontSize: '13pt',
                color: '#581c87',
                fontWeight: '600'
              }}>
                Overall Growth Potential
              </div>
              <div style={{ 
                width: '70%',
                height: '7px',
                backgroundColor: 'rgba(168, 85, 247, 0.2)',
                borderRadius: '4px',
                margin: '12px auto 0',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${(startupData.growthPotential?.score || 0) * 10}%`,
                  height: '100%',
                  backgroundColor: '#a855f7',
                  borderRadius: '4px'
                }}></div>
              </div>
            </div>

            {/* Growth Factors */}
            <h2 style={{ 
              fontSize: '14pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '12px'
            }}>
              Growth Drivers
            </h2>

            {(startupData.growthPotential?.factors || []).map((factor, idx) => {
              const scoreColor = factor.score >= 8 ? '#10b981' : factor.score >= 6 ? '#f59e0b' : '#ef4444';
              
              return (
                <div key={idx} className="page-break-avoid" style={{ 
                  marginBottom: '10px',
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  pageBreakInside: 'avoid'
                }}>
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '8px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        fontSize: '10pt',
                        fontWeight: 'bold',
                        color: '#1e293b',
                        marginBottom: '4px'
                      }}>
                        {factor.name}
                      </h3>
                      <span style={{ 
                        fontSize: '8pt',
                        color: '#64748b',
                        fontWeight: '600'
                      }}>
                        Weight: {factor.weight}%
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: '14pt',
                      fontWeight: 'bold',
                      color: scoreColor,
                      marginLeft: '10px'
                    }}>
                      {factor.score}/10
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div style={{ 
                    width: '100%',
                    height: '6px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '3px',
                    marginBottom: '8px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${factor.score * 10}%`,
                      height: '100%',
                      backgroundColor: scoreColor,
                      borderRadius: '3px'
                    }}></div>
                  </div>
                  
                  <p style={{ 
                    fontSize: '8pt',
                    color: '#64748b',
                    lineHeight: '1.5',
                    margin: 0
                  }}>
                    {factor.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Strategic Recommendations Page */}
          <div style={{ 
            padding: '30px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ 
                  fontSize: '12pt', 
                  fontWeight: 'bold',
                  color: '#667eea',
                  marginBottom: '3px'
                }}>
                  LetsAnalyse
                </div>
                <div style={{ 
                  fontSize: '8pt', 
                  color: '#64748b'
                }}>
                  Investment Analysis • {startupData.name}
                </div>
              </div>
              <div style={{ 
                fontSize: '8pt', 
                color: '#94a3b8',
                textAlign: 'right'
              }}>
                Page 6
              </div>
            </div>

            <h1 style={{ 
              fontSize: '22pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '20px'
            }}>
              Strategic Recommendations
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {(startupData.growthPotential?.recommendations || []).map((rec, idx) => {
                const priorityColors = {
                  'High': { bg: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', badge: '#dc2626' },
                  'Medium': { bg: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)', badge: '#ea580c' },
                  'Low': { bg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', badge: '#2563eb' }
                };
                const color = priorityColors[rec.priority] || priorityColors['Medium'];
                
                return (
                  <div key={idx} className="page-break-avoid" style={{ 
                    padding: '12px',
                    background: color.bg,
                    borderRadius: '6px',
                    border: '2px solid #e2e8f0',
                    pageBreakInside: 'avoid'
                  }}>
                    <div style={{ 
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '5px',
                      marginBottom: '8px'
                    }}>
                      <span style={{ 
                        padding: '3px 8px',
                        backgroundColor: color.badge,
                        color: '#ffffff',
                        borderRadius: '3px',
                        fontSize: '8pt',
                        fontWeight: 'bold'
                      }}>
                        {rec.priority}
                      </span>
                      <span style={{ 
                        padding: '3px 8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        color: '#64748b',
                        borderRadius: '3px',
                        fontSize: '8pt',
                        fontWeight: '600'
                      }}>
                        {rec.timeline}
                      </span>
                    </div>
                    
                    <h3 style={{ 
                      fontSize: '10pt', 
                      fontWeight: 'bold',
                      color: '#1e293b',
                      margin: 0
                    }}>
                      {rec.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Financial Data Page */}
          <div style={{ 
            padding: '30px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ 
                  fontSize: '12pt', 
                  fontWeight: 'bold',
                  color: '#667eea',
                  marginBottom: '3px'
                }}>
                  LetsAnalyse
                </div>
                <div style={{ 
                  fontSize: '8pt', 
                  color: '#64748b'
                }}>
                  Investment Analysis • {startupData.name}
                </div>
              </div>
              <div style={{ 
                fontSize: '8pt', 
                color: '#94a3b8',
                textAlign: 'right'
              }}>
                Page 7
              </div>
            </div>

            <h1 style={{ 
              fontSize: '22pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '20px'
            }}>
              Financial Performance
            </h1>

            {/* Revenue Overview */}
            {startupData.financialData?.revenue && (
              <div style={{ 
                background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                padding: '25px',
                borderRadius: '12px',
                marginBottom: '30px',
                border: '2px solid #10b981'
              }}>
                <h2 style={{ 
                  fontSize: '18pt', 
                  fontWeight: 'bold',
                  color: '#192452',
                  marginBottom: '20px'
                }}>
                  Revenue Trajectory
                </h2>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px'
                }}>
                  <div style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '18px',
                    borderRadius: '10px',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    <div style={{ 
                      fontSize: '9pt', 
                      color: '#064e3b', 
                      marginBottom: '8px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Current Revenue
                    </div>
                    <div style={{ 
                      fontSize: '22pt', 
                      fontWeight: 'bold', 
                      color: '#10b981',
                      marginBottom: '5px'
                    }}>
                      {startupData.financialData.revenue.current}
                    </div>
                    {startupData.financialData.revenue.growth && (
                      <div style={{ 
                        fontSize: '9pt', 
                        color: '#059669',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <span>↗</span> {startupData.financialData.revenue.growth}
                      </div>
                    )}
                  </div>
                  <div style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '18px',
                    borderRadius: '10px',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    <div style={{ 
                      fontSize: '9pt', 
                      color: '#064e3b', 
                      marginBottom: '8px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Projected Revenue
                    </div>
                    <div style={{ 
                      fontSize: '18pt', 
                      fontWeight: 'bold', 
                      color: '#0099ff'
                    }}>
                      {startupData.financialData.revenue.projection}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Key Financial Metrics */}
            <h2 style={{ 
              fontSize: '18pt', 
              fontWeight: 'bold',
              color: '#192452',
              marginBottom: '20px'
            }}>
              Key Financial Metrics
            </h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '18px',
              marginBottom: '30px'
            }}>
              {(startupData.financialData?.metrics || []).map((metric, idx) => {
                const isPositive = metric.positive !== false;
                const trendColor = isPositive ? '#10b981' : '#ef4444';
                
                return (
                  <div key={idx} style={{ 
                    backgroundColor: '#ffffff',
                    padding: '18px',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                  }}>
                    <div style={{ 
                      fontSize: '9pt',
                      color: '#64748b',
                      marginBottom: '8px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {metric.label}
                    </div>
                    <div style={{ 
                      fontSize: '16pt',
                      fontWeight: 'bold',
                      color: '#192452',
                      marginBottom: '8px'
                    }}>
                      {metric.value}
                    </div>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '9pt',
                      color: trendColor,
                      fontWeight: '600'
                    }}>
                      <span>{isPositive ? '↑' : '↓'}</span>
                      {metric.change}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Funding Information */}
            {startupData.financialData?.funding && (
              <div style={{ 
                background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
                padding: '25px',
                borderRadius: '12px',
                border: '2px solid #8d51ff'
              }}>
                <h2 style={{ 
                  fontSize: '18pt', 
                  fontWeight: 'bold',
                  color: '#192452',
                  marginBottom: '20px'
                }}>
                  💰 Funding History
                </h2>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '18px',
                  marginBottom: '20px'
                }}>
                  <div style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '18px',
                    borderRadius: '10px',
                    border: '1px solid rgba(141, 81, 255, 0.3)'
                  }}>
                    <div style={{ 
                      fontSize: '9pt', 
                      color: '#581c87', 
                      marginBottom: '8px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Total Raised
                    </div>
                    <div style={{ 
                      fontSize: '20pt', 
                      fontWeight: 'bold', 
                      color: '#8d51ff'
                    }}>
                      {startupData.financialData.funding.totalRaised}
                    </div>
                  </div>
                  <div style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '18px',
                    borderRadius: '10px',
                    border: '1px solid rgba(141, 81, 255, 0.3)'
                  }}>
                    <div style={{ 
                      fontSize: '9pt', 
                      color: '#581c87', 
                      marginBottom: '8px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Last Round
                    </div>
                    <div style={{ 
                      fontSize: '13pt', 
                      fontWeight: 'bold', 
                      color: '#0099ff'
                    }}>
                      {startupData.financialData.funding.lastRound}
                    </div>
                  </div>
                </div>
                {(startupData.financialData.funding.investors && startupData.financialData.funding.investors.length > 0) && (
                  <div>
                    <div style={{ 
                      fontSize: '10pt', 
                      color: '#581c87', 
                      marginBottom: '12px',
                      fontWeight: '600'
                    }}>
                      Key Investors
                    </div>
                    <div style={{ 
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '10px'
                    }}>
                      {startupData.financialData.funding.investors.map((investor, idx) => (
                        <span key={idx} style={{ 
                          padding: '6px 14px',
                          backgroundColor: '#ffffff',
                          border: '2px solid #8d51ff',
                          borderRadius: '8px',
                          fontSize: '9pt',
                          color: '#581c87',
                          fontWeight: '600'
                        }}>
                          {investor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Team Analysis Page */}
          <div style={{ 
            padding: '30px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ 
                  fontSize: '12pt', 
                  fontWeight: 'bold',
                  color: '#667eea',
                  marginBottom: '3px'
                }}>
                  LetsAnalyse
                </div>
                <div style={{ 
                  fontSize: '8pt', 
                  color: '#64748b'
                }}>
                  Investment Analysis • {startupData.name}
                </div>
              </div>
              <div style={{ 
                fontSize: '8pt', 
                color: '#94a3b8',
                textAlign: 'right'
              }}>
                Page 8
              </div>
            </div>

            <h1 style={{ 
              fontSize: '22pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '20px'
            }}>
              Team Analysis
            </h1>

            {/* Team Overview */}
            <div style={{ 
              backgroundColor: '#f8fafc',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '25px',
              border: '1px solid #e2e8f0'
            }}>
              <h2 style={{ 
                fontSize: '16pt', 
                fontWeight: 'bold',
                color: '#192452',
                marginBottom: '15px'
              }}>
                Team Overview
              </h2>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px'
              }}>
                <div>
                  <div style={{ fontSize: '9pt', color: '#64748b', marginBottom: '5px' }}>
                    Team Size
                  </div>
                  <div style={{ fontSize: '18pt', fontWeight: 'bold', color: '#0099ff' }}>
                    {startupData.teamData?.size}
                  </div>
            </div>
            <div>
                  <div style={{ fontSize: '9pt', color: '#64748b', marginBottom: '5px' }}>
                    Growth Trend
            </div>
                  <div style={{ fontSize: '12pt', color: '#08ce6b' }}>
                    {startupData.teamData?.growth}
          </div>
                </div>
              </div>
        </div>

            {/* Department Breakdown */}
            {startupData.teamData?.departments && (
              <div style={{ marginBottom: '25px' }}>
                <h2 style={{ 
                  fontSize: '16pt', 
                  fontWeight: 'bold',
                  color: '#192452',
                  marginBottom: '15px'
                }}>
                  Department Breakdown
                </h2>
                {startupData.teamData.departments.map((dept, idx) => (
                  <div key={idx} style={{ 
                    marginBottom: '15px',
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px'
                  }}>
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px'
                    }}>
                      <span style={{ fontSize: '10pt', fontWeight: '600', color: '#192452' }}>
                        {dept.name}
                      </span>
                      <span style={{ fontSize: '10pt', fontWeight: 'bold', color: '#0099ff' }}>
                        {dept.count} ({dept.percentage}%)
                      </span>
            </div>
                    <div style={{ 
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '3px'
                    }}>
                      <div style={{ 
                        width: `${dept.percentage}%`,
                        height: '100%',
                        backgroundColor: '#0099ff',
                        borderRadius: '3px'
                      }}></div>
          </div>
                  </div>
                ))}
              </div>
            )}

            {/* Leadership Team */}
            {startupData.teamData?.leadership && (
              <div>
                <h2 style={{ 
                  fontSize: '16pt', 
                  fontWeight: 'bold',
                  color: '#192452',
                  marginBottom: '15px'
                }}>
                  Leadership Team
                </h2>
                {startupData.teamData.leadership.map((leader, idx) => (
                  <div key={idx} className="page-break-avoid" style={{ 
                    marginBottom: '12px',
                    padding: '15px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    pageBreakInside: 'avoid'
                  }}>
                    <h3 style={{ 
                      fontSize: '12pt',
                      fontWeight: 'bold',
                      color: '#192452',
                      marginBottom: '3px'
                    }}>
                      {leader.name}
                    </h3>
                    <div style={{ 
                      fontSize: '10pt',
                      color: '#fa8524',
                      marginBottom: '10px',
                      fontWeight: '600'
                    }}>
                      {leader.role}
            </div>
                    <p style={{ 
                      fontSize: '9pt',
                      color: '#334155',
                      lineHeight: '1.6',
                      marginBottom: '5px'
                    }}>
                      {leader.background}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Market Analysis Page */}
          <div style={{ 
            padding: '30px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ 
                  fontSize: '12pt', 
                  fontWeight: 'bold',
                  color: '#667eea',
                  marginBottom: '3px'
                }}>
                  LetsAnalyse
                </div>
                <div style={{ 
                  fontSize: '8pt', 
                  color: '#64748b'
                }}>
                  Investment Analysis • {startupData.name}
                </div>
              </div>
              <div style={{ 
                fontSize: '8pt', 
                color: '#94a3b8',
                textAlign: 'right'
              }}>
                Page 9
              </div>
            </div>

            <h1 style={{ 
              fontSize: '22pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '20px'
            }}>
              Market Analysis
            </h1>

            {/* Market Size */}
            {startupData.marketData?.size && (
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ 
                  fontSize: '16pt', 
                  fontWeight: 'bold',
                  color: '#192452',
                  marginBottom: '15px'
                }}>
                  Market Size
                </h2>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '15px'
                }}>
                  <div style={{ 
                    padding: '20px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ fontSize: '9pt', color: '#64748b', marginBottom: '8px' }}>
                      TAM (Total Addressable)
            </div>
                    <div style={{ fontSize: '14pt', fontWeight: 'bold', color: '#8d51ff' }}>
                      {startupData.marketData.size.tam}
          </div>
                  </div>
                  <div style={{ 
                    padding: '20px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ fontSize: '9pt', color: '#64748b', marginBottom: '8px' }}>
                      SAM (Serviceable Available)
                    </div>
                    <div style={{ fontSize: '14pt', fontWeight: 'bold', color: '#0099ff' }}>
                      {startupData.marketData.size.sam}
                    </div>
                  </div>
                  <div style={{ 
                    padding: '20px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ fontSize: '9pt', color: '#64748b', marginBottom: '8px' }}>
                      SOM (Serviceable Obtainable)
                    </div>
                    <div style={{ fontSize: '14pt', fontWeight: 'bold', color: '#08ce6b' }}>
                      {startupData.marketData.size.som}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Market Trends */}
            {startupData.marketData?.trends && (
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ 
                  fontSize: '16pt', 
                  fontWeight: 'bold',
                  color: '#192452',
                  marginBottom: '15px'
                }}>
                  Market Trends
                </h2>
                {startupData.marketData.trends.map((trend, idx) => {
                  const impactColor = trend.impact === 'High' ? '#ef4444' : 
                                     trend.impact === 'Medium' ? '#fa8524' : '#08ce6b';
                  
                  return (
                    <div key={idx} className="page-break-avoid" style={{ 
                      marginBottom: '10px',
                      padding: '12px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      pageBreakInside: 'avoid'
                    }}>
                      <div style={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <h3 style={{ 
                          fontSize: '11pt',
                          fontWeight: '600',
                          color: '#192452',
                          flex: 1
                        }}>
                          {trend.trend}
                        </h3>
                        <span style={{ 
                          padding: '4px 10px',
                          backgroundColor: `${impactColor}20`,
                          color: impactColor,
                          borderRadius: '4px',
                          fontSize: '9pt',
                          fontWeight: 'bold',
                          whiteSpace: 'nowrap',
                          marginLeft: '10px'
                        }}>
                          {trend.impact} Impact
                        </span>
            </div>
                      <div style={{ fontSize: '9pt', color: '#64748b' }}>
                        Timeline: {trend.timeline}
          </div>
        </div>
                  );
                })}
              </div>
            )}

            {/* Customer Segments */}
            {startupData.marketData?.customerSegments && (
              <div>
                <h2 style={{ 
                  fontSize: '16pt', 
                  fontWeight: 'bold',
                  color: '#192452',
                  marginBottom: '15px'
                }}>
                  Customer Segments
                </h2>
                {startupData.marketData.customerSegments.map((segment, idx) => (
                  <div key={idx} style={{ 
                    marginBottom: '15px',
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px'
                  }}>
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px'
                    }}>
                      <span style={{ fontSize: '10pt', fontWeight: '600', color: '#192452' }}>
                        {segment.segment}
                      </span>
                      <span style={{ fontSize: '10pt', fontWeight: 'bold', color: '#8d51ff' }}>
                        {segment.percentage}%
                      </span>
                    </div>
                    <div style={{ 
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '3px'
                    }}>
                      <div style={{ 
                        width: `${segment.percentage}%`,
                        height: '100%',
                        backgroundColor: '#8d51ff',
                        borderRadius: '3px'
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>

          {/* Benchmarks Page */}
          <div style={{ 
            padding: '30px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ 
                  fontSize: '12pt', 
                  fontWeight: 'bold',
                  color: '#667eea',
                  marginBottom: '3px'
                }}>
                  LetsAnalyse
                </div>
                <div style={{ 
                  fontSize: '8pt', 
                  color: '#64748b'
                }}>
                  Investment Analysis • {startupData.name}
                </div>
              </div>
              <div style={{ 
                fontSize: '8pt', 
                color: '#94a3b8',
                textAlign: 'right'
              }}>
                Page 10
              </div>
            </div>

            <h1 style={{ 
              fontSize: '22pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '20px'
            }}>
              Performance Benchmarks
            </h1>

            {(startupData.benchmarks || []).map((benchmark, idx) => {
              const statusColor = 
                benchmark.status.includes('Outperforming') || benchmark.status === 'Leading' ? '#08ce6b' :
                benchmark.status === 'Aggressive' ? '#0099ff' :
                benchmark.status.includes('Aligned') ? '#fa8524' : '#64748b';
              
              return (
                <div key={idx} className="page-break-avoid" style={{ 
                  marginBottom: '16px',
                  padding: '16px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  pageBreakInside: 'avoid'
                }}>
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '12px'
                  }}>
                    <h2 style={{ 
                      fontSize: '13pt',
                      fontWeight: 'bold',
                      color: '#192452'
                    }}>
                      {benchmark.metric}
                    </h2>
                    <span style={{ 
                      padding: '4px 12px',
                      backgroundColor: `${statusColor}20`,
                      color: statusColor,
                      borderRadius: '4px',
                      fontSize: '9pt',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                      marginLeft: '10px'
                    }}>
                      {benchmark.status}
                    </span>
                  </div>
                  
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '15px'
                  }}>
                    <div>
                      <div style={{ fontSize: '9pt', color: '#64748b', marginBottom: '5px' }}>
                        Your Value
                      </div>
                      <div style={{ fontSize: '13pt', fontWeight: 'bold', color: '#192452' }}>
                        {benchmark.value}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '9pt', color: '#64748b', marginBottom: '5px' }}>
                        Industry Benchmark
                      </div>
                      <div style={{ fontSize: '11pt', color: '#64748b' }}>
                        {benchmark.benchmark}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final Summary Page */}
          <div style={{ 
            padding: '30px', 
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #667eea',
              paddingBottom: '10px',
              marginBottom: '25px'
            }}>
              <div>
                <div style={{ 
                  fontSize: '12pt', 
                  fontWeight: 'bold',
                  color: '#667eea',
                  marginBottom: '3px'
                }}>
                  LetsAnalyse
                </div>
                <div style={{ 
                  fontSize: '8pt', 
                  color: '#64748b'
                }}>
                  Investment Analysis • {startupData.name}
                </div>
              </div>
              <div style={{ 
                fontSize: '8pt', 
                color: '#94a3b8',
                textAlign: 'right'
              }}>
                Final Page
              </div>
            </div>

            <h1 style={{ 
              fontSize: '24pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              margin: 0,
              textAlign: 'center',
              marginBottom: '25px'
            }}>
              Investment Summary
            </h1>

            {/* Investment Summary Box */}
            <div className="page-break-avoid" style={{ 
              textAlign: 'center',
              padding: '30px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              marginBottom: '25px',
              color: '#ffffff',
              pageBreakInside: 'avoid'
            }}>
              <h2 style={{ 
                fontSize: '18pt',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: '#ffffff'
              }}>
                Investment Recommendation
              </h2>
              
              <div style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                marginBottom: '16px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '38pt',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    lineHeight: '1'
                  }}>
                    {startupData.investmentScore}
                  </div>
                  <div style={{ 
                    fontSize: '9pt',
                    color: '#ffffff',
                    marginTop: '12px'
                  }}>
                    out of 10
                  </div>
                </div>
              </div>
              
              <div style={{ 
                fontSize: '16pt',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '16px'
              }}>
                {startupData.aiSummary?.investmentRecommendation || startupData.recommendation}
              </div>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '12px',
                marginTop: '20px'
              }}>
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '12px',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '20pt', fontWeight: 'bold', color: '#ffffff', marginBottom: '4px' }}>
                    {startupData.investmentScore}/10
                  </div>
                  <div style={{ fontSize: '8pt', color: '#ffffff', opacity: 0.9 }}>Investment Score</div>
                </div>
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '12px',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '20pt', fontWeight: 'bold', color: '#ffffff', marginBottom: '4px' }}>
                    {startupData.growthPotential?.score}/10
                  </div>
                  <div style={{ fontSize: '8pt', color: '#ffffff', opacity: 0.9 }}>Growth Potential</div>
                </div>
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '12px',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '20pt', fontWeight: 'bold', color: '#ffffff', marginBottom: '4px' }}>
                    {startupData.aiSummary?.confidenceScore || startupData.investmentScore}/10
                  </div>
                  <div style={{ fontSize: '8pt', color: '#ffffff', opacity: 0.9 }}>Confidence</div>
                </div>
              </div>
            </div>

            {/* Final Investment Thesis */}
            <div className="page-break-avoid" style={{ 
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              padding: '18px',
              borderRadius: '10px',
              border: '2px solid #3b82f6',
              borderLeft: '3px solid #3b82f6',
              marginBottom: '25px',
              pageBreakInside: 'avoid'
            }}>
              <h3 style={{ 
                fontSize: '14pt', 
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '12px'
              }}>
                Investment Thesis
              </h3>
              <p style={{ 
                lineHeight: '1.6',
                fontSize: '9pt',
                color: '#1e40af',
                margin: 0
              }}>
                {startupData.aiSummary?.investmentThesis}
        </p>
      </div>

            {/* Report Metadata */}
              <div className="page-break-avoid" style={{ 
                borderTop: '2px solid #e2e8f0',
                paddingTop: '20px',
                marginTop: '30px',
                pageBreakInside: 'avoid'
              }}>
              <div style={{ 
                backgroundColor: '#f8fafc',
                padding: '16px',
                borderRadius: '10px',
                marginBottom: '20px'
              }}>
                <h3 style={{ 
                  fontSize: '11pt',
                  fontWeight: 'bold',
                  color: '#192452',
                  marginBottom: '12px'
                }}>
                  📋 Report Information
                </h3>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  fontSize: '8pt'
                }}>
                  <div style={{ 
                    padding: '8px',
                    backgroundColor: '#ffffff',
                    borderRadius: '5px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ color: '#64748b', marginBottom: '3px' }}>Report ID</div>
                    <div style={{ color: '#192452', fontWeight: '600' }}>
                      {startupData.metadata?.analysisId || 'N/A'}
                    </div>
    </div>
                  <div style={{ 
                    padding: '8px',
                    backgroundColor: '#ffffff',
                    borderRadius: '5px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ color: '#64748b', marginBottom: '3px' }}>Analysis Date</div>
                    <div style={{ color: '#192452', fontWeight: '600' }}>
                      {startupData.metadata?.analysisDate || new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric'
                      })}
                    </div>
                </div>
                  <div style={{ 
                    padding: '8px',
                    backgroundColor: '#ffffff',
                    borderRadius: '5px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ color: '#64748b', marginBottom: '3px' }}>Processing Time</div>
                    <div style={{ color: '#192452', fontWeight: '600' }}>
                      {startupData.metadata?.processingTime || 'N/A'}
                    </div>
                </div>
                  <div style={{ 
                    padding: '8px',
                    backgroundColor: '#ffffff',
                    borderRadius: '5px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ color: '#64748b', marginBottom: '3px' }}>AI Confidence</div>
                    <div style={{ color: '#10b981', fontWeight: 'bold' }}>
                      {((startupData.metadata?.confidence || startupData.investmentScore / 10) * 100).toFixed(0)}%
                    </div>
                </div>
              </div>
              </div>
              
              <div className="page-break-avoid" style={{ 
                marginBottom: '20px',
                padding: '14px',
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                borderRadius: '8px',
                border: '2px solid #0099ff',
                pageBreakInside: 'avoid'
              }}>
                <p style={{ 
                  fontSize: '8pt',
                  color: '#1e40af',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  <strong style={{ color: '#0099ff', fontSize: '9pt' }}>⚠️ Disclaimer:</strong> This report has been generated by LetsAnalyse's AI-powered startup analysis platform. 
                  The information contained herein is based on available data and AI analysis, and should be used as part of a comprehensive 
                  due diligence process. Investment decisions should not be made solely based on this analysis. Always consult with 
                  qualified financial advisors before making investment decisions.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div style={{ 
              borderTop: '2px solid #e2e8f0',
              paddingTop: '16px',
              marginTop: '25px',
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '10pt',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '6px'
              }}>
                CONFIDENTIAL & PROPRIETARY
              </div>
              <p style={{ 
                fontSize: '8pt',
                color: '#64748b',
                lineHeight: '1.5',
                margin: '0 0 12px 0'
              }}>
                This document contains confidential information intended solely for the use of the recipient.<br/>
                LetsAnalyse Investment Analysis Report • Generated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric'
                })} • Version 1.0
              </p>
              <p style={{ 
                fontSize: '7pt',
                color: '#94a3b8',
                margin: 0
              }}>
                This analysis is for informational purposes only and does not constitute investment advice.
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default PDFExport;

