<script setup>
const testimonials = [
  {
    id: 1,
    name: 'Carlos Rodríguez',
    company: 'Tech Innovators',
    text: 'Trabajar con Monica fue una experiencia excepcional. Entendió perfectamente nuestras necesidades y entregó un diseño que superó nuestras expectativas. Su atención al detalle y profesionalismo son incomparables.',
    avatar: '@/assets/placeholder-image.svg'
  },
  {
    id: 2,
    name: 'Laura Martínez',
    company: 'Creative Studio',
    text: 'Monica transformó nuestra presencia en línea con un sitio web hermoso y funcional. Su enfoque en la experiencia del usuario ha resultado en un aumento significativo en nuestras conversiones. ¡Altamente recomendada!',
    avatar: '@/assets/placeholder-image.svg'
  },
  {
    id: 3,
    name: 'Javier López',
    company: 'Digital Solutions',
    text: 'La capacidad de Monica para combinar diseño estético con funcionalidad práctica es impresionante. Entregó nuestro proyecto a tiempo y dentro del presupuesto, manteniendo una comunicación clara durante todo el proceso.',
    avatar: '@/assets/placeholder-image.svg'
  }
]

const facts = [
  {
    number: '50+',
    text: 'Proyectos completados'
  },
  {
    number: '30+',
    text: 'Clientes satisfechos'
  },
  {
    number: '5+',
    text: 'Años de experiencia'
  },
  {
    number: '15+',
    text: 'Premios y reconocimientos'
  }
]

const interests = [
  {
    icon: '🏔️',
    title: 'Senderismo',
    description: 'Me encanta explorar nuevas rutas y conectar con la naturaleza.'
  },
  {
    icon: '📷',
    title: 'Fotografía',
    description: 'Capturar momentos y perspectivas únicas a través de mi lente.'
  },
  {
    icon: '📚',
    title: 'Lectura',
    description: 'Disfruto de libros sobre diseño, tecnología y ciencia ficción.'
  },
  {
    icon: '✈️',
    title: 'Viajes',
    description: 'Descubrir nuevas culturas y lugares inspira mi creatividad.'
  }
]
</script>

