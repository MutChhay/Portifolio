<script setup>
import projects from '../data/projects'
import ProjectCard from './ProjectCard.vue'
</script>

<template>
  <section id="projects" class="section projects-section">
    <div class="container">
      <div class="section-heading reveal">
        <p class="section-kicker">SELECTED WORK</p>
      </div>

      <div class="projects-stack">
        <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
      </div>
    </div>
  </section>
</template>
