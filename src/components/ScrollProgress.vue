<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const progress = ref(0)

const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  progress.value = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<template>
  <div class="scroll-progress" aria-hidden="true">
    <div class="scroll-progress-bar" :style="{ transform: `scaleX(${progress / 100})` }" />
  </div>
</template>
