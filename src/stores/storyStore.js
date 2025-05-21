import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storyService } from '../services/storyService'

export const useStoryStore = defineStore('story', () => {
  // Estado
  const stories = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const getStoryById = computed(() => {
    return (id) => stories.value.find(story => story.id === id)
  })

  const getLatestStories = computed(() => {
    return stories.value.slice(0, 3)
  })

  // Acciones
  async function fetchStories() {
    isLoading.value = true
    error.value = null
    try {
      // Cuando el backend esté listo, descomentar esta línea:
      // const data = await storyService.getStories()
      // stories.value = data

      // Mientras tanto, usar datos de ejemplo:
      stories.value = [
        {
          id: 1,
          name: 'Erika',
          color: 'orange',
          buttonText: 'Leer historia',
          age: 45,
          origin: 'España',
          profession: 'Profesora',
          description: 'Profesora de primaria con más de 20 años de experiencia, especializada en educación inclusiva.',
          story: 'Historia de Erika...'
        },
        {
          id: 2,
          name: 'Belén',
          color: 'black',
          buttonText: 'Leer historia',
          age: 38,
          origin: 'México',
          profession: 'Ingeniera',
          description: 'Ingeniera civil que ha liderado proyectos de infraestructura sostenible en comunidades rurales.',
          story: 'Historia de Belén...'
        },
        {
          id: 3,
          name: 'Thais',
          color: 'blue',
          buttonText: 'Leer historia',
          age: 29,
          origin: 'Colombia',
          profession: 'Diseñadora',
          description: 'Diseñadora gráfica y activista social que utiliza el arte para visibilizar problemáticas de género.',
          story: 'Historia de Thais...'
        },
        {
          id: 4,
          name: 'Nayra',
          color: 'orange',
          buttonText: 'Leer historia',
          age: 42,
          origin: 'Argentina',
          profession: 'Médica',
          description: 'Médica rural que ha dedicado su carrera a mejorar el acceso a la salud en zonas remotas.',
          story: 'Historia de Nayra...'
        },
        {
          id: 5,
          name: 'Fatima',
          color: 'black',
          buttonText: 'Leer historia',
          age: 35,
          origin: 'Marruecos',
          profession: 'Empresaria',
          description: 'Fundadora de una cooperativa de mujeres artesanas que exporta productos tradicionales.',
          story: 'Historia de Fatima...'
        },
        {
          id: 6,
          name: 'Mei',
          color: 'blue',
          buttonText: 'Leer historia',
          age: 31,
          origin: 'China',
          profession: 'Programadora',
          description: 'Desarrolladora de software especializada en aplicaciones educativas para niños con discapacidad.',
          story: 'Historia de Mei...'
        }
      ]
    } catch (err) {
      error.value = err.message || 'Error al cargar las historias'
    } finally {
      isLoading.value = false
    }
  }

  async function addStory(story) {
    isLoading.value = true
    error.value = null
    try {
      // Cuando el backend esté listo:
      // const newStory = await storyService.createStory(story)
      // stories.value.push(newStory)

      // Mientras tanto:
      const newId = stories.value.length > 0
        ? Math.max(...stories.value.map(s => s.id)) + 1
        : 1
      const newStory = { id: newId, ...story }
      stories.value.push(newStory)
      return newStory
    } catch (err) {
      error.value = err.message || 'Error al añadir la historia'
      throw error.value
    } finally {
      isLoading.value = false
    }
  }

  async function updateStory(id, updatedStory) {
    isLoading.value = true
    error.value = null
    try {
      // Cuando el backend esté listo:
      // const updated = await storyService.updateStory(id, updatedStory)
      // const index = stories.value.findIndex(story => story.id === id)
      // if (index !== -1) stories.value[index] = updated

      // Mientras tanto:
      const index = stories.value.findIndex(story => story.id === id)
      if (index !== -1) {
        stories.value[index] = { ...stories.value[index], ...updatedStory }
      }
    } catch (err) {
      error.value = err.message || 'Error al actualizar la historia'
      throw error.value
    } finally {
      isLoading.value = false
    }
  }

  async function deleteStory(id) {
    isLoading.value = true
    error.value = null
    try {
      // Cuando el backend esté listo:
      // await storyService.deleteStory(id)

      // Mientras tanto:
      const index = stories.value.findIndex(story => story.id === id)
      if (index !== -1) {
        stories.value.splice(index, 1)
      }
    } catch (err) {
      error.value = err.message || 'Error al eliminar la historia'
      throw error.value
    } finally {
      isLoading.value = false
    }
  }

  // Inicializar datos
  fetchStories()

  return {
    stories,
    isLoading,
    error,
    getStoryById,
    getLatestStories,
    fetchStories,
    addStory,
    updateStory,
    deleteStory
  }
})
