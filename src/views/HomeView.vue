<script setup>
import { useStoryStore } from '../stores/storyStore'
import StoryCard from '../components/StoryCard.vue'
import FaqItem from '../components/FaqItem.vue' // Assuming this component is used
import StoryModal from '../components/StoryModal.vue'
import { ref, onMounted, computed, watch } from 'vue' 
import { useLanguageStore } from '@/stores/languageStore'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const languageStore = useLanguageStore()
const storyStore = useStoryStore()

// latestStories getter in store should return a slice of storyStore.stories
const latestStories = computed(() => storyStore.getLatestStories) 
const isLoading = computed(() => storyStore.isLoading)
const error = computed(() => storyStore.error)

const selectedStory = ref(null)
const showModal = ref(false)

const openStoryModal = (story) => {
  console.log("HomeView: Opening modal for story:", JSON.parse(JSON.stringify(story)));
  selectedStory.value = story
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedStory.value = null
}

// Load stories when the component is mounted if they aren't already loaded
// This ensures latestStories has data.
onMounted(async () => {
  console.log("HomeView.vue onMounted: Checking if stories need to be fetched...");
  // Check isLoading to avoid multiple fetches if already in progress
  if (storyStore.stories.length === 0 && !isLoading.value) { 
    console.log("HomeView: No stories in store, fetching...");
    // Fetch first page, default 10 items, in current language
    // Pass a smaller number for per_page if you only want 3 latest stories from API
    await storyStore.fetchStories(languageStore.currentLanguage, 1, 3); // Fetch 3 for "latest"
  }
})

// Initialize language settings - this onMounted hook is fine.
onMounted(() => {
  languageStore.init() 
  locale.value = languageStore.currentLanguage 
})

// Watch for language changes to update content
watch(() => languageStore.currentLanguage, (newLang) => {
  locale.value = newLang;
  // Re-fetch stories for the new language if needed for latestStories
  console.log("HomeView: Language changed, re-fetching stories for latest stories section.");
  storyStore.fetchStories(newLang, 1, 3); // Fetch 3 for "latest"
});


function retryFetchStories() {
  // Fetch the first page for latest stories, in the current language
  storyStore.fetchStories(languageStore.currentLanguage, 1, 3); 
}

// --- Logic for Dynamic Card Colors (Frontend Only) ---
const availableCardUiColors = ['pink', 'yellow', 'blue', 'mint', 'orange'];

function getStoryCardColorName(story) {
  if (story && story.id_historias !== undefined) { // Check id_historias specifically
    const colorIndex = story.id_historias % availableCardUiColors.length;
    return availableCardUiColors[colorIndex];
  }
  return 'pink'; // Default color
}
// --- END Logic for Dynamic Card Colors ---

// Example FAQ data (ensure this is how you want to manage FAQs)
const faqs = ref([ 
  { id: 1, questionKey: 'faq.q1', answerKey: 'faq.a1' },
  { id: 2, questionKey: 'faq.q2', answerKey: 'faq.a2' },
  { id: 3, questionKey: 'faq.q3', answerKey: 'faq.a3' },
  { id: 4, questionKey: 'faq.q4', answerKey: 'faq.a4' }
]);
</script>

