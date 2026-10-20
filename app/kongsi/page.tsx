
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
          className="relative overflow-hidden rounded-t-[150px] rounded-b-3xl border-2 border-[#D5A64F] bg-[#073578] shadow-2xl"
          style={{
            backgroundImage:
              "url('/Ornate%20Blue%20Mosque%20Wedding%20Courtyard.png')",
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="relative z-10 px-4 pt-28 pb-12 sm:px-6">
            <div className="rounded-3xl border border-[#D5A64F]/70 bg-[#FFF9EF]/95 px-4 py-7 text-center shadow-xl backdrop-blur-sm sm:px-6">
              <p className="font-serif text-sm tracking-[0.2em] text-[#B88430] uppercase">
                Anis &amp; Aiziey
              </p>

              <h1 className="mt-4 font-serif text-3xl font-semibold text-[#082C67]">
                Kongsi Momen Anda
              </h1>

              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-[#082C67]/80">
                Abadikan kenangan dan titipkan doa buat
                Anis &amp; Aiziey.
              </p>

              <div className="my-6 text-[#B88430]">
                ✦ ───── ✦ ───── ✦
              </div>

              <div className="text-left">
                <GuestbookForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
