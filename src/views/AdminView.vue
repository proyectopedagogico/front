<script setup>
import { useStoryStore } from '../stores/storyStore'
import { ref } from 'vue'

const storyStore = useStoryStore()
const stories = storyStore.stories

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

function deleteStory(id) {
  if (confirm('¿Estás seguro de que quieres eliminar esta historia?')) {
    storyStore.deleteStory(id)
  }
}

function submitForm() {
  if (formMode.value === 'create') {
    storyStore.addStory({ ...formData.value })
  } else {
    storyStore.updateStory(currentStoryId.value, { ...formData.value })
  }

  showForm.value = false
  resetForm()
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
</script>

<template>
  <div class="admin-view">
    <h1 class="dashboard-title">DASHBOARD</h1>

    <div class="create-story-container">
      <button class="create-story-btn" @click="createNewStory">Crear nueva historia</button>
    </div>

    <!-- Componente 1: Lista de historias para editar/borrar -->
    <section class="story-list-section">
      <h2 class="component-title">Componente 1: Lista de todas las historias para editar o borrar</h2>

      <div class="story-list">
        <div
          v-for="story in stories"
          :key="story.id"
          class="story-item"
          :style="{ backgroundColor: story.buttonColor }"
        >
          <div class="story-info">
            <h3>{{ story.name }}</h3>
            <p>{{ story.story || 'Sin descripción' }}</p>
          </div>
          <div class="story-actions">
            <button class="action-btn" @click="editStory(story)">Editar</button>
            <button class="action-btn" @click="deleteStory(story.id)">Borrar</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Componente 2: Formulario para crear/editar historias -->
    <section v-if="showForm" class="story-form-section">
      <h2 class="component-title">
        {{ formMode === 'create' ? 'Crear nueva historia' : 'Editar historia' }}
      </h2>

      <form class="story-form" @submit.prevent="submitForm">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" class="form-control" v-model="formData.name" required />
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
          <label for="buttonText">Texto del botón:</label>
          <input type="text" id="buttonText" class="form-control" v-model="formData.buttonText" required />
        </div>

        <div class="form-group">
          <label for="buttonColor">Color del botón:</label>
          <select id="buttonColor" class="form-control" v-model="formData.buttonColor">
            <option value="lightblue">Azul claro</option>
            <option value="lightyellow">Amarillo claro</option>
            <option value="lightpink">Rosa claro</option>
            <option value="lightcyan">Cian claro</option>
          </select>
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
          <label for="historia">Historia:</label>
          <textarea id="historia" class="form-control textarea" v-model="formData.story"></textarea>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="showForm = false">Cancelar</button>
          <button type="submit" class="submit-btn">
            {{ formMode === 'create' ? 'Crear' : 'Guardar cambios' }}
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<style scoped>
.admin-view {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.create-story-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
}

.create-story-btn {
  background-color: white;
  border: 1px solid #333;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.story-list-section,
.story-form-section {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.component-title {
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #666;
}

.story-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.story-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 10px;
}

.story-info {
  flex: 1;
}

.story-info h3 {
  margin-bottom: 0.5rem;
}

.story-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.action-btn {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 0.25rem 1rem;
  cursor: pointer;
}

.story-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-control {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.textarea {
  min-height: 150px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.submit-btn {
  background-color: white;
  border: 1px solid #333;
  border-radius: 20px;
  padding: 0.5rem 2rem;
  cursor: pointer;
}

.cancel-btn {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0.5rem 2rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .story-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .story-actions {
    flex-direction: row;
    margin-top: 1rem;
  }
}
</style>
