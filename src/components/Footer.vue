<script setup>
// No se necesitan importaciones por ahora
</script>

<template>
  <footer class="footer">
    <div class="footer-cta">
      <h2>¿Quieres compartir tu historia?</h2>
      <p>Únete a nuestro proyecto y ayúdanos a visibilizar las experiencias de las mujeres trabajadoras.</p>
      <button class="btn btn-primary">Contactar</button>
    </div>

    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <span class="logo-text">Mujeres Trabajadoras</span>
          <p>Historias que inspiran</p>
        </div>

        <div class="footer-links">
          <div class="footer-links-column">
            <h3>Navegación</h3>
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/historias">Historias</a></li>
              <li><a href="/organizacion">Organización</a></li>
            </ul>
          </div>

          <div class="footer-links-column">
            <h3>Legal</h3>
            <ul>
              <li><a href="/privacidad">Política de privacidad</a></li>
              <li><a href="/terminos">Términos de servicio</a></li>
            </ul>
          </div>

          <div class="footer-links-column">
            <h3>Social</h3>
            <div class="social-icons">
              <a href="#" class="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" class="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2023 Mujeres Trabajadoras. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #000;
  color: white;
  padding-bottom: var(--spacing-lg);
}

.footer-cta {
  background-color: #000;
  color: white;
  text-align: center;
  padding: var(--spacing-xl) var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.footer-cta h2 {
  font-size: var(--font-size-xxl);
  margin-bottom: var(--spacing-md);
}

.footer-cta p {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-lg);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.footer-cta .btn {
  padding: 0.75rem 2rem;
  font-size: var(--font-size-md);
  background-color: white;
  color: black;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-xl);
}

.footer-logo {
  flex: 1;
}

.footer-logo .logo-text {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  display: block;
}

.footer-logo p {
  color: var(--gray);
  max-width: 300px;
}

.footer-links {
  flex: 2;
  display: flex;
  justify-content: space-around;
}

.footer-links-column h3 {
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-md);
  color: white;
}

.footer-links-column ul {
  list-style: none;
  padding: 0;
}

.footer-links-column ul li {
  margin-bottom: var(--spacing-sm);
}

.footer-links-column ul li a {
  color: var(--gray);
  transition: color 0.3s ease;
}

.footer-links-column ul li a:hover {
  color: white;
}

.social-icons {
  display: flex;
  gap: var(--spacing-md);
}

.social-icon {
  color: white;
  transition: opacity 0.3s ease;
}

.social-icon:hover {
  opacity: 0.8;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: var(--spacing-md);
  text-align: center;
  color: var(--gray);
  font-size: var(--font-size-sm);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  .footer-links {
    flex-direction: column;
    gap: var(--spacing-lg);
  }
}
</style>
