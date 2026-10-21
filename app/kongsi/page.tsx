
import type { Metadata } from 'next'
import { PageShell } from '@/components/wedding/page-shell'
import { GuestbookForm } from '@/components/wedding/guestbook-form'

export const metadata: Metadata = {
  title: 'Kongsi Momen Anda — Anis & Aiziey',
}

export default function KongsiPage() {
  return (
    <PageShell showBack>
      <div className="mx-auto w-full max-w-md py-4">
        <section
          aria-labelledby="kongsi-title"
          className="relative isolate overflow-hidden rounded-t-[150px] rounded-b-3xl border-2 border-[#D5A64F] bg-[#003D2B] shadow-2xl"
          style={{
            backgroundImage:
              "url('/Emerald%20and%20Gold%20Gardenway%20Elegance.png')",
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Soft overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#00271C]/10 via-[#00271C]/20 to-[#001F17]/35" />

          <div className="relative z-10 px-4 pb-12 pt-28 sm:px-6">
            <div className="rounded-3xl border-2 border-[#D5A64F] bg-[#FFF9EF]/95 px-4 py-7 text-center shadow-2xl backdrop-blur-sm sm:px-6">

              <p className="font-serif text-sm uppercase tracking-[0.2em] text-[#A87B32]">
                Anis &amp; Aiziey
              </p>

              <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-[#C89B48] to-transparent" />

              <h1
                id="kongsi-title"
                className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#064735]"
              >
                Kongsi Momen Anda
              </h1>

              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-[#426457]">
                Setiap gambar dan doa menjadi
                kenangan terindah buat kami.
              </p>

              <div className="my-6 font-serif text-[#B88C43]">
                ✦ ───── ✦ ───── ✦
              </div>

              {/* Existing functional guestbook form */}
              <div className="text-left">
                <GuestbookForm />
              </div>

              <div className="mt-8 text-center">
                <p className="font-serif text-xs italic text-[#A87B32]">
                  Terima kasih kerana menjadi sebahagian
                  daripada kenangan indah kami.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
