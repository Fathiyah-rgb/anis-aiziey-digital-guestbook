
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
      <div className="mx-auto mt-5 w-full max-w-4xl">
        <section className="overflow-hidden rounded-t-[45%_8%] rounded-b-[2.5rem] border border-gold/70 bg-ivory shadow-soft">

          {/* Royal Blue & Gold Header */}
          <header
            className="relative flex min-h-64 flex-col items-center justify-center bg-cover bg-top bg-no-repeat px-5 py-12 text-center sm:min-h-80"
            style={{
              backgroundImage: `url("${archImage}")`,
            }}
          >
            {/* Soft background behind title */}
            <div className="relative z-10 mx-auto w-full max-w-sm rounded-3xl border border-gold/40 bg-ivory/90 px-5 py-6 shadow-soft backdrop-blur-sm">
              <p className="text-xs font-medium tracking-[0.3em] text-gold uppercase">
                Anis &amp; Aiziey
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold text-navy sm:text-5xl">
                Live Gallery
              </h1>

              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-navy/80">
                Kenangan &amp; Doa Daripada Tetamu Tersayang
              </p>

              <StarDivider className="mt-4" />
            </div>
          </header>

          {/* Gallery Content */}
          <div className="relative border-x-2 border-gold/30 bg-ivory px-4 py-8 sm:px-8">
            <LiveGallery entries={entries} />

            {/* Share Moment */}
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

            <div className="mt-5 text-center">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center text-sm font-medium text-navy underline decoration-gold underline-offset-4"
              >
                Kembali ke Utama
              </Link>
            </div>
          </div>

          {/* Decorative Palace Footer */}
          <div
            className="h-24 bg-cover bg-bottom bg-no-repeat sm:h-36"
            style={{
              backgroundImage: `url("${archImage}")`,
            }}
          />
        </section>
      </div>
    </PageShell>
  )
}
