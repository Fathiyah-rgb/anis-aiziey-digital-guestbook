
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

        {/* Main Royal Blue & Gold Frame */}
        <section className="overflow-hidden rounded-t-[45%_8%] rounded-b-[2.5rem] border border-gold/70 bg-ivory shadow-soft">

          {/* Original Wedding Arch */}
          <div
            className="relative aspect-[3/4] w-full bg-cover bg-top bg-no-repeat"
            style={{
              backgroundImage: `url("${archImage}")`,
            }}
          >
            <div className="absolute inset-x-[12%] top-[18%] text-center">
              <p className="text-xs font-medium tracking-[0.3em] text-gold uppercase">
                Anis &amp; Aiziey
              </p>

              <h1 className="mt-4 font-serif text-4xl font-semibold text-navy sm:text-6xl">
                Live Gallery
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-navy sm:text-base">
                Kenangan &amp; Doa Daripada Tetamu Tersayang
              </p>

              <StarDivider className="mt-5" />
            </div>
          </div>

          {/* Gallery Content */}
          <div className="relative border-x-4 border-gold/40 bg-ivory px-4 py-8 sm:px-8">

            <LiveGallery entries={entries} />

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

            <div className="mt-5 text-center">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center text-sm font-medium text-navy underline decoration-gold underline-offset-4"
              >
                Kembali ke Utama
              </Link>
            </div>
          </div>

          {/* Decorative Footer */}
          <div
            className="h-28 bg-cover bg-bottom bg-no-repeat sm:h-40"
            style={{
              backgroundImage: `url("${archImage}")`,
            }}
          />
        </section>
      </div>
    </PageShell>
  )
}
