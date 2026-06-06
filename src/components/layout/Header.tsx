import React from 'react'
import { navItems } from '../../data/navigation'
import { useTheme } from '../../hooks/useTheme'

function scrollTo(href: string, e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  // Keep URL clean — no hash
  history.replaceState(null, '', window.location.pathname)
}

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m9-9h-1.5M4.5 12H3m15.36 6.36l-1.06-1.06M6.7 6.7L5.64 5.64m12.72 0l-1.06 1.06M6.7 17.3l-1.06 1.06M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#070b14]/90 backdrop-blur-md border-b border-slate-900/5 dark:border-white/5">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between" aria-label="Main navigation">
        <a href="#home" onClick={e => scrollTo('#home', e)} className="font-mono font-bold text-lg text-slate-900 dark:text-white">
          <span className="text-green-600 dark:text-green-400">~/</span>monineath
          <span className="cursor-blink text-green-600 dark:text-green-400 font-normal">_</span>
        </a>

        <ul className="hidden md:flex items-center gap-7" role="list">
          {navItems.map((item, i) => (
            <li key={item.href}>
              <a href={item.href} onClick={e => scrollTo(item.href, e)} className="font-mono text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors relative group">
                <span className="text-green-600/50 dark:text-green-500/50 text-xs mr-0.5">0{i + 1}.</span>
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-full transition-all" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            online
          </span>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded border border-green-600/50 dark:border-green-500/50 text-green-600 dark:text-green-400 hover:border-green-600 dark:hover:border-green-400 transition-colors cursor-pointer"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </nav>
    </header>
  )
}
