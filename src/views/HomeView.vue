<script setup>
import { useStoryStore } from '../stores/storyStore'
import StoryCard from '../components/StoryCard.vue'
import { computed } from 'vue'

const storyStore = useStoryStore()
const latestStories = computed(() => storyStore.getLatestStories)
</script>

<template>
  <div class="home">
    <!-- Sección de Organización -->
    <section class="organization-section">
      <h2 class="section-title">ORGANIZACIÓN</h2>
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
        </div>
        <div class="featured-image">
          <img src="@/assets/placeholder-image.svg" alt="Mujeres trabajadoras de nuestras vidas" />
        </div>
      </div>
    </section>

    <!-- Sección de Últimas Historias -->
    <section class="latest-stories-section">
      <h2 class="section-title">Últimas Historias</h2>
      <div class="stories-grid">
        <StoryCard
          v-for="story in latestStories"
          :key="story.id"
          :name="story.name"
          :color="story.color"
          :buttonText="story.buttonText"
          :buttonColor="story.buttonColor"
        />
      </div>
      <div class="see-more-container">
        <button class="see-more-btn" @click="$router.push('/historias')">VER MÁS HISTORIAS</button>
      </div>
    </section>

    <!-- Sección de Nuestra Historia -->
    <section class="our-story-section">
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
    </section>
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.organization-section,
.latest-stories-section,
.our-story-section {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.organization-content {
  display: flex;
  gap: 2rem;
}

.organization-text {
  flex: 1;
}

.organization-text p {
  margin-bottom: 1rem;
}

.featured-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.featured-image img {
  max-width: 100%;
  border-radius: 10px;
  border: 3px solid var(--primary-color);
}

.stories-grid {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.see-more-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.see-more-btn {
  background-color: white;
  border: 1px solid var(--text-color);
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  font-weight: bold;
}

.our-story-content {
  background-color: #e6f7ff;
  padding: 1rem;
  border-radius: 10px;
}

.our-story-content p {
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .organization-content {
    flex-direction: column;
  }
}
</style>
