<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const isDesktop = ref(false)
const active = ref(false)
const showLabel = ref(false)
const label = ref('')
const cursor = ref(null)
let cursorX = 0
let cursorY = 0
let targetX = 0
let targetY = 0
let animationFrame = 0

const updateCursor = (event) => {
  targetX = event.clientX
  targetY = event.clientY
  if (!animationFrame) animationFrame = requestAnimationFrame(animateCursor)
}

const animateCursor = () => {
  cursorX += (targetX - cursorX) * 0.22
  cursorY += (targetY - cursorY) * 0.22
  if (cursor.value) cursor.value.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`

  if (Math.abs(targetX - cursorX) > 0.1 || Math.abs(targetY - cursorY) > 0.1) {
    animationFrame = requestAnimationFrame(animateCursor)
  } else {
    animationFrame = 0
  }
}

const handleHoverStart = (event) => {
  const target = event.currentTarget
  active.value = true

  if (target.closest('.hero-art')) {
    label.value = 'EXPLORE'
    showLabel.value = true
  } else if (target.closest('.project-card') || target.closest('.primary-button')) {
    label.value = 'VIEW'
    showLabel.value = true
  } else {
    label.value = ''
    showLabel.value = false
  }
}

const handleHoverEnd = () => {
  active.value = false
  showLabel.value = false
  label.value = ''
}

onMounted(() => {
  const pointerFine = window.matchMedia('(pointer: fine)').matches
  const mobile = window.matchMedia('(max-width: 767px)').matches
  isDesktop.value = pointerFine && !mobile

  if (!isDesktop.value) return

  document.addEventListener('pointermove', updateCursor)
  document.querySelectorAll('.cursor-target, .project-card, a, button').forEach((element) => {
    element.addEventListener('mouseenter', handleHoverStart)
    element.addEventListener('mouseleave', handleHoverEnd)
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('pointermove', updateCursor)
  cancelAnimationFrame(animationFrame)
  document.querySelectorAll('.cursor-target, .project-card, a, button').forEach((element) => {
    element.removeEventListener('mouseenter', handleHoverStart)
    element.removeEventListener('mouseleave', handleHoverEnd)
  })
})
</script>

<template>
  <div
    v-if="isDesktop"
    ref="cursor"
    class="custom-cursor"
    :class="{ 'is-active': active, 'is-view': showLabel }"
  >
    <span v-if="showLabel">{{ label }}</span>
  </div>
</template>
