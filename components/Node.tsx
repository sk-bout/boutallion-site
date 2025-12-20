'use client'

import { forwardRef, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'
import * as THREE from 'three'

interface NodeProps {
  position: Vector3
  isHovered: boolean
  isTransitioning: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
}

const Node = forwardRef<Mesh, NodeProps>(
  ({ position, isHovered, isTransitioning, onHover, onLeave, onClick }, ref) => {
    const meshRef = useRef<Mesh>(null)
    const hoverIntensity = useRef(0)

    // Create organic abstract shape
    const geometry = useMemo(() => {
      const shape = new THREE.IcosahedronGeometry(0.15, 1)
      return shape
    }, [])

    // Glowing material
    const material = useMemo(() => {
      return new THREE.MeshStandardMaterial({
        color: '#c4b5a0',
        emissive: '#c4b5a0',
        emissiveIntensity: 0.2,
        metalness: 0.1,
        roughness: 0.8,
        transparent: true,
        opacity: 0.6,
      })
    }, [])

    useFrame(() => {
      const mesh = meshRef.current
      if (!mesh) return

      // Smooth hover intensity
      hoverIntensity.current += (isHovered ? 1 : 0) - hoverIntensity.current
      hoverIntensity.current *= 0.9

      // Update material properties
      material.emissiveIntensity = 0.2 + hoverIntensity.current * 0.4
      material.opacity = 0.6 + hoverIntensity.current * 0.3

      // Scale on hover
      const targetScale = isHovered ? 1.3 : 1.0
      mesh.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1)

      // Expand on transition
      if (isTransitioning) {
        mesh.scale.lerp(new Vector3(5, 5, 5), 0.05)
        material.opacity = Math.max(0, material.opacity - 0.02)
      }
    })

    return (
      <mesh
        ref={(el) => {
          if (ref) {
            if (typeof ref === 'function') ref(el)
            else ref.current = el
          }
          if (el) meshRef.current = el
        }}
        geometry={geometry}
        material={material}
        position={position}
        onPointerOver={onHover}
        onPointerOut={onLeave}
        onClick={onClick}
        cursor="pointer"
      />
    )
  }
)

Node.displayName = 'Node'

export default Node

