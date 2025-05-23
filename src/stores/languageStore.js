import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLanguageStore = defineStore('language', () => {
  const currentLanguage = ref('es')
  const availableLanguages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية' },
    { code: 'ur', name: 'اردو' }
  ]

  // Cargar el idioma guardado al iniciar
  const init = () => {
    const savedLanguage = localStorage.getItem('userLanguage')
    if (savedLanguage) {
      currentLanguage.value = savedLanguage
    }
  }

  // Cambiar idioma
  const setLanguage = (langCode) => {
    currentLanguage.value = langCode
    localStorage.setItem('userLanguage', langCode)
  }

  // Obtener nombre del idioma
  const getLanguageName = (langCode) => {
    const lang = availableLanguages.find(l => l.code === langCode) // Corregido: era lang.Code
    return lang ? lang.name : ''
  }

  return {
    currentLanguage,
    availableLanguages,
    init,
    setLanguage,
    getLanguageName
  }
})


