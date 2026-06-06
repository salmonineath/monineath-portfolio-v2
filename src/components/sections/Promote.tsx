import { Button } from '../ui/Button'

const stats = [
  { label: 'uptime', value: '99.9%' },
  { label: 'response', value: '<100ms' },
  { label: 'deploys', value: 'weekly' },
  { label: 'coffee', value: '∞' },
]

export function Promote() {
  return (
    <section className="py-20 px-4" aria-label="Promotion section">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#0b101c] rounded-2xl p-12 border border-green-500/15 relative overflow-hidden">
          {/* Faint glow accent */}
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-green-500/[0.07] blur-[80px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-2 gap-8 items-center relative">
            <div>
              <p className="font-mono text-xs text-green-400/80 mb-3">
                $ systemctl status monineath.service
                <span className="text-green-400 ml-2">● active (running)</span>
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                Need a backend that just works?
              </h2>
              <Button variant="outline" size="md" as="a" href="#contact">ping me</Button>
            </div>

            <div>
              <p className="text-gray-400 leading-relaxed mb-6">
                From the first schema migration to the last deploy — I build server-side
                systems designed to be monitored, maintained and trusted. No mystery
                outages, no spaghetti endpoints. Just infrastructure you can forget about,
                in the best way.
              </p>
              <dl className="grid grid-cols-4 gap-3">
                {stats.map(s => (
                  <div key={s.label} className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 text-center">
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-gray-500 order-2">{s.label}</dt>
                    <dd className="font-mono text-sm md:text-base font-semibold text-green-400">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
