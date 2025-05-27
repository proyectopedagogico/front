// src/services/storyService.js
import { api } from './api'; // Your base API service

export const storyService = {
  /**
   * Fetches public stories with pagination, language, and filters.
   * This function calls the public endpoint and does NOT require authentication.
   */
  async getStories(language = 'es', page = 1, perPage = 10, filters = {}) {
    // Construct query parameters
    const queryParams = new URLSearchParams({
      lang: language,
      page: page.toString(),
      per_page: perPage.toString(),
    });

    // Add filter parameters if they exist and are not empty
    // console.log("DEBUG: Filters received in storyService.getStories:", JSON.parse(JSON.stringify(filters))); 
    for (const key in filters) {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        let backendKey = key; 
        queryParams.append(backendKey, filters[key]);
      }
    }
    
    const finalUrl = `/public/stories?${queryParams.toString()}`;
    // console.log("DEBUG: Final URL for getPublicStories:", finalUrl); 

    return api.get(finalUrl, false); 
  },

  /**
   * Fetches a single story detail for public view by its ID.
   * This function calls the public endpoint and does NOT require authentication.
   */
  async getPublicStoryById(id, language = 'es') {
    // Call the public endpoint, explicitly stating requireAuth = false
    return api.get(`/public/stories/${id}?lang=${language}`, false);
  },

  // --- Methods for fetching filter options (public, no auth needed) ---
  async getOriginOptions() {
    return api.get('/public/filter-options/origins', false);
  },

  async getProfessionOptions() {
    return api.get('/public/filter-options/professions', false);
  },

  async getTagOptions() { // This fetches tag *names* for public filters
    return api.get('/public/filter-options/tags', false);
  },

  // --- Method to fetch all tags (ID and Name) for Admin Forms ---
  async getTags() {
    // This endpoint should return a list of tag objects [{etiqueta_id: 1, name: 'Tag1'}, ...]
    // Your backend has GET /api/tags for this.
    return api.get('/tags', false); // Assuming /api/tags is public or admin already logged in
                                   // If /api/tags is protected, change 'false' to 'true' or remove it
  },

  // --- Admin Endpoints (These WILL require authentication by default via api.js) ---
  async getAdminStories(language = 'es', page = 1, perPage = 10, filters = {}) {
    const queryParams = new URLSearchParams({
      lang: language,
      page: page.toString(),
      per_page: perPage.toString(),
    });
     for (const key in filters) {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    }
    return api.get(`/stories?${queryParams.toString()}`); 
  },

  async createStory(storyData) {
    return api.post('/stories', storyData);
  },

  async updateStory(storyId, storyData) {
    return api.put(`/stories/${storyId}`, storyData);
  },

  async deleteStory(storyId) {
    return api.delete(`/stories/${storyId}`);
  },
  
  async getAdminStoryById(storyId, language = 'es') { 
    return api.get(`/stories/${storyId}?lang=${language}`);
  },

  // --- Method to create a person (Needed for AdminView's new person flow) ---
  async createPerson(personData) {
    // Admin endpoint, requires auth
    return api.post('/persons', personData); 
  }
};
