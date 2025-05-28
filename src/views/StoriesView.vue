<script setup>
import { useStoryStore } from '../stores/storyStore'
import StoryCard from '../components/StoryCard.vue' 
import { ref, onMounted, computed, watch } from 'vue'
import StoryModal from '../components/StoryModal.vue' 
import { useLanguageStore } from '@/stores/languageStore'; 

const storyStore = useStoryStore()
const languageStore = useLanguageStore(); 

const stories = computed(() => storyStore.stories)
const isLoading = computed(() => storyStore.isLoading)
const error = computed(() => storyStore.error)
const paginationInfo = computed(() => storyStore.paginationInfo)

const selectedStory = ref(null)
const showModal = ref(false)

const openStoryModal = (story) => {
  console.log("Opening modal for story:", JSON.parse(JSON.stringify(story)));
  selectedStory.value = story
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedStory.value = null
}

const activeFilters = ref({
  origin: '',      // Corresponds to 'persona_procedencia' in story object
  profession: '',  // Corresponds to 'persona_profesion' in story object
  tags: ''         // Corresponds to tag names in story.tags array
})

const filteredStories = computed(() => {
  if (!stories.value || !Array.isArray(stories.value)) {
    return [];
  }
  
  const currentOriginFilter = activeFilters.value?.origin?.toLowerCase() || '';
  const currentProfessionFilter = activeFilters.value?.profession?.toLowerCase() || '';
  const currentTagFilter = activeFilters.value?.tags?.toLowerCase() || '';

  return stories.value.filter(story => {
    // Access person details directly from the story object as per your console.log
    const originMatch = !currentOriginFilter || 
                        (story.persona_procedencia && story.persona_procedencia.toLowerCase().includes(currentOriginFilter));
    
    const professionMatch = !currentProfessionFilter || 
                            (story.persona_profesion && story.persona_profesion.toLowerCase().includes(currentProfessionFilter));
    
    const tagMatch = !currentTagFilter || 
                     (story.tags && story.tags.some(tag => tag.name && tag.name.toLowerCase().includes(currentTagFilter)));

    return originMatch && professionMatch && tagMatch;
  });
});

async function loadData(page = 1, lang = languageStore.currentLanguage) { 
  try {
    console.log(`StoriesView: Loading data - Lang: ${lang}, Page: ${page}, Filters:`, JSON.parse(JSON.stringify(activeFilters.value)));
    // Pass filter keys that the backend expects: 'origin', 'profession', 'tags'
    // The values come from activeFilters.
    // If activeFilters uses 'origin', 'profession', 'tags', it's already correct.
    await storyStore.fetchStories(
      lang,
      page,    
      paginationInfo.value.per_page || 10, 
      { // Ensure keys match backend: origin, profession, tags
        origin: activeFilters.value.origin,
        profession: activeFilters.value.profession,
        tags: activeFilters.value.tags
      }
    );
  } catch (err) {
    console.error("Error in loadData (StoriesView):", err);
  }
}

watch(activeFilters, () => {
  loadData(1); 
}, { deep: true });

watch(() => languageStore.currentLanguage, (newLang) => {
  loadData(1, newLang); 
});

onMounted(async () => {
  console.log("StoriesView.vue onMounted: Fetching filter options and initial stories...");
  if (!storyStore.filterOptions || !storyStore.filterOptions.origins || storyStore.filterOptions.origins.length === 0) {
      await storyStore.fetchFilterOptions();
  }
  await loadData(); 
});

const retryFetchStories = () => {
  loadData(paginationInfo.value.page || 1); 
}
</script>

<template>
  <div class="stories-view">
    <section class="world-map-section">
      <h2 class="section-title">MAPA MUNDI</h2>
      <div class="map-container">
        <img src="@/assets/images/Mapamundi.png" alt="Mapa mundial" class="world-map" />
      </div>
    </section>

    <section class="filter-section">
      <h2 class="section-title">FILTRO</h2>
      <div class="filters">
        <div class="filter-group">
          <label for="origin-filter">Procedencia</label> <select id="origin-filter" v-model="activeFilters.origin" class="filter-select">
            <option value="">Todas</option>
            <option v-for="origin_option in storyStore.filterOptions.origins" :key="origin_option" :value="origin_option">
              {{ origin_option }}
            </option>
          </select>
        </div>
        <div class="filter-group">
          <label for="profession-filter">Profesión</label> <select id="profession-filter" v-model="activeFilters.profession" class="filter-select">
            <option value="">Todas</option>
            <option v-for="profession_option in storyStore.filterOptions.professions" :key="profession_option" :value="profession_option">
              {{ profession_option }}
            </option>
          </select>
        </div>
        <div class="filter-group">
          <label for="tags-filter">Etiquetas</label> <select id="tags-filter" v-model="activeFilters.tags" class="filter-select">
            <option value="">Todas</option>
            <option v-for="tag_name in storyStore.filterOptions.tags" :key="tag_name" :value="tag_name">
              {{ tag_name }}
            </option>
          </select>
        </div>
      </div>
    </section>

    <section class="stories-grid-section">
      <div v-if="isLoading" class="loading-container">
        <div class="loader"></div>
        <p class="loading-text">Cargando historias...</p>
      </div>
      <div v-else-if="error" class="error-container">
        <p class="error-message">{{ error }}</p>
        <button @click="retryFetchStories" class="retry-btn">Intentar de nuevo</button>
      </div>
      <div v-else class="stories-grid">
        <StoryCard
          v-for="story in filteredStories"
          :key="story.id_historias" 
          :title="story.nombre_persona || 'Sin Título'"
          :color="story.color_card || 'pink'" :buttonText="'Leer historia'" 
          :icon="story.icon_name || 'sun'" :origin="story.persona_procedencia || ''" :profession="story.persona_profesion || ''" :age="story.persona_anio_nacimiento || null" :description="story.contenido || 'Contenido no disponible.'"
          :profileImage="story.persona_profile_image_url || null" class="show-details"
          @readStory="openStoryModal(story)"
        />
        <div v-if="!isLoading && filteredStories.length === 0" class="no-stories-message">
          <p>No se encontraron historias que coincidan con los filtros seleccionados.</p>
        </div>
      </div>
      <div v-if="!isLoading && paginationInfo.total_pages && paginationInfo.total_pages > 1" class="pagination-controls">
        <button @click="loadData(paginationInfo.page - 1)" :disabled="!paginationInfo.prev_url">Anterior</button>
        <span>Página {{ paginationInfo.page }} de {{ paginationInfo.total_pages }}</span>
        <button @click="loadData(paginationInfo.page + 1)" :disabled="!paginationInfo.next_url">Siguiente</button>
      </div>
    </section>

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

.no-stories-message {
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  color: var(--text-color);
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
}
.pagination-controls button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;
}
.pagination-controls button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
