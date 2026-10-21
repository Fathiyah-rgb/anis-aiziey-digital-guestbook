
import Link from 'next/link'
import {
  ArrowRight,
  Camera,
  Heart,
  Send,
  Images,
} from 'lucide-react'
import { PageShell } from '@/components/wedding/page-shell'

export default function HomePage() {
  return (
    <PageShell>
      <div className="mx-auto w-full max-w-md py-3">
        <section
          aria-labelledby="couple-names"
          className="relative isolate min-h-[780px] overflow-hidden rounded-t-[170px] rounded-b-3xl border-2 border-[#D5A64F] bg-[#003D2B] shadow-2xl"
          style={{
            backgroundImage:
              "url('/Emerald%20and%20Gold%20Gardenway%20Elegance.png')",
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#001F17]/20 via-[#00291E]/35 to-[#001F17]/55]" />

          <div className="relative z-10 flex min-h-[780px] flex-col items-center px-7 pt-32 text-center">
            <p className="font-serif text-lg italic tracking-wide text-[#F2D18C] drop-shadow-lg">
              Majlis Bertaut Kasih
            </p>

            <h1
              id="couple-names"
              className="mt-6 font-serif text-5xl font-semibold leading-tight text-[#FFF9ED] drop-shadow-lg"
            >
              ANIS
              <span className="block text-5xl text-[#E6BB69]">
                &amp;
              </span>
              AIZIEY
            </h1>

            <div className="mt-5 text-[#E6BB69]">
              ✦ ───── ✦ ───── ✦
            </div>

            <h2 className="mt-5 font-serif text-xl font-semibold text-[#FFF4DB] drop-shadow-md">
              Digital Guestbook
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-[#FFF9ED] drop-shadow-md">
              Abadikan momen.
              <br />
              Kongsikan kenangan.
              <br />
              Titipkan doa buat kami.
            </p>

            <Link
              href="/kongsi"
              className="mt-7 flex min-h-14 w-full items-center justify-center gap-3 rounded-full border-2 border-[#E6BB69] bg-gradient-to-b from-[#08694C] to-[#003D2B] px-4 py-4 font-medium text-white shadow-xl transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6BB69]"
            >
              <Camera className="size-5 shrink-0" />
              <span>Kongsi Momen Anda</span>
              <ArrowRight className="size-5 shrink-0" />
            </Link>

            <div className="mt-6 grid w-full grid-cols-3 gap-2">
              <Link
                href="/kongsi"
                className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-[#D5A64F] bg-[#FFF9ED]/95 px-2 py-3 text-[#004331] shadow-md transition hover:bg-white"
              >
                <Heart className="size-6" />
                <span className="text-center text-xs">
                  Isi Maklumat
                </span>
              </Link>

              <Link
                href="/kongsi"
                className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-[#D5A64F] bg-[#FFF9ED]/95 px-2 py-3 text-[#004331] shadow-md transition hover:bg-white"
              >
                <Send className="size-6" />
                <span className="text-center text-xs">
                  Hantar Ucapan
                </span>
              </Link>

              <Link
                href="/galeri"
                className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-[#D5A64F] bg-[#FFF9ED]/95 px-2 py-3 text-[#004331] shadow-md transition hover:bg-white"
              >
                <Images className="size-6" />
                <span className="text-center text-xs">
                  Lihat Galeri
                </span>
              </Link>
            </div>

            <p className="mt-auto px-3 pb-8 pt-8 font-serif text-xs italic leading-relaxed text-[#FFF4DB] drop-shadow-md">
              “Dan Kami ciptakan kamu berpasang-pasangan”
              <span className="mt-1 block text-[#E6BB69]">
                Surah An-Naba’ (78:8)
              </span>
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
