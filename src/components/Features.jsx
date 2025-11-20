import { ShieldCheck, Sparkles, MapPin, CreditCard } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'Itinerary Intelligence',
    desc: 'AI that optimizes routes, layovers, and timing based on real-time signals.'
  },
  {
    icon: MapPin,
    title: 'Contextual Assistants',
    desc: 'Embed copilots in search, booking, and support flows for higher conversion.'
  },
  {
    icon: CreditCard,
    title: 'Fintech-Ready',
    desc: 'Built-in risk, checkout orchestration, and loyalty wallets for travel.'
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise-Grade',
    desc: 'Secure APIs, SOC2-ready, with global uptime and privacy controls.'
  }
]

export default function Features() {
  return (
    <section id="features" className="relative py-24 bg-gradient-to-b from-[#0a0d12] via-[#0a0d12] to-[#0a0d12]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">What you can build</h2>
          <p className="mt-3 text-white/70">Ship AI-first travel experiences that feel like magic and perform like revenue machines.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.08] transition-colors">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-white to-orange-400 text-slate-900">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-white font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-white/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
