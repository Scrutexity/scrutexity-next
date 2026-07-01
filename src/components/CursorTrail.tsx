'use client';

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CursorTrail() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const trailElements = trailRef.current.filter(Boolean) as HTMLDivElement[]
    let mouseX = 0, mouseY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Move main cursor
      gsap.to(cursorRef.current, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power2.out' })

      // Create trailing effect by shifting the pooled elements
      const activeTrail = trailElements.shift()
      if (activeTrail) {
        trailElements.push(activeTrail)
        gsap.fromTo(activeTrail, 
          { x: mouseX, y: mouseY, scale: 1, opacity: 0.8 },
          { x: mouseX + (Math.random() - 0.5) * 50, y: mouseY + (Math.random() - 0.5) * 50, scale: 0, opacity: 0, duration: 0.8, ease: 'power3.out' }
        )
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden mix-blend-screen">
      {/* Main Cursor Dot */}
      <div ref={cursorRef} className="absolute w-2 h-2 bg-white rounded-full -ml-1 -mt-1 shadow-[0_0_10px_#00FFB2]" />
      
      {/* Pre-allocated Trail Pool */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          ref={el => { if (el) trailRef.current[i] = el }}
          className="absolute w-1.5 h-1.5 bg-terracotta rounded-full -ml-[3px] -mt-[3px] opacity-0 shadow-[0_0_10px_#00FFB2]" 
        />
      ))}
    </div>
  )
}
