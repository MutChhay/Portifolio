<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import ProjectSection from '../components/ProjectSection.vue'
import ShowreelSection from '../components/ShowreelSection.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import ThreeDSection from '../components/ThreeDSection.vue'
import ContactSection from '../components/ContactSection.vue'
import Footer from '../components/Footer.vue'

let observer = null

onMounted(() => {
  const revealItems = document.querySelectorAll('.reveal')

  if (!revealItems.length) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.12,
    },
  )

  revealItems.forEach((item) => observer.observe(item))
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div class="page-shell">
    <Navbar />

    <main class="site-main">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectSection />
      <ShowreelSection />
      <ExperienceSection />
      <ServicesSection />
      <ThreeDSection />
      <ContactSection />
    </main>

    <Footer />
  </div>
</template>
