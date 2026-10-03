<script setup>
import experience from '../data/experience'
</script>

<template>
  <section id="experience" class="section experience-section">
    <div class="container">
      <div class="section-heading reveal">
        <p class="section-kicker">EXPERIENCE</p>
      </div>

      <div class="timeline">
        <article v-for="item in experience" :key="item.id" class="timeline-item reveal">
          <div class="timeline-dot" aria-hidden="true" />
          <div class="timeline-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <div class="focus-list">
              <span v-for="focus in item.focus" :key="focus">{{ focus }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
