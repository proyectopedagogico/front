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

    // Add filter parameters if they exist
    for (const key in filters) {
      if (filters[key] !== null && filters[key] !== undefined) {
        queryParams.append(key, filters[key]);
      }
    }
    
    // Call the public endpoint, explicitly stating requireAuth = false
    return api.get(`/public/stories?${queryParams.toString()}`, false); 
  },

  /**
   * Fetches a single story detail for public view by its ID.
   * This function calls the public endpoint and does NOT require authentication.
   */
  async getPublicStoryById(id, language = 'es') {
    // Call the public endpoint, explicitly stating requireAuth = false
    return api.get(`/public/stories/${id}?lang=${language}`, false);
  },

  // --- Admin Endpoints (These WILL require authentication by default via api.js) ---

  /**
   * Creates a new story (Admin operation).
   */
  async createStory(storyData) {
    return api.post('/stories', storyData); // Token will be attached by api.js if user is logged in
  },

  /**
   * Updates an existing story (Admin operation).
   */
  async updateStory(id, storyData) {
    return api.put(`/stories/${id}`, storyData);
  },

  /**
   * Deletes a story (Admin operation).
   */
  async deleteStory(id) {
    return api.delete(`/stories/${id}`);
  },

  /**
   * Fetches details of a specific story for admin purposes (if different from public).
   * This would call the protected /api/stories/:id endpoint.
   */
  async getAdminStoryById(id, language = 'es') {
    return api.get(`/stories/${id}?lang=${language}`); // Token will be attached
  }
};
