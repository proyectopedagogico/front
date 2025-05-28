<script setup>
import { useStoryStore } from '../stores/storyStore'
import StoryCard from '../components/StoryCard.vue'
import { ref, onMounted, computed } from 'vue'
import StoryModal from '../components/StoryModal.vue'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/stores/languageStore'

const storyStore = useStoryStore()
const stories = computed(() => storyStore.stories)
const isLoading = computed(() => storyStore.isLoading)
const error = computed(() => storyStore.error)

const selectedStory = ref(null)
const showModal = ref(false)

const openStoryModal = (story) => {
  selectedStory.value = story
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedStory.value = null
}

const { t, locale } = useI18n()
const languageStore = useLanguageStore()

onMounted(() => {
  languageStore.init()
  locale.value = languageStore.currentLanguage
})



// Filtros
const activeFilters = ref({
  origin: '',
  profession: '',
  tags: ''
})

// Cargar historias filtradas
const filteredStories = computed(() => {
  return stories.value.filter(story => {
    const matchOrigin = !activeFilters.value.origin || story.origin === activeFilters.value.origin;
    const matchProfession = !activeFilters.value.profession || story.profession === activeFilters.value.profession;
    const matchTags = !activeFilters.value.tags || (story.tags && story.tags.includes(activeFilters.value.tags));

    return matchOrigin && matchProfession && matchTags;
  });
});

// Función para reintentar la carga
const retryLoad = async () => {
  try {
    await Promise.all([
      storyStore.fetchStories(),
      storyStore.fetchFilterOptions()
    ])
  } catch (err) {
    error.value = 'Error al cargar los datos'
  }
}

// Cargar datos al montar el componente
onMounted(async () => {
  await retryLoad()
})
</script>

<template>
  <div class="stories-view">
    <!-- Mapa Mundial -->
    <section class="world-map-section">
      <h2 class="section-title">MAPA MUNDI</h2>
      <div class="map-container">
      <img src="../assets/images/Mapamundi.png" usemap="#image-map">

      <map name="image-map">
    <area target="" alt="colombia" title="colombia" href="" coords="564,869,593,891,596,910,586,931,547,912,550,887" shape="poly">
    <area target="" alt="bolivia" title="bolivia" href="" coords="610,974,648,1021,600,1041,587,1013,589,981" shape="poly">
    <area target="" alt="nicaragua" title="nicaragua" href="" coords="517,866,511,845,499,855,504,868" shape="poly">
    <area target="" alt="honduras" title="honduras" href="" coords="511,839,499,848,487,846,492,834" shape="poly">
    <area target="" alt="espana" title="espana" href="" coords="902,672,962,682,937,714,921,719,909,714" shape="poly">
    <area target="" alt="marruecos" title="marruecos" href="" coords="916,725,937,728,937,747,900,770,887,741" shape="poly">
    <area target="" alt="argelia" title="argelia" href="" coords="943,728,941,747,902,772,967,825,1004,795,987,719" shape="poly">
    <area target="" alt="senegal" title="senegal" href="" coords="867,834,886,854,867,857,875,845,858,839,837,1000" shape="poly">
    <area target="" alt="polonia" title="polonia" href="" coords="1022,590,1066,587,1066,613,1056,622,1026,613" shape="poly">
    <area target="" alt="ucrania" title="ucrania" href="" coords="1072,606,1068,631,1091,634,1100,647,1119,652,1144,641,1148,627,1123,613,1109,604,1100,613" shape="poly">
    <area target="" alt="rumania" title="rumania" href="" coords="1063,636,1086,640,1100,657,1089,672,1073,677,1050,657,1054,647" shape="poly">
    <area target="" alt="siria" title="siria" href="" coords="1135,719,1156,714,1155,730,1133,740" shape="poly">
    <area target="" alt="pakistan" title="pakistan" href="" coords="1314,725,1301,747,1280,765,1262,758,1266,781,1303,792,1314,770,1333,747,1307,735" shape="poly">
    <area target="" alt="gambia" title="gambia" href="" coords="860,848,872,848" shape="poly">
</map>
      </div>
</section>

    <!-- Sección de Filtros -->
    <section class="filter-section">
      <h2 class="section-title">{{ t('views.stories.filter_title') }}</h2>
      <div class="filters">
        <div class="filter-group">
          <label for="origin">{{ t('views.stories.origin') }}</label>
          <select
            id="origin"
            v-model="activeFilters.origin"
            class="filter-select"
          >
            <option value="">{{ t('views.stories.filter_value') }}</option>
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
          <label for="profession">{{ t('views.stories.profession') }}</label>
          <select
            id="profession"
            v-model="activeFilters.profession"
            class="filter-select"
          >
            <option value="">{{ t('views.stories.filter_value') }}</option>
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
          <label for="tags">{{ t('views.stories.tags') }}</label>
          <select
            id="tags"
            v-model="activeFilters.tags"
            class="filter-select"
          >
            <option value="">{{ t('views.stories.filter_value') }}</option>
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
          :title="story.name"
          :color="story.color"
          :buttonText="story.buttonText"
          :icon="story.color === 'pink' ? 'sun' : story.color === 'yellow' ? 'bolt' : story.color === 'blue' ? 'wave' : 'sun'"
          :origin="story.origin"
          :age="story.birthYear"
          :profession="story.profession"
          :description="story.description"
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

.map-container img {
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
