interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded font-mono text-xs font-medium bg-green-600/15 text-green-400 border border-green-500/30 ${className}`}>
      {children}
    </span>
  )
}
