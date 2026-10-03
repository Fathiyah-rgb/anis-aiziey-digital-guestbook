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

export default async function GaleriPage() {
  const entries = await getApprovedEntries()

  return (
    <PageShell showBack wide>
      <div className="pt-8 pb-6 text-center">
        <p className="text-xs font-medium tracking-[0.3em] text-gold uppercase">Anis &amp; Aiziey</p>
        <h1 className="mt-2 font-serif text-6xl font-semibold text-navy">Live Gallery</h1>
        <p className="mx-auto mt-3 max-w-sm text-pretty text-base leading-relaxed text-navy/75">
          Kenangan &amp; Doa Daripada Tetamu Tersayang
        </p>
        <StarDivider className="mt-5" />
      </div>

      <LiveGallery entries={entries} />

      <div className="pointer-events-none sticky bottom-5 mt-6 flex justify-center">
        <Link
          href="/kongsi"
          className={primaryButton('pointer-events-auto h-14 w-full max-w-xs px-8 text-base')}
        >
          <Camera className="size-5" aria-hidden="true" />
          Kongsi Momen Anda
        </Link>
      </div>

      <div className="mt-6 pb-4 text-center">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center px-3 text-sm font-medium text-navy/70 underline decoration-gold/60 underline-offset-4 transition-colors hover:text-navy hover:decoration-gold focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal"
        >
          Kembali ke Utama
        </Link>
      </div>
    </PageShell>
  )
}
