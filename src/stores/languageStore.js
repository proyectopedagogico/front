import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {
  // Estado
  const currentLanguage = ref('es') // Opciones: 'es' (español), 'ca' (catalán), 'eu' (euskera)

  // Acciones
  function setLanguage(language) {
    if (['es', 'ca', 'eu'].includes(language)) {
      currentLanguage.value = language
    }
  }

  return { 
    currentLanguage, 
    setLanguage 
  }
})
