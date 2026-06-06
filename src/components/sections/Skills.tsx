import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionTitle } from '../ui/SectionTitle'
import { skillCategories } from '../../data/skills'

gsap.registerPlugin(ScrollTrigger)

const iconColors: Record<string, string> = {
  JS: 'bg-yellow-400 text-black',
  Re: 'bg-blue-400 text-black',
  Vu: 'bg-green-500 text-white',
  Ne: 'text-white border border-gray-500',
  No: 'bg-green-600 text-white',
  Ex: 'text-white border border-gray-500',
  Sp: 'bg-green-700 text-white',
  SQ: 'bg-orange-500 text-white',
  My: 'bg-blue-600 text-white',
  Mo: 'bg-green-500 text-white',
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Section title fades up
      gsap.from(titleRef.current, {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      })

      // Timeline line grows downward driven by scroll position
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 60%',
            end: 'bottom 55%',
            scrub: 1.2,
          },
        },
      )

      // Per-row: each row gets its own ScrollTrigger
      gsap.utils.toArray<Element>('.skill-row').forEach((row, i) => {
        const isLeft = i % 2 === 0
        const dot   = row.querySelector('.timeline-dot')
        const icons = row.querySelectorAll('.skill-icon-tile')
        const card  = row.querySelector('.skill-card-wrap')
        const rowTrigger = { trigger: row, start: 'top 83%', once: true }

        // Dot bounces in
        gsap.from(dot, {
          scale: 0, opacity: 0, duration: 0.55, ease: 'back.out(2.5)',
          scrollTrigger: rowTrigger,
        })

        // Dot pulses continuously — like a healthy service heartbeat
        gsap.to(dot, {
          boxShadow: '0 0 16px 6px rgba(34,197,94,0.5)',
          scale: 1.28,
          duration: 1.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })

        // Icons stagger in from their side
        gsap.from(icons, {
          x: isLeft ? -40 : 40,
          opacity: 0,
          duration: 0.5,
          stagger: 0.09,
          ease: 'back.out(1.6)',
          scrollTrigger: rowTrigger,
        })

        // Card slides from the opposite side
        gsap.from(card, {
          x: isLeft ? 40 : -40,
          opacity: 0,
          duration: 0.65,
          ease: 'power3.out',
          delay: 0.08,
          scrollTrigger: rowTrigger,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skill" className="py-20 px-4" aria-label="Skills section">
      <div className="max-w-6xl mx-auto">

        <div ref={titleRef}>
          <SectionTitle path="~/skills">Tech stack</SectionTitle>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Scroll-driven growing line — like a request tracing through services */}
          <div
            className="timeline-line absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-500/40 hidden md:block"
            aria-hidden="true"
          />

          <div className="space-y-16">
            {skillCategories.map((cat, i) => {
              const isLeft = i % 2 === 0
              const icons = (
                <div className={`flex flex-wrap gap-4 justify-center ${isLeft ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'}`}>
                  {cat.skills.map(skill => (
                    <div key={skill.name} className="skill-icon-tile flex flex-col items-center gap-2">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center font-mono font-bold text-sm transition-transform duration-200 hover:scale-110 hover:-translate-y-1 ${iconColors[skill.icon] ?? 'bg-gray-700 text-white'}`}
                        aria-label={skill.name}
                      >
                        {skill.icon}
                      </div>
                      <span className="font-mono text-xs text-gray-400">{skill.name}</span>
                    </div>
                  ))}
                </div>
              )

              const card = (
                <div className={`skill-card-wrap ${isLeft ? 'md:pl-12' : 'md:pr-12'}`}>
                  <div className="bg-[#0d1320] rounded-xl p-6 border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-green-500/25 hover:shadow-[0_14px_36px_rgba(34,197,94,0.07)]">
                    <h3 className="text-white font-semibold text-lg mb-3 font-mono">
                      <span className="text-green-400/70 select-none">{'> '}</span>
                      {cat.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{cat.description}</p>
                  </div>
                </div>
              )

              return (
                <div key={cat.title} className="skill-row relative grid md:grid-cols-2 gap-8 items-center">
                  <div
                    className="timeline-dot absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-green-500 border-2 border-[#070b14] hidden md:block z-10"
                    aria-hidden="true"
                  />
                  {isLeft ? (
                    <>{icons}{card}</>
                  ) : (
                    <><div className="order-2 md:order-1">{card}</div><div className="order-1 md:order-2">{icons}</div></>
                  )}
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
