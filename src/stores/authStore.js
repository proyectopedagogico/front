import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: null,
    error: null
  }),

  actions: {
    async login(username, password) {
      try {
        // TODO: Replace with actual API call when backend is ready
        if (username === 'admin' && password === 'admin123') { // Temporary hardcoded credentials
          this.isAuthenticated = true
          this.token = 'dummy-token' // Replace with real token from API
          localStorage.setItem('auth-token', this.token)
          this.error = null
          return true
        }
        throw new Error('Invalid credentials')
      } catch (err) {
        this.error = err.message
        return false
      }
    },

    logout() {
      this.isAuthenticated = false
      this.token = null
      localStorage.removeItem('auth-token')
    },

    checkAuth() {
      const token = localStorage.getItem('auth-token')
      if (token) {
        this.token = token
        this.isAuthenticated = true
      }
    }
  }
})
