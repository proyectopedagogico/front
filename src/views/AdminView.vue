<script setup>
import { useStoryStore } from '../stores/storyStore'
import { ref, computed, onMounted } from 'vue'
import countriesData from '../assets/countries.json' // For the origin dropdown in the form

const storyStore = useStoryStore()
// Use adminStories for this view
const storiesForAdmin = computed(() => storyStore.adminStories) 
const isLoading = computed(() => storyStore.isLoading)
const error = computed(() => storyStore.error)
const countries = computed(() => countriesData)
const adminPagination = computed(() => storyStore.adminPaginationInfo)

// Load admin stories when the component is mounted
onMounted(async () => {
  await storyStore.fetchAdminStories(); 
  // If your form needs dynamic options for Personas_id_persona or etiquetas, load them here:
  // await storyStore.fetchPersonOptions(); // Example: if you create this action
  // await storyStore.fetchFilterOptions(); // This loads tag names for public filters, adapt if needed for admin form
});

// State for the form
const formMode = ref('create') // 'create' or 'edit'
const currentStoryId = ref(null) // Stores the ID of the story being edited

// formData reflects the fields in your current HTML form
const formData = ref({
  name: '', // Maps to v-model="formData.name" (Nombre Persona)
  // profileImage_form: '', // Not in your current form template based on v-models
  birthYear: '', // Maps to v-model="formData.birthYear" (Año Nacimiento Persona)
  origin: '',    // Maps to v-model="formData.origin" (País Origen Persona)
  profession: '',// Maps to v-model="formData.profession" (Profesión Persona)
  color: 'pink', // UI specific for the card, not sent for Story model
  story: '',     // Maps to v-model="formData.story" (Contenido de la historia en un idioma)
  
  // Fields that need to be explicitly set for the API, but might not have direct simple inputs
  // or need to be selected/fetched.
  Personas_id_persona: null, 
  etiqueta_id_principal: null,
  tag_ids_string: '', // For comma-separated tag IDs input
  current_lang_code: 'es' // Default language for the 'story' field
});

const showForm = ref(false)
const formSection = ref(null)

