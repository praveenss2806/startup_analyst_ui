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
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'],
          before: '.page-break-before',
          after: '.page-break-after',
          avoid: ['div', '.page-break-avoid']
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

  // Reusable Header Component
  const PageHeader = ({ pageNum }) => (
    <div style={{ 
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '2px solid #0099ff',
      paddingBottom: '8px',
      marginBottom: '15px'
    }}>
      <div>
        <div style={{ 
          fontSize: '12pt', 
          fontWeight: 'bold',
          color: '#f7ffff',
          marginBottom: '2px'
        }}>
          LetsAnalyse
        </div>
        <div style={{ 
          fontSize: '8pt', 
          color: '#f7ffff',
          opacity: 0.6
        }}>
          Investment Analysis • {startupData.name}
        </div>
      </div>
      <div style={{ 
        fontSize: '8pt', 
        color: '#f7ffff',
        opacity: 0.6,
        textAlign: 'right'
      }}>
        Page {pageNum}
      </div>
    </div>
  );

  // Reusable Footer Component
  const PageFooter = () => (
    <div style={{ 
      borderTop: '1px solid rgba(247, 255, 255, 0.2)',
      paddingTop: '8px',
      marginTop: '12px',
      textAlign: 'center'
    }}>
      <div style={{ 
        fontSize: '7pt',
        color: '#f7ffff',
        opacity: 0.5
      }}>
        © {new Date().getFullYear()} LetsAnalyse • Confidential & Proprietary
      </div>
    </div>
  );

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
          backgroundColor: '#192452',
          fontFamily: 'Arial, sans-serif',
          fontSize: '10pt',
          lineHeight: '1.4',
          color: '#f7ffff',
          boxSizing: 'border-box'
        }}>
          
          {/* Cover Page */}
          <div style={{ 
            padding: '50px 40px 40px 40px', 
            backgroundColor: '#192452',
            color: '#f7ffff',
            pageBreakAfter: 'always',
            textAlign: 'center',
            boxSizing: 'border-box'
          }}>
            {/* Header */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{ 
                fontSize: '36pt',
                fontWeight: 'bold',
                color: '#f7ffff',
                letterSpacing: '4px',
                marginBottom: '20px'
              }}>
                LETSANALYSE
              </div>
              <div style={{ 
                height: '4px',
                width: '150px',
                backgroundColor: '#0099ff',
                margin: '0 auto 30px auto'
              }}></div>
              <div style={{ 
                display: 'inline-block',
                padding: '14px 32px',
                backgroundColor: '#0099ff',
                borderRadius: '8px',
                fontSize: '11pt',
                fontWeight: '700',
                color: '#f7ffff',
                letterSpacing: '2px'
              }}>
                CONFIDENTIAL INVESTMENT ANALYSIS
              </div>
            </div>

            {/* Company Name */}
            <div style={{ margin: '60px 0 50px 0' }}>
              <div style={{ 
                fontSize: '56pt', 
                fontWeight: 'bold',
                marginBottom: '20px',
                color: '#f7ffff',
                lineHeight: '1',
                letterSpacing: '2px'
              }}>
                {startupData.name}
              </div>
              <div style={{ 
                fontSize: '18pt',
                color: '#0099ff',
                marginBottom: '45px',
                fontWeight: '500',
                fontStyle: 'italic'
              }}>
                {startupData.tagline}
              </div>
              
              {/* Info Badges */}
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                gap: '15px',
                flexWrap: 'wrap',
                marginBottom: '60px'
              }}>
                <span style={{ 
                  padding: '12px 24px',
                  backgroundColor: '#0099ff',
                  borderRadius: '8px',
                  fontSize: '12pt',
                  fontWeight: '700',
                  color: '#f7ffff'
                }}>{startupData.sector}</span>
                <span style={{ 
                  padding: '12px 24px',
                  backgroundColor: '#8d51ff',
                  borderRadius: '8px',
                  fontSize: '12pt',
                  fontWeight: '700',
                  color: '#f7ffff'
                }}>{startupData.stage}</span>
                <span style={{ 
                  padding: '12px 24px',
                  backgroundColor: '#fa8524',
                  borderRadius: '8px',
                  fontSize: '12pt',
                  fontWeight: '700',
                  color: '#f7ffff'
                }}>{startupData.location}</span>
              </div>

              {/* Investment Score */}
              <div style={{ marginBottom: '50px' }}>
                <div style={{ 
                  display: 'inline-block',
                  width: '220px',
                  height: '220px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(8, 206, 107, 0.15)',
                  border: '6px solid #08ce6b',
                  padding: '60px 20px',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ 
                    fontSize: '72pt',
                    fontWeight: 'bold',
                    color: '#08ce6b',
                    lineHeight: '1',
                    marginBottom: '15px'
                  }}>
                    {startupData.investmentScore}
                  </div>
                  <div style={{ 
                    fontSize: '12pt',
                    color: '#f7ffff',
                    fontWeight: '600',
                    opacity: 0.9
                  }}>
                    out of 10
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div style={{ 
                display: 'inline-block',
                padding: '18px 40px',
                backgroundColor: '#08ce6b',
                borderRadius: '8px',
                fontSize: '18pt',
                fontWeight: '700',
                color: '#f7ffff',
                letterSpacing: '1px'
              }}>
                {startupData.recommendation || startupData.aiSummary?.investmentRecommendation}
              </div>
            </div>

            {/* Footer */}
            <div style={{ 
              borderTop: '2px solid rgba(0, 153, 255, 0.3)',
              paddingTop: '30px',
              marginTop: '60px'
            }}>
              <div style={{ 
                fontSize: '11pt', 
                color: '#f7ffff', 
                opacity: 0.8,
                marginBottom: '10px'
              }}>
                Analysis Date: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div style={{ fontSize: '10pt', color: '#f7ffff', opacity: 0.6 }}>
                Powered by LetsAnalyse AI • Version 1.0
              </div>
            </div>
          </div>

          {/* Executive Summary Page */}
          <div style={{ 
            padding: '20px 18px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box',
            backgroundColor: '#192452',
            color: '#f7ffff'
          }}>
            <PageHeader pageNum={1} />

            <h1 style={{ 
              fontSize: '18pt', 
              fontWeight: 'bold',
              color: '#f7ffff',
              marginBottom: '12px',
              marginTop: '0'
            }}>
              Executive Summary
            </h1>

            {/* Confidence Score Banner */}
            <div style={{ 
              backgroundColor: 'rgba(0, 153, 255, 0.15)',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '10px',
              border: '2px solid #0099ff',
              pageBreakInside: 'avoid',
              pageBreakBefore: 'avoid',
              pageBreakAfter: 'avoid'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ 
                  fontSize: '10pt',
                  fontWeight: '600',
                  color: '#f7ffff'
                }}>
                  Confidence Score
                </span>
                <span style={{ 
                  fontSize: '14pt',
                  fontWeight: 'bold',
                  color: '#0099ff'
                }}>
                  {startupData.aiSummary?.confidenceScore || startupData.investmentScore}/10
                </span>
              </div>
            </div>

            {/* Company Overview */}
              <h2 style={{ 
                fontSize: '12pt',
              fontWeight: 'bold',
              color: '#f7ffff',
              marginBottom: '6px',
              marginTop: '4px',
              pageBreakAfter: 'avoid'
            }}>
              Company Overview
            </h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '6px',
              marginBottom: '8px',
              pageBreakInside: 'avoid',
              pageBreakBefore: 'avoid'
            }}>
              <div style={{ 
                backgroundColor: 'rgba(247, 255, 255, 0.05)',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid rgba(247, 255, 255, 0.1)'
              }}>
                <div style={{ 
                  fontSize: '8pt',
                  color: '#f7ffff',
                  opacity: 0.6,
                  marginBottom: '4px'
                }}>
                  Founded
                </div>
                <div style={{ 
                  fontSize: '14pt',
                  fontWeight: 'bold',
                  color: '#f7ffff'
                }}>
                  {startupData.founded}
                </div>
              </div>
              <div style={{ 
                backgroundColor: 'rgba(247, 255, 255, 0.05)',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid rgba(247, 255, 255, 0.1)'
              }}>
                <div style={{ 
                  fontSize: '8pt',
                  color: '#f7ffff',
                  opacity: 0.6,
                  marginBottom: '4px'
                }}>
                  Team Size
                </div>
                <div style={{ 
                  fontSize: '14pt',
                  fontWeight: 'bold',
                  color: '#f7ffff'
                }}>
                  {startupData.employees}
                </div>
              </div>
              <div style={{ 
                backgroundColor: 'rgba(247, 255, 255, 0.05)',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid rgba(247, 255, 255, 0.1)'
              }}>
                <div style={{ 
                  fontSize: '8pt',
                  color: '#f7ffff',
                  opacity: 0.6,
                  marginBottom: '4px'
                }}>
                  Website
                </div>
                <div style={{ 
                  fontSize: '9pt',
                  fontWeight: 'bold',
                  color: '#0099ff'
                }}>
                  {startupData.website || 'N/A'}
                </div>
              </div>
            </div>

            {/* Key Metrics Grid */}
              <h2 style={{ 
                fontSize: '12pt',
              fontWeight: 'bold',
              color: '#f7ffff',
              marginBottom: '6px',
              marginTop: '4px',
              pageBreakAfter: 'avoid'
            }}>
              Key Metrics
            </h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '6px',
              marginBottom: '8px',
              pageBreakInside: 'avoid',
              pageBreakBefore: 'avoid'
            }}>
                {Object.entries(startupData.keyMetrics || {}).map(([key, metric], idx) => {
                  const colors = ['#08ce6b', '#0099ff', '#8d51ff', '#fa8524'];
                  const color = colors[idx % colors.length];
                  
                return (
                  <div key={idx} style={{ 
                    backgroundColor: `${color}20`,
                    padding: '10px',
                    borderRadius: '6px',
                    border: `2px solid ${color}`
                  }}>
                    <div style={{ 
                      fontSize: '8pt',
                      color: '#f7ffff',
                      opacity: 0.7,
                      marginBottom: '4px',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {key === 'arr' ? 'ARR' : 
                       key === 'cac' ? 'CAC' : 
                       key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                    <div style={{ 
                      fontSize: '14pt',
                      fontWeight: 'bold',
                      color: '#f7ffff',
                      marginBottom: '4px'
                    }}>
                      {metric.value}
                    </div>
                    <div style={{ 
                      fontSize: '8pt',
                      color: color,
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}>
                      <span>↑</span> {metric.change}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Investment Thesis */}
            <div style={{ 
              backgroundColor: 'rgba(0, 153, 255, 0.15)',
              padding: '10px',
              borderRadius: '6px',
              border: '2px solid #0099ff',
              pageBreakInside: 'avoid',
              pageBreakBefore: 'avoid',
              marginTop: '4px'
            }}>
              <h3 style={{ 
                fontSize: '11pt', 
                fontWeight: 'bold',
                color: '#f7ffff',
                margin: '0 0 6px 0'
              }}>
                Investment Thesis
              </h3>
              <p style={{ 
                lineHeight: '1.5',
                color: '#f7ffff',
                opacity: 0.9,
                fontSize: '9pt',
                margin: 0
              }}>
                {startupData.aiSummary?.investmentThesis}
              </p>
            <PageFooter />
          </div>

          {/* AI Insights Page */}
          <div style={{ 
            padding: '20px 18px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box',
            backgroundColor: '#192452',
            color: '#f7ffff'
          }}>
            <PageHeader pageNum={2} />

            <h1 style={{ 
              fontSize: '20pt', 
              fontWeight: 'bold',
              color: '#f7ffff',
              marginBottom: '15px'
            }}>
              Strengths & Concerns
            </h1>

            {/* Key Highlights */}
            <div style={{ marginBottom: '15px', pageBreakInside: 'avoid' }}>
              <h2 style={{ 
                fontSize: '14pt', 
                  fontWeight: 'bold',
                  color: '#08ce6b',
                  marginBottom: '10px'
                }}>
                  ✓ Key Highlights
                </h2>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {(startupData.aiSummary?.keyHighlights || []).map((highlight, idx) => (
                    <div key={idx} style={{ 
                      padding: '8px 10px',
                      backgroundColor: 'rgba(8, 206, 107, 0.15)',
                      borderLeft: '3px solid #08ce6b',
                      borderRadius: '6px',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'start',
                      pageBreakInside: 'avoid'
                    }}>
                      <span style={{
                        color: '#08ce6b',
                        fontSize: '11pt',
                        fontWeight: 'bold',
                        marginTop: '1px'
                      }}>✓</span>
                      <p style={{ 
                        lineHeight: '1.4', 
                        color: '#f7ffff',
                        opacity: 0.9,
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
              <div style={{ marginBottom: '15px', pageBreakInside: 'avoid' }}>
                <h2 style={{ 
                  fontSize: '12pt', 
                  fontWeight: 'bold',
                  color: '#fa8524',
                  marginBottom: '10px'
                }}>
                  ⚠ Main Concerns
                </h2>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {(startupData.aiSummary?.mainConcerns || []).map((concern, idx) => (
                    <div key={idx} style={{ 
                      padding: '8px 10px',
                      backgroundColor: 'rgba(250, 133, 36, 0.15)',
                      borderLeft: '3px solid #fa8524',
                      borderRadius: '6px',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'start',
                      pageBreakInside: 'avoid'
                    }}>
                      <span style={{
                        color: '#fa8524',
                        fontSize: '11pt',
                        fontWeight: 'bold',
                        marginTop: '1px'
                      }}>⚠</span>
                      <p style={{ 
                        lineHeight: '1.4', 
                        color: '#f7ffff',
                        opacity: 0.9,
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
                color: '#f7ffff',
                marginBottom: '10px'
              }}>
                Growth Potential
              </h2>
              <div style={{ 
                backgroundColor: 'rgba(141, 81, 255, 0.15)',
                padding: '14px',
                borderRadius: '8px',
                border: '2px solid #8d51ff',
                marginBottom: '12px',
                pageBreakInside: 'avoid'
              }}>
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px'
                }}>
                  <span style={{ 
                    fontSize: '13pt',
                    fontWeight: 'bold',
                    color: '#f7ffff'
                  }}>
                    Overall Score
                  </span>
                  <span style={{ 
                    fontSize: '26pt',
                    fontWeight: 'bold',
                    color: '#8d51ff'
                  }}>
                    {startupData.growthPotential?.score}/10
                  </span>
                </div>
                <div style={{ 
                  width: '100%',
                  height: '10px',
                  backgroundColor: 'rgba(141, 81, 255, 0.3)',
                  borderRadius: '5px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${(startupData.growthPotential?.score || 0) * 10}%`,
                    height: '100%',
                    backgroundColor: '#8d51ff',
                    borderRadius: '5px'
                  }}></div>
                </div>
              </div>
            <PageFooter />
          </div>

          {/* Competitor Analysis Page */}
          <div style={{ 
            padding: '20px 18px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box',
            backgroundColor: '#192452',
            color: '#f7ffff'
          }}>
            <PageHeader pageNum={3} />

            <h1 style={{ 
                fontSize: '18pt', 
                fontWeight: 'bold',
                color: '#f7ffff',
                marginBottom: '12px',
                marginTop: '0'
              }}>
                Competitive Landscape
              </h1>

              {/* Competitor Table */}
              <div style={{ 
                backgroundColor: 'rgba(247, 255, 255, 0.05)',
                borderRadius: '10px',
                border: '1px solid rgba(247, 255, 255, 0.1)',
                overflow: 'hidden',
                marginBottom: '20px',
                pageBreakInside: 'avoid'
              }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse'
                }}>
                  <thead>
                    <tr style={{ 
                      backgroundColor: 'rgba(247, 255, 255, 0.1)'
                    }}>
                      <th style={{ 
                        padding: '12px',
                        textAlign: 'left',
                        fontWeight: 'bold',
                        fontSize: '10pt',
                        color: '#f7ffff',
                        borderBottom: '1px solid rgba(247, 255, 255, 0.1)'
                      }}>Competitor</th>
                      <th style={{ 
                        padding: '12px',
                        textAlign: 'left',
                        fontWeight: 'bold',
                        fontSize: '10pt',
                        color: '#f7ffff',
                        borderBottom: '1px solid rgba(247, 255, 255, 0.1)'
                      }}>Funding</th>
                      <th style={{ 
                        padding: '12px',
                        textAlign: 'left',
                        fontWeight: 'bold',
                        fontSize: '10pt',
                        color: '#f7ffff',
                        borderBottom: '1px solid rgba(247, 255, 255, 0.1)'
                      }}>ARR</th>
                      <th style={{ 
                        padding: '12px',
                        textAlign: 'left',
                        fontWeight: 'bold',
                        fontSize: '10pt',
                        color: '#f7ffff',
                        borderBottom: '1px solid rgba(247, 255, 255, 0.1)'
                      }}>Key Strength</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(startupData.competitorAnalysis || []).map((competitor, idx) => (
                      <tr key={idx} style={{ 
                        borderBottom: idx < (startupData.competitorAnalysis || []).length - 1 ? '1px solid rgba(247, 255, 255, 0.05)' : 'none'
                      }}>
                        <td style={{ 
                          padding: '12px',
                          fontWeight: 'bold',
                          fontSize: '10pt',
                          color: '#f7ffff'
                        }}>{competitor.name}</td>
                        <td style={{ 
                          padding: '12px',
                          fontSize: '9pt',
                          color: '#f7ffff',
                          opacity: 0.7
                        }}>{competitor.funding}</td>
                        <td style={{ 
                          padding: '12px',
                          fontSize: '10pt',
                          color: '#08ce6b',
                          fontWeight: '600'
                        }}>{competitor.arr}</td>
                        <td style={{ 
                          padding: '12px',
                          fontSize: '9pt',
                          color: '#f7ffff',
                          opacity: 0.7
                        }}>{competitor.strength}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Competitive Advantage Box */}
              <div style={{ 
                backgroundColor: 'rgba(141, 81, 255, 0.15)',
                padding: '16px',
                borderRadius: '10px',
                border: '2px solid #8d51ff',
                pageBreakInside: 'avoid'
              }}>
                <h3 style={{ 
                  fontSize: '13pt',
                  fontWeight: 'bold',
                  color: '#f7ffff',
                  marginBottom: '10px'
                }}>
                  Competitive Advantage
                </h3>
                <p style={{ 
                  fontSize: '10pt',
                  color: '#f7ffff',
                  opacity: 0.9,
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {startupData.name}'s unique positioning in the market provides a defensible moat through 
                  innovative technology, strong market presence, and strategic partnerships that differentiate 
                  from traditional competitors.
                </p>
              </div>
            <PageFooter />
          </div>

          {/* Risk Assessment Page */}
          <div style={{ 
            padding: '20px 18px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box',
            backgroundColor: '#192452',
            color: '#f7ffff'
          }}>
            <PageHeader pageNum={4} />

            <h1 style={{ 
                fontSize: '18pt', 
                fontWeight: 'bold',
                color: '#f7ffff',
                marginBottom: '12px',
                marginTop: '0'
              }}>
                Risk Assessment
              </h1>

              {(startupData.riskAssessment || []).map((risk, idx) => {
                const severityColors = {
                  'High': { bg: 'rgba(239, 68, 68, 0.15)', border: '#ef4444', badge: '#ef4444' },
                  'Medium': { bg: 'rgba(250, 133, 36, 0.15)', border: '#fa8524', badge: '#fa8524' },
                  'Low': { bg: 'rgba(8, 206, 107, 0.15)', border: '#08ce6b', badge: '#08ce6b' }
                };
                const color = severityColors[risk.severity] || severityColors['Medium'];
                
                return (
                  <div key={idx} style={{ 
                    marginBottom: '14px',
                    padding: '16px',
                    backgroundColor: color.bg,
                    borderLeft: `4px solid ${color.border}`,
                    borderRadius: '10px',
                    border: `1px solid ${color.border}`,
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
                          fontSize: '12pt', 
                          fontWeight: 'bold',
                          color: '#f7ffff',
                          marginBottom: '6px'
                        }}>
                          {risk.issue}
                        </h3>
                        <div style={{ 
                          fontSize: '9pt',
                          color: '#f7ffff',
                          opacity: 0.7,
                          fontWeight: '600'
                        }}>
                          {risk.type}
                        </div>
                      </div>
                      <span style={{ 
                        padding: '5px 12px',
                        backgroundColor: color.badge,
                        color: '#f7ffff',
                        borderRadius: '6px',
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
                      lineHeight: '1.5',
                      fontSize: '10pt',
                      color: '#f7ffff',
                      opacity: 0.9
                    }}>
                      {risk.description}
                    </p>
                    
                    <div style={{ 
                      backgroundColor: 'rgba(247, 255, 255, 0.1)',
                      padding: '10px',
                      borderRadius: '6px'
                    }}>
                      <div style={{ 
                        fontSize: '9pt',
                        fontWeight: '600',
                        color: '#08ce6b',
                        marginBottom: '6px'
                      }}>
                        Mitigation Strategy
                      </div>
                      <p style={{ 
                        margin: 0,
                        fontSize: '9pt',
                        color: '#f7ffff',
                        opacity: 0.8,
                        lineHeight: '1.5'
                      }}>
                        {risk.mitigation}
                      </p>
                    </div>
                  </div>
                );
              })}
            <PageFooter />
          </div>

          {/* Growth Potential Page */}
          <div style={{ 
            padding: '20px 18px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box',
            backgroundColor: '#192452',
            color: '#f7ffff'
          }}>
            <PageHeader pageNum={5} />

            <h1 style={{ 
                fontSize: '18pt', 
                fontWeight: 'bold',
                color: '#f7ffff',
                marginBottom: '12px',
                marginTop: '0'
              }}>
                Growth Potential
              </h1>

              {/* Growth Score */}
              <div style={{ 
                textAlign: 'center',
                padding: '30px',
                backgroundColor: 'rgba(141, 81, 255, 0.15)',
                borderRadius: '12px',
                marginBottom: '25px',
                border: '2px solid #8d51ff',
                pageBreakInside: 'avoid'
              }}>
                <div style={{ 
                  fontSize: '48pt',
                  fontWeight: 'bold',
                  color: '#8d51ff',
                  lineHeight: '1',
                  marginBottom: '10px'
                }}>
                  {startupData.growthPotential?.score}/10
                </div>
                <div style={{ 
                  fontSize: '14pt',
                  color: '#f7ffff',
                  opacity: 0.8,
                  fontWeight: '600'
                }}>
                  Overall Growth Potential
                </div>
                <div style={{ 
                  width: '70%',
                  height: '8px',
                  backgroundColor: 'rgba(141, 81, 255, 0.3)',
                  borderRadius: '4px',
                  margin: '15px auto 0',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${(startupData.growthPotential?.score || 0) * 10}%`,
                    height: '100%',
                    backgroundColor: '#8d51ff',
                    borderRadius: '4px'
                  }}></div>
                </div>
              </div>

              {/* Growth Factors */}
              <h2 style={{ 
                fontSize: '16pt', 
                fontWeight: 'bold',
                color: '#f7ffff',
                marginBottom: '15px'
              }}>
                Growth Drivers
              </h2>

              {(startupData.growthPotential?.factors || []).map((factor, idx) => {
                const scoreColor = factor.score >= 8 ? '#08ce6b' : factor.score >= 6 ? '#fa8524' : '#ef4444';
                
                return (
                  <div key={idx} style={{ 
                    marginBottom: '12px',
                    padding: '14px',
                    backgroundColor: 'rgba(247, 255, 255, 0.05)',
                    borderRadius: '8px',
                    border: '1px solid rgba(247, 255, 255, 0.1)',
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
                          color: '#f7ffff',
                          marginBottom: '6px'
                        }}>
                          {factor.name}
                        </h3>
                        <span style={{ 
                          fontSize: '9pt',
                          color: '#f7ffff',
                          opacity: 0.6,
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
                      height: '7px',
                      backgroundColor: 'rgba(247, 255, 255, 0.1)',
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
                      color: '#f7ffff',
                      opacity: 0.8,
                      lineHeight: '1.5',
                      margin: 0
                    }}>
                      {factor.description}
                    </p>
                  </div>
                );
              })}
            <PageFooter />
          </div>

          {/* Strategic Recommendations Page */}
          <div style={{ 
            padding: '20px 18px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box',
            backgroundColor: '#192452',
            color: '#f7ffff'
          }}>
            <PageHeader pageNum={6} />

            <h1 style={{ 
                fontSize: '18pt', 
                fontWeight: 'bold',
                color: '#f7ffff',
                marginBottom: '12px',
                marginTop: '0'
              }}>
                Strategic Recommendations
              </h1>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {(startupData.growthPotential?.recommendations || []).map((rec, idx) => {
                  const priorityColors = {
                    'High': { bg: 'rgba(239, 68, 68, 0.15)', badge: '#ef4444' },
                    'Medium': { bg: 'rgba(250, 133, 36, 0.15)', badge: '#fa8524' },
                    'Low': { bg: 'rgba(0, 153, 255, 0.15)', badge: '#0099ff' }
                  };
                  const color = priorityColors[rec.priority] || priorityColors['Medium'];
                  
                  return (
                    <div key={idx} style={{ 
                      padding: '14px',
                      backgroundColor: color.bg,
                      borderRadius: '8px',
                      border: `1px solid ${color.badge}`,
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
                          color: '#f7ffff',
                          borderRadius: '4px',
                          fontSize: '9pt',
                          fontWeight: 'bold'
                        }}>
                          {rec.priority}
                        </span>
                        <span style={{ 
                          padding: '4px 10px',
                          backgroundColor: 'rgba(247, 255, 255, 0.2)',
                          color: '#f7ffff',
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
                        color: '#f7ffff',
                        margin: 0
                      }}>
                        {rec.title}
                      </h3>
                    </div>
                  );
                })}
              </div>
            <PageFooter />
          </div>

          {/* Financial Data Page */}
          <div style={{ 
            padding: '20px 18px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box',
            backgroundColor: '#192452',
            color: '#f7ffff'
          }}>
            <PageHeader pageNum={7} />

            <h1 style={{ 
                fontSize: '18pt', 
                fontWeight: 'bold',
                color: '#f7ffff',
                marginBottom: '12px',
                marginTop: '0'
              }}>
                Financial Performance
              </h1>

              {/* Revenue Overview */}
              {startupData.financialData?.revenue && (
                <div style={{ 
                  backgroundColor: 'rgba(8, 206, 107, 0.15)',
                  padding: '25px',
                  borderRadius: '12px',
                  marginBottom: '30px',
                  border: '2px solid #08ce6b',
                  pageBreakInside: 'avoid'
                }}>
                  <h2 style={{ 
                    fontSize: '18pt', 
                    fontWeight: 'bold',
                    color: '#f7ffff',
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
                      backgroundColor: 'rgba(247, 255, 255, 0.1)',
                      padding: '18px',
                      borderRadius: '10px'
                    }}>
                      <div style={{ 
                        fontSize: '9pt', 
                        color: '#f7ffff',
                        opacity: 0.7,
                        marginBottom: '8px',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        Current Revenue
                      </div>
                      <div style={{ 
                        fontSize: '24pt', 
                        fontWeight: 'bold', 
                        color: '#08ce6b',
                        marginBottom: '5px'
                      }}>
                        {startupData.financialData.revenue.current}
                      </div>
                      {startupData.financialData.revenue.growth && (
                        <div style={{ 
                          fontSize: '10pt', 
                          color: '#08ce6b',
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
                      backgroundColor: 'rgba(247, 255, 255, 0.1)',
                      padding: '18px',
                      borderRadius: '10px'
                    }}>
                      <div style={{ 
                        fontSize: '9pt', 
                        color: '#f7ffff',
                        opacity: 0.7,
                        marginBottom: '8px',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        Projected Revenue
                      </div>
                      <div style={{ 
                        fontSize: '20pt', 
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
                color: '#f7ffff',
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
                  const trendColor = isPositive ? '#08ce6b' : '#ef4444';
                  
                  return (
                    <div key={idx} style={{ 
                      backgroundColor: 'rgba(247, 255, 255, 0.05)',
                      padding: '18px',
                      borderRadius: '12px',
                      border: '1px solid rgba(247, 255, 255, 0.1)',
                      pageBreakInside: 'avoid'
                    }}>
                      <div style={{ 
                        fontSize: '9pt',
                        color: '#f7ffff',
                        opacity: 0.6,
                        marginBottom: '8px',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        {metric.label}
                      </div>
                      <div style={{ 
                        fontSize: '18pt',
                        fontWeight: 'bold',
                        color: '#f7ffff',
                        marginBottom: '8px'
                      }}>
                        {metric.value}
                      </div>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '10pt',
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
                  backgroundColor: 'rgba(141, 81, 255, 0.15)',
                  padding: '25px',
                  borderRadius: '12px',
                  border: '2px solid #8d51ff',
                  pageBreakInside: 'avoid'
                }}>
                  <h2 style={{ 
                    fontSize: '18pt', 
                    fontWeight: 'bold',
                    color: '#f7ffff',
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
                      backgroundColor: 'rgba(247, 255, 255, 0.1)',
                      padding: '18px',
                      borderRadius: '10px'
                    }}>
                      <div style={{ 
                        fontSize: '9pt', 
                        color: '#f7ffff',
                        opacity: 0.7,
                        marginBottom: '8px',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        Total Raised
                      </div>
                      <div style={{ 
                        fontSize: '22pt', 
                        fontWeight: 'bold', 
                        color: '#8d51ff'
                      }}>
                        {startupData.financialData.funding.totalRaised}
                      </div>
                    </div>
                    <div style={{ 
                      backgroundColor: 'rgba(247, 255, 255, 0.1)',
                      padding: '18px',
                      borderRadius: '10px'
                    }}>
                      <div style={{ 
                        fontSize: '9pt', 
                        color: '#f7ffff',
                        opacity: 0.7,
                        marginBottom: '8px',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        Last Round
                      </div>
                      <div style={{ 
                        fontSize: '14pt', 
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
                        fontSize: '11pt', 
                        color: '#f7ffff',
                        opacity: 0.8,
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
                            backgroundColor: 'rgba(247, 255, 255, 0.2)',
                            border: '1px solid #8d51ff',
                            borderRadius: '8px',
                            fontSize: '9pt',
                            color: '#f7ffff',
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
            <PageFooter />
          </div>

          {/* Team Analysis Page */}
          <div style={{ 
            padding: '20px 18px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box',
            backgroundColor: '#192452',
            color: '#f7ffff'
          }}>
            <PageHeader pageNum={8} />

            <h1 style={{ 
                fontSize: '18pt', 
                fontWeight: 'bold',
                color: '#f7ffff',
                marginBottom: '12px',
                marginTop: '0'
              }}>
                Team Analysis
              </h1>

              {/* Team Overview */}
              <div style={{ 
                backgroundColor: 'rgba(247, 255, 255, 0.05)',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '25px',
                border: '1px solid rgba(247, 255, 255, 0.1)',
                pageBreakInside: 'avoid'
              }}>
                <h2 style={{ 
                  fontSize: '18pt', 
                  fontWeight: 'bold',
                  color: '#f7ffff',
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
                    <div style={{ fontSize: '10pt', color: '#f7ffff', opacity: 0.6, marginBottom: '6px' }}>
                      Team Size
                    </div>
                    <div style={{ fontSize: '20pt', fontWeight: 'bold', color: '#0099ff' }}>
                      {startupData.teamData?.size}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10pt', color: '#f7ffff', opacity: 0.6, marginBottom: '6px' }}>
                      Growth Trend
                    </div>
                    <div style={{ fontSize: '14pt', fontWeight: '600', color: '#08ce6b' }}>
                      {startupData.teamData?.growth}
                    </div>
                  </div>
                </div>
              </div>

              {/* Department Breakdown */}
              {startupData.teamData?.departments && (
                <div style={{ marginBottom: '25px', pageBreakInside: 'avoid' }}>
                  <h2 style={{ 
                    fontSize: '18pt', 
                    fontWeight: 'bold',
                    color: '#f7ffff',
                    marginBottom: '15px'
                  }}>
                    Department Breakdown
                  </h2>
                  {startupData.teamData.departments.map((dept, idx) => (
                    <div key={idx} style={{ 
                      marginBottom: '15px',
                      padding: '14px',
                      backgroundColor: 'rgba(247, 255, 255, 0.05)',
                      borderRadius: '8px',
                      pageBreakInside: 'avoid'
                    }}>
                      <div style={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px'
                      }}>
                        <span style={{ fontSize: '11pt', fontWeight: '600', color: '#f7ffff' }}>
                          {dept.name}
                        </span>
                        <span style={{ fontSize: '11pt', fontWeight: 'bold', color: '#0099ff' }}>
                          {dept.count} ({dept.percentage}%)
                        </span>
                      </div>
                      <div style={{ 
                        width: '100%',
                        height: '7px',
                        backgroundColor: 'rgba(247, 255, 255, 0.1)',
                        borderRadius: '4px'
                      }}>
                        <div style={{ 
                          width: `${dept.percentage}%`,
                          height: '100%',
                          backgroundColor: '#0099ff',
                          borderRadius: '4px'
                        }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Leadership Team */}
              {startupData.teamData?.leadership && (
                <div style={{ pageBreakInside: 'avoid' }}>
                  <h2 style={{ 
                    fontSize: '18pt', 
                    fontWeight: 'bold',
                    color: '#f7ffff',
                    marginBottom: '15px'
                  }}>
                    Leadership Team
                  </h2>
                  {startupData.teamData.leadership.map((leader, idx) => (
                    <div key={idx} style={{ 
                      marginBottom: '12px',
                      padding: '15px',
                      backgroundColor: 'rgba(247, 255, 255, 0.05)',
                      borderRadius: '8px',
                      border: '1px solid rgba(247, 255, 255, 0.1)',
                      pageBreakInside: 'avoid'
                    }}>
                      <h3 style={{ 
                        fontSize: '13pt',
                        fontWeight: 'bold',
                        color: '#f7ffff',
                        marginBottom: '4px'
                      }}>
                        {leader.name}
                      </h3>
                      <div style={{ 
                        fontSize: '11pt',
                        color: '#fa8524',
                        marginBottom: '10px',
                        fontWeight: '600'
                      }}>
                        {leader.role}
                      </div>
                      <p style={{ 
                        fontSize: '10pt',
                        color: '#f7ffff',
                        opacity: 0.8,
                        lineHeight: '1.6',
                        margin: 0
                      }}>
                        {leader.background}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            <PageFooter />
          </div>

          {/* Market Analysis Page */}
          <div style={{ 
            padding: '20px 18px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box',
            backgroundColor: '#192452',
            color: '#f7ffff'
          }}>
            <PageHeader pageNum={9} />

            <h1 style={{ 
                fontSize: '18pt', 
                fontWeight: 'bold',
                color: '#f7ffff',
                marginBottom: '12px',
                marginTop: '0'
              }}>
                Market Analysis
              </h1>

              {/* Market Size */}
              {startupData.marketData?.size && (
                <div style={{ marginBottom: '30px', pageBreakInside: 'avoid' }}>
                  <h2 style={{ 
                    fontSize: '18pt', 
                    fontWeight: 'bold',
                    color: '#f7ffff',
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
                      backgroundColor: 'rgba(141, 81, 255, 0.15)',
                      borderRadius: '8px',
                      textAlign: 'center',
                      border: '1px solid #8d51ff'
                    }}>
                      <div style={{ fontSize: '10pt', color: '#f7ffff', opacity: 0.6, marginBottom: '8px' }}>
                        TAM (Total Addressable)
                      </div>
                      <div style={{ fontSize: '16pt', fontWeight: 'bold', color: '#8d51ff' }}>
                        {startupData.marketData.size.tam}
                      </div>
                    </div>
                    <div style={{ 
                      padding: '20px',
                      backgroundColor: 'rgba(0, 153, 255, 0.15)',
                      borderRadius: '8px',
                      textAlign: 'center',
                      border: '1px solid #0099ff'
                    }}>
                      <div style={{ fontSize: '10pt', color: '#f7ffff', opacity: 0.6, marginBottom: '8px' }}>
                        SAM (Serviceable Available)
                      </div>
                      <div style={{ fontSize: '16pt', fontWeight: 'bold', color: '#0099ff' }}>
                        {startupData.marketData.size.sam}
                      </div>
                    </div>
                    <div style={{ 
                      padding: '20px',
                      backgroundColor: 'rgba(8, 206, 107, 0.15)',
                      borderRadius: '8px',
                      textAlign: 'center',
                      border: '1px solid #08ce6b'
                    }}>
                      <div style={{ fontSize: '10pt', color: '#f7ffff', opacity: 0.6, marginBottom: '8px' }}>
                        SOM (Serviceable Obtainable)
                      </div>
                      <div style={{ fontSize: '16pt', fontWeight: 'bold', color: '#08ce6b' }}>
                        {startupData.marketData.size.som}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Market Trends */}
              {startupData.marketData?.trends && (
                <div style={{ marginBottom: '30px', pageBreakInside: 'avoid' }}>
                  <h2 style={{ 
                    fontSize: '18pt', 
                    fontWeight: 'bold',
                    color: '#f7ffff',
                    marginBottom: '15px'
                  }}>
                    Market Trends
                  </h2>
                  {startupData.marketData.trends.map((trend, idx) => {
                    const impactColor = trend.impact === 'High' ? '#ef4444' : 
                                       trend.impact === 'Medium' ? '#fa8524' : '#08ce6b';
                    
                    return (
                      <div key={idx} style={{ 
                        marginBottom: '12px',
                        padding: '14px',
                        backgroundColor: 'rgba(247, 255, 255, 0.05)',
                        borderRadius: '8px',
                        border: '1px solid rgba(247, 255, 255, 0.1)',
                        pageBreakInside: 'avoid'
                      }}>
                        <div style={{ 
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '8px'
                        }}>
                          <h3 style={{ 
                            fontSize: '12pt',
                            fontWeight: '600',
                            color: '#f7ffff',
                            flex: 1
                          }}>
                            {trend.trend}
                          </h3>
                          <span style={{ 
                            padding: '4px 10px',
                            backgroundColor: `${impactColor}30`,
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
                        <div style={{ fontSize: '10pt', color: '#f7ffff', opacity: 0.7 }}>
                          Timeline: {trend.timeline}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Customer Segments */}
              {startupData.marketData?.customerSegments && (
                <div style={{ pageBreakInside: 'avoid' }}>
                  <h2 style={{ 
                    fontSize: '18pt', 
                    fontWeight: 'bold',
                    color: '#f7ffff',
                    marginBottom: '15px'
                  }}>
                    Customer Segments
                  </h2>
                  {startupData.marketData.customerSegments.map((segment, idx) => (
                    <div key={idx} style={{ 
                      marginBottom: '15px',
                      padding: '14px',
                      backgroundColor: 'rgba(247, 255, 255, 0.05)',
                      borderRadius: '8px',
                      pageBreakInside: 'avoid'
                    }}>
                      <div style={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px'
                      }}>
                        <span style={{ fontSize: '11pt', fontWeight: '600', color: '#f7ffff' }}>
                          {segment.segment}
                        </span>
                        <span style={{ fontSize: '11pt', fontWeight: 'bold', color: '#8d51ff' }}>
                          {segment.percentage}%
                        </span>
                      </div>
                      <div style={{ 
                        width: '100%',
                        height: '7px',
                        backgroundColor: 'rgba(247, 255, 255, 0.1)',
                        borderRadius: '4px'
                      }}>
                        <div style={{ 
                          width: `${segment.percentage}%`,
                          height: '100%',
                          backgroundColor: '#8d51ff',
                          borderRadius: '4px'
                        }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            <PageFooter />
          </div>

          {/* Benchmarks Page */}
          <div style={{ 
            padding: '20px 18px', 
            pageBreakAfter: 'always',
            boxSizing: 'border-box',
            backgroundColor: '#192452',
            color: '#f7ffff'
          }}>
            <PageHeader pageNum={10} />

            <h1 style={{ 
                fontSize: '18pt', 
                fontWeight: 'bold',
                color: '#f7ffff',
                marginBottom: '12px',
                marginTop: '0'
              }}>
                Performance Benchmarks
              </h1>

              {(startupData.benchmarks || []).map((benchmark, idx) => {
                const statusColor = 
                  benchmark.status.includes('Outperforming') || benchmark.status === 'Leading' ? '#08ce6b' :
                  benchmark.status === 'Aggressive' ? '#0099ff' :
                  benchmark.status.includes('Aligned') ? '#fa8524' : '#f7ffff';
                
                return (
                  <div key={idx} style={{ 
                    marginBottom: '18px',
                    padding: '18px',
                    backgroundColor: 'rgba(247, 255, 255, 0.05)',
                    borderRadius: '10px',
                    border: '1px solid rgba(247, 255, 255, 0.1)',
                    pageBreakInside: 'avoid'
                  }}>
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: '14px'
                    }}>
                      <h2 style={{ 
                        fontSize: '14pt',
                        fontWeight: 'bold',
                        color: '#f7ffff'
                      }}>
                        {benchmark.metric}
                      </h2>
                      <span style={{ 
                        padding: '5px 14px',
                        backgroundColor: `${statusColor}30`,
                        color: statusColor,
                        borderRadius: '6px',
                        fontSize: '10pt',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        marginLeft: '12px'
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
                        <div style={{ fontSize: '10pt', color: '#f7ffff', opacity: 0.6, marginBottom: '6px' }}>
                          Your Value
                        </div>
                        <div style={{ fontSize: '14pt', fontWeight: 'bold', color: '#f7ffff' }}>
                          {benchmark.value}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '10pt', color: '#f7ffff', opacity: 0.6, marginBottom: '6px' }}>
                          Industry Benchmark
                        </div>
                        <div style={{ fontSize: '12pt', color: '#f7ffff', opacity: 0.8 }}>
                          {benchmark.benchmark}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            <PageFooter />
          </div>

          {/* Final Summary Page */}
          <div style={{ 
            padding: '20px 18px', 
            boxSizing: 'border-box',
            backgroundColor: '#192452',
            color: '#f7ffff'
          }}>
            <PageHeader pageNum={11} />

            <h1 style={{ 
                fontSize: '28pt', 
                fontWeight: 'bold',
                color: '#f7ffff',
                margin: 0,
                textAlign: 'center',
                marginBottom: '30px'
              }}>
                Investment Summary
              </h1>

              {/* Investment Summary Box */}
              <div style={{ 
                textAlign: 'center',
                padding: '35px',
                backgroundColor: 'rgba(0, 153, 255, 0.15)',
                borderRadius: '12px',
                marginBottom: '30px',
                border: '2px solid #0099ff',
                pageBreakInside: 'avoid'
              }}>
                <h2 style={{ 
                  fontSize: '20pt',
                  fontWeight: 'bold',
                  marginBottom: '25px',
                  color: '#f7ffff'
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
                  backgroundColor: 'rgba(8, 206, 107, 0.2)',
                  border: '3px solid #08ce6b',
                  marginBottom: '20px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '42pt',
                      fontWeight: 'bold',
                      color: '#08ce6b',
                      lineHeight: '1',
                      marginBottom: '6px'
                    }}>
                      {startupData.investmentScore}
                    </div>
                    <div style={{ 
                      fontSize: '10pt',
                      color: '#f7ffff',
                      opacity: 0.8
                    }}>
                      out of 10
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  fontSize: '18pt',
                  fontWeight: 'bold',
                  color: '#f7ffff',
                  marginBottom: '20px'
                }}>
                  {startupData.aiSummary?.investmentRecommendation || startupData.recommendation}
                </div>
                
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '14px',
                  marginTop: '25px'
                }}>
                  <div style={{ 
                    backgroundColor: 'rgba(247, 255, 255, 0.1)',
                    padding: '14px',
                    borderRadius: '8px'
                  }}>
                    <div style={{ fontSize: '22pt', fontWeight: 'bold', color: '#f7ffff', marginBottom: '6px' }}>
                      {startupData.investmentScore}/10
                    </div>
                    <div style={{ fontSize: '9pt', color: '#f7ffff', opacity: 0.7 }}>Investment Score</div>
                  </div>
                  <div style={{ 
                    backgroundColor: 'rgba(247, 255, 255, 0.1)',
                    padding: '14px',
                    borderRadius: '8px'
                  }}>
                    <div style={{ fontSize: '22pt', fontWeight: 'bold', color: '#f7ffff', marginBottom: '6px' }}>
                      {startupData.growthPotential?.score}/10
                    </div>
                    <div style={{ fontSize: '9pt', color: '#f7ffff', opacity: 0.7 }}>Growth Potential</div>
                  </div>
                  <div style={{ 
                    backgroundColor: 'rgba(247, 255, 255, 0.1)',
                    padding: '14px',
                    borderRadius: '8px'
                  }}>
                    <div style={{ fontSize: '22pt', fontWeight: 'bold', color: '#f7ffff', marginBottom: '6px' }}>
                      {startupData.aiSummary?.confidenceScore || startupData.investmentScore}/10
                    </div>
                    <div style={{ fontSize: '9pt', color: '#f7ffff', opacity: 0.7 }}>Confidence</div>
                  </div>
                </div>
              </div>

              {/* Final Investment Thesis */}
              <div style={{ 
                backgroundColor: 'rgba(0, 153, 255, 0.15)',
                padding: '20px',
                borderRadius: '10px',
                border: '2px solid #0099ff',
                marginBottom: '30px',
                pageBreakInside: 'avoid'
              }}>
                <h3 style={{ 
                  fontSize: '15pt', 
                  fontWeight: 'bold',
                  color: '#f7ffff',
                  marginBottom: '14px'
                }}>
                  Investment Thesis
                </h3>
                <p style={{ 
                  lineHeight: '1.6',
                  fontSize: '10pt',
                  color: '#f7ffff',
                  opacity: 0.9,
                  margin: 0
                }}>
                  {startupData.aiSummary?.investmentThesis}
                </p>
              </div>

              {/* Report Metadata */}
              <div style={{ 
                borderTop: '2px solid rgba(247, 255, 255, 0.2)',
                paddingTop: '25px',
                marginTop: '35px',
                pageBreakInside: 'avoid'
              }}>
                <div style={{ 
                  backgroundColor: 'rgba(247, 255, 255, 0.05)',
                  padding: '18px',
                  borderRadius: '10px',
                  marginBottom: '25px'
                }}>
                  <h3 style={{ 
                    fontSize: '12pt',
                    fontWeight: 'bold',
                    color: '#f7ffff',
                    marginBottom: '14px'
                  }}>
                    📋 Report Information
                  </h3>
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '14px',
                    fontSize: '9pt'
                  }}>
                    <div style={{ 
                      padding: '10px',
                      backgroundColor: 'rgba(247, 255, 255, 0.05)',
                      borderRadius: '6px',
                      border: '1px solid rgba(247, 255, 255, 0.1)'
                    }}>
                      <div style={{ color: '#f7ffff', opacity: 0.6, marginBottom: '4px' }}>Report ID</div>
                      <div style={{ color: '#f7ffff', fontWeight: '600' }}>
                        {startupData.metadata?.analysisId || 'N/A'}
                      </div>
                    </div>
                    <div style={{ 
                      padding: '10px',
                      backgroundColor: 'rgba(247, 255, 255, 0.05)',
                      borderRadius: '6px',
                      border: '1px solid rgba(247, 255, 255, 0.1)'
                    }}>
                      <div style={{ color: '#f7ffff', opacity: 0.6, marginBottom: '4px' }}>Analysis Date</div>
                      <div style={{ color: '#f7ffff', fontWeight: '600' }}>
                        {startupData.metadata?.analysisDate || new Date().toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    <div style={{ 
                      padding: '10px',
                      backgroundColor: 'rgba(247, 255, 255, 0.05)',
                      borderRadius: '6px',
                      border: '1px solid rgba(247, 255, 255, 0.1)'
                    }}>
                      <div style={{ color: '#f7ffff', opacity: 0.6, marginBottom: '4px' }}>Processing Time</div>
                      <div style={{ color: '#f7ffff', fontWeight: '600' }}>
                        {startupData.metadata?.processingTime || 'N/A'}
                      </div>
                    </div>
                    <div style={{ 
                      padding: '10px',
                      backgroundColor: 'rgba(247, 255, 255, 0.05)',
                      borderRadius: '6px',
                      border: '1px solid rgba(247, 255, 255, 0.1)'
                    }}>
                      <div style={{ color: '#f7ffff', opacity: 0.6, marginBottom: '4px' }}>AI Confidence</div>
                      <div style={{ color: '#08ce6b', fontWeight: 'bold' }}>
                        {((startupData.metadata?.confidence || startupData.investmentScore / 10) * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  marginBottom: '25px',
                  padding: '16px',
                  backgroundColor: 'rgba(0, 153, 255, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid #0099ff',
                  pageBreakInside: 'avoid'
                }}>
                  <p style={{ 
                    fontSize: '9pt',
                    color: '#f7ffff',
                    opacity: 0.9,
                    lineHeight: '1.6',
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
                borderTop: '2px solid rgba(247, 255, 255, 0.2)',
                paddingTop: '18px',
                marginTop: '30px',
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: '11pt',
                  fontWeight: '600',
                  color: '#f7ffff',
                  marginBottom: '8px'
                }}>
                  CONFIDENTIAL & PROPRIETARY
                </div>
                <p style={{ 
                  fontSize: '9pt',
                  color: '#f7ffff',
                  opacity: 0.7,
                  lineHeight: '1.5',
                  margin: '0 0 14px 0'
                }}>
                  This document contains confidential information intended solely for the use of the recipient.<br/>
                  LetsAnalyse Investment Analysis Report • Generated: {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric'
                  })} • Version 1.0
                </p>
                <p style={{ 
                  fontSize: '8pt',
                  color: '#f7ffff',
                  opacity: 0.5,
                  margin: 0
                }}>
                  This analysis is for informational purposes only and does not constitute investment advice.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default PDFExport;
