<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { ArrowDown, ArrowRight, MapPin } from 'lucide-vue-next'
import heroImage from '../assets/hero.png'

const heroArt = ref(null)
const characterScroll = ref(null)
const processedHeroImage = ref(heroImage)
let pointerFrame = 0
let pointerTargetX = 0
let pointerTargetY = 0
let pointerX = 0
let pointerY = 0
let magneticFrame = 0
let magneticTargetX = 0
let magneticTargetY = 0
let magneticX = 0
let magneticY = 0
let magneticButton = null
let scrollFrame = 0

const removeBlueBackground = (source) => {
  const image = new Image()

  image.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(image, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const { data } = imageData

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const brightnessGap = b - Math.max(r, g)

      const isStudioBlue = b > 170 && r < 165 && g < 165 && brightnessGap > 20

      if (isStudioBlue) {
        data[i + 3] = 0
      }
    }

    ctx.putImageData(imageData, 0, 0)
    processedHeroImage.value = canvas.toDataURL('image/png')
  }

  image.src = source
}

const onPointerMove = (event) => {
  if (!heroArt.value) return

  const rect = heroArt.value.getBoundingClientRect()
  pointerTargetX = ((event.clientX - rect.left) / rect.width - 0.5) * -10
  pointerTargetY = ((event.clientY - rect.top) / rect.height - 0.5) * 8

  if (!pointerFrame) pointerFrame = requestAnimationFrame(animatePointer)
}

const onPointerLeave = () => {
  pointerTargetX = 0
  pointerTargetY = 0
  if (!pointerFrame) pointerFrame = requestAnimationFrame(animatePointer)
}

const animatePointer = () => {
  pointerX += (pointerTargetX - pointerX) * 0.08
  pointerY += (pointerTargetY - pointerY) * 0.08

  if (heroArt.value) {
    heroArt.value.style.setProperty('--tilt-x', `${pointerX.toFixed(2)}deg`)
    heroArt.value.style.setProperty('--tilt-y', `${pointerY.toFixed(2)}deg`)
  }

  if (Math.abs(pointerTargetX - pointerX) > 0.02 || Math.abs(pointerTargetY - pointerY) > 0.02) {
    pointerFrame = requestAnimationFrame(animatePointer)
  } else {
    pointerFrame = 0
  }
}

const onMagneticMove = (event) => {
  const button = event.target.closest('.magnetic-button')
  if (magneticButton && magneticButton !== button) {
    magneticButton.style.setProperty('--magnetic-x', '0px')
    magneticButton.style.setProperty('--magnetic-y', '0px')
  }

  magneticButton = button
  if (!button) {
    magneticTargetX = 0
    magneticTargetY = 0
  } else {
    const rect = button.getBoundingClientRect()
    magneticTargetX = ((event.clientX - rect.left) / rect.width - 0.5) * 20
    magneticTargetY = ((event.clientY - rect.top) / rect.height - 0.5) * 20
  }

  if (!magneticFrame) magneticFrame = requestAnimationFrame(animateMagnetic)
}

const onMagneticLeave = () => {
  magneticTargetX = 0
  magneticTargetY = 0
  if (!magneticFrame) magneticFrame = requestAnimationFrame(animateMagnetic)
}

const animateMagnetic = () => {
  magneticX += (magneticTargetX - magneticX) * 0.2
  magneticY += (magneticTargetY - magneticY) * 0.2
  magneticButton?.style.setProperty('--magnetic-x', `${magneticX.toFixed(2)}px`)
  magneticButton?.style.setProperty('--magnetic-y', `${magneticY.toFixed(2)}px`)

  if (Math.abs(magneticTargetX - magneticX) > 0.1 || Math.abs(magneticTargetY - magneticY) > 0.1) {
    magneticFrame = requestAnimationFrame(animateMagnetic)
  } else {
    magneticButton?.style.setProperty('--magnetic-x', '0px')
    magneticButton?.style.setProperty('--magnetic-y', '0px')
    magneticButton = null
    magneticFrame = 0
  }
}

