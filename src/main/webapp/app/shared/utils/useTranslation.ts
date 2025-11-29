import { useSelector } from 'react-redux';
import { IRootState } from 'app/config/store';
import enTranslations from '../../../i18n/en/common.json';
import viTranslations from '../../../i18n/vi/common.json';

const translations = {
  en: enTranslations,
  vi: viTranslations,
};

export const useTranslation = () => {
  const currentLocale = useSelector((state: IRootState) => state.locale?.currentLocale || 'en');

  const t = (key: string, params?: Record<string, any>): string => {
    const keys = key.split('.');
    let value: any = translations[currentLocale as keyof typeof translations];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Replace parameters like {{name}}
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? String(params[paramKey]) : match;
      });
    }

    return value;
  };

  return { t, currentLocale };
};
