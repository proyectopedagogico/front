import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storyService } from '../services/storyService'

export const useStoryStore = defineStore('story', () => {
  // Estado
  const stories = ref([
    {
      id: 1,
      name: 'Erika',
      color: 'pink',
      buttonText: 'Leer historia',
      age: 45,
      origin: 'España',
      profession: 'Profesora',
      description: 'Profesora de primaria con más de 20 años de experiencia, especializada en educación inclusiva.',
      story: 'Historia de Erika...',
      profileImage: null // Se llenará desde la API
    },
    {
      id: 2,
      name: 'Belén',
      color: 'yellow',
      buttonText: 'Leer historia',
      age: 38,
      origin: 'México',
      profession: 'Ingeniera',
      description: 'Ingeniera civil que ha liderado proyectos de infraestructura sostenible en comunidades rurales.',
      story: 'Historia de Belén...',
      profileImage: null // Se llenará desde la API
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
      story: 'Historia de Thais...',
      profileImage: null // Se llenará desde la API
    },
    {
      id: 4,
      name: 'Nayra',
      color: 'mint',
      buttonText: 'Leer historia',
      age: 42,
      origin: 'Argentina',
      profession: 'Médica',
      description: 'Médica rural que ha dedicado su carrera a mejorar el acceso a la salud en zonas remotas.',
      story: 'Historia de Nayra...',
      profileImage: null // Se llenará desde la API
    },
    {
      id: 5,
      name: 'Fatima',
      color: 'yellow',
      buttonText: 'Leer historia',
      age: 35,
      origin: 'Marruecos',
      profession: 'Empresaria',
      description: 'Fundadora de una cooperativa de mujeres artesanas que exporta productos tradicionales.',
      story: 'Historia de Fatima...',
      profileImage: null // Se llenará desde la API
    },
    {
      id: 6,
      name: 'Mei',
      color: 'mint',
      buttonText: 'Leer historia',
      age: 31,
      origin: 'China',
      profession: 'Programadora',
      description: 'Desarrolladora de software especializada en aplicaciones educativas para niños con discapacidad.',
      story: 'Historia de Mei...',
      profileImage: null // Se llenará desde la API
    }
  ])
  const isLoading = ref(false)
  const error = ref(null)
  const filterOptions = ref({
    origins: [],
    professions: [],
    tags: []
  })

  // Getters
  const getStoryById = computed(() => {
    return (id) => stories.value.find(story => story.id === id)
  })

  const getLatestStories = computed(() => {
    return stories.value.slice(0, 3)
  })

  // Acciones
  async function fetchFilterOptions() {
    try {
      isLoading.value = true
      const [origins, professions, tags] = await Promise.all([
        storyService.getOrigins(),
        storyService.getProfessions(),
        storyService.getTags()
      ])
      filterOptions.value = {
        origins,
        professions,
        tags
      }
    } catch (err) {
      error.value = 'Error al cargar las opciones de filtro'
      console.error('Error fetching filter options:', err)
    } finally {
      isLoading.value = false
    }
  }

  function addStory(story) {
    const newId = stories.value.length > 0
      ? Math.max(...stories.value.map(s => s.id)) + 1
      : 1

    stories.value.push({
      id: newId,
      ...story
    })
  }

  function updateStory(id, updatedStory) {
    const index = stories.value.findIndex(story => story.id === id)
    if (index !== -1) {
      stories.value[index] = { ...stories.value[index], ...updatedStory }
    }
  }

  function deleteStory(id) {
    const index = stories.value.findIndex(story => story.id === id)
    if (index !== -1) {
      stories.value.splice(index, 1)
    }
  }

  return {
    stories,
    isLoading,
    error,
    filterOptions,
    getStoryById,
    getLatestStories,
    addStory,
    updateStory,
    deleteStory,
    fetchFilterOptions
  }
})
