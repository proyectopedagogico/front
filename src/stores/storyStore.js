import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
// This store relies on 'storyService' having getOriginOptions, getProfessionOptions, and getTagOptions methods.
// Ensure your '../services/storyService.js' file defines and exports these.
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

  // Action to fetch filter options dynamically from the API
  async function fetchFilterOptions() {
    isLoading.value = true; 
    error.value = null; 
    try {
      // Fetch options dynamically from the API using storyService
      // This requires storyService.getOriginOptions, storyService.getProfessionOptions, 
      // and storyService.getTagOptions to be defined and correctly call the API.
      const [originsData, professionsData, tagsData] = await Promise.all([
        storyService.getOriginOptions(),
        storyService.getProfessionOptions(),
        storyService.getTagOptions()
      ]);

      filterOptions.value = {
        origins: originsData || [], 
        professions: professionsData || [],
        tags: tagsData || [] 
      };
      console.log("Dynamic filter options loaded from API:", filterOptions.value);
    } catch (err) {
      console.error('Error fetching dynamic filter options from API:', err);
      error.value = (err.data && (err.data.message || err.data.error)) || err.message || 'Error loading filter options';
      filterOptions.value = { origins: [], professions: [], tags: [] }; 
    } finally {
      isLoading.value = false; 
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

  return {
    stories,
    paginationInfo,
    isLoading,
    error,
    filterOptions, 
    getStoryById,
    getLatestStories,
    fetchStories,
    fetchFilterOptions, 
    addStory,
    updateStory,
    deleteStory
  };
});