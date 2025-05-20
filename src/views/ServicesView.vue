<script setup>
import ServiceCard from '../components/ServiceCard.vue'

const services = [
  { id: 1, title: 'Diseño web', color: 'pink', icon: 'design' },
  { id: 2, title: 'Desarrollo', color: 'yellow', icon: 'code' },
  { id: 3, title: 'Marketing', color: 'blue', icon: 'marketing' },
  { id: 4, title: 'Consultoría', color: 'mint', icon: 'consulting' }
]

const serviceDetails = [
  {
    id: 1,
    title: 'Diseño web',
    description: 'Creo diseños web atractivos y funcionales que capturan la esencia de tu marca y ofrecen una experiencia de usuario excepcional. Mis diseños son responsivos, accesibles y optimizados para convertir visitantes en clientes.',
    features: [
      'Diseño de interfaces de usuario (UI)',
      'Experiencia de usuario (UX)',
      'Wireframing y prototipos',
      'Diseño responsivo',
      'Optimización de conversión'
    ]
  },
  {
    id: 2,
    title: 'Desarrollo',
    description: 'Transformo diseños en sitios web y aplicaciones funcionales utilizando las últimas tecnologías y mejores prácticas. Mi código es limpio, mantenible y optimizado para un rendimiento excepcional.',
    features: [
      'Desarrollo frontend (HTML, CSS, JavaScript)',
      'Frameworks modernos (React, Vue, Angular)',
      'Desarrollo backend (Node.js, PHP)',
      'Bases de datos (MySQL, MongoDB)',
      'Optimización de rendimiento'
    ]
  },
  {
    id: 3,
    title: 'Marketing',
    description: 'Ayudo a las empresas a aumentar su visibilidad en línea y atraer más clientes a través de estrategias de marketing digital efectivas y personalizadas para sus objetivos específicos.',
    features: [
      'SEO (Optimización para motores de búsqueda)',
      'Marketing de contenidos',
      'Email marketing',
      'Redes sociales',
      'Análisis y reportes'
    ]
  },
  {
    id: 4,
    title: 'Consultoría',
    description: 'Ofrezco asesoramiento experto para ayudarte a tomar decisiones informadas sobre tu presencia digital, tecnología y estrategias de marketing para maximizar tu retorno de inversión.',
    features: [
      'Auditorías de sitios web',
      'Estrategia digital',
      'Optimización de procesos',
      'Selección de tecnología',
      'Formación y capacitación'
    ]
  }
]
</script>

<template>
  <div class="services-view">
    <section class="hero-section">
      <div class="container">
        <h1>Mis Servicios</h1>
        <p class="hero-description">
          Ofrezco una gama completa de servicios digitales para ayudar a tu negocio a crecer y destacar en el mundo digital.
        </p>
      </div>
    </section>
    
    <section class="section services-overview">
      <div class="container">
        <div class="services-grid">
          <ServiceCard 
            v-for="service in services" 
            :key="service.id" 
            :title="service.title" 
            :color="service.color" 
            :icon="service.icon"
          />
        </div>
      </div>
    </section>
    
    <section class="section service-details">
      <div class="container">
        <div 
          v-for="service in serviceDetails" 
          :key="service.id" 
          class="service-detail-card"
        >
          <h2>{{ service.title }}</h2>
          <p>{{ service.description }}</p>
          
          <h3>Características</h3>
          <ul class="feature-list">
            <li v-for="(feature, index) in service.features" :key="index">
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </section>
    
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>¿Listo para empezar tu proyecto?</h2>
          <p>Contáctame hoy para discutir cómo puedo ayudarte a alcanzar tus objetivos digitales.</p>
          <button class="btn btn-primary">Contactar</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.services-view {
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

.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.service-details {
  background-color: var(--light-gray);
}

.service-detail-card {
  background-color: white;
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: var(--shadow-md);
}

.service-detail-card h2 {
  margin-bottom: var(--spacing-md);
  color: var(--primary-color);
}

.service-detail-card p {
  margin-bottom: var(--spacing-md);
}

.service-detail-card h3 {
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-lg);
}

.feature-list {
  padding-left: var(--spacing-lg);
}

.feature-list li {
  margin-bottom: var(--spacing-xs);
}

.cta-section {
  background-color: var(--primary-color);
  color: white;
  text-align: center;
  padding: var(--spacing-xl) 0;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-content h2 {
  margin-bottom: var(--spacing-md);
}

.cta-content p {
  margin-bottom: var(--spacing-lg);
}

.cta-content .btn {
  background-color: white;
  color: var(--primary-color);
  font-weight: bold;
  padding: var(--spacing-sm) var(--spacing-lg);
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
