import type { Metadata } from 'next'
import Link from 'next/link'
import { Amiri } from 'next/font/google'
import { ArrowLeft, Images } from 'lucide-react'
import { PageShell } from '@/components/wedding/page-shell'
import { Lantern, StarDivider } from '@/components/wedding/ornaments'
import { BotanicalCorner, PaperPlane, Sparkle } from '@/components/wedding/thank-you-ornaments'
import { primaryButton } from '@/components/wedding/button-styles'

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Terima Kasih — Anis & Aiziey',
}

const sparkles = [
  { className: 'top-6 left-1/3 size-3', delay: '500ms' },
  { className: 'top-16 right-24 size-2.5', delay: '700ms' },
  { className: 'top-28 left-8 size-2', delay: '850ms' },
  { className: 'top-10 right-6 size-2', delay: '950ms' },
  { className: 'top-36 right-12 size-3', delay: '1100ms' },
]

export default function TerimaKasihPage() {
  return (
    <PageShell>
      <div className="py-6 sm:py-10">
        <article className="relative overflow-hidden rounded-[2rem] bg-ivory p-2.5 shadow-soft">
          <div className="relative overflow-hidden rounded-[1.6rem] border border-gold/50 px-6 pt-8 pb-9 text-center">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40">
              <BotanicalCorner className="absolute -top-1 -left-1 w-24 opacity-80" />
              <BotanicalCorner className="absolute -top-1 -right-1 w-24 -scale-x-100 opacity-80" />
              <Lantern className="animate-sway absolute top-0 left-14 w-7" stringLength={34} />
              {sparkles.map((s) => (
                <Sparkle
                  key={s.className}
                  className={`ty-sparkle absolute ${s.className}`}
                  style={{ animationDelay: s.delay }}
                />
              ))}
            </div>

            <div className="relative mx-auto h-24 w-40">
              <div className="ty-plane absolute inset-0">
                <PaperPlane className="ty-float h-full w-full" />
              </div>
            </div>

            <h1 className="ty-rise mt-3 font-serif text-5xl font-semibold text-navy" style={{ animationDelay: '600ms' }}>
              Terima Kasih!
            </h1>
            <p
              className="ty-rise mx-auto mt-3 max-w-[16rem] text-pretty text-base leading-relaxed text-navy"
              style={{ animationDelay: '750ms' }}
            >
              Kenangan, doa dan ucapan anda telah berjaya dihantar.
            </p>

            <StarDivider className="ty-fade my-6" />

            <section aria-label="Doa untuk pengantin" className="ty-fade" style={{ animationDelay: '1000ms' }}>
              <p
                lang="ar"
                dir="rtl"
                className={`${amiri.className} text-center text-[1.9rem] leading-[2] font-bold text-navy sm:text-[2.1rem]`}
              >
                بارك الله لكما وبارك عليكما
                <br />
                وجمع بينكما في خير
              </p>
              <p className="mx-auto mt-4 max-w-[18rem] font-serif text-xl leading-snug text-pretty text-muted-foreground italic">
                {'“Semoga Allah memberkati kalian berdua, melimpahkan keberkatan ke atas kalian dan menghimpunkan kalian dalam kebaikan.”'}
              </p>
            </section>

            <p
              className="ty-fade mx-auto mt-6 max-w-[17rem] text-sm leading-relaxed text-pretty text-navy"
              style={{ animationDelay: '1200ms' }}
            >
              Terima kasih kerana menjadi sebahagian daripada hari bahagia{' '}
              <span className="font-serif text-lg font-bold whitespace-nowrap">
                Anis <span className="text-gold">&amp;</span> Aiziey
              </span>
              .
            </p>

            <div className="ty-rise mt-8 flex flex-col items-center gap-4" style={{ animationDelay: '1450ms' }}>
              <Link href="/galeri" className={primaryButton('w-full bg-navy hover:-translate-y-0.5 hover:bg-royal')}>
                <Images className="size-5" aria-hidden="true" />
                Lihat Live Gallery
              </Link>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-navy/75 underline-offset-4 transition-colors hover:text-royal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Kembali ke Utama
              </Link>
            </div>

            <p
              className="ty-fade mx-auto mt-5 max-w-[15rem] border-t border-gold/30 pt-4 text-xs leading-relaxed text-muted-foreground"
              style={{ animationDelay: '1600ms' }}
            >
              Doa dan ucapan anda akan dipaparkan di Live Gallery selepas disahkan.
            </p>
          </div>
        </article>
      </div>
    </PageShell>
  )
}
