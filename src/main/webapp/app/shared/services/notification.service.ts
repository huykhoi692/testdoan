import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = '/api/notifications';

export interface INotification {
  id?: number;
  userLogin?: string;
  title?: string;
  message?: string;
  type?: string;
  read?: boolean;
  createdAt?: string;
  readAt?: string;
  broadcast?: boolean;
}

export interface INotificationPreferences {
  emailEnabled?: boolean;
  inAppEnabled?: boolean;
  smsEnabled?: boolean;
  dailyReminderEnabled?: boolean;
}

// Get user notifications (UC 40: Daily reminder notification)
export const getMyNotifications = createAsyncThunk('notification/fetch_my', async () => {
  const response = await axios.get<INotification[]>(`${apiUrl}/my`);
  return response.data;
});

// Mark notification as read
export const markNotificationAsRead = createAsyncThunk('notification/mark_read', async (id: number) => {
  await axios.put(`${apiUrl}/${id}/read`);
  return { id };
});

// Get notification preferences (UC 14: Update notification preferences)
export const getNotificationPreferences = createAsyncThunk('notification/fetch_preferences', async () => {
  const response = await axios.get<INotificationPreferences>(`${apiUrl}/preferences`);
  return response.data;
});

// Update notification preferences (UC 14: Update notification preferences)
export const updateNotificationPreferences = createAsyncThunk(
  'notification/update_preferences',
  async (preferences: INotificationPreferences) => {
    const response = await axios.put<INotificationPreferences>(`${apiUrl}/preferences`, preferences);
    return response.data;
  },
);

// Admin: Send notification to specific user (UC 57: Send announcement/notification)
export const sendNotification = createAsyncThunk('notification/send', async (notification: INotification) => {
  await axios.post(`${apiUrl}/send`, notification);
  return notification;
});

// Admin: Broadcast notification to all users (UC 57: Send announcement/notification)
export const broadcastNotification = createAsyncThunk('notification/broadcast', async (notification: INotification) => {
  await axios.post(`${apiUrl}/broadcast`, notification);
  return notification;
});