const updateCharacterScroll = () => {
  if (!characterScroll.value) return

  const hero = characterScroll.value.closest('.hero-section')
  if (!hero) return

  const progress = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / (window.innerHeight * 1.15)))
  characterScroll.value.style.setProperty('--character-x', `${progress * -34}px`)
  characterScroll.value.style.setProperty('--character-y', `${progress * 24}px`)
  characterScroll.value.style.setProperty('--character-scale', `${1 - progress * 0.12}`)
  characterScroll.value.style.setProperty('--character-opacity', `${1 - progress * 0.35}`)
  scrollFrame = 0
}

const onScroll = () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateCharacterScroll)
}

onMounted(() => {
  if (!heroArt.value) return
  heroArt.value.addEventListener('pointermove', onPointerMove)
  heroArt.value.addEventListener('pointerleave', onPointerLeave)
  heroArt.value.closest('.hero-grid')?.addEventListener('pointermove', onMagneticMove)
  heroArt.value.closest('.hero-grid')?.addEventListener('pointerleave', onMagneticLeave)
  window.addEventListener('scroll', onScroll, { passive: true })
  updateCharacterScroll()
  removeBlueBackground(heroImage)
})

onBeforeUnmount(() => {
  if (!heroArt.value) return
  heroArt.value.removeEventListener('pointermove', onPointerMove)
  heroArt.value.removeEventListener('pointerleave', onPointerLeave)
  heroArt.value.closest('.hero-grid')?.removeEventListener('pointermove', onMagneticMove)
  heroArt.value.closest('.hero-grid')?.removeEventListener('pointerleave', onMagneticLeave)
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(pointerFrame)
  cancelAnimationFrame(magneticFrame)
  cancelAnimationFrame(scrollFrame)
})
</script>

<template>
  <section id="home" class="hero-section section">
    <div class="hero-glow" aria-hidden="true" />
    <div class="hero-grid container">
      <div class="hero-copy reveal">
        <div class="status-pill">
          <span class="status-dot" />
          <span>Available for opportunities</span>
        </div>

        <p class="eyebrow">SOFTWARE DEVELOPER</p>

        <h1 aria-label="HI, I'M MUT CHHAY.">
          <span class="hero-word">HI,</span>
          <span class="hero-word">I'M</span>
          <span class="hero-word">MUT CHHAY.</span>
        </h1>

        <p class="hero-subtitle">BUILDING DIGITAL EXPERIENCES.</p>

        <p class="hero-text">
          I build modern web applications, e-commerce platforms, APIs, and practical software solutions.
        </p>

        <div class="hero-actions">
          <a href="#projects" class="primary-button cursor-target magnetic-button">
            <span>VIEW MY WORK</span>
            <ArrowRight :size="18" />
          </a>
          <a href="#contact" class="secondary-button cursor-target magnetic-button">
            <span>CONTACT ME</span>
          </a>
        </div>
      </div>

      <div class="hero-visual reveal">
        <div ref="heroArt" class="hero-art cursor-target" aria-label="Mut Chhay profile visual">
          <div class="ambient-ring ambient-ring-one" aria-hidden="true" />
          <div class="ambient-ring ambient-ring-two" aria-hidden="true" />

          <span class="floating-tag tag-one">Vue.js</span>
          <span class="floating-tag tag-two">Laravel</span>
          <span class="floating-tag tag-three">MySQL</span>
          <span class="floating-tag tag-four">REST API</span>
          <span class="floating-tag tag-five">Git</span>
          <span class="floating-tag tag-six">AI</span>

          <div class="identity-card">
            <span class="identity-name">MUT CHHAY</span>
            <span class="identity-role">Software Developer</span>
            <span class="identity-location">
              <MapPin :size="13" />
              Cambodia
            </span>
          </div>

          <div ref="characterScroll" class="character-scroll">
            <div class="profile-shell">
              <img :src="processedHeroImage" alt="Mut Chhay profile character" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <a href="#about" class="scroll-indicator cursor-target">
      <span>SCROLL TO EXPLORE</span>
      <ArrowDown :size="18" />
    </a>
  </section>
</template>
