'use client'

import { useRef, useMemo, useState, memo, useEffect, MutableRefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Mesh, Group, Vector3, VideoTexture, DoubleSide } from 'three'

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
          
          // Constrain crystals to left side to avoid b.png on right (x < 1.5)
          if (child.position.x > 1.5) {
            child.position.x = 1.5 - (child.position.x - 1.5) * 0.3 // Push back to left with damping
          }
          
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
          const radius = 5.0 + Math.sin(i) * 1.5 // Increased spread for universe effect
          const material = baseMaterial.clone()
          // Constrain crystals to left and center, avoid right side where b.png is
          let x = Math.cos(angle) * radius
          // Keep crystals on left side (x < 1.5) to avoid b.png on right
          if (x > 1.5) {
            x = 1.5 - (x - 1.5) // Mirror to left side
          }
          return (
            <mesh
              key={i}
              geometry={geometry}
              material={material}
              position={[
                x,
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
        // On desktop, focus more particles on right side (more gold dust on right)
        // On mobile/tablet, constraint will be applied in useFrame based on viewport
        const angle = (i / count) * Math.PI * 2
        const radius = Math.random() * 25 + 5 // Increased spread for universe effect
        // Bias particles to the right side on desktop (x > 0) - 70% chance
        const rightBias = Math.random() > 0.3 ? 1 : -1 // 70% chance to be on right side
        const baseX = Math.cos(angle) * radius + (Math.random() - 0.5) * 8
        const x = baseX * rightBias + (rightBias > 0 ? Math.random() * 3 : 0) // More particles on right
        const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 12 // Increased depth spread for universe effect
        // Focus more particles at the bottom of the page
        const y = -4.5 + Math.random() * 4 // More particles concentrated at bottom
        
        particles.push({
          position: [x, y, z],
          velocity: [
            (Math.random() - 0.5) * 0.0004, // Slower horizontal movement
            Math.random() * 0.0003 + 0.0002, // Very slow upward velocity for elegant flow
            (Math.random() - 0.5) * 0.0004 // Slower depth movement
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

    useFrame(({ clock, viewport }) => {
      if (!groupRef.current) return
      const time = clock.getElapsedTime()
      
      // Determine device type based on viewport
      const isMobile = viewport.width < 6
      const isTablet = viewport.width >= 6 && viewport.width < 10
      
      groupRef.current.children.forEach((child, i) => {
        if (!(child instanceof THREE.Mesh)) return
        
        const particle = particlesData[i]
        if (!particle) return
        
        const velocity = particle.velocity
        const pos = child.position
        
        // Elegant floating motion - slower and more graceful
        pos.x += velocity[0] + Math.sin(time * 0.5 + pos.y) * 0.0001
        pos.y += velocity[1] + Math.cos(time * 0.4 + pos.x) * 0.0001 // Very slow upward drift for elegant flow
        pos.z += velocity[2] + Math.sin(time * 0.15 + pos.x) * 0.0001
        
        // On desktop, allow particles on right side (more gold dust on right)
        // On mobile/tablet, constrain to left side to avoid b.png
        if ((isMobile || isTablet) && pos.x > 1.5) {
          pos.x = 1.5 - (pos.x - 1.5) * 0.3 // Push back to left with damping on mobile/tablet
        }
        
        // Keep particles in visible range, resetting to bottom when they go too high
        if (pos.y < -5) {
          pos.y = -4.5 + Math.random() * 2 // Reset to bottom area
        }
        if (pos.y > 3) {
          pos.y = -4.5 + Math.random() * 2 // Allow particles to go higher before reset
        }
        
        // Reset particles that drift too far horizontally - wider reset range
        // On desktop, bias reset to right side (x > 0)
        if (Math.abs(pos.x) > 10) {
          if (!isMobile && !isTablet) {
            // Desktop: Bias to right side (70% chance)
            const rightBias = Math.random() > 0.3 ? 1 : -1
            pos.x = (Math.random() * 7 + 2) * rightBias // More particles on right side
          } else {
            // Mobile/Tablet: Keep on left side
            pos.x = (Math.random() - 0.5) * 14
          }
        }
        if (Math.abs(pos.z) > 6) {
          pos.z = (Math.random() - 0.5) * 8
        }
        
        // Subtle rotation for 3D effect - slower
        child.rotation.x += 0.0005
        child.rotation.y += 0.0005
        
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
    const bMeshRef = useRef<Mesh | null>(null)
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
      
      // Constrain to left side to avoid b.png on right (x < 1.5)
      if (bMeshRef.current.position.x > 1.5) {
        bMeshRef.current.position.x = 1.5 - (bMeshRef.current.position.x - 1.5) * 0.3
      }
      
      // Collision detection - keep B logos apart (minimum distance increased for universe effect)
      const minDistance = 7.0
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
          (bMeshRef as MutableRefObject<Mesh | null>).current = el
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
    const bMeshRef = useRef<Mesh | null>(null)
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
    const bMeshRef = useRef<Mesh | null>(null)
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
      // Pattern 3: Left side, zigzag motion (slower) - moved to left to avoid b.png on right
      bMeshRef.current.position.y = startY.current + elapsed * 0.019 // Much slower upward
      bMeshRef.current.position.x = -5.5 + Math.sin(time * 0.25) * 1.0 + Math.sin(time * 0.4) * 0.5 // Moved to left side
      bMeshRef.current.position.z = -1.5 + Math.cos(time * 0.2) * 0.9 + Math.cos(time * 0.3) * 0.3
      
      // Constrain to left side to avoid b.png on right (x < 1.5)
      if (bMeshRef.current.position.x > 1.5) {
        bMeshRef.current.position.x = 1.5 - (bMeshRef.current.position.x - 1.5) * 0.3
      }
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
          position={[-5.5, -2.5, -1.5]} // Moved to left to avoid b.png on right
          material={bMaterial}
          scale={0.55}
        >
          <planeGeometry args={[aspectRatio * 1.5, 1.5]} />
        </mesh>
      )
    }

  const FloatingBSmall3 = () => {
    const bMeshRef = useRef<Mesh | null>(null)
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
    const bMeshRef = useRef<Mesh | null>(null)
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
      // Pattern 5: Left-center, wave-like motion (slower) - floating DOWN from top - moved to left to avoid b.png
      bMeshRef.current.position.y = startY.current - elapsed * 0.018 // Float downward slowly
      bMeshRef.current.position.x = -2.5 + Math.sin(time * 0.22) * 1.0 + Math.sin(time * 0.35) * 0.4 // Moved to left to avoid b.png
      bMeshRef.current.position.z = 2 + Math.cos(time * 0.2) * 0.9 + Math.cos(time * 0.32) * 0.3
      bMeshRef.current.rotation.y = Math.sin(time * 0.16) * 0.11
      bMeshRef.current.rotation.x = Math.cos(time * 0.12) * 0.07
      
      // Constrain to left side to avoid b.png on right (x < 1.5)
      if (bMeshRef.current.position.x > 1.5) {
        bMeshRef.current.position.x = 1.5 - (bMeshRef.current.position.x - 1.5) * 0.3
      }
      
      // Constrain to left side to avoid b.png on right (x < 1.5)
      if (bMeshRef.current.position.x > 1.5) {
        bMeshRef.current.position.x = 1.5 - (bMeshRef.current.position.x - 1.5) * 0.3
      }

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
      const count = 8 // Reduced for elegant, less crowded appearance
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
      
      // Minimum distance between leaves to prevent clustering (increased for universe effect)
      const minDistance = 8.0
      
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
          const radius = Math.sqrt(i / count) * 50 + 5 // Increased spread for universe effect
          x = Math.cos(angle) * radius + (Math.random() - 0.5) * 25 // Much wider horizontal spread
          z = Math.sin(angle) * radius + (Math.random() - 0.5) * 30 // Much wider depth spread
          // Spread leaves evenly across entire page including above BOUTALLION
          y = -12 + Math.random() * 30 // Increased vertical spread for universe effect
          
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
        // Maximum size constraint to prevent leaves from becoming unclear
        const MAX_LEAF_SCALE = 2.2
        const sizeCategory = sizeCategories[Math.floor(Math.random() * sizeCategories.length)]
        const sizeVariation = Math.min(sizeCategory + (Math.random() - 0.5) * 0.1, MAX_LEAF_SCALE)
        
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
        
        // Constrain leaves to left side to avoid b.png on right (x < 1.5)
        if (child.position.x > 1.5) {
          child.position.x = 1.5 - (child.position.x - 1.5) * 0.3
        }
        
        // Constrain leaves to left side to avoid b.png on right (x < 1.5)
        if (child.position.x > 1.5) {
          child.position.x = 1.5 - (child.position.x - 1.5) * 0.3
        }
        
        // Smooth scaling animation - bigger to smaller and back (very slow)
        // Maximum scale constraint to prevent leaves from becoming unclear
        const MAX_LEAF_SCALE = 2.2
        const scalePulse = 1 + Math.sin(time * 0.15 + i * 0.5) * 0.1 // Slow pulse between 0.9 and 1.1
        const finalScale = Math.min(leaf.scale * scalePulse, MAX_LEAF_SCALE)
        child.scale.setScalar(finalScale)
        
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
    const { viewport } = useThree()
    const isMobile = viewport.width < 6
    
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
            const sizeCategories = [0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2] // Larger sizes so engraving is visible
            return Array.from({ length: count }, (_, i) => {
              const angle = (i / count) * Math.PI * 2
              const radius = 22 + Math.random() * 18 // Increased spread for universe effect
              const sizeVariation = sizeCategories[Math.floor(Math.random() * sizeCategories.length)] + (Math.random() - 0.5) * 0.2
              // Avoid center area where BOUTALLION is (y between -1 and 1)
              let yPos = -10 + Math.random() * 25 // Increased vertical spread
              if (yPos > -1 && yPos < 1) {
                yPos = yPos < 0 ? -2 + Math.random() * 1 : 1 + Math.random() * 1
              }
              return {
                position: [
                  Math.cos(angle) * radius + (Math.random() - 0.5) * 15, // Increased spread for universe effect
                  yPos,
                  Math.sin(angle) * radius + (Math.random() - 0.5) * 15 // Increased depth spread
                ] as [number, number, number],
                startY: yPos,
                floatSpeed: 0.0005 + Math.random() * 0.0003, // Very slow, consistent speed
                velocity: [
                  (Math.random() - 0.5) * 0.0002, // Very slow horizontal movement
                  Math.random() * 0.0003 + 0.00015, // Very slow upward movement
                  (Math.random() - 0.5) * 0.0002 // Very slow depth movement
                ] as [number, number, number],
                scale: sizeVariation,
                rotationSpeed: [
                  (Math.random() - 0.5) * 0.0002, // Very slow, smooth rotation
                  (Math.random() - 0.5) * 0.0002,
                  (Math.random() - 0.5) * 0.0002
                ]
              }
            })
          }, [isMobile])

    useFrame(({ clock }) => {
      if (!buttonsGroupRef.current || !textureLoaded) return
      const time = clock.getElapsedTime()

      buttonsGroupRef.current.children.forEach((child, i) => {
        if (!(child instanceof THREE.Mesh)) return
        const button = buttonsData[i]
        if (!button) return

        // Elegant floating movement - smooth and graceful, very slow, subtle floating
        const velocity = button.velocity
        // Very subtle oscillation for gentle floating effect
        child.position.x += velocity[0] + Math.sin(time * 0.003 + i) * 0.00003 // Very slow, subtle oscillation
        child.position.y += velocity[1] + Math.cos(time * 0.0025 + i) * 0.00005 // Very slow, subtle oscillation
        child.position.z += velocity[2] + Math.sin(time * 0.003 + i * 0.6) * 0.00003 // Very slow, subtle oscillation
        
        let newX = child.position.x
        let newZ = child.position.z
        
        // Collision detection - prevent overlapping with other buttons (very gentle)
        const minDistance = 7.0 // Increased for universe effect
        allButtonsRef.current.forEach((otherButton, key) => {
          if (key === i || !otherButton) return
          const dx = newX - otherButton.position.x
          const dy = child.position.y - otherButton.position.y
          const dz = newZ - otherButton.position.z
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (distance < minDistance && distance > 0) {
            // Very gentle push with damping to prevent shocking movements
            const pushStrength = (minDistance - distance) / minDistance * 0.03 // Very gentle push
            newX += dx / distance * pushStrength
            newZ += dz / distance * pushStrength
            if (Math.abs(dy) < 1.5) {
              child.position.y += (dy > 0 ? 1 : -1) * pushStrength * 0.1 // Very gentle vertical push
            }
          }
        })
        
        // Smooth interpolation instead of direct assignment to prevent shocking movements
        const lerpFactor = 0.1 // Smooth interpolation factor
        child.position.x += (newX - child.position.x) * lerpFactor
        child.position.z += (newZ - child.position.z) * lerpFactor

        // Very slow, smooth rotation
        child.rotation.x += button.rotationSpeed[0] * 0.5 // Slower rotation
        child.rotation.y += button.rotationSpeed[1] * 0.5 // Slower rotation
        child.rotation.z += button.rotationSpeed[2] * 0.5 // Slower rotation

        // Smooth boundary constraints instead of instant resets to prevent shocking movements
        if (child.position.y > 8) {
          // Smoothly move back instead of instant reset
          child.position.y -= 0.01
        } else if (child.position.y < -8) {
          // Smoothly move back instead of instant reset
          child.position.y += 0.01
        }
        
        // Smooth horizontal boundary constraints
        if (Math.abs(child.position.x) > 12) {
          child.position.x += (child.position.x > 0 ? -1 : 1) * 0.01
        }
        if (Math.abs(child.position.z) > 10) {
          child.position.z += (child.position.z > 0 ? -1 : 1) * 0.01
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
              <planeGeometry args={[aspectRatio * 0.8, 0.8]} />
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
    const { viewport } = useThree()
    
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
          position: [3, 0, 0] as [number, number, number], // Default position, adjusted dynamically in useFrame
          floatSpeed: 0.002 + Math.random() * 0.001,
          resetY: -3,
          maxY: 3,
          size: 'medium' as const,
        }
      ]
    }, [])

    useFrame(({ clock, viewport }) => {
      if (!bGroupRef.current || !textureLoaded) return
      const time = clock.getElapsedTime()

      bGroupRef.current.children.forEach((child, i) => {
        if (!(child instanceof THREE.Mesh)) return
        const b = bData[i]
        if (!b) return

        const elapsed = time * b.floatSpeed
        child.position.y = startYRefs.current[i] + elapsed

        // Adjust position and scale based on viewport width - responsive for all devices
        const isMobile = viewport.width < 6 // Mobile: very small screens
        const isTablet = viewport.width >= 6 && viewport.width < 10 // Tablet: medium screens
        
        // Calculate scale dynamically
        let scale = 2.0 // Desktop default
        if (isMobile) {
          scale = 0.9 // Smaller on mobile
        } else if (isTablet) {
          scale = 1.5 // Medium on tablet
        }
        
        // Update scale in real-time
        child.scale.setScalar(scale)
        
        // Calculate logo half-width based on actual size (geometry width * scale)
        const aspectRatio = bTexture.image && bTexture.image.width && bTexture.image.height
          ? bTexture.image.width / bTexture.image.height
          : 1
        const logoHalfWidth = (aspectRatio * 1.2 * scale) / 2 // Half width of the logo
        const logoHalfHeight = (1.2 * scale) / 2 // Half height of the logo
        
        // Adjust position bounds to account for logo size - ensure it's never cut off
        const viewportHalfWidth = viewport.width / 2
        const viewportHalfHeight = viewport.height / 2
        
        let baseX = 3 // Desktop default
        let minX = -viewportHalfWidth + logoHalfWidth + 0.2 // Left edge + logo half + padding
        let maxX = viewportHalfWidth - logoHalfWidth - 0.2 // Right edge - logo half - padding
        
        if (isMobile) {
          baseX = 1.0 // Closer to center on mobile
          minX = -viewportHalfWidth + logoHalfWidth + 0.3
          maxX = viewportHalfWidth - logoHalfWidth - 0.3
        } else if (isTablet) {
          baseX = 2.0 // Slightly left of center on tablet
          minX = -viewportHalfWidth + logoHalfWidth + 0.25
          maxX = viewportHalfWidth - logoHalfWidth - 0.25
        } else {
          // Desktop: keep it on the right side but ensure visibility
          minX = Math.max(minX, 1.5) // Don't go too far left on desktop
        }
        
        // Keep B logo visible - more movement on mobile and tablet
        let driftX = Math.sin(time * 0.05) * 0.15 // Desktop: small drift
        let driftZ = Math.cos(time * 0.045) * 0.2
        
        if (isMobile) {
          // Mobile: more noticeable movement
          driftX = Math.sin(time * 0.08) * 0.4
          driftZ = Math.cos(time * 0.07) * 0.3
        } else if (isTablet) {
          // Tablet: moderate movement
          driftX = Math.sin(time * 0.06) * 0.25
          driftZ = Math.cos(time * 0.055) * 0.25
        }
        
        child.position.x = baseX + driftX
        child.position.z = b.position[2] + driftZ
        
        // Enforce horizontal bounds to prevent cutoff
        if (child.position.x < minX) {
          child.position.x = minX
        } else if (child.position.x > maxX) {
          child.position.x = maxX
        }
        
        // Desktop: Position B logo in bottom right corner (fixed, no floating)
        if (!isMobile && !isTablet) {
          // Desktop: Fixed position in bottom right corner
          const rightMargin = 0.5 // Distance from right edge
          const bottomMargin = 0.5 // Distance from bottom edge
          child.position.x = viewportHalfWidth - logoHalfWidth - rightMargin
          child.position.y = -viewportHalfHeight + logoHalfHeight + bottomMargin
          startYRefs.current[0] = -viewportHalfHeight + logoHalfHeight + bottomMargin
        } else if (isMobile) {
          // Mobile: Position b.png below the email input field box
          const rightMargin = 0.5 // Distance from right edge
          // Position it lower on the page, below the form area (around y=-3 to -4)
          const formAreaY = -2.5 // Approximate Y position of form area
          const spacingBelowForm = 1.5 // Space below the form
          child.position.x = viewportHalfWidth - logoHalfWidth - rightMargin
          child.position.y = formAreaY - spacingBelowForm - logoHalfHeight
          startYRefs.current[0] = formAreaY - spacingBelowForm - logoHalfHeight
          
          // Keep it fixed horizontally on desktop (no drift)
          child.position.z = b.position[2]
          
          // Skip the rest of the floating animation logic on desktop
          child.rotation.y = 0
          child.rotation.x = 0
          return
        }
        
        // Mobile/Tablet: Keep existing floating behavior
        // Keep B logo away from BOUTALLION text area (y between -1.5 and 1.5)
        if (child.position.y > -1.5 && child.position.y < 1.5) {
          // Push away from text - prefer below
          child.position.y = -2
          startYRefs.current[0] = -2
        }
        
        // Keep within vertical bounds - account for logo height to prevent cutoff
        const minY = -viewportHalfHeight + logoHalfHeight + 0.3
        const maxY = viewportHalfHeight - logoHalfHeight - 0.3
        
        if (child.position.y < minY) {
          child.position.y = minY
          startYRefs.current[0] = minY
        } else if (child.position.y > maxY) {
          child.position.y = maxY
          startYRefs.current[0] = maxY
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
          // Initial scale - will be updated dynamically in useFrame
          const isMobile = viewport.width < 6
          const isTablet = viewport.width >= 6 && viewport.width < 10
          let initialScale = 2.0
          if (isMobile) {
            initialScale = 0.9
          } else if (isTablet) {
            initialScale = 1.5
          }
          return (
            <mesh
              key={i}
              position={b.position}
              material={bMaterial.clone()}
              scale={initialScale}
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
    
    const isMobile = viewport.width < 6
    
    const leavesData = useMemo(() => {
      const count = 5 // Reduced for elegant, less crowded appearance
      const goldenAngle = Math.PI * (3 - Math.sqrt(5)) // Golden angle for even distribution
      return Array.from({ length: count }, (_, i) => {
        const angle = i * goldenAngle
        const radius = 35 + Math.random() * 30 // Much wider spread - leaves more spread out
        // Maximum size constraint - increased to allow larger leaves sometimes
        const MAX_LEAF_SCALE = 2.2
        const sizeVariation = Math.min(1.4 + Math.random() * 1.8, MAX_LEAF_SCALE) // Larger range, sometimes bigger
        // On mobile, distribute leaves across full vertical space including above BOUTALLION
        // On desktop, avoid center area where BOUTALLION is (y between -1.5 and 1.5)
        let yPos: number
        if (isMobile) {
          // Mobile: Full vertical spread from -7 to 3 (well above BOUTALLION)
          yPos = -7 + Math.random() * 10 // Spread from -7 to 3
        } else {
          // Desktop: Original logic
          yPos = -7 + Math.random() * 16
          if (yPos > -1.5 && yPos < 1.5) {
            yPos = yPos < 0 ? -2.5 + Math.random() * 1 : 1.5 + Math.random() * 1
          }
        }
        
        return {
          position: [
            Math.cos(angle) * radius + (Math.random() - 0.5) * 25, // Much wider horizontal spread
            yPos,
            Math.sin(angle) * radius + (Math.random() - 0.5) * 25 // Much wider depth spread
          ] as [number, number, number],
          startY: yPos,
          floatSpeed: 0.0004 + Math.random() * 0.0002, // Very slow, consistent speed
          velocity: [
            (Math.random() - 0.5) * 0.0003, // Very slow horizontal movement
            Math.random() * 0.00015 + 0.0001, // Very slow upward movement
            (Math.random() - 0.5) * 0.0003 // Very slow depth movement
          ] as [number, number, number],
          scale: sizeVariation,
          mirrored: i % 3 === 0, // 33% mirrored, 67% non-mirrored - both colors have non-mirrored leaves
          rotationSpeed: [
            (Math.random() - 0.5) * 0.00015, // Slower, more elegant rotation
            (Math.random() - 0.5) * 0.00015,
            (Math.random() - 0.5) * 0.00015
          ]
        }
      })
    }, [isMobile])

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

        // Elegant floating movement - smooth and graceful, very slow, subtle floating
        const velocity = leaf.velocity
        // Very subtle oscillation for gentle floating effect
        child.position.x += velocity[0] + Math.sin(time * 0.003 + i) * 0.00003 // Very slow, subtle oscillation
        child.position.y += velocity[1] + Math.cos(time * 0.0025 + i) * 0.00005 // Very slow, subtle oscillation
        child.position.z += velocity[2] + Math.sin(time * 0.003 + i * 0.7) * 0.00003 // Very slow, subtle oscillation
        
        // Smooth constraint to left side to avoid b.png on right (x < 1.5)
        if (child.position.x > 1.5) {
          child.position.x -= (child.position.x - 1.5) * 0.05 // Smooth damping instead of instant
        }
        
        let newX = child.position.x
        let newZ = child.position.z
        
        // Collision detection - prevent overlapping with other leaves (very gentle)
        const minDistance = 8.0 // Increased minimum distance between leaves
        allLeavesRef.current.forEach((otherLeaf, key) => {
          if (key === `leaf2-${i}` || !otherLeaf) return // Skip self
          
          const dx = newX - otherLeaf.position.x
          const dy = child.position.y - otherLeaf.position.y
          const dz = newZ - otherLeaf.position.z
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
          
          if (distance < minDistance && distance > 0) {
            // Very gentle push with damping to prevent shocking movements
            const pushStrength = (minDistance - distance) / minDistance * 0.03 // Very gentle push
            newX += dx / distance * pushStrength
            newZ += dz / distance * pushStrength
            if (Math.abs(dy) < 2) {
              child.position.y += (dy > 0 ? 1 : -1) * pushStrength * 0.1 // Very gentle vertical push
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
          // Very gentle mouse influence to prevent shocking movements
          const pushDirectionX = (newX - mouseRef.current.x) / mouseDistance
          const pushDirectionZ = (newZ - mouseRef.current.z) / mouseDistance
          const pushStrength = mouseInfluence * 0.1 // Reduced mouse influence
          newX += pushDirectionX * pushStrength
          newZ += pushDirectionZ * pushStrength
        }
        
        // Smooth interpolation instead of direct assignment to prevent shocking movements
        const lerpFactor = 0.1 // Smooth interpolation factor
        child.position.x += (newX - child.position.x) * lerpFactor
        child.position.z += (newZ - child.position.z) * lerpFactor

        // Smooth rotation with mouse influence - very slow
        const rotationInfluence = mouseInfluence * 0.3 // Reduced influence
        child.rotation.x += leaf.rotationSpeed[0] * (0.5 + rotationInfluence * 0.2) // Slower base rotation
        child.rotation.y += leaf.rotationSpeed[1] * (0.5 + rotationInfluence * 0.2) // Slower base rotation
        child.rotation.z += leaf.rotationSpeed[2] * (0.5 + rotationInfluence * 0.2) // Slower base rotation

        // Smooth scale pulse - preserve mirrored scale (bigger variation) with mouse influence
        // Maximum scale constraint to prevent leaves from becoming unclear
        const MAX_LEAF_SCALE = 2.2
        const scalePulse = 1 + Math.sin(time * 0.15 + i * 0.5) * 0.25 + mouseInfluence * 0.2
        const finalScale = Math.min(leaf.scale * scalePulse, MAX_LEAF_SCALE)
        const aspectRatio = leafTexture.image && leafTexture.image.width && leafTexture.image.height
          ? leafTexture.image.width / leafTexture.image.height
          : 1
        if (leaf.mirrored) {
          child.scale.set(-finalScale * aspectRatio, finalScale, 1)
        } else {
          child.scale.set(finalScale * aspectRatio, finalScale, 1)
        }

        // Smooth boundary constraints instead of instant resets to prevent shocking movements
        if (child.position.y > 8) {
          // Smoothly move back instead of instant reset
          child.position.y -= 0.01
        } else if (child.position.y < -8) {
          // Smoothly move back instead of instant reset
          child.position.y += 0.01
        }
        
        // Smooth horizontal boundary constraints
        if (Math.abs(child.position.x) > 12) {
          child.position.x += (child.position.x > 0 ? -1 : 1) * 0.01
        }
        if (Math.abs(child.position.z) > 10) {
          child.position.z += (child.position.z > 0 ? -1 : 1) * 0.01
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
    
    const isMobile = viewport.width < 6

    const leavesData = useMemo(() => {
      const count = 4 // Reduced for elegant, less crowded appearance
      const goldenAngle = Math.PI * (3 - Math.sqrt(5))
      return Array.from({ length: count }, (_, i) => {
        const angle = i * goldenAngle
        const radius = 30 + Math.random() * 25 // Much wider spread - leaves more spread out
        const sizeVariation = 1.4 + Math.random() * 1.8 // Bigger sizes - sometimes larger
        // On mobile, distribute leaves across full vertical space including above BOUTALLION
        let yPos: number
        let startY: number
        if (isMobile) {
          // Mobile: Full vertical spread from -7 to 3 (well above BOUTALLION)
          yPos = -7 + Math.random() * 10 // Spread from -7 to 3
          startY = yPos
        } else {
          // Desktop: Original positioning
          yPos = -10 + Math.random() * 25 // Increased vertical spread
          startY = -7 + Math.random() * 16
        }
        return {
          position: [
            Math.cos(angle) * radius + (Math.random() - 0.5) * 22, // Much wider horizontal spread
            yPos,
            Math.sin(angle) * radius + (Math.random() - 0.5) * 22 // Much wider depth spread
          ] as [number, number, number],
          startY,
          floatSpeed: 0.0003 + Math.random() * 0.0002, // Very slow, smooth floating speed
          velocity: [
            (Math.random() - 0.5) * 0.00025, // Very slow, smooth horizontal movement
            Math.random() * 0.00012 + 0.00008, // Very slow, smooth upward movement
            (Math.random() - 0.5) * 0.00025 // Very slow, smooth depth movement
          ] as [number, number, number],
          scale: sizeVariation,
          mirrored: i % 3 === 0, // 33% mirrored, 67% non-mirrored - both colors have non-mirrored leaves
          rotationSpeed: [
            (Math.random() - 0.5) * 0.00015, // Slower, more elegant rotation
            (Math.random() - 0.5) * 0.00015,
            (Math.random() - 0.5) * 0.00015
          ]
        }
      })
    }, [isMobile])

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

        // Elegant floating movement - smooth and graceful, subtle floating
        const velocity = leaf.velocity
        // Very subtle oscillation for gentle floating effect
        child.position.x += velocity[0] + Math.sin(time * 0.003 + i) * 0.00003 // Very slow, subtle oscillation
        child.position.y += velocity[1] + Math.cos(time * 0.0025 + i) * 0.00005 // Very slow, subtle oscillation
        child.position.z += velocity[2] + Math.sin(time * 0.003 + i * 0.7) * 0.00003 // Very slow, subtle oscillation
        
        // Smooth constraint to left side to avoid b.png on right (x < 1.5)
        if (child.position.x > 1.5) {
          child.position.x -= (child.position.x - 1.5) * 0.05 // Smooth damping instead of instant
        }
        
        let newX = child.position.x
        let newZ = child.position.z
        
        // Collision detection - prevent overlapping with other leaves (very gentle)
        const minDistance = 4.0
        allLeavesRef.current.forEach((otherLeaf, key) => {
          if (key === `leaf-${i}` || !otherLeaf) return
          
          const dx = newX - otherLeaf.position.x
          const dy = child.position.y - otherLeaf.position.y
          const dz = newZ - otherLeaf.position.z
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
          
          if (distance < minDistance && distance > 0) {
            // Very gentle push with damping to prevent shocking movements
            const pushStrength = (minDistance - distance) / minDistance * 0.02 // Very gentle push
            newX += dx / distance * pushStrength
            newZ += dz / distance * pushStrength
          }
        })
        
        // Smooth interpolation instead of direct assignment to prevent shocking movements
        const lerpFactor = 0.1 // Smooth interpolation factor
        child.position.x += (newX - child.position.x) * lerpFactor
        child.position.z += (newZ - child.position.z) * lerpFactor

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

        // Smooth boundary constraints instead of instant resets to prevent shocking movements
        if (child.position.y > 8) {
          // Smoothly move back instead of instant reset
          child.position.y -= 0.01
        } else if (child.position.y < -8) {
          // Smoothly move back instead of instant reset
          child.position.y += 0.01
        }
        
        // Smooth horizontal boundary constraints
        if (Math.abs(child.position.x) > 12) {
          child.position.x += (child.position.x > 0 ? -1 : 1) * 0.01
        }
        if (Math.abs(child.position.z) > 10) {
          child.position.z += (child.position.z > 0 ? -1 : 1) * 0.01
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
    
    const isMobile = viewport.width < 6

    const leavesData = useMemo(() => {
      const count = 4 // Reduced for elegant, less crowded appearance
      const goldenAngle = Math.PI * (3 - Math.sqrt(5))
      return Array.from({ length: count }, (_, i) => {
        const angle = i * goldenAngle
        const radius = 30 + Math.random() * 25 // Much wider spread - leaves more spread out
        const sizeVariation = 1.4 + Math.random() * 1.8 // Bigger sizes - sometimes larger
        // On mobile, distribute leaves across full vertical space including above BOUTALLION
        let yPos: number
        let startY: number
        if (isMobile) {
          // Mobile: Full vertical spread from -7 to 3 (well above BOUTALLION)
          yPos = -7 + Math.random() * 10 // Spread from -7 to 3
          startY = yPos
        } else {
          // Desktop: Original positioning
          yPos = -10 + Math.random() * 25 // Increased vertical spread
          startY = -7 + Math.random() * 16
        }
        return {
          position: [
            Math.cos(angle) * radius + (Math.random() - 0.5) * 22, // Much wider horizontal spread
            yPos,
            Math.sin(angle) * radius + (Math.random() - 0.5) * 22 // Much wider depth spread
          ] as [number, number, number],
          startY,
          floatSpeed: 0.0003 + Math.random() * 0.0002, // Very slow, smooth floating speed
          velocity: [
            (Math.random() - 0.5) * 0.00025, // Very slow, smooth horizontal movement
            Math.random() * 0.00012 + 0.00008, // Very slow, smooth upward movement
            (Math.random() - 0.5) * 0.00025 // Very slow, smooth depth movement
          ] as [number, number, number],
          scale: sizeVariation,
          mirrored: i % 3 === 0, // 33% mirrored, 67% non-mirrored - both colors have non-mirrored leaves
          rotationSpeed: [
            (Math.random() - 0.5) * 0.00015, // Slower, more elegant rotation
            (Math.random() - 0.5) * 0.00015,
            (Math.random() - 0.5) * 0.00015
          ]
        }
      })
    }, [isMobile])

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

        // Elegant floating movement - smooth and graceful, very slow
        const velocity = leaf.velocity
        child.position.x += velocity[0] + Math.sin(time * 0.003 + i) * 0.00003 // Very slow, subtle oscillation
        child.position.y += velocity[1] + Math.cos(time * 0.0025 + i) * 0.00005 // Very slow, subtle oscillation
        child.position.z += velocity[2] + Math.sin(time * 0.003 + i * 0.7) * 0.00003 // Very slow, subtle oscillation
        
        // Constrain leaves to left side to avoid b.png on right (x < 1.5)
        if (child.position.x > 1.5) {
          child.position.x = 1.5 - (child.position.x - 1.5) * 0.3
        }
        
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
            const pushStrength = (minDistance - distance) / minDistance * 0.05 // Further reduced for very smooth movement
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

        // Smooth rotation with mouse influence - very slow
        const rotationInfluence = mouseInfluence * 0.3 // Reduced influence
        child.rotation.x += leaf.rotationSpeed[0] * (0.5 + rotationInfluence * 0.2) // Slower base rotation
        child.rotation.y += leaf.rotationSpeed[1] * (0.5 + rotationInfluence * 0.2) // Slower base rotation
        child.rotation.z += leaf.rotationSpeed[2] * (0.5 + rotationInfluence * 0.2) // Slower base rotation

        // Smooth scale pulse - preserve mirrored scale (bigger variation) with mouse influence
        // Maximum scale constraint to prevent leaves from becoming unclear
        const MAX_LEAF_SCALE = 2.2
        const scalePulse = 1 + Math.sin(time * 0.15 + i * 0.5) * 0.25 + mouseInfluence * 0.2
        const finalScale = Math.min(leaf.scale * scalePulse, MAX_LEAF_SCALE)
        const aspectRatio = leafTexture.image && leafTexture.image.width && leafTexture.image.height
          ? leafTexture.image.width / leafTexture.image.height
          : 1
        if (leaf.mirrored) {
          child.scale.set(-finalScale * aspectRatio, finalScale, 1)
        } else {
          child.scale.set(finalScale * aspectRatio, finalScale, 1)
        }

        // Smooth boundary constraints instead of instant resets to prevent shocking movements
        if (child.position.y > 8) {
          // Smoothly move back instead of instant reset
          child.position.y -= 0.01
        } else if (child.position.y < -8) {
          // Smoothly move back instead of instant reset
          child.position.y += 0.01
        }
        
        // Smooth horizontal boundary constraints
        if (Math.abs(child.position.x) > 12) {
          child.position.x += (child.position.x > 0 ? -1 : 1) * 0.01
        }
        if (Math.abs(child.position.z) > 10) {
          child.position.z += (child.position.z > 0 ? -1 : 1) * 0.01
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

  // Video Bubble Component - Magic 3D ball showing the future
  const VideoBubble = memo(function VideoBubble({ videoPath, position, type, index, size = 0.4 }: { 
    videoPath: string
    position: [number, number, number]
    type: 'sphere' | 'disk'
    index: number
    size?: number
  }) {
    const meshRef = useRef<Mesh>(null)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const textureRef = useRef<VideoTexture | null>(null)
    const [textureReady, setTextureReady] = useState(false)
    const { camera } = useThree()
    const initialPosition = useMemo(() => new Vector3(...position), [position])
    
    const geometry = useMemo(() => {
      if (type === 'sphere') {
        return new THREE.SphereGeometry(size, 32, 32) // Higher resolution for magic ball effect
      } else {
        return new THREE.CircleGeometry(size, 32)
      }
    }, [type, size])

    useEffect(() => {
      const video = document.createElement('video')
      video.src = videoPath
      video.loop = true
      video.muted = true
      video.playsInline = true
      video.crossOrigin = 'anonymous'
      video.preload = 'auto'
      
      const handleLoadedData = () => {
        try {
          const texture = new VideoTexture(video)
          // Use best filtering for maximum video clarity
          texture.minFilter = THREE.LinearMipmapLinearFilter
          texture.magFilter = THREE.LinearFilter
          texture.flipY = true // Flip Y to fix upside-down video
          texture.generateMipmaps = true
          texture.anisotropy = 16 // Maximum anisotropy for best clarity
          texture.format = THREE.RGBAFormat // Ensure proper color format
          // Ensure video plays at highest quality
          if (videoRef.current) {
            videoRef.current.playbackRate = 1.0
            videoRef.current.currentTime = 0
            // Set video quality to highest
            if ('webkitDecodedFrameCount' in videoRef.current) {
              (videoRef.current as any).webkitDecodedFrameCount = 0
            }
          }
          textureRef.current = texture
          setTextureReady(true)
        } catch (error) {
          console.error('Error creating video texture:', error)
        }
      }
      
      video.addEventListener('loadeddata', handleLoadedData)
      video.addEventListener('canplay', () => {
        video.play().catch(console.error)
      })
      video.addEventListener('loadedmetadata', () => {
        // Ensure video is ready for high quality playback
        video.play().catch(console.error)
      })
      
      // Set video quality settings for maximum clarity
      video.setAttribute('playsinline', 'true')
      video.setAttribute('webkit-playsinline', 'true')
      video.load()
      videoRef.current = video
      
      return () => {
        video.pause()
        video.removeEventListener('loadeddata', handleLoadedData)
        if (textureRef.current) {
          textureRef.current.dispose()
        }
        video.remove()
      }
    }, [videoPath])

    const material = useMemo(() => {
      const mat = new THREE.MeshStandardMaterial({
        transparent: true,
        opacity: 0.95, // Higher opacity for maximum video clarity
        side: DoubleSide,
        metalness: 0.3, // Much less metallic to show video clearly
        roughness: 0.05, // Very smooth surface for better video clarity
        emissive: '#d4c5a0',
        emissiveIntensity: 0.1, // Minimal emissive to let video show through clearly
        color: '#ffffff',
      })
      
      if (textureRef.current) {
        mat.map = textureRef.current
      }
      
      return mat
    }, [])

    useEffect(() => {
      if (textureRef.current && material) {
        material.map = textureRef.current
        material.needsUpdate = true
      }
    }, [textureReady, material])

    useFrame((state) => {
      if (!meshRef.current) return
      
      const time = state.clock.elapsedTime
      const offset = index * 0.7
      
      // Smaller movement range to avoid overlap with b.png
      meshRef.current.position.x = initialPosition.x + Math.sin(time * 0.15 + offset) * 0.4
      meshRef.current.position.y = initialPosition.y + Math.cos(time * 0.12 + offset * 1.3) * 0.3
      meshRef.current.position.z = initialPosition.z + Math.sin(time * 0.18 + offset * 0.8) * 0.3
      
      // Constrain video bubbles to left side to avoid b.png on right (x < 1.5)
      if (meshRef.current.position.x > 1.5) {
        meshRef.current.position.x = 1.5 - (meshRef.current.position.x - 1.5) * 0.3
      }
      
      // Constrain video bubbles to left side to avoid b.png on right (x < 1.5)
      if (meshRef.current.position.x > 1.5) {
        meshRef.current.position.x = 1.5 - (meshRef.current.position.x - 1.5) * 0.3
      }
      
      if (type === 'sphere') {
        meshRef.current.rotation.y = time * 0.1 + offset
        meshRef.current.rotation.x = 0
        meshRef.current.rotation.z = 0
      } else {
        const direction = new Vector3()
        direction.subVectors(camera.position, meshRef.current.position).normalize()
        const angle = Math.atan2(direction.x, direction.z)
        meshRef.current.rotation.y = angle
        meshRef.current.rotation.x = 0
        meshRef.current.rotation.z = time * 0.05 + offset
      }
      
      // Magic ball pulsing effect - more pronounced
      const pulse = 1 + Math.sin(time * 0.4 + offset) * 0.08
      const maxPulse = type === 'sphere' ? 1.2 : 1.3
      const clampedPulse = Math.min(pulse, maxPulse)
      meshRef.current.scale.setScalar(clampedPulse)
      
      // Add magical glow effect to material while maintaining video clarity
      const mat = meshRef.current.material as THREE.MeshStandardMaterial
      if (mat) {
        mat.emissiveIntensity = 0.1 + Math.sin(time * 0.6 + offset) * 0.05 // Reduced for clarity
        mat.opacity = 0.95 + Math.sin(time * 0.5 + offset) * 0.03 // Higher base opacity for clarity
      }
    })

    return (
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={material}
        position={position}
      />
    )
  })

  // Video Bubbles - Magic 3D balls showing the future (2 smaller spheres with videos)
  const VIDEO_PATHS = ['/videos/video1.mp4', '/videos/video2.mp4']
  
  const VideoBubbles = () => {
    const { viewport } = useThree()
    const isMobile = viewport.width < 6
    
    const bubblesData = useMemo(() => {
      return VIDEO_PATHS.map((videoPath, index) => {
        // Position 2 smaller bubbles on left side to avoid b.png (which is on right)
        // Place them more to the left and center to avoid overlap
        const angle = (index / VIDEO_PATHS.length) * Math.PI * 2
        const radius = 1.2 // Smaller radius, positioned more to the left
        
        // On mobile, distribute bubbles across full vertical space, with one clearly above BOUTALLION
        // On desktop, keep original positioning
        let height: number
        if (isMobile) {
          // Mobile: One bubble well above center (above BOUTALLION), one below
          height = index === 0 ? 2.5 : -1.5 // First bubble high above, second below
        } else {
          // Desktop: Original positioning
          height = index === 0 ? -0.6 : 0.6 // One above, one below center
        }
        
        const depth = 2.8 // Slightly further back
        // Position bubbles on left side (negative x) to avoid b.png on right
        const xOffset = -1.5 // Shift left to avoid right side where b.png is
        
        return {
          videoPath,
          position: [
            Math.cos(angle) * radius + xOffset, // Shift left
            height,
            depth
          ] as [number, number, number],
          type: 'sphere' as const, // Always use sphere for magic ball effect
          index,
          size: 0.25 // Much smaller size to avoid overlap
        }
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile])

    return (
      <>
        {bubblesData.map((bubble, i) => (
          <VideoBubble
            key={i}
            videoPath={bubble.videoPath}
            position={bubble.position}
            type={bubble.type}
            index={bubble.index}
            size={bubble.size}
          />
        ))}
      </>
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
      <VideoBubbles />
    </>
  )
})

export default LuxuryWebGLEffects

