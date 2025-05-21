<script setup>
import { useStoryStore } from '../stores/storyStore'
import { ref, computed, onMounted } from 'vue'

const storyStore = useStoryStore()
const stories = computed(() => storyStore.stories)
const isLoading = computed(() => storyStore.isLoading)
const error = computed(() => storyStore.error)

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
  color: 'orange',
  buttonText: 'Leer',
  buttonColor: 'lightblue',
  age: '',
  origin: '',
  profession: '',
  story: ''
})

// Mostrar/ocultar formulario
const showForm = ref(false)

// Funciones
function createNewStory() {
  formMode.value = 'create'
  resetForm()
  showForm.value = true
}

function editStory(story) {
  formMode.value = 'edit'
  currentStoryId.value = story.id
  formData.value = { ...story }
  showForm.value = true
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
    buttonColor: 'lightblue',
    age: '',
    origin: '',
    profession: '',
    story: ''
  }
  currentStoryId.value = null
}

// Función para obtener la clase de color de la tarjeta
function getCardClass(color) {
  switch (color) {
    case 'orange':
      return 'card-blue'
    case 'black':
      return 'card-yellow'
    case 'blue':
      return 'card-pink'
    default:
      return 'card-blue'
  }
}
</script>

<template>
  <div class="admin-view">
    <h1 class="dashboard-title">DASHBOARD</h1>

    <div class="create-story-container">
      <button class="create-story-btn" @click="createNewStory">Crear nueva historia</button>
    </div>

    <!-- Componente 1: Lista de historias para editar/borrar -->
    <section class="story-list-section">
      <h2 class="component-title">Componente 1: todas las historias para editar o borrar</h2>

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
              <span v-if="story.origin"><strong>Origen:</strong> {{ story.origin }}</span>
              <span v-if="story.age"><strong>Edad:</strong> {{ story.age }} años</span>
              <span v-if="story.profession"><strong>Profesión:</strong> {{ story.profession }}</span>
            </div>
            <div class="story-text">
              <p>{{ story.description }}</p>
            </div>
          </div>
          <div class="story-actions">
            <button class="action-btn edit-btn" @click="editStory(story)">Editar</button>
            <button class="action-btn delete-btn" @click="deleteStory(story.id)">Borrar</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Componente 2: Formulario para crear/editar historias -->
    <section v-if="showForm" class="story-form-section">
      <h2 class="component-title">
        Componente 2: Formulario para la creación de nuevas historias
      </h2>

      <form class="story-form" @submit.prevent="submitForm">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" class="form-control" v-model="formData.name" required />
        </div>

        <div class="form-group">
          <label for="imagen">Imagen perfil:</label>
          <input type="text" id="imagen" class="form-control" placeholder="URL de la imagen" />
        </div>

        <div class="form-group">
          <label for="edad">Edad:</label>
          <input type="number" id="edad" class="form-control" v-model="formData.age" />
        </div>

        <div class="form-group">
          <label for="procedencia">Procedencia:</label>
          <input type="text" id="procedencia" class="form-control" v-model="formData.origin" />
        </div>

        <div class="form-group">
          <label for="profesion">Profesión:</label>
          <input type="text" id="profesion" class="form-control" v-model="formData.profession" />
        </div>

        <div class="form-group">
          <label for="color">Color:</label>
          <select id="color" class="form-control" v-model="formData.color">
            <option value="orange">Naranja</option>
            <option value="black">Negro</option>
            <option value="blue">Azul</option>
          </select>
        </div>

        <div class="form-group">
          <label for="historia">Historia:</label>
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
.card-blue {
  background-color: var(--pastel-blue);
}

.card-yellow {
  background-color: var(--pastel-yellow);
}

.card-pink {
  background-color: var(--pastel-pink);
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
.story-item::before {
  content: "";
  position: absolute;
  top: 16.5px;
  right: 277px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #333;
  background-color: white;
}

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
