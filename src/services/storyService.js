
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
  }
};

