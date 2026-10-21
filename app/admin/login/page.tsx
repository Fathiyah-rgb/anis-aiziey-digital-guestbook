
'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import {
  ShieldCheck,
  Mail,
  LockKeyhole,
  LogIn,
  Loader2,
} from 'lucide-react'

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
    <main className="flex min-h-screen items-center justify-center bg-[#FFF9EF] px-4 py-8">
      <div
        className="relative isolate w-full max-w-md overflow-hidden rounded-t-[150px] rounded-b-3xl border-2 border-[#D5A64F] bg-[#003D2B] shadow-2xl"
        style={{
          backgroundImage:
            "url('/Emerald%20and%20Gold%20Gardenway%20Elegance.png')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Soft background overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#00271C]/10 via-[#00271C]/25 to-[#001F17]/40" />

        <div className="relative z-10 px-5 pb-12 pt-28 sm:px-8">
          {/* Header */}
          <div className="mb-7 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full border-2 border-[#D5A64F] bg-[#FFF9EF] shadow-xl">
              <ShieldCheck
                className="size-8 text-[#064735]"
                aria-hidden="true"
              />
            </div>

            <p className="mt-5 font-serif text-xs uppercase tracking-[0.25em] text-[#E6BB69]">
              Anis &amp; Aiziey
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold text-[#FFF9EF] drop-shadow-lg">
              Admin Login
            </h1>

            <p className="mt-3 text-sm text-[#FFF4DB]">
              Wedding Guestbook Management
            </p>
          </div>

          {/* Login Form */}
          <div className="rounded-3xl border-2 border-[#D5A64F] bg-[#FFF9EF]/95 px-5 py-7 shadow-2xl backdrop-blur-sm sm:px-7">
            <form onSubmit={handleLogin} className="space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#064735]"
                >
                  Email Admin
                </label>

                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#B88C43]"
                    aria-hidden="true"
                  />

                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="min-h-12 w-full rounded-xl border border-[#D5A64F] bg-white py-3 pl-12 pr-4 text-base text-[#064735] placeholder:text-[#648276] focus:border-[#B88C43] focus:outline-none focus:ring-2 focus:ring-[#D5A64F]/25"
                    placeholder="admin@email.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#064735]"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#B88C43]"
                    aria-hidden="true"
                  />

                  <input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="min-h-12 w-full rounded-xl border border-[#D5A64F] bg-white py-3 pl-12 pr-4 text-base text-[#064735] placeholder:text-[#648276] focus:border-[#B88C43] focus:outline-none focus:ring-2 focus:ring-[#D5A64F]/25"
                    placeholder="Masukkan password"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[#D5A64F] bg-gradient-to-b from-[#087153] to-[#004331] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A64F] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2
                      className="size-5 animate-spin"
                      aria-hidden="true"
                    />
                    Sedang log masuk...
                  </>
                ) : (
                  <>
                    <LogIn
                      className="size-5"
                      aria-hidden="true"
                    />
                    Login Admin
                  </>
                )}
              </button>
            </form>

            <p className="mt-7 text-center text-xs text-[#648276]">
              Authorized Administrators Only
            </p>
          </div>

          <p className="mt-7 text-center font-serif text-xs italic text-[#FFF4DB]">
            ✦ Anis &amp; Aiziey ✦
          </p>
        </div>
      </div>
    </main>
  )
}
