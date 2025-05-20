<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'pink' // 'pink', 'yellow', 'blue', 'mint'
  },
  icon: {
    type: String,
    default: 'design' // 'design', 'code', 'marketing', 'consulting'
  }
})

const getBackgroundColor = (color) => {
  switch (color) {
    case 'pink':
      return 'var(--pastel-pink)';
    case 'yellow':
      return 'var(--pastel-yellow)';
    case 'blue':
      return 'var(--pastel-blue)';
    case 'mint':
      return 'var(--pastel-mint)';
    default:
      return 'var(--pastel-pink)';
  }
}
</script>

<template>
  <div class="service-card" :class="color">
    <div class="service-icon">
      <!-- Design icon -->
      <svg v-if="icon === 'design'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="4"></circle>
        <line x1="21.17" y1="8" x2="12" y2="8"></line>
        <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
        <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
      </svg>
      
      <!-- Code icon -->
      <svg v-else-if="icon === 'code'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
      
      <!-- Marketing icon -->
      <svg v-else-if="icon === 'marketing'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
      </svg>
      
      <!-- Consulting icon -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    </div>
    
    <h3 class="service-title">{{ title }}</h3>
  </div>
</template>

<style scoped>
.service-card {
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 180px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.service-card.pink {
  background-color: var(--pastel-pink);
}

.service-card.yellow {
  background-color: var(--pastel-yellow);
}

.service-card.blue {
  background-color: var(--pastel-blue);
}

.service-card.mint {
  background-color: var(--pastel-mint);
}

.service-icon {
  margin-bottom: var(--spacing-md);
  color: var(--text-color);
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
}

.service-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-color);
}
</style>
