
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { storyService } from '../services/storyService'; 

export const useStoryStore = defineStore('story', () => {
  // State
  const stories = ref([]);
  const paginationInfo = ref({}); 
  const isLoading = ref(false);
  const error = ref(null);
  
  // State for filter options
  const filterOptions = ref({ 
    origins: [],
    professions: [],
    tags: [] 
  });

  // Getters
  const getStoryById = computed(() => {
    return (id) => stories.value.find(story => story.id_historias === parseInt(id));
  });

  const getLatestStories = computed(() => {
    return stories.value.slice(0, 3);
  });

  // Actions
  async function fetchStories(language = 'es', page = 1, perPage = 10, activeFilters = {}) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await storyService.getStories(language, page, perPage, activeFilters);
      
      if (response && response.items && response._meta) {
        stories.value = response.items;
        paginationInfo.value = response._meta;
      } else {
        console.warn("fetchStories response was not in the expected paginated format. Received:", response);
        stories.value = Array.isArray(response) ? response : []; 
        paginationInfo.value = {};
      }
      
    } catch (err) {
      console.error('Error in store fetchStories:', err);
      error.value = (err.data && (err.data.message || err.data.error)) || err.message || 'Error loading stories';
      stories.value = []; 
      paginationInfo.value = {}; 
    } finally {
      isLoading.value = false;
    }
  }

  // Action to fetch filter options (example with static data)
  async function fetchFilterOptions() {
    isLoading.value = true; // Optional: set loading state if fetching from API
    error.value = null;
    try {
      // In a real application, you would fetch these from an API endpoint
      // For example: const options = await filterApiService.getOptions();
      // filterOptions.value = options;

      // Using static data for now as an example
      filterOptions.value = {
        origins: ['Rumanía', 'Colombia', 'Senegal', 'España', 'Siria', 'Nicaragua', 'Honduras', 'Bolivia', 'Marruecos', 'Pakistán', 'Polonia', 'Ucrania', 'Argelia'],
        professions: ['Enfermera', 'Asistenta del hogar', 'Vendedora ambulante', 'Ama de casa', 'Estudiante', 'Profesora de biología', 'Paleoceanógrafa', 'Analista clínica', 'Tendera', 'Cuidadora de personas mayores', 'Profesora de inglés', 'Agente de seguros', 'Trabajadora de hotel', 'Camarera', 'Abogada', 'Auxiliar de geriatría', 'Educadora', 'Librera', 'Limpiadora', 'Modista', 'Pescadera', 'Cocinera', 'Integradora Social', 'Secretaria', 'Ingeniera'],
        tags: ['Superación', 'Emprendimiento', 'Resiliencia', 'Familia', 'Comunidad', 'Migración', 'Educación', 'Liderazgo', 'Identidad cultural', 'Cambio social', 'Maternidad', 'Salud', 'Arte'] // These should match the 'name' from your 'etiquetas' table
      };
      console.log("Filter options loaded:", filterOptions.value);
    } catch (err) {
      console.error('Error fetching filter options:', err);
      error.value = 'Error loading filter options';
      filterOptions.value = { origins: [], professions: [], tags: [] }; // Reset on error
    } finally {
      isLoading.value = false; // Optional
    }
  }

  // Admin actions (addStory, updateStory, deleteStory) ...
  async function addStory(storyData) { 
    isLoading.value = true; 
    error.value = null; 
    try { 
      const newStory = await storyService.createStory(storyData); 
      if (newStory) { 
        stories.value.unshift(newStory);  
      } 
    } catch (err) { 
      error.value = err.message || 'Error creating story'; 
      throw err;  
    } finally { 
      isLoading.value = false; 
    } 
  } 

  async function updateStory(id, updatedStoryData) { 
    isLoading.value = true; 
    error.value = null; 
    try { 
      const updated = await storyService.updateStory(id, updatedStoryData); 
      const index = stories.value.findIndex(story => story.id_historias === id); 
      if (index !== -1) { 
        stories.value[index] = updated; 
      } 
    } catch (err) { 
      error.value = err.message || 'Error updating story'; 
      throw err; 
    } finally { 
      isLoading.value = false; 
    } 
  } 

  async function deleteStory(id) { 
    isLoading.value = true; 
    error.value = null; 
    try { 
      await storyService.deleteStory(id); 
      stories.value = stories.value.filter(story => story.id_historias !== id);  
    } catch (err) { 
      error.value = err.message || 'Error deleting story'; 
      throw err; 
    } finally { 
      isLoading.value = false; 
    } 
  } 
  // Removed initial call to fetchStories() from here
  // It's called in your StoriesView.vue onMounted.

  return {
    stories,
    paginationInfo,
    isLoading,
    error,
    filterOptions, // Expose filterOptions
    getStoryById,
    getLatestStories,
    fetchStories,
    fetchFilterOptions, // Expose the action to fetch filter options
    addStory,
    updateStory,
    deleteStory
  };
});
