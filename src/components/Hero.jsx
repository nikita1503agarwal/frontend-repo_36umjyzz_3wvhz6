import Spline from '@splinetool/react-spline'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export default function Hero() {
  // Subtle, premium parallax
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useTransform(my, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(mx, [-0.5, 0.5], [-8, 8])
  const glowOpacity = useTransform(my, [-0.5, 0.5], [0.18, 0.38])

  useEffect(() => {
    const handler = (e) => {
      const { innerWidth, innerHeight } = window
      mx.set(e.clientX / innerWidth - 0.5)
      my.set(e.clientY / innerHeight - 0.5)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [mx, my])

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-[#0a0b0f]">
      {/* Background 3D scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/O-AdlP9lTPNz-i8a/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Clean premium overlays */}
      <div className="pointer-events-none absolute inset-0">
        {/* Vignette for focus */}
        <div className="absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_40%,rgba(0,0,0,0)_0%,rgba(7,9,12,0.45)_60%,rgba(7,9,12,0.9)_100%)]" />
        {/* Soft warm base for Mediterranean hint */}
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-orange-500/20 via-orange-400/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-wide text-white/70 backdrop-blur">
          Mediterranean trip generation
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
          Design your Mediterranean journey
        </motion.h1>

        {/* Subcopy */}
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-5 max-w-2xl text-lg text-white/75">
          Generate premium, multi‑stop itineraries with real‑time prices and smart routing. Minimal by design. Powerful at scale.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a href="#cta" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-white to-white/90 px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:from-white hover:to-white">
            Generate a trip
          </a>
          <a href="#features" className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10">
            Explore features
          </a>
        </motion.div>

        {/* Minimal premium card */}
        <motion.div
          style={{ rotateX, rotateY }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative mt-12 w-full max-w-3xl"
        >
          {/* ambient glow */}
          <motion.div style={{ opacity: glowOpacity }} className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-white/15 via-orange-300/15 to-transparent blur-2xl" />

          <motion.div
            whileHover={{ y: -3, scale: 1.005 }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.06] px-6 py-5 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Route chips */}
              <div className="flex flex-wrap items-center gap-2 text-white">
                {['ATH', 'JTR', 'NAP', 'PMI'].map((c, i) => (
                  <div key={i} className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm">
                    {c}
                  </div>
                ))}
              </div>

              {/* Price inline summary */}
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-white/50">Estimated total</div>
                <div className="text-2xl font-semibold text-white">€488</div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Minimal timeline */}
            <div className="grid gap-3 text-sm text-white/85 md:grid-cols-2">
              {[
                { city: 'Athens → Santorini', meta: 'Ferry · 2h 10m' },
                { city: 'Santorini → Naples', meta: 'Flight · 1h 45m' },
                { city: 'Amalfi Coast Day Trip', meta: 'Private · 8h' },
                { city: 'Naples → Palma de Mallorca', meta: 'Flight · 1h 55m' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <div className="truncate">
                    <div className="font-medium text-white/95">{s.city}</div>
                    <div className="text-xs text-white/55">{s.meta}</div>
                  </div>
                  <div className="ml-4 h-2 w-2 rounded-full bg-orange-300/70" />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