function scrollToForm() {
  setTimeout(() => {
    if (formSection.value) {
      const yOffset = -80; 
      const y = formSection.value.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, 100);
}

function resetForm() {
  formData.value = {
    name: '', // Corresponds to 'Nombre' input in form
    // profileImage_form: '',
    birthYear: '',
    origin: '',
    profession: '',
    color: 'pink', // Default color for UI
    story: '',     // Contenido de la historia
    Personas_id_persona: null, // Needs to be set for API
    etiqueta_id_principal: null,
    tag_ids_string: '',
    current_lang_code: 'es'
  };
  currentStoryId.value = null;
  formMode.value = 'create';
}

function createNewStory() {
  formMode.value = 'create';
  resetForm();
  // IMPORTANT: For 'create' mode, you need a way to set Personas_id_persona.
  // Currently, your form doesn't have a direct input for it that maps to formData.Personas_id_persona.
  // You might need to add a select/input for Personas_id_persona or handle this differently.
  // For now, it will be null unless set by another mechanism.
  showForm.value = true;
  scrollToForm();
}

function editStory(story) { 
  formMode.value = 'edit';
  currentStoryId.value = story.id_historias;
  
  formData.value = {
    // Populate form fields from the story object
    name: story.nombre_persona || '', // Maps to 'Nombre' input
    birthYear: story.persona_anio_nacimiento || '',
    origin: story.persona_procedencia || '',
    profession: story.persona_profesion || '',
    color: story.color_card || 'pink', // If you have a color_card property from API for UI
    story: story.contenido || '', // Content for the default/current language
    
    // Store IDs needed for the API payload directly
    Personas_id_persona: story.Personas_id_persona,
    etiqueta_id_principal: story.etiqueta_id_principal || null,
    tag_ids_string: story.tags ? story.tags.map(tag => tag.etiqueta_id).join(', ') : '', 
    current_lang_code: 'es' // Or determine from story.contenido if language info is available
  };
  showForm.value = true;
  scrollToForm();
}

async function deleteStoryFromAdminView(id_historias) { 
  if (confirm('¿Estás seguro de que quieres eliminar esta historia?')) {
    try {
      await storyStore.deleteStory(id_historias);
      // The list will update automatically if storyStore.deleteStory modifies adminStories
    } catch (err) {
      alert(`Error al eliminar la historia: ${err.data ? err.data.error : err.message}`);
    }
  }
}

async function submitForm() {
  // --- CRITICAL: Transform formData to apiPayload ---
  // The form collects data like 'name', 'birthYear', 'origin', 'profession', 'story'.
  // The API expects 'Personas_id_persona', 'traducciones', 'etiqueta_id_principal', 'tag_ids'.

  // 1. Get Personas_id_persona:
  // Your form currently doesn't have a direct v-model for formData.Personas_id_persona.
  // You need to add an input for this or a way to select an existing person.
  // For now, I'll assume it's manually set in formData or you add an input.
  if (!formData.value.Personas_id_persona) {
    alert('Por favor, especifica el ID de la persona asociada (campo "ID de Persona Asociada" en el formulario).');
    return; 
  }
  
  // 2. Prepare 'traducciones' array:
  // Your form has v-model="formData.story" for the content.
  if (!formData.value.story.trim()) { // Changed from contenido_form to story
    alert("El contenido de la historia (campo 'Historia') no puede estar vacío.");
    return;
  }
  const traduccionesPayload = [
    {
      codigo_idioma: formData.value.current_lang_code || 'es',
      contenido_traducido: formData.value.story // Use formData.story
    }
    // If your form had UI for multiple languages, you'd build this array accordingly.
  ];

  // 3. Prepare 'tag_ids' array:
  // Your form has v-model for formData.tag_ids_string (implicitly via :value and @input).
  const tag_ids_payload = formData.value.tag_ids_string
    .split(',')
    .map(s => s.trim())
    .filter(s => s)
    .map(Number)
    .filter(n => !isNaN(n)); // Ensure only valid numbers

  const apiPayload = {
    Personas_id_persona: parseInt(formData.value.Personas_id_persona),
    etiqueta_id_principal: formData.value.etiqueta_id_principal ? parseInt(formData.value.etiqueta_id_principal) : null,
    traducciones: traduccionesPayload,
    tag_ids: tag_ids_payload
  };

  // Note: The fields formData.name, formData.birthYear, formData.origin, formData.profession
  // are related to the Person, not the Story itself for creation/update via /api/stories.
  // If you need to create/update Person details, you'd need separate API endpoints and form logic.

  try {
    if (formMode.value === 'create') {
      await storyStore.addStory(apiPayload);
    } else {
      await storyStore.updateStory(currentStoryId.value, apiPayload);
    }
    showForm.value = false;
    resetForm();
    await storyStore.fetchAdminStories(); 
  } catch (err) {
    alert(`Error al guardar la historia: ${err.data ? (err.data.error || err.data.message) : err.message}`);
  }
}

function retryFetchAdminStories() { 
  storyStore.fetchAdminStories();
}

function getCardClass(story) {
  // If 'color' is part of the story object from backend, use it. Otherwise, use a default.
  // The current formData.color is for the form, not necessarily for each listed story.
  return story.color_ui || 'card-pink'; // Assuming story object might have a 'color_ui'
}
</script>

<template>
  <div class="admin-view">
    <h1 class="dashboard-title">DASHBOARD</h1>

    <div class="create-story-container">
      <button class="create-story-btn" @click="createNewStory">Crear nueva historia</button>
    </div>

    <section class="story-list-section">
      <h2 class="component-title">Lista de historias</h2>
      <div v-if="isLoading" class="loading-container">Cargando...</div>
      <div v-else-if="error" class="error-container">
        <p class="error-message">{{ error }}</p>
        <button @click="retryFetchAdminStories" class="retry-btn">Intentar de nuevo</button>
      </div>
      <div v-else class="story-list">
        <div v-if="storiesForAdmin.length === 0" class="no-stories-message">
          <p>No hay historias disponibles. Crea una nueva historia para comenzar.</p>
        </div>
        <div
          v-for="story in storiesForAdmin"
          :key="story.id_historias"
          class="story-item"
          :class="getCardClass(story)" 
        >
          <div class="story-info">
            <h3>{{ story.nombre_persona || 'Historia sin nombre de persona' }}</h3>
            <div class="story-details">
              <span v-if="story.persona_procedencia"><strong>Origen:</strong> {{ story.persona_procedencia }}</span>
              <span v-if="story.persona_anio_nacimiento"><strong>Año:</strong> {{ story.persona_anio_nacimiento }}</span>
              <span v-if="story.persona_profesion"><strong>Profesión:</strong> {{ story.persona_profesion }}</span>
            </div>
            <div class="story-text">
              <p>{{ story.contenido || 'Contenido no disponible en este idioma.' }}</p>
            </div>
             <div class="story-tags" v-if="story.tags && story.tags.length > 0">
              <strong>Etiquetas:</strong>
              <span v-for="tag in story.tags" :key="tag.etiqueta_id" class="tag-item">{{ tag.name }}</span>
            </div>
            <div class="story-main-tag" v-if="story.nombre_etiqueta_principal">
              <strong>Etiqueta Principal:</strong> {{ story.nombre_etiqueta_principal }}
            </div>
          </div>
          <div class="story-actions">
            <button class="action-btn edit-btn" @click="editStory(story)">Editar</button>
            <button class="action-btn delete-btn" @click="deleteStoryFromAdminView(story.id_historias)">Borrar</button>
          </div>
        </div>
      </div>
    </section>

    <section v-if="showForm" class="story-form-section" ref="formSection">
      <h2 class="component-title">
       Formulario para la {{ formMode === 'create' ? 'creación' : 'edición' }} de historias
      </h2>
      <form class="story-form" @submit.prevent="submitForm">
        
        <div class="form-group">
          <label for="form-personas-id">ID de Persona Asociada (Obligatorio):</label>
          <input type="number" id="form-personas-id" class="form-control" v-model.number="formData.Personas_id_persona" required />
          </div>

        <div class="form-group">
          <label for="form-nombre-persona">Nombre Persona (para referencia):</label>
          <input type="text" id="form-nombre-persona" class="form-control" v-model="formData.name" />
        </div>
        <div class="form-group">
          <label for="form-anioNacimiento">Año Nacimiento Persona (para referencia):</label>
          <input type="number" id="form-anioNacimiento" class="form-control" v-model.number="formData.birthYear" />
        </div>
        <div class="form-group">
          <label for="form-procedencia">País Origen Persona (para referencia):</label>
          <select id="form-procedencia" class="form-control" v-model="formData.origin">
            <option value="">Selecciona un país</option>
            <option v-for="country in countries" :key="country.id" :value="country.name">
              {{ country.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="form-profesion">Profesión Persona (para referencia):</label>
          <input type="text" id="form-profesion" class="form-control" v-model="formData.profession" />
        </div>
        
        <div class="form-group">
          <label for="form-contenido-historia">Historia (Contenido en {{ formData.current_lang_code }}):</label>
          <textarea id="form-contenido-historia" class="form-control textarea" v-model="formData.story" required></textarea>
          </div>

        <div class="form-group">
          <label for="form-etiqueta-principal">ID Etiqueta Principal (opcional):</label>
          <input type="number" id="form-etiqueta-principal" class="form-control" v-model.number="formData.etiqueta_id_principal" />
          </div>

        <div class="form-group">
          <label for="form-tag-ids">IDs de Etiquetas Adicionales (separados por coma, opcional):</label>
          <input type="text" id="form-tag-ids" class="form-control" v-model="formData.tag_ids_string" />
          </div>
        
        <!-- <div class="form-group">
          <label for="color">Color Tarjeta (UI):</label>
          <select id="color" class="form-control" v-model="formData.color">...</select>
        </div> -->

        <div class="form-actions">
          <button type="submit" class="create-btn" :disabled="isLoading">
            {{ isLoading ? 'Guardando...' : (formMode === 'create' ? 'Crear Historia' : 'Guardar Cambios') }}
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<style scoped>
/* Tus estilos permanecen aquí sin cambios */
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