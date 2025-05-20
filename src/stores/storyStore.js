import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStoryStore = defineStore('story', () => {
  // Estado
  const stories = ref([
    {
      id: 1,
      name: 'Erika',
      color: 'orange',
      buttonText: 'Leer',
      buttonColor: 'lightblue',
      age: 45,
      origin: 'España',
      profession: 'Profesora',
      story: 'Historia de Erika...'
    },
    {
      id: 2,
      name: 'Belén',
      color: 'black',
      buttonText: 'BEGO',
      buttonColor: 'lightyellow',
      age: 38,
      origin: 'México',
      profession: 'Ingeniera',
      story: 'Historia de Belén...'
    },
    {
      id: 3,
      name: 'Thais',
      color: 'blue',
      buttonText: 'KC',
      buttonColor: 'lightpink',
      age: 29,
      origin: 'Colombia',
      profession: 'Diseñadora',
      story: 'Historia de Thais...'
    },
    {
      id: 4,
      name: 'Nayra',
      color: 'orange',
      buttonText: 'Leer',
      buttonColor: 'lightcyan',
      age: 42,
      origin: 'Argentina',
      profession: 'Médica',
      story: 'Historia de Nayra...'
    }
  ])

  // Getters
  const getStoryById = computed(() => {
    return (id) => stories.value.find(story => story.id === id)
  })

  const getLatestStories = computed(() => {
    return stories.value.slice(0, 3)
  })

  // Acciones
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
    getStoryById, 
    getLatestStories, 
    addStory, 
    updateStory, 
    deleteStory 
  }
})
