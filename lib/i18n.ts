import { useUserStore } from '@/store/userStore';
import en from '../locales/en.json';
import et from '../locales/et.json';

export type Lang = 'et' | 'en';

const dictionaries: Record<Lang, Record<string, any>> = {
  et: et as any,
  en: en as any,
};

function getByPath(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function format(str: string, params?: Record<string, any>) {
  if (!params) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => (params[k] !== undefined ? String(params[k]) : ''));
}

export function useI18n() {
  const lang = useUserStore((s) => s.language);
  const setLanguage = useUserStore((s) => s.setLanguage);
  const dict = dictionaries[lang] || dictionaries.et;

  const t = (key: string, params?: Record<string, any>) => {
    const val = getByPath(dict, key);
    if (typeof val === 'string') return format(val, params);
    return key; // fallback to key
  };

  return { t, lang, setLanguage };
}
