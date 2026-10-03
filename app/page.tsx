import Link from 'next/link'
import { ArrowRight, Camera } from 'lucide-react'
import { PageShell } from '@/components/wedding/page-shell'
import { FloralSprig, Lantern, StarDivider } from '@/components/wedding/ornaments'
import { primaryButton, textLink } from '@/components/wedding/button-styles'

export default function HomePage() {
  return (
    <PageShell>
      <div className="relative flex min-h-[calc(100dvh-3rem)] flex-col items-center justify-center py-10">
        <Lantern className="animate-sway absolute top-0 left-2 w-7" stringLength={40} />
        <Lantern className="animate-sway absolute top-0 right-2 w-7 [animation-delay:-2.5s]" stringLength={70} />

        <section
          aria-labelledby="couple-names"
          className="relative w-full rounded-t-[999px] rounded-b-3xl border border-gold/60 bg-ivory p-2 shadow-soft"
        >
          <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[1.25rem] border border-gold/40 px-6 pt-24 pb-16 text-center">
            <FloralSprig className="absolute bottom-3 -left-2 w-28 opacity-70" />
            <FloralSprig className="absolute bottom-3 -right-2 w-28 -scale-x-100 opacity-70" />

            <p className="text-xs font-medium tracking-[0.3em] text-gold uppercase">Majlis Perkahwinan</p>

            <h1 id="couple-names" className="mt-5 font-serif text-6xl leading-none font-semibold text-navy">
              Anis
              <span className="my-2 block font-serif text-4xl font-normal italic text-gold">&amp;</span>
              Aiziey
            </h1>

            <StarDivider className="mt-7" />

            <p className="mt-6 font-serif text-2xl italic text-navy">Kenangan Hari Bahagia Kami</p>
            <p className="mx-auto mt-3 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              Abadikan momen. Kongsikan kenangan. Titipkan doa buat kami.
            </p>
          </div>
        </section>

        <div className="mt-8 flex w-full flex-col items-center gap-4">
          <Link href="/kongsi" className={primaryButton('w-full')}>
            <Camera className="size-5" aria-hidden="true" />
            Kongsi Momen Anda
          </Link>
          <Link href="/galeri" className={textLink('py-2')}>
            Lihat Live Gallery
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </PageShell>
  )
}
