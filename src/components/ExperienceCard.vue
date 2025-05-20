<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  period: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'blue' // 'blue', 'yellow', 'pink'
  }
})
</script>

<template>
  <div class="experience-card" :class="color">
    <div class="experience-header">
      <h3 class="experience-title">{{ title }}</h3>
      <div class="experience-company">{{ company }}</div>
      <div class="experience-period">{{ period }}</div>
    </div>
    
    <p class="experience-description">{{ description }}</p>
    
    <div class="card-decoration">
      <div class="card-star"></div>
    </div>
  </div>
</template>

<style scoped>
.experience-card {
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.experience-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.experience-card.blue {
  background-color: var(--pastel-blue);
}

.experience-card.yellow {
  background-color: var(--pastel-yellow);
}

.experience-card.pink {
  background-color: var(--pastel-pink);
}

.experience-header {
  margin-bottom: var(--spacing-md);
}

.experience-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
  color: var(--text-color);
}

.experience-company {
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
  color: var(--text-color);
}

.experience-period {
  font-size: var(--font-size-sm);
  color: var(--secondary-color);
  margin-bottom: var(--spacing-md);
}

.experience-description {
  color: var(--text-color);
  line-height: 1.6;
}

.card-decoration {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
}

.card-star {
  position: relative;
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 0.9em;
  margin-right: 0.9em;
  margin-bottom: 1.2em;
  border-right: 0.3em solid transparent;
  border-bottom: 0.7em solid var(--accent-yellow);
  border-left: 0.3em solid transparent;
  font-size: 10px;
}

.card-star:before, .card-star:after {
  content: '';
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  top: 0.6em;
  left: -1em;
  border-right: 1em solid transparent;
  border-bottom: 0.7em solid var(--accent-yellow);
  border-left: 1em solid transparent;
  transform: rotate(-35deg);
}

.card-star:after {
  transform: rotate(35deg);
}
</style>
