
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Camera, Quote, Heart } from 'lucide-react'
import {
  RELATIONSHIPS,
  type GuestbookEntry,
  type Relationship,
} from '@/lib/guestbook/types'
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

export function LiveGallery({
  entries,
}: {
  entries: GuestbookEntry[]
}) {
  const [active, setActive] = useState<Filter>('Semua')

  const visible =
    active === 'Semua'
      ? entries
      : entries.filter(
          (entry) => entry.relationship === active
        )

  return (
    <section className="relative w-full">

      {/* Category Filters */}
      <div
        role="group"
        aria-label="Tapis mengikut hubungan"
        className="mb-6 flex flex-wrap justify-center gap-2"
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
                'min-h-10 rounded-full border px-3 py-2 text-xs font-medium transition-colors sm:px-5 sm:text-sm',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal',
                isActive
                  ? 'border-gold bg-navy text-white'
                  : 'border-gold/50 bg-ivory text-navy hover:border-gold hover:bg-gold/10'
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
        <ul className="grid grid-cols-2 items-start gap-3 sm:grid-cols-3 sm:gap-5">
          {visible.map((entry) => (
            <li key={entry.id} className="min-w-0">
              <GuestCard entry={entry} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function GuestCard({
  entry,
}: {
  entry: GuestbookEntry
}) {
  const hasPhoto = Boolean(entry.photo_url)

  return (
    <article
      className={cn(
        'min-w-0 overflow-hidden rounded-2xl border shadow-soft transition-shadow duration-300 hover:shadow-lg',
        hasPhoto
          ? 'border-gold/50 bg-ivory'
          : 'border-gold/50 bg-navy text-white'
      )}
    >
      {hasPhoto && (
        <div className="p-2 pb-0">
          <div className="flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-xl bg-cream">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={entry.photo_url!}
              alt={`Gambar daripada ${entry.guest_name}`}
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      )}

      <div className="p-3 sm:p-4">
        {!hasPhoto && (
          <Quote
            className="mb-2 size-5 fill-gold/20 text-gold"
            aria-hidden="true"
          />
        )}

        <p
          className={cn(
            'break-words whitespace-pre-wrap font-serif text-sm leading-relaxed sm:text-base',
            hasPhoto ? 'text-navy' : 'text-white'
          )}
        >
          {entry.doa}
        </p>

        <div
          className={cn(
            'mt-3 border-t pt-3',
            hasPhoto
              ? 'border-gold/30'
              : 'border-white/20'
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cn(
                'min-w-0 break-words text-xs font-semibold sm:text-sm',
                hasPhoto ? 'text-navy' : 'text-white'
              )}
            >
              {entry.guest_name}
            </h3>

            <Heart
              className="size-4 shrink-0 text-gold"
              aria-hidden="true"
            />
          </div>

          <span
            className={cn(
              'mt-2 inline-block rounded-full px-2 py-1 text-[10px] font-medium sm:text-xs',
              hasPhoto
                ? 'bg-gold/15 text-navy'
                : 'bg-white/15 text-gold'
            )}
          >
            {entry.relationship}
          </span>

          <time
            dateTime={entry.created_at}
            className={cn(
              'mt-2 block text-[10px] leading-relaxed sm:text-xs',
              hasPhoto
                ? 'text-navy/60'
                : 'text-white/70'
            )}
          >
            {dateFormatter.format(
              new Date(entry.created_at)
            )}
          </time>
        </div>
      </div>
    </article>
  )
}

function EmptyState({
  filter,
}: {
  filter: Filter
}) {
  return (
    <div className="mx-auto max-w-sm rounded-3xl border border-dashed border-gold/60 bg-ivory/90 px-6 py-12 text-center shadow-soft">
      <Heart
        className="mx-auto mb-4 size-8 text-gold"
        aria-hidden="true"
      />

      <p className="font-serif text-2xl text-navy">
        Belum ada kenangan
      </p>

      <p className="mt-2 text-sm text-muted-foreground">
        {filter === 'Semua'
          ? 'Jadilah yang pertama berkongsi momen bahagia ini.'
          : `Belum ada kenangan daripada kategori ${filter}.`}
      </p>

      <Link
        href="/kongsi"
        className={primaryButton('mt-6 h-11 px-5 text-sm')}
      >
        <Camera className="size-4" aria-hidden="true" />
        Kongsi Momen Anda
      </Link>
    </div>
  )
}
