import { createI18n } from 'vue-i18n'
import es from '@/locales/es.json'
import en from '@/locales/en.json'
import ur from '@/locales/ur.json'
import ar from '@/locales/ar.json'


export const i18n = createI18n({
  legacy: false, // Usa la API de Composition
  locale: 'es',
  fallbackLocale: 'es',
  messages: {
    es,
    en,
    ur,
    ar
  }
})
