<script setup>
import ExperienceCard from '../components/ExperienceCard.vue'

const experiences = [
  { 
    id: 1, 
    title: 'UX/UI Designer', 
    company: 'Creative Solutions', 
    period: '2020 - Present', 
    description: 'Led the design of multiple web and mobile applications, collaborating with cross-functional teams to deliver user-centered solutions that increased engagement by 40%.', 
    color: 'blue',
    responsibilities: [
      'Diseño de interfaces de usuario para aplicaciones web y móviles',
      'Creación de prototipos interactivos y wireframes',
      'Realización de pruebas de usabilidad y análisis de resultados',
      'Colaboración con equipos de desarrollo para implementar diseños',
      'Mantenimiento de sistemas de diseño y documentación'
    ]
  },
  { 
    id: 2, 
    title: 'Senior Web Developer', 
    company: 'Digital Agency', 
    period: '2018 - 2020', 
    description: 'Developed responsive websites and web applications for clients across various industries, implementing best practices in performance and accessibility.', 
    color: 'yellow',
    responsibilities: [
      'Desarrollo frontend con HTML, CSS, JavaScript y frameworks modernos',
      'Implementación de diseños responsivos y accesibles',
      'Optimización de rendimiento y velocidad de carga',
      'Integración con APIs y servicios de terceros',
      'Mentorización de desarrolladores junior'
    ]
  },
  { 
    id: 3, 
    title: 'Graphic Designer', 
    company: 'Creative Studio', 
    period: '2016 - 2018', 
    description: 'Created visual identities, marketing materials, and digital assets for brands, maintaining consistent design language across multiple platforms.', 
    color: 'pink',
    responsibilities: [
      'Diseño de identidades visuales y logotipos',
      'Creación de materiales de marketing impreso y digital',
      'Diseño de publicaciones para redes sociales',
      'Edición de fotografías e imágenes',
      'Preparación de archivos para impresión y producción'
    ]
  }
]

const skills = [
  {
    category: 'Diseño',
    items: ['UI/UX Design', 'Wireframing', 'Prototyping', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator']
  },
  {
    category: 'Desarrollo Frontend',
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Responsive Design']
  },
  {
    category: 'Desarrollo Backend',
    items: ['Node.js', 'Express', 'PHP', 'Laravel', 'MySQL', 'MongoDB', 'RESTful APIs', 'GraphQL']
  },
  {
    category: 'Herramientas y Otros',
    items: ['Git', 'GitHub', 'VS Code', 'Webpack', 'Jest', 'Cypress', 'CI/CD', 'Agile/Scrum']
  }
]

const education = [
  {
    degree: 'Master en Diseño de Experiencia de Usuario',
    institution: 'Universidad de Diseño',
    year: '2018'
  },
  {
    degree: 'Licenciatura en Diseño Gráfico',
    institution: 'Universidad Creativa',
    year: '2016'
  },
  {
    degree: 'Certificación en Desarrollo Web Full Stack',
    institution: 'Academia de Código',
    year: '2017'
  }
]
</script>

<template>
  <div class="experience-view">
    <section class="hero-section">
      <div class="container">
        <h1>Mi Experiencia</h1>
        <p class="hero-description">
          Con más de 5 años de experiencia en diseño y desarrollo, he trabajado en una variedad de proyectos para clientes de diferentes industrias.
        </p>
      </div>
    </section>
    
    <section class="section work-experience">
      <div class="container">
        <h2 class="section-title">Experiencia Laboral</h2>
        
        <div class="experience-timeline">
          <ExperienceCard 
            v-for="experience in experiences" 
            :key="experience.id" 
            :title="experience.title" 
            :company="experience.company" 
            :period="experience.period" 
            :description="experience.description" 
            :color="experience.color"
          />
        </div>
      </div>
    </section>
    
    <section class="section skills-section">
      <div class="container">
        <h2 class="section-title">Habilidades</h2>
        
        <div class="skills-container">
          <div 
            v-for="(skillGroup, index) in skills" 
            :key="index" 
            class="skill-group"
          >
            <h3>{{ skillGroup.category }}</h3>
            <div class="skill-tags">
              <span 
                v-for="(skill, skillIndex) in skillGroup.items" 
                :key="skillIndex" 
                class="skill-tag"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="section education-section">
      <div class="container">
        <h2 class="section-title">Educación</h2>
        
        <div class="education-container">
          <div 
            v-for="(edu, index) in education" 
            :key="index" 
            class="education-card"
          >
            <div class="education-year">{{ edu.year }}</div>
            <div class="education-details">
              <h3>{{ edu.degree }}</h3>
              <p>{{ edu.institution }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>¿Interesado en trabajar juntos?</h2>
          <p>Descarga mi CV completo o contáctame para discutir tu proyecto.</p>
          <div class="cta-buttons">
            <button class="btn btn-primary">Descargar CV</button>
            <button class="btn btn-secondary">Contactar</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.experience-view {
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

.experience-timeline {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-xl);
}

.skill-group h3 {
  margin-bottom: var(--spacing-md);
  color: var(--primary-color);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.skill-tag {
  background-color: var(--pastel-blue);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
}

.education-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.education-card {
  display: flex;
  gap: var(--spacing-lg);
  padding: var(--spacing-md);
  background-color: white;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
}

.education-year {
  font-weight: bold;
  color: var(--primary-color);
  min-width: 80px;
}

.education-details h3 {
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

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
}

.cta-buttons .btn-primary {
  background-color: white;
  color: var(--primary-color);
}

.cta-buttons .btn-secondary {
  background-color: transparent;
  color: white;
  border: 1px solid white;
}

@media (max-width: 768px) {
  .skills-container {
    grid-template-columns: 1fr;
  }
  
  .education-card {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
}
</style>
