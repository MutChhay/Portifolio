<script setup>
import { computed } from 'vue'
import * as Lucide from 'lucide-vue-next'
import skills from '../data/skills'

const iconMap = {
  MonitorSmartphone: Lucide.MonitorSmartphone,
  Layers3: Lucide.Layers3,
  Code2: Lucide.Code2,
  Type: Lucide.Type,
  FileCode2: Lucide.FileCode2,
  Palette: Lucide.Palette,
  Sparkles: Lucide.Sparkles,
  ServerCog: Lucide.ServerCog,
  Binary: Lucide.Binary,
  Waypoints: Lucide.Waypoints,
  Database: Lucide.Database,
  Smartphone: Lucide.Smartphone,
  GitBranch: Lucide.GitBranch,
  Github: Lucide.Github,
  Send: Lucide.Send,
  Container: Lucide.Container,
  TerminalSquare: Lucide.TerminalSquare,
  ScanSearch: Lucide.ScanSearch,
  BrainCircuit: Lucide.BrainCircuit,
}

const groupedSkills = computed(() => skills)
</script>

<template>
  <section id="skills" class="section skills-section">
    <div class="container">
      <div class="section-heading reveal">
        <p class="section-kicker">TECH STACK</p>
      </div>

      <div class="skills-groups">
        <div v-for="group in groupedSkills" :key="group.group" class="skill-group reveal">
          <h3>{{ group.group }}</h3>
          <div class="skill-grid">
            <article v-for="skill in group.items" :key="skill.name" class="skill-card cursor-target">
              <div class="skill-icon">
                <component :is="iconMap[skill.icon]" :size="22" />
              </div>
              <div>
                <h4>{{ skill.name }}</h4>
                <p>{{ skill.description }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
