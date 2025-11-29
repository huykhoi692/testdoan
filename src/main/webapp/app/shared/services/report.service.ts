import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = '/api/learning-reports';

export interface ILearningReport {
  userLogin?: string;
  generatedAt?: string;
  totalBooksStarted?: number;
  totalBooksCompleted?: number;
  totalChaptersStarted?: number;
  totalChaptersCompleted?: number;
  averageProgress?: number;
  totalStudyMinutes?: number;
  totalStudySessions?: number;
  averageSessionMinutes?: number;
  dailyActivityMap?: { [key: string]: number };
  todayVisits?: number;
  totalVisits?: number;
  uniqueUsers?: number;
  activeUsers?: number;
}

// Get user's learning progress summary (UC 26: View learning progress)
export const getMyProgress = createAsyncThunk('report/fetch_my_progress', async () => {
  const response = await axios.get<ILearningReport>(`${apiUrl}/my-progress`);
  return response.data;
});

// Export learning report as PDF (UC 33: Generate learning report)
export const exportLearningReport = createAsyncThunk('report/export_pdf', async () => {
  const response = await axios.get(`${apiUrl}/export`, {
    responseType: 'blob',
  });

  // Create download link
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'learning-report.pdf');
  document.body.appendChild(link);
  link.click();
  link.remove();

  return response.data;
});

// Get learning history timeline (UC 41: Learning history view)
export const getLearningHistory = createAsyncThunk('report/fetch_history', async () => {
  const response = await axios.get<ILearningReport>(`${apiUrl}/history`);
  return response.data;
});

// Admin: Get user visit statistics (UC 51: View user visit reports)
export const getUserVisitStats = createAsyncThunk('report/fetch_visit_stats', async () => {
  const response = await axios.get<ILearningReport>(`${apiUrl}/admin/user-visits`);
  return response.data;
});

// Admin: Get completion statistics (UC 52: View completion statistics)
export const getCompletionStats = createAsyncThunk('report/fetch_completion_stats', async () => {
  const response = await axios.get<ILearningReport>(`${apiUrl}/admin/completion-stats`);
  return response.data;
});

// Admin: Get engagement statistics (UC 53: View engagement statistics)
export const getEngagementStats = createAsyncThunk('report/fetch_engagement_stats', async () => {
  const response = await axios.get<ILearningReport>(`${apiUrl}/admin/engagement-stats`);
  return response.data;
});
