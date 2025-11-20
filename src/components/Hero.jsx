import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/O-AdlP9lTPNz-i8a/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* soft gradient overlay to enhance contrast but not block the 3D scene */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.7)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-orange-400" />
              AI for travel and fintech at scale
            </div>

            <h1 className="mt-6 text-4xl sm:text-6xl font-bold tracking-tight text-white">
              Build smarter journeys
              <br />
              with Travel AI
            </h1>
            <p className="mt-5 text-lg text-white/80">
              AeroMind blends itinerary intelligence, dynamic pricing, and assistant APIs to turn every touchpoint into a personalized boarding pass.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#cta" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-white to-orange-400/90 px-6 py-3 text-slate-900 font-semibold shadow hover:from-white hover:to-orange-300 transition-colors">
                Try the demo
              </a>
              <a href="#features" className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-white font-semibold hover:bg-white/10 transition-colors">
                Learn more
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
