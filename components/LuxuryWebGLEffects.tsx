'use client'

import { useRef, useMemo, useState, memo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Mesh, Group, Vector3 } from 'three'

const LuxuryWebGLEffects = memo(function LuxuryWebGLEffects() {
  const crystalsGroupRef = useRef<Group>(null)
  const floatingBRef = useRef<Group>(null)
  // Shared refs for all B logos to enable collision detection
  const allBLogosRef = useRef<Map<number, Mesh>>(new Map())
  // Shared refs for all leaves to enable collision detection
  const allLeavesRef = useRef<Map<string, Mesh>>(new Map())
  // Shared refs for all buttons to enable collision detection
  const allButtonsRef = useRef<Map<number, Mesh>>(new Map())

  // Crystal Formations with Light Refraction
  const CrystalFormations = () => {
    const geometry = useMemo(() => new THREE.OctahedronGeometry(0.5, 0), [])
    const baseMaterial = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: '#d4c5a0',
        emissive: '#d4c5a0',
        transparent: true,
        opacity: 0.8,
        metalness: 0.9,
        roughness: 0.1,
        emissiveIntensity: 0.4,
      })
    }, [])

    useFrame(({ clock }) => {
      if (!crystalsGroupRef.current) return
      const time = clock.getElapsedTime()
      crystalsGroupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          child.rotation.y = time * 0.3 + i * 0.5
          child.rotation.x = Math.sin(time * 0.5 + i) * 0.3
          const scale = 0.5 + Math.sin(time * 0.8 + i) * 0.2
          child.scale.setScalar(scale)
          
          // Light refraction effect
          const material = child.material as THREE.MeshStandardMaterial
          if (material) {
            material.emissiveIntensity = Math.sin(time + i) * 0.3 + 0.5
            material.opacity = 0.7 + Math.sin(time * 0.7 + i) * 0.2
          }
        }
      })
    })

    return (
      <group ref={crystalsGroupRef}>
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const radius = 2.5 + Math.sin(i) * 0.8
          const material = baseMaterial.clone()
          return (
            <mesh
              key={i}
              geometry={geometry}
              material={material}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 2) * 1.2,
                Math.sin(angle) * radius
              ]}
            />
          )
        })}
      </group>
    )
  }

  // Floating Gold Dust Particles (3D Spheres)
  const GoldDustParticles = () => {
    const particlesData = useMemo(() => {
      const count = 450 // Increased gold dust particles for luxurious effect
      const particles: Array<{
        position: [number, number, number]
        velocity: [number, number, number]
        size: number
      }> = []
      
      for (let i = 0; i < count; i++) {
        // Spread particles evenly across the page, with more focus on bottom
        // Use a more even distribution to avoid clustering
        const angle = (i / count) * Math.PI * 2
        const radius = Math.random() * 12 + 2 // Spread from center outward
        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 4 // Wide horizontal spread
        const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 6 // Depth spread
        // Focus more particles at the bottom of the page
        const y = -4.5 + Math.random() * 4 // More particles concentrated at bottom
        
        particles.push({
          position: [x, y, z],
          velocity: [
            (Math.random() - 0.5) * 0.0008,
            Math.random() * 0.0025 + 0.002, // Increased upward velocity
            (Math.random() - 0.5) * 0.0008
          ],
          size: Math.random() * 0.08 + 0.05
        })
      }
      
      return particles
    }, [])

    const sphereGeometry = useMemo(() => new THREE.SphereGeometry(0.08, 12, 12), [])
    const baseMaterial = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: '#d4c5a0',
        emissive: '#d4c5a0',
        emissiveIntensity: 0.7, // Increased for more luxurious glow
        metalness: 0.8, // More metallic luxury feel
        roughness: 0.15, // More polished
        transparent: true,
        opacity: 0.7, // Slightly more visible
      })
    }, [])

    const groupRef = useRef<Group>(null)

    useFrame(({ clock }) => {
      if (!groupRef.current) return
      const time = clock.getElapsedTime()
      
      groupRef.current.children.forEach((child, i) => {
        if (!(child instanceof THREE.Mesh)) return
        
        const particle = particlesData[i]
        if (!particle) return
        
        const velocity = particle.velocity
        const pos = child.position
        
        // Floating motion - more upward movement
        pos.x += velocity[0] + Math.sin(time + pos.y) * 0.0002
        pos.y += velocity[1] + Math.cos(time + pos.x) * 0.0005 // Increased upward drift
        pos.z += velocity[2] + Math.sin(time * 0.3 + pos.x) * 0.0002
        
        // Keep particles in visible range, resetting to bottom when they go too high
        if (pos.y < -5) {
          pos.y = -4.5 + Math.random() * 2 // Reset to bottom area
        }
        if (pos.y > 3) {
          pos.y = -4.5 + Math.random() * 2 // Allow particles to go higher before reset
        }
        
        // Reset particles that drift too far horizontally - wider reset range
        if (Math.abs(pos.x) > 10) {
          pos.x = (Math.random() - 0.5) * 14
        }
        if (Math.abs(pos.z) > 6) {
          pos.z = (Math.random() - 0.5) * 8
        }
        
        // Subtle rotation for 3D effect
        child.rotation.x += 0.001
        child.rotation.y += 0.001
        
        // Subtle pulsing opacity - more subtle
        const mat = child.material as THREE.MeshStandardMaterial
        if (mat) {
          mat.opacity = 0.5 + Math.sin(time * 0.5 + i) * 0.1
          mat.emissiveIntensity = 0.4 + Math.sin(time * 0.7 + i) * 0.15
        }
      })
    })

    return (
      <group ref={groupRef}>
        {particlesData.map((particle, i) => (
          <mesh
            key={i}
            geometry={sphereGeometry}
            material={baseMaterial.clone()}
            position={particle.position}
            scale={particle.size}
          />
        ))}
      </group>
    )
  }

  // Floating 3D "B" Letter from uploaded image
  const FloatingB = () => {
    const bMeshRef = useRef<Mesh>(null)
    const startY = useRef(4.5) // Start above BOUTALLION
    const startTime = useRef(0)
    const [textureLoaded, setTextureLoaded] = useState(false)
    const [textureError, setTextureError] = useState(false)
    
    // Load the B logo texture - try multiple possible filenames
    const texture = useMemo(() => {
      const loader = new THREE.TextureLoader()
      const possiblePaths = ['/logo.png', '/logo-b.png', '/logo-b.jpg', '/b-logo.png', '/b.png', '/B.png']
      
      let currentIndex = 0
      let loaded = false
      const tryLoadNext = () => {
        if (currentIndex >= possiblePaths.length) {
          if (!loaded) {
            setTextureError(true)
          }
          return
        }
        
        const path = possiblePaths[currentIndex]
        loader.load(
          path,
          () => {
            // Success callback - only set state once
            if (!loaded) {
              loaded = true
              // Use requestAnimationFrame to batch state update
              requestAnimationFrame(() => setTextureLoaded(true))
            }
          },
          undefined,
          () => {
            // Error callback - try next path
            currentIndex++
            tryLoadNext()
          }
        )
      }
      
      const tex = loader.load(possiblePaths[0], () => {
        if (!loaded) {
          loaded = true
          requestAnimationFrame(() => setTextureLoaded(true))
        }
      }, undefined, tryLoadNext)
      return tex
    }, [])

    useFrame(({ clock }) => {
      if (!bMeshRef.current || !textureLoaded) return
      const time = clock.getElapsedTime()
      
      if (startTime.current === 0) {
        startTime.current = time
      }
      
      const elapsed = time - startTime.current
      
      // Float downward slowly - Pattern 1: Slow circular motion (from above)
      bMeshRef.current.position.y = startY.current - elapsed * 0.02 // Float downward slowly
      
      // Circular motion pattern - wide slow circle (slower)
      bMeshRef.current.rotation.y = Math.sin(time * 0.15) * 0.1
      bMeshRef.current.rotation.x = Math.cos(time * 0.1) * 0.05
      bMeshRef.current.position.x = Math.sin(time * 0.2) * 0.8
      bMeshRef.current.position.z = Math.cos(time * 0.2) * 0.6
      
      // Collision detection - keep B logos apart (minimum distance 3.5)
      const minDistance = 3.5
      allBLogosRef.current.forEach((otherB) => {
        if (otherB === bMeshRef.current || !otherB || !bMeshRef.current) return // Skip self
        
        const dx = bMeshRef.current.position.x - otherB.position.x
        const dy = bMeshRef.current.position.y - otherB.position.y
        const dz = bMeshRef.current.position.z - otherB.position.z
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
        
        if (distance < minDistance && distance > 0) {
          const pushStrength = (minDistance - distance) / minDistance * 0.15
          bMeshRef.current.position.x += dx / distance * pushStrength
          bMeshRef.current.position.y += dy / distance * pushStrength
          bMeshRef.current.position.z += dz / distance * pushStrength
        }
      })
      
      // Reset when it goes too low
      if (bMeshRef.current.position.y < -4) {
        bMeshRef.current.position.y = startY.current
        startTime.current = time
      }
      
      // Subtle scale pulsing
      const scale = 1 + Math.sin(time * 0.5) * 0.05
      bMeshRef.current.scale.setScalar(scale)
      
      // Animate material properties for shiny reflection effect
      const mat = bMeshRef.current.material as THREE.MeshStandardMaterial
      if (mat) {
        // Pulsing emissive intensity for glow effect
        mat.emissiveIntensity = 0.3 + Math.sin(time * 1.5) * 0.2
        
        // Subtle roughness variation for light reflection movement
        mat.roughness = 0.05 + Math.sin(time * 0.8) * 0.05
      }
    })

    // Material with the B logo texture - shiny with reflections
    const bMaterial = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95,
        emissive: '#d4c5a0',
        emissiveIntensity: 0.3,
        metalness: 0.95,
        roughness: 0.1,
        side: THREE.DoubleSide,
        envMapIntensity: 1.5,
      })
    }, [texture])

    // Calculate aspect ratio from texture (default to square if not loaded)
    const aspectRatio = textureLoaded && texture.image && texture.image.width && texture.image.height 
      ? texture.image.width / texture.image.height 
      : 1

    // Don't render if texture hasn't loaded or if there was an error
    if (!textureLoaded || textureError) return null

    return (
      <mesh 
        ref={(el) => {
          bMeshRef.current = el
          if (el) {
            allBLogosRef.current.set(0, el)
          }
        }}
        position={[0, 4.5, 0]}
        material={bMaterial}
      >
        <planeGeometry args={[aspectRatio * 1.5, 1.5]} />
      </mesh>
    )
  }

  // Additional smaller B logos - spread more across page
  const FloatingBSmall1 = () => {
    const bMeshRef = useRef<Mesh>(null)
    const startY = useRef(-3)
    const startTime = useRef(0)
    const [textureLoaded, setTextureLoaded] = useState(false)
    
    const texture = useMemo(() => {
      const loader = new THREE.TextureLoader()
      const tex = loader.load(
        '/logo.png',
        () => requestAnimationFrame(() => setTextureLoaded(true)),
        undefined,
        () => {}
      )
      return tex
    }, [])

    useFrame(({ clock }) => {
      if (!bMeshRef.current || !textureLoaded) return
      const time = clock.getElapsedTime()
      
      if (startTime.current === 0) {
        startTime.current = time
      }
      
      const       elapsed = time - startTime.current
      // Pattern 2: Left side, figure-8 motion (slower)
      bMeshRef.current.position.y = startY.current + elapsed * 0.018 // Much slower upward
      bMeshRef.current.position.x = -5.5 + Math.sin(time * 0.18) * 1.2 + Math.cos(time * 0.25) * 0.6
      bMeshRef.current.position.z = 1.5 + Math.cos(time * 0.15) * 0.8 + Math.sin(time * 0.2) * 0.4
      bMeshRef.current.rotation.y = Math.sin(time * 0.12) * 0.12
      bMeshRef.current.rotation.x = Math.cos(time * 0.09) * 0.06
      
      if (bMeshRef.current.position.y > 4) {
        bMeshRef.current.position.y = startY.current
        startTime.current = time
      }
      
      const scale = 0.6 + Math.sin(time * 0.5) * 0.03
      bMeshRef.current.scale.setScalar(scale)
      
      const mat = bMeshRef.current.material as THREE.MeshStandardMaterial
      if (mat) {
        mat.emissiveIntensity = 0.3 + Math.sin(time * 1.5) * 0.2
        mat.roughness = 0.05 + Math.sin(time * 0.8) * 0.05
      }
    })

    const bMaterial = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95,
        emissive: '#d4c5a0',
        emissiveIntensity: 0.3,
        metalness: 0.95,
        roughness: 0.1,
        side: THREE.DoubleSide,
        envMapIntensity: 1.5,
      })
    }, [texture])

    const aspectRatio = textureLoaded && texture.image && texture.image.width && texture.image.height 
      ? texture.image.width / texture.image.height 
      : 1

    if (!textureLoaded) return null

      return (
        <mesh 
          ref={bMeshRef} 
          position={[-5.5, -3, 1.5]} // More spread to the left
          material={bMaterial}
          scale={0.6}
        >
          <planeGeometry args={[aspectRatio * 1.5, 1.5]} />
        </mesh>
      )
  }

  const FloatingBSmall2 = () => {
    const bMeshRef = useRef<Mesh>(null)
    const startY = useRef(-2.5)
    const startTime = useRef(0)
    const [textureLoaded, setTextureLoaded] = useState(false)
    
    const texture = useMemo(() => {
      const loader = new THREE.TextureLoader()
      const tex = loader.load(
        '/logo.png',
        () => requestAnimationFrame(() => setTextureLoaded(true)),
        undefined,
        () => {}
      )
      return tex
    }, [])

    useFrame(({ clock }) => {
      if (!bMeshRef.current || !textureLoaded) return
      const time = clock.getElapsedTime()
      
      if (startTime.current === 0) {
        startTime.current = time
      }
      
      const       elapsed = time - startTime.current
      // Pattern 3: Right side, zigzag motion (slower)
      bMeshRef.current.position.y = startY.current + elapsed * 0.019 // Much slower upward
      bMeshRef.current.position.x = 5.5 + Math.sin(time * 0.25) * 1.0 + Math.sin(time * 0.4) * 0.5
      bMeshRef.current.position.z = -1.5 + Math.cos(time * 0.2) * 0.9 + Math.cos(time * 0.3) * 0.3
      bMeshRef.current.rotation.y = Math.sin(time * 0.18) * 0.1
      bMeshRef.current.rotation.x = Math.cos(time * 0.12) * 0.05
      
      if (bMeshRef.current.position.y > 4) {
        bMeshRef.current.position.y = startY.current
        startTime.current = time
      }
      
      const scale = 0.55 + Math.sin(time * 0.6) * 0.04
      bMeshRef.current.scale.setScalar(scale)
      
      const mat = bMeshRef.current.material as THREE.MeshStandardMaterial
      if (mat) {
        mat.emissiveIntensity = 0.3 + Math.sin(time * 1.4) * 0.2
        mat.roughness = 0.05 + Math.sin(time * 0.75) * 0.05
      }
    })

    const bMaterial = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95,
        emissive: '#d4c5a0',
        emissiveIntensity: 0.3,
        metalness: 0.95,
        roughness: 0.1,
        side: THREE.DoubleSide,
        envMapIntensity: 1.5,
      })
    }, [texture])

    const aspectRatio = textureLoaded && texture.image && texture.image.width && texture.image.height 
      ? texture.image.width / texture.image.height 
      : 1

    if (!textureLoaded) return null

      return (
        <mesh 
          ref={bMeshRef} 
          position={[5.5, -2.5, -1.5]} // More spread to the right
          material={bMaterial}
          scale={0.55}
        >
          <planeGeometry args={[aspectRatio * 1.5, 1.5]} />
        </mesh>
      )
    }

  const FloatingBSmall3 = () => {
    const bMeshRef = useRef<Mesh>(null)
    const startY = useRef(4) // Start at top of page
    const startTime = useRef(0)
    const [textureLoaded, setTextureLoaded] = useState(false)
    
    const texture = useMemo(() => {
      const loader = new THREE.TextureLoader()
      const tex = loader.load(
        '/logo.png',
        () => requestAnimationFrame(() => setTextureLoaded(true)),
        undefined,
        () => {}
      )
      return tex
    }, [])

    useFrame(({ clock }) => {
      if (!bMeshRef.current || !textureLoaded) return
      const time = clock.getElapsedTime()
      
      if (startTime.current === 0) {
        startTime.current = time
      }
      
      const elapsed = time - startTime.current
      // Pattern 4: Left-center, spiral motion (slower) - floating DOWN from top
      bMeshRef.current.position.y = startY.current - elapsed * 0.017 // Float downward slowly
      bMeshRef.current.position.x = -2.5 + Math.sin(time * 0.19) * 0.9 + Math.cos(time * 0.12) * 0.6
      bMeshRef.current.position.z = -2 + Math.cos(time * 0.16) * 0.8 + Math.sin(time * 0.14) * 0.5
      bMeshRef.current.rotation.y = Math.sin(time * 0.13) * 0.1
      bMeshRef.current.rotation.x = Math.cos(time * 0.095) * 0.06

      if (bMeshRef.current.position.y < -4) {
        bMeshRef.current.position.y = startY.current
        startTime.current = time
      }

      const scale = 0.5 + Math.sin(time * 0.55) * 0.03
      bMeshRef.current.scale.setScalar(scale)

      const mat = bMeshRef.current.material as THREE.MeshStandardMaterial
      if (mat) {
        mat.emissiveIntensity = 0.3 + Math.sin(time * 1.6) * 0.2
        mat.roughness = 0.05 + Math.sin(time * 0.7) * 0.05
      }
    })

    const bMaterial = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95,
        emissive: '#d4c5a0',
        emissiveIntensity: 0.3,
        metalness: 0.95,
        roughness: 0.1,
        side: THREE.DoubleSide,
        envMapIntensity: 1.5,
      })
    }, [texture])

    const aspectRatio = textureLoaded && texture.image && texture.image.width && texture.image.height 
      ? texture.image.width / texture.image.height 
      : 1

    if (!textureLoaded) return null

    return (
      <mesh 
        ref={bMeshRef} 
        position={[-2.5, 4, -2]}
        material={bMaterial}
        scale={0.5}
      >
        <planeGeometry args={[aspectRatio * 1.5, 1.5]} />
      </mesh>
    )
  }

  const FloatingBSmall4 = () => {
    const bMeshRef = useRef<Mesh>(null)
    const startY = useRef(-2)
    const startTime = useRef(0)
    const [textureLoaded, setTextureLoaded] = useState(false)
    
    const texture = useMemo(() => {
      const loader = new THREE.TextureLoader()
      const tex = loader.load(
        '/logo.png',
        () => requestAnimationFrame(() => setTextureLoaded(true)),
        undefined,
        () => {}
      )
      return tex
    }, [])

    useFrame(({ clock }) => {
      if (!bMeshRef.current || !textureLoaded) return
      const time = clock.getElapsedTime()
      
      if (startTime.current === 0) {
        startTime.current = time
      }
      
      const elapsed = time - startTime.current
      // Pattern 5: Right-center, wave-like motion (slower) - floating DOWN from top
      bMeshRef.current.position.y = startY.current - elapsed * 0.018 // Float downward slowly
      bMeshRef.current.position.x = 2.5 + Math.sin(time * 0.22) * 1.0 + Math.sin(time * 0.35) * 0.4
      bMeshRef.current.position.z = 2 + Math.cos(time * 0.2) * 0.9 + Math.cos(time * 0.32) * 0.3
      bMeshRef.current.rotation.y = Math.sin(time * 0.16) * 0.11
      bMeshRef.current.rotation.x = Math.cos(time * 0.12) * 0.07

      if (bMeshRef.current.position.y < -4) {
        bMeshRef.current.position.y = startY.current
        startTime.current = time
      }

      const scale = 0.52 + Math.sin(time * 0.58) * 0.04
      bMeshRef.current.scale.setScalar(scale)

      const mat = bMeshRef.current.material as THREE.MeshStandardMaterial
      if (mat) {
        mat.emissiveIntensity = 0.3 + Math.sin(time * 1.3) * 0.2
        mat.roughness = 0.05 + Math.sin(time * 0.72) * 0.05
      }
    })

    const bMaterial = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95,
        emissive: '#d4c5a0',
        emissiveIntensity: 0.3,
        metalness: 0.95,
        roughness: 0.1,
        side: THREE.DoubleSide,
        envMapIntensity: 1.5,
      })
    }, [texture])

    const aspectRatio = textureLoaded && texture.image && texture.image.width && texture.image.height 
      ? texture.image.width / texture.image.height 
      : 1

    if (!textureLoaded) return null

    return (
      <mesh 
        ref={bMeshRef} 
        position={[2.5, 4.5, 2]}
        material={bMaterial}
        scale={0.52}
      >
        <planeGeometry args={[aspectRatio * 1.5, 1.5]} />
      </mesh>
    )
  }

  // Floating Leaves
  const FloatingLeaves = () => {
    const leavesGroupRef = useRef<Group>(null)
    const mouseRef = useRef(new Vector3(0, 0, 0))
    const [textureLoaded, setTextureLoaded] = useState(false)
    
    // Load the leaf texture
    const leafTexture = useMemo(() => {
      const loader = new THREE.TextureLoader()
      let loaded = false
      const tex = loader.load(
        '/leaf.png',
        () => {
          if (!loaded) {
            loaded = true
            requestAnimationFrame(() => setTextureLoaded(true))
          }
        },
        undefined,
        () => {}
      )
      return tex
    }, [])

    // Create multiple leaves spread across the page
    const leavesData = useMemo(() => {
      const count = 30 // More leaves for richer effect
      const leaves: Array<{
        position: [number, number, number]
        rotation: [number, number, number]
        scale: number
        mirrored: boolean
        startY: number
        floatSpeed: number
        rotationSpeed: [number, number, number]
      }> = []
      
      // Size categories: tiny, small, medium, bigger
      const sizeCategories = [0.6, 0.75, 1.0, 1.4]
      
      // Minimum distance between leaves to prevent clustering (increased for better spread)
      const minDistance = 3.5
      
      for (let i = 0; i < count; i++) {
        const mirrored = i % 2 === 0 // Alternate between mirrored and not
        
        let x = 0, y = 0, z = 0
        let attempts = 0
        let validPosition = false
        
        // Try to find a position that's not too close to other leaves
        while (!validPosition && attempts < 50) {
          // Much wider spread across the entire viewport - evenly distributed
          // Even distribution using golden angle for better spread
          const goldenAngle = Math.PI * (3 - Math.sqrt(5)) // Golden angle for even distribution
          const angle = i * goldenAngle
          const radius = Math.sqrt(i / count) * 30 + 3 // Even spread from center outward
          x = Math.cos(angle) * radius + (Math.random() - 0.5) * 16 // Very wide horizontal spread
          z = Math.sin(angle) * radius + (Math.random() - 0.5) * 18 // Very wide depth spread
          // Spread leaves evenly across entire page including above BOUTALLION
          y = -8 + Math.random() * 20 // Even vertical spread, including above text (up to y=12)
          
          // Check distance from existing leaves
          validPosition = true
          for (let j = 0; j < leaves.length; j++) {
            const existingLeaf = leaves[j]
            const dx = x - existingLeaf.position[0]
            const dy = y - existingLeaf.position[1]
            const dz = z - existingLeaf.position[2]
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
            
            if (distance < minDistance) {
              validPosition = false
              break
            }
          }
          attempts++
        }
        
        // Vary sizes - some tiny, some small, some bigger
        const sizeCategory = sizeCategories[Math.floor(Math.random() * sizeCategories.length)]
        const sizeVariation = sizeCategory + (Math.random() - 0.5) * 0.1
        
        leaves.push({
          position: [x, y, z],
          rotation: [
            Math.random() * Math.PI * 0.4,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 0.6
          ],
          scale: sizeVariation,
          mirrored,
          startY: y,
          floatSpeed: 0.001 + Math.random() * 0.0005, // Slow speed to prevent flickering
          rotationSpeed: [
            0.00005 + Math.random() * 0.0001, // Minimal rotation to prevent flickering
            0.0001 + Math.random() * 0.00015,
            0.00005 + Math.random() * 0.00008
          ]
        })
      }
      
      return leaves
    }, [])

    useFrame(({ clock, viewport, pointer }) => {
      if (!leavesGroupRef.current || !textureLoaded) return
      const time = clock.getElapsedTime()
      
      // Update mouse position in 3D space
      mouseRef.current.set(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      )
      
      leavesGroupRef.current.children.forEach((child, i) => {
        if (!(child instanceof THREE.Mesh)) return
        
        const leaf = leavesData[i]
        if (!leaf) return
        
        // Elegant floating upward with very slow, smooth movement
        const elapsed = time * leaf.floatSpeed
        
        // Gentle floating motion - VERY SLOW to prevent flickering
        // Each leaf has unique movement pattern based on its index
        const patternSpeed = 0.02 + (i % 3) * 0.005 // Extremely slow speed per leaf
        const patternOffset = i * 0.5 // Unique offset per leaf
        
        const driftX = Math.sin(time * patternSpeed + patternOffset) * 0.15 + Math.cos(time * patternSpeed * 0.7 + patternOffset) * 0.08
        const driftZ = Math.cos(time * patternSpeed * 0.8 + patternOffset) * 0.12 + Math.sin(time * patternSpeed * 0.6 + patternOffset) * 0.05
        
        // Update position smoothly - move across page like B logos, but very slowly
        child.position.x = leaf.position[0] + driftX
        child.position.z = leaf.position[2] + driftZ
        child.position.y = leaf.startY + elapsed // Smooth upward movement
        
        // Smooth scaling animation - bigger to smaller and back (very slow)
        const scalePulse = 1 + Math.sin(time * 0.15 + i * 0.5) * 0.1 // Slow pulse between 0.9 and 1.1
        child.scale.setScalar(leaf.scale * scalePulse)
        
        // Very slow rotation to prevent flickering
        child.rotation.x += leaf.rotationSpeed[0] * 0.5
        child.rotation.y += leaf.rotationSpeed[1] * 0.5
        child.rotation.z += leaf.rotationSpeed[2] * 0.5
        
        // Collision detection disabled to prevent erratic movement
        // Leaves will move smoothly without collision interference
        
        // Reset when it goes too high - smooth reset to prevent flickering
        if (child.position.y > 8) {
          // Smooth reset without sudden position changes
          const newY = -7 + Math.random() * 15
          child.position.y = newY
          // Reset the base position to prevent flickering
          leaf.position[1] = newY
        }
      })
    })

    // Material for leaves - more 3D appearance
    const leafMaterial = useMemo(() => {
      if (!textureLoaded) return null
      return new THREE.MeshStandardMaterial({
        map: leafTexture,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
        alphaTest: 0.05,
        emissive: '#d4c5a0',
        emissiveIntensity: 0.25,
        metalness: 0.3,
        roughness: 0.6,
      })
    }, [leafTexture, textureLoaded])

    // Create curved geometry for 3D effect
    const curvedGeometry = useMemo(() => {
      if (!textureLoaded || !leafTexture.image) {
        // Return default geometry if texture not loaded
        return new THREE.PlaneGeometry(1, 1, 4, 4)
      }
      
      const aspectRatio = leafTexture.image.width && leafTexture.image.height 
        ? leafTexture.image.width / leafTexture.image.height 
        : 1
      
      const geo = new THREE.PlaneGeometry(aspectRatio, 1, 4, 4)
      const positions = geo.attributes.position.array as Float32Array
      
      // Add subtle curve for 3D depth
      for (let j = 0; j < positions.length; j += 3) {
        const x = positions[j]
        const y = positions[j + 1]
        positions[j + 2] = Math.sin(x * 2) * 0.02 + Math.cos(y * 2) * 0.02
      }
      
      geo.computeVertexNormals()
      return geo
    }, [leafTexture, textureLoaded])

    if (!textureLoaded || !leafMaterial) {
      return null
    }

    return (
      <group ref={leavesGroupRef}>
        {leavesData.map((leaf, i) => {
          const aspectRatio = leafTexture.image && leafTexture.image.width && leafTexture.image.height 
            ? leafTexture.image.width / leafTexture.image.height 
            : 1
          
          const scaleX = leaf.mirrored ? -leaf.scale * aspectRatio : leaf.scale * aspectRatio
          
          return (
            <mesh
              key={i}
              position={leaf.position}
              rotation={leaf.rotation}
              scale={[scaleX, leaf.scale, 1]}
              material={leafMaterial.clone()}
              geometry={curvedGeometry}
            />
          )
        })}
      </group>
    )
  }


  // Floating Buttons from button.png
  const FloatingButtons = () => {
    const buttonsGroupRef = useRef<Group>(null)
    const [textureLoaded, setTextureLoaded] = useState(false)
    
    const buttonTexture = useMemo(() => {
      const loader = new THREE.TextureLoader()
      const tex = loader.load(
        '/buttom.png',
        () => requestAnimationFrame(() => setTextureLoaded(true)),
        undefined,
        () => {
          console.warn('buttom.png not found')
        }
      )
      return tex
    }, [])

          const buttonsData = useMemo(() => {
            const count = 20 // Reduced from 35 to 20 (less crowded)
            const sizeCategories = [0.5, 0.6, 0.8, 1.0, 1.2, 1.5] // Added smaller sizes
            return Array.from({ length: count }, (_, i) => {
              const angle = (i / count) * Math.PI * 2
              const radius = 14 + Math.random() * 10 // Much wider spread - keep away from center
              const sizeVariation = sizeCategories[Math.floor(Math.random() * sizeCategories.length)] + (Math.random() - 0.5) * 0.2
              // Avoid center area where BOUTALLION is (y between -1 and 1)
              let yPos = -7 + Math.random() * 16
              if (yPos > -1 && yPos < 1) {
                yPos = yPos < 0 ? -2 + Math.random() * 1 : 1 + Math.random() * 1
              }
              return {
                position: [
                  Math.cos(angle) * radius + (Math.random() - 0.5) * 8, // More spread
                  yPos,
                  Math.sin(angle) * radius + (Math.random() - 0.5) * 8 // More depth spread
                ] as [number, number, number],
                startY: yPos,
                floatSpeed: 0.002 + Math.random() * 0.001,
                velocity: [
                  (Math.random() - 0.5) * 0.0012, // Continuous horizontal movement like particles
                  Math.random() * 0.0018 + 0.0008, // Continuous upward movement
                  (Math.random() - 0.5) * 0.0012 // Continuous depth movement
                ] as [number, number, number],
                scale: sizeVariation,
                rotationSpeed: [
                  (Math.random() - 0.5) * 0.001,
                  (Math.random() - 0.5) * 0.001,
                  (Math.random() - 0.5) * 0.001
                ]
              }
            })
          }, [])

    useFrame(({ clock }) => {
      if (!buttonsGroupRef.current || !textureLoaded) return
      const time = clock.getElapsedTime()

      buttonsGroupRef.current.children.forEach((child, i) => {
        if (!(child instanceof THREE.Mesh)) return
        const button = buttonsData[i]
        if (!button) return

        // Continuous floating movement like particles
        const velocity = button.velocity
        child.position.x += velocity[0] + Math.sin(time * 0.025 + i) * 0.0002
        child.position.y += velocity[1] + Math.cos(time * 0.02 + i) * 0.0004
        child.position.z += velocity[2] + Math.sin(time * 0.023 + i * 0.6) * 0.0002
        
        let newX = child.position.x
        let newZ = child.position.z
        
        // Collision detection - prevent overlapping with other buttons
        const minDistance = 3.5
        allButtonsRef.current.forEach((otherButton, key) => {
          if (key === i || !otherButton) return
          const dx = newX - otherButton.position.x
          const dy = child.position.y - otherButton.position.y
          const dz = newZ - otherButton.position.z
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (distance < minDistance && distance > 0) {
            const pushStrength = (minDistance - distance) / minDistance * 0.25
            newX += dx / distance * pushStrength
            newZ += dz / distance * pushStrength
            if (Math.abs(dy) < 1.5) {
              child.position.y += (dy > 0 ? 1 : -1) * pushStrength * 0.4
            }
          }
        })
        
        child.position.x = newX
        child.position.z = newZ

        child.rotation.x += button.rotationSpeed[0]
        child.rotation.y += button.rotationSpeed[1]
        child.rotation.z += button.rotationSpeed[2]

        // Reset when buttons go out of bounds - like particles
        if (child.position.y > 8) {
          child.position.y = -7 + Math.random() * 2
          child.position.x = (Math.random() - 0.5) * 20
          child.position.z = (Math.random() - 0.5) * 20
        } else if (child.position.y < -8) {
          child.position.y = 6 + Math.random() * 2
          child.position.x = (Math.random() - 0.5) * 20
          child.position.z = (Math.random() - 0.5) * 20
        }
        
        // Reset horizontally if too far
        if (Math.abs(child.position.x) > 12) {
          child.position.x = (Math.random() - 0.5) * 16
        }
        if (Math.abs(child.position.z) > 10) {
          child.position.z = (Math.random() - 0.5) * 14
        }
      })
    })

    const buttonMaterial = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        map: buttonTexture,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide,
        alphaTest: 0.05,
        // Use original image colors only
      })
    }, [buttonTexture])

    if (!textureLoaded) return null

    return (
      <group ref={buttonsGroupRef}>
        {buttonsData.map((button, i) => {
          const aspectRatio = buttonTexture.image && buttonTexture.image.width && buttonTexture.image.height
            ? buttonTexture.image.width / buttonTexture.image.height
            : 1
          return (
            <mesh
              key={i}
              ref={(el) => {
                if (el) allButtonsRef.current.set(i, el)
              }}
              position={button.position}
              material={buttonMaterial.clone()}
              scale={button.scale}
            >
              <planeGeometry args={[aspectRatio * 1.5, 1.5]} />
            </mesh>
          )
        })}
      </group>
    )
  }

  // Floating B logos from b.png (3 pieces)
  const FloatingBNew = () => {
    const bGroupRef = useRef<Group>(null)
    const startYRefs = useRef<number[]>([0]) // Track startY values with refs
    const [textureLoaded, setTextureLoaded] = useState(false)
    
    const bTexture = useMemo(() => {
      const loader = new THREE.TextureLoader()
      const possiblePaths = ['/b.png', '/B.png', '/logo-b.png']
      let currentIndex = 0
      let loaded = false
      
      const tryLoadNext = () => {
        if (currentIndex >= possiblePaths.length) {
          if (!loaded) {
            console.warn('B logo image not found. Tried:', possiblePaths.join(', '))
          }
          return
        }
        
        const path = possiblePaths[currentIndex]
        loader.load(
          path,
          () => {
            if (!loaded) {
              loaded = true
              requestAnimationFrame(() => setTextureLoaded(true))
            }
          },
          undefined,
          () => {
            currentIndex++
            tryLoadNext()
          }
        )
      }
      
      const tex = loader.load(possiblePaths[0], () => {
        if (!loaded) {
          loaded = true
          requestAnimationFrame(() => setTextureLoaded(true))
        }
      }, undefined, tryLoadNext)
      return tex
    }, [])

    const bData = useMemo(() => {
      return [
        {
          position: [3, 0, 0] as [number, number, number], // Right side, more to left - completely visible
          floatSpeed: 0.002 + Math.random() * 0.001,
          resetY: -3,
          maxY: 3,
          size: 'medium' as const,
        }
      ]
    }, [])

    useFrame(({ clock }) => {
      if (!bGroupRef.current || !textureLoaded) return
      const time = clock.getElapsedTime()

      bGroupRef.current.children.forEach((child, i) => {
        if (!(child instanceof THREE.Mesh)) return
        const b = bData[i]
        if (!b) return

        const elapsed = time * b.floatSpeed
        child.position.y = startYRefs.current[i] + elapsed

        // Keep B logo visible - limit drift to stay in right area but fully visible
        const driftX = Math.sin(time * 0.05) * 0.15 // Small drift
        const driftZ = Math.cos(time * 0.045) * 0.2
        child.position.x = b.position[0] + driftX
        child.position.z = b.position[2] + driftZ
        
        // Keep B logo in right corner but prevent cutoff - more to the left for full visibility
        if (child.position.x < 2) {
          child.position.x = 3 // Keep visible, not cut off
        } else if (child.position.x > 4.5) {
          child.position.x = 3.5 // Prevent going too far right and getting cut off
        }
        
        // Keep B logo away from BOUTALLION text area (y between -1.5 and 1.5)
        if (child.position.y > -1.5 && child.position.y < 1.5) {
          // Push away from text - prefer below
          child.position.y = -2
          startYRefs.current[0] = -2
        }
        
        // Keep within vertical bounds - fully visible
        if (child.position.y < -3.5) {
          child.position.y = -3
          startYRefs.current[0] = -3
        } else if (child.position.y > 3.5) {
          child.position.y = 3
          startYRefs.current[0] = 3
        }

        child.rotation.y = Math.sin(time * 0.1 + i) * 0.05
        child.rotation.x = Math.cos(time * 0.08 + i) * 0.03

        // Keep B logos always visible - reset when they go out of bounds
        if (child.position.y > b.maxY) {
          child.position.y = b.resetY
          startYRefs.current[i] = b.resetY
        } else if (child.position.y < b.resetY) {
          child.position.y = b.maxY
          startYRefs.current[i] = b.maxY
        }
      })
    })

    const bMaterial = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        map: bTexture,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide,
        alphaTest: 0.01,
        // Use original image colors only
      })
    }, [bTexture])

    if (!textureLoaded) return null

    return (
      <group ref={bGroupRef}>
        {bData.map((b, i) => {
          const aspectRatio = bTexture.image && bTexture.image.width && bTexture.image.height
            ? bTexture.image.width / bTexture.image.height
            : 1
          // Single B logo size - medium, fully visible
          const scale = 2.0
          return (
            <mesh
              key={i}
              position={b.position}
              material={bMaterial.clone()}
              scale={scale}
            >
              <planeGeometry args={[aspectRatio * 1.2, 1.2]} />
            </mesh>
          )
        })}
      </group>
    )
  }

  // Floating Leaves from leaf2.png (15 pieces)
  const FloatingLeavesNew = () => {
    const leavesGroupRef = useRef<Group>(null)
    const startYRefs = useRef<Map<number, number>>(new Map())
    const mouseRef = useRef(new Vector3(0, 0, 0))
    const [textureLoaded, setTextureLoaded] = useState(false)
    const { viewport, pointer } = useThree()
    
    // Update mouse position in 3D space
    useEffect(() => {
      const updateMouse = () => {
        mouseRef.current.set(
          (pointer.x * viewport.width) / 2,
          (pointer.y * viewport.height) / 2,
          0
        )
      }
      updateMouse()
    }, [pointer, viewport])
    
    const leafTexture = useMemo(() => {
      const loader = new THREE.TextureLoader()
      const tex = loader.load(
        '/leaf2.png',
        () => requestAnimationFrame(() => setTextureLoaded(true)),
        undefined,
        () => {
          console.warn('leaf2.png not found')
        }
      )
      return tex
    }, [])

    const leavesData = useMemo(() => {
      const count = 12 // Reduced from 25 to 12
      const goldenAngle = Math.PI * (3 - Math.sqrt(5)) // Golden angle for even distribution
      return Array.from({ length: count }, (_, i) => {
        const angle = i * goldenAngle
        const radius = 16 + Math.random() * 12 // Much wider spread - keep away from center
        const sizeVariation = 1.2 + Math.random() * 1.5 // Bigger sizes (increased from 0.6-1.6 to 1.2-2.7)
        // Avoid center area where BOUTALLION is (y between -1.5 and 1.5)
        let yPos = -7 + Math.random() * 16
        if (yPos > -1.5 && yPos < 1.5) {
          yPos = yPos < 0 ? -2.5 + Math.random() * 1 : 1.5 + Math.random() * 1
        }
        return {
          position: [
            Math.cos(angle) * radius + (Math.random() - 0.5) * 10, // More spread
            yPos,
            Math.sin(angle) * radius + (Math.random() - 0.5) * 10 // More depth spread
          ] as [number, number, number],
          startY: yPos,
          floatSpeed: 0.003 + Math.random() * 0.002, // Increased speed for visible movement
          velocity: [
            (Math.random() - 0.5) * 0.0015, // Continuous horizontal movement
            Math.random() * 0.002 + 0.001, // Continuous upward movement
            (Math.random() - 0.5) * 0.0015 // Continuous depth movement
          ] as [number, number, number],
          scale: sizeVariation,
          mirrored: i % 2 === 0, // 50% mirrored (alternating)
          rotationSpeed: [
            (Math.random() - 0.5) * 0.0003,
            (Math.random() - 0.5) * 0.0003,
            (Math.random() - 0.5) * 0.0003
          ]
        }
      })
    }, [])

    useFrame(({ clock, viewport, pointer }) => {
      if (!leavesGroupRef.current || !textureLoaded) return
      const time = clock.getElapsedTime()
      
      // Update mouse position in 3D space
      mouseRef.current.set(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      )

      leavesGroupRef.current.children.forEach((child, i) => {
        if (!(child instanceof THREE.Mesh)) return
        const leaf = leavesData[i]
        if (!leaf) return

        // Continuous floating movement like particles
        const velocity = leaf.velocity
        child.position.x += velocity[0] + Math.sin(time * 0.03 + i) * 0.0003
        child.position.y += velocity[1] + Math.cos(time * 0.025 + i) * 0.0005
        child.position.z += velocity[2] + Math.sin(time * 0.028 + i * 0.7) * 0.0003
        
        let newX = child.position.x
        let newZ = child.position.z
        
        // Collision detection - prevent overlapping with other leaves (increased distance)
        const minDistance = 4.0 // Increased minimum distance between leaves
        allLeavesRef.current.forEach((otherLeaf, key) => {
          if (key === `leaf2-${i}` || !otherLeaf) return // Skip self
          
          const dx = newX - otherLeaf.position.x
          const dy = child.position.y - otherLeaf.position.y
          const dz = newZ - otherLeaf.position.z
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
          
          if (distance < minDistance && distance > 0) {
            // Push leaves apart more aggressively
            const pushStrength = (minDistance - distance) / minDistance * 0.3
            newX += dx / distance * pushStrength
            newZ += dz / distance * pushStrength
            // Also push vertically if too close
            if (Math.abs(dy) < 2) {
              child.position.y += (dy > 0 ? 1 : -1) * pushStrength * 0.5
            }
          }
        })
        
        // Mouse interaction - leaves react to cursor proximity
        const mouseDistance = Math.sqrt(
          Math.pow(newX - mouseRef.current.x, 2) + 
          Math.pow(child.position.y - mouseRef.current.y, 2) + 
          Math.pow(newZ - mouseRef.current.z, 2)
        )
        const mouseInfluenceRadius = 3.0
        const mouseInfluence = Math.max(0, 1 - mouseDistance / mouseInfluenceRadius)
        
        if (mouseInfluence > 0) {
          // Push leaf away from mouse
          const pushDirectionX = (newX - mouseRef.current.x) / mouseDistance
          const pushDirectionZ = (newZ - mouseRef.current.z) / mouseDistance
          const pushStrength = mouseInfluence * 0.3
          newX += pushDirectionX * pushStrength
          newZ += pushDirectionZ * pushStrength
        }
        
        child.position.x = newX
        child.position.z = newZ

        // Smooth rotation with mouse influence
        const rotationInfluence = mouseInfluence * 0.5
        child.rotation.x += leaf.rotationSpeed[0] * (1 + rotationInfluence)
        child.rotation.y += leaf.rotationSpeed[1] * (1 + rotationInfluence)
        child.rotation.z += leaf.rotationSpeed[2] * (1 + rotationInfluence)

        // Smooth scale pulse - preserve mirrored scale (bigger variation) with mouse influence
        const scalePulse = 1 + Math.sin(time * 0.15 + i * 0.5) * 0.25 + mouseInfluence * 0.2
        const aspectRatio = leafTexture.image && leafTexture.image.width && leafTexture.image.height
          ? leafTexture.image.width / leafTexture.image.height
          : 1
        if (leaf.mirrored) {
          child.scale.set(-leaf.scale * aspectRatio * scalePulse, leaf.scale * scalePulse, 1)
        } else {
          child.scale.set(leaf.scale * aspectRatio * scalePulse, leaf.scale * scalePulse, 1)
        }

        // Reset when leaves go out of bounds - like particles
        if (child.position.y > 8) {
          child.position.y = -7 + Math.random() * 2
          child.position.x = (Math.random() - 0.5) * 20
          child.position.z = (Math.random() - 0.5) * 20
        } else if (child.position.y < -8) {
          child.position.y = 6 + Math.random() * 2
          child.position.x = (Math.random() - 0.5) * 20
          child.position.z = (Math.random() - 0.5) * 20
        }
        
        // Reset horizontally if too far
        if (Math.abs(child.position.x) > 12) {
          child.position.x = (Math.random() - 0.5) * 16
        }
        if (Math.abs(child.position.z) > 10) {
          child.position.z = (Math.random() - 0.5) * 14
        }
      })
    })

    const leafMaterial = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        map: leafTexture,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide,
        alphaTest: 0.05,
        // No emissive - use original image colors
      })
    }, [leafTexture])

    if (!textureLoaded) return null

    return (
      <group ref={leavesGroupRef}>
        {leavesData.map((leaf, i) => {
          const aspectRatio = leafTexture.image && leafTexture.image.width && leafTexture.image.height
            ? leafTexture.image.width / leafTexture.image.height
            : 1
          // Initial scale - will be updated in useFrame
          const initialScale: [number, number, number] = leaf.mirrored 
            ? [-leaf.scale * aspectRatio, leaf.scale, 1] 
            : [leaf.scale * aspectRatio, leaf.scale, 1]
          return (
            <mesh
              key={i}
              ref={(el) => {
                if (el) allLeavesRef.current.set(`leaf2-${i}`, el)
              }}
              position={leaf.position}
              material={leafMaterial.clone()}
              scale={initialScale}
            >
              <planeGeometry args={[aspectRatio, 1]} />
            </mesh>
          )
        })}
      </group>
    )
  }

  // Floating Leaves from leaf1.png
  const FloatingLeavesLeaf1 = () => {
    const leavesGroupRef = useRef<Group>(null)
    const startYRefs = useRef<Map<number, number>>(new Map())
    const mouseRef = useRef(new Vector3(0, 0, 0))
    const [textureLoaded, setTextureLoaded] = useState(false)
    const { viewport, pointer } = useThree()
    
    useEffect(() => {
      const updateMouse = () => {
        mouseRef.current.set(
          (pointer.x * viewport.width) / 2,
          (pointer.y * viewport.height) / 2,
          0
        )
      }
      updateMouse()
    }, [pointer, viewport])
    
    const leafTexture = useMemo(() => {
      const loader = new THREE.TextureLoader()
      const tex = loader.load(
        '/leaf1.png',
        () => requestAnimationFrame(() => setTextureLoaded(true)),
        undefined,
        () => {
          console.warn('leaf1.png not found')
        }
      )
      return tex
    }, [])

    const leavesData = useMemo(() => {
      const count = 10 // Reduced from 20 to 10
      const goldenAngle = Math.PI * (3 - Math.sqrt(5))
      return Array.from({ length: count }, (_, i) => {
        const angle = i * goldenAngle
        const radius = 12 + Math.random() * 10
        const sizeVariation = 1.2 + Math.random() * 1.5 // Bigger sizes
        return {
          position: [
            Math.cos(angle) * radius + (Math.random() - 0.5) * 8,
            -7 + Math.random() * 16,
            Math.sin(angle) * radius + (Math.random() - 0.5) * 8
          ] as [number, number, number],
          startY: -7 + Math.random() * 16,
          floatSpeed: 0.003 + Math.random() * 0.002, // Increased speed for visible movement
          velocity: [
            (Math.random() - 0.5) * 0.0015,
            Math.random() * 0.002 + 0.001,
            (Math.random() - 0.5) * 0.0015
          ] as [number, number, number],
          scale: sizeVariation,
          mirrored: i % 3 !== 0, // More mirrored (2 out of 3)
          rotationSpeed: [
            (Math.random() - 0.5) * 0.0003,
            (Math.random() - 0.5) * 0.0003,
            (Math.random() - 0.5) * 0.0003
          ]
        }
      })
    }, [])

    useFrame(({ clock, viewport, pointer }) => {
      if (!leavesGroupRef.current || !textureLoaded) return
      const time = clock.getElapsedTime()
      
      // Update mouse position in 3D space
      mouseRef.current.set(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      )

      leavesGroupRef.current.children.forEach((child, i) => {
        if (!(child instanceof THREE.Mesh)) return
        const leaf = leavesData[i]
        if (!leaf) return

        // Continuous floating movement like particles
        const velocity = leaf.velocity
        child.position.x += velocity[0] + Math.sin(time * 0.03 + i) * 0.0003
        child.position.y += velocity[1] + Math.cos(time * 0.025 + i) * 0.0005
        child.position.z += velocity[2] + Math.sin(time * 0.028 + i * 0.7) * 0.0003
        
        let newX = child.position.x
        let newZ = child.position.z
        
        // Collision detection - prevent overlapping with other leaves (increased distance)
        const minDistance = 4.0
        allLeavesRef.current.forEach((otherLeaf, key) => {
          if (key === `leaf-${i}` || !otherLeaf) return
          
          const dx = newX - otherLeaf.position.x
          const dy = child.position.y - otherLeaf.position.y
          const dz = newZ - otherLeaf.position.z
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
          
          if (distance < minDistance && distance > 0) {
            const pushStrength = (minDistance - distance) / minDistance * 0.1
            newX += dx / distance * pushStrength
            newZ += dz / distance * pushStrength
          }
        })
        
        child.position.x = newX
        child.position.z = newZ

        child.rotation.x += leaf.rotationSpeed[0]
        child.rotation.y += leaf.rotationSpeed[1]
        child.rotation.z += leaf.rotationSpeed[2]

        // Smooth scale pulse - preserve mirrored scale (bigger variation)
        const scalePulse = 1 + Math.sin(time * 0.15 + i * 0.5) * 0.25
        const aspectRatio = leafTexture.image && leafTexture.image.width && leafTexture.image.height
          ? leafTexture.image.width / leafTexture.image.height
          : 1
        if (leaf.mirrored) {
          child.scale.set(-leaf.scale * aspectRatio * scalePulse, leaf.scale * scalePulse, 1)
        } else {
          child.scale.set(leaf.scale * aspectRatio * scalePulse, leaf.scale * scalePulse, 1)
        }

        // Reset when leaves go out of bounds - like particles
        if (child.position.y > 8) {
          child.position.y = -7 + Math.random() * 2
          child.position.x = (Math.random() - 0.5) * 20
          child.position.z = (Math.random() - 0.5) * 20
        } else if (child.position.y < -8) {
          child.position.y = 6 + Math.random() * 2
          child.position.x = (Math.random() - 0.5) * 20
          child.position.z = (Math.random() - 0.5) * 20
        }
        
        // Reset horizontally if too far
        if (Math.abs(child.position.x) > 12) {
          child.position.x = (Math.random() - 0.5) * 16
        }
        if (Math.abs(child.position.z) > 10) {
          child.position.z = (Math.random() - 0.5) * 14
        }
      })
    })

    const leafMaterial = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        map: leafTexture,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide,
        alphaTest: 0.05,
      })
    }, [leafTexture])

    if (!textureLoaded) return null

    return (
      <group ref={leavesGroupRef}>
        {leavesData.map((leaf, i) => {
          const aspectRatio = leafTexture.image && leafTexture.image.width && leafTexture.image.height
            ? leafTexture.image.width / leafTexture.image.height
            : 1
          // Initial scale - will be updated in useFrame
          const initialScale: [number, number, number] = leaf.mirrored 
            ? [-leaf.scale * aspectRatio, leaf.scale, 1] 
            : [leaf.scale * aspectRatio, leaf.scale, 1]
          return (
            <mesh
              key={i}
              ref={(el) => {
                if (el) allLeavesRef.current.set(`leaf1-${i}`, el)
              }}
              position={leaf.position}
              material={leafMaterial.clone()}
              scale={initialScale}
            >
              <planeGeometry args={[aspectRatio, 1]} />
            </mesh>
          )
        })}
      </group>
    )
  }

  // Floating Leaves from leaf.png
  const FloatingLeavesLeaf = () => {
    const leavesGroupRef = useRef<Group>(null)
    const startYRefs = useRef<Map<number, number>>(new Map())
    const mouseRef = useRef(new Vector3(0, 0, 0))
    const [textureLoaded, setTextureLoaded] = useState(false)
    const { viewport, pointer } = useThree()
    
    useEffect(() => {
      const updateMouse = () => {
        mouseRef.current.set(
          (pointer.x * viewport.width) / 2,
          (pointer.y * viewport.height) / 2,
          0
        )
      }
      updateMouse()
    }, [pointer, viewport])
    
    const leafTexture = useMemo(() => {
      const loader = new THREE.TextureLoader()
      const tex = loader.load(
        '/leaf.png',
        () => requestAnimationFrame(() => setTextureLoaded(true)),
        undefined,
        () => {
          console.warn('leaf.png not found')
        }
      )
      return tex
    }, [])

    const leavesData = useMemo(() => {
      const count = 10 // Reduced from 20 to 10
      const goldenAngle = Math.PI * (3 - Math.sqrt(5))
      return Array.from({ length: count }, (_, i) => {
        const angle = i * goldenAngle
        const radius = 12 + Math.random() * 10
        const sizeVariation = 1.2 + Math.random() * 1.5 // Bigger sizes
        return {
          position: [
            Math.cos(angle) * radius + (Math.random() - 0.5) * 8,
            -7 + Math.random() * 16,
            Math.sin(angle) * radius + (Math.random() - 0.5) * 8
          ] as [number, number, number],
          startY: -7 + Math.random() * 16,
          floatSpeed: 0.003 + Math.random() * 0.002, // Increased speed for visible movement
          velocity: [
            (Math.random() - 0.5) * 0.0015,
            Math.random() * 0.002 + 0.001,
            (Math.random() - 0.5) * 0.0015
          ] as [number, number, number],
          scale: sizeVariation,
          mirrored: i % 3 !== 0, // More mirrored (2 out of 3)
          rotationSpeed: [
            (Math.random() - 0.5) * 0.0003,
            (Math.random() - 0.5) * 0.0003,
            (Math.random() - 0.5) * 0.0003
          ]
        }
      })
    }, [])

    useFrame(({ clock, viewport, pointer }) => {
      if (!leavesGroupRef.current || !textureLoaded) return
      const time = clock.getElapsedTime()
      
      // Update mouse position in 3D space
      mouseRef.current.set(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      )

      leavesGroupRef.current.children.forEach((child, i) => {
        if (!(child instanceof THREE.Mesh)) return
        const leaf = leavesData[i]
        if (!leaf) return

        // Continuous floating movement like particles
        const velocity = leaf.velocity
        child.position.x += velocity[0] + Math.sin(time * 0.03 + i) * 0.0003
        child.position.y += velocity[1] + Math.cos(time * 0.025 + i) * 0.0005
        child.position.z += velocity[2] + Math.sin(time * 0.028 + i * 0.7) * 0.0003
        
        let newX = child.position.x
        let newZ = child.position.z
        
        // Collision detection - prevent overlapping with other leaves (increased distance)
        const minDistance = 4.0
        allLeavesRef.current.forEach((otherLeaf, key) => {
          if (key === `leaf-${i}` || !otherLeaf) return // Fixed key for leaf.png component
          
          const dx = newX - otherLeaf.position.x
          const dy = child.position.y - otherLeaf.position.y
          const dz = newZ - otherLeaf.position.z
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
          
          if (distance < minDistance && distance > 0) {
            const pushStrength = (minDistance - distance) / minDistance * 0.1
            newX += dx / distance * pushStrength
            newZ += dz / distance * pushStrength
          }
        })
        
        // Mouse interaction - leaves react to cursor proximity
        const mouseDistance = Math.sqrt(
          Math.pow(newX - mouseRef.current.x, 2) + 
          Math.pow(child.position.y - mouseRef.current.y, 2) + 
          Math.pow(newZ - mouseRef.current.z, 2)
        )
        const mouseInfluenceRadius = 3.0
        const mouseInfluence = Math.max(0, 1 - mouseDistance / mouseInfluenceRadius)
        
        if (mouseInfluence > 0) {
          const pushDirectionX = (newX - mouseRef.current.x) / mouseDistance
          const pushDirectionZ = (newZ - mouseRef.current.z) / mouseDistance
          const pushStrength = mouseInfluence * 0.3
          newX += pushDirectionX * pushStrength
          newZ += pushDirectionZ * pushStrength
        }
        
        child.position.x = newX
        child.position.z = newZ

        // Smooth rotation with mouse influence
        const rotationInfluence = mouseInfluence * 0.5
        child.rotation.x += leaf.rotationSpeed[0] * (1 + rotationInfluence)
        child.rotation.y += leaf.rotationSpeed[1] * (1 + rotationInfluence)
        child.rotation.z += leaf.rotationSpeed[2] * (1 + rotationInfluence)

        // Smooth scale pulse - preserve mirrored scale (bigger variation) with mouse influence
        const scalePulse = 1 + Math.sin(time * 0.15 + i * 0.5) * 0.25 + mouseInfluence * 0.2
        const aspectRatio = leafTexture.image && leafTexture.image.width && leafTexture.image.height
          ? leafTexture.image.width / leafTexture.image.height
          : 1
        if (leaf.mirrored) {
          child.scale.set(-leaf.scale * aspectRatio * scalePulse, leaf.scale * scalePulse, 1)
        } else {
          child.scale.set(leaf.scale * aspectRatio * scalePulse, leaf.scale * scalePulse, 1)
        }

        // Reset when leaves go out of bounds - like particles
        if (child.position.y > 8) {
          child.position.y = -7 + Math.random() * 2
          child.position.x = (Math.random() - 0.5) * 20
          child.position.z = (Math.random() - 0.5) * 20
        } else if (child.position.y < -8) {
          child.position.y = 6 + Math.random() * 2
          child.position.x = (Math.random() - 0.5) * 20
          child.position.z = (Math.random() - 0.5) * 20
        }
        
        // Reset horizontally if too far
        if (Math.abs(child.position.x) > 12) {
          child.position.x = (Math.random() - 0.5) * 16
        }
        if (Math.abs(child.position.z) > 10) {
          child.position.z = (Math.random() - 0.5) * 14
        }
      })
    })

    const leafMaterial = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        map: leafTexture,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide,
        alphaTest: 0.05,
      })
    }, [leafTexture])

    if (!textureLoaded) return null

    return (
      <group ref={leavesGroupRef}>
        {leavesData.map((leaf, i) => {
          const aspectRatio = leafTexture.image && leafTexture.image.width && leafTexture.image.height
            ? leafTexture.image.width / leafTexture.image.height
            : 1
          // Initial scale - will be updated in useFrame
          const initialScale: [number, number, number] = leaf.mirrored 
            ? [-leaf.scale * aspectRatio, leaf.scale, 1] 
            : [leaf.scale * aspectRatio, leaf.scale, 1]
          return (
            <mesh
              key={i}
              ref={(el) => {
                if (el) allLeavesRef.current.set(`leaf-${i}`, el)
              }}
              position={leaf.position}
              material={leafMaterial.clone()}
              scale={initialScale}
            >
              <planeGeometry args={[aspectRatio, 1]} />
            </mesh>
          )
        })}
      </group>
    )
  }

  return (
    <>
      <GoldDustParticles />
      <FloatingB />
      <FloatingBSmall1 />
      <FloatingBSmall2 />
      <FloatingBSmall3 />
      <FloatingBSmall4 />
      <FloatingButtons />
      <FloatingBNew />
      <FloatingLeavesNew />
      <FloatingLeavesLeaf1 />
      <FloatingLeavesLeaf />
    </>
  )
})

export default LuxuryWebGLEffects

