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
          <div className="html2pdf__page-break" style={{ 
            padding: '50px 50px 40px 50px', 
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
                display: 'inline-block',
                padding: '10px 24px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '30px',
                fontSize: '10pt',
                fontWeight: '600',
                color: '#ffffff',
                letterSpacing: '1.5px',
                marginTop: '20px'
              }}>
                CONFIDENTIAL INVESTMENT ANALYSIS
              </div>
            </div>

            <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '30px', paddingBottom: '30px' }}>
              <div style={{ 
                fontSize: '48pt', 
                fontWeight: 'bold',
                marginBottom: '20px',
                color: '#ffffff',
                lineHeight: '1.2'
              }}>
                {startupData.name}
              </div>
              <div style={{ 
                fontSize: '18pt',
                color: 'rgba(255, 255, 255, 0.95)',
                fontStyle: 'italic',
                marginBottom: '40px'
              }}>
                {startupData.tagline}
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                flexWrap: 'wrap',
                marginBottom: '50px'
              }}>
                <span style={{ 
                  padding: '10px 20px',
                  backgroundColor: 'rgba(59, 130, 246, 0.9)',
                  borderRadius: '10px',
                  fontSize: '10pt',
                  fontWeight: '600'
                }}>{startupData.sector}</span>
                <span style={{ 
                  padding: '10px 20px',
                  backgroundColor: 'rgba(168, 85, 247, 0.9)',
                  borderRadius: '10px',
                  fontSize: '10pt',
                  fontWeight: '600'
                }}>{startupData.stage}</span>
                <span style={{ 
                  padding: '10px 20px',
                  backgroundColor: 'rgba(100, 116, 139, 0.9)',
                  borderRadius: '10px',
                  fontSize: '10pt',
                  fontWeight: '600'
                }}>{startupData.location}</span>
              </div>

              <div style={{ 
                margin: '0 auto 35px auto',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ 
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}>
                  <div style={{ 
                    fontSize: '56pt',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    lineHeight: '1',
                    marginBottom: '5px'
                  }}>
                    {startupData.investmentScore}
                  </div>
                  <div style={{ 
                    fontSize: '11pt',
                    color: '#ffffff',
                    fontWeight: '600',
                    opacity: 0.95
                  }}>
                    out of 10
                  </div>
                </div>
              </div>

              <div style={{ 
                fontSize: '18pt',
                fontWeight: '600',
                color: '#ffffff',
                marginTop: '10px'
              }}>
                {startupData.recommendation || startupData.aiSummary?.investmentRecommendation}
              </div>
            </div>

            <div style={{ 
              flex: '0 0 auto',
              borderTop: '1px solid rgba(255, 255, 255, 0.3)',
              paddingTop: '25px',
              paddingBottom: '10px'
            }}>
              <div style={{ fontSize: '10pt', color: '#ffffff', opacity: 0.9, marginBottom: '8px' }}>
                Analysis Date: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div style={{ fontSize: '9pt', color: '#ffffff', opacity: 0.8 }}>
                Version: 1.0
              </div>
            </div>
          </div>

          {/* Executive Summary Page */}
          <div className="html2pdf__page-break" style={{ 
            padding: '40px', 
            minHeight: '1050px',
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              borderBottom: '2px solid #e2e8f0',
              paddingBottom: '8px',
              marginBottom: '20px'
            }}>
              <p style={{ 
                fontSize: '10pt', 
                color: '#64748b',
                margin: 0
              }}>
                Investment Analysis Report • {startupData.name}
              </p>
            </div>

            <h1 style={{ 
              fontSize: '24pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '25px'
            }}>
              Executive Summary
            </h1>

            {/* Confidence Score Banner */}
            <div style={{ 
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              padding: '25px',
              borderRadius: '10px',
              marginBottom: '30px',
              border: '2px solid #3b82f6',
              borderLeft: '4px solid #3b82f6'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <span style={{ 
                  fontSize: '11pt',
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
                    maxWidth: '150px',
                    height: '8px',
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
                    fontSize: '16pt',
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
              fontSize: '16pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '18px'
            }}>
              Company Overview
            </h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '12px',
              marginBottom: '30px'
            }}>
              <div style={{ 
                backgroundColor: '#f8fafc',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ 
                  fontSize: '9pt',
                  color: '#64748b',
                  marginBottom: '5px'
                }}>
                  Founded
                </div>
                <div style={{ 
                  fontSize: '16pt',
                  fontWeight: 'bold',
                  color: '#1e293b'
                }}>
                  {startupData.founded}
                </div>
              </div>
              <div style={{ 
                backgroundColor: '#f8fafc',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ 
                  fontSize: '9pt',
                  color: '#64748b',
                  marginBottom: '5px'
                }}>
                  Team Size
                </div>
                <div style={{ 
                  fontSize: '16pt',
                  fontWeight: 'bold',
                  color: '#1e293b'
                }}>
                  {startupData.employees}
                </div>
              </div>
              <div style={{ 
                backgroundColor: '#f8fafc',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ 
                  fontSize: '9pt',
                  color: '#64748b',
                  marginBottom: '5px'
                }}>
                  Website
                </div>
                <div style={{ 
                  fontSize: '10pt',
                  fontWeight: 'bold',
                  color: '#3b82f6'
                }}>
                  {startupData.website || 'N/A'}
                </div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <h2 style={{ 
              fontSize: '16pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '18px'
            }}>
              Key Metrics
            </h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '15px',
              marginBottom: '30px'
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
                    padding: '18px',
                    borderRadius: '10px',
                    border: `2px solid ${color.border}`
                  }}>
                    <div style={{ 
                      fontSize: '9pt',
                      color: '#64748b',
                      marginBottom: '8px',
                      fontWeight: '600'
                    }}>
                      {key === 'arr' ? 'Annual Recurring Revenue' : 
                       key === 'cac' ? 'Customer Acquisition Cost' : 
                       key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                    <div style={{ 
                      fontSize: '20pt',
                      fontWeight: 'bold',
                      color: '#1e293b',
                      marginBottom: '8px'
                    }}>
                      {metric.value}
                    </div>
                    <div style={{ 
                      fontSize: '9pt',
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
            <div style={{ 
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              padding: '20px',
              borderRadius: '10px',
              border: '2px solid #3b82f6',
              borderLeft: '4px solid #3b82f6'
            }}>
              <h3 style={{ 
                fontSize: '13pt', 
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '12px'
              }}>
                Investment Thesis
              </h3>
              <p style={{ 
                lineHeight: '1.7',
                color: '#334155',
                fontSize: '10pt',
                margin: 0
              }}>
                {startupData.aiSummary?.investmentThesis}
              </p>
            </div>
          </div>

          {/* AI Insights Page */}
          <div className="html2pdf__page-break" style={{ 
            padding: '40px', 
            minHeight: '1050px',
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              borderBottom: '2px solid #e2e8f0',
              paddingBottom: '8px',
              marginBottom: '20px'
            }}>
              <p style={{ 
                fontSize: '10pt', 
                color: '#64748b',
                margin: 0
              }}>
                Investment Analysis Report • {startupData.name}
              </p>
            </div>

            <h1 style={{ 
              fontSize: '24pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '25px'
            }}>
              Strengths & Concerns
            </h1>

            {/* Key Highlights */}
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '16pt', 
                fontWeight: 'bold',
                color: '#10b981',
                marginBottom: '15px'
              }}>
                ✓ Key Highlights
              </h2>
              <div style={{ display: 'grid', gap: '10px' }}>
                {(startupData.aiSummary?.keyHighlights || []).map((highlight, idx) => (
                  <div key={idx} style={{ 
                    padding: '12px 15px',
                    background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                    borderLeft: '4px solid #10b981',
                    borderRadius: '8px',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'start'
                  }}>
                    <span style={{
                      color: '#10b981',
                      fontSize: '12pt',
                      fontWeight: 'bold',
                      marginTop: '2px'
                    }}>✓</span>
                    <p style={{ 
                      lineHeight: '1.6', 
                      color: '#065f46',
                      margin: 0,
                      fontSize: '10pt'
                    }}>
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Concerns */}
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '16pt', 
                fontWeight: 'bold',
                color: '#f59e0b',
                marginBottom: '15px'
              }}>
                ⚠ Main Concerns
              </h2>
              <div style={{ display: 'grid', gap: '10px' }}>
                {(startupData.aiSummary?.mainConcerns || []).map((concern, idx) => (
                  <div key={idx} style={{ 
                    padding: '12px 15px',
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    borderLeft: '4px solid #f59e0b',
                    borderRadius: '8px',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'start'
                  }}>
                    <span style={{
                      color: '#f59e0b',
                      fontSize: '12pt',
                      fontWeight: 'bold',
                      marginTop: '2px'
                    }}>⚠</span>
                    <p style={{ 
                      lineHeight: '1.6', 
                      color: '#78350f',
                      margin: 0,
                      fontSize: '10pt'
                    }}>
                      {concern}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Potential */}
            <h2 style={{ 
              fontSize: '16pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '15px'
            }}>
              Growth Potential
            </h2>
            <div style={{ 
              background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
              padding: '20px',
              borderRadius: '10px',
              border: '2px solid #a855f7',
              marginBottom: '20px'
            }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <span style={{ 
                  fontSize: '13pt',
                  fontWeight: 'bold',
                  color: '#1e293b'
                }}>
                  Overall Score
                </span>
                <span style={{ 
                  fontSize: '28pt',
                  fontWeight: 'bold',
                  color: '#a855f7'
                }}>
                  {startupData.growthPotential?.score}/10
                </span>
              </div>
              <div style={{ 
                width: '100%',
                height: '10px',
                backgroundColor: 'rgba(168, 85, 247, 0.2)',
                borderRadius: '5px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${(startupData.growthPotential?.score || 0) * 10}%`,
                  height: '100%',
                  backgroundColor: '#a855f7',
                  borderRadius: '5px'
                }}></div>
              </div>
            </div>
          </div>

          {/* Competitor Analysis Page */}
          <div className="html2pdf__page-break" style={{ 
            padding: '40px', 
            minHeight: '1050px',
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              borderBottom: '2px solid #e2e8f0',
              paddingBottom: '8px',
              marginBottom: '20px'
            }}>
              <p style={{ 
                fontSize: '10pt', 
                color: '#64748b',
                margin: 0
              }}>
                Investment Analysis Report • {startupData.name}
              </p>
            </div>

            <h1 style={{ 
              fontSize: '24pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '25px'
            }}>
              Competitive Landscape
            </h1>

            {/* Competitor Table */}
            <div style={{ 
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              border: '2px solid #e2e8f0',
              overflow: 'hidden',
              marginBottom: '20px'
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
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: '10pt',
                      color: '#1e293b',
                      borderBottom: '2px solid #e2e8f0'
                    }}>Competitor</th>
                    <th style={{ 
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: '10pt',
                      color: '#1e293b',
                      borderBottom: '2px solid #e2e8f0'
                    }}>Funding</th>
                    <th style={{ 
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: '10pt',
                      color: '#1e293b',
                      borderBottom: '2px solid #e2e8f0'
                    }}>ARR</th>
                    <th style={{ 
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: '10pt',
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
                        padding: '12px',
                        fontWeight: 'bold',
                        fontSize: '10pt',
                        color: '#1e293b'
                      }}>{competitor.name}</td>
                      <td style={{ 
                        padding: '12px',
                        fontSize: '9pt',
                        color: '#64748b'
                      }}>{competitor.funding}</td>
                      <td style={{ 
                        padding: '12px',
                        fontSize: '10pt',
                        color: '#10b981',
                        fontWeight: '600'
                      }}>{competitor.arr}</td>
                      <td style={{ 
                        padding: '12px',
                        fontSize: '9pt',
                        color: '#64748b'
                      }}>{competitor.strength}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Competitive Advantage Box */}
            <div style={{ 
              background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
              padding: '18px',
              borderRadius: '10px',
              border: '2px solid #a855f7',
              borderLeft: '4px solid #a855f7'
            }}>
              <h3 style={{ 
                fontSize: '12pt',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '10px'
              }}>
                Competitive Advantage
              </h3>
              <p style={{ 
                fontSize: '10pt',
                color: '#581c87',
                lineHeight: '1.6',
                margin: 0
              }}>
                {startupData.name}'s unique positioning in the market provides a defensible moat through 
                innovative technology, strong market presence, and strategic partnerships that differentiate 
                from traditional competitors.
              </p>
            </div>
          </div>

          {/* Risk Assessment Page */}
          <div className="html2pdf__page-break" style={{ 
            padding: '40px', 
            minHeight: '1050px',
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              borderBottom: '2px solid #e2e8f0',
              paddingBottom: '8px',
              marginBottom: '20px'
            }}>
              <p style={{ 
                fontSize: '10pt', 
                color: '#64748b',
                margin: 0
              }}>
                Investment Analysis Report • {startupData.name}
              </p>
            </div>

            <h1 style={{ 
              fontSize: '24pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '25px'
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
                  marginBottom: '15px',
                  padding: '16px',
                  background: color.bg,
                  borderLeft: `4px solid ${color.border}`,
                  borderRadius: '10px',
                  border: `2px solid ${color.border}`,
                  pageBreakInside: 'avoid'
                }}>
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '10px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        fontSize: '13pt', 
                        fontWeight: 'bold',
                        color: '#1e293b',
                        marginBottom: '5px'
                      }}>
                        {risk.issue}
                      </h3>
                      <div style={{ 
                        fontSize: '9pt',
                        color: '#64748b',
                        fontWeight: '600'
                      }}>
                        {risk.type}
                      </div>
                    </div>
                    <span style={{ 
                      padding: '5px 12px',
                      backgroundColor: color.badge,
                      color: '#ffffff',
                      borderRadius: '5px',
                      fontSize: '9pt',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                      marginLeft: '12px'
                    }}>
                      {risk.severity}
                    </span>
                  </div>
                  
                  <p style={{ 
                    marginBottom: '12px',
                    lineHeight: '1.6',
                    fontSize: '10pt',
                    color: color.text
                  }}>
                    {risk.description}
                  </p>
                  
                  <div style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(0, 0, 0, 0.05)'
                  }}>
                    <div style={{ 
                      fontSize: '9pt',
                      fontWeight: '600',
                      color: '#10b981',
                      marginBottom: '5px'
                    }}>
                      Mitigation
                    </div>
                    <p style={{ 
                      margin: 0,
                      fontSize: '9pt',
                      color: '#334155',
                      lineHeight: '1.6'
                    }}>
                      {risk.mitigation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Growth Potential Page */}
          <div className="html2pdf__page-break" style={{ 
            padding: '40px', 
            minHeight: '1050px',
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              borderBottom: '2px solid #e2e8f0',
              paddingBottom: '8px',
              marginBottom: '20px'
            }}>
              <p style={{ 
                fontSize: '10pt', 
                color: '#64748b',
                margin: 0
              }}>
                Investment Analysis Report • {startupData.name}
              </p>
            </div>

            <h1 style={{ 
              fontSize: '24pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '25px'
            }}>
              Growth Potential
            </h1>

            {/* Growth Score */}
            <div style={{ 
              textAlign: 'center',
              padding: '30px',
              background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
              borderRadius: '12px',
              marginBottom: '30px',
              border: '2px solid #a855f7'
            }}>
              <div style={{ 
                fontSize: '48pt',
                fontWeight: 'bold',
                color: '#a855f7',
                lineHeight: '1',
                marginBottom: '10px'
              }}>
                {startupData.growthPotential?.score}/10
              </div>
              <div style={{ 
                fontSize: '14pt',
                color: '#581c87',
                fontWeight: '600'
              }}>
                Overall Growth Potential
              </div>
              <div style={{ 
                width: '70%',
                height: '8px',
                backgroundColor: 'rgba(168, 85, 247, 0.2)',
                borderRadius: '4px',
                margin: '15px auto 0',
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
              fontSize: '16pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '18px'
            }}>
              Growth Drivers
            </h2>

            {(startupData.growthPotential?.factors || []).map((factor, idx) => {
              const scoreColor = factor.score >= 8 ? '#10b981' : factor.score >= 6 ? '#f59e0b' : '#ef4444';
              
              return (
                <div key={idx} className="page-break-avoid" style={{ 
                  marginBottom: '12px',
                  padding: '14px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  pageBreakInside: 'avoid'
                }}>
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '10px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        fontSize: '11pt',
                        fontWeight: 'bold',
                        color: '#1e293b',
                        marginBottom: '5px'
                      }}>
                        {factor.name}
                      </h3>
                      <span style={{ 
                        fontSize: '9pt',
                        color: '#64748b',
                        fontWeight: '600'
                      }}>
                        Weight: {factor.weight}%
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: '16pt',
                      fontWeight: 'bold',
                      color: scoreColor,
                      marginLeft: '12px'
                    }}>
                      {factor.score}/10
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div style={{ 
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '4px',
                    marginBottom: '10px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${factor.score * 10}%`,
                      height: '100%',
                      backgroundColor: scoreColor,
                      borderRadius: '4px'
                    }}></div>
                  </div>
                  
                  <p style={{ 
                    fontSize: '9pt',
                    color: '#64748b',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {factor.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Strategic Recommendations Page */}
          <div className="html2pdf__page-break" style={{ 
            padding: '40px', 
            minHeight: '1050px',
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              borderBottom: '2px solid #e2e8f0',
              paddingBottom: '8px',
              marginBottom: '20px'
            }}>
              <p style={{ 
                fontSize: '10pt', 
                color: '#64748b',
                margin: 0
              }}>
                Investment Analysis Report • {startupData.name}
              </p>
            </div>

            <h1 style={{ 
              fontSize: '24pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '25px'
            }}>
              Strategic Recommendations
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {(startupData.growthPotential?.recommendations || []).map((rec, idx) => {
                const priorityColors = {
                  'High': { bg: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', badge: '#dc2626' },
                  'Medium': { bg: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)', badge: '#ea580c' },
                  'Low': { bg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', badge: '#2563eb' }
                };
                const color = priorityColors[rec.priority] || priorityColors['Medium'];
                
                return (
                  <div key={idx} className="page-break-avoid" style={{ 
                    padding: '14px',
                    background: color.bg,
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    pageBreakInside: 'avoid'
                  }}>
                    <div style={{ 
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      marginBottom: '10px'
                    }}>
                      <span style={{ 
                        padding: '4px 10px',
                        backgroundColor: color.badge,
                        color: '#ffffff',
                        borderRadius: '4px',
                        fontSize: '9pt',
                        fontWeight: 'bold'
                      }}>
                        {rec.priority}
                      </span>
                      <span style={{ 
                        padding: '4px 10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        color: '#64748b',
                        borderRadius: '4px',
                        fontSize: '9pt',
                        fontWeight: '600'
                      }}>
                        {rec.timeline}
                      </span>
                    </div>
                    
                    <h3 style={{ 
                      fontSize: '11pt', 
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
          <div className="html2pdf__page-break" style={{ 
            padding: '40px', 
            minHeight: '1050px',
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              borderBottom: '2px solid #e2e8f0',
              paddingBottom: '8px',
              marginBottom: '20px'
            }}>
              <p style={{ 
                fontSize: '10pt', 
                color: '#64748b',
                margin: 0
              }}>
                Investment Analysis Report • {startupData.name}
              </p>
            </div>

            <h1 style={{ 
              fontSize: '24pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '25px'
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
          <div className="page-break-after" style={{ 
            padding: '35px 35px', 
            minHeight: '1050px',
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <h1 style={{ 
              fontSize: '24pt', 
              fontWeight: 'bold',
              color: '#192452',
              marginBottom: '30px',
              borderBottom: '3px solid #0099ff',
              paddingBottom: '10px'
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
          <div className="page-break-after" style={{ 
            padding: '35px 35px', 
            minHeight: '1050px',
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <h1 style={{ 
              fontSize: '24pt', 
              fontWeight: 'bold',
              color: '#192452',
              marginBottom: '30px',
              borderBottom: '3px solid #8d51ff',
              paddingBottom: '10px'
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
          <div className="page-break-after" style={{ 
            padding: '35px 35px', 
            minHeight: '1050px',
            pageBreakAfter: 'always',
            boxSizing: 'border-box'
          }}>
            <h1 style={{ 
              fontSize: '24pt', 
              fontWeight: 'bold',
              color: '#192452',
              marginBottom: '30px',
              borderBottom: '3px solid #0099ff',
              paddingBottom: '10px'
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
            padding: '40px', 
            minHeight: '1050px',
            boxSizing: 'border-box'
          }}>
            <div style={{ 
              borderBottom: '2px solid #e2e8f0',
              paddingBottom: '8px',
              marginBottom: '30px'
            }}>
              <p style={{ 
                fontSize: '10pt', 
                color: '#64748b',
                margin: 0
              }}>
                Investment Analysis Report • {startupData.name}
              </p>
            </div>

            <h1 style={{ 
              fontSize: '28pt', 
              fontWeight: 'bold',
              color: '#1e293b',
              margin: 0,
              textAlign: 'center',
              marginBottom: '30px'
            }}>
              Investment Summary
            </h1>

            {/* Investment Summary Box */}
            <div style={{ 
              textAlign: 'center',
              padding: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '16px',
              marginBottom: '30px',
              color: '#ffffff'
            }}>
              <h2 style={{ 
                fontSize: '20pt',
                fontWeight: 'bold',
                marginBottom: '25px',
                color: '#ffffff'
              }}>
                Investment Recommendation
              </h2>
              
              <div style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                marginBottom: '20px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '42pt',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    lineHeight: '1'
                  }}>
                    {startupData.investmentScore}
                  </div>
                  <div style={{ 
                    fontSize: '10pt',
                    color: '#ffffff',
                    marginTop: '15px'
                  }}>
                    out of 10
                  </div>
                </div>
              </div>
              
              <div style={{ 
                fontSize: '18pt',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '20px'
              }}>
                {startupData.aiSummary?.investmentRecommendation || startupData.recommendation}
              </div>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '15px',
                marginTop: '25px'
              }}>
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '15px',
                  borderRadius: '10px'
                }}>
                  <div style={{ fontSize: '24pt', fontWeight: 'bold', color: '#ffffff', marginBottom: '5px' }}>
                    {startupData.investmentScore}/10
                  </div>
                  <div style={{ fontSize: '9pt', color: '#ffffff', opacity: 0.9 }}>Investment Score</div>
                </div>
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '15px',
                  borderRadius: '10px'
                }}>
                  <div style={{ fontSize: '24pt', fontWeight: 'bold', color: '#ffffff', marginBottom: '5px' }}>
                    {startupData.growthPotential?.score}/10
                  </div>
                  <div style={{ fontSize: '9pt', color: '#ffffff', opacity: 0.9 }}>Growth Potential</div>
                </div>
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '15px',
                  borderRadius: '10px'
                }}>
                  <div style={{ fontSize: '24pt', fontWeight: 'bold', color: '#ffffff', marginBottom: '5px' }}>
                    {startupData.aiSummary?.confidenceScore || startupData.investmentScore}/10
                  </div>
                  <div style={{ fontSize: '9pt', color: '#ffffff', opacity: 0.9 }}>Confidence</div>
                </div>
              </div>
            </div>

            {/* Final Investment Thesis */}
            <div style={{ 
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              padding: '25px',
              borderRadius: '12px',
              border: '2px solid #3b82f6',
              borderLeft: '4px solid #3b82f6',
              marginBottom: '30px'
            }}>
              <h3 style={{ 
                fontSize: '16pt', 
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '15px'
              }}>
                Investment Thesis
              </h3>
              <p style={{ 
                lineHeight: '1.7',
                fontSize: '10pt',
                color: '#1e40af',
                margin: 0
              }}>
                {startupData.aiSummary?.investmentThesis}
        </p>
      </div>

            {/* Report Metadata */}
            <div style={{ 
              borderTop: '3px solid #e2e8f0',
              paddingTop: '25px',
              marginTop: '40px'
            }}>
              <div style={{ 
                backgroundColor: '#f8fafc',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '25px'
              }}>
                <h3 style={{ 
                  fontSize: '12pt',
                  fontWeight: 'bold',
                  color: '#192452',
                  marginBottom: '15px'
                }}>
                  📋 Report Information
                </h3>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px',
                  fontSize: '9pt'
                }}>
                  <div style={{ 
                    padding: '10px',
                    backgroundColor: '#ffffff',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ color: '#64748b', marginBottom: '4px' }}>Report ID</div>
                    <div style={{ color: '#192452', fontWeight: '600' }}>
                      {startupData.metadata?.analysisId || 'N/A'}
                    </div>
    </div>
                  <div style={{ 
                    padding: '10px',
                    backgroundColor: '#ffffff',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ color: '#64748b', marginBottom: '4px' }}>Analysis Date</div>
                    <div style={{ color: '#192452', fontWeight: '600' }}>
                      {startupData.metadata?.analysisDate || new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric'
                      })}
                    </div>
                </div>
                  <div style={{ 
                    padding: '10px',
                    backgroundColor: '#ffffff',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ color: '#64748b', marginBottom: '4px' }}>Processing Time</div>
                    <div style={{ color: '#192452', fontWeight: '600' }}>
                      {startupData.metadata?.processingTime || 'N/A'}
                    </div>
                </div>
                  <div style={{ 
                    padding: '10px',
                    backgroundColor: '#ffffff',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ color: '#64748b', marginBottom: '4px' }}>AI Confidence</div>
                    <div style={{ color: '#10b981', fontWeight: 'bold' }}>
                      {((startupData.metadata?.confidence || startupData.investmentScore / 10) * 100).toFixed(0)}%
                    </div>
                </div>
              </div>
              </div>
              
              <div style={{ 
                marginBottom: '25px',
                padding: '18px',
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                borderRadius: '10px',
                border: '2px solid #0099ff'
              }}>
                <p style={{ 
                  fontSize: '9pt',
                  color: '#1e40af',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  <strong style={{ color: '#0099ff', fontSize: '10pt' }}>⚠️ Disclaimer:</strong> This report has been generated by LetsAnalyse's AI-powered startup analysis platform. 
                  The information contained herein is based on available data and AI analysis, and should be used as part of a comprehensive 
                  due diligence process. Investment decisions should not be made solely based on this analysis. Always consult with 
                  qualified financial advisors before making investment decisions.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div style={{ 
              borderTop: '2px solid #e2e8f0',
              paddingTop: '20px',
              marginTop: '30px',
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '11pt',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '8px'
              }}>
                CONFIDENTIAL & PROPRIETARY
              </div>
              <p style={{ 
                fontSize: '9pt',
                color: '#64748b',
                lineHeight: '1.6',
                margin: '0 0 15px 0'
              }}>
                This document contains confidential information intended solely for the use of the recipient.<br/>
                Investment Analysis Report • Generated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric'
                })} • Version 1.0
              </p>
              <p style={{ 
                fontSize: '8pt',
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

