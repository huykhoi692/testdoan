import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  getMyNotifications,
  markNotificationAsRead,
  getNotificationPreferences,
  updateNotificationPreferences,
  INotification,
  INotificationPreferences,
} from 'app/shared/services/notification.service';

export interface NotificationState {
  loading: boolean;
  errorMessage: string | null;
  notifications: INotification[];
  preferences: INotificationPreferences | null;
  unreadCount: number;
}

const initialState: NotificationState = {
  loading: false,
  errorMessage: null,
  notifications: [],
  preferences: null,
  unreadCount: 0,
};

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers(builder) {
    builder
      // Get my notifications
      .addCase(getMyNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(n => !n.read).length;
      })
      // Mark as read
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.loading = false;
        const notification = state.notifications.find(n => n.id === action.payload.id);
        if (notification) {
          notification.read = true;
        }
        state.unreadCount = state.notifications.filter(n => !n.read).length;
      })
      // Get preferences
      .addCase(getNotificationPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
      })
      // Update preferences
      .addCase(updateNotificationPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
      })
      // Handle pending
      .addMatcher(
        isPending(getMyNotifications, markNotificationAsRead, getNotificationPreferences, updateNotificationPreferences),
        state => {
          state.loading = true;
          state.errorMessage = null;
        },
      )
      // Handle rejection
      .addMatcher(
        isRejected(getMyNotifications, markNotificationAsRead, getNotificationPreferences, updateNotificationPreferences),
        (state, action) => {
          state.loading = false;
          state.errorMessage = action.error.message ?? 'Unknown error';
        },
      );
  },
});

export const { reset } = NotificationSlice.actions;

export default NotificationSlice.reducer;
