<script setup>
import { useStoryStore } from '../stores/storyStore'
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore' // Import authStore
import { useRouter } from 'vue-router' // Import useRouter for navigation
import countriesData from '../assets/countries.json'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/stores/languageStore'

const storyStore = useStoryStore()
const authStore = useAuthStore() // Initialize authStore
const router = useRouter() // Initialize router


const storiesForAdmin = computed(() => storyStore.adminStories) 
const isLoading = computed(() => storyStore.isLoading)
const error = computed(() => storyStore.error)
const countries = computed(() => countriesData)
const { t, locale } = useI18n()
const languageStore = useLanguageStore()

onMounted(() => {
  languageStore.init()
  locale.value = languageStore.currentLanguage
})
const availableTags = computed(() => storyStore.availableTags || [])

const supportedLanguages = ref([
  { code: 'es', name: 'Español' },
  { code: 'eu', name: 'Euskara' },
  { code: 'en', name: 'English' },
]);

onMounted(async () => {
  console.log("AdminView.vue onMounted: Fetching admin stories and tags...");
  await storyStore.fetchAdminStories(); 
  if (!storyStore.availableTags || storyStore.availableTags.length === 0) { 
    await storyStore.fetchTags();
  }
});

const formMode = ref('create') 
const currentStoryId = ref(null) 

const initialFormData = () => ({
  name: '',       
  birthYear: '',  
  origin: '',     
  profession: '', 
  story: '',      
  Personas_id_persona: null, 
  etiqueta_id_principal: null, 
  tag_ids: [], 
  current_lang_code: 'es', 
  color: 'pink', // Default color for the form's select input
  profileImageFile: null, 
  profileImageDescription: '' 
});

const formData = ref(initialFormData());

const showForm = ref(false)
const formSection = ref(null)

function handleImageFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    formData.value.profileImageFile = file;
  } else {
    formData.value.profileImageFile = null;
  }
}

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
  formData.value = initialFormData();
  currentStoryId.value = null;
  formMode.value = 'create';
  const fileInput = document.getElementById('form-profile-image'); 
  if (fileInput) {
    fileInput.value = null;
  }
}

function createNewStory() {
  formMode.value = 'create';
  resetForm(); 
  showForm.value = true;
  scrollToForm();
}

function editStory(story) { 
  formMode.value = 'edit';
  currentStoryId.value = story.id_historias;
  
  formData.value = {
    name: story.nombre_persona || '', 
    birthYear: story.persona_anio_nacimiento || '',
    origin: story.persona_procedencia || '',
    profession: story.persona_profesion || '',
    story: story.contenido || '', 
    Personas_id_persona: story.Personas_id_persona, 
    etiqueta_id_principal: story.etiqueta_id_principal || null,
    tag_ids: story.tags ? story.tags.map(tag => tag.etiqueta_id) : [], 
    current_lang_code: 'es', 
    // The 'color' in formData is for the form's select.
    // If the story object from API had a 'color_card', you would use it here.
    // For now, we default the form's color selector.
    color: story.color_ui_from_api || 'pink', // Example if API sent a color for the story
    profileImageFile: null, 
    profileImageDescription: story.persona_info?.profile_image_description || '' 
  };
  showForm.value = true;
  scrollToForm();
}

async function deleteStoryFromAdminView(id_historias) { 
  if (confirm('¿Estás seguro de que quieres eliminar esta historia?')) {
    try {
      await storyStore.deleteStory(id_historias);
    } catch (err) {
      alert(`Error al eliminar la historia: ${err.data ? err.data.error : err.message}`);
    }
  }
}

