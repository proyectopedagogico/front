<script setup>
// No se necesitan importaciones por ahora
</script>

<template>
  <footer class="footer">
    <div class="social-icons">
      <a href="#" class="icon">X</a>
      <a href="#" class="icon">IG</a>
      <a href="#" class="icon">FB</a>
    </div>
    <button class="contact-btn">Contacto</button>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #000;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  bottom: 0;
  width: 100%;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.icon {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.contact-btn {
  background-color: white;
  color: black;
  border: none;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
}
</style>
