<script setup>
import { useStoryStore } from '../stores/storyStore'
import StoryCard from '../components/StoryCard.vue'
import { ref, onMounted, computed, watch } from 'vue' // Importa watch
import StoryModal from '../components/StoryModal.vue'

const storyStore = useStoryStore()
const stories = computed(() => storyStore.stories)
const isLoading = computed(() => storyStore.isLoading)
const error = computed(() => storyStore.error)
const paginationInfo = computed(() => storyStore.paginationInfo) // Para la paginación

const selectedStory = ref(null)
const showModal = ref(false)

// ... (openStoryModal, closeModal) ...

const activeFilters = ref({
  origin: '',
  profession: '',
  tags: '' // Asegúrate que el backend espera 'tags' y no 'tag' si es un string
})

// Cargar historias filtradas (esta computed property es para la visualización)
const filteredStories = computed(() => {
  // Esta lógica de filtro se aplica DESPUÉS de que la API devuelve los datos.
  // Si quieres que la API haga el filtrado, debes pasar activeFilters a fetchStories.
  // Por ahora, esta computed property podría no ser necesaria si la API ya filtra.
  // O podría usarse para un filtrado adicional en el cliente.
  // Simplemente devolvemos las historias del store por ahora, asumiendo que la API las filtró.
  return stories.value; 
});

async function loadData() {
  try {
    // Pasa los filtros activos a fetchStories
    // También pasa la página actual (o 1 si es una nueva búsqueda de filtro)
    // y los ítems por página.
    await storyStore.fetchStories(
      'es', // O el idioma activo
      1,    // Al aplicar un nuevo filtro, usualmente vuelves a la página 1
      paginationInfo.value.per_page || 10, // Mantén el per_page o usa un default
      activeFilters.value // <--- PASA LOS FILTROS ACTIVOS
    );
    // No necesitas llamar a fetchFilterOptions cada vez que aplicas un filtro,
    // solo una vez al montar el componente, a menos que las opciones de filtro cambien.
  } catch (err) {
    // El error ya debería estar manejado en el store
    console.error("Error en loadData:", err);
  }
}

// Observa cambios en activeFilters para volver a cargar las historias
watch(activeFilters, () => {
  loadData();
}, { deep: true }); // 'deep: true' para observar cambios dentro del objeto activeFilters

// Cargar datos iniciales al montar el componente
onMounted(async () => {
  await storyStore.fetchFilterOptions(); // Carga las opciones de filtro una vez
  await loadData(); // Carga las historias (inicialmente sin filtros o con filtros por defecto)
});

// Función para reintentar la carga (podría ser la misma que loadData)
const retryFetchStories = () => {
  loadData();
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
        <div class="filter-group">
          <label for="origin">Procedencia</label>
          <select
            id="origin"
            v-model="activeFilters.origin"
            class="filter-select"
          >
            <option value="">Todas</option>
            <option
              v-for="origin in storyStore.filterOptions.origins"
              :key="origin"
              :value="origin"
            >
              {{ origin }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label for="profession">Profesión</label>
          <select
            id="profession"
            v-model="activeFilters.profession"
            class="filter-select"
          >
            <option value="">Todas</option>
            <option
              v-for="profession in storyStore.filterOptions.professions"
              :key="profession"
              :value="profession"
            >
              {{ profession }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label for="tags">Etiquetas</label>
          <select
            id="tags"
            v-model="activeFilters.tags"
            class="filter-select"
          >
            <option value="">Todas</option>
            <option
              v-for="tag in storyStore.filterOptions.tags"
              :key="tag"
              :value="tag"
            >
              {{ tag }}
            </option>
          </select>
        </div>
      </div>
    </section>

    <!-- Cuadrícula de Historias -->
    <section class="stories-grid-section">
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
          v-for="story in filteredStories"
          :key="story.id"
          :title="story.nombre_persona"
          :color="story.color"
          :buttonText="story.buttonText"
          :icon="story.color === 'pink' ? 'sun' : story.color === 'yellow' ? 'bolt' : story.color === 'blue' ? 'wave' : 'sun'"
          :origin="story.persona_procedencia"
          :profession="story.persona_profesion"
          :age="story.persona_anio_nacimiento"
          :description="story.contenido"
          :profileImage="story.profileImage"
          class="show-details"
          @readStory="openStoryModal(story)"
        />

        <!-- Mensaje cuando no hay historias -->
        <div v-if="stories.length === 0" class="no-stories-message">
          <p>No se encontraron historias que coincidan con los filtros seleccionados.</p>
        </div>
      </div>
    </section>

    <!-- Modal de Historia -->
    <StoryModal
      v-if="selectedStory"
      :show="showModal"
      :story="selectedStory"
      @close="closeModal"
    />
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

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
}

.filter-group label {
  font-size: var(--font-size-sm);
  color: var(--text-color);
  font-weight: 500;
}

.filter-select {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  font-size: var(--font-size-sm);
}

.filter-select:hover,
.filter-select:focus {
  border-color: var(--primary-color);
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
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

/* Mensaje cuando no hay resultados */
.stories-grid:empty + .no-stories-message {
  display: block;
  padding: 2rem;
  text-align: center;
  color: var(--text-color);
  font-size: var(--font-size-md);
  background-color: var(--light-gray);
  border-radius: var(--border-radius-md);
  margin: 2rem 0;
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
