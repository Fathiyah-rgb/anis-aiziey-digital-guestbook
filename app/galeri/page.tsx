
import type { Metadata } from 'next'
import Link from 'next/link'
import { Camera, ArrowLeft } from 'lucide-react'
import { PageShell } from '@/components/wedding/page-shell'
import { LiveGallery } from '@/components/wedding/live-gallery'
import { getApprovedEntries } from '@/lib/guestbook/repository'

export const metadata: Metadata = {
  title: 'Live Gallery — Anis & Aiziey',
}

export const dynamic = 'force-dynamic'

const archImage =
  '/Emerald%20and%20Gold%20Gardenway%20Elegance.png'

export default async function GaleriPage() {
  const entries = await getApprovedEntries()

  return (
    <PageShell showBack wide>
      <div className="mx-auto w-full max-w-5xl pb-8">

        {/* Emerald Green & Royal Gold Header */}
        <header className="relative mx-auto mb-8 mt-5 w-full max-w-2xl overflow-hidden rounded-t-[48%_25%] rounded-b-3xl border-2 border-[#D5A64F] bg-[#003D2B] shadow-2xl">

          <div
            className="relative flex min-h-[280px] items-start justify-center bg-cover bg-top bg-no-repeat px-5 pb-12 pt-16 sm:min-h-[360px] sm:pt-24"
            style={{
              backgroundImage: `url("${archImage}")`,
            }}
          >
            {/* Soft background overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#00271C]/15 via-[#00271C]/25 to-[#001F17]/45" />

            {/* Royal Emerald Title Box */}
            <div className="relative z-10 mx-auto w-full max-w-sm rounded-3xl border-2 border-[#D5A64F] bg-[#003D2B]/95 px-5 py-6 text-center shadow-xl backdrop-blur-sm sm:py-8">

              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#E6BB69] sm:text-xs">
                Anis &amp; Aiziey
              </p>

              <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-[#E6BB69] to-transparent" />

              <h1 className="mt-4 font-serif text-3xl font-semibold text-[#FFF9ED] sm:text-5xl">
                Live Gallery
              </h1>

              <p className="mx-auto mt-3 max-w-xs text-xs leading-relaxed text-[#FFF4DB] sm:text-sm">
                Kenangan &amp; Doa Daripada Tetamu Tersayang
              </p>

              <div className="mt-5 font-serif text-[#E6BB69]">
                ✦ ───── ✦ ───── ✦
              </div>
            </div>
          </div>
        </header>

        {/* Existing functional gallery */}
        <section
          aria-label="Kenangan dan doa tetamu"
          className="mx-auto w-full"
        >
          <LiveGallery entries={entries} />
        </section>

        {/* Share Moment Button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/kongsi"
            className="inline-flex min-h-14 w-full max-w-sm items-center justify-center gap-3 rounded-full border-2 border-[#D5A64F] bg-gradient-to-b from-[#087153] to-[#004331] px-8 py-3 text-base font-semibold text-white shadow-xl transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A64F]"
          >
            <Camera className="size-5" aria-hidden="true" />
            Kongsi Momen Anda
          </Link>
        </div>

        {/* Back to Homepage */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#064735] underline decoration-[#D5A64F] underline-offset-4 transition hover:text-[#B88C43]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Kembali ke Utama
          </Link>
        </div>

      </div>
    </PageShell>
  )
}
