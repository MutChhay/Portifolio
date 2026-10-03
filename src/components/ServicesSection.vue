<script setup>
const services = [
  {
    number: '01',
    title: 'Web Development',
    text: 'Building responsive and modern web applications using Vue.js, JavaScript, Laravel, and REST APIs.',
  },
  {
    number: '02',
    title: 'Backend Development',
    text: 'Designing APIs, authentication systems, databases, and backend services with Laravel and MySQL.',
  },
  {
    number: '03',
    title: 'E-Commerce Development',
    text: 'Building practical online shopping systems with product management, carts, orders, accounts, and payment workflows.',
  },
  {
    number: '04',
    title: 'Software Testing',
    text: 'Testing applications through functional testing, API testing, regression testing, and structured test cases.',
  },
]
</script>

<template>
  <section class="section services-section">
    <div class="container">
      <div class="section-heading reveal">
        <p class="section-kicker">WHAT I DO</p>
      </div>

      <div class="service-grid">
        <article v-for="service in services" :key="service.number" class="service-card reveal cursor-target">
          <div class="service-number">{{ service.number }}</div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
