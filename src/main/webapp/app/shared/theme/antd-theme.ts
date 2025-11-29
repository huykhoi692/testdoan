import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#6366f1', // Indigo-500 similar to design
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorInfo: '#3b82f6',
    borderRadius: 8,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Layout: {
      siderBg: '#5b64d4', // Purple sidebar from design
      headerBg: '#ffffff',
      bodyBg: '#f5f7fa',
    },
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: 'rgba(255, 255, 255, 0.15)',
      itemSelectedColor: '#ffffff',
      itemColor: 'rgba(255, 255, 255, 0.85)',
      itemHoverBg: 'rgba(255, 255, 255, 0.1)',
      itemHoverColor: '#ffffff',
    },
    Card: {
      borderRadiusLG: 12,
      paddingLG: 24,
    },
    Button: {
      borderRadiusLG: 8,
      controlHeight: 40,
    },
  },
};

export const colors = {
  primary: {
    main: '#6366f1',
    light: '#818cf8',
    dark: '#4f46e5',
  },
  success: {
    main: '#10b981',
    light: '#34d399',
    dark: '#059669',
  },
  warning: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
  },
  error: {
    main: '#ef4444',
    light: '#f87171',
    dark: '#dc2626',
  },
  background: {
    default: '#f5f7fa',
    paper: '#ffffff',
    sidebar: '#5b64d4',
  },
  text: {
    primary: '#1f2937',
    secondary: '#6b7280',
    disabled: '#9ca3af',
    white: '#ffffff',
  },
};
