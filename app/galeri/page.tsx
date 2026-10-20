
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
      {/* Royal Blue & Gold Live Gallery */}
      <div className="mx-auto mt-5 w-full max-w-md">
        <header
          className="relative overflow-hidden rounded-t-[48%] rounded-b-3xl border border-gold/60 bg-ivory shadow-soft"
          style={{
            backgroundImage:
              'url("/Ornate%20Blue%20Mosque%20Wedding%20Courtyard.png")',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="relative flex min-h-[550px] flex-col items-center px-7 pt-32 pb-12 text-center sm:min-h-[650px] sm:pt-40">
            <p className="text-xs font-medium tracking-[0.3em] text-gold uppercase">
              Anis &amp; Aiziey
            </p>

            <h1 className="mt-5 font-serif text-5xl font-semibold text-navy">
              Live Gallery
            </h1>

            <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-navy">
              Kenangan &amp; Doa Daripada Tetamu Tersayang
            </p>

            <StarDivider className="mt-6" />
          </div>
        </header>
      </div>

      {/* Gallery categories and approved guest entries */}
      <div className="mt-8">
        <LiveGallery entries={entries} />
      </div>

      {/* Share Moment */}
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
