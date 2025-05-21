<script setup>
import { useStoryStore } from '../stores/storyStore'
import StoryCard from '../components/StoryCard.vue'
import { ref } from 'vue'

const storyStore = useStoryStore()
const stories = storyStore.stories

// Filtros
const activeFilters = ref({
  origin: null,
  age: null,
  profession: null,
  education: null
})

function applyFilter(type, value) {
  activeFilters.value[type] = activeFilters.value[type] === value ? null : value
}
</script>

<template>
  <div class="stories-view">
    <!-- Mapa Mundial -->
    <section class="world-map-section">
      <h2 class="section-title">MAPA MUNDI</h2>
      <div class="map-container">
        <img src="@/assets/images/Mapamundi.png" alt="Mapa mundial" class="world-map" />
      </div>
    </section>

    <!-- Sección de Filtros -->
    <section class="filter-section">
      <h2 class="section-title">FILTRO</h2>
      <div class="filters">
        <button
          class="filter-btn"
          :class="{ active: activeFilters.origin }"
          @click="applyFilter('origin', 'any')"
        >
          Procedencia
        </button>
        <button
          class="filter-btn"
          :class="{ active: activeFilters.age }"
          @click="applyFilter('age', 'any')"
        >
          Edad
        </button>
        <button
          class="filter-btn"
          :class="{ active: activeFilters.profession }"
          @click="applyFilter('profession', 'any')"
        >
          Oficio
        </button>
        <button
          class="filter-btn"
          :class="{ active: activeFilters.education }"
          @click="applyFilter('education', 'any')"
        >
          Formación
        </button>
      </div>
    </section>

    <!-- Cuadrícula de Historias -->
    <section class="stories-grid-section">
      <div class="stories-grid">
        <StoryCard
          v-for="story in stories"
          :key="story.id"
          :title="story.name"
          :color="story.color"
          :buttonText="story.buttonText"
          :icon="story.color === 'orange' ? 'sun' : story.color === 'black' ? 'bolt' : 'wave'"
          :origin="story.origin"
          :age="story.age"
          :profession="story.profession"
          :description="story.description"
          class="show-details"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.stories-view {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--text-color);
}

.world-map-section,
.filter-section,
.stories-grid-section {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.map-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
    max-height: 500px;
background-color: black;
}

.world-map {
  width: 100%;
  border-radius: 10px;
  object-fit: contain;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.filter-btn {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  justify-items: center;
}

@media (max-width: 768px) {
  .stories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stories-grid {
    grid-template-columns: 1fr;
  }
}
</style>
