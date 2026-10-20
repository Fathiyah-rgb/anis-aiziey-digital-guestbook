
import type { Metadata } from 'next'
import Link from 'next/link'
import { Camera } from 'lucide-react'
import { PageShell } from '@/components/wedding/page-shell'
import { LiveGallery } from '@/components/wedding/live-gallery'
import { StarDivider } from '@/components/wedding/ornaments'
import { primaryButton } from '@/components/wedding/button-styles'
import { getApprovedEntries } from '@/lib/guestbook/repository'

export const metadata: Metadata = {
  title: 'Live Gallery — Anis & Aiziey',
}

export const dynamic = 'force-dynamic'

export default async function GaleriPage() {
  const entries = await getApprovedEntries()

  return (
    <PageShell showBack wide>
      {/* Royal Blue & Gold Gallery Header */}
      <header className="relative mx-auto mt-5 mb-8 w-full max-w-3xl overflow-hidden rounded-t-[180px] rounded-b-3xl border border-gold/60 bg-ivory shadow-soft">
        <div
          className="relative flex min-h-[340px] flex-col items-center justify-center bg-cover bg-center px-5 py-16 text-center sm:min-h-[430px]"
          style={{
            backgroundImage:
              'url("/Ornate%20Blue%20Mosque%20Wedding%20Courtyard.png")',
          }}
        >
          {/* Soft ivory overlay for readability */}
          <div className="absolute inset-0 bg-ivory/55" />

          <div className="relative z-10 mx-auto max-w-sm rounded-3xl bg-ivory/75 px-5 py-7 backdrop-blur-[2px]">
            <p className="text-xs font-medium tracking-[0.3em] text-gold uppercase">
              Anis &amp; Aiziey
            </p>

            <h1 className="mt-3 font-serif text-5xl font-semibold text-navy sm:text-6xl">
              Live Gallery
            </h1>

            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-navy sm:text-base">
              Kenangan &amp; Doa Daripada Tetamu Tersayang
            </p>

            <StarDivider className="mt-5" />
          </div>
        </div>
      </header>

      {/* Existing gallery and category filters */}
      <LiveGallery entries={entries} />

      {/* Share a Moment Button */}
      <div className="pointer-events-none sticky bottom-5 mt-6 flex justify-center">
        <Link
          href="/kongsi"
          className={primaryButton(
            'pointer-events-auto h-14 w-full max-w-xs px-8 text-base'
          )}
        >
          <Camera className="size-5" aria-hidden="true" />
          Kongsi Momen Anda
        </Link>
      </div>

      <div className="mt-6 pb-4 text-center">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center px-3 text-sm font-medium text-navy/70 underline decoration-gold/60 underline-offset-4 transition-colors hover:text-navy"
        >
          Kembali ke Utama
        </Link>
      </div>
    </PageShell>
  )
}
