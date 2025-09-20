import React from 'react';
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
  Calendar
} from 'lucide-react';

const PDFExport = ({ startupData, onClose }) => {
  const generatePDF = () => {
    // This would integrate with a PDF generation library like jsPDF or react-pdf
    const element = document.getElementById('pdf-content');
    
    // For now, we'll create a print-friendly version
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>VentureScope AI - Investment Analysis Report</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #1f2937;
              background: white;
            }
            .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #6366f1; padding-bottom: 20px; }
            .logo { font-size: 28px; font-weight: bold; color: #6366f1; margin-bottom: 8px; }
            .subtitle { color: #6b7280; font-size: 14px; }
            .startup-header { 
              background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
              padding: 30px;
              border-radius: 12px;
              margin-bottom: 30px;
              border: 1px solid #e5e7eb;
            }
            .startup-name { font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 8px; }
            .startup-tagline { color: #6b7280; margin-bottom: 12px; }
            .startup-meta { display: flex; gap: 20px; font-size: 12px; color: #9ca3af; }
            .score-badge { 
              float: right;
              text-align: center;
              background: #10b981;
              color: white;
              padding: 15px 20px;
              border-radius: 12px;
              margin-left: 20px;
            }
            .score-number { font-size: 28px; font-weight: bold; }
            .score-label { font-size: 12px; opacity: 0.9; }
            .section { margin-bottom: 30px; }
            .section-title { 
              font-size: 18px; 
              font-weight: bold; 
              color: #1f2937; 
              margin-bottom: 15px;
              padding-bottom: 8px;
              border-bottom: 2px solid #e5e7eb;
            }
            .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 20px; }
            .metric-card { 
              background: #f9fafb;
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #e5e7eb;
              text-align: center;
            }
            .metric-label { font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: 600; }
            .metric-value { font-size: 20px; font-weight: bold; color: #1f2937; margin: 8px 0; }
            .metric-change { font-size: 12px; color: #10b981; font-weight: 600; }
            .summary-box { 
              background: #eff6ff;
              border: 1px solid #bfdbfe;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .competitor-card { 
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 15px;
            }
            .competitor-header { display: flex; justify-content: between; margin-bottom: 15px; }
            .competitor-name { font-weight: bold; color: #1f2937; }
            .competitor-sector { color: #6366f1; font-size: 14px; }
            .competitor-arr { color: #10b981; font-weight: bold; }
            .risk-card { 
              background: #fef2f2;
              border: 1px solid #fecaca;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 15px;
            }
            .risk-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
            .risk-title { font-weight: bold; color: #1f2937; }
            .risk-severity { 
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: bold;
            }
            .severity-high { background: #fee2e2; color: #dc2626; }
            .severity-medium { background: #fef3c7; color: #d97706; }
            .growth-score { 
              text-align: center;
              background: #f3f4f6;
              padding: 30px;
              border-radius: 12px;
              margin-bottom: 20px;
            }
            .growth-number { font-size: 48px; font-weight: bold; color: #6366f1; }
            .footer { 
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              color: #6b7280;
              font-size: 12px;
            }
            @media print {
              body { print-color-adjust: exact; }
              .container { max-width: none; margin: 0; padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">VentureScope AI</div>
              <div class="subtitle">Investment Analysis Report</div>
            </div>
            
            <div class="startup-header">
              <div class="score-badge">
                <div class="score-number">${startupData.investmentScore}/10</div>
                <div class="score-label">Investment Score</div>
              </div>
              <div class="startup-name">${startupData.name}</div>
              <div class="startup-tagline">${startupData.tagline}</div>
              <div class="startup-meta">
                <span>📍 ${startupData.location}</span>
                <span>📅 Founded ${startupData.founded}</span>
                <span>👥 ${startupData.employees} employees</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Key Metrics</div>
              <div class="metrics-grid">
                <div class="metric-card">
                  <div class="metric-label">ARR</div>
                  <div class="metric-value">$2.8M</div>
                  <div class="metric-change">+220%</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">Customers</div>
                  <div class="metric-value">1,450</div>
                  <div class="metric-change">+65%</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">Runway</div>
                  <div class="metric-value">22 mo</div>
                  <div class="metric-change">+4mo</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">CAC</div>
                  <div class="metric-value">$420</div>
                  <div class="metric-change">-18%</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">AI Investment Summary</div>
              <div class="summary-box">
                Strong growth metrics with healthy unit economics. Proven leadership team and solid product-market fit in the AI automation space.
              </div>
            </div>

            <div class="section">
              <div class="section-title">Top Competitors</div>
              <div class="competitor-card">
                <div class="competitor-header">
                  <div>
                    <div class="competitor-name">AutomateFlow Pro</div>
                    <div class="competitor-sector">AI/ML Automation</div>
                  </div>
                  <div class="competitor-arr">$8.2M ARR</div>
                </div>
                <div>Funding: $45M Series B | Valuation: $180M</div>
              </div>
              <div class="competitor-card">
                <div class="competitor-header">
                  <div>
                    <div class="competitor-name">WorkflowAI</div>
                    <div class="competitor-sector">AI/ML Automation</div>
                  </div>
                  <div class="competitor-arr">$4.1M ARR</div>
                </div>
                <div>Funding: $25M Series A | Valuation: $95M</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Key Risks</div>
              <div class="risk-card">
                <div class="risk-header">
                  <div class="risk-title">Customer concentration risk</div>
                  <div class="risk-severity severity-high">High</div>
                </div>
                <div>Top 3 customers represent 58% of ARR</div>
              </div>
              <div class="risk-card">
                <div class="risk-header">
                  <div class="risk-title">Competitive pressure increasing</div>
                  <div class="risk-severity severity-medium">Medium</div>
                </div>
                <div>New well-funded competitors entering space</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Growth Potential</div>
              <div class="growth-score">
                <div class="growth-number">8.7/10</div>
                <div>Growth Potential Score</div>
              </div>
            </div>

            <div class="footer">
              Generated by VentureScope AI • ${new Date().toLocaleDateString()} • Confidential Investment Analysis
            </div>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Download className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Export PDF Report</h3>
              <p className="text-sm text-slate-400">Generate comprehensive analysis</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600/50">
            <div className="flex items-center space-x-3 mb-3">
              <Building className="text-purple-400" size={16} />
              <span className="text-white font-semibold">Startup Overview</span>
            </div>
            <p className="text-slate-300 text-sm">Company details, metrics, and investment score</p>
          </div>

          <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600/50">
            <div className="flex items-center space-x-3 mb-3">
              <BarChart3 className="text-cyan-400" size={16} />
              <span className="text-white font-semibold">Competitive Analysis</span>
            </div>
            <p className="text-slate-300 text-sm">Market positioning and competitor comparison</p>
          </div>

          <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600/50">
            <div className="flex items-center space-x-3 mb-3">
              <AlertTriangle className="text-red-400" size={16} />
              <span className="text-white font-semibold">Risk Assessment</span>
            </div>
            <p className="text-slate-300 text-sm">Key risks and mitigation strategies</p>
          </div>

          <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600/50">
            <div className="flex items-center space-x-3 mb-3">
              <Rocket className="text-purple-400" size={16} />
              <span className="text-white font-semibold">Growth Potential</span>
            </div>
            <p className="text-slate-300 text-sm">Growth score and investment recommendations</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={generatePDF}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center space-x-2"
          >
            <Download size={16} />
            <span>Generate PDF</span>
          </button>
        </div>

        <p className="text-xs text-slate-500 text-center mt-4">
          PDF will open in a new window for printing or saving
        </p>
      </div>
    </div>
  );
};

export default PDFExport;
