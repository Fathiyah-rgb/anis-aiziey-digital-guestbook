
import type { Metadata } from 'next'
import Link from 'next/link'
import { Amiri } from 'next/font/google'
import { ArrowLeft, Images, Check } from 'lucide-react'
import { PageShell } from '@/components/wedding/page-shell'

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Terima Kasih — Anis & Aiziey',
}

const archImage =
  '/Emerald%20and%20Gold%20Gardenway%20Elegance.png'

export default function TerimaKasihPage() {
  return (
    <PageShell>
      <div className="mx-auto w-full max-w-md py-6 sm:py-10">

        {/* Emerald Green & Royal Gold Wedding Arch */}
        <article
          className="relative isolate overflow-hidden rounded-t-[48%_12%] rounded-b-[2rem] border-2 border-[#D5A64F] bg-[#003D2B] shadow-2xl"
          style={{
            backgroundImage: `url("${archImage}")`,
            backgroundPosition: 'center',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Soft overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#00271C]/20 via-[#00271C]/35 to-[#001F17]/55" />

          <div className="relative z-10 flex min-h-[780px] flex-col items-center px-7 pb-14 pt-24 text-center sm:min-h-[850px] sm:pt-28">

            {/* Confirmation Icon */}
            <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#D5A64F] bg-[#FFF9EF] shadow-xl">
              <Check
                className="size-9 text-[#064735]"
                strokeWidth={2}
                aria-hidden="true"
              />
            </div>

            {/* Thank You Heading */}
            <h1 className="mt-5 font-serif text-5xl font-semibold text-[#FFF9ED] drop-shadow-lg">
              Terima Kasih!
            </h1>

            <p className="mx-auto mt-3 max-w-xs text-base leading-relaxed text-[#FFF9ED] drop-shadow-md">
              Kenangan, doa dan ucapan anda telah berjaya dihantar untuk semakan.
            </p>

            <div className="mt-6 font-serif text-[#E6BB69]">
              ✦ ───── ✦ ───── ✦
            </div>

            {/* Arabic Blessing */}
            <section
              aria-label="Doa untuk pengantin"
              className="mt-6 w-full rounded-2xl border-2 border-[#D5A64F] bg-[#FFF9EF]/95 px-5 py-6 shadow-xl backdrop-blur-sm"
            >
              <p
                lang="ar"
                dir="rtl"
                className={`${amiri.className} text-center text-[1.7rem] leading-[2] font-bold text-[#064735] sm:text-[1.9rem]`}
              >
                بارك الله لكما وبارك عليكما
                <br />
                وجمع بينكما في خير
              </p>

              <div className="mx-auto my-3 h-px w-20 bg-[#D5A64F]/70" />

              <p className="font-serif text-sm italic leading-relaxed text-[#426457] sm:text-base">
                “Semoga Allah memberkati kalian berdua,
                melimpahkan keberkatan ke atas kalian
                dan menghimpunkan kalian dalam kebaikan.”
              </p>
            </section>

            {/* Personal Message */}
            <p className="mx-auto mt-7 max-w-xs text-sm leading-relaxed text-[#FFF9ED] drop-shadow-md">
              Terima kasih kerana menjadi sebahagian
              daripada hari bahagia kami.
            </p>

            <p className="mt-3 font-serif text-2xl font-semibold text-[#FFF9ED]">
              Anis <span className="text-[#E6BB69]">&amp;</span> Aiziey
            </p>

            {/* Navigation Buttons */}
            <div className="mt-8 flex w-full flex-col items-center gap-3">
              <Link
                href="/galeri"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[#D5A64F] bg-gradient-to-b from-[#087153] to-[#004331] px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A64F]"
              >
                <Images className="size-5" aria-hidden="true" />
                Lihat Live Gallery
              </Link>

              <Link
                href="/"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#D5A64F] bg-[#FFF9EF]/95 px-6 text-sm font-medium text-[#064735] shadow-md transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A64F]"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Kembali ke Utama
              </Link>
            </div>

            {/* Approval Notice */}
            <p className="mx-auto mt-6 max-w-xs rounded-xl border border-[#D5A64F]/60 bg-[#003D2B]/90 px-4 py-3 text-xs leading-relaxed text-[#FFF9ED]">
              Doa dan ucapan anda akan dipaparkan
              di Live Gallery selepas disahkan oleh admin.
            </p>

          </div>
        </article>
      </div>
    </PageShell>
  )
}
