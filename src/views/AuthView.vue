<template>
  <div class="auth-view">
    <div class="login-form">
      <h2>Admin Login</h2>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group" :class="{ 'error': error }">
          <label for="username">Username</label>
          <input 
            id="username"
            type="text" 
            v-model="username"
            autocomplete="username"
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

        <button type="submit" class="login-btn">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')

async function handleSubmit() {
  if (!username.value || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }

  const success = await authStore.login(username.value, password.value)
  if (success) {
    router.push('/admin')
  } else {
    error.value = authStore.error
  }
}
</script>

<style scoped>
.auth-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 20px;
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group.error input {
  border-color: var(--secondary-color);
}

.error-message {
  color: var(--secondary-color);
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-btn:hover {
  background-color: #00a7b3;
}
</style>
