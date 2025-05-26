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
    console.log("DEBUG: Filters received in storyService.getStories:", JSON.parse(JSON.stringify(filters))); // Log received filters
    for (const key in filters) {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        // The 'key' from the filters object (e.g., 'origin', 'profession', 'tags')
        // will be used directly as the query parameter name.
        // This matches the backend expectation from your provided Flask code:
        // request.args.get('origin'), request.args.get('profession'), request.args.get('tags')
        let backendKey = key; 
        
        queryParams.append(backendKey, filters[key]);
      }
    }
    
    const finalUrl = `/public/stories?${queryParams.toString()}`;
    console.log("DEBUG: Final URL for getStories:", finalUrl); // Log the final URL

    // Call the public endpoint, explicitly stating requireAuth = false
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

  async getTagOptions() {
    return api.get('/public/filter-options/tags', false);
  },

  // --- Admin Endpoints (These WILL require authentication by default via api.js) ---

  /**
   * Creates a new story (Admin operation).
   * @param {object} storyData - The data for the new story.
   */
  async createStory(storyData) {
    // Token will be attached by api.js if user is logged in (requireAuth defaults to true)
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
   * Fetches details of a specific story for admin purposes (if different from public).
   * This would call the protected /api/stories/:id endpoint.
   * @param {number|string} storyId - The ID of the story.
   * @param {string} language - The language code for the content.
   */
  async getAdminStoryById(storyId, language = 'es') {
    // Token will be attached by api.js (requireAuth defaults to true)
    // Corrected to use storyId in the URL
    return api.get(`/stories/${storyId}?lang=${language}`); 
  }
};
