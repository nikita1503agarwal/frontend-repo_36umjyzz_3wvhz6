import { Menu, Plane } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { label: 'Product', href: '#features' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Customers', href: '#customers' },
    { label: 'Pricing', href: '#pricing' },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/5 py-3 px-4">
          <a href="#" className="flex items-center gap-2 text-white font-semibold">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 text-slate-900">
              <Plane className="h-5 w-5" />
            </span>
            AeroMind
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((it) => (
              <a key={it.label} href={it.href} className="text-sm text-white/80 hover:text-white transition-colors">
                {it.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="text-sm text-white/80 hover:text-white">Sign in</a>
            <a href="#cta" className="inline-flex items-center rounded-lg bg-gradient-to-r from-white to-orange-400/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow hover:from-white hover:to-orange-300 transition-colors">
              Get started
            </a>
          </div>

          <button className="md:hidden text-white/90" onClick={() => setOpen((v) => !v)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur py-3 px-4">
            <div className="grid gap-3">
              {navItems.map((it) => (
                <a key={it.label} href={it.href} className="text-sm text-white/90">
                  {it.label}
                </a>
              ))}
              <a href="#cta" className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-white to-orange-400/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow">
                Get started
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
