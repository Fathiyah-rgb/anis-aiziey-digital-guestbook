
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
    <section className="relative">
      {/* Category Filters */}
      <div
        role="group"
        aria-label="Tapis mengikut hubungan"
        className="-mx-5 mb-7 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:flex-wrap sm:justify-center"
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
                'min-h-10 shrink-0 rounded-full border px-4 py-2 text-xs font-medium whitespace-nowrap shadow-sm transition-all duration-200 sm:text-sm',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal',
                isActive
                  ? 'border-gold bg-navy text-white shadow-md'
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
        <ul className="columns-2 gap-2 sm:columns-3 sm:gap-4 lg:columns-4">
          {visible.map((entry) => (
            <li
              key={entry.id}
              className="mb-3 break-inside-avoid sm:mb-4"
            >
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
        'overflow-hidden rounded-2xl border shadow-soft transition-shadow duration-300 hover:shadow-lg',
        hasPhoto
          ? 'border-gold/50 bg-ivory'
          : 'border-gold/50 bg-navy text-white'
      )}
    >
      {hasPhoto && (
        <div className="p-1.5 pb-0 sm:p-2 sm:pb-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={entry.photo_url!}
            alt={`Gambar daripada ${entry.guest_name}`}
            loading="lazy"
            className="h-auto w-full rounded-xl object-cover"
          />
        </div>
      )}

      <div className="p-3 sm:p-4">
        {!hasPhoto && (
          <Quote
            className="mb-3 size-6 fill-gold/20 text-gold"
            aria-hidden="true"
          />
        )}

        <p
          className={cn(
            'font-serif text-sm leading-relaxed break-words whitespace-pre-wrap sm:text-lg',
            hasPhoto ? 'text-navy' : 'text-white'
          )}
        >
          {entry.doa}
        </p>

        <div
          className={cn(
            'mt-4 border-t pt-3',
            hasPhoto
              ? 'border-gold/30'
              : 'border-white/20'
          )}
        >
          <div className="flex items-start justify-between gap-1">
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
              'mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium sm:text-xs',
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
