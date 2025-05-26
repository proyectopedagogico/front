<script setup>
import { useStoryStore } from '../stores/storyStore'
import StoryCard from '../components/StoryCard.vue'
import FaqItem from '../components/FaqItem.vue'
import { computed, onMounted } from 'vue'
import { useLanguageStore } from '@/stores/languageStore'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const languageStore = useLanguageStore()
const storyStore = useStoryStore()
const latestStories = computed(() => storyStore.getLatestStories)
const isLoading = computed(() => storyStore.isLoading)
const error = computed(() => storyStore.error)

// Cargar historias al montar el componente si no están ya cargadas
onMounted(async () => {
  if (storyStore.stories.length === 0) {
    await storyStore.fetchStories()
  }
})

onMounted(() => {
  languageStore.init()
  locale.value = languageStore.currentLanguage
})

// Función para reintentar la carga si hay error
function retryFetchStories() {
  storyStore.fetchStories()
}

// Datos de ejemplo para las secciones
const faqs = [
  {
    id: 1,
    question: '¿Qué es el proyecto "Mujeres Trabajadoras"?',
    answer: 'Es una iniciativa que busca visibilizar las historias y experiencias de mujeres trabajadoras de diferentes orígenes, edades y profesiones, destacando sus contribuciones a la sociedad y los desafíos que enfrentan.'
  },
  {
    id: 2,
    question: '¿Cómo puedo compartir mi historia?',
    answer: 'Puedes contactarnos a través del formulario en nuestra web o enviarnos un correo electrónico. Realizaremos una entrevista y trabajaremos contigo para dar forma a tu historia.'
  },
  {
    id: 3,
    question: '¿Quiénes pueden participar?',
    answer: 'Todas las mujeres trabajadoras, independientemente de su profesión, edad u origen, pueden compartir sus experiencias. Buscamos representar la diversidad del mundo laboral femenino.'
  },
  {
    id: 4,
    question: '¿Cómo puedo apoyar este proyecto?',
    answer: 'Puedes difundir las historias en redes sociales, participar en nuestros eventos o colaborar como voluntaria en la recopilación y edición de historias.'
  }
]
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <p class="intro-text">Proyecto</p>
            <h1>{{ t('views.home.headline')}}</h1>
            <p class="hero-description">
              Descubre las experiencias, desafíos y logros de mujeres trabajadoras de diferentes orígenes, edades y profesiones. Un espacio para visibilizar y celebrar sus contribuciones a la sociedad.
            </p>
            <div class="hero-buttons">
              <button class="btn btn-primary" @click="$router.push('/historias')">Ver Historias</button>
              <button class="btn btn-secondary">Contacto</button>
            </div>

          </div>
          <div class="hero-image">
            <img src="@/assets/images/Portada.png" alt="Organización Mujeres Trabajadoras" />
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Organización -->
    <section class="section organization-section">
      <div class="container">
        <h2 class="section-title">Organización</h2>

        <div class="organization-content">
          <div class="organization-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed vulputate
              felis. Ut amet tempus dui. Maurya et velit posuere erat, at aliquet sapien.
              Praesent varius torttitor commodo. Praesent eget elit in ipsum suscipit
              fermentum. Ut amet tempus dui. Maurya et velit posuere erat, at aliquet sapien.
              Praesent varius torttitor commodo. Praesent eget elit in ipsum suscipit
              fermentum.
            </p>
            <p>
              Aenean hendrerit dolor vitae. Fusce a tempor erat. Vivamus pulvinar vel. Fusce
              porttitor libero vel lorem rhoncus, at tempor diam rhoncus. Etiam et pharetra
              enim. Proin porttitor nulla nec eros. Vivamus pulvinar vel. Fusce porttitor
              libero vel lorem rhoncus, at tempor diam rhoncus. Etiam et pharetra enim. Proin
              porttitor nulla nec eros.
            </p>
            <button class="btn btn-primary" @click="$router.push('/organizacion')">Conocer más</button>
          </div>
          <div class="organization-image">
            <img src="@/assets/images/Organizacion.png" alt="Organización Mujeres Trabajadoras" />
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Últimas Historias -->
    <section class="section latest-stories-section">
      <div class="container">
        <h2 class="section-title">Últimas Historias</h2>

        <!-- Estado de carga -->
        <div v-if="isLoading" class="loading-container">
          <div class="loader"></div>
          <p class="loading-text">Cargando historias...</p>
        </div>

        <!-- Estado de error -->
        <div v-else-if="error" class="error-container">
          <p class="error-message">{{ error }}</p>
          <button @click="retryFetchStories" class="retry-btn">
            Intentar de nuevo
          </button>
        </div>

        <!-- Historias (cuando no hay error ni está cargando) -->
        <div v-else class="stories-grid">
          <StoryCard
            v-for="story in latestStories"
            :key="story.id"
            :title="story.name"
            :color="story.color"
            :icon="story.color === 'orange' ? 'sun' : story.color === 'black' ? 'bolt' : 'wave'"
            :buttonText="story.buttonText"
            :origin="story.origin"
            :age="story.age"
            :profession="story.profession"
            :description="story.description"
          />

          <!-- Mensaje cuando no hay historias -->
          <div v-if="latestStories.length === 0" class="no-stories-message">
            <p>No hay historias disponibles en este momento.</p>
          </div>
        </div>

        <div class="section-footer">
          <button class="btn btn-secondary" @click="$router.push('/historias')">Ver más historias</button>
        </div>
      </div>
    </section>

    <!-- Sección de Nuestra Historia -->
    <section class="section our-story-section">
      <div class="container">
        <h2 class="section-title">Nuestra Historia</h2>

        <div class="our-story-content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed vulputate
            felis. Ut amet tempus dui. Maurya et velit posuere erat, at aliquet sapien.
            Praesent varius torttitor commodo. Praesent eget elit in ipsum suscipit
            fermentum. Ut amet tempus dui. Maurya et velit posuere erat, at aliquet sapien.
            Praesent varius torttitor commodo. Praesent eget elit in ipsum suscipit
            fermentum.
          </p>
          <p>
            Aenean hendrerit dolor vitae. Fusce a tempor erat. Vivamus pulvinar vel. Fusce
            porttitor libero vel lorem rhoncus, at tempor diam rhoncus. Etiam et pharetra
            enim. Proin porttitor nulla nec eros. Vivamus pulvinar vel. Fusce porttitor
            libero vel lorem rhoncus, at tempor diam rhoncus. Etiam et pharetra enim. Proin
            porttitor nulla nec eros.
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section faq-section">
      <div class="container">
        <h2 class="section-title">Preguntas Frecuentes</h2>

        <div class="faq-container">
          <FaqItem
            v-for="faq in faqs"
            :key="faq.id"
            :question="faq.question"
            :answer="faq.answer"
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
}

.hero-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
}

.hero-text {
  flex: 1;
}

.intro-text {
  font-size: var(--font-size-lg);
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
  color: var(--secondary-color);
}

.hero-text h1 {
  font-size: var(--font-size-xxxl);
  line-height: 1.2;
  margin-bottom: var(--spacing-lg);
}

.hero-description {
  font-size: var(--font-size-lg);
  color: var(--secondary-color);
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
