
'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

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

  const filtered = entries.filter((entry) => entry.status === filter)

  const count = (status: Status) =>
    entries.filter((entry) => entry.status === status).length

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf5eb] flex items-center justify-center">
        <p className="text-[#14213d]">Memuatkan dashboard...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#faf5eb] px-4 py-8 text-[#14213d]">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#bd995d]">
              Anis &amp; Aiziey
            </p>
            <h1 className="mt-2 font-serif text-4xl">
              Admin Approval
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Wedding Guestbook Management
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-full border border-[#dfc99e] bg-white px-6 py-3 text-sm"
          >
            Logout
          </button>
        </header>

        <div className="mb-6 grid grid-cols-3 gap-3">
          {(['pending', 'approved', 'rejected'] as Status[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-2xl border p-4 text-center ${
                filter === status
                  ? 'border-[#14213d] bg-[#14213d] text-white'
                  : 'border-[#dfc99e] bg-white'
              }`}
            >
              <span className="block text-2xl font-semibold">
                {count(status)}
              </span>
              <span className="mt-1 block text-xs capitalize">
                {status}
              </span>
            </button>
          ))}
        </div>

        {error && (
          <p role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mb-5 flex justify-between gap-3">
          <h2 className="font-serif text-2xl capitalize">
            {filter} Entries
          </h2>
          <button
            onClick={loadEntries}
            className="rounded-full border border-[#dfc99e] bg-white px-5 py-2 text-sm"
          >
            Refresh
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-[#dfc99e] bg-white p-10 text-center">
            Tiada rekod untuk kategori ini.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((entry) => (
              <article
                key={entry.id}
                className="overflow-hidden rounded-3xl border border-[#dfc99e] bg-white shadow-sm"
              >
                {entry.photo_url && (
                  <img
                    src={entry.photo_url}
                    alt={`Gambar daripada ${entry.guest_name}`}
                    className="max-h-96 w-full object-contain bg-[#f5efe5]"
                  />
                )}

                <div className="p-6">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-serif text-xl">
                      {entry.guest_name}
                    </h3>
                    <span className="rounded-full bg-[#f5efe5] px-3 py-1 text-xs">
                      {entry.relationship || 'Tetamu'}
                    </span>
                  </div>

                  <p className="mb-4 whitespace-pre-wrap text-sm leading-7">
                    {entry.doa || 'Tiada ucapan'}
                  </p>

                  <p className="mb-5 text-xs text-gray-400">
                    {new Date(entry.created_at).toLocaleString('ms-MY', {
                      timeZone: 'Asia/Kuala_Lumpur',
                    })}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {entry.status !== 'approved' && (
                      <button
                        disabled={busyId === entry.id}
                        onClick={() => updateStatus(entry.id, 'approved')}
                        className="rounded-full bg-[#14213d] px-5 py-3 text-sm text-white disabled:opacity-50"
                      >
                        Approve
                      </button>
                    )}

                    {entry.status !== 'rejected' && (
                      <button
                        disabled={busyId === entry.id}
                        onClick={() => updateStatus(entry.id, 'rejected')}
                        className="rounded-full border border-red-300 px-5 py-3 text-sm text-red-700 disabled:opacity-50"
                      >
                        Reject
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