async function submitForm() {
  isLoading.value = true; 
  error.value = null; 
  let final_Personas_id_persona = formData.value.Personas_id_persona ? parseInt(formData.value.Personas_id_persona) : null;

  try {
    if (formMode.value === 'create') {
      if (!formData.value.name || !formData.value.origin) { 
        alert("Para una nueva historia, el NOMBRE y el PAÍS DE ORIGEN de la persona son obligatorios.");
        isLoading.value = false; return;
      }
      const personDataToCreate = {
        nombre: formData.value.name,
        procedencia: formData.value.origin, 
        profesion: formData.value.profession || null,
        anio: formData.value.birthYear ? parseInt(formData.value.birthYear) : null 
      };
      const newPerson = await storyStore.createPersonAndGetId(personDataToCreate); 
      if (newPerson && newPerson.id_persona) {
        final_Personas_id_persona = newPerson.id_persona;
        if (formData.value.profileImageFile && final_Personas_id_persona) {
          await storyStore.uploadImageForPerson(final_Personas_id_persona, formData.value.profileImageFile, formData.value.profileImageDescription);
        }
      } else {
        throw new Error("No se pudo crear la persona o no se obtuvo un ID válido.");
      }
    } else { // Edit mode
      if (!final_Personas_id_persona) {
        alert('Error: No se encontró el ID de la persona para editar la historia.');
        isLoading.value = false; return;
      }
      if (formData.value.profileImageFile && final_Personas_id_persona) {
        await storyStore.uploadImageForPerson(final_Personas_id_persona, formData.value.profileImageFile, formData.value.profileImageDescription);
      }
    }
    
    if (!formData.value.story || !formData.value.story.trim()) {
      alert("El contenido de la historia no puede estar vacío.");
      isLoading.value = false; return;
    }

    const traduccionesPayload = [{
      codigo_idioma: formData.value.current_lang_code || 'es',
      contenido_traducido: formData.value.story 
    }];

    const tag_ids_payload = Array.isArray(formData.value.tag_ids) 
      ? formData.value.tag_ids.map(id => parseInt(id)).filter(n => !isNaN(n)) 
      : [];

    const storyApiPayload = {
      Personas_id_persona: final_Personas_id_persona,
      etiqueta_id_principal: formData.value.etiqueta_id_principal ? parseInt(formData.value.etiqueta_id_principal) : null,
      traducciones: traduccionesPayload,
      tag_ids: tag_ids_payload
      // We are NOT sending formData.color to the backend, as it's UI only.
    };

    if (formMode.value === 'create') {
      await storyStore.addStory(storyApiPayload);
    } else {
      await storyStore.updateStory(currentStoryId.value, storyApiPayload);
    }
    showForm.value = false;
    resetForm();
    await storyStore.fetchAdminStories(); 

  } catch (err) {
    console.error("AdminView: Error in submitForm:", err);
    const errorMessage = (err.data && (err.data.message || err.data.error)) || err.message || 'Error desconocido al procesar el formulario.';
    alert(`Error: ${errorMessage}`);
  } finally {
    isLoading.value = false;
  }
}

function retryFetchAdminStories() { 
  storyStore.fetchAdminStories();
}

// --- UPDATED getCardClass function for UI display only ---
const availableCardUiColors = ['pink', 'yellow', 'blue', 'mint', 'orange'];

function getCardClassForStoryItem(story) {
  if (story && story.id_historias) {
    // Generate a consistent color based on the story's ID
    // This ensures the same story always gets the same color from the list
    // The color is determined purely on the frontend for display purposes.
    const colorIndex = story.id_historias % availableCardUiColors.length;
    const colorName = availableCardUiColors[colorIndex];
    
    switch (colorName) {
      case 'pink': return 'card-pink';
      case 'yellow': return 'card-yellow';
      case 'blue': return 'card-blue';
      case 'mint': return 'card-mint';
      case 'orange': return 'card-orange'; // Ensure you have .card-orange style
      default: return 'card-pink';
    }
  }
  return 'card-pink'; // Default if no story or ID
}

async function handleLogout() {
  try {
    await authStore.logout(); // Call the logout action from your auth store
    router.push({ name: 'login' }); // Redirect to login page after logout
    // Or router.push('/'); to redirect to home page
  } catch (error) {
    console.error("Error during logout:", error);
    // Handle any errors during logout if necessary, though authStore.logout should also handle errors
    alert("Error al cerrar sesión. Por favor, inténtalo de nuevo.");
  }
}
</script>

<template>
  <div class="admin-view">
    <h1 class="dashboard-title">DASHBOARD</h1>

    <div class="create-story-container">
      <button class="create-story-btn" @click="createNewStory">{{ t('views.admin.new') }}</button>
    </div>
