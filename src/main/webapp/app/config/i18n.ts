// Initialize i18n wrapper used by the app entrypoint
// This file exists so `import './config/i18n'` in `index.tsx` resolves and
// provides a small set of inline translations while the http backend loads
// the full translation JSON files.

import i18n from './i18n-loader';

// Minimal inline translations to avoid empty UI on first render
const enCommon = {
  app: {
    title: 'LangLeague',
    loading: 'Loading...',
  },
  global: {
    back: 'Back',
  },
};

const viCommon = {
  app: {
    title: 'LangLeague',
    loading: 'Đang tải...',
  },
  global: {
    back: 'Quay lại',
  },
};

try {
  // addResourceBundle will merge with backend-loaded bundles when they arrive
  i18n.addResourceBundle('en', 'common', enCommon, true, true);
  i18n.addResourceBundle('vi', 'common', viCommon, true, true);
} catch (e) {
  // If i18n isn't ready yet, ignore - the loader will initialize it
  // and addResourceBundle can be retried elsewhere if necessary.
  // Keep this silent to avoid breaking the app bootstrap.

  console.warn('i18n inline bundles could not be added during bootstrap:', e);
}

export default i18n;