<template>
  <div class="home">
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <p class="intro-text">{{ t('views.home.project') }}</p>
            <h1>{{ t('views.home.headline') }}</h1>
            <p class="hero-description">
              {{ t('views.home.description') }}
            </p>
            <div class="hero-buttons">
              <button class="btn btn-primary" @click="$router.push('/historias')">{{ t('views.home.viewstories') }}</button>
              <button class="btn btn-secondary">{{ t('views.home.contact') }}</button>
            </div>
          </div>
          <div class="hero-image">
            <img src="@/assets/images/Portada.png" alt="Organización Mujeres Trabajadoras" />
          </div>
        </div>
      </div>
    </section>

    <section class="section organization-section">
      <div class="container">
        <h2 class="section-title">{{ t('views.home.organization')}}</h2>
        <div class="organization-content">
          <div class="organization-text">
            <p>{{ t('views.home.organizationtext_p1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed vulputate felis. Ut amet tempus dui. Maurya et velit posuere erat, at aliquet sapien. Praesent varius torttitor commodo. Praesent eget elit in ipsum suscipit fermentum. Ut amet tempus dui. Maurya et velit posuere erat, at aliquet sapien. Praesent varius torttitor commodo. Praesent eget elit in ipsum suscipit fermentum.') }}</p>
            <p>{{ t('views.home.organizationtext_p2', 'Aenean hendrerit dolor vitae. Fusce a tempor erat. Vivamus pulvinar vel. Fusce porttitor libero vel lorem rhoncus, at tempor diam rhoncus. Etiam et pharetra enim. Proin porttitor nulla nec eros. Vivamus pulvinar vel. Fusce porttitor libero vel lorem rhoncus, at tempor diam rhoncus. Etiam et pharetra enim. Proin porttitor nulla nec eros.') }}</p>
            <button class="btn btn-primary" @click="$router.push('/organizacion')">{{ t('views.home.knowmore') }}</button>
          </div>
          <div class="organization-image">
            <img src="@/assets/images/Organizacion.png" alt="Organización Mujeres Trabajadoras" />
          </div>
        </div>
      </div>
    </section>

    <section class="section latest-stories-section">
      <div class="container">
        <h2 class="section-title">{{ t('views.home.latestStories') }}</h2>

        <div v-if="isLoading && latestStories.length === 0" class="loading-container">
          <div class="loader"></div>
          <p class="loading-text">Cargando historias...</p>
        </div>
        <div v-else-if="error && latestStories.length === 0" class="error-container">
          <p class="error-message">{{ error }}</p>
          <button @click="retryFetchStories" class="retry-btn">
            Intentar de nuevo
          </button>
        </div>
        <div v-else class="stories-grid">
          <StoryCard
            v-for="story in latestStories"
            :key="story.id_historias" :title="story.nombre_persona || 'Sin Título'"
            :color="getStoryCardColorName(story)" :icon="'sun'" :buttonText="t('Leer historia') || 'Leer historia'"
            :origin="story.persona_procedencia || ''"
            :age="story.persona_anio_nacimiento || null" :profession="story.persona_profesion || ''"
            :description="story.contenido || 'Contenido no disponible.'"
            :profileImage="story.persona_profile_image_url || null" @readStory="openStoryModal(story)"
          />
          <div v-if="!isLoading && latestStories.length === 0" class="no-stories-message">
            <p>No hay historias disponibles en este momento.</p>
          </div>
        </div>
        
        <StoryModal
          v-if="selectedStory"
          :show="showModal"
          :story="selectedStory"
          @close="closeModal"
        />

        <div class="section-footer">
          <button class="btn btn-secondary" @click="$router.push('/historias')">{{ t('views.home.morestories') }}</button>
        </div>
      </div>
    </section>

    <section class="section our-story-section">
      <div class="container">
        <h2 class="section-title"> {{ t('views.home.our_story') }}</h2>
        <div class="our-story-content">
          <p>{{ t('views.home.our_story_text_p1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed vulputate felis. Ut amet tempus dui. Maurya et velit posuere erat, at aliquet sapien. Praesent varius torttitor commodo. Praesent eget elit in ipsum suscipit fermentum. Ut amet tempus dui. Maurya et velit posuere erat, at aliquet sapien. Praesent varius torttitor commodo. Praesent eget elit in ipsum suscipit fermentum.') }}</p>
          <p>{{ t('views.home.our_story_text_p2', 'Aenean hendrerit dolor vitae. Fusce a tempor erat. Vivamus pulvinar vel. Fusce porttitor libero vel lorem rhoncus, at tempor diam rhoncus. Etiam et pharetra enim. Proin porttitor nulla nec eros. Vivamus pulvinar vel. Fusce porttitor libero vel lorem rhoncus, at tempor diam rhoncus. Etiam et pharetra enim. Proin porttitor nulla nec eros.') }}</p>
        </div>
      </div>
    </section>

    <section class="section faq-section">
      <div class="container">
        <h2 class="section-title">{{ t('views.home.faq') }}</h2>
        <div class="faq-container">
          <FaqItem
            v-for="faq in faqs"
            :key="faq.id"
            :question="t(faq.questionKey)" 
            :answer="t(faq.answerKey)"
          />
        </div>
      </div>
    </section>
  </div>
</template>



<style scoped>
.home {
  width: 100%;
}

/* Hero Section */
.hero-section {
  padding: var(--spacing-xl) 0;
  margin-top: var(--spacing-xxl);
  margin-bottom: var(--spacing-xxxl);
}

.hero-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
}

.hero-text {
  flex: 1;
  color: var(--text-color);
}

.intro-text {
  font-size: var(--font-size-lg);
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
  color: var(--text-color);
}

.hero-text h1 {
  font-size: var(--font-size-xxxl);
  line-height: 1.2;
  margin-bottom: var(--spacing-lg);
}

.hero-description {
  font-size: var(--font-size-lg);
  color: var(--text-color);
  margin-bottom: var(--spacing-lg);
  max-width: 600px;
}

.hero-buttons {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.social-links {
  display: flex;
  gap: var(--spacing-md);
}

.social-link {
  color: var(--secondary-color);
  transition: color 0.3s ease;
}

.social-link:hover {
  color: var(--primary-color);
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
   border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  background-color: #5db898;
  rotate: 5deg;
}

.hero-image img {
  max-height: 500px;

}

/* Organization Section */
.organization-section {
  background-color: var(--light-gray);
  padding: var(--spacing-xl) 0;
  margin-bottom: var(--spacing-xxxl); 
}
.organization-section h2 {
  margin-bottom: 3px;
}

.organization-content {
  display: flex;
  gap: var(--spacing-xl);
  align-items: center;
}

.organization-text {
  flex: 1;
}

.organization-text p {
  margin-bottom: var(--spacing-md);
}

.organization-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.organization-image img {
  max-width: 100%;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}

/* Latest Stories Section */
.latest-stories-section {
  padding: var(--spacing-xl) 0;
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  justify-items: center;
}

/* Estilos para el estado de carga */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  width: 100%;
}

.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid var(--primary-color);
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1rem;
  color: var(--text-color);
}

/* Estilos para el estado de error */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 100%;
  text-align: center;
}

.error-message {
  color: #e53935;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.retry-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.retry-btn:hover {
  background-color: #000;
  transform: translateY(-2px);
}

/* Mensaje cuando no hay historias */
.no-stories-message {
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  color: var(--text-color);
}

/* Our Story Section */
.our-story-section {
  background-color: var(--light-gray);
  padding: var(--spacing-xl) 0;
}

.our-story-content {
  background-color: white;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
}

.our-story-content p {
  margin-bottom: var(--spacing-md);
}

/* FAQ Section */
.faq-section {
  padding: var(--spacing-xl) 0;
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

/* Section Footer */
.section-footer {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-lg);
}

/* Responsive */
@media (max-width: 992px) {
  .stories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-content {
    flex-direction: column-reverse;
  }

  .hero-text h1 {
    font-size: var(--font-size-xxl);
  }

  .organization-content {
    flex-direction: column;
  }

  .stories-grid {
    grid-template-columns: 1fr;
  }
}
</style>
