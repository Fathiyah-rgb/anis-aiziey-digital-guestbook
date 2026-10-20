
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

const archImage =
  '/Ornate%20Blue%20Mosque%20Wedding%20Courtyard.png'

export default async function GaleriPage() {
  const entries = await getApprovedEntries()

  return (
    <PageShell showBack wide>
      <div className="mx-auto w-full max-w-5xl pb-8">

        {/* Royal Blue & Gold Header */}
        <header className="relative mx-auto mt-5 mb-8 w-full max-w-2xl overflow-hidden rounded-t-[48%_25%] rounded-b-3xl border border-gold/60 shadow-soft">

          <div
            className="relative flex min-h-[260px] items-start justify-center bg-cover bg-top bg-no-repeat px-5 pt-14 pb-12 sm:min-h-[360px] sm:pt-20"
            style={{
              backgroundImage: `url("${archImage}")`,
            }}
          >
            {/* Navy Blue Title Box */}
            <div className="relative z-10 mx-auto w-full max-w-sm rounded-3xl border border-gold/70 bg-navy/95 px-5 py-5 text-center shadow-lg sm:py-7">

              <p className="text-[10px] font-medium tracking-[0.25em] text-gold uppercase sm:text-xs">
                Anis &amp; Aiziey
              </p>

              <h1 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-5xl">
                Live Gallery
              </h1>

              <p className="mx-auto mt-3 max-w-xs text-xs leading-relaxed text-white sm:text-sm">
                Kenangan &amp; Doa Daripada Tetamu Tersayang
              </p>

              <StarDivider className="mt-4" />
            </div>
          </div>
        </header>

        {/* Gallery Outside the Arch */}
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
            className={primaryButton(
              'h-14 w-full max-w-sm px-8 text-base'
            )}
          >
            <Camera className="size-5" aria-hidden="true" />
            Kongsi Momen Anda
          </Link>
        </div>

        {/* Back to Homepage */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-sm font-medium text-navy underline decoration-gold underline-offset-4 hover:text-royal"
          >
            Kembali ke Utama
          </Link>
        </div>

      </div>
    </PageShell>
  )
}
