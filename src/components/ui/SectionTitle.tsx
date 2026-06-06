interface SectionTitleProps {
  children: React.ReactNode
  /** Terminal-style path shown above the title, e.g. "~/about" */
  path?: string
  className?: string
}

export function SectionTitle({ children, path, className = '' }: SectionTitleProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {path && (
        <p className="font-mono text-sm text-green-400/80 mb-2">
          <span className="text-gray-500 select-none">$ cd </span>
          {path}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white">
        <span className="font-mono text-cyan-400/60 select-none">{'// '}</span>
        {children}
      </h2>
    </div>
  )
}
