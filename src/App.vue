<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import CustomCursor from './components/CustomCursor.vue'
import ScrollProgress from './components/ScrollProgress.vue'

const showLoader = ref(true)
let loaderTimer

onMounted(() => {
  loaderTimer = window.setTimeout(() => {
    showLoader.value = false
  }, 450)
})

onBeforeUnmount(() => {
  window.clearTimeout(loaderTimer)
})
</script>

<template>
  <div class="app-shell">
    <Transition name="loader-fade">
      <div v-if="showLoader" class="page-loader" aria-label="Mut Chhay, Software Developer">
        <span class="loader-mark">MC.</span>
        <span class="loader-name">MUT CHHAY</span>
        <span class="loader-role">SOFTWARE DEVELOPER</span>
      </div>
    </Transition>

    <ScrollProgress />
    <CustomCursor />

    <router-view v-slot="{ Component }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
