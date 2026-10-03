import type { Metadata } from 'next'
import { PageShell } from '@/components/wedding/page-shell'
import { GuestbookForm } from '@/components/wedding/guestbook-form'
import { StarDivider } from '@/components/wedding/ornaments'

export const metadata: Metadata = {
  title: 'Kongsi Momen Anda — Anis & Aiziey',
}

export default function KongsiPage() {
  return (
    <PageShell showBack>
      <div className="pt-8 pb-6 text-center">
        <h1 className="font-serif text-4xl font-semibold text-navy">Kongsi Momen Anda</h1>
        <p className="mx-auto mt-3 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
          Abadikan kenangan dan titipkan doa buat Anis &amp; Aiziey.
        </p>
        <StarDivider className="mt-5" />
      </div>

      <div className="rounded-3xl border border-border bg-ivory p-5 shadow-soft sm:p-6">
        <GuestbookForm />
      </div>
    </PageShell>
  )
}
