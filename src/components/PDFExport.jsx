import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
  const generatePDF = async () => {
    try {
      // Create a temporary div with the PDF content
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '800px';
      tempDiv.style.background = 'white';
      tempDiv.style.padding = '40px';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      
      tempDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #fa8524; padding-bottom: 20px;">
          <div style="font-size: 28px; font-weight: bold; color: #192452; margin-bottom: 8px;">LetsAnalyse</div>
          <div style="color: #6b7280; font-size: 14px;">Investment Analysis Report</div>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 12px; margin-bottom: 30px; border: 1px solid #e5e7eb;">
          <div style="float: right; text-align: center; background: #08ce6b; color: white; padding: 15px 20px; border-radius: 12px; margin-left: 20px;">
            <div style="font-size: 28px; font-weight: bold;">${startupData.investmentScore}/10</div>
            <div style="font-size: 12px; opacity: 0.9;">Investment Score</div>
          </div>
          <div style="font-size: 24px; font-weight: bold; color: #192452; margin-bottom: 8px;">${startupData.name}</div>
          <div style="color: #6b7280; margin-bottom: 12px;">${startupData.tagline}</div>
          <div style="font-size: 12px; color: #9ca3af;">
            📍 ${startupData.location} • 📅 Founded ${startupData.founded} • 👥 ${startupData.employees} employees
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <div style="font-size: 18px; font-weight: bold; color: #192452; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb;">Key Metrics</div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;">
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; text-align: center;">
              <div style="font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: 600;">ARR</div>
              <div style="font-size: 20px; font-weight: bold; color: #192452; margin: 8px 0;">$2.8M</div>
              <div style="font-size: 12px; color: #08ce6b; font-weight: 600;">+220%</div>
            </div>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; text-align: center;">
              <div style="font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: 600;">Customers</div>
              <div style="font-size: 20px; font-weight: bold; color: #192452; margin: 8px 0;">1,450</div>
              <div style="font-size: 12px; color: #08ce6b; font-weight: 600;">+65%</div>
            </div>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; text-align: center;">
              <div style="font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: 600;">Runway</div>
              <div style="font-size: 20px; font-weight: bold; color: #192452; margin: 8px 0;">22 mo</div>
              <div style="font-size: 12px; color: #08ce6b; font-weight: 600;">+4mo</div>
            </div>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; text-align: center;">
              <div style="font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: 600;">CAC</div>
              <div style="font-size: 20px; font-weight: bold; color: #192452; margin: 8px 0;">$420</div>
              <div style="font-size: 12px; color: #08ce6b; font-weight: 600;">-18%</div>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <div style="font-size: 18px; font-weight: bold; color: #192452; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb;">AI Investment Summary</div>
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 20px; border-radius: 8px;">
            Strong growth metrics with healthy unit economics. Proven leadership team and solid product-market fit in the AI automation space.
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <div style="font-size: 18px; font-weight: bold; color: #192452; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb;">Growth Potential</div>
          <div style="text-align: center; background: #f3f4f6; padding: 30px; border-radius: 12px;">
            <div style="font-size: 48px; font-weight: bold; color: #8d51ff;">8.7/10</div>
            <div>Growth Potential Score</div>
          </div>
        </div>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
          Generated by LetsAnalyse • ${new Date().toLocaleDateString()} • Confidential Investment Analysis
        </div>
      `;
      
      document.body.appendChild(tempDiv);
      
      // Generate canvas from the content
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      // Remove temporary div
      document.body.removeChild(tempDiv);
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Download the PDF
      pdf.save(`LetsAnalyse-Analysis-${startupData.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`);
      
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Download className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Export PDF Report</h3>
              <p className="text-sm text-gray-400">Generate comprehensive analysis</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600/50">
            <div className="flex items-center space-x-3 mb-3">
              <Building className="text-orange-400" size={16} />
              <span className="text-white font-semibold">Startup Overview</span>
            </div>
            <p className="text-gray-300 text-sm">Company details, metrics, and investment score</p>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600/50">
            <div className="flex items-center space-x-3 mb-3">
              <BarChart3 className="text-blue-400" size={16} />
              <span className="text-white font-semibold">Competitive Analysis</span>
            </div>
            <p className="text-gray-300 text-sm">Market positioning and competitor comparison</p>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600/50">
            <div className="flex items-center space-x-3 mb-3">
              <AlertTriangle className="text-red-400" size={16} />
              <span className="text-white font-semibold">Risk Assessment</span>
            </div>
            <p className="text-gray-300 text-sm">Key risks and mitigation strategies</p>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600/50">
            <div className="flex items-center space-x-3 mb-3">
              <Rocket className="text-purple-400" size={16} />
              <span className="text-white font-semibold">Growth Potential</span>
            </div>
            <p className="text-gray-300 text-sm">Growth score and investment recommendations</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={generatePDF}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 flex items-center justify-center space-x-2"
          >
            <Download size={16} />
            <span>Generate PDF</span>
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          PDF will be downloaded directly to your device
        </p>
      </div>
    </div>
  );
};

export default PDFExport;
