import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
// Asegúrate de que storyService esté correctamente definido e importe 'api' de api.js
// y que la función getStories en storyService llame a api.get('/public/stories', false)
import { storyService } from '../services/storyService'; 

export const useStoryStore = defineStore('story', () => {
  // State
  const stories = ref([]);
  const paginationInfo = ref({}); // To store pagination metadata (_meta)
  const isLoading = ref(false);
  const error = ref(null);

  // Getters
  const getStoryById = computed(() => {
    return (id) => stories.value.find(story => story.id_historias === parseInt(id)); // Ensure ID types match if comparing
  });

  const getLatestStories = computed(() => {
    // This will only show the latest from the currently fetched page
    return stories.value.slice(0, 3);
  });

  // Actions
  async function fetchStories(language = 'es', page = 1, perPage = 10, filters = {}) {
    isLoading.value = true;
    error.value = null;
    try {
      // This function should call your storyService.getStories, 
      // which in turn calls api.get('/public/stories?params...', false)
      const response = await storyService.getStories(language, page, perPage, filters);
      
      if (response && response.items && response._meta) {
        stories.value = response.items;
        paginationInfo.value = response._meta;
      } else {
        // Fallback or error if the response structure is not as expected
        console.warn("fetchStories response was not in the expected paginated format. Received:", response);
        stories.value = Array.isArray(response) ? response : []; // Assume it might be a simple array if not paginated
        paginationInfo.value = {}; // Reset pagination
        // Optionally set an error if the structure is mandatory
        // error.value = 'Invalid data structure received for stories.';
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

  // Admin actions (these would call methods in storyService that require auth by default)
  async function addStory(storyData) {
    isLoading.value = true;
    error.value = null;
    try {
      const newStory = await storyService.createAdminStory(storyData); // Assuming createAdminStory uses auth
      // Add to the beginning of the list for immediate UI update
      // Or re-fetch the current page: await fetchStories(currentLanguage, currentPage, currentPerPage, currentFilters);
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
      const updated = await storyService.updateAdminStory(id, updatedStoryData); // Assuming updateAdminStory uses auth
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
      await storyService.deleteAdminStory(id); // Assuming deleteAdminStory uses auth
      stories.value = stories.value.filter(story => story.id_historias !== id); 
    } catch (err) {
      error.value = err.message || 'Error deleting story';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  // It's generally better to call fetchStories from the component that needs the data (e.g., in onMounted),
  // rather than calling it immediately when the store is defined.
  // This gives more control over initial data loading and parameter passing.
  // fetchStories(); // Consider removing this initial call from here.

  return {
    stories,
    paginationInfo,
    isLoading,
    error,
    filterOptions,
    getStoryById,
    getLatestStories,
    addStory,
    updateStory,
    deleteStory
  };
});
