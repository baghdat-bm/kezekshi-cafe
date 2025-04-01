import { create } from 'zustand';

interface TranslationStore {
  language: string;
  translations: Record<string, string>;
  setLanguage: (lang: string) => Promise<void>;
  t: (key: string) => string;
}

const useTranslationStore = create<TranslationStore>((set, get) => ({
  language: 'en',
  translations: {},
  setLanguage: async (lang: string) => {
    if (get().language === lang && Object.keys(get().translations).length > 0) return;
    try {
      const module = await import(`../../locales/${lang}.json`);
      set({ language: lang, translations: module.default });
    } catch (error) {
      console.error('Ошибка при загрузке переводов:', error);
    }
  },
  t: (key: string) => {
    const { translations } = get();
    return translations[key] || key;
  },
}));

export default useTranslationStore;
