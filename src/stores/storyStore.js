// stores/storyStore.js

import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
// This store relies on 'storyService' having getOriginOptions, getProfessionOptions, and getTagOptions methods.
// Ensure your '../services/storyService.js' file (like Canvas vue_story_service_js_corrected) 
// defines and exports these, and that they call the correct public API endpoints.
import { storyService } from '../services/storyService'; 

export const useStoryStore = defineStore('story', () => {
  // State
  const stories = ref([]);
  const paginationInfo = ref({}); 
  const isLoading = ref(false);
  const error = ref(null);
  
  // State for filter options - will be populated from API
  const filterOptions = ref({ 
    origins: [],
    professions: [],
    tags: [] 
  });

  // Getters
  const getStoryById = computed(() => {
    // This might need to be adjusted if adminStories and public stories are fetched separately
    // and you need to find a story that might only be in one list.
    return (id) => stories.value.find(story => story.id_historias === parseInt(id));
  });

  const getLatestStories = computed(() => {
    // This will only show the latest from the currently fetched public stories page
    return stories.value.slice(0, 3);
  });

  // Actions
  async function fetchStories(language = 'es', page = 1, perPage = 10, activeFilters = {}) {
    isLoading.value = true;
    error.value = null;
    try {
      // Calls storyService.getStories, which should target the public, unauthenticated endpoint
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

  // Action to fetch filter options dynamically from the API
  async function fetchFilterOptions() {
    // Consider a separate loading/error state for filter options if needed
    // For simplicity, using the global isLoading and error for now.
    isLoading.value = true; 
    error.value = null; 
    try {
      // Fetch options dynamically from the API using storyService
      const [originsData, professionsData, tagsData] = await Promise.all([
        storyService.getOriginOptions(),    // Calls GET /public/filter-options/origins
        storyService.getProfessionOptions(),// Calls GET /public/filter-options/professions
        storyService.getTagOptions()        // Calls GET /public/filter-options/tags
      ]);

      filterOptions.value = {
        origins: originsData || [], 
        professions: professionsData || [],
        tags: tagsData || [] // Assuming the API returns an array of tag names for this
      };
      console.log("Dynamic filter options loaded from API:", filterOptions.value);
    } catch (err) {
      console.error('Error fetching dynamic filter options from API:', err);
      error.value = (err.data && (err.data.message || err.data.error)) || err.message || 'Error loading filter options';
      // Reset to empty arrays on error to prevent issues in templates
      filterOptions.value = { origins: [], professions: [], tags: [] }; 
    } finally {
      isLoading.value = false; 
    }
  }

  // Admin-specific actions (These call protected endpoints via storyService)
  // It's assumed storyService methods like createStory, updateStory, deleteStory, getAdminStories
  // will call the appropriate /api/stories endpoints where api.js handles token attachment.

  const adminStories = ref([]); // Separate state for stories in admin view
  const adminPaginationInfo = ref({}); // Separate pagination for admin view

  async function fetchAdminStories(language = 'es', page = 1, perPage = 10, activeFilters = {}) {
    isLoading.value = true; // Or a separate isLoadingAdmin
    error.value = null; // Or a separate errorAdmin
    try {
      const response = await storyService.getAdminStories(language, page, perPage, activeFilters);
      // Adjust based on whether admin endpoint /api/stories returns pagination
      if (response && response.items && response._meta) { // If paginated
        adminStories.value = response.items;
        adminPaginationInfo.value = response._meta;
      } else if (response && Array.isArray(response)) { // If a simple array
        adminStories.value = response;
        adminPaginationInfo.value = {}; // Reset if not paginated
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
  
  async function addStory(storyData) { 
    isLoading.value = true; 
    error.value = null; 
    try { 
      const newStory = await storyService.createStory(storyData); 
      if (newStory) { 
        // Add to adminStories list for immediate UI update in admin panel
        adminStories.value.unshift(newStory);  
        // Optionally, re-fetch the current page of admin stories to ensure consistency
        // await fetchAdminStories(currentLanguage, adminPaginationInfo.value.page || 1, ...);
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
      const index = adminStories.value.findIndex(story => story.id_historias === id); 
      if (index !== -1) { 
        adminStories.value[index] = updated; 
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
      adminStories.value = adminStories.value.filter(story => story.id_historias !== id);  
    } catch (err) { 
      error.value = err.message || 'Error deleting story'; 
      throw err; 
    } finally { 
      isLoading.value = false; 
    } 
  } 

  return {
    stories, // For public view
    adminStories, // For admin view
    paginationInfo, // For public view pagination
    adminPaginationInfo, // For admin view pagination
    isLoading,
    error,
    filterOptions, 
    getStoryById,
    getLatestStories,
    fetchStories, // For public view
    fetchAdminStories, // For admin view
    fetchFilterOptions, 
    addStory,
    updateStory,
    deleteStory
  };
});