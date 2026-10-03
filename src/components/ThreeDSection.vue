<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

const canvasRef = ref(null)

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768
  if (!canvasRef.value || prefersReducedMotion) {
    return
  }

  const canvas = canvasRef.value
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setClearColor(0x000000, 0)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
  camera.position.set(0, 0, 8)

  const root = new THREE.Group()
  scene.add(root)

  const ambient = new THREE.AmbientLight(0xdfe6ff, 1.3)
  scene.add(ambient)

  const point = new THREE.PointLight(0x6d5dfc, 2, 32)
  point.position.set(3, 3, 5)
  scene.add(point)

  const panelMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x9bb3ff,
    transparent: true,
    opacity: 0.38,
    emissive: 0x121a36,
    roughness: 0.2,
    metalness: 0.2,
    transmission: 0.15,
    thickness: 0.9,
    clearcoat: 1,
  })

  const laptop = new THREE.Mesh(new THREE.BoxGeometry(3, 2.1, 0.42), panelMaterial)
  laptop.position.y = -0.2
  root.add(laptop)

  const screen = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.6, 0.12), new THREE.MeshPhysicalMaterial({
    color: 0x5ee4ff,
    emissive: 0x0b1b29,
    transparent: true,
    opacity: 0.75,
    metalness: 0.18,
    roughness: 0.25,
    transmission: 0.45,
    clearcoat: 1,
  }))
  screen.position.set(0, 0.2, 0.25)
  root.add(screen)

  const labels = ['Vue.js', 'Laravel', 'MySQL', 'REST API', 'Git', 'AI']
  const labelMeshes = []

  labels.forEach((item, index) => {
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(0.9, 0.35),
      new THREE.MeshBasicMaterial({
        color: index % 2 === 0 ? 0xb8d0ff : 0x8ae9ff,
        transparent: true,
        opacity: 0.9,
      }),
    )

    label.position.set(
      (index % 3) * 1.05 - 1.05,
      Math.floor(index / 3) * 0.8 - 0.2,
      0.6,
    )
    labelMeshes.push(label)
    root.add(label)
  })

  const pointer = { x: 0, y: 0 }
  const handlePointer = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  window.addEventListener('pointermove', handlePointer)

  const resize = () => {
    const { clientWidth, clientHeight } = canvas
    const ratio = Math.min(window.devicePixelRatio, 2)
    renderer.setSize(clientWidth, clientHeight, false)
    renderer.setPixelRatio(ratio)
    camera.aspect = clientWidth / clientHeight
    camera.updateProjectionMatrix()
  }

  resize()
  window.addEventListener('resize', resize)

  let animationFrame = 0
  const tick = () => {
    const time = performance.now() * 0.001
    root.rotation.y += 0.006
    root.rotation.x = THREE.MathUtils.lerp(root.rotation.x, pointer.y * 0.8, 0.06)
    root.rotation.z = THREE.MathUtils.lerp(root.rotation.z, pointer.x * 0.7, 0.06)
    labelMeshes.forEach((mesh, index) => {
      mesh.position.z = 0.6 + Math.sin(time * 2 + index) * 0.12
      mesh.rotation.y = time * 0.5 + index * 0.5
    })

    renderer.render(scene, camera)
    animationFrame = requestAnimationFrame(tick)
  }

  tick()

  onBeforeUnmount(() => {
    cancelAnimationFrame(animationFrame)
    window.removeEventListener('pointermove', handlePointer)
    window.removeEventListener('resize', resize)
    renderer.dispose()
  })
})
</script>

<template>
  <section class="section build-section" id="build">
    <div class="container build-shell reveal">
      <div class="build-copy">
        <p class="section-kicker">NEW IDEAS</p>
        <h2>LET'S BUILD SOMETHING</h2>
      </div>
      <div class="build-visual">
        <canvas ref="canvasRef" aria-label="Interactive 3D portfolio workstation" />
      </div>
    </div>
  </section>
</template>
