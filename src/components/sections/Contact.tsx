import { useState } from 'react'
import { SectionTitle } from '../ui/SectionTitle'
import { Button } from '../ui/Button'

const contactItems = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'email',
    value: 'salmonineath31@gmail.com',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'phone',
    value: '+855 882906535',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'location',
    value: 'Phnom Penh, Cambodia',
  },
]

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', country: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const inputCls = 'w-full bg-slate-50 dark:bg-[#0a0e16] border border-slate-900/10 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white font-mono text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-green-500 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.08)] transition-all'
  const labelCls = 'block font-mono text-gray-600 dark:text-gray-400 text-xs mb-1.5'

  return (
    <section id="contact" className="py-20 px-4" aria-label="Contact section">
      <div className="max-w-6xl mx-auto">
        <SectionTitle path="~/contact">Open a connection</SectionTitle>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="font-mono text-xs text-green-700/80 dark:text-green-400/80 mb-3">$ ssh monineath@anywhere</p>
            <h3 className="text-slate-900 dark:text-white text-2xl font-bold mb-8">Let's Connect</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
              Feel free to reach out for collaborations, opportunities, or just a friendly chat.
              I'm always open to new projects and connections — average response latency: a few hours.
            </p>
            <ul className="space-y-6" role="list">
              {contactItems.map(item => (
                <li key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-600/10 dark:bg-green-600/15 border border-green-600/30 dark:border-green-500/30 flex items-center justify-center text-green-700 dark:text-green-400 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-mono text-gray-500 text-xs">{item.label}:</p>
                    <p className="text-slate-900 dark:text-white text-sm font-mono">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-900/10 dark:border-white/10 bg-white dark:bg-[#0d1320] overflow-hidden">
            {/* Request header bar */}
            <div className="flex items-center gap-2 px-5 py-3 bg-slate-900/[0.03] dark:bg-white/[0.03] border-b border-slate-900/[0.08] dark:border-white/[0.06] font-mono text-xs">
              <span className="px-2 py-0.5 rounded border font-semibold bg-green-500/10 dark:bg-green-500/15 text-green-700 dark:text-green-400 border-green-600/30 dark:border-green-500/30">POST</span>
              <span className="text-gray-600 dark:text-gray-400">/api/v1/contact</span>
              <span className="ml-auto text-gray-400 dark:text-gray-600">Content-Type: application/json</span>
            </div>

            <form onSubmit={e => e.preventDefault()} className="space-y-4 p-6" noValidate aria-label="Contact form">
              <div>
                <label htmlFor="name" className={labelCls}>"name":</label>
                <input id="name" name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} className={inputCls} autoComplete="name" />
              </div>
              <div>
                <label htmlFor="email" className={labelCls}>"email":</label>
                <input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} className={inputCls} autoComplete="email" />
              </div>
              <div>
                <label htmlFor="country" className={labelCls}>"country":</label>
                <input id="country" name="country" type="text" placeholder="Your Country" value={form.country} onChange={handleChange} className={inputCls} autoComplete="country-name" />
              </div>
              <div>
                <label htmlFor="message" className={labelCls}>"message":</label>
                <textarea id="message" name="message" placeholder="Write your message here..." value={form.message} onChange={handleChange} rows={5} className={`${inputCls} resize-none`} />
              </div>
              <Button type="submit" variant="primary" size="md" className="w-full justify-center">Send Request →</Button>
              <p className="font-mono text-[11px] text-gray-400 dark:text-gray-600 text-center">expected response: 201 Created</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
