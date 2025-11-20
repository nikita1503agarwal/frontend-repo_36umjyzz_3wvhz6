import { useEffect, useMemo, useState } from 'react'
import { KeyRound, Plus, Trash2, Rocket, RefreshCcw, ShieldCheck, Activity } from 'lucide-react'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Sandbox() {
  const [loadingKeys, setLoadingKeys] = useState(false)
  const [keys, setKeys] = useState([])
  const [newKeyName, setNewKeyName] = useState('')
  const [revealedKey, setRevealedKey] = useState(null)
  const [error, setError] = useState('')

  const [prompt, setPrompt] = useState('Write a 2-sentence intro about AeroMind.')
  const [model, setModel] = useState('aeromind-small')
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(256)
  const [invokeLoading, setInvokeLoading] = useState(false)
  const [invokeOutput, setInvokeOutput] = useState('')
  const [invokeLatency, setInvokeLatency] = useState(null)

  const [usage, setUsage] = useState([])
  const [usageLoading, setUsageLoading] = useState(false)

  const hasKeys = keys.length > 0
  const activeKeyId = useMemo(() => (keys[0]?.id || null), [keys])

  useEffect(() => {
    fetchKeys()
    fetchUsage()
  }, [])

  async function fetchKeys() {
    setLoadingKeys(true)
    setError('')
    try {
      const res = await fetch(`${BASE_URL}/api/keys`)
      if (!res.ok) throw new Error('Failed to load keys')
      const data = await res.json()
      setKeys(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoadingKeys(false)
    }
  }

  async function createKey() {
    if (!newKeyName.trim()) return
    setError('')
    try {
      const res = await fetch(`${BASE_URL}/api/keys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName })
      })
      if (!res.ok) throw new Error('Failed to create key')
      const data = await res.json()
      setRevealedKey(data.key)
      setNewKeyName('')
      await fetchKeys()
    } catch (e) {
      setError(e.message)
    }
  }

  async function revokeKey(id) {
    setError('')
    try {
      const res = await fetch(`${BASE_URL}/api/keys/${id}/revoke`, { method: 'POST' })
      if (!res.ok) throw new Error('Failed to revoke key')
      await fetchKeys()
    } catch (e) {
      setError(e.message)
    }
  }

  async function runInvoke() {
    setInvokeLoading(true)
    setInvokeOutput('')
    setInvokeLatency(null)
    setError('')
    const key = revealedKey || promptStoredKey()
    if (!key) {
      setError('Create a key first or paste your API key below.')
      setInvokeLoading(false)
      return
    }
    const payload = { model, prompt, temperature: Number(temperature), max_tokens: Number(maxTokens) }
    const t0 = performance.now()
    try {
      const res = await fetch(`${BASE_URL}/api/invoke`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify(payload)
      })
      const t1 = performance.now()
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || 'Invocation failed')
      }
      const data = await res.json()
      setInvokeOutput(data.output)
      setInvokeLatency(data.latency_ms || Math.round(t1 - t0))
      await fetchUsage()
    } catch (e) {
      setError(e.message)
    } finally {
      setInvokeLoading(false)
    }
  }

  async function fetchUsage() {
    setUsageLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/api/usage`)
      if (!res.ok) throw new Error('Failed to load usage')
      const data = await res.json()
      setUsage(data.items || [])
    } catch (e) {
      // ignore silently on initial load
    } finally {
      setUsageLoading(false)
    }
  }

  function promptStoredKey() {
    // Check URL param or localStorage for convenience
    const qs = new URLSearchParams(window.location.search)
    return qs.get('key') || localStorage.getItem('aeromind_api_key') || ''
  }

  function saveKeyLocally(k) {
    if (!k) return
    try { localStorage.setItem('aeromind_api_key', k) } catch {}
  }

  return (
    <div className="min-h-screen bg-[#0a0d12] text-white pb-24">
      <div className="pt-20" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-wide text-white/70">
              <ShieldCheck className="h-3.5 w-3.5" /> AeroMind Sandbox
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl font-semibold">API Dashboard</h1>
            <p className="mt-2 text-white/70 max-w-2xl">Create API keys, run test calls, and monitor usage like a typical LLM platform. Use the key below in your requests with an Authorization: Bearer header.</p>
          </div>
          <button onClick={() => { fetchKeys(); fetchUsage(); }} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
            <RefreshCcw className="h-4 w-4" /> Refresh
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-200">{error}</div>
        )}

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Keys */}
          <div className="lg:col-span-1 rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold flex items-center gap-2"><KeyRound className="h-5 w-5" /> API Keys</h2>
              {loadingKeys && <span className="text-xs text-white/60">Loading…</span>}
            </div>

            <div className="mt-4 flex gap-2">
              <input value={newKeyName} onChange={e => setNewKeyName(e.target.value)} placeholder="Name this key (e.g., Dev)" className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none placeholder:text-white/40" />
              <button onClick={createKey} className="inline-flex items-center gap-2 rounded-lg bg-white text-slate-900 px-3 py-2 text-sm font-semibold">
                <Plus className="h-4 w-4" /> Create
              </button>
            </div>

            {revealedKey && (
              <div className="mt-4 rounded-lg border border-amber-300/30 bg-amber-300/10 p-3">
                <div className="text-xs text-amber-200 mb-1">Copy and store this key now. It will be hidden later.</div>
                <div className="font-mono break-all text-amber-100">{revealedKey}</div>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => { navigator.clipboard.writeText(revealedKey); saveKeyLocally(revealedKey); }} className="text-xs rounded bg-white/10 px-2 py-1">Copy</button>
                  <button onClick={() => setRevealedKey(null)} className="text-xs rounded bg-white/10 px-2 py-1">Hide</button>
                </div>
              </div>
            )}

            <div className="mt-4 space-y-3">
              {keys.length === 0 && (
                <div className="text-sm text-white/60">No keys yet. Create one to get started.</div>
              )}
              {keys.map(k => (
                <div key={k.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <div>
                    <div className="font-medium">{k.name}</div>
                    <div className="text-xs text-white/60">{k.status} • {k.permissions?.join(', ') || 'invoke'}</div>
                    {k.last_used && <div className="text-xs text-white/40">Last used: {new Date(k.last_used).toLocaleString()}</div>}
                  </div>
                  <button onClick={() => revokeKey(k.id)} className="text-red-300 hover:text-red-200"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Playground */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold flex items-center gap-2"><Rocket className="h-5 w-5" /> Playground</h2>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={5} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none placeholder:text-white/40" />
              </div>
              <div className="md:col-span-1 space-y-3">
                <div>
                  <label className="text-xs text-white/60">Model</label>
                  <select value={model} onChange={e => setModel(e.target.value)} className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm">
                    <option value="aeromind-small">aeromind-small</option>
                    <option value="aeromind-medium">aeromind-medium</option>
                    <option value="aeromind-large">aeromind-large</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/60">Temperature: {temperature}</label>
                  <input type="range" min={0} max={1} step={0.1} value={temperature} onChange={e => setTemperature(e.target.value)} className="w-full" />
                </div>
                <div>
                  <label className="text-xs text-white/60">Max tokens</label>
                  <input type="number" min={16} max={2048} value={maxTokens} onChange={e => setMaxTokens(e.target.value)} className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm" />
                </div>
                <button onClick={runInvoke} disabled={invokeLoading} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white text-slate-900 px-3 py-2 text-sm font-semibold">
                  {invokeLoading ? 'Running…' : 'Run'}
                </button>
                {invokeLatency != null && (
                  <div className="text-xs text-white/60">Latency: {invokeLatency} ms</div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs text-white/60">Output</label>
              <pre className="mt-1 min-h-[120px] whitespace-pre-wrap rounded-lg bg-black/40 border border-white/10 p-3 text-sm">{invokeOutput || '—'}</pre>
            </div>
          </div>
        </div>

        {/* Usage */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold flex items-center gap-2"><Activity className="h-5 w-5" /> Usage</h2>
            {usageLoading && <span className="text-xs text-white/60">Loading…</span>}
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-white/60">
                <tr>
                  <th className="text-left font-normal pb-2">Time</th>
                  <th className="text-left font-normal pb-2">Key</th>
                  <th className="text-left font-normal pb-2">Model</th>
                  <th className="text-left font-normal pb-2">In</th>
                  <th className="text-left font-normal pb-2">Out</th>
                  <th className="text-left font-normal pb-2">Latency</th>
                  <th className="text-left font-normal pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {usage.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-white/50">No usage yet</td>
                  </tr>
                )}
                {usage.map((u) => (
                  <tr key={u.id} className="border-t border-white/5">
                    <td className="py-2">{u.created_at ? new Date(u.created_at).toLocaleString() : '—'}</td>
                    <td className="py-2">{u.api_key_name || '—'}</td>
                    <td className="py-2">{u.model}</td>
                    <td className="py-2">{u.tokens_in}</td>
                    <td className="py-2">{u.tokens_out}</td>
                    <td className="py-2">{u.latency_ms} ms</td>
                    <td className="py-2">{u.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
