<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <div class="nav-links">
      <RouterLink to="/">INICIO</RouterLink>
      <RouterLink to="/historias">HISTORIAS</RouterLink>
      <RouterLink to="/admin">ADMIN</RouterLink>
    </div>
    <div class="language-selector">
      <button class="lang-btn euskera"></button>
      <button class="lang-btn catalan"></button>
      <button class="lang-btn espanol"></button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  border-radius: 25px;
  margin: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.nav-links a.router-link-active {
  font-weight: bold;
}

.language-selector {
  display: flex;
  gap: 0.5rem;
}

.lang-btn {
  width: 30px;
  height: 20px;
  border: none;
  cursor: pointer;
  border-radius: 3px;
}

.euskera {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20"><rect width="30" height="20" fill="red"/><rect y="10" width="30" height="2" fill="white"/><rect x="14" width="2" height="20" fill="white"/><rect x="14" y="10" width="2" height="2" fill="green"/></svg>');
  background-size: cover;
}

.catalan {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20"><rect width="30" height="20" fill="yellow"/><rect y="0" width="30" height="2" fill="red"/><rect y="4" width="30" height="2" fill="red"/><rect y="8" width="30" height="2" fill="red"/><rect y="12" width="30" height="2" fill="red"/><rect y="16" width="30" height="2" fill="red"/></svg>');
  background-size: cover;
}

.espanol {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20"><rect width="30" height="20" fill="yellow"/><rect y="0" width="30" height="5" fill="red"/><rect y="15" width="30" height="5" fill="red"/></svg>');
  background-size: cover;
}
</style>
