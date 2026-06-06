interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded font-mono text-xs font-medium bg-green-600/10 dark:bg-green-600/15 text-green-700 dark:text-green-400 border border-green-600/30 dark:border-green-500/30 ${className}`}>
      {children}
    </span>
  )
}
