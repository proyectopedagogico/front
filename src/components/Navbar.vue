<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="header">
    <div class="container">
      <nav class="navbar">
        <div class="logo">
          <RouterLink to="/">
            <span class="logo-text">Monica</span>
          </RouterLink>
        </div>

        <div class="nav-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="nav-links" :class="{ 'active': isMenuOpen }">
          <RouterLink to="/" @click="isMenuOpen = false">Inicio</RouterLink>
          <RouterLink to="/historias" @click="isMenuOpen = false">Proyectos</RouterLink>
          <RouterLink to="/servicios" @click="isMenuOpen = false">Servicios</RouterLink>
          <RouterLink to="/experiencia" @click="isMenuOpen = false">Experiencia</RouterLink>
          <RouterLink to="/sobre-mi" @click="isMenuOpen = false">Sobre mí</RouterLink>
          <RouterLink to="/admin" @click="isMenuOpen = false">Admin</RouterLink>
        </div>

        <div class="nav-actions">
          <button class="theme-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </button>
          <button class="contact-btn btn btn-primary">Contacto</button>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  background-color: var(--background-color);
  padding: var(--spacing-md) 0;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: var(--font-size-xl);
  font-weight: 700;
}

.logo-text {
  background: linear-gradient(90deg, #000 0%, #666 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  gap: var(--spacing-lg);
}

.nav-links a {
  font-size: var(--font-size-sm);
  font-weight: 500;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

.nav-links a:hover::after,
.nav-links a.router-link-active::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.theme-toggle {
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xs);
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.theme-toggle:hover {
  background-color: var(--light-gray);
}

.contact-btn {
  font-size: var(--font-size-sm);
  padding: 0.5rem 1rem;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
}

.nav-toggle span {
  display: block;
  width: 25px;
  height: 2px;
  background-color: var(--text-color);
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background-color: var(--background-color);
    flex-direction: column;
    align-items: center;
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-md);
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .nav-links.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-actions {
    display: none;
  }
}
</style>
