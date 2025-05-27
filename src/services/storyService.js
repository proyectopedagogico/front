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
      page: page,
      per_page: perPage,
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
    // console.log("DEBUG: Final URL for getStories:", finalUrl); 

    return api.get(finalUrl, false); 
  },

  /**
   * Fetches a single story detail for public view by its ID.
   * This function calls the public endpoint and does NOT require authentication.
   */
  async getPublicStoryById(id, language = 'es') {
    return api.get(`/public/stories/${id}?lang=${language}`, false);
  },

  // --- Methods for fetching filter options (public, no auth needed) ---
  async getOriginOptions() {
    return api.get('/public/filter-options/origins', false);
  },

  async getProfessionOptions() {
    return api.get('/public/filter-options/professions', false);
  },

  async getTagOptions() {
    return api.get('/public/filter-options/tags', false);
  },

  // --- Admin Endpoints (These WILL require authentication by default via api.js) ---

  /**
   * Fetches all stories for the admin panel (protected endpoint).
   * Handles pagination, language, and filters.
   */
  async getAdminStories(language = 'es', page = 1, perPage = 10, filters = {}) {
    const queryParams = new URLSearchParams({
      lang: language,
      page: page,
      per_page: perPage,
    });
     for (const key in filters) {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    }
    // Calls protected endpoint /api/stories. Token will be attached by api.js
    return api.get(`/stories?${queryParams.toString()}`); 
  },

  /**
   * Creates a new story (Admin operation).
   * @param {object} storyData - The data for the new story.
   */
  async createStory(storyData) {
    return api.post('/stories', storyData);
  },

  /**
   * Updates an existing story (Admin operation).
   * @param {number|string} storyId - The ID of the story to update.
   * @param {object} storyData - The data to update the story with.
   */
  async updateStory(storyId, storyData) {
    return api.put(`/stories/${storyId}`, storyData);
  },

  /**
   * Deletes a story (Admin operation).
   * @param {number|string} storyId - The ID of the story to delete.
   */
  async deleteStory(storyId) {
    return api.delete(`/stories/${storyId}`);
  },
  
  /**
   * Fetches details of a specific story for admin purposes.
   * This calls the protected /api/stories/:id endpoint.
   * @param {number|string} storyId - The ID of the story.
   * @param {string} language - The language code for the content.
   */
  async getAdminStoryById(storyId, language = 'es') { 
    return api.get(`/stories/${storyId}?lang=${language}`);
  }
};
