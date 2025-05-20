<script setup>
import { useStoryStore } from '../stores/storyStore'
import StoryCard from '../components/StoryCard.vue'
import ServiceCard from '../components/ServiceCard.vue'
import ExperienceCard from '../components/ExperienceCard.vue'
import FaqItem from '../components/FaqItem.vue'
import { computed } from 'vue'

const storyStore = useStoryStore()
const featuredProjects = computed(() => storyStore.getLatestStories)

// Datos de ejemplo para las secciones
const services = [
  { id: 1, title: 'Diseño web', color: 'pink', icon: 'design' },
  { id: 2, title: 'Desarrollo', color: 'yellow', icon: 'code' },
  { id: 3, title: 'Marketing', color: 'blue', icon: 'marketing' },
  { id: 4, title: 'Consultoría', color: 'mint', icon: 'consulting' }
]

const experiences = [
  {
    id: 1,
    title: 'UX/UI Designer',
    company: 'Creative Solutions',
    period: '2020 - Present',
    description: 'Led the design of multiple web and mobile applications, collaborating with cross-functional teams to deliver user-centered solutions that increased engagement by 40%.',
    color: 'blue'
  },
  {
    id: 2,
    title: 'Senior Web Developer',
    company: 'Digital Agency',
    period: '2018 - 2020',
    description: 'Developed responsive websites and web applications for clients across various industries, implementing best practices in performance and accessibility.',
    color: 'yellow'
  },
  {
    id: 3,
    title: 'Graphic Designer',
    company: 'Creative Studio',
    period: '2016 - 2018',
    description: 'Created visual identities, marketing materials, and digital assets for brands, maintaining consistent design language across multiple platforms.',
    color: 'pink'
  }
]

const faqs = [
  {
    id: 1,
    question: 'What services do you offer?',
    answer: 'I offer a range of services including web design, development, branding, and digital marketing. Each service is tailored to meet your specific needs and goals.'
  },
  {
    id: 2,
    question: 'How do you charge for projects?',
    answer: 'I typically work on a project basis with a fixed price quote after understanding your requirements. For ongoing work, I also offer monthly retainer packages.'
  },
  {
    id: 3,
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary depending on scope and complexity. A simple website might take 2-4 weeks, while more complex projects can take 2-3 months or more.'
  },
  {
    id: 4,
    question: 'Can you help with ongoing maintenance?',
    answer: 'Yes, I offer maintenance packages to keep your website secure, updated, and performing optimally after launch.'
  }
]
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <p class="intro-text">Hi, I'm Monica</p>
            <h1>Bringing your digital vision to life with creative design</h1>
            <p class="hero-description">
              I'm a designer and developer specializing in creating beautiful, functional websites and applications that help businesses grow and succeed in the digital world.
            </p>
            <div class="hero-buttons">
              <button class="btn btn-primary">View My Work</button>
              <button class="btn btn-secondary">Contact Me</button>
            </div>
            <div class="social-links">
              <a href="#" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="hero-image">
            <img src="@/assets/placeholder-image.svg" alt="Monica - Designer and Developer" />
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="section featured-projects-section">
      <div class="container">
        <h2 class="section-title">Featured Projects</h2>

        <div class="projects-grid">
          <StoryCard
            v-for="project in featuredProjects"
            :key="project.id"
            :title="project.name"
            :color="project.color"
            :icon="project.color === 'orange' ? 'sun' : project.color === 'black' ? 'bolt' : 'wave'"
            :buttonText="project.buttonText"
            :link="`/historias/${project.id}`"
          />
        </div>

        <div class="section-footer">
          <button class="btn btn-secondary" @click="$router.push('/historias')">View All Projects</button>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="section services-section">
      <div class="container">
        <h2 class="section-title">My Services</h2>

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

    <!-- Experience Section -->
    <section class="section experience-section">
      <div class="container">
        <h2 class="section-title">My Experience</h2>

        <div class="experience-grid">
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

    <!-- About Me Section -->
    <section class="section about-section">
      <div class="container">
        <h2 class="section-title">About Me</h2>

        <div class="about-content">
          <div class="about-images">
            <div class="image-stack">
              <img src="@/assets/placeholder-image.svg" alt="Monica working" class="about-image" />
              <img src="@/assets/placeholder-image.svg" alt="Monica at a conference" class="about-image" />
              <img src="@/assets/placeholder-image.svg" alt="Monica's workspace" class="about-image" />
            </div>
          </div>

          <div class="about-text">
            <p>
              I'm a passionate designer and developer with over 5 years of experience creating digital experiences that users love. My journey in the digital world started when I was in college, where I discovered my love for combining creativity with technical skills.
            </p>
            <p>
              I specialize in creating user-centered designs and turning them into fully functional websites and applications. My approach focuses on understanding the unique needs of each client and delivering solutions that not only look great but also perform exceptionally well.
            </p>
            <p>
              When I'm not designing or coding, you can find me exploring new hiking trails, experimenting with photography, or attending local tech meetups to stay connected with the community.
            </p>
            <button class="btn btn-primary">Download Resume</button>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section faq-section">
      <div class="container">
        <h2 class="section-title">FAQ</h2>

        <div class="faq-container">
          <FaqItem
            v-for="faq in faqs"
            :key="faq.id"
            :question="faq.question"
            :answer="faq.answer"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
}

/* Hero Section */
.hero-section {
  padding: var(--spacing-xl) 0;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
}

.hero-text {
  flex: 1;
}

.intro-text {
  font-size: var(--font-size-lg);
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
  color: var(--secondary-color);
}

.hero-text h1 {
  font-size: var(--font-size-xxxl);
  line-height: 1.2;
  margin-bottom: var(--spacing-lg);
}

.hero-description {
  font-size: var(--font-size-lg);
  color: var(--secondary-color);
  margin-bottom: var(--spacing-lg);
  max-width: 600px;
}

.hero-buttons {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.social-links {
  display: flex;
  gap: var(--spacing-md);
}

.social-link {
  color: var(--secondary-color);
  transition: color 0.3s ease;
}

.social-link:hover {
  color: var(--primary-color);
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image img {
  max-width: 100%;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
}

/* Featured Projects Section */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

/* Services Section */
.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

/* Experience Section */
.experience-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* About Section */
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

.about-text p {
  margin-bottom: var(--spacing-md);
}

/* FAQ Section */
.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

/* Section Footer */
.section-footer {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-lg);
}

/* Responsive */
@media (max-width: 992px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-content {
    flex-direction: column-reverse;
  }

  .hero-text h1 {
    font-size: var(--font-size-xxl);
  }

  .projects-grid,
  .services-grid {
    grid-template-columns: 1fr;
  }

  .about-content {
    flex-direction: column;
  }

  .image-stack {
    height: 350px;
    margin-bottom: var(--spacing-lg);
  }
}
</style>
