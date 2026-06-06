import { SectionTitle } from '../ui/SectionTitle'
import { Card } from '../ui/Card'
import { services } from '../../data/services'

const methodColors: Record<string, string> = {
  GET: 'bg-cyan-500/10 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 border-cyan-600/30 dark:border-cyan-500/30',
  POST: 'bg-green-500/10 dark:bg-green-500/15 text-green-700 dark:text-green-400 border-green-600/30 dark:border-green-500/30',
  PUT: 'bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-600/30 dark:border-amber-500/30',
  DEPLOY: 'bg-purple-500/10 dark:bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-600/30 dark:border-purple-500/30',
}

export function Services() {
  return (
    <section id="service" className="py-20 px-4" aria-label="Services section">
      <div className="max-w-6xl mx-auto">
        <SectionTitle path="~/services">What I can do for you</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(service => (
            <Card key={service.endpoint} className="p-6 hover:border-green-500/30 transition-colors group">
              {/* Endpoint line — like an API docs entry */}
              <div className="flex items-center gap-2 mb-4 font-mono text-xs">
                <span className={`px-2 py-0.5 rounded border font-semibold ${methodColors[service.method]}`}>
                  {service.method}
                </span>
                <span className="text-gray-600 dark:text-gray-400 truncate">{service.endpoint}</span>
              </div>
              <h3 className="text-slate-900 dark:text-white font-semibold text-lg mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>
              <p className="font-mono text-[11px] text-gray-400 dark:text-gray-600 group-hover:text-green-600/70 dark:group-hover:text-green-500/70 transition-colors">
                <span className="select-none">→ </span>200 OK · ready to ship
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