<template>
  <div class="about-view">
    <section class="hero-section">
      <div class="container">
        <h1>Sobre Mí</h1>
        <p class="hero-description">
          Conoce más sobre mi trayectoria, valores y lo que me apasiona en el mundo del diseño y desarrollo.
        </p>
      </div>
    </section>

    <section class="section about-section">
      <div class="container">
        <div class="about-content">
          <div class="about-images">
            <div class="image-stack">
              <img src="@/assets/placeholder-image.svg" alt="Monica trabajando" class="about-image" />
              <img src="@/assets/placeholder-image.svg" alt="Monica en una conferencia" class="about-image" />
              <img src="@/assets/placeholder-image.svg" alt="Espacio de trabajo de Monica" class="about-image" />
            </div>
          </div>

          <div class="about-text">
            <h2>Mi Historia</h2>
            <p>
              Soy una diseñadora y desarrolladora apasionada con más de 5 años de experiencia creando experiencias digitales que los usuarios adoran. Mi viaje en el mundo digital comenzó cuando estaba en la universidad, donde descubrí mi amor por combinar creatividad con habilidades técnicas.
            </p>
            <p>
              Me especializo en crear diseños centrados en el usuario y convertirlos en sitios web y aplicaciones completamente funcionales. Mi enfoque se centra en entender las necesidades únicas de cada cliente y ofrecer soluciones que no solo se vean geniales, sino que también funcionen excepcionalmente bien.
            </p>
            <p>
              Mi filosofía de diseño se basa en la simplicidad, la funcionalidad y la atención al detalle. Creo que el mejor diseño es aquel que resuelve problemas reales y crea experiencias memorables para los usuarios.
            </p>
            <button class="btn btn-primary">Descargar CV</button>
          </div>
        </div>
      </div>
    </section>

    <section class="section facts-section">
      <div class="container">
        <div class="facts-grid">
          <div
            v-for="(fact, index) in facts"
            :key="index"
            class="fact-card"
          >
            <div class="fact-number">{{ fact.number }}</div>
            <div class="fact-text">{{ fact.text }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section testimonials-section">
      <div class="container">
        <h2 class="section-title">Lo que dicen mis clientes</h2>

        <div class="testimonials-grid">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="testimonial-card"
          >
            <div class="testimonial-content">
              <p class="testimonial-text">{{ testimonial.text }}</p>
              <div class="testimonial-author">
                <img :src="testimonial.avatar" :alt="testimonial.name" class="author-avatar" />
                <div class="author-info">
                  <h3>{{ testimonial.name }}</h3>
                  <p>{{ testimonial.company }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section interests-section">
      <div class="container">
        <h2 class="section-title">Mis Intereses</h2>

        <div class="interests-grid">
          <div
            v-for="(interest, index) in interests"
            :key="index"
            class="interest-card"
          >
            <div class="interest-icon">{{ interest.icon }}</div>
            <h3>{{ interest.title }}</h3>
            <p>{{ interest.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section contact-section">
      <div class="container">
        <div class="contact-content">
          <h2>¿Listo para colaborar?</h2>
          <p>Estoy siempre abierta a nuevas oportunidades y colaboraciones. ¡Contáctame y hablemos sobre tu proyecto!</p>
          <button class="btn btn-primary">Contactar</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-view {
  width: 100%;
}

.hero-section {
  background-color: var(--background-color);
  padding: var(--spacing-xxl) 0;
  text-align: center;
}

.hero-section h1 {
  font-size: var(--font-size-xxxl);
  margin-bottom: var(--spacing-md);
}

.hero-description {
  font-size: var(--font-size-lg);
  color: var(--secondary-color);
  max-width: 800px;
  margin: 0 auto;
}

.about-content {
  display: flex;
  gap: var(--spacing-xl);
  align-items: center;
}

.about-images {
  flex: 1;
}

.image-stack {
  position: relative;
  width: 100%;
  height: 400px;
}

.about-image {
  position: absolute;
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: var(--border-radius-lg);
  border: 5px solid white;
  box-shadow: var(--shadow-md);
}

.about-image:nth-child(1) {
  top: 0;
  left: 0;
  z-index: 3;
  transform: rotate(-5deg);
}

.about-image:nth-child(2) {
  top: 50px;
  left: 100px;
  z-index: 2;
  transform: rotate(5deg);
}

.about-image:nth-child(3) {
  top: 150px;
  left: 50px;
  z-index: 1;
  transform: rotate(-8deg);
}

.about-text {
  flex: 1;
}

.about-text h2 {
  margin-bottom: var(--spacing-md);
}

.about-text p {
  margin-bottom: var(--spacing-md);
}

.facts-section {
  background-color: var(--light-gray);
}

.facts-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
}

.fact-card {
  background-color: white;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.fact-number {
  font-size: var(--font-size-xxl);
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.testimonial-card {
  background-color: white;
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
}

.testimonial-text {
  font-style: italic;
  margin-bottom: var(--spacing-md);
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info h3 {
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-xs);
}

.author-info p {
  font-size: var(--font-size-sm);
  color: var(--secondary-color);
}

.interests-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
}

.interest-card {
  text-align: center;
  padding: var(--spacing-md);
}

.interest-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-sm);
}

.interest-card h3 {
  margin-bottom: var(--spacing-sm);
}

.contact-section {
  background-color: var(--primary-color);
  color: white;
  text-align: center;
  padding: var(--spacing-xl) 0;
}

.contact-content {
  max-width: 800px;
  margin: 0 auto;
}

.contact-content h2 {
  margin-bottom: var(--spacing-md);
}

.contact-content p {
  margin-bottom: var(--spacing-lg);
}

.contact-content .btn {
  background-color: white;
  color: var(--primary-color);
  font-weight: bold;
}

@media (max-width: 992px) {
  .facts-grid,
  .testimonials-grid,
  .interests-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
  }

  .image-stack {
    height: 350px;
    margin-bottom: var(--spacing-lg);
  }

  .facts-grid,
  .testimonials-grid,
  .interests-grid {
    grid-template-columns: 1fr;
  }
}
</style>
