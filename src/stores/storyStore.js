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
  const adminStories = ref([]); // Separate state for stories in admin view
  const currentStory = ref(null); // For viewing/editing a single story detail if needed
  const isLoading = ref(false);
  const error = ref(null);
  const paginationInfo = ref({});
  const adminPaginationInfo = ref({}); // Pagination for admin
  
  // State for filter options - will be populated from API
  const filterOptions = ref({ 
    origins: [],
    professions: [],
    tags: [] 
  });
  const availableTags = ref([]); // State for all tags (ID and Name) for dropdowns

  // Getters
  const getStoryById = computed(() => {
    return (id) => adminStories.value.find(story => story.id_historias === parseInt(id)) || stories.value.find(story => story.id_historias === parseInt(id));
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
      if (response && Array.isArray(response)) { // If admin endpoint returns a simple array
        adminStories.value = response;
        adminPaginationInfo.value = {}; // Reset if not paginated
      } else if (response && response.items && response._meta) { // If admin endpoint is paginated
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
  
  async function fetchFilterOptions() { // This is for public filter dropdowns (tag names)
      isLoading.value = true;
      error.value = null;
      try {
          // Assuming storyService.getFilterOptions bundles the calls to get origins, professions, and public tag names
          const options = await storyService.getFilterOptions(); 
          filterOptions.value = {
            origins: options.origins || [],
            professions: options.professions || [],
            tags: options.tags || [] // These are typically tag names for public filters
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

  // Action to fetch all tags (ID and Name) for admin forms
  async function fetchTags() {
    isLoading.value = true; 
    error.value = null;
    try {
      const tagsData = await storyService.getTags(); // Calls GET /api/tags (or your equivalent endpoint)
      // Ensure tagsData is an array of objects like { etiqueta_id: 1, name: 'Superación' }
      availableTags.value = tagsData || []; 
      console.log("Fetched available tags for admin forms:", availableTags.value);
    } catch (err) {
      error.value = (err.data && (err.data.message || err.data.error)) || err.message || 'Failed to fetch tags';
      console.error("Error fetching tags:", err);
      availableTags.value = [];
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
        adminStories.value.unshift(newStory);  
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

  // Action to create a person (placeholder, needs full implementation)
  async function createPersonAndGetId(personData) {
    isLoading.value = true;
    error.value = null;
    try {
      console.log("Store: Attempting to create person:", personData);
      const newPerson = await storyService.createPerson(personData); // Assumes createPerson exists in storyService
      console.log("Store: Person created:", newPerson);
      return newPerson; // Return the whole person object (which should include id_persona)
    } catch (err) {
      error.value = (err.data && (err.data.message || err.data.error)) || err.message || 'Failed to create person';
      console.error("Error creating person:", err);
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
    filterOptions, // For public view filters
    availableTags, // For admin form tag selection
    getStoryById,
    getLatestStories,
    fetchStories, 
    fetchAdminStories,
    fetchFilterOptions,
    fetchTags, // Expose fetchTags
    addStory,
    updateStory,
    deleteStory,
    createPersonAndGetId
  };
});
