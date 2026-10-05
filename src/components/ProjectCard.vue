<script setup>
import { ArrowUpRight, Github } from 'lucide-vue-next'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const pointerMove = (event) => {
  const card = event.currentTarget
  const visual = card.querySelector('.project-visual')
  if (!visual) return

  const rect = visual.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100

  visual.style.setProperty('--pointer-x', `${x}%`)
  visual.style.setProperty('--pointer-y', `${y}%`)
}
</script>

<template>
  <article class="project-card reveal cursor-target" @mousemove="pointerMove">
    <div
      class="project-visual"
      :style="project.image ? { backgroundImage: `linear-gradient(135deg, rgba(9, 10, 16, 0.54), rgba(9, 10, 16, 0.16)), url(${project.image})` } : {}"
    >
      <video
        v-if="project.video"
        class="project-video"
        :src="project.video"
        :poster="project.image"
        :aria-label="`Demo video for ${project.title}`"
        autoplay
        muted
        loop
        playsinline
        controls
        preload="metadata"
      ></video>
      <div v-else class="project-overlay">
        <span>VIEW PROJECT →</span>
      </div>
    </div>

    <div class="project-body">
      <div class="project-meta">
        <p class="project-category">{{ project.category }}</p>
        <span class="project-index">0{{ project.id }}</span>
      </div>

      <h3>{{ project.title }}</h3>
      <p class="project-description">{{ project.description }}</p>

      <div class="project-techs">
        <span v-for="item in project.technologies" :key="item">{{ item }}</span>
      </div>

      <ul class="feature-list">
        <li v-for="feature in project.features.slice(0, 4)" :key="feature">{{ feature }}</li>
      </ul>

      <div class="project-actions">
        <a :href="project.live" target="_blank" rel="noreferrer" class="primary-button small-btn cursor-target">
          <span>View Project</span>
          <ArrowUpRight :size="16" />
        </a>
        <a :href="project.github" target="_blank" rel="noreferrer" class="secondary-button small-btn cursor-target">
          <span>GitHub</span>
          <Github :size="16" />
        </a>
      </div>
    </div>
  </article>
</template>
