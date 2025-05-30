// stores/storyStore.js

import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { storyService } from '../services/storyService'; 

export const useStoryStore = defineStore('story', () => {
  // State
  const stories = ref([]); 
  const adminStories = ref([]); 
  const currentStory = ref(null); 
  const isLoading = ref(false);
  const error = ref(null);
  const paginationInfo = ref({}); 
  const adminPaginationInfo = ref({}); 
  const filterOptions = ref({ 
    origins: [],
    professions: [],
    tags: [] 
  });
  const availableTags = ref([]); 

  // Getters
  const getStoryById = computed(() => {
    return (id) => adminStories.value.find(story => story.id_historias === parseInt(id)) || 
                   stories.value.find(story => story.id_historias === parseInt(id));
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
        console.warn("fetchStories (public) response was not in the expected paginated format. Received:", response);
        stories.value = Array.isArray(response) ? response : []; 
        paginationInfo.value = {};
      }
    } catch (err) {
      console.error('Error in store fetchStories (public):', err);
      error.value = (err.data && (err.data.message || err.data.error)) || err.message || 'Error loading public stories';
      stories.value = []; 
      paginationInfo.value = {}; 
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchAdminStories(language = 'es', page = 1, perPage = 10, activeFilters = {}) {
    isLoading.value = true; 
    error.value = null; 
    try {
      const response = await storyService.getAdminStories(language, page, perPage, activeFilters);
      if (response && Array.isArray(response)) { 
        adminStories.value = response;
        adminPaginationInfo.value = {}; 
      } else if (response && response.items && response._meta) { 
        adminStories.value = response.items;
        adminPaginationInfo.value = response._meta;
      } else {
        console.warn("fetchAdminStories response was not in expected format. Received:", response);
        adminStories.value = [];
        adminPaginationInfo.value = {};
      }
    } catch (err) {
      console.error('Error in store fetchAdminStories:', err);
      error.value = (err.data && (err.data.message || err.data.error)) || err.message || 'Error loading admin stories';
      adminStories.value = [];
      adminPaginationInfo.value = {};
    } finally {
      isLoading.value = false;
    }
  }
  
  async function fetchFilterOptions() {
      isLoading.value = true;
      error.value = null;
      try {
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
          console.log("Dynamic public filter options loaded from API:", filterOptions.value);
      } catch (err) {
          console.error("Error fetching dynamic public filter options from API:", err);
          error.value = (err.data && (err.data.message || err.data.error)) || err.message || 'Error loading public filter options';
          filterOptions.value = { origins: [], professions: [], tags: [] }; 
      } finally {
          isLoading.value = false;
      }
  }

  async function fetchTags() { 
    isLoading.value = true; 
    error.value = null;
    try {
      const tagsData = await storyService.getTags(); 
      availableTags.value = tagsData || []; 
      console.log("Fetched available tags for admin forms:", availableTags.value);
    } catch (err) {
      error.value = (err.data && (err.data.message || err.data.error)) || err.message || 'Failed to fetch tags';
      console.error("Error fetching tags for admin:", err);
      availableTags.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  async function createPersonAndGetId(personData) {
    isLoading.value = true; 
    error.value = null;    
    try {
      console.log("Store: Attempting to create person via service with data:", personData);
      const newPerson = await storyService.createPerson(personData); 
      console.log("Store: Person created via service, response:", newPerson);
      if (newPerson && newPerson.id_persona) { 
        return newPerson; 
      } else {
        throw new Error("API response for creating person was invalid or missing id_persona.");
      }
    } catch (err) {
      const backendError = err.data ? (err.data.error || err.data.message) : null;
      error.value = backendError || err.message || 'Error creating person.';
      console.error("Store: Error creating person:", error.value, err);
      throw new Error(error.value); 
    } finally {
      isLoading.value = false;
    }
  }

  // --- NEW: Action to upload an image for a person ---
  async function uploadImageForPerson(personId, imageFile, description = '') {
    isLoading.value = true; // Or a specific isLoadingImageUpload
    error.value = null;
    try {
      console.log(`Store: Attempting to upload image for person ID ${personId}`);
      const response = await storyService.uploadPersonImage(personId, imageFile, description);
      console.log("Store: Image upload response:", response);
      // Optionally, you might want to re-fetch person details or images list if needed
      // Or update the local state if the response contains enough info
      return response; // Return the API response (e.g., image_details)
    } catch (err) {
      const backendError = err.data ? (err.data.error || err.data.message) : null;
      error.value = backendError || err.message || 'Error uploading image.';
      console.error("Store: Error uploading image:", error.value, err);
      throw new Error(error.value); // Re-throw for the component to catch
    } finally {
      isLoading.value = false; // Reset global loading state
    }
  }

  async function addStory(storyData) { 
    isLoading.value = true; 
    error.value = null; 
    try { 
      const newStory = await storyService.createStory(storyData); 
      if (newStory) { 
        adminStories.value.unshift(newStory);  
      } 
    } catch (err) { 
      error.value = (err.data && (err.data.message || err.data.error)) || err.message || 'Error creating story'; 
      console.error("Store: Error adding story:", error.value, err);
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
      const index = adminStories.value.findIndex(story => story.id_historias === id); 
      if (index !== -1) { 
        adminStories.value[index] = updated; 
      } 
    } catch (err) { 
      error.value = (err.data && (err.data.message || err.data.error)) || err.message || 'Error updating story'; 
      console.error("Store: Error updating story:", error.value, err);
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
      adminStories.value = adminStories.value.filter(story => story.id_historias !== id);  
    } catch (err) { 
      error.value = (err.data && (err.data.message || err.data.error)) || err.message || 'Error deleting story'; 
      console.error("Store: Error deleting story:", error.value, err);
      throw err; 
    } finally { 
      isLoading.value = false; 
    } 
  } 

  return {
    stories, 
    adminStories, 
    currentStory,
    isLoading,
    error,
    paginationInfo,
    adminPaginationInfo,
    filterOptions, 
    availableTags, 
    getStoryById,
    getLatestStories,
    fetchStories, 
    fetchAdminStories,
    fetchFilterOptions,
    fetchTags, 
    addStory,
    updateStory,
    deleteStory,
    createPersonAndGetId,
    uploadImageForPerson // <-- Expose the new action
  };
});
