// src/services/storyService.js
import { api } from './api'; // Your base API service

export const storyService = {
  // Obtener historias públicas con filtros y paginación
  async getStories(language = 'es', page = 1, perPage = 10, filters = {}) {
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
    return api.get(`/public/stories?${queryParams.toString()}`, false);
  },

  // Obtener historia pública por ID
  async getPublicStoryById(id, language = 'es') {
    return api.get(`/public/stories/${id}?lang=${language}`, false);
  },

  // Opciones de filtro: orígenes
  async getOriginOptions() {
    return api.get('/public/filter-options/origins', false);
  },

  // Opciones de filtro: profesiones
  async getProfessionOptions() {
    return api.get('/public/filter-options/professions', false);
  },

  // Opciones de filtro: tags
  async getTagOptions() {
    return api.get('/public/filter-options/tags', false);
  },

  // Obtener tags (CORREGIDO: sin /api para evitar duplicar el prefijo)
  async getTags() {
    return api.get('/public/filter-options/tags', false);
  },

  // --- Endpoints de admin ---

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

  async createPerson(personData) {
    return api.post('/persons', personData);
  },

  async uploadPersonImage(personId, imageFile, description = '') {
    const formData = new FormData();
    formData.append('file', imageFile);
    if (description) {
      formData.append('descripcion', description);
    }
    return api.postFormData(`/persons/${personId}/images`, formData);
  }
};
