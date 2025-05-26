<script setup>
import { ref } from 'vue'

const props = defineProps({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
})

const isOpen = ref(false)

function toggleAccordion() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="faq-item" :class="{ 'active': isOpen }">
    <div class="faq-question" @click="toggleAccordion">
      <h3>{{ question }}</h3>
      <div class="faq-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>
    
    <div class="faq-answer" :style="{ maxHeight: isOpen ? '500px' : '0' }">
      <p>{{ answer }}</p>
    </div>
  </div>
</template>

<style scoped>
.faq-item {
  background-color: var(--pastel-blue);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  margin-bottom: var(--spacing-md);
  transition: all 0.3s ease;
}

.faq-item.active {
  box-shadow: var(--shadow-md);
}

.faq-question {
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.faq-question h3 {
  font-size: var(--font-size-md);
  font-weight: 600;
  margin: 0;
  color: var(--text-color);
}

.faq-icon {
  transition: transform 0.3s ease;
}

.faq-item.active .faq-icon {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer p {
  padding: 0 var(--spacing-lg) var(--spacing-md);
  color: var(--text-color);
}
</style>
