import 'server-only'
import { MOCK_ENTRIES } from './mock-data'
import type { GuestbookEntry, Relationship } from './types'

/*
 * Data access layer for the guestbook.
 *
 * Currently backed by mock data so the full guest experience can be
 * previewed without credentials. When Supabase is connected, replace the
 * bodies of these two functions only — the rest of the app stays the same:
 *
 *   getApprovedEntries():
 *     supabase.from('wedding_guestbook').select('*')
 *       .eq('status', 'approved').order('created_at', { ascending: false })
 *
 *   createPendingEntry():
 *     1. upload photo to storage bucket 'wedding-photos' (if provided)
 *     2. insert into 'wedding_guestbook' with status = 'pending'
 */

export async function getApprovedEntries(): Promise<GuestbookEntry[]> {
  return MOCK_ENTRIES.filter((entry) => entry.status === 'approved').sort(
    (a, b) => b.created_at.localeCompare(a.created_at),
  )
}

export type NewEntryInput = {
  guest_name: string
  relationship: Relationship
  doa: string
  photo: File | null
}

export async function createPendingEntry(
  input: NewEntryInput,
): Promise<GuestbookEntry> {
  // Mock mode: the photo is validated but not persisted anywhere.
  await new Promise((resolve) => setTimeout(resolve, 900))

  return {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    guest_name: input.guest_name,
    relationship: input.relationship,
    doa: input.doa,
    photo_url: null,
    status: 'pending',
  }
}
