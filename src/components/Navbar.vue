<script setup>

import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { ref, onMounted } from 'vue'
import { useLanguageStore } from '@/stores/languageStore'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const authStore = useAuthStore()




const { t, locale } = useI18n()
const languageStore = useLanguageStore()
const isMenuOpen = ref(false)
const isLanguageMenuOpen = ref(false)

// Inicializar el store y el idioma
onMounted(() => {
  languageStore.init()
  locale.value = languageStore.currentLanguage
})

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function toggleLanguageMenu() {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value
}

function selectLanguage(langCode) {
  languageStore.setLanguage(langCode)
  locale.value = langCode
  isLanguageMenuOpen.value = false
}

function handleLogout() {
  authStore.logout()
  router.push('/')
}

</script>

<template>
  <header class="header">
    <div class="container">
      <nav class="navbar">
        <div class="logo">
          <img src="@/assets/images/Logo.png" alt="Logo">
          <RouterLink to="/">
            <span class="logo-text">{{ t('nav.logo') }}</span>
          </RouterLink>
        </div>

        <div class="nav-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>

<div class="nav-links" :class="{ 'active': isMenuOpen }">
  <RouterLink to="/" @click="isMenuOpen = false">{{ t('nav.menu.home') }}</RouterLink>
  <RouterLink to="/historias" @click="isMenuOpen = false">{{ t('nav.menu.stories') }}</RouterLink>
  <RouterLink to="/organizacion" @click="isMenuOpen = false">{{ t('nav.menu.organization') }}</RouterLink>
  <template v-if="authStore.isAuthenticated">
            <RouterLink to="/admin" @click="isMenuOpen = false">{{ t('nav.menu.admin') }}</RouterLink>
  </template>
        <template v-else>
            <RouterLink to="/login" @click="isMenuOpen = false">Admin Login</RouterLink>
          </template>
</div>


        <div class="nav-actions">
          <div class="language-selector" :class="{ 'active': isLanguageMenuOpen }">    <button class="language-btn" @click="toggleLanguageMenu">
      <span class="current-language">
        {{ languageStore.getLanguageName(languageStore.currentLanguage) }}
      </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="language-icon">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                <path d="M2 12h20"></path>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-icon">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
    </button>
    <div class="language-dropdown">
      <button
        v-for="lang in languageStore.availableLanguages"
        :key="lang.code"
        class="language-option"
        :class="{ 'selected': languageStore.currentLanguage === lang.code }"
        @click="selectLanguage(lang.code)"
      >
        {{ lang.name }}
      </button>
            </div>
          </div>
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
  border: 1px solid;
  border-radius: 3rem;
  padding: 0.8rem;
}

.logo {
  font-size: var(--font-size-lg);
  font-weight: 700;
  display: flex;
  align-items: center;
}

.logo img {
  width: 40px;
  height: 40px;
  margin-right: var(--spacing-sm);
}

.logo-text {
  background: linear-gradient(90deg, #000 0%, #666 100%);
  -webkit-background-clip: text;
  background-clip: text;
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

.logout-link {
  color: var(--secondary-color);
}

.logout-link:hover::after {
  background-color: var(--secondary-color);
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

.language-selector {
  position: relative;
}

.language-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: 1px solid var(--gray);
  border-radius: var(--border-radius-md);
  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.3s ease;
}

.language-btn:hover {
  background-color: var(--light-gray);
}

.current-language {
  font-weight: 500;
}

.language-icon {
  color: var(--primary-color);
}

.arrow-icon {
  transition: transform 0.3s ease;
}

.language-selector.active .arrow-icon {
  transform: rotate(180deg);
}

.language-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background-color: white;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: 0.5rem;
  min-width: 150px;
  display: none;
  flex-direction: column;
  z-index: 10;
}

.language-selector.active .language-dropdown {
  display: flex;
}

.language-option {
  text-align: left;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.language-option:hover {
  background-color: var(--light-gray);
}

.language-option.selected {
  font-weight: 600;
  color: var(--primary-color);
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
    position: fixed;
    bottom: 20px;
    right: 20px;
    flex-direction: column;
    gap: 10px;
  }

  .language-dropdown {
    bottom: calc(100% + 0.5rem);
    top: auto;
  }
}
</style>
