
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Camera, Quote, Heart } from 'lucide-react'
import {
  RELATIONSHIPS,
  type GuestbookEntry,
  type Relationship,
} from '@/lib/guestbook/types'
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
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A64F]',
                isActive
                  ? 'border-[#D5A64F] bg-[#064735] text-white shadow-md'
                  : 'border-[#D5A64F]/60 bg-[#FFF9EF] text-[#064735] hover:border-[#B88C43] hover:bg-[#F3E8D1]'
              )}
            >
              {filter}
            </button>
          )
        })}
      </div>

      {/* Accessible Gallery Count */}
      <p className="sr-only" aria-live="polite">
        {visible.length} kenangan dipaparkan
      </p>

      {/* Gallery Cards */}
      {visible.length === 0 ? (
        <EmptyState filter={active} />
      ) : (
        <ul className="columns-2 gap-3 sm:columns-3 sm:gap-5">
          {visible.map((entry) => (
            <li
              key={entry.id}
              className="mb-3 min-w-0 break-inside-avoid sm:mb-5"
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
        'min-w-0 overflow-hidden rounded-2xl border border-[#D5A64F]/65 shadow-md ring-1 ring-[#D5A64F]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
        hasPhoto
          ? 'bg-[#FFF9EF]'
          : 'bg-[#064735] text-white'
      )}
    >
      {/* Guest Photo */}
      {hasPhoto && (
        <div className="p-2 pb-0">
          <div className="flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-xl bg-[#F5EBD9]">
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

      {/* Guest Message */}
      <div className="p-3 sm:p-4">
        {!hasPhoto && (
          <Quote
            className="mb-2 size-5 fill-[#D5A64F]/20 text-[#E6BB69]"
            aria-hidden="true"
          />
        )}

        <p
          className={cn(
            'break-words whitespace-pre-wrap font-serif text-base leading-relaxed sm:text-lg',
            hasPhoto
              ? 'text-[#064735]'
              : 'text-[#FFF9ED]'
          )}
        >
          {entry.doa}
        </p>

        {/* Guest Information */}
        <div
          className={cn(
            'mt-3 border-t pt-3',
            hasPhoto
              ? 'border-[#D5A64F]/40'
              : 'border-[#E6BB69]/40'
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cn(
                'min-w-0 break-words text-sm font-semibold sm:text-base',
                hasPhoto
                  ? 'text-[#064735]'
                  : 'text-[#FFF9ED]'
              )}
            >
              {entry.guest_name}
            </h3>

            <Heart
              className={cn(
                'size-4 shrink-0',
                hasPhoto
                  ? 'text-[#B88C43]'
                  : 'text-[#E6BB69]'
              )}
              aria-hidden="true"
            />
          </div>

          {/* Relationship Category */}
          <span
            className={cn(
              'mt-2 inline-block rounded-full px-2 py-1 text-[10px] font-medium sm:text-xs',
              hasPhoto
                ? 'bg-[#E8D7AF]/50 text-[#064735]'
                : 'bg-[#E6BB69]/15 text-[#F2D18C]'
            )}
          >
            {entry.relationship}
          </span>

          {/* Submission Date */}
          <time
            dateTime={entry.created_at}
            className={cn(
              'mt-2 block text-xs leading-relaxed sm:text-sm',
              hasPhoto
                ? 'text-[#648276]'
                : 'text-[#E9E1D0]'
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
    <div className="mx-auto max-w-sm rounded-3xl border border-dashed border-[#D5A64F]/70 bg-[#FFF9EF]/95 px-6 py-12 text-center shadow-md">
      <Heart
        className="mx-auto mb-4 size-8 text-[#B88C43]"
        aria-hidden="true"
      />

      <p className="font-serif text-2xl text-[#064735]">
        Belum ada kenangan
      </p>

      <p className="mt-2 text-sm text-[#648276]">
        {filter === 'Semua'
          ? 'Jadilah yang pertama berkongsi momen bahagia ini.'
          : `Belum ada kenangan daripada kategori ${filter}.`}
      </p>

      <Link
        href="/kongsi"
        className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-[#D5A64F] bg-gradient-to-b from-[#087153] to-[#004331] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A64F]"
      >
        <Camera className="size-4" aria-hidden="true" />
        Kongsi Momen Anda
      </Link>
    </div>
  )
}
