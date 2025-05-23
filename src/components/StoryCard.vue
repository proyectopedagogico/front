<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  origin: {
    type: String,
    default: ''
  },
  age: {
    type: [Number, String],
    default: ''
  },
  profession: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'pink' // 'pink', 'yellow', 'blue', 'mint'
  },
  icon: {
    type: String,
    default: 'sun' // 'sun', 'bolt', 'wave'
  },
  buttonText: {
    type: String,
    default: 'Leer historia'
  },
  profileImage: {
    type: String,
    default: null
  }
})

const getBackgroundColor = (color) => {
  switch (color) {
    case 'orange':
      return 'var(--card-orange)';
    case 'black':
      return 'var(--card-black)';
    case 'blue':
      return 'var(--card-blue)';
    default:
      return 'var(--card-orange)';
  }
}

const getCardClass = (color) => {
  switch (color) {
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
}
</script>

<template>
  <div class="story-card" :class="getCardClass(color)">
    <div class="card-image-container" :class="color">
      <template v-if="profileImage">
        <img :src="profileImage" :alt="title" class="profile-image">
      </template>
      <div v-else class="card-icon">
        <!-- Sun icon -->
        <svg v-if="icon === 'sun'" viewBox="0 0 24 24" fill="white" width="60" height="60">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" stroke="white" stroke-width="2" />
          <line x1="12" y1="21" x2="12" y2="23" stroke="white" stroke-width="2" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="white" stroke-width="2" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="white" stroke-width="2" />
          <line x1="1" y1="12" x2="3" y2="12" stroke="white" stroke-width="2" />
          <line x1="21" y1="12" x2="23" y2="12" stroke="white" stroke-width="2" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="white" stroke-width="2" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="white" stroke-width="2" />
        </svg>

        <!-- Bolt icon -->
        <svg v-else-if="icon === 'bolt'" viewBox="0 0 24 24" fill="white" width="60" height="60">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>

        <!-- Wave icon -->
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" width="60" height="60">
          <path d="M2 6c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
          <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
          <path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        </svg>
      </div>
    </div>

    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>

      <!-- En la vista de historias (show-details) se muestra todo -->
      <div class="card-details" v-if="origin || age || profession">
        <div class="detail-item" v-if="origin">
          <span class="detail-label">Origen:</span>
          <span class="detail-value">{{ origin }}</span>
        </div>
        <div class="detail-item" v-if="age">
          <span class="detail-label">Edad:</span>
          <span class="detail-value">{{ age }} años</span>
        </div>
        <div class="detail-item" v-if="profession">
          <span class="detail-label">Profesión:</span>
          <span class="detail-value">{{ profession }}</span>
        </div>
      </div>

      <p v-if="description" class="card-description">{{ description }}</p>

      <button @click="$emit('readStory')" class="card-button">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.story-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 280px;
  height: 280px;
  margin: 0 auto;
  transform: rotate(-2deg);
}

.story-card:hover {
  transform: translateY(-5px) rotate(-2deg);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* Fondos de tarjeta */
.story-card.card-pink {
  background-color: var(--pastel-pink);
}

.story-card.card-yellow {
  background-color: var(--pastel-yellow);
}

.story-card.card-blue {
  background-color: var(--pastel-blue);
}

.story-card.card-mint {
  background-color: var(--pastel-mint);
}

/* Contenedor de imagen */
.card-image-container {
  width: calc(100% - 20px);
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border-radius: 12px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-image-container.pink {
  background-color: var(--pastel-pink);
}

.card-image-container.yellow {
  background-color: var(--pastel-yellow);
}

.card-image-container.blue {
  background-color: var(--pastel-blue);
}

.card-image-container.mint {
  background-color: var(--pastel-mint);
}

.card-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Contenido de la tarjeta */
.card-content {
  padding: 0 var(--spacing-md) var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-grow: 1;
}

.card-title {
  color: var(--text-color);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
}

.card-details {
  margin-bottom: var(--spacing-xs);
  width: 100%;
  display: none; /* Por defecto oculto, se mostrará en la vista de historias */
}

.detail-item {
  color: var(--text-color);
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-sm);
  text-align: left;
}

.detail-label {
  font-weight: bold;
  margin-right: var(--spacing-xs);
}

.card-description {
  color: var(--text-color);
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-sm);
  display: none; /* Por defecto oculto, se mostrará en la vista de historias */
}

.card-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: var(--text-color);
  border: 1px solid var(--text-color);
  border-radius: 50px;
  padding: 0.5rem 1.25rem;
  font-weight: 600;
  font-size: var(--font-size-sm);
  text-decoration: none;
  transition: all 0.2s ease;
  margin-top: auto;
}

.card-button:hover {
  background-color: var(--text-color);
  color: white;
}

/* Clases para mostrar detalles en la vista de historias */
.show-details .card-details {
  display: block;
}

.show-details .card-description {
  display: block;
}

/* Ajustes para la vista de historias */
.show-details.story-card {
  height: auto;
  min-height: 350px;
  transform: rotate(0deg);
  width: 100%;
  max-width: 350px;
}

.show-details.story-card:hover {
  transform: translateY(-5px) rotate(0deg);
}

/* Nueva clase para la imagen de perfil */
.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}
</style>
