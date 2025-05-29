<script setup>
import { useStoryStore } from '../stores/storyStore'
import { ref, computed, onMounted } from 'vue'
import countriesData from '../assets/countries.json'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/stores/languageStore'

const storyStore = useStoryStore()
const stories = computed(() => storyStore.stories)
const isLoading = computed(() => storyStore.isLoading)
const error = computed(() => storyStore.error)
const countries = computed(() => countriesData)
const { t, locale } = useI18n()
const languageStore = useLanguageStore()

onMounted(() => {
  languageStore.init()
  locale.value = languageStore.currentLanguage
})

// Cargar historias al montar el componente
onMounted(async () => {
  if (stories.value.length === 0) {
    await storyStore.fetchStories()
  }
})

// Estado para el formulario
const formMode = ref('create') // 'create' o 'edit'
const currentStoryId = ref(null)
const formData = ref({
  name: '',
  color: 'pink', // Color pastel por defecto
  buttonText: 'Leer',
  buttonColor: 'white',
  birthYear: '',
  origin: '',
  profession: '',
  story: ''
})

// Mostrar/ocultar formulario
const showForm = ref(false)

// Referencia al formulario para desplazamiento
const formSection = ref(null)

// Función para desplazarse suavemente al formulario
function scrollToForm() {
  // Esperar a que el formulario esté visible en el DOM
  setTimeout(() => {
    if (formSection.value) {
      // Desplazarse al formulario con un offset
      const yOffset = -80; // Ajusta este valor para controlar cuánto espacio dejar arriba
      const y = formSection.value.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }, 100) // Pequeño retraso para asegurar que el formulario esté renderizado
}

// Funciones
function createNewStory() {
  formMode.value = 'create'
  resetForm()
  showForm.value = true
  // Desplazarse al formulario después de hacerlo visible
  scrollToForm()
}

function editStory(story) {
  formMode.value = 'edit'
  currentStoryId.value = story.id
  formData.value = { ...story }
  showForm.value = true
  // Desplazarse al formulario después de hacerlo visible
  scrollToForm()
}

async function deleteStory(id) {
  if (confirm('¿Estás seguro de que quieres eliminar esta historia?')) {
    try {
      await storyStore.deleteStory(id)
    } catch (err) {
      alert(`Error al eliminar la historia: ${err}`)
    }
  }
}

async function submitForm() {
  try {
    if (formMode.value === 'create') {
      await storyStore.addStory({ ...formData.value })
    } else {
      await storyStore.updateStory(currentStoryId.value, { ...formData.value })
    }
    showForm.value = false
    resetForm()
  } catch (err) {
    alert(`Error al guardar la historia: ${err}`)
  }
}

// Función para reintentar la carga si hay error
function retryFetchStories() {
  storyStore.fetchStories()
}

function resetForm() {
  formData.value = {
    name: '',
    color: 'orange',
    buttonText: 'Leer',
    buttonColor: 'white',
    birthYear: '',
    origin: '',
    profession: '',
    story: ''
  }
  currentStoryId.value = null
}

// Función para obtener la clase de color de la tarjeta
function getCardClass(color) {
  switch (color) {
    case 'pink':
      return 'card-pink'
    case 'yellow':
      return 'card-yellow'
    case 'blue':
      return 'card-blue'
    case 'mint':
      return 'card-mint'
    default:
      return 'card-pink'
  }
}
</script>

<template>
  <div class="admin-view">
    <h1 class="dashboard-title">DASHBOARD</h1>

    <div class="create-story-container">
      <button class="create-story-btn" @click="createNewStory">{{ t('views.admin.new') }}</button>
    </div>

    <!-- Componente 1: Lista de historias para editar/borrar -->
    <section class="story-list-section">
      <h2 class="component-title">{{ t('views.admin.story_list') }}</h2>

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

      <!-- Lista de historias -->
      <div v-else class="story-list">
        <!-- Mensaje cuando no hay historias -->
        <div v-if="stories.length === 0" class="no-stories-message">
          <p>No hay historias disponibles. Crea una nueva historia para comenzar.</p>
        </div>

        <div
          v-for="story in stories"
          :key="story.id"
          class="story-item"
          :class="getCardClass(story.color)"
        >
          <div class="story-info">
            <h3>{{ story.name }}</h3>
            <div class="story-details">
              <span v-if="story.origin"><strong>{{ t ('views.admin.origin') }}:</strong> {{ story.origin }}</span>
              <span v-if="story.birthYear"><strong>{{ t ('views.admin.birth') }}:</strong> {{ story.birthYear }}</span>
              <span v-if="story.profession"><strong>{{ t ('views.admin.profession') }}:</strong> {{ story.profession }}</span>
            </div>
            <div class="story-text">
              <p>{{ story.description }}</p>
            </div>
          </div>
          <div class="story-actions">
            <button class="action-btn edit-btn" @click="editStory(story)">{{ t ('views.admin.edit') }}:</button>
            <button class="action-btn delete-btn" @click="deleteStory(story.id)">{{ t ('views.admin.erase') }}:</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Componente 2: Formulario para crear/editar historias -->
    <section v-if="showForm" class="story-form-section" ref="formSection">
      <h2 class="component-title">
       Formulario para la {{ formMode === 'create' ? 'creación' : 'edición' }} de historias
      </h2>

      <form class="story-form" @submit.prevent="submitForm">
        <div class="form-group">
          <label for="nombre">{{ t ('views.admin.form.name') }}:</label>
          <input type="text" id="nombre" class="form-control" v-model="formData.name" required />
        </div>

        <div class="form-group">
          <label for="imagen">{{ t ('views.admin.form.image') }}:</label>
          <input type="text" id="imagen" class="form-control" placeholder="URL de la imagen" />
        </div>

        <div class="form-group">
          <label for="anioNacimiento">{{ t ('views.admin.form.birth') }}:</label>
          <input type="number" id="anioNacimiento" class="form-control" v-model="formData.birthYear" min="1950" :max="new Date().getFullYear()" />
        </div>

        <div class="form-group">
          <label for="procedencia">{{ t ('views.admin.form.country') }}:</label>
          <select id="procedencia" class="form-control" v-model="formData.origin">
            <option value="">{{ t ('views.admin.form.country_placeholder') }}</option>
            <option v-for="country in countries" :key="country.id" :value="country.name">
              {{ country.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="profesion">{{ t ('views.admin.form.profession') }}:</label>
          <input type="text" id="profesion" class="form-control" v-model="formData.profession" />
        </div>

        <div class="form-group">
          <label for="color">{{ t ('views.admin.form.color') }}:</label>
          <select id="color" class="form-control" v-model="formData.color">
            <option value="orange">{{ t ('views.admin.form.orange') }}</option>
            <option value="pink">{{ t ('views.admin.form.pink') }}</option>
            <option value="yellow">{{ t ('views.admin.form.yellow') }}</option>
            <option value="blue">{{ t ('views.admin.form.blue') }}</option>
            <option value="mint">{{ t ('views.admin.form.mint') }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="historia">{{ t ('views.admin.form.story') }}:</label>
          <textarea id="historia" class="form-control textarea" v-model="formData.story"></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="create-btn">
            {{ formMode === 'create' ? 'Crear' : 'Guardar cambios' }}
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<style scoped>
.admin-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.dashboard-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
}

.create-story-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.create-story-btn {
  background-color: white;
  border: 1px solid #333;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
}

.story-list-section,
.story-form-section {
  margin-bottom: 40px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.component-title {
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.story-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.story-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border-radius: 12px;
  position: relative;
  margin-bottom: 15px;
  min-height: 120px;
}

/* Clases para los colores de las tarjetas */
.card-orange {
  background-color: var(--card-orange);
}

.card-pink {
  background-color: var(--pastel-pink);
}

.card-yellow {
  background-color: var(--pastel-yellow);
}

.card-blue {
  background-color: var(--pastel-blue);
}

.card-mint {
  background-color: var(--pastel-mint);
}

.story-info {
  flex: 1;
}

.story-info h3 {
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: bold;
  position: relative;
  padding-bottom: 8px;
}

.story-info h3::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80%;
  height: 1px;
  background-color: #333;
}

.story-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
  line-height: 1.4;
  margin-top: 10px;
}

.story-details span {
  display: block;
}

.story-text {
  margin-top: 10px;
}

.story-text p {
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.story-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-left: 20px;
  margin-top: 10px;
}

.action-btn {
  background-color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-width: 100px;
  text-align: center;
}

.edit-btn {
  background-color: white;
}

.delete-btn {
  background-color: white;
}

/* Círculo de selección */
/* .story-item::before {
  content: "";
  position: absolute;
  top: 16.5px;
  right: 277px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #333;
  background-color: white;
} */

/* Estados de carga y error */
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
  text-align: center;
  padding: 2rem;
  color: var(--text-color);
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 15px;
}

/* Formulario */
.story-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-size: 14px;
  font-weight: bold;
}

.form-control {
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #f5f5f5;
}

.textarea {
  min-height: 150px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.create-btn {
  background-color: white;
  border: 1px solid #333;
  border-radius: 20px;
  padding: 8px 24px;
  cursor: pointer;
  font-size: 14px;
}

@media (max-width: 768px) {
  .story-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .story-actions {
    flex-direction: row;
    margin-top: 15px;
    width: 100%;
  }
}
</style>
