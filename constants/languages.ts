// Global content language list for onboarding
export interface Language {
  id: string;
  label: string;
  nativeLabel?: string; // Native name of the language
  code?: string; // ISO language code
}

export const LANGUAGES: Language[] = [
  { id: 'en', label: 'English', nativeLabel: 'English', code: 'en' },
  { id: 'zh-cn', label: '简体中文', nativeLabel: 'Simplified Chinese', code: 'zh-CN' },
  { id: 'zh-tw', label: '繁體中文', nativeLabel: 'Traditional Chinese', code: 'zh-TW' },
  { id: 'es', label: 'Español', nativeLabel: 'Spanish', code: 'es' },
  { id: 'fr', label: 'Français', nativeLabel: 'French', code: 'fr' },
  { id: 'de', label: 'Deutsch', nativeLabel: 'German', code: 'de' },
  { id: 'ja', label: '日本語', nativeLabel: 'Japanese', code: 'ja' },
  { id: 'ko', label: '한국어', nativeLabel: 'Korean', code: 'ko' },
  { id: 'pt', label: 'Português', nativeLabel: 'Portuguese', code: 'pt' },
  { id: 'ru', label: 'Русский', nativeLabel: 'Russian', code: 'ru' },
  { id: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', code: 'hi' },
  { id: 'ar', label: 'العربية', nativeLabel: 'Arabic', code: 'ar' },
  { id: 'it', label: 'Italiano', nativeLabel: 'Italian', code: 'it' },
  { id: 'nl', label: 'Nederlands', nativeLabel: 'Dutch', code: 'nl' },
  { id: 'pl', label: 'Polski', nativeLabel: 'Polish', code: 'pl' },
  { id: 'tr', label: 'Türkçe', nativeLabel: 'Turkish', code: 'tr' },
  { id: 'vi', label: 'Tiếng Việt', nativeLabel: 'Vietnamese', code: 'vi' },
  { id: 'th', label: 'ไทย', nativeLabel: 'Thai', code: 'th' },
  { id: 'id', label: 'Bahasa Indonesia', nativeLabel: 'Indonesian', code: 'id' },
  { id: 'ms', label: 'Bahasa Melayu', nativeLabel: 'Malay', code: 'ms' },
  { id: 'other', label: 'Other', nativeLabel: 'Other', code: 'other' },
];

// Helper function to search languages
export function searchLanguages(query: string): Language[] {
  if (!query.trim()) {
    return LANGUAGES;
  }
  const lowerQuery = query.toLowerCase();
  return LANGUAGES.filter(lang => 
    lang.label.toLowerCase().includes(lowerQuery) ||
    lang.nativeLabel?.toLowerCase().includes(lowerQuery) ||
    lang.code?.toLowerCase().includes(lowerQuery)
  );
}

