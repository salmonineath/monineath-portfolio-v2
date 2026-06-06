import { useState } from 'react'
import { SectionTitle } from '../ui/SectionTitle'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { projects } from '../../data/projects'

type Filter = 'backend' | 'fullstack' | 'frontend'

const filterLabels: Record<Filter, string> = {
  backend: 'Back-end',
  fullstack: 'Full-Stack',
  frontend: 'Front-end',
}

function ProjectPreview({ title }: { title: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-green-500/20" role="img" aria-label={`${title} screenshot`}>
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28ca41]/80" aria-hidden="true" />
        <span className="ml-2 font-mono text-[11px] text-gray-500">{title.toLowerCase().replace(/\s+/g, '-')} — production</span>
      </div>
      {/* Screenshot placeholder */}
      <div className="aspect-video bg-gradient-to-br from-green-900/50 via-[#0b101c] to-cyan-900/40 flex items-center justify-center">
        <span className="font-mono text-xs text-green-500/40 select-none">[ screenshot loading… ]</span>
      </div>
    </div>
  )
}

export function Projects() {
  const [active, setActive] = useState<Filter>('backend')
  const filtered = projects.filter(p => p.category === active)

  return (
    <section id="project" className="py-20 px-4" aria-label="Projects section">
      <div className="max-w-6xl mx-auto">
        <SectionTitle path="~/projects">Things I've shipped</SectionTitle>

        <div className="flex justify-center gap-2 mb-12" role="tablist" aria-label="Project filters">
          {(Object.keys(filterLabels) as Filter[]).map(f => (
            <button
              key={f}
              role="tab"
              aria-selected={active === f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-md font-mono text-sm font-medium transition-colors ${
                active === f ? 'bg-green-600 text-white' : 'bg-transparent text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>

        <div className="space-y-16">
          {filtered.length > 0 ? filtered.map(project => {
            const info = (
              <div className="space-y-4">
                <p className="font-mono text-green-400 text-xs uppercase tracking-widest">
                  <span className="text-gray-600 select-none">{'<'}</span>
                  {project.subtitle}
                  <span className="text-gray-600 select-none">{' />'}</span>
                </p>
                <h3 className="text-white text-2xl font-bold">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                {project.stack && (
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(tech => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                )}
                <Button variant="outline" size="sm" as="a" href="#">view source →</Button>
              </div>
            )

            return (
              <article key={project.id} className="grid md:grid-cols-2 gap-8 items-center">
                {project.imagePosition === 'left' ? (
                  <>
                    <ProjectPreview title={project.subtitle} />
                    {info}
                  </>
                ) : (
                  <>
                    <div className="md:col-start-2"><ProjectPreview title={project.subtitle} /></div>
                    <div className="md:col-start-1 md:row-start-1">{info}</div>
                  </>
                )}
              </article>
            )
          }) : (
            <p className="text-center font-mono text-gray-500 py-12">404 — no projects in this category yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}
