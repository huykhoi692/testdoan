import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

// Get initial language from localStorage or default to 'en'
const storedLanguage = localStorage.getItem('i18nextLng') || localStorage.getItem('locale') || 'en';

i18n
  // Load translation using http backend
  .use(Backend)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Init i18next
  .init({
    lng: storedLanguage, // Set initial language
    fallbackLng: 'en',
    debug: false,

    // Default namespace
    defaultNS: 'common',

    // Namespaces to load
    ns: [
      'common',
      'login',
      'register',
      'staff',
      'global',
      'home',
      'settings',
      'error',
      'password',
      'activate',
      'reset',
      'sessions',
      'user-management',
      'configuration',
      'health',
      'logs',
      'metrics',
      // New features namespaces
      'book-reviews',
      'comments',
      'achievements',
      'reports',
      'analytics',
      'favorites',
      'study-sessions',
      'flashcards',
      'notes',
      'streaks',
    ],

    interpolation: {
      escapeValue: false, // React already escapes
    },

    backend: {
      // Path to translation files
      loadPath: '/i18n/{{lng}}/{{ns}}.json',
      // Add timeout and failure handling
      crossDomain: true,
      withCredentials: false,
    },

    react: {
      // Don't wait for i18n to be fully initialized on first render
      // This allows inline translations to render immediately while backend loads
      useSuspense: false,
    },
  });

// Save language changes to localStorage
i18n.on('languageChanged', lng => {
  localStorage.setItem('i18nextLng', lng);
  localStorage.setItem('locale', lng);
});

export default i18n;
