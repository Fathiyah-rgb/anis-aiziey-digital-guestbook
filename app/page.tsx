
import Link from 'next/link'
import { ArrowRight, Camera, Heart, Send, Images } from 'lucide-react'
import { PageShell } from '@/components/wedding/page-shell'

export default function HomePage() {
  return (
    <PageShell>
      <div className="mx-auto w-full max-w-md py-3">
        <section
          aria-labelledby="couple-names"
          className="relative min-h-[780px] overflow-hidden rounded-t-[170px] rounded-b-3xl border-2 border-[#D5A64F] bg-[#073578] shadow-2xl"
          style={{
            backgroundImage:
              "url('/Ornate%20Blue%20Mosque%20Wedding%20Courtyard.png')",
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-x-[12%] top-[15%] bottom-[35%] rounded-[45%] bg-[#FFF8E9]/90 blur-2xl" />

          <div className="relative z-10 flex min-h-[780px] flex-col items-center px-7 pt-32 text-center">
            <p className="font-serif text-base tracking-wider text-[#B88430]">
              Majlis Perkahwinan
            </p>

            <h1
              id="couple-names"
              className="mt-6 font-serif text-5xl font-semibold leading-tight text-[#082C67]"
            >
              ANIS
              <span className="block text-4xl text-[#B88430]">
                &amp;
              </span>
              AIZIEY
            </h1>

            <div className="mt-5 text-[#B88430]">
              ✦ ───── ✦ ───── ✦
            </div>

            <h2 className="mt-5 font-serif text-xl font-semibold text-[#082C67]">
              Kenangan Hari Bahagia Kami
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-[#082C67]">
              Abadikan momen.
              <br />
              Kongsikan kenangan.
              <br />
              Titipkan doa buat kami.
            </p>

            <Link
              href="/kongsi"
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-full border-2 border-[#D5A64F] bg-gradient-to-b from-[#0754B8] to-[#002C78] px-5 py-4 font-medium text-white shadow-xl transition hover:brightness-110"
            >
              <Camera className="size-5" />
              Kongsi Momen Anda
              <ArrowRight className="size-5" />
            </Link>

            <div className="mt-6 grid w-full grid-cols-3 gap-2">
              <Link
                href="/kongsi"
                className="flex flex-col items-center gap-2 rounded-2xl border border-[#D5A64F]/60 bg-white/90 px-2 py-3 text-[#082C67] shadow-md"
              >
                <Heart className="size-6" />
                <span className="text-xs">Isi Maklumat</span>
              </Link>

              <Link
                href="/kongsi"
                className="flex flex-col items-center gap-2 rounded-2xl border border-[#D5A64F]/60 bg-white/90 px-2 py-3 text-[#082C67] shadow-md"
              >
                <Send className="size-6" />
                <span className="text-xs">Hantar</span>
              </Link>

              <Link
                href="/galeri"
                className="flex flex-col items-center gap-2 rounded-2xl border border-[#D5A64F]/60 bg-white/90 px-2 py-3 text-[#082C67] shadow-md"
              >
                <Images className="size-6" />
                <span className="text-xs">Lihat Galeri</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
