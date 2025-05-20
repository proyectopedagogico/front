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
    default: 'orange' // 'orange', 'black', 'blue'
  },
  icon: {
    type: String,
    default: 'sun' // 'sun', 'bolt', 'wave'
  },
  buttonText: {
    type: String,
    default: 'Leer historia'
  },
  link: {
    type: String,
    default: '#'
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
</script>

<template>
  <div class="story-card" :class="color">
    <div class="card-content">
      <div class="card-icon">
        <!-- Sun icon -->
        <svg v-if="icon === 'sun'" viewBox="0 0 24 24" fill="white" width="40" height="40">
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
        <svg v-else-if="icon === 'bolt'" viewBox="0 0 24 24" fill="white" width="40" height="40">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>

        <!-- Wave icon -->
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" width="40" height="40">
          <path d="M2 6c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
          <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
          <path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        </svg>
      </div>

      <h3 class="card-title">{{ title }}</h3>

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

      <a :href="link" class="card-button">
        {{ buttonText }}
      </a>
    </div>

    <div class="card-decoration">
      <div class="card-dot"></div>
      <div class="card-dot"></div>
      <div class="card-dot"></div>
    </div>
  </div>
</template>

<style scoped>
.story-card {
  position: relative;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  padding: var(--spacing-lg);
  height: 100%;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.story-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.story-card.orange {
  background-color: var(--card-orange);
}

.story-card.black {
  background-color: var(--card-black);
}

.story-card.blue {
  background-color: var(--card-blue);
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 1;
}

.card-icon {
  margin-bottom: var(--spacing-md);
}

.card-title {
  color: white;
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-md);
}

.card-details {
  margin-bottom: var(--spacing-md);
}

.detail-item {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-sm);
}

.detail-label {
  font-weight: bold;
  margin-right: var(--spacing-xs);
}

.card-description {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-sm);
}

.card-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: var(--text-color);
  border-radius: var(--border-radius-md);
  padding: 0.5rem 1.25rem;
  font-weight: 600;
  font-size: var(--font-size-sm);
  text-decoration: none;
  align-self: flex-start;
  transition: transform 0.2s ease;
  margin-top: auto;
}

.card-button:hover {
  transform: translateY(-2px);
}

.card-decoration {
  position: absolute;
  bottom: var(--spacing-md);
  right: var(--spacing-md);
  display: flex;
  gap: 8px;
}

.card-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
