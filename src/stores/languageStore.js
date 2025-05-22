import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Import your JSON translation files here
import es from '@/locales/es.json'
import en from '@/locales/en.json'
import fr from '@/locales/fr.json'
import ar from '@/locales/ar.json'
import ur from '@/locales/ur.json'

const translations = { es, en, fr, ar, ur }

export const useLanguageStore = defineStore('language', () => {
  const currentLanguage = ref('es')

  function setLanguage(language) {
    if (Object.keys(translations).includes(language)) {
      currentLanguage.value = language
    }
  }

  // computed property to get current translations object
  const t = computed(() => {
    return translations[currentLanguage.value] || translations.es
  })

  return {
    currentLanguage,
    setLanguage,
    t,
  }
})
