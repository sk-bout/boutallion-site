'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'
import Node from './Node'

interface Section {
  id: string
  label: string
  position: [number, number, number]
}

interface ConstellationSceneProps {
  sections: Section[]
  hoveredNode: string | null
  onNodeHover: (id: string | null) => void
  onNodeClick: (id: string) => void
  isTransitioning: boolean
}

export default function ConstellationScene({
  sections,
  hoveredNode,
  onNodeHover,
  onNodeClick,
  isTransitioning,
}: ConstellationSceneProps) {
  const nodesRef = useRef<{ [key: string]: Mesh }>({})

  // Slow floating animation
  useFrame((state) => {
    if (isTransitioning) return

    sections.forEach((section, index) => {
      const node = nodesRef.current[section.id]
      if (node) {
        const time = state.clock.elapsedTime
        const offset = index * 0.5
        const baseY = section.position[1]
        const baseX = section.position[0]
        node.position.y = baseY + Math.sin(time * 0.1 + offset) * 0.1
        node.position.x = baseX + Math.cos(time * 0.08 + offset) * 0.1
        node.rotation.z = time * 0.05 + offset
      }
    })
  })

  return (
    <>
      {sections.map((section) => (
        <Node
          key={section.id}
          ref={(el) => {
            if (el) nodesRef.current[section.id] = el
          }}
          position={new Vector3(...section.position)}
          isHovered={hoveredNode === section.id}
          isTransitioning={isTransitioning}
          onHover={() => onNodeHover(section.id)}
          onLeave={() => onNodeHover(null)}
          onClick={() => onNodeClick(section.id)}
        />
      ))}
    </>
  )
}