<button @click="handleLogout" class="logout-btn">Cerrar Sesión</button>
    <section class="story-list-section">
      <h2 class="component-title">{{ t('views.admin.story_list') }}</h2>
      <div v-if="isLoading && !showForm" class="loading-container">Cargando...</div>
      <div v-else-if="error && !showForm" class="error-container">
        <p class="error-message">{{ error }}</p>
        <button @click="retryFetchAdminStories" class="retry-btn">Intentar de nuevo</button>
      </div>
      <div v-else class="story-list">
        <div v-if="storiesForAdmin.length === 0 && !isLoading" class="no-stories-message">
          <p>No hay historias disponibles. Crea una nueva historia para comenzar.</p>
        </div>
        <div
          v-for="story in storiesForAdmin"
          :key="story.id_historias"
          class="story-item"
          :class="getCardClassForStoryItem(story)" >
          <div class="story-info">
            <img 
              v-if="story.persona_profile_image_url" 
              :src="story.persona_profile_image_url" 
              :alt="story.nombre_persona || 'Imagen de perfil'" 
              class="story-item-profile-image"
            />
            <div v-else class="story-item-no-image">Sin Imagen</div>
            
            <div> 
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
              <span v-for="tag_item in story.tags" :key="tag_item.etiqueta_id" class="tag-item">{{ tag_item.name }}</span>
            </div>
            <div class="story-main-tag" v-if="story.nombre_etiqueta_principal">
              <strong>Etiqueta Principal:</strong> {{ story.nombre_etiqueta_principal }}
            </div>
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
        
        <div class="form-group" v-if="formMode === 'edit'">
          <label for="form-personas-id-edit">ID de Persona Asociada (Edición):</label>
          <input type="number" id="form-personas-id-edit" class="form-control" v-model.number="formData.Personas_id_persona" readonly />
        </div>

        <p v-if="formMode === 'create'"><strong>Datos de la Nueva Persona (Obligatorio para nueva historia):</strong></p>
        
        <div class="form-group">
          <label for="nombre">Nombre Persona:</label>
          <input type="text" id="nombre" class="form-control" v-model="formData.name" :required="formMode === 'create'" />
        </div>
        
        <div class="form-group">
          <label for="anioNacimiento">Año Nacimiento Persona:</label>
          <input type="number" id="anioNacimiento" class="form-control" v-model.number="formData.birthYear" />
        </div>

        <div class="form-group">
          <label for="procedencia">País Origen Persona (Obligatorio si es nueva):</label>
          <select id="procedencia" class="form-control" v-model="formData.origin" :required="formMode === 'create'">
            <option value="">Selecciona un país</option>
            <option v-for="country in countries" :key="country.id" :value="country.name">
              {{ country.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="profesion">Profesión Persona:</label>
          <input type="text" id="profesion" class="form-control" v-model="formData.profession" />
        </div>
        
        <div class="form-group">
          <label for="form-profile-image">Imagen de Perfil (opcional):</label>
          <input type="file" id="form-profile-image" class="form-control" @change="handleImageFileChange" accept="image/png, image/jpeg, image/gif, image/webp" />
        </div>
        <div class="form-group">
          <label for="form-image-description">Descripción de la Imagen (opcional):</label>
          <input type="text" id="form-image-description" class="form-control" v-model="formData.profileImageDescription" />
        </div>
        
        <hr> 
        <p><strong>Datos de la Historia:</strong></p>

        <div class="form-group">
            <label for="form-story-language">Idioma del Contenido:</label>
            <select id="form-story-language" class="form-control" v-model="formData.current_lang_code">
                <option v-for="lang in supportedLanguages" :key="lang.code" :value="lang.code">
                    {{ lang.name }}
                </option>
            </select>
        </div>

        <div class="form-group">
          <label for="historia">Historia (Contenido en {{ formData.current_lang_code.toUpperCase() }}):</label>
          <textarea id="historia" class="form-control textarea" v-model="formData.story" required></textarea>
        </div>

        <div class="form-group">
            <label for="form-etiqueta-principal">Etiqueta Principal (opcional):</label>
            <select id="form-etiqueta-principal" class="form-control" v-model="formData.etiqueta_id_principal">
                <option :value="null">-- Ninguna --</option>
                <option v-for="tag_option in availableTags" :key="tag_option.etiqueta_id" :value="tag_option.etiqueta_id">
                    {{ tag_option.name }}
                </option>
            </select>
        </div>

        <div class="form-group">
            <label for="form-tag-ids">Etiquetas Adicionales (opcional, mantén Ctrl/Cmd para seleccionar varias):</label>
            <select id="form-tag-ids" class="form-control" v-model="formData.tag_ids" multiple>
                <option v-for="tag_option in availableTags" :key="tag_option.etiqueta_id" :value="tag_option.etiqueta_id">
                    {{ tag_option.name }}
                </option>
            </select>
        </div>
        
        <div class="form-group">
          <label for="form-color-card">Color de Tarjeta (UI):</label>
          <select id="form-color-card" class="form-control" v-model="formData.color">
            <option value="pink">Rosa Pastel</option>
            <option value="yellow">Amarillo Pastel</option>
            <option value="blue">Azul Pastel</option>
            <option value="mint">Menta Pastel</option>
            <option value="orange">Naranja Vibrante</option>
          </select>
        </div>

        <div class="form-actions">
          <button type="submit" class="create-btn" :disabled="isLoading">
            {{ isLoading ? 'Guardando...' : (formMode === 'create' ? 'Crear Historia y Persona' : 'Guardar Cambios') }}
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
.story-item-profile-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
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

.logout-btn { /* NEW STYLE for logout button */
  background-color: white;
  border: 1px solid #333;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 20px;
}
.logout-btn:hover {
  background-color: #d32f2f8a; /* Darker red */
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