import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionTitle } from '../ui/SectionTitle'
import { Card } from '../ui/Card'

gsap.registerPlugin(ScrollTrigger)

/* Syntax-highlight helpers for the about.json block */
const K = ({ children }: { children: string }) => <span className="text-cyan-300">"{children}"</span>
const S = ({ children }: { children: string }) => <span className="text-green-400">"{children}"</span>
const P = ({ children }: { children: string }) => <span className="text-gray-500">{children}</span>

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const dot1Ref = useRef<HTMLSpanElement>(null)
  const dot2Ref = useRef<HTMLSpanElement>(null)
  const dot3Ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 78%', once: true }

      // Title
      gsap.from(titleRef.current, {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: trigger,
      })

      // Card rises up
      gsap.from(cardRef.current, {
        y: 50, opacity: 0, scale: 0.97, duration: 0.75, ease: 'power3.out',
        delay: 0.1,
        scrollTrigger: trigger,
      })

      // JSON lines cascade in like streaming output
      gsap.from(Array.from(codeRef.current?.children ?? []), {
        x: -20, opacity: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out',
        delay: 0.35,
        scrollTrigger: trigger,
      })

      // Image block slides in from right
      gsap.from(imageWrapRef.current, {
        x: 35, opacity: 0, duration: 0.7, ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: trigger,
      })

      // Rotating dashed ring around image
      gsap.to(ringRef.current, {
        rotation: 360, duration: 16, ease: 'none', repeat: -1,
      })

      // Floating decorative dots
      gsap.to(dot1Ref.current, { y: -10, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to(dot2Ref.current, { y: 10,  duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.8 })
      gsap.to(dot3Ref.current, { y: -7,  duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5 })

      // Card hover lift
      const card = cardRef.current!
      const onEnter = () => gsap.to(card, { y: -5, boxShadow: '0 28px 52px rgba(34,197,94,0.08)', duration: 0.35, ease: 'power2.out' })
      const onLeave  = () => gsap.to(card, { y:  0, boxShadow: '0 0px 0px rgba(0,0,0,0)',         duration: 0.35, ease: 'power2.out' })
      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mouseleave', onLeave)

      return () => {
        card.removeEventListener('mouseenter', onEnter)
        card.removeEventListener('mouseleave', onLeave)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-20 px-4" aria-label="About me section">
      <div className="max-w-6xl mx-auto">

        <div ref={titleRef}>
          <SectionTitle path="~/about">About me</SectionTitle>
        </div>

        <div ref={cardRef} className="rounded-xl">
          <Card terminal="monineath@server: ~/about.json" className="p-8">
            <div className="grid md:grid-cols-3 gap-8 items-start">

              {/* JSON profile column */}
              <div className="md:col-span-2 overflow-x-auto">
                <div ref={codeRef} className="font-mono text-[13px] md:text-sm leading-7 whitespace-pre">
                  <div><P>{'{'}</P></div>
                  <div>  <K>name</K><P>: </P><S>Monineath</S><P>,</P></div>
                  <div>  <K>role</K><P>: </P><S>Backend Developer</S><P>,</P></div>
                  <div>  <K>location</K><P>: </P><S>Phnom Penh, Cambodia</S><P>,</P></div>
                  <div>  <K>focus</K><P>: [</P><S>REST APIs</S><P>, </P><S>databases</S><P>, </P><S>system design</S><P>],</P></div>
                  <div>  <K>currently</K><P>: </P><S>building scalable server-side systems</S><P>,</P></div>
                  <div>  <K>philosophy</K><P>: </P><S>boring tech, exciting results</S><P>,</P></div>
                  <div>  <K>coffee_dependency</K><P>: </P><span className="text-amber-400">true</span><P>,</P></div>
                  <div>  <K>open_to_work</K><P>: </P><span className="text-amber-400">true</span></div>
                  <div><P>{'}'}</P></div>
                </div>
                <p className="mt-6 text-gray-400 text-sm leading-relaxed">
                  I'm a backend developer who cares about what happens after the request leaves
                  the browser — clean API contracts, well-modeled data, and systems that fail
                  gracefully instead of loudly. I like solving the invisible problems:
                  the query that's 10x faster, the queue that never drops a job, the auth
                  flow nobody has to think about.
                </p>
              </div>

              {/* Image column */}
              <div ref={imageWrapRef} className="flex justify-center md:justify-end">
                <div className="relative">
                  {/* Floating decorative dots */}
                  <span ref={dot1Ref} className="absolute -top-3 -left-3 w-3 h-3 rounded-full bg-green-400/60 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                  <span ref={dot2Ref} className="absolute -bottom-3 -right-3 w-2.5 h-2.5 rounded-full bg-cyan-400/55 shadow-[0_0_6px_rgba(103,232,249,0.7)]" />
                  <span ref={dot3Ref} className="absolute top-1/2 -right-5 w-2 h-2 rounded-full bg-green-300/45" />

                  {/* Slowly rotating dashed ring */}
                  <div
                    ref={ringRef}
                    className="absolute -inset-3 rounded-xl border border-dashed border-green-500/30 pointer-events-none"
                  />

                  {/* Image placeholder */}
                  <div
                    className="w-48 h-48 rounded-lg bg-gradient-to-br from-green-700 to-cyan-800"
                    role="img"
                    aria-label="About image"
                  />
                </div>
              </div>

            </div>
          </Card>
        </div>

      </div>
    </section>
  )
}
