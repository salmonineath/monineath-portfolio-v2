import React from 'react'
import { navItems } from '../../data/navigation'

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

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#070b14]/90 backdrop-blur-md border-b border-white/5">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between" aria-label="Main navigation">
        <a href="#home" onClick={e => scrollTo('#home', e)} className="font-mono font-bold text-lg text-white">
          <span className="text-green-400">~/</span>monineath
          <span className="cursor-blink text-green-400 font-normal">_</span>
        </a>

        <ul className="hidden md:flex items-center gap-7" role="list">
          {navItems.map((item, i) => (
            <li key={item.href}>
              <a href={item.href} onClick={e => scrollTo(item.href, e)} className="font-mono text-sm text-gray-300 hover:text-green-400 transition-colors relative group">
                <span className="text-green-500/50 text-xs mr-0.5">0{i + 1}.</span>
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            online
          </span>
          <button className="px-2.5 py-1 rounded border border-green-500/50 text-green-400 font-mono text-xs font-medium hover:border-green-400 transition-colors" aria-label="Switch language">
            En
          </button>
        </div>
      </nav>
    </header>
  )
}
