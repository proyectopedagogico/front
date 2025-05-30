<template>
  <div v-if="show" class="modal-backdrop" @click="closeModal">
    <div :class="['modal-content', cardColorClass]" @click.stop>
      <button class="close-button" @click="closeModal">&times;</button>
      
      <div v-if="story.persona_profile_image_url" class="modal-image-container">
        <img :src="story.persona_profile_image_url" :alt="story.nombre_persona || 'Imagen de perfil'" class="profile-image-modal">
      </div>

      <h2 class="modal-title">{{ story.nombre_persona || 'Detalle de Historia' }}</h2>
      
      <div class="modal-details">
        <p v-if="story.persona_procedencia"><strong>Origen:</strong> {{ story.persona_procedencia }}</p>
        <p v-if="story.persona_anio_nacimiento"><strong>Año de nacimiento:</strong> {{ story.persona_anio_nacimiento }}</p>
        <p v-if="story.persona_profesion"><strong>Profesión:</strong> {{ story.persona_profesion }}</p>
      </div>
      <div class="modal-story">
        <p v-html="story.contenido ? story.contenido.replace(/\n/g, '<br>') : 'Contenido no disponible.'"></p>
      </div>
      
      <div class="modal-tags" v-if="story.tags && story.tags.length > 0">
        <strong>Etiquetas:</strong>
        <span v-for="tag in story.tags" :key="tag.etiqueta_id" class="tag-item-modal">
          {{ tag.name }}
        </span>
      </div>
      <div class="modal-main-tag" v-if="story.nombre_etiqueta_principal">
        <strong>Etiqueta Principal:</strong> {{ story.nombre_etiqueta_principal }}
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  story: {
    type: Object,
    required: true // This object comes from the parent (StoriesView)
                   // and should have: nombre_persona, persona_procedencia, 
                   // persona_anio_nacimiento, persona_profesion, contenido,
                   // persona_profile_image_url, tags, nombre_etiqueta_principal,
                   // and optionally a 'color_card' if used for modal styling
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

// cardColorClass will use a color property from the story object if it exists,
// e.g., if you pass story.color_card to the modal via the parent.
// For now, it might default if props.story.color is undefined.
const cardColorClass = computed(() => {
  // Assuming the story object might have a 'color_card' property for styling consistency
  const color = props.story.color_card || 'pink'; // Fallback to pink if no color defined
  switch (color) {
    case 'pink': return 'modal-card-pink';
    case 'yellow': return 'modal-card-yellow';
    case 'blue': return 'modal-card-blue';
    case 'mint': return 'modal-card-mint';
    case 'orange': return 'modal-card-orange';
    default: return 'modal-card-pink';
  }
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Darker backdrop */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
}

.modal-content {
  position: relative;
  background: white;
  width: 90%;
  max-width: 700px; /* Slightly wider for more content */
  max-height: 85vh;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* Define modal card colors if you want them different from StoryCard */
.modal-card-pink { background-color: var(--pastel-pink, #fde3e9); }
.modal-card-yellow { background-color: var(--pastel-yellow, #fef9c3); }
.modal-card-blue { background-color: var(--pastel-blue, #dbeafe); }
.modal-card-mint { background-color: var(--pastel-mint, #d1fae5); }
.modal-card-orange { background-color: var(--card-orange, #ffedd5); }


.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 2rem; /* Larger close button */
  line-height: 1;
  cursor: pointer;
  color: #555;
}
.close-button:hover {
  color: #000;
}

.modal-image-container {
  width: 150px; /* Adjust size as needed */
  height: 150px; /* Adjust size as needed */
  border-radius: 50%; /* Circular image */
  overflow: hidden;
  margin: 0 auto 1.5rem auto; /* Center and add margin */
  border: 3px solid #eee;
  flex-shrink: 0;
}

.profile-image-modal {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-title {
  font-size: 1.8rem; /* Larger title */
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #333;
  text-align: center;
}

.modal-details {
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  color: #444;
}

.modal-details p {
  margin: 0.6rem 0;
}
.modal-details p strong {
  color: #111;
}

.modal-story {
  line-height: 1.7;
  font-size: 1rem;
  color: #333;
  text-align: justify;
  margin-bottom: 1.5rem;
}
.modal-story p {
    margin-bottom: 1em;
}

.modal-tags, .modal-main-tag {
  margin-top: 1rem;
  font-size: 0.9rem;
}
.tag-item-modal {
  padding: 0.2em 0.6em;
  border-radius: 0.25rem;
  margin-right: 0.5em;
  display: inline-block;
  margin-bottom: 0.3em;
}
</style>