<template>
  <div v-if="show" class="modal-backdrop" @click="closeModal">
    <div :class="['modal-content', cardColorClass]" @click.stop>
      <button class="close-button" @click="closeModal">&times;</button>
      <h2 class="modal-title">{{ story.name }}</h2>
      <div class="modal-details">
        <p v-if="story.persona_procedencia"><strong>Origen:</strong> {{ story.persona_procedencia }}</p>
        <p v-if="story.persona_anio_nacimiento"><strong>Año de nacimiento:</strong> {{ story.persona_anio_nacimiento }}</p>
        <p v-if="story.persona_profesion"><strong>Profesión:</strong> {{ story.persona_profesion }}</p>
      </div>
      <div class="modal-story">
        <p>{{ story.contenido }}</p>
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
    required: true
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const cardColorClass = computed(() => {
  switch (props.story.color) {
    case 'pink':
      return 'card-pink';
    case 'yellow':
      return 'card-yellow';
    case 'blue':
      return 'card-blue';
    case 'mint':
      return 'card-mint';
    default:
      return 'card-pink';
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  padding: 2rem;
  border-radius: 12px;
  overflow-y: auto;
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

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.modal-details {
  margin-bottom: 1.5rem;
}

.modal-details p {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.modal-story {
  line-height: 1.6;
  font-size: 1rem;
}
</style>
