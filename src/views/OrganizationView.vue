<script setup>
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import { useLanguageStore } from '@/stores/languageStore'

const { t, locale } = useI18n()
const languageStore = useLanguageStore()

onMounted(() => {
  languageStore.init()
  locale.value = languageStore.currentLanguage
})

const teamMembers = [
  {
    id: 1,
    name: 'María González',
    role: 'Directora',
    bio: 'Fundadora del proyecto con más de 15 años de experiencia en el ámbito social y defensa de los derechos laborales de las mujeres.',
    image: '@/assets/placeholder-image.svg'
  },
  {
    id: 2,
    name: 'Laura Rodríguez',
    role: 'Coordinadora de Proyectos',
    bio: 'Especialista en gestión de proyectos sociales con enfoque de género. Ha trabajado en diversas organizaciones internacionales.',
    image: '@/assets/placeholder-image.svg'
  },
  {
    id: 3,
    name: 'Carmen Martínez',
    role: 'Responsable de Comunicación',
    bio: 'Periodista con experiencia en medios digitales y comunicación social. Especializada en narrativas digitales y storytelling.',
    image: '@/assets/placeholder-image.svg'
  },
  {
    id: 4,
    name: 'Ana López',
    role: 'Investigadora',
    bio: 'Socióloga especializada en estudios de género y trabajo. Ha publicado diversos artículos sobre la situación laboral de las mujeres.',
    image: '@/assets/placeholder-image.svg'
  }
]

// const partners = [
//   {
//     id: 1,
//     name: 'Fundación Mujeres',
//     logo: '@/assets/placeholder-image.svg',
//     description: 'Organización sin ánimo de lucro que trabaja por la igualdad de oportunidades entre mujeres y hombres.'
//   },
//   {
//     id: 2,
//     name: 'Instituto de la Mujer',
//     logo: '@/assets/placeholder-image.svg',
//     description: 'Organismo autónomo que promueve y fomenta la igualdad de ambos sexos, facilitando las condiciones para la participación efectiva de las mujeres en la vida política, cultural, económica y social.'
//   },
//   {
//     id: 3,
//     name: 'ONU Mujeres',
//     logo: '@/assets/placeholder-image.svg',
//     description: 'Entidad de las Naciones Unidas para la Igualdad de Género y el Empoderamiento de las Mujeres.'
//   }
// ]

// const milestones = [
//   {
//     year: '2018',
//     title: 'Fundación del proyecto',
//     description: 'Inicio del proyecto con un pequeño grupo de voluntarias comprometidas con visibilizar las historias de mujeres trabajadoras.'
//   },
//   {
//     year: '2019',
//     title: 'Primera exposición',
//     description: 'Realización de la primera exposición fotográfica "Mujeres en el trabajo" que recorrió varias ciudades.'
//   },
//   {
//     year: '2020',
//     title: 'Lanzamiento de la plataforma digital',
//     description: 'Creación de la web para ampliar el alcance del proyecto y llegar a más personas.'
//   },
//   {
//     year: '2021',
//     title: 'Publicación del libro',
//     description: 'Edición del libro "Historias que inspiran" con una recopilación de las historias más destacadas.'
//   },
//   {
//     year: '2022',
//     title: 'Expansión internacional',
//     description: 'El proyecto comienza a recopilar historias de mujeres trabajadoras de diferentes países.'
//   }
// ]
</script>

