import { createI18n } from 'vue-i18n'
import es from '@/locales/es.json'
import en from '@/locales/en.json'
import eu from '@/locales/eu.json'
import ar from '@/locales/ar.json'
import ur from '@/locales/ur.json'

export const i18n = createI18n({
  legacy: false, // Usa la API de Composition
  locale: 'es',
  fallbackLocale: 'es',
  messages: {
    es,
    en,
    eu,
    ar,
    ur
  }
})
