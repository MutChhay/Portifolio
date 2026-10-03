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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
  renderer.setClearColor(0x000000, 0)

  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0x080808, 6, 18)

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
  camera.position.set(0, 0, 6.5)

  const root = new THREE.Group()
  scene.add(root)

  const ambient = new THREE.AmbientLight(0xb7c9ff, 1.2)
  scene.add(ambient)

  const pointLight = new THREE.PointLight(0x6d5dfc, 2.8, 30)
  pointLight.position.set(2.5, 2.5, 5)
  scene.add(pointLight)

  const cyanLight = new THREE.PointLight(0x00c6ff, 2.4, 25)
  cyanLight.position.set(-3, -2, 4)
  scene.add(cyanLight)

  const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3)
  const innerGeometry = new THREE.OctahedronGeometry(0.8)
  const materialA = new THREE.MeshPhysicalMaterial({
    color: 0x98a0ff,
    transparent: true,
    opacity: 0.58,
    metalness: 0.15,
    roughness: 0.15,
    transmission: 0.6,
    thickness: 1.3,
    clearcoat: 1,
    emissive: 0x0a102f,
  })

  const materialB = new THREE.MeshPhysicalMaterial({
    color: 0x53d6ff,
    transparent: true,
    opacity: 0.42,
    metalness: 0.2,
    roughness: 0.25,
    transmission: 0.4,
    thickness: 1,
    clearcoat: 1,
    emissive: 0x071625,
  })

  const central = new THREE.Mesh(geometry, materialA)
  central.scale.set(1.2, 1.2, 1.2)
  root.add(central)

  const orbit = new THREE.Mesh(innerGeometry, materialB)
  orbit.scale.set(1.45, 1.45, 1.45)
  root.add(orbit)

  const accent = new THREE.Mesh(new THREE.TorusKnotGeometry(0.9, 0.18, 160, 24), materialB)
  accent.scale.set(0.85, 0.85, 0.85)
  accent.rotation.x = 1.1
  accent.rotation.y = 0.9
  root.add(accent)

  const particleCount = 140
  const pointsGeometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 8
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8
  }

  pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const particles = new THREE.Points(
    pointsGeometry,
    new THREE.PointsMaterial({
      color: 0xc7d5ff,
      size: 0.03,
      transparent: true,
      opacity: 0.8,
    }),
  )
  scene.add(particles)

  const pointer = { x: 0, y: 0 }
  const handlePointerMove = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  window.addEventListener('pointermove', handlePointerMove)

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
    root.rotation.y += 0.0045
    root.rotation.x = THREE.MathUtils.lerp(root.rotation.x, pointer.y * 0.7, 0.05)
    root.rotation.z = THREE.MathUtils.lerp(root.rotation.z, pointer.x * 0.45, 0.05)
    orbit.rotation.x = time * 1.2
    orbit.rotation.y = time * 1.5
    accent.rotation.z = time * 0.8
    particles.rotation.y += 0.0008
    particles.rotation.x = 0.35
    renderer.render(scene, camera)
    animationFrame = requestAnimationFrame(tick)
  }

  tick()

  onBeforeUnmount(() => {
    cancelAnimationFrame(animationFrame)
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('resize', resize)
    renderer.dispose()
    geometry.dispose()
    innerGeometry.dispose()
    pointsGeometry.dispose()
    materialA.dispose()
    materialB.dispose()
  })
})
</script>

<template>
  <div class="three-scene-shell">
    <canvas ref="canvasRef" aria-label="Abstract 3D portfolio object" />
  </div>
</template>
