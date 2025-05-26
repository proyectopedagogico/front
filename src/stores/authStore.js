// stores/authStore.js
import { defineStore } from 'pinia';
import { authService } from '../services/authService'; // Assuming you have this service

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: localStorage.getItem('accessToken') || null, // Initialize token from localStorage
    adminUser: null, // Optional: to store admin user details
    error: null,
    isLoading: false, // To track loading state for login/logout
  }),

  getters: {
    isLoggedIn: (state) => !!state.token && state.isAuthenticated,
    // You can add more getters, e.g., for adminUser details
  },

  actions: {
    async login(credentials) {
      // Ensure credentials use 'nombre_admin' as expected by the backend via authService
      // The 'credentials' object passed to this action should be like:
      // { nombre_admin: 'actual_username', password: 'actual_password' }
      this.isLoading = true;
      this.error = null;
      try {
        // authService.login should handle the API call and storing the token in localStorage
        const response = await authService.login(credentials); // authService.login already calls api.post

        if (response && response.access_token) {
          this.token = response.access_token; // Token is already stored in localStorage by authService
          this.isAuthenticated = true;
          // Optionally, fetch admin user details here if needed and store in this.adminUser
          // For example: this.adminUser = await userService.getMe();
          return true;
        } else {
          // This case might not be reached if authService.login throws an error on API failure
          throw new Error(response.message || response.error || 'Login failed: No access token received.');
        }
      } catch (err) {
        this.isAuthenticated = false;
        this.token = null;
        // authService.login should have already cleared localStorage on error
        this.error = (err.data && (err.data.message || err.data.error)) || err.message || 'Login attempt failed.';
        console.error("Login action error:", this.error);
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      this.isLoading = true;
      this.error = null;
      try {
        // authService.logout handles calling the API and removing the token from localStorage
        await authService.logout();
        this.isAuthenticated = false;
        this.token = null;
        this.adminUser = null; // Clear user data
      } catch (err) {
        // Even if API logout fails, clear local state as a fallback
        this.isAuthenticated = false;
        this.token = null;
        this.adminUser = null;
        this.error = (err.data && (err.data.message || err.data.error)) || err.message || 'Logout attempt failed.';
        console.error("Logout action error:", this.error);
        // Decide if you want to re-throw or just log
      } finally {
        this.isLoading = false;
      }
    },

    checkAuthOnAppLoad() {
      // This action should be called when the application loads (e.g., in App.vue or main.js)
      // It checks if a token exists in localStorage and updates the store's state.
      const token = authService.getAuthToken(); // Use authService to get token
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
        // Optionally, you could verify the token with the backend here
        // or fetch user details to confirm the token is still valid.
        // For now, we assume if a token exists, it's valid until an API call fails.
        console.log("Auth state initialized from localStorage.");
      } else {
        this.isAuthenticated = false;
        this.token = null;
        this.adminUser = null;
      }
    }
  }
});
