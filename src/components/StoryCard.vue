<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'orange'
  },
  buttonText: {
    type: String,
    default: 'Leer'
  },
  buttonColor: {
    type: String,
    default: 'lightblue'
  }
})
</script>

<template>
  <div class="story-card">
    <div class="icon-container" :style="{ backgroundColor: color }">
      <div class="icon" v-if="color === 'orange'">
        <!-- Sol icon -->
        <svg viewBox="0 0 24 24" fill="white">
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
      </div>
      <div class="icon" v-else-if="color === 'black'">
        <!-- Rayo icon -->
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>
      <div class="icon" v-else>
        <!-- Olas icon -->
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M2 6c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
          <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
          <path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        </svg>
      </div>
    </div>
    <div class="info-container" :style="{ backgroundColor: buttonColor }">
      <div class="name">{{ name }}</div>
      <button class="read-btn">{{ buttonText }}</button>
    </div>
  </div>
</template>

<style scoped>
.story-card {
  width: 150px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid #00c2cb;
}

.icon-container {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.icon {
  width: 50px;
  height: 50px;
}

.info-container {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.name {
  font-weight: bold;
}

.read-btn {
  background-color: white;
  border: none;
  border-radius: 15px;
  padding: 0.25rem 1rem;
  cursor: pointer;
  font-size: 0.8rem;
}
</style>
