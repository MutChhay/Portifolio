<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { ArrowUpRight, Menu, X } from 'lucide-vue-next'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const isMenuOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('home')

const navClass = computed(() => ({ 'site-nav--scrolled': scrolled.value }))

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const setActiveSection = () => {
  const sections = navLinks
    .map((link) => document.querySelector(link.href))
    .filter(Boolean)

  const viewportMid = window.innerHeight * 0.4

  let current = 'home'

  for (const section of sections) {
    const top = section.getBoundingClientRect().top
    if (top <= viewportMid) {
      current = section.id
    }
  }

  activeSection.value = current
}

onMounted(() => {
  handleScroll()
  setActiveSection()
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('scroll', setActiveSection)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('scroll', setActiveSection)
})
</script>

<template>
  <header class="site-nav-wrap">
    <nav :class="['site-nav', navClass]">
      <a href="#home" class="brand" aria-label="Mut Chhay home">
        <span>CHHAY</span>
      </a>

      <div class="nav-desktop" aria-label="Main navigation">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          :class="['nav-link', { 'is-active': activeSection === link.href.slice(1) }]"
          @click="closeMenu"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="nav-actions">
        <a href="#contact" class="talk-button">
          <span>Let's Talk</span>
          <ArrowUpRight :size="16" />
        </a>

        <button
          class="menu-button"
          type="button"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle navigation"
          @click="isMenuOpen = !isMenuOpen"
        >
          <Menu v-if="!isMenuOpen" :size="18" />
          <X v-else :size="18" />
        </button>
      </div>
    </nav>

    <transition name="menu-fade">
      <div v-if="isMenuOpen" class="mobile-menu" aria-label="Mobile menu">
        <div class="mobile-menu-panel">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            :class="['mobile-link', { 'is-active': activeSection === link.href.slice(1) }]"
            @click="closeMenu"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>
