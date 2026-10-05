<script setup>
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-vue-next'
</script>

<template>
  <section id="contact" class="section contact-section">
    <div class="container contact-shell reveal">
      <div class="contact-copy">
        <p class="section-kicker">LET'S WORK TOGETHER</p>
        <h2 aria-label="LET'S BUILD SOMETHING.">
          <span>LET'S BUILD</span>
          <span>SOMETHING.</span>
        </h2>
        <p>
          Have a project, opportunity, or idea? Let's create something useful and meaningful.
        </p>
      </div>

      <div class="contact-actions">
        <a href="mutchhay123@gmail.com" class="primary-button cursor-target magnetic-button contact-primary">
          <span>Email Me</span>
          <Mail :size="18" />
        </a>
        <a href="https://github.com/MutChhay" target="_blank" rel="noreferrer" class="secondary-button cursor-target">
          <span>GitHub</span>
          <Github :size="18" />
        </a>
        <a href="https://www.linkedin.com/in/mut-chhay-b95433431/" target="_blank" rel="noreferrer" class="secondary-button cursor-target">
          <span>LinkedIn</span>
          <Linkedin :size="18" />
        </a>
      </div>

      <div class="contact-meta">
        <div>
          <p class="meta-label">Name</p>
          <h3>Mut Chhay</h3>
        </div>
        <div>
          <p class="meta-label">Role</p>
          <h3>Software Developer</h3>
        </div>
        <div>
          <p class="meta-label">Location</p>
          <h3>Cambodia</h3>
        </div>
      </div>
    </div>
  </section>
</template>
