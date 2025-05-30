<template>
  <div class="auth-view">
    <div class="login-form">
      <h2>Admin Login</h2>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group" :class="{ 'error': error }">
          <label for="username">Username</label> <input 
            id="username" type="text" 
            v-model="username" autocomplete="username"
          />
        </div>

        <div class="form-group" :class="{ 'error': error }">
          <label for="password">Password</label>
          <input 
            id="password"
            type="password"
            v-model="password"
            autocomplete="current-password"
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" class="login-btn" :disabled="authStore.isLoading">
          {{ authStore.isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore' // Ensure this path is correct
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('') // This will be used for 'nombre_admin'
const password = ref('')
const error = ref('') // Local error for the form

async function handleSubmit() {
  if (!username.value || !password.value) {
    error.value = 'Please fill in all fields.' // English for consistency with backend messages
    return
  }
  error.value = ''; // Clear previous errors

  // Construct the credentials object as expected by the authStore and backend
  const credentials = {
    nombre_admin: username.value, // Use 'nombre_admin' as the key
    password: password.value
  };

  try {
    const success = await authStore.login(credentials); // Pass the credentials object
    if (success) {
      // Navigate to the admin area or dashboard
      // Ensure you have a route named 'admin-dashboard' or similar
      // or use a path like '/admin/dashboard'
      router.push({ name: 'admin' }); // Example: redirect to an admin route
    } else {
      // authStore.error should contain the error message from the backend or authService
      error.value = authStore.error || 'Login failed. Please check your credentials.';
    }
  } catch (catchedError) {
    // This catch block might be redundant if authStore.login already handles and sets authStore.error
    // but it's good for catching unexpected issues during the call.
    console.error("Error during handleSubmit:", catchedError);
    error.value = authStore.error || 'An unexpected error occurred during login.';
  }
}
</script>

<style scoped>
.auth-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px); /* Adjusted for typical header/footer height */
  padding: 20px;
  background-color: #f4f7f6; /* Light background for the view */
}

.login-form {
  background: white;
  padding: 2.5rem; /* Increased padding */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Softer shadow */
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333; /* Darker text color */
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555; /* Slightly lighter label color */
  font-weight: 500;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 0.85rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box; /* Ensures padding doesn't expand width */
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: var(--primary-color, #007bff); /* Use primary color from variables or a default */
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25); /* Focus ring */
}


.form-group.error input {
  border-color: #e74c3c; /* Error color */
}

.error-message {
  color: #e74c3c; /* Error color */
  margin-bottom: 1rem;
  font-size: 0.875rem;
  text-align: center;
}

.login-btn {
  width: 100%;
  padding: 0.85rem;
  background-color: var(--primary-color, #007bff);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.login-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.login-btn:hover:not(:disabled) {
  background-color: var(--primary-color-dark, #0056b3); /* Darker shade for hover */
}
</style>