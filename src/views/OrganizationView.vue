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
            <h3>{{ t('views.organization.values_title') }}</h3>
            <ul class="values-list">
              <li><strong>{{ t('views.values.v1_title') }}:</strong> {{ t('views.values.v1_text') }}</li>
              <li><strong>{{ t('views.values.v2_title') }}:</strong> {{ t('views.values.v2_text') }}</li>
              <li><strong>{{ t('views.values.v3_title') }}:</strong> {{ t('views.values.v3_text') }}</li>
              <li><strong>{{ t('views.values.v4_title') }}:</strong> {{ t('views.values.v4_text') }}</li>
              <li><strong>{{ t('views.values.v5_title') }}:</strong> {{ t('views.values.v5_text') }}</li>
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
    <h2 class="section-title">{{ t('views.team.title') }}</h2>

    <div class="team-grid">
      <div class="team-card">
        <div class="member-image">
          <img src="@/assets/placeholder-image.svg" :alt="t('views.team.member1.name')" />
        </div>
        <div class="member-info">
          <h3>{{ t('views.team.member1.name') }}</h3>
          <p class="member-role">{{ t('views.team.member1.role') }}</p>
          <p class="member-bio">{{ t('views.team.member1.bio') }}</p>
        </div>
      </div>

      <div class="team-card">
        <div class="member-image">
          <img src="@/assets/placeholder-image.svg" :alt="t('views.team.member2.name')" />
        </div>
        <div class="member-info">
          <h3>{{ t('views.team.member2.name') }}</h3>
          <p class="member-role">{{ t('views.team.member2.role') }}</p>
          <p class="member-bio">{{ t('views.team.member2.bio') }}</p>
        </div>
      </div>
    </div>
  </div>
</section>

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