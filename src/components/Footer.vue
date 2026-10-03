<script setup>
import { Github, Linkedin, Mail } from 'lucide-vue-next'

const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Contact']
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-shell">
      <div class="footer-brand">
        <div class="brand">MC</div>
        <p>Mut Chhay — Software Developer</p>
      </div>

      <nav class="footer-nav" aria-label="Footer navigation">
        <a v-for="link in navLinks" :key="link" :href="`#${link.toLowerCase()}`">{{ link }}</a>
      </nav>

      <div class="footer-socials">
        <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
          <Github :size="18" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <Linkedin :size="18" />
        </a>
        <a href="mailto:mutchhay.dev@gmail.com" aria-label="Email">
          <Mail :size="18" />
        </a>
      </div>
    </div>

    <div class="container footer-bottom">
      <span>© 2026 Mut Chhay. All rights reserved.</span>
    </div>
  </footer>
</template>
