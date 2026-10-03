<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const showreel = ref(null)
const video = ref(null)
const isVisible = ref(false)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
let observer

const setPlayback = async (visible) => {
  isVisible.value = visible && !prefersReducedMotion

  if (!video.value) return
  if (isVisible.value) {
    try {
      await video.value.play()
    } catch {
      isVisible.value = false
    }
  } else {
    video.value.pause()
  }
}

onMounted(() => {
  if (!showreel.value || !('IntersectionObserver' in window)) return

  observer = new IntersectionObserver(
    ([entry]) => setPlayback(entry.isIntersecting),
    { threshold: 0.3 },
  )
  observer.observe(showreel.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  video.value?.pause()
})
</script>

<template>
  <section id="showreel" ref="showreel" class="section showreel-section">
    <div class="container showreel-shell reveal">
      <div class="showreel-heading">
        <p class="section-kicker">BEHIND THE WORK</p>
        <h2>SEE IT IN ACTION.</h2>
      </div>

      <div class="showreel-frame">
        <video
          ref="video"
          :autoplay="isVisible"
          muted
          loop
          playsinline
          preload="none"
          aria-label="Developer working at a computer"
        >
          <source
            src="https://videos.pexels.com/video-files/39006644/16598110_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <a
        class="showreel-credit"
        href="https://www.pexels.com/video/programmer-typing-code-in-modern-workspace-39006644/"
        target="_blank"
        rel="noreferrer"
      >
        Footage: Jakub Zerdzicki / Pexels
      </a>
    </div>
  </section>
</template>
