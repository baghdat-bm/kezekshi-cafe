import { create } from 'zustand';

export type Language = "kz" | "ru" | "en";

interface TranslationStore {
  language: Language;
  translations: Record<string, string>;
  setLanguage: (lang: string) => Promise<void>;
  t: (key: string) => string;
}

const useTranslationStore = create<TranslationStore>((set, get) => ({
  language: 'kz',
  translations: {},
  setLanguage: async (lang: string) => {
    if (get().language === lang && Object.keys(get().translations).length > 0) return;
    try {
      // eslint-disable-next-line @next/next/no-assign-module-variable
      const module = await import(`../../locales/${lang}.json`);
      // @ts-expect-error // here is no error
      set({ language: lang, translations: module.default });
    } catch (error) {
      console.error('Ошибка при загрузке переводов:', error);
    }
  },
  // Функция t принимает ключ в формате "home.welcome" и ищет значение в объекте translations
  t: (key: string): string => {
    const { translations } = get();
    // Разбиваем ключ по точке и проходим по объекту
    // @ts-expect-error // here is no error
    const value = key.split('.').reduce((obj, k) => (obj && typeof obj === 'object' ? obj[k] : undefined), translations);
    return typeof value === 'string' ? value : key;
  },
}));

export default useTranslationStore;
