import { useState, useEffect, useRef } from 'react'

interface CmdLine {
  cmd: string
  kw: string
  kwCls: string
  dots: number
  doneStr: string
}

const LINES: CmdLine[] = [
  { cmd: 'booting', kw: 'monineath.server', kwCls: 'text-cyan-400', dots: 0, doneStr: '' },
  { cmd: 'loading', kw: '[node, spring, sql, mongo]', kwCls: 'text-blue-400', dots: 7, doneStr: 'done' },
  { cmd: 'connecting', kw: 'database pool', kwCls: 'text-cyan-300', dots: 9, doneStr: 'done' },
  { cmd: 'running', kw: 'migrations', kwCls: 'text-purple-400', dots: 8, doneStr: 'done' },
  { cmd: 'listening', kw: 'on port :3000', kwCls: 'text-green-400', dots: 6, doneStr: '✓ ready' },
]

type Phase = 'idle' | 'typing' | 'kwshow' | 'dots' | 'done'

interface LState {
  phase: Phase
  typed: number
  dots: number
}

function initStates(): LState[] {
  return LINES.map(() => ({ phase: 'idle', typed: 0, dots: 0 }))
}

function patch(arr: LState[], i: number, delta: Partial<LState>): LState[] {
  return arr.map((s, idx) => (idx === i ? { ...s, ...delta } : s))
}

function easeProgress(t: number): number {
  if (t < 0.38) return (t / 0.38) * 0.55
  if (t < 0.72) return 0.55 + ((t - 0.38) / 0.34) * 0.30
  if (t < 0.83) return 0.85 + ((t - 0.72) / 0.11) * 0.02
  return 0.87 + ((t - 0.83) / 0.17) * 0.13
}

const TOTAL_MS = 3000

export function LoadingScreen() {
  const [states, setStates] = useState<LState[]>(initStates)
  const [progress, setProgress] = useState(0)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const step = (now: number) => {
      if (startRef.current === null) startRef.current = now
      const t = Math.min((now - startRef.current) / TOTAL_MS, 1)
      setProgress(Math.round(easeProgress(t) * 100))
      if (t < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    function typeCmd(li: number, charIdx: number) {
      setStates(prev => patch(prev, li, { phase: 'typing', typed: charIdx }))
      const full = LINES[li].cmd
      if (charIdx < full.length) {
        timers.push(setTimeout(() => typeCmd(li, charIdx + 1), 14 + Math.random() * 16))
      } else {
        timers.push(setTimeout(() => showKw(li), 80))
      }
    }

    function showKw(li: number) {
      setStates(prev => patch(prev, li, { phase: 'kwshow' }))
      if (LINES[li].dots > 0) {
        timers.push(setTimeout(() => addDot(li, 1), 160))
      } else {
        timers.push(setTimeout(() => finishLine(li), 160))
      }
    }

    function addDot(li: number, d: number) {
      setStates(prev => patch(prev, li, { phase: 'dots', dots: d }))
      if (d < LINES[li].dots) {
        timers.push(setTimeout(() => addDot(li, d + 1), 55 + Math.random() * 30))
      } else {
        timers.push(setTimeout(() => finishLine(li), 180))
      }
    }

    function finishLine(li: number) {
      setStates(prev => patch(prev, li, { phase: 'done' }))
      if (li + 1 < LINES.length) {
        timers.push(setTimeout(() => typeCmd(li + 1, 0), 150))
      }
    }

    timers.push(setTimeout(() => typeCmd(0, 0), 350))
    return () => timers.forEach(clearTimeout)
  }, [])

  function renderLine(li: number) {
    const { cmd, kw, kwCls, dots: maxDots, doneStr } = LINES[li]
    const { phase, typed, dots } = states[li]

    if (phase === 'idle') return null

    const showKw = phase === 'kwshow' || phase === 'dots' || phase === 'done'
    const showDots = phase === 'dots' || phase === 'done'
    const showDone = phase === 'done' && doneStr

    return (
      <div
        key={li}
        className={`flex items-baseline gap-1.5 font-mono text-[13px] leading-6 flex-wrap ${phase !== 'done' ? 'opacity-100' : 'opacity-80'}`}
      >
        <span className="text-green-400 select-none">$</span>
        <span className="text-slate-200">{cmd.slice(0, typed)}</span>
        {phase === 'typing' && <span className="text-slate-400 animate-pulse leading-none">▌</span>}
        {showKw && <span className={`${kwCls} font-medium`}>{kw}</span>}
        {showDots && maxDots > 0 && (
          <span className="text-slate-600 tracking-widest">
            {'.'.repeat(dots)}
            <span className="opacity-20">{'.'.repeat(maxDots - dots)}</span>
          </span>
        )}
        {showDone && (
          <span className={`font-semibold ${doneStr === '✓ ready' ? 'text-green-400' : 'text-green-500'}`}>
            {doneStr}
          </span>
        )}
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080c1f] overflow-hidden"
      role="status"
      aria-label="Loading portfolio"
    >
      <div
        className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        aria-hidden="true"
      />

      <div className="mb-5 flex items-center gap-3 select-none">
        <span className="text-white font-bold text-xl tracking-[0.2em] uppercase font-mono">Monineath</span>
        <span className="px-2 py-0.5 rounded border border-blue-500/40 text-blue-400/80 text-[11px] font-mono">v1.0.0</span>
      </div>

      <div
        className="w-full max-w-[520px] mx-4 rounded-xl overflow-hidden shadow-2xl shadow-black/70"
        style={{ border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ background: '#161b27', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#28ca41' }} />
          </div>
          <span className="text-[11px] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>
            monineath@portfolio ~ zsh
          </span>
          <span className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.15)' }}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div
          className="px-5 pt-5 pb-4 min-h-[196px]"
          style={{
            background: '#0d1117',
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
          }}
        >
          <div className="space-y-0.5">
            {LINES.map((_, i) => renderLine(i))}
          </div>
        </div>

        <div
          className="px-5 py-3"
          style={{ background: '#0d1117', borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <div className="w-full h-[3px] rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
                transition: 'width 60ms linear',
              }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>Launching experience...</span>
            <span className="text-[11px] font-mono" style={{ color: 'rgba(255,255,255,0.35)' }}>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
