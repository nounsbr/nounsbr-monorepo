import pt, { Locale as DaysJSLocale } from 'dayjs/locale/pt';
import en from 'dayjs/locale/en';
import ja from 'dayjs/locale/ja';

export const SUPPORTED_LOCALES = [
  // order as they appear in the language dropdown
  'pt-BR',
  'en-US',
  'ja-JP',
];
export type SupportedLocale = typeof SUPPORTED_LOCALES[number] | 'pseudo';

export const DEFAULT_LOCALE: SupportedLocale = 'pt-BR';

export const LOCALE_LABEL: { [locale in SupportedLocale]: string } = {
  'pt-BR': 'Português',
  'en-US': 'English',
  'ja-JP': '日本語',
  pseudo: 'ƥƨèúδô',
};

export enum Locales {
  pt_PT = 'pt-BR',
  en_US = 'en-US',
  ja_JP = 'ja-JP',
}

// Map SupportedLocale string to DaysJS locale object (used for locale aware time formatting)
export const SUPPORTED_LOCALE_TO_DAYSJS_LOCALE: { [locale in SupportedLocale]: DaysJSLocale } = {
  'pt-BR': pt,
  'en-US': en,
  'ja-JP': ja,
  pseudo: en,
};
