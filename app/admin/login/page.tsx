
'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        })

      if (loginError) throw loginError

      const { data: admin, error: adminError } = await supabase
        .from('guestbook_admins')
        .select('user_id')
        .eq('user_id', data.user.id)
        .maybeSingle()

      if (adminError || !admin) {
        await supabase.auth.signOut()
        setError('Akaun ini tidak mempunyai akses Admin.')
        return
      }

      router.push('/admin')
      router.refresh()
    } catch {
      setError('Login gagal. Sila semak email dan password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#faf5eb] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-[#dfc99e] bg-white p-8 shadow-lg">
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.3em] text-[#bd995d] uppercase">
            Anis &amp; Aiziey
          </p>
          <h1 className="mt-3 font-serif text-4xl text-[#14213d]">
            Admin Login
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Wedding Guestbook Management
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email Admin
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border p-3 text-gray-900"
              placeholder="admin@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border p-3 text-gray-900"
              placeholder="Masukkan password"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#14213d] p-4 text-white disabled:opacity-50"
          >
            {loading ? 'Sedang log masuk...' : 'Login Admin'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-gray-400">
          Authorized Administrators Only
        </p>
      </div>
    </main>
  )
}
