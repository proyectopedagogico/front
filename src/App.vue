<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="app-container">
    <Navbar />
    <main class="content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
/* Estilos globales */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 1rem;
}

/* Variables de colores */
:root {
  --primary-color: #00c2cb;
  --secondary-color: #ff6b6b;
  --text-color: #333;
  --background-color: #f5f5f5;
}
</style>
