import React from 'react'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: React.ReactNode
  as?: 'button' | 'a'
  href?: string
}

const variants: Record<Variant, string> = {
  primary: 'bg-green-600 hover:bg-green-500 text-white border border-green-600 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]',
  outline: 'bg-transparent hover:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-600/50 dark:border-green-500/50 hover:border-green-600 dark:hover:border-green-400',
  ghost: 'bg-transparent hover:bg-slate-900/10 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-transparent',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2 text-base',
  lg: 'px-8 py-3 text-lg',
}

export function Button({ variant = 'primary', size = 'md', children, className = '', as: Tag = 'button', href, ...props }: ButtonProps) {
  const cls = `inline-flex items-center justify-center rounded-md font-mono font-medium transition-all cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`

  if (Tag === 'a') {
    return <a href={href} className={cls}>{children}</a>
  }

  return <button className={cls} {...props}>{children}</button>
}
