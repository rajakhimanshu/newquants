import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReducedMotion } from '../../lib/gsap'

/** Contained 3D research mark — limited stage, subtle pointer parallax. */
export function LabOrbit() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduced = prefersReducedMotion()

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
    camera.position.set(0, 0.08, 4.15)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 0.92))
    const key = new THREE.DirectionalLight(0xffffff, 0.7)
    key.position.set(3, 4, 2)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0x1d4ed8, 0.18)
    rim.position.set(-2.5, -1, 1.5)
    scene.add(rim)

    const group = new THREE.Group()
    scene.add(group)

    const coreGeo = new THREE.IcosahedronGeometry(0.56, 1)
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0f0f0f,
      metalness: 0.4,
      roughness: 0.32,
      flatShading: true,
    })
    group.add(new THREE.Mesh(coreGeo, coreMat))

    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.92, 1)),
      new THREE.LineBasicMaterial({ color: 0x1d4ed8, transparent: true, opacity: 0.55 }),
    )
    group.add(wire)

    const ringGeo = new THREE.TorusGeometry(1.48, 0.012, 12, 140)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0f0f0f,
      transparent: true,
      opacity: 0.28,
    })
    const ringA = new THREE.Mesh(ringGeo, ringMat)
    ringA.rotation.x = Math.PI / 2.4
    group.add(ringA)

    const ringB = new THREE.Mesh(ringGeo, ringMat.clone())
    ringB.rotation.x = Math.PI / 1.7
    ringB.rotation.y = 0.5
    group.add(ringB)

    const nodes: THREE.Mesh[] = []
    const nodeGeo = new THREE.SphereGeometry(0.055, 14, 14)
    for (let i = 0; i < 12; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: i % 3 === 0 ? 0x1d4ed8 : 0x0f0f0f,
        metalness: 0.22,
        roughness: 0.42,
      })
      const node = new THREE.Mesh(nodeGeo, mat)
      const phi = Math.acos(-1 + (2 * i) / 12)
      const theta = Math.sqrt(12 * Math.PI) * phi
      node.position.setFromSphericalCoords(1.48, phi, theta)
      nodes.push(node)
      group.add(node)
    }

    const particles = new THREE.BufferGeometry()
    const count = 140
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 1.75 + Math.random() * 0.95
      const a = Math.random() * Math.PI * 2
      const b = (Math.random() - 0.5) * Math.PI
      positions[i * 3] = r * Math.cos(a) * Math.cos(b)
      positions[i * 3 + 1] = r * Math.sin(b) * 0.5
      positions[i * 3 + 2] = r * Math.sin(a) * Math.cos(b)
    }
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    group.add(
      new THREE.Points(
        particles,
        new THREE.PointsMaterial({
          color: 0x1d4ed8,
          size: 0.022,
          transparent: true,
          opacity: 0.42,
        }),
      ),
    )

    const pointer = { x: 0, y: 0 }
    const onPointer = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect()
      pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    mount.addEventListener('pointermove', onPointer)

    const resize = () => {
      const w = mount.clientWidth || 1
      const h = mount.clientHeight || 1
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }
    resize()

    let raf = 0
    const clock = new THREE.Clock()
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      if (!reduced) {
        group.rotation.y = t * 0.16 + pointer.x * 0.25
        group.rotation.x = Math.sin(t * 0.26) * 0.07 + pointer.y * 0.18
        wire.rotation.y = -t * 0.11
        ringA.rotation.z = t * 0.16
        ringB.rotation.z = -t * 0.12
        nodes.forEach((node, i) => {
          node.scale.setScalar(1 + Math.sin(t * 1.7 + i) * 0.09)
        })
      }
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      mount.removeEventListener('pointermove', onPointer)
      renderer.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      nodeGeo.dispose()
      ringGeo.dispose()
      particles.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="h-full w-full bg-transparent [&_canvas]:h-full [&_canvas]:w-full"
      aria-hidden="true"
    />
  )
}
