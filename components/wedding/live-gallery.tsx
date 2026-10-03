'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Camera, Quote } from 'lucide-react'
import { RELATIONSHIPS, type GuestbookEntry, type Relationship } from '@/lib/guestbook/types'
import { primaryButton } from './button-styles'
import { cn } from '@/lib/utils'

type Filter = 'Semua' | Relationship
const FILTERS: Filter[] = ['Semua', ...RELATIONSHIPS]

const dateFormatter = new Intl.DateTimeFormat('ms-MY', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'Asia/Kuala_Lumpur',
})

export function LiveGallery({ entries }: { entries: GuestbookEntry[] }) {
  const [active, setActive] = useState<Filter>('Semua')
  const visible = active === 'Semua' ? entries : entries.filter((entry) => entry.relationship === active)

  return (
    <div>
      <div
        role="group"
        aria-label="Tapis mengikut hubungan"
        className="-mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:flex-wrap sm:justify-center"
      >
        {FILTERS.map((filter) => {
          const isActive = active === filter
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className={cn(
                'min-h-11 shrink-0 rounded-full border px-5 py-2.5 text-[15px] font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal',
                isActive
                  ? 'border-navy bg-navy text-white'
                  : 'border-border bg-ivory text-navy/80 hover:border-gold hover:text-navy',
              )}
            >
              {filter}
            </button>
          )
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} kenangan dipaparkan
      </p>

      {visible.length === 0 ? (
        <EmptyState filter={active} />
      ) : (
        <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {visible.map((entry) => (
            <li key={entry.id} className="mb-4 break-inside-avoid">
              <GuestCard entry={entry} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function GuestCard({ entry }: { entry: GuestbookEntry }) {
  const hasPhoto = !!entry.photo_url

  return (
    <article
      className={cn(
        'overflow-hidden rounded-3xl border shadow-soft',
        hasPhoto ? 'border-border bg-ivory' : 'border-navy bg-navy text-white',
      )}
    >
      {hasPhoto && (
        <div className="p-2 pb-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={entry.photo_url!}
            alt={`Gambar daripada ${entry.guest_name}`}
            loading="lazy"
            className="w-full rounded-t-[999px] rounded-b-2xl object-cover"
          />
        </div>
      )}

      <div className="p-5">
        {!hasPhoto && <Quote className="mb-3 size-7 fill-gold/30 text-gold" aria-hidden="true" />}
        <p
          className={cn(
            'font-serif text-[1.375rem] leading-relaxed text-pretty',
            hasPhoto ? 'text-navy' : 'text-white',
          )}
        >
          {entry.doa}
        </p>

        <footer
          className={cn(
            'mt-5 flex items-end justify-between gap-3 border-t pt-4',
            hasPhoto ? 'border-border' : 'border-white/15',
          )}
        >
          <div className="min-w-0">
            <h3 className={cn('truncate text-[17px] font-semibold', hasPhoto ? 'text-navy' : 'text-white')}>
              {entry.guest_name}
            </h3>
            <time
              dateTime={entry.created_at}
              className={cn('mt-0.5 block text-sm', hasPhoto ? 'text-navy/65' : 'text-white/75')}
            >
              {dateFormatter.format(new Date(entry.created_at))}
            </time>
          </div>
          <span
            className={cn(
              'shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium',
              hasPhoto ? 'bg-gold/15 text-navy' : 'bg-gold/20 text-gold',
            )}
          >
            {entry.relationship}
          </span>
        </footer>
      </div>
    </article>
  )
}

function EmptyState({ filter }: { filter: Filter }) {
  return (
    <div className="mx-auto max-w-sm rounded-3xl border border-dashed border-gold/60 bg-ivory/70 px-6 py-12 text-center">
      <p className="font-serif text-2xl text-navy">Belum ada kenangan</p>
      <p className="mt-2 text-sm text-muted-foreground">
        {filter === 'Semua'
          ? 'Jadilah yang pertama mengongsi momen bahagia ini.'
          : `Belum ada kenangan daripada kategori ${filter}.`}
      </p>
      <Link href="/kongsi" className={primaryButton('mt-6 h-11 px-5 text-sm')}>
        <Camera className="size-4" aria-hidden="true" />
        Kongsi Momen Anda
      </Link>
    </div>
  )
}
