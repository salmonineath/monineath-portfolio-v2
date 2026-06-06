import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Button } from '../ui/Button'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  radius: number
  opacity: number
  vx: number
  vy: number
  color: string
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const avatarFloatRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const promptRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current!
    const canvas = canvasRef.current!
    const renderCtx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = section.offsetWidth
      canvas.height = section.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Build the star field — node-like points with green/cyan server tints
    const COUNT = 140
    const particles: Particle[] = Array.from({ length: COUNT }, () => {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const roll = Math.random()
      // ~20% green nodes, ~15% cyan, rest faint white
      const color = roll < 0.2 ? '74,222,128' : roll < 0.35 ? '103,232,249' : '255,255,255'
      return { x, y, baseX: x, baseY: y, radius: Math.random() * 1.3 + 0.3, opacity: 0, vx: 0, vy: 0, color }
    })

    // Stagger-twinkle each star with GSAP
    particles.forEach(p => {
      gsap.to(p, {
        opacity: Math.random() * 0.65 + 0.2,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        ease: 'power2.inOut',
        onComplete() {
          const peak = p.opacity
          gsap.to(p, {
            opacity: peak * 0.12,
            duration: Math.random() * 3 + 1.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: Math.random() * 2,
          })
        },
      })
    })

    // Mouse tracking relative to canvas
    let mouseX = -9999
    let mouseY = -9999
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }
    const onMouseLeave = () => { mouseX = -9999; mouseY = -9999 }
    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)

    // Render loop — particles react to cursor, spring back to home
    const MOUSE_RADIUS = 130
    const tick = () => {
      renderCtx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) ** 2 * 2.8
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Spring return + damping
        p.vx += (p.baseX - p.x) * 0.04
        p.vy += (p.baseY - p.y) * 0.04
        p.vx *= 0.86
        p.vy *= 0.86
        p.x += p.vx
        p.y += p.vy

        renderCtx.beginPath()
        renderCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        renderCtx.fillStyle = `rgba(${p.color},${p.opacity})`
        renderCtx.fill()
      }
    }
    gsap.ticker.add(tick)

    // Entrance + ongoing animations for all DOM elements
    const animCtx = gsap.context(() => {
      gsap.set(glowRef.current, { opacity: 0.3 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from([orb1Ref.current, orb2Ref.current], {
          opacity: 0, scale: 0.6, duration: 1.5, stagger: 0.3,
        }, 0)
        .from(avatarRef.current, {
          scale: 0, opacity: 0, duration: 0.9, ease: 'back.out(1.7)',
        }, 0.3)
        .from(promptRef.current, { y: 20, opacity: 0, duration: 0.5 }, '-=0.45')
        .from(titleRef.current, { y: 50, opacity: 0, duration: 0.7 }, '-=0.3')
        .from(roleRef.current, { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(statusRef.current, { y: 15, opacity: 0, duration: 0.5 }, '-=0.4')
        .from(descRef.current, { y: 20, opacity: 0, duration: 0.55 }, '-=0.35')
        .from(Array.from(buttonsRef.current?.children ?? []), {
          y: 20, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'back.out(1.4)',
        }, '-=0.3')

      // Avatar float
      gsap.to(avatarFloatRef.current, {
        y: -12, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1,
      })

      // Glow ring pulse
      gsap.to(glowRef.current, {
        opacity: 0.8, scale: 1.15, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1,
      })

      // Ambient orb drift
      gsap.to(orb1Ref.current, {
        x: 40, y: -25, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5,
      })
      gsap.to(orb2Ref.current, {
        x: -30, y: 30, duration: 10, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2,
      })
    }, sectionRef)

    return () => {
      window.removeEventListener('resize', resize)
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
      gsap.ticker.remove(tick)
      particles.forEach(p => gsap.killTweensOf(p))
      animCtx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center pt-16 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Star field canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      {/* Ambient glow orbs — server-room green & cyan */}
      <div
        ref={orb1Ref}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-green-600/10 blur-[120px] pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-cyan-600/10 blur-[90px] pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Main content */}
      <div className="relative max-w-2xl mx-auto px-4" style={{ zIndex: 2 }}>
        <div ref={avatarRef} className="mb-6 flex justify-center">
          <div ref={avatarFloatRef} className="relative" style={{ willChange: 'transform' }}>
            <div
              ref={glowRef}
              className="absolute -inset-8 rounded-full bg-green-500/15 blur-2xl pointer-events-none"
            />
            <div className="relative w-36 h-36 rounded-full bg-white/90 border-4 border-green-500/40 overflow-hidden shadow-[0_0_40px_rgba(34,197,94,0.2)]">
              <img
                src="/profile.jpg"
                alt="Sol Monineath - Backend Developer"
                width={144}
                height={144}
                className="w-full h-full object-cover"
                onError={e => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
            </div>
          </div>
        </div>

        <p ref={promptRef} className="font-mono text-sm text-gray-500 mb-3">
          <span className="text-green-400">monineath@server</span>
          <span>:</span>
          <span className="text-cyan-400">~</span>
          <span>$ whoami</span>
          <span className="cursor-blink text-green-400 ml-1">▌</span>
        </p>

        <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold text-white mb-2">
          Monineath
        </h1>
        <p ref={roleRef} className="font-mono text-xl md:text-2xl text-green-400 mb-4 font-medium">
          {'> '}Backend Developer
        </p>

        <div ref={statusRef} className="flex items-center justify-center gap-4 font-mono text-xs text-gray-500 mb-5">
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-green-500" />
            </span>
            <span className="text-green-400/90">systems operational</span>
          </span>
          <span aria-hidden="true">|</span>
          <span>status: <span className="text-cyan-400">200 OK</span></span>
        </div>

        <p ref={descRef} className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto">
          I build the part of the product you don't see — scalable APIs,
          well-modeled databases and server-side systems that stay fast,
          secure and reliable under load.
        </p>

        <div ref={buttonsRef} className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" size="md" as="a" href="#contact">./hire_me.sh</Button>
          <Button variant="outline" size="md" as="a" href="#about">cat about.json</Button>
        </div>
      </div>
    </section>
  )
}
