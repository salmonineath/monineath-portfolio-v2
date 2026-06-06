interface CardProps {
  children: React.ReactNode
  className?: string
  /** Renders a terminal-style title bar with traffic lights and a filename */
  terminal?: string
}

export function Card({ children, className = '', terminal }: CardProps) {
  if (terminal !== undefined) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#0d1320] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28ca41]/80" aria-hidden="true" />
          <span className="ml-2 font-mono text-[11px] text-gray-500">{terminal}</span>
        </div>
        <div className={className}>{children}</div>
      </div>
    )
  }

  return (
    <div className={`rounded-xl border border-white/10 bg-[#0d1320] ${className}`}>
      {children}
    </div>
  )
}
