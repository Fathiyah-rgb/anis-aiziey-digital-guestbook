import 'server-only'
import { createClient } from '@supabase/supabase-js'
import type { GuestbookEntry, Relationship } from './types'

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are missing.')
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

export async function getApprovedEntries(): Promise<GuestbookEntry[]> {
  const supabase = getSupabase()

  const { data, error } = await supabase
    .from('wedding_guestbook')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error loading guestbook entries:', error)
    throw new Error('Failed to load guestbook entries.')
  }

  return (data ?? []) as GuestbookEntry[]
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
  const supabase = getSupabase()

  let photoUrl: string | null = null

  if (input.photo) {
    const extension = input.photo.name.split('.').pop() || 'jpg'
    const fileName = `${crypto.randomUUID()}.${extension}`

    const { error: uploadError } = await supabase.storage
      .from('wedding-photos')
      .upload(fileName, input.photo, {
        contentType: input.photo.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('Error uploading guest photo:', uploadError)
      throw new Error('Failed to upload photo.')
    }

    const { data: publicUrlData } = supabase.storage
      .from('wedding-photos')
      .getPublicUrl(fileName)

    photoUrl = publicUrlData.publicUrl
  }

  const { data, error } = await supabase
    .from('wedding_guestbook')
    .insert({
      guest_name: input.guest_name,
      relationship: input.relationship,
      doa: input.doa,
      photo_url: photoUrl,
      status: 'pending',
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating guestbook entry:', error)
    throw new Error('Failed to submit guestbook entry.')
  }

  return data as GuestbookEntry
}
