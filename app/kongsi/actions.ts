'use server'

import { redirect } from 'next/navigation'
import { createPendingEntry } from '@/lib/guestbook/repository'
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  RELATIONSHIPS,
  type Relationship,
} from '@/lib/guestbook/types'

export type SubmitState = {
  ok: boolean
  errors?: Partial<Record<'guest_name' | 'relationship' | 'doa' | 'photo' | 'form', string>>
}

export async function submitGuestbookEntry(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const guestName = String(formData.get('guest_name') ?? '').trim()
  const relationship = String(formData.get('relationship') ?? '')
  const doa = String(formData.get('doa') ?? '').trim()
  const photoValue = formData.get('photo')
  const photo = photoValue instanceof File && photoValue.size > 0 ? photoValue : null

  const errors: SubmitState['errors'] = {}

  if (guestName.length < 2) errors.guest_name = 'Sila masukkan nama anda.'
  else if (guestName.length > 80) errors.guest_name = 'Nama terlalu panjang (maksimum 80 aksara).'

  if (!RELATIONSHIPS.includes(relationship as Relationship))
    errors.relationship = 'Sila pilih hubungan anda dengan pengantin.'

  if (doa.length < 3) errors.doa = 'Sila tulis doa atau ucapan anda.'
  else if (doa.length > 1000) errors.doa = 'Ucapan terlalu panjang (maksimum 1000 aksara).'

  if (photo) {
    if (!ACCEPTED_IMAGE_TYPES.includes(photo.type))
      errors.photo = 'Format gambar tidak disokong. Sila guna JPG, PNG atau WEBP.'
    else if (photo.size > MAX_IMAGE_BYTES)
      errors.photo = 'Saiz gambar melebihi 10MB.'
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  try {
    await createPendingEntry({
      guest_name: guestName,
      relationship: relationship as Relationship,
      doa,
      photo,
    })
  } catch {
    return {
      ok: false,
      errors: { form: 'Maaf, berlaku ralat. Sila cuba sekali lagi.' },
    }
  }

  redirect('/terima-kasih')
}
