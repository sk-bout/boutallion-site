'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Mesh, BufferGeometry, Material } from 'three'

interface WebGLEffectsDemoProps {
  effectType: string
}

export default function WebGLEffectsDemo({ effectType }: WebGLEffectsDemoProps) {
  const meshRef = useRef<Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  // Silk/Chiffon Simulation
  const SilkSimulation = () => {
    const geometry = useMemo(() => new THREE.PlaneGeometry(4, 4, 32, 32), [])
    const material = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: '#d4c5a0',
        transparent: true,
        opacity: 0.6,
        metalness: 0.1,
        roughness: 0.3,
        side: THREE.DoubleSide,
      })
    }, [])

    useFrame(({ clock, mouse }) => {
      if (!meshRef.current) return
      const time = clock.getElapsedTime()
      const positions = geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        positions[i + 2] = Math.sin(x * 2 + time) * 0.1 + Math.cos(y * 2 + time * 0.5) * 0.1
      }
      geometry.attributes.position.needsUpdate = true
      geometry.computeVertexNormals()
    })

    return <mesh ref={meshRef} geometry={geometry} material={material} rotation={[-Math.PI / 4, 0, 0]} />
  }

  // Luxury Textile Shaders
  const TextileShaders = () => {
    const geometry = useMemo(() => new THREE.PlaneGeometry(3, 3, 64, 64), [])
    const material = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: '#d4c5a0',
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9,
      })
    }, [])

    useFrame(({ clock }) => {
      if (!meshRef.current) return
      const time = clock.getElapsedTime()
      material.emissive = new THREE.Color(0x000000).lerp(
        new THREE.Color(0xd4c5a0),
        Math.sin(time) * 0.3 + 0.3
      )
    })

    return <mesh ref={meshRef} geometry={geometry} material={material} rotation={[-Math.PI / 6, 0, 0]} />
  }

  // Floating Fabric Panels
  const FabricPanels = () => {
    const panels = useMemo(() => {
      return Array.from({ length: 3 }, (_, i) => ({
        position: [i * 1.5 - 1.5, 0, 0] as [number, number, number],
        rotation: [0, i * 0.3, 0] as [number, number, number],
      }))
    }, [])

    return (
      <group>
        {panels.map((panel, i) => (
          <FloatingPanel
            key={i}
            position={panel.position}
            rotation={panel.rotation}
            delay={i * 0.5}
          />
        ))}
      </group>
    )
  }

  const FloatingPanel = ({ position, rotation, delay }: any) => {
    const ref = useRef<Mesh>(null)
    const geometry = useMemo(() => new THREE.PlaneGeometry(1.5, 2, 20, 20), [])
    const material = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: '#d4c5a0',
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      })
    }, [])

    useFrame(({ clock, mouse }) => {
      if (!ref.current) return
      const time = clock.getElapsedTime() + delay
      ref.current.position.y = Math.sin(time) * 0.3
      ref.current.rotation.z = Math.sin(time * 0.5) * 0.2
      ref.current.rotation.x = mouse.y * 0.3
      ref.current.rotation.y = mouse.x * 0.3
    })

    return <mesh ref={ref} geometry={geometry} material={material} position={position} rotation={rotation} />
  }

  // Thread/Weave Patterns
  const ThreadWeave = () => {
    const geometry = useMemo(() => new THREE.PlaneGeometry(4, 4, 100, 100), [])
    const material = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: '#d4c5a0',
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      })
    }, [])

    useFrame(({ clock }) => {
      if (!meshRef.current) return
      const time = clock.getElapsedTime()
      const positions = geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        positions[i + 2] = Math.sin(x * 5 + time) * 0.05 + Math.cos(y * 5 + time) * 0.05
      }
      geometry.attributes.position.needsUpdate = true
    })

    return <mesh ref={meshRef} geometry={geometry} material={material} rotation={[-Math.PI / 4, 0, 0]} />
  }

  // Caustic Light Patterns
  const CausticLight = () => {
    const geometry = useMemo(() => new THREE.PlaneGeometry(5, 5, 128, 128), [])
    const material = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: '#d4c5a0',
        emissive: '#d4c5a0',
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.8,
      })
    }, [])

    useFrame(({ clock }) => {
      if (!meshRef.current) return
      const time = clock.getElapsedTime()
      const positions = geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        const dist = Math.sqrt(x * x + y * y)
        positions[i + 2] = Math.sin(dist * 3 - time * 2) * 0.2
      }
      geometry.attributes.position.needsUpdate = true
      geometry.computeVertexNormals()
    })

    return <mesh ref={meshRef} geometry={geometry} material={material} rotation={[-Math.PI / 3, 0, 0]} />
  }

  // Volumetric Lighting
  const VolumetricLight = () => {
    const geometry = useMemo(() => new THREE.ConeGeometry(0.5, 3, 32), [])
    const material = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: '#d4c5a0',
        emissive: '#d4c5a0',
        emissiveIntensity: 1,
        transparent: true,
        opacity: 0.6,
      })
    }, [])

    useFrame(({ clock }) => {
      if (!meshRef.current) return
      const time = clock.getElapsedTime()
      material.emissiveIntensity = Math.sin(time) * 0.5 + 1
    })

    return (
      <mesh ref={meshRef} geometry={geometry} material={material} position={[0, 0, 0]}>
        <meshStandardMaterial attach="material" {...material} />
      </mesh>
    )
  }

  // Holographic Shimmer
  const HolographicShimmer = () => {
    const geometry = useMemo(() => new THREE.PlaneGeometry(3, 3, 64, 64), [])
    const material = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: '#d4c5a0',
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.8,
      })
    }, [])

    useFrame(({ clock }) => {
      if (!meshRef.current) return
      const time = clock.getElapsedTime()
      const hue = (time * 0.1) % 1
      material.color.setHSL(hue, 0.5, 0.6)
    })

    return <mesh ref={meshRef} geometry={geometry} material={material} rotation={[-Math.PI / 4, 0, 0]} />
  }

  // Luxury Material Reflections
  const MaterialReflections = () => {
    const geometry = useMemo(() => new THREE.SphereGeometry(1.5, 64, 64), [])
    const material = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: '#d4c5a0',
        metalness: 1,
        roughness: 0.1,
        envMapIntensity: 1,
      })
    }, [])

    useFrame(({ clock }) => {
      if (!meshRef.current) return
      const time = clock.getElapsedTime()
      meshRef.current.rotation.y = time * 0.3
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.3
    })

    return <mesh ref={meshRef} geometry={geometry} material={material} />
  }

  // Elegant Particle System
  const ParticleSystem = () => {
    const particles = useMemo(() => {
      const count = 1000
      const positions = new Float32Array(count * 3)
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10
      }
      return positions
    }, [])

    const geometry = useMemo(() => {
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(particles, 3))
      return geo
    }, [particles])

    const material = useMemo(() => {
      return new THREE.PointsMaterial({
        color: '#d4c5a0',
        size: 0.05,
        transparent: true,
        opacity: 0.8,
      })
    }, [])

    useFrame(({ clock }) => {
      if (!meshRef.current) return
      const time = clock.getElapsedTime()
      const positions = geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i]) * 0.01
      }
      geometry.attributes.position.needsUpdate = true
    })

    return <points ref={meshRef} geometry={geometry} material={material} />
  }

  // Organic Morphing Shapes
  const OrganicMorphing = () => {
    const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 2), [])
    const material = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: '#d4c5a0',
        wireframe: false,
        transparent: true,
        opacity: 0.7,
      })
    }, [])

    useFrame(({ clock }) => {
      if (!meshRef.current) return
      const time = clock.getElapsedTime()
      const positions = geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        const z = positions[i + 2]
        const dist = Math.sqrt(x * x + y * y + z * z)
        const scale = 1 + Math.sin(dist * 3 + time) * 0.2
        positions[i] *= scale
        positions[i + 1] *= scale
        positions[i + 2] *= scale
      }
      geometry.attributes.position.needsUpdate = true
      geometry.computeVertexNormals()
    })

    return <mesh ref={meshRef} geometry={geometry} material={material} />
  }

  // Smoke/Steam Effects
  const SmokeSteam = () => {
    const geometry = useMemo(() => new THREE.ConeGeometry(0.3, 2, 32), [])
    const material = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: '#d4c5a0',
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      })
    }, [])

    useFrame(({ clock }) => {
      if (!groupRef.current) return
      const time = clock.getElapsedTime()
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          child.position.y = Math.sin(time + i) * 0.5 + i * 0.3
          child.scale.setScalar(1 + Math.sin(time * 2 + i) * 0.2)
          child.rotation.z = Math.sin(time + i) * 0.2
        }
      })
    })

    return (
      <group ref={groupRef}>
        {Array.from({ length: 5 }, (_, i) => (
          <mesh
            key={i}
            geometry={geometry}
            material={material}
            position={[Math.sin(i) * 0.5, i * 0.4, Math.cos(i) * 0.5]}
          />
        ))}
      </group>
    )
  }

  // Crystal Formations
  const CrystalFormations = () => {
    const geometry = useMemo(() => new THREE.OctahedronGeometry(0.5, 0), [])
    const material = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: '#d4c5a0',
        transparent: true,
        opacity: 0.8,
        metalness: 0.8,
        roughness: 0.2,
      })
    }, [])

    useFrame(({ clock }) => {
      if (!groupRef.current) return
      const time = clock.getElapsedTime()
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          child.rotation.y = time * 0.5 + i
          child.scale.setScalar(0.5 + Math.sin(time + i) * 0.2)
        }
      })
    })

    return (
      <group ref={groupRef}>
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2
          return (
            <mesh
              key={i}
              geometry={geometry}
              material={material}
              position={[Math.cos(angle) * 1.5, Math.sin(angle * 2) * 0.5, Math.sin(angle) * 1.5]}
            />
          )
        })}
      </group>
    )
  }

  // 3D Logo Reveal
  const LogoReveal = () => {
    const particles = useMemo(() => {
      const count = 500
      const positions = new Float32Array(count * 3)
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 4
      }
      return positions
    }, [])

    const geometry = useMemo(() => {
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(particles, 3))
      return geo
    }, [particles])

    const material = useMemo(() => {
      return new THREE.PointsMaterial({
        color: '#d4c5a0',
        size: 0.1,
        transparent: true,
        opacity: 0.9,
      })
    }, [])

    useFrame(({ clock }) => {
      if (!meshRef.current) return
      const time = clock.getElapsedTime()
      const positions = geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        const dist = Math.sqrt(positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2)
        const target = dist < 0.5 ? 0 : positions[i]
        positions[i] += (target - positions[i]) * 0.05
      }
      geometry.attributes.position.needsUpdate = true
    })

    return <points ref={meshRef} geometry={geometry} material={material} />
  }

  // Parallax Depth Layers
  const ParallaxDepth = () => {
    const layers = useMemo(() => [
      { z: -2, scale: 0.8, opacity: 0.4 },
      { z: 0, scale: 1, opacity: 0.6 },
      { z: 2, scale: 1.2, opacity: 0.4 },
    ], [])

    return (
      <group>
        {layers.map((layer, i) => (
          <mesh
            key={i}
            geometry={new THREE.PlaneGeometry(2, 2)}
            material={new THREE.MeshStandardMaterial({
              color: '#d4c5a0',
              transparent: true,
              opacity: layer.opacity,
            })}
            position={[0, 0, layer.z]}
            scale={layer.scale}
          />
        ))}
      </group>
    )
  }

  // Interactive Fabric Drape
  const FabricDrape = () => {
    const geometry = useMemo(() => new THREE.PlaneGeometry(3, 3, 40, 40), [])
    const material = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: '#d4c5a0',
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
      })
    }, [])

    useFrame(({ clock, mouse }) => {
      if (!meshRef.current) return
      const time = clock.getElapsedTime()
      const positions = geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        const mouseInfluence = (mouse.x * x + mouse.y * y) * 0.5
        positions[i + 2] = Math.sin(x * 2 + time) * 0.1 + mouseInfluence * 0.3
      }
      geometry.attributes.position.needsUpdate = true
      geometry.computeVertexNormals()
    })

    return <mesh ref={meshRef} geometry={geometry} material={material} rotation={[-Math.PI / 3, 0, 0]} />
  }

  // Portal/Transition Effects
  const PortalTransition = () => {
    const geometry = useMemo(() => new THREE.RingGeometry(0.5, 2, 64), [])
    const material = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: '#d4c5a0',
        emissive: '#d4c5a0',
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      })
    }, [])

    useFrame(({ clock }) => {
      if (!meshRef.current) return
      const time = clock.getElapsedTime()
      meshRef.current.rotation.z = time
      material.emissiveIntensity = Math.sin(time) * 0.3 + 0.8
    })

    return (
      <group>
        <mesh ref={meshRef} geometry={geometry} material={material} />
        <mesh geometry={geometry} material={material.clone()} rotation={[0, Math.PI / 2, 0]} />
      </group>
    )
  }

  // Subtle Distortion Fields
  const DistortionFields = () => {
    const geometry = useMemo(() => new THREE.PlaneGeometry(4, 4, 64, 64), [])
    const material = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: '#d4c5a0',
        transparent: true,
        opacity: 0.5,
        wireframe: true,
      })
    }, [])

    useFrame(({ clock }) => {
      if (!meshRef.current) return
      const time = clock.getElapsedTime()
      const positions = geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        const dist = Math.sqrt(x * x + y * y)
        positions[i + 2] = Math.sin(dist * 2 - time * 2) * 0.15
      }
      geometry.attributes.position.needsUpdate = true
    })

    return <mesh ref={meshRef} geometry={geometry} material={material} rotation={[-Math.PI / 4, 0, 0]} />
  }

  // Depth of Field Blur (simulated)
  const DepthOfField = () => {
    const geometries = useMemo(() => [
      new THREE.SphereGeometry(0.3, 32, 32),
      new THREE.SphereGeometry(0.4, 32, 32),
      new THREE.SphereGeometry(0.5, 32, 32),
    ], [])

    return (
      <group>
        {geometries.map((geo, i) => (
          <mesh
            key={i}
            geometry={geo}
            material={new THREE.MeshStandardMaterial({
              color: '#d4c5a0',
              transparent: true,
              opacity: i === 1 ? 1 : 0.3,
            })}
            position={[(i - 1) * 1.5, 0, (i - 1) * 1]}
          />
        ))}
      </group>
    )
  }

  // Chromatic Aberration (simulated)
  const ChromaticAberration = () => {
    const geometry = useMemo(() => new THREE.PlaneGeometry(3, 3), [])
    
    return (
      <group>
        {['#ff0000', '#00ff00', '#0000ff'].map((color, i) => (
          <mesh
            key={i}
            geometry={geometry}
            material={new THREE.MeshStandardMaterial({
              color,
              transparent: true,
              opacity: 0.3,
            })}
            position={[(i - 1) * 0.02, (i - 1) * 0.02, 0]}
          />
        ))}
      </group>
    )
  }

  // Mesh Deformation
  const MeshDeformation = () => {
    const geometry = useMemo(() => new THREE.SphereGeometry(1.5, 32, 32), [])
    const material = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: '#d4c5a0',
        transparent: true,
        opacity: 0.8,
        wireframe: false,
      })
    }, [])

    useFrame(({ clock }) => {
      if (!meshRef.current) return
      const time = clock.getElapsedTime()
      const positions = geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        const z = positions[i + 2]
        const dist = Math.sqrt(x * x + y * y + z * z)
        const scale = 1 + Math.sin(dist * 2 + time * 2) * 0.3
        positions[i] *= scale
        positions[i + 1] *= scale
        positions[i + 2] *= scale
      }
      geometry.attributes.position.needsUpdate = true
      geometry.computeVertexNormals()
    })

    return <mesh ref={meshRef} geometry={geometry} material={material} />
  }

  // Render selected effect
  switch (effectType) {
    case 'silk':
      return <SilkSimulation />
    case 'textile':
      return <TextileShaders />
    case 'fabric-panels':
      return <FabricPanels />
    case 'thread':
      return <ThreadWeave />
    case 'caustic':
      return <CausticLight />
    case 'volumetric':
      return <VolumetricLight />
    case 'holographic':
      return <HolographicShimmer />
    case 'reflections':
      return <MaterialReflections />
    case 'particles':
      return <ParticleSystem />
    case 'organic':
      return <OrganicMorphing />
    case 'smoke':
      return <SmokeSteam />
    case 'crystal':
      return <CrystalFormations />
    case 'logo-reveal':
      return <LogoReveal />
    case 'parallax':
      return <ParallaxDepth />
    case 'fabric-drape':
      return <FabricDrape />
    case 'portal':
      return <PortalTransition />
    case 'distortion':
      return <DistortionFields />
    case 'dof':
      return <DepthOfField />
    case 'chromatic':
      return <ChromaticAberration />
    case 'mesh':
      return <MeshDeformation />
    default:
      return <SilkSimulation />
  }
}

