
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
    <PageShell showBack>
      <div className="mx-auto mt-4 w-full max-w-md">

        {/* One Royal Blue & Gold Wedding Arch */}
        <section
          className="relative isolate overflow-hidden rounded-t-[48%_13%] rounded-b-[2rem] border border-gold/70 bg-ivory shadow-soft"
        >
          {/* Background wedding arch */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-cover bg-top bg-no-repeat"
            style={{
              backgroundImage: `url("${archImage}")`,
            }}
          />

          {/* Top title inside the arch */}
          <header className="relative px-7 pt-24 pb-8 text-center">
            <div className="mx-auto max-w-xs rounded-3xl border border-gold/40 bg-ivory/90 px-4 py-6 shadow-soft backdrop-blur-sm">
              <p className="text-[10px] font-medium tracking-[0.3em] text-gold uppercase">
                Anis &amp; Aiziey
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold text-navy">
                Live Gallery
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-navy/80">
                Kenangan &amp; Doa Daripada Tetamu Tersayang
              </p>

              <StarDivider className="mt-4" />
            </div>
          </header>

          {/* Gallery inside the same arch */}
          <div className="relative mx-3 rounded-3xl border border-gold/40 bg-ivory/95 px-3 py-6 shadow-soft backdrop-blur-sm sm:mx-5 sm:px-4">
            <LiveGallery entries={entries} />

            <div className="mt-8 flex justify-center">
              <Link
                href="/kongsi"
                className={primaryButton(
                  'h-12 w-full px-4 text-sm'
                )}
              >
                <Camera className="size-4" aria-hidden="true" />
                Kongsi Momen Anda
              </Link>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center text-xs font-medium text-navy underline decoration-gold underline-offset-4"
              >
                Kembali ke Utama
              </Link>
            </div>
          </div>

          {/* Decorative lower arch */}
          <div className="relative h-36 sm:h-44" />
        </section>
      </div>
    </PageShell>
  )
}
