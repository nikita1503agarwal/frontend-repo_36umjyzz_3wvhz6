import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden py-24 bg-[#0a0d12]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -inset-40 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,255,255,0.06),transparent_30%,transparent_70%,rgba(255,255,255,0.06))] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-orange-400/10 p-10 sm:p-14 backdrop-blur">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-white">
              Turn searches into bookings with AI-native flows
            </h3>
            <p className="mt-3 text-white/70">
              Start with our sandbox APIs, then scale to production with usage-based pricing and enterprise support.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="/test" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-white to-orange-400/90 px-6 py-3 text-slate-900 font-semibold shadow hover:from-white hover:to-orange-300 transition-colors">
                Launch sandbox
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#pricing" className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-white font-semibold hover:bg-white/10 transition-colors">
                View pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
