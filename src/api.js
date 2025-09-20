import axios from 'axios';
import agentResponseData from './agent-response.json';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance instead of modifying defaults
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Mock delay to simulate real API calls
const mockDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Upload pitch deck file to the server
 * @param {File} file - The PDF file to upload
 * @returns {Promise<Object>} Upload response with file ID and status
 */
export const uploadFile = async (file) => {
  try {
    // Validate file
    if (!file || file.type !== 'application/pdf') {
      throw new Error('Invalid file type. Please upload a PDF file.');
    }
    
    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      throw new Error('File size exceeds 50MB limit.');
    }

    // Simulate upload delay
    await mockDelay(2000);

    // Mock successful upload response
    return {
      success: true,
      data: {
        fileId: `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date().toISOString(),
        status: 'uploaded',
        message: 'Pitch deck uploaded successfully'
      }
    };

    // Real API call (uncomment when ready to use)
    /*
    const formData = new FormData();
    formData.append('pitch_deck', file);
    
    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return {
      success: true,
      data: response.data
    };
    */

  } catch (error) {
    console.error('Upload API Error:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Upload failed'
    };
  }
};

/**
 * Analyze startup pitch deck using AI agent
 * @param {string} fileId - The uploaded file ID
 * @returns {Promise<Object>} Analysis results
 */
export const analyzeStartup = async (fileId) => {
  try {
    if (!fileId) {
      throw new Error('File ID is required for analysis');
    }

    // Simulate analysis delay (5-10 seconds)
    await mockDelay(8000);

    // Return mock response data
    return {
      success: true,
      data: agentResponseData
    };

    // Real API call (uncomment when ready to use)
    /*
    const response = await apiClient.post('/analyze', {
      file_id: fileId,
      analysis_type: 'comprehensive'
    });

    return {
      success: true,
      data: response.data
    };
    */

  } catch (error) {
    console.error('Agent API Error:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Analysis failed'
    };
  }
};
