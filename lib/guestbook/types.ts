export const RELATIONSHIPS = [
  'Keluarga',
  'Sahabat',
  'Rakan Kerja',
  'Rakan',
  'Lain-lain',
] as const

export type Relationship = (typeof RELATIONSHIPS)[number]

export type GuestbookStatus = 'pending' | 'approved' | 'rejected'

/** Mirrors the Supabase table `wedding_guestbook`. */
export type GuestbookEntry = {
  id: string
  created_at: string
  guest_name: string
  relationship: Relationship
  doa: string
  photo_url: string | null
  status: GuestbookStatus
}

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024

export const GUESTBOOK_TABLE = 'wedding_guestbook'
export const PHOTO_BUCKET = 'wedding-photos'
