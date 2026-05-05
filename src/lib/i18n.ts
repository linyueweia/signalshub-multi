/* eslint-disable @typescript-eslint/no-explicit-any */
import { messages } from '../../messages';
import { Language } from './types';

export const languages = [
  { code: 'en' as Language, label: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'zh' as Language, label: '中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'es' as Language, label: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr' as Language, label: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'pt' as Language, label: 'Português', flag: '🇧🇷', dir: 'ltr' },
  { code: 'ru' as Language, label: 'Русский', flag: '🇷🇺', dir: 'ltr' },
] as const;

export function getMessage(lang: Language) {
  const msgs = messages as any;
  return msgs[lang] ?? msgs['en'];
}

export function isValidLanguage(lang: string): lang is Language {
  return lang in messages;
}
