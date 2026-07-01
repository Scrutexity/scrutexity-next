'use client'

import {
  type ReactNode,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'

/* ─── Design Tokens ─── */
const TERRA_COTTA = '#b9825f'
const SAGE = '#7f8f78'
const CHARCOAL = '#221f1b'
const MUTED = '#6b6259'
const EASE_EXPO = [0.16, 1, 0.3, 1] as const

/* ─── Helpers ─── */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* ═══════════════════════════════════════════════
   1. CursorSpotlight
   ═══════════════════════════════════════════════ */
export function CursorSpotlight() {
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18 })

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Hide on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: prefersReducedMotion() ? 0 : 0.15 }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: springX,
          top: springY,
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${TERRA_COTTA} 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════
   2. ScrollProgress
   ═══════════════════════════════════════════════ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  if (prefersReducedMotion()) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 h-[2px] origin-left"
      style={{ scaleX, backgroundColor: TERRA_COTTA }}
    />
  )
}

/* ═══════════════════════════════════════════════
   3. TextSplitReveal
   ═══════════════════════════════════════════════ */
interface TextSplitRevealProps {
  children: string
  className?: string
}

export function TextSplitReveal({ children, className = '' }: TextSplitRevealProps) {
  const words = children.split(' ')

  if (prefersReducedMotion()) {
    return <span className={className}>{children}</span>
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 0.6,
            delay: i * 0.04,
            ease: EASE_EXPO,
          }}
        >
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  )
}

/* ═══════════════════════════════════════════════
   4. BlurReveal
   ═══════════════════════════════════════════════ */
interface BlurRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function BlurReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
}: BlurRevealProps) {
  if (prefersReducedMotion()) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: EASE_EXPO }}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════
   5. MaskReveal
   ═══════════════════════════════════════════════ */
interface MaskRevealProps {
  children: ReactNode
  className?: string
  direction?: 'left' | 'center'
  duration?: number
}

export function MaskReveal({
  children,
  className = '',
  direction = 'left',
  duration = 0.8,
}: MaskRevealProps) {
  const clipFrom = direction === 'center' ? 'inset(0 50% 0 50%)' : 'inset(0 100% 0 0)'
  const clipTo = 'inset(0 0% 0 0)'

  if (prefersReducedMotion()) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ clipPath: clipFrom }}
      whileInView={{ clipPath: clipTo }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, ease: EASE_EXPO }}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════
   6. TiltCard
   ═══════════════════════════════════════════════ */
interface TiltCardProps {
  children: ReactNode
  className?: string
  glareColor?: string
}

export function TiltCard({
  children,
  className = '',
  glareColor = 'rgba(255,255,255,0.06)',
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const [glare, setGlare] = useState({ x: 50, y: 50 })

  const springRotateX = useSpring(rotateX, { stiffness: 80, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 80, damping: 20 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || prefersReducedMotion()) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) / (rect.width / 2)
      const deltaY = (e.clientY - centerY) / (rect.height / 2)
      rotateX.set(-deltaY * 6)
      rotateY.set(deltaX * 6)
      setGlare({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    },
    [rotateX, rotateY],
  )

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${glareColor} 0%, transparent 60%)`,
          }}
        />
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   7. MagneticButton
   ═══════════════════════════════════════════════ */
interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 120, damping: 15 })
  const springY = useSpring(y, { stiffness: 120, damping: 15 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || prefersReducedMotion()) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      x.set(deltaX)
      y.set(deltaY)
    },
    [strength, x, y],
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════
   8. BeamLine
   ═══════════════════════════════════════════════ */
interface BeamLineProps {
  path: string
  color?: string
  duration?: number
}

export function BeamLine({
  path,
  color = TERRA_COTTA,
  duration = 2,
}: BeamLineProps) {
  if (prefersReducedMotion()) return null

  return (
    <svg className="h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
      {/* Base path */}
      <path d={path} fill="none" stroke={color} strokeWidth="0.2" opacity="0.2" />
      {/* Animated beam */}
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ strokeDasharray: '200%', strokeDashoffset: '200%' }}
        animate={{ strokeDashoffset: '0%' }}
        transition={{
          duration,
          repeat: Infinity,
          ease: EASE_EXPO,
        }}
      />
    </svg>
  )
}

/* ═══════════════════════════════════════════════
   9. GradientOrb
   ═══════════════════════════════════════════════ */
interface GradientOrbProps {
  className?: string
  colors?: string[]
  size?: number
}

export function GradientOrb({
  className = '',
  colors = ['bg-[#b9825f]', 'bg-[#7f8f78]', 'bg-[#6b6259]'],
  size = 300,
}: GradientOrbProps) {
  if (prefersReducedMotion()) {
    return (
      <div
        className={`rounded-full ${colors[0]} ${className}`}
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={{
        x: [0, 15, -10, 0],
        y: [0, -20, 10, 0],
        scale: [1, 1.08, 0.95, 1],
        rotate: [0, 5, -3, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Multi-layer gradient */}
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${colors[0].replace('bg-[', '').replace(']', '')}, ${colors[1].replace('bg-[', '').replace(']', '')} 50%, ${colors[2].replace('bg-[', '').replace(']', '')} 100%)`,
        }}
      />
      {/* Sharp overlay */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${colors[0].replace('bg-[', '').replace(']', '')}, transparent 70%)`,
        }}
        animate={{
          scale: [1, 0.92, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════
   10. ScaleOnScroll
   ═══════════════════════════════════════════════ */
interface ScaleOnScrollProps {
  children: ReactNode
  className?: string
}

export function ScaleOnScroll({ children, className = '' }: ScaleOnScrollProps) {
  if (prefersReducedMotion()) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ scale: 0.97 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE_EXPO }}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════
   11. RippleButton
   ═══════════════════════════════════════════════ */
interface RippleButtonProps {
  children: ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

interface Ripple {
  id: number
  x: number
  y: number
}

export function RippleButton({
  children,
  className = '',
  onClick,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const nextId = useRef(0)
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!btnRef.current) return
      const rect = btnRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = nextId.current++
      setRipples((prev) => [...prev, { id, x, y }])
      onClick?.(e)
    },
    [onClick],
  )

  useEffect(() => {
    if (ripples.length === 0) return
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1))
    }, 600)
    return () => clearTimeout(timer)
  }, [ripples])

  return (
    <button
      ref={btnRef}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: r.x,
            top: r.y,
            width: 8,
            height: 8,
            backgroundColor: TERRA_COTTA,
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </button>
  )
}
