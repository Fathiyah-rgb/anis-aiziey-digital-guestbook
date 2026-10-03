'use client'

import { startTransition, useActionState, useRef, useState } from 'react'
import { Camera, ChevronDown, ImageIcon, Loader2, Send, X } from 'lucide-react'
import { submitGuestbookEntry, type SubmitState } from '@/app/kongsi/actions'
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES, RELATIONSHIPS } from '@/lib/guestbook/types'
import { primaryButton } from './button-styles'
import { cn } from '@/lib/utils'

const initialState: SubmitState = { ok: false }
const DOA_MAX = 1000

const fieldClass =
  'w-full rounded-2xl border border-input bg-white px-4 text-base text-navy placeholder:text-navy/40 transition-colors focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20 aria-invalid:border-destructive'

export function GuestbookForm() {
  const [state, dispatch, pending] = useActionState(submitGuestbookEntry, initialState)
  const [photo, setPhoto] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [photoError, setPhotoError] = useState<string | null>(null)
  const [doaLength, setDoaLength] = useState(0)
  const cameraInput = useRef<HTMLInputElement>(null)
  const galleryInput = useRef<HTMLInputElement>(null)

  const errors = state.errors ?? {}
  const photoMessage = photoError ?? errors.photo

  function clearPhoto() {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPhoto(null)
    setPreviewUrl(null)
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setPhotoError('Format gambar tidak disokong. Sila guna JPG, PNG atau WEBP.')
      return
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setPhotoError('Saiz gambar melebihi 10MB. Sila pilih gambar lain.')
      return
    }

    clearPhoto()
    setPhotoError(null)
    setPhoto(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  // Submitting via onSubmit (not the form action prop) keeps typed values when validation fails.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    if (photo) formData.set('photo', photo)
    startTransition(() => dispatch(formData))
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="guest_name" className="text-sm font-semibold text-navy">
          Nama Anda <span className="text-gold">*</span>
        </label>
        <input
          id="guest_name"
          name="guest_name"
          type="text"
          required
          maxLength={80}
          autoComplete="name"
          placeholder="Contoh: Siti Aisyah"
          aria-invalid={!!errors.guest_name}
          aria-describedby={errors.guest_name ? 'guest_name-error' : undefined}
          className={cn(fieldClass, 'h-12')}
        />
        <FieldError id="guest_name-error" message={errors.guest_name} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="relationship" className="text-sm font-semibold text-navy">
          Hubungan dengan Pengantin <span className="text-gold">*</span>
        </label>
        <div className="relative">
          <select
            id="relationship"
            name="relationship"
            required
            defaultValue=""
            aria-invalid={!!errors.relationship}
            aria-describedby={errors.relationship ? 'relationship-error' : undefined}
            className={cn(fieldClass, 'h-12 appearance-none pr-10 invalid:text-navy/40')}
          >
            <option value="" disabled>
              Pilih hubungan
            </option>
            {RELATIONSHIPS.map((relationship) => (
              <option key={relationship} value={relationship} className="text-navy">
                {relationship}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-navy/50"
            aria-hidden="true"
          />
        </div>
        <FieldError id="relationship-error" message={errors.relationship} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="doa" className="text-sm font-semibold text-navy">
          Doa &amp; Ucapan <span className="text-gold">*</span>
        </label>
        <textarea
          id="doa"
          name="doa"
          required
          rows={5}
          maxLength={DOA_MAX}
          placeholder="Tulis doa dan ucapan anda di sini..."
          onChange={(e) => setDoaLength(e.target.value.length)}
          aria-invalid={!!errors.doa}
          aria-describedby={errors.doa ? 'doa-error doa-count' : 'doa-count'}
          className={cn(fieldClass, 'resize-none py-3 leading-relaxed')}
        />
        <div className="flex items-start justify-between gap-3">
          <FieldError id="doa-error" message={errors.doa} />
          <span id="doa-count" className="ml-auto text-xs text-navy/50 tabular-nums">
            {doaLength}/{DOA_MAX}
          </span>
        </div>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-semibold text-navy">
          Upload Gambar <span className="font-normal text-navy/50">(Pilihan)</span>
        </legend>

        <input
          ref={cameraInput}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          capture="environment"
          onChange={handleFile}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        />
        <input
          ref={galleryInput}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFile}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        />

        {previewUrl ? (
          <div className="relative overflow-hidden rounded-2xl border border-gold/50 bg-white p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Pratonton gambar yang dipilih"
              className="max-h-80 w-full rounded-xl object-cover"
            />
            <button
              type="button"
              onClick={clearPhoto}
              className="absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-full bg-navy/80 text-white backdrop-blur hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="size-4" aria-hidden="true" />
              <span className="sr-only">Buang gambar</span>
            </button>
            <p className="truncate px-1 pt-2 text-xs text-navy/60">{photo?.name}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <UploadButton icon={Camera} label="Ambil Gambar" hint="Guna kamera" onClick={() => cameraInput.current?.click()} />
            <UploadButton
              icon={ImageIcon}
              label="Pilih Gambar"
              hint="Dari galeri"
              onClick={() => galleryInput.current?.click()}
            />
          </div>
        )}

        <p className="text-xs text-navy/50">Format: JPG, PNG atau WEBP. Saiz maksimum 10MB.</p>
        <FieldError id="photo-error" message={photoMessage} />
      </fieldset>

      {errors.form && (
        <p role="alert" className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errors.form}
        </p>
      )}

      <button type="submit" disabled={pending} className={primaryButton('mt-2 w-full')}>
        {pending ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            Menghantar...
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" />
            Hantar Kenangan
          </>
        )}
      </button>
    </form>
  )
}

function UploadButton({
  icon: Icon,
  label,
  hint,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  hint: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-gold/70 bg-white/70 px-3 py-5 text-center transition-colors hover:border-royal hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal"
    >
      <span className="inline-flex size-11 items-center justify-center rounded-full bg-royal/10 text-royal">
        <Icon className="size-5" />
      </span>
      <span className="text-sm font-semibold text-navy">{label}</span>
      <span className="text-xs text-navy/50">{hint}</span>
    </button>
  )
}

function FieldError({ id, message }: { id: string; message?: string | null }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="text-sm text-destructive">
      {message}
    </p>
  )
}
