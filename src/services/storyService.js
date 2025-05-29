// src/services/storyService.js
import { api } from './api';

export const storyService = {
  async getStories() {
    return api.get('/stories');
  },

  async getStoryById(id) {
    return api.get(`/stories/${id}`);
  },

  async createStory(story) {
    return api.post('/stories', story);
  },

  async updateStory(id, story) {
    return api.put(`/stories/${id}`, story);
  },

  async deleteStory(id) {
    return api.delete(`/stories/${id}`);
  },

  async uploadProfileImage(id, file) {
    const formData = new FormData();
    formData.append('profileImage', file);
    return api.upload(`/stories/${id}/profile-image`, formData);
  },

  async getFilterOptions() {
    return api.get('/stories/filter-options');
  },

  async getOrigins() {
    return api.get('/stories/origins');
  },

  async getProfessions() {
    return api.get('/stories/professions');
  },

  async getTags() {
    return api.get('/stories/tags');
  },
};