<template>
  <div class="organization-view">
    <section class="hero-section">
      <div class="container">
        <h1>{{ t('views.organization.title') }}</h1>
        <p class="hero-description">
          {{ t('views.organization.description') }}
        </p>
      </div>
    </section>

    <section class="section mission-section">
      <div class="container">
        <div class="mission-content">
          <div class="mission-text">
            <h2 class="section-title">{{ t('views.organization.mission_title') }}</h2>
            <p>{{ t('views.organization.mission_text')}}
            </p>
            <h3>{{ t('views.organization.values_title')}}</h3>
            <ul class="values-list">
              <li><strong>Respeto:</strong> Valoramos la diversidad de experiencias y perspectivas.</li>
              <li><strong>Inclusión:</strong> Trabajamos para representar a mujeres de todos los orígenes y condiciones.</li>
              <li><strong>Empoderamiento:</strong> Creemos en la capacidad transformadora de las historias personales.</li>
              <li><strong>Colaboración:</strong> Construimos redes de apoyo entre mujeres y organizaciones.</li>
              <li><strong>Transparencia:</strong> Actuamos con honestidad y claridad en todas nuestras acciones.</li>
            </ul>
          </div>
          <div class="mission-image">
            <img src="@/assets/images/Texto_Mujeres.png" alt="Misión y Visión" />
          </div>
        </div>
      </div>
    </section>

    <section class="section team-section">
      <div class="container">
        <h2 class="section-title">{{ t('views.organization.team_title')}}</h2>

        <div class="team-grid">
          <div
            v-for="member in teamMembers"
            :key="member.id"
            class="team-card"
          >
            <div class="member-image">
              <img :src="member.image" :alt="member.name" />
            </div>
            <div class="member-info">
              <h3>{{ member.name }}</h3>
              <p class="member-role">{{ member.role }}</p>
              <p class="member-bio">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <section class="section timeline-section">
      <div class="container">
        <h2 class="section-title">Nuestra Historia</h2>

        <div class="timeline">
          <div
            v-for="(milestone, index) in milestones"
            :key="index"
            class="timeline-item"
          >
            <div class="timeline-year">{{ milestone.year }}</div>
            <div class="timeline-content">
              <h3>{{ milestone.title }}</h3>
              <p>{{ milestone.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section partners-section">
      <div class="container">
        <h2 class="section-title">Colaboradores</h2>

        <div class="partners-grid">
          <div
            v-for="partner in partners"
            :key="partner.id"
            class="partner-card"
          >
            <div class="partner-logo">
              <img :src="partner.logo" :alt="partner.name" />
            </div>
            <h3>{{ partner.name }}</h3>
            <p>{{ partner.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section contact-section">
      <div class="container">
        <div class="contact-content">
          <h2>¿Quieres colaborar con nosotras?</h2>
          <p>Si quieres formar parte de este proyecto o colaborar de alguna manera, no dudes en contactarnos.</p>
          <button class="btn btn-primary">Contactar</button>
        </div>
      </div>
    </section> -->
  </div>
</template>

<style scoped>
.organization-view {
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

.mission-content {
  display: flex;
  gap: var(--spacing-xl);
  align-items: center;
}

.mission-text {
  flex: 3;
}

.mission-text p {
  margin-bottom: var(--spacing-md);
}

.mission-text h3 {
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

.values-list {
  padding-left: var(--spacing-lg);
}

.values-list li {
  margin-bottom: var(--spacing-sm);
}

.mission-image {
  flex: 2;
  background-color: #5db898;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  rotate: -5deg;
}

.mission-image img {
  width: 100%;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}

.team-section {
  background-color: var(--light-gray);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.team-card {
  display: flex;
  background-color: white;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.member-image {
  flex: 1;
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-info {
  flex: 2;
  padding: var(--spacing-md);
}

.member-info h3 {
  margin-bottom: var(--spacing-xs);
}

.member-role {
  color: var(--secondary-color);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  width: 2px;
  background-color: var(--primary-color);
  top: 0;
  bottom: 0;
  left: 50px;
  margin-left: -1px;
}

.timeline-item {
  padding: var(--spacing-md) 0 var(--spacing-md) 70px;
  position: relative;
}

.timeline-year {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 0;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.timeline-content {
  background-color: white;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
}

.timeline-content h3 {
  margin-bottom: var(--spacing-sm);
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.partner-card {
  background-color: white;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.partner-logo {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
}

.partner-logo img {
  max-width: 100%;
  max-height: 100%;
}

.partner-card h3 {
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
  .team-grid,
  .partners-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .mission-content {
    flex-direction: column;
  }

  .team-grid,
  .partners-grid {
    grid-template-columns: 1fr;
  }

  .team-card {
    flex-direction: column;
  }

  .member-image {
    height: 200px;
  }
}
</style>
