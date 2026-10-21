
'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import {
  Check,
  X,
  RefreshCw,
  LogOut,
  Heart,
  Clock3,
} from 'lucide-react'

type Status = 'pending' | 'approved' | 'rejected'

type GuestEntry = {
  id: string
  guest_name: string
  relationship: string | null
  doa: string | null
  photo_url: string | null
  status: Status
  created_at: string
}

const supabase: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const STATUS_LABELS: Record<Status, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
}

export default function AdminDashboard() {
  const router = useRouter()
  const [entries, setEntries] = useState<GuestEntry[]>([])
  const [filter, setFilter] = useState<Status>('pending')
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const loadEntries = useCallback(async () => {
    const { data, error } = await supabase
      .from('wedding_guestbook')
      .select('id,guest_name,relationship,doa,photo_url,status,created_at')
      .order('created_at', { ascending: false })

    if (error) {
      setError('Gagal mendapatkan senarai tetamu: ' + error.message)
    } else {
      setEntries((data ?? []) as GuestEntry[])
      setError('')
    }
  }, [])

  useEffect(() => {
    let active = true

    async function initialize() {
      const { data: authData } = await supabase.auth.getUser()

      if (!active) return

      if (!authData.user) {
        router.replace('/admin/login')
        return
      }

      const { data: admin, error: adminError } = await supabase
        .from('guestbook_admins')
        .select('user_id')
        .eq('user_id', authData.user.id)
        .maybeSingle()

      if (!active) return

      if (adminError || !admin) {
        await supabase.auth.signOut()
        router.replace('/admin/login')
        return
      }

      await loadEntries()
      if (active) setLoading(false)
    }

    initialize()

    return () => {
      active = false
    }
  }, [router, loadEntries])

  async function updateStatus(id: string, status: Status) {
    setBusyId(id)
    setError('')

    const { error } = await supabase
      .from('wedding_guestbook')
      .update({ status })
      .eq('id', id)

    if (error) {
      setError('Gagal mengemas kini status: ' + error.message)
    } else {
      await loadEntries()
    }

    setBusyId(null)
  }

  async function logout() {
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  const filtered = entries.filter(
    (entry) => entry.status === filter
  )

  const count = (status: Status) =>
    entries.filter((entry) => entry.status === status).length

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF9EF]">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="size-7 animate-spin text-[#064735]" />
          <p className="text-sm text-[#064735]">
            Memuatkan dashboard...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FFF9EF] px-4 py-8 text-[#064735]">
      <div className="mx-auto max-w-5xl">

        {/* Dashboard Header */}
        <header className="mb-8 rounded-3xl border-2 border-[#D5A64F] bg-[#064735] px-5 py-7 text-white shadow-xl sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#E6BB69]">
                Anis &amp; Aiziey
              </p>

              <h1 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
                Admin Approval
              </h1>

              <p className="mt-2 text-sm text-[#F4E9D2]">
                Wedding Guestbook Management
              </p>
            </div>

            <button
              type="button"
              onClick={logout}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#E6BB69] bg-[#FFF9EF] px-5 py-2 text-sm font-medium text-[#064735] transition hover:bg-white"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Status Summary & Filters */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {(['pending', 'approved', 'rejected'] as Status[]).map(
            (status) => {
              const selected = filter === status

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFilter(status)}
                  aria-pressed={selected}
                  className={`rounded-2xl border-2 p-3 text-center shadow-sm transition sm:p-5 ${
                    selected
                      ? 'border-[#D5A64F] bg-[#064735] text-white'
                      : 'border-[#D5A64F]/60 bg-white text-[#064735] hover:bg-[#F4E9D2]'
                  }`}
                >
                  <span className="block text-2xl font-semibold sm:text-3xl">
                    {count(status)}
                  </span>

                  <span className="mt-1 block text-xs font-medium sm:text-sm">
                    {STATUS_LABELS[status]}
                  </span>
                </button>
              )
            }
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {/* Entries Header */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="font-serif text-xl font-semibold text-[#064735] sm:text-2xl">
            {STATUS_LABELS[filter]} Entries
          </h2>

          <button
            type="button"
            onClick={loadEntries}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#D5A64F] bg-white px-4 py-2 text-sm font-medium text-[#064735] transition hover:bg-[#F4E9D2]"
          >
            <RefreshCw className="size-4" />
            Refresh
          </button>
        </div>

        {/* Guest Entries */}
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-[#D5A64F]/60 bg-white p-10 text-center shadow-sm">
            <Heart className="mx-auto mb-3 size-8 text-[#B88C43]" />
            <p className="text-sm text-[#426457]">
              Tiada rekod untuk kategori ini.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((entry) => (
              <article
                key={entry.id}
                className="overflow-hidden rounded-3xl border border-[#D5A64F]/70 bg-white shadow-md"
              >
                {entry.photo_url && (
                  <div className="bg-[#F5EBD9]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={entry.photo_url}
                      alt={`Gambar daripada ${entry.guest_name}`}
                      className="max-h-96 w-full object-contain"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-serif text-xl font-semibold text-[#064735]">
                      {entry.guest_name}
                    </h3>

                    <span className="rounded-full bg-[#F4E9D2] px-3 py-1 text-xs text-[#805E28]">
                      {entry.relationship || 'Tetamu'}
                    </span>
                  </div>

                  <p className="mb-4 whitespace-pre-wrap text-sm leading-7 text-[#426457]">
                    {entry.doa || 'Tiada ucapan'}
                  </p>

                  <p className="mb-5 flex items-center gap-2 text-xs text-[#648276]">
                    <Clock3 className="size-3.5" />
                    {new Date(entry.created_at).toLocaleString('ms-MY', {
                      timeZone: 'Asia/Kuala_Lumpur',
                    })}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {entry.status !== 'approved' && (
                      <button
                        type="button"
                        disabled={busyId === entry.id}
                        onClick={() => updateStatus(entry.id, 'approved')}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#D5A64F] bg-[#064735] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#087153] disabled:opacity-50"
                      >
                        <Check className="size-4" />
                        {busyId === entry.id
                          ? 'Mengemas kini...'
                          : 'Approve'}
                      </button>
                    )}

                    {entry.status !== 'rejected' && (
                      <button
                        type="button"
                        disabled={busyId === entry.id}
                        onClick={() => updateStatus(entry.id, 'rejected')}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-red-300 bg-white px-5 py-3 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        <X className="size-4" />
                        {busyId === entry.id
                          ? 'Mengemas kini...'
                          : 'Reject'}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
