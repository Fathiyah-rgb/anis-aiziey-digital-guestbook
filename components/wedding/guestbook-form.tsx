
'use client'

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentType,
  type FormEvent,
} from 'react'
import {
  Camera,
  ChevronDown,
  ImageIcon,
  Loader2,
  Send,
  X,
} from 'lucide-react'
import {
  submitGuestbookEntry,
  type SubmitState,
} from '@/app/kongsi/actions'
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  RELATIONSHIPS,
} from '@/lib/guestbook/types'
import { cn } from '@/lib/utils'

const initialState: SubmitState = { ok: false }
const DOA_MAX = 1000

const MAX_IMAGE_DIMENSION = 1600
const IMAGE_QUALITY = 0.8

const fieldClass =
  'w-full rounded-2xl border border-[#D5A64F]/65 bg-white px-4 text-base text-[#064735] placeholder:text-[#648276] transition-colors focus:border-[#B88C43] focus:outline-none focus:ring-2 focus:ring-[#D5A64F]/25 aria-invalid:border-destructive'

async function compressImage(file: File): Promise<File> {
  if (typeof document === 'undefined') {
    return file
  }

  const imageUrl = URL.createObjectURL(file)

  try {
    const image = new Image()

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve()
      image.onerror = () => reject(
        new Error('Gambar tidak dapat dibaca.')
      )
      image.src = imageUrl
    })

    const originalWidth = image.naturalWidth
    const originalHeight = image.naturalHeight

    if (!originalWidth || !originalHeight) {
      return file
    }

    const scale = Math.min(
      1,
      MAX_IMAGE_DIMENSION / Math.max(
        originalWidth,
        originalHeight
      )
    )

    const canvas = document.createElement('canvas')

    canvas.width = Math.max(
      1,
      Math.round(originalWidth * scale)
    )
    canvas.height = Math.max(
      1,
      Math.round(originalHeight * scale)
    )

    const context = canvas.getContext('2d')

    if (!context) {
      return file
    }

    context.drawImage(
      image,
      0,
      0,
      canvas.width,
      canvas.height
    )

    const outputType =
      file.type === 'image/png' &&
      !hasTransparency(context, canvas.width, canvas.height)
        ? 'image/jpeg'
        : file.type === 'image/png'
          ? 'image/png'
          : 'image/jpeg'

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(
        resolve,
        outputType,
        IMAGE_QUALITY
      )
    })

    if (!blob || blob.size >= file.size) {
      return file
    }

    const extension =
      outputType === 'image/png' ? 'png' : 'jpg'

    const originalName = file.name.replace(
      /\.[^.]+$/,
      ''
    )

    return new File(
      [blob],
      `${originalName}-compressed.${extension}`,
      {
        type: outputType,
        lastModified: Date.now(),
      }
    )
  } finally {
    URL.revokeObjectURL(imageUrl)
  }
}

function hasTransparency(
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): boolean {
  try {
    const pixels = context.getImageData(
      0,
      0,
      width,
      height
    ).data

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 255) {
        return true
      }
    }
  } catch {
    return true
  }

  return false
}

export function GuestbookForm() {
  const [state, dispatch, pending] = useActionState(
    submitGuestbookEntry,
    initialState
  )

  const [photo, setPhoto] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [photoError, setPhotoError] = useState<string | null>(null)
  const [photoInfo, setPhotoInfo] = useState<string | null>(null)
  const [compressing, setCompressing] = useState(false)
  const [doaLength, setDoaLength] = useState(0)

  const cameraInput = useRef<HTMLInputElement>(null)
  const galleryInput = useRef<HTMLInputElement>(null)
  const previewRef = useRef<string | null>(null)
  const selectionId = useRef(0)

  const errors = state.errors ?? {}
  const photoMessage = photoError ?? errors.photo
  const busy = pending || compressing

  useEffect(() => {
    return () => {
      selectionId.current += 1

      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current)
      }
    }
  }, [])

  function clearPhoto() {
    selectionId.current += 1

    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current)
      previewRef.current = null
    }

    setPhoto(null)
    setPreviewUrl(null)
    setPhotoError(null)
    setPhotoInfo(null)
    setCompressing(false)
  }

  async function handleFile(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    clearPhoto()

    const currentSelection = selectionId.current

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setPhotoError(
        'Format gambar tidak disokong. Sila guna JPG, PNG atau WEBP.'
      )
      return
    }

    if (file.size > MAX_IMAGE_BYTES) {
      setPhotoError(
        'Saiz gambar asal melebihi 10MB. Sila pilih gambar lain.'
      )
      return
    }

    setCompressing(true)

    try {
      const compressedFile = await compressImage(file)

      if (currentSelection !== selectionId.current) {
        return
      }

      if (compressedFile.size > MAX_IMAGE_BYTES) {
        setPhotoError(
          'Gambar masih melebihi had 10MB.'
        )
        return
      }

      const newPreviewUrl = URL.createObjectURL(
        compressedFile
      )

      previewRef.current = newPreviewUrl

      setPhoto(compressedFile)
      setPreviewUrl(newPreviewUrl)
      setPhotoError(null)

      const originalKB = Math.round(file.size / 1024)
      const finalKB = Math.round(
        compressedFile.size / 1024
      )

      if (compressedFile.size < file.size) {
        setPhotoInfo(
          `Gambar berjaya dikecilkan: ${originalKB} KB → ${finalKB} KB`
        )
      } else {
        setPhotoInfo(
          `Gambar sedia untuk dihantar: ${finalKB} KB`
        )
      }
    } catch {
      if (currentSelection !== selectionId.current) {
        return
      }

      const newPreviewUrl = URL.createObjectURL(file)

      previewRef.current = newPreviewUrl

      setPhoto(file)
      setPreviewUrl(newPreviewUrl)
      setPhotoInfo(
        'Gambar asal akan digunakan kerana compression tidak berjaya.'
      )
    } finally {
      if (currentSelection === selectionId.current) {
        setCompressing(false)
      }
    }
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    if (busy) return

    const formData = new FormData(event.currentTarget)

    if (photo) {
      formData.set('photo', photo)
    }

    startTransition(() => {
      dispatch(formData)
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="guest_name"
          className="text-sm font-semibold text-[#064735]"
        >
          Nama Anda{' '}
          <span className="text-[#B88C43]">*</span>
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
          aria-describedby={
            errors.guest_name
              ? 'guest_name-error'
              : undefined
          }
          className={cn(fieldClass, 'h-12')}
        />

        <FieldError
          id="guest_name-error"
          message={errors.guest_name}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="relationship"
          className="text-sm font-semibold text-[#064735]"
        >
          Hubungan dengan Pengantin{' '}
          <span className="text-[#B88C43]">*</span>
        </label>

        <div className="relative">
          <select
            id="relationship"
            name="relationship"
            required
            defaultValue=""
            aria-invalid={!!errors.relationship}
            aria-describedby={
              errors.relationship
                ? 'relationship-error'
                : undefined
            }
            className={cn(
              fieldClass,
              'h-12 appearance-none pr-10 invalid:text-[#648276]'
            )}
          >
            <option value="" disabled>
              Pilih hubungan
            </option>

            {RELATIONSHIPS.map((relationship) => (
              <option
                key={relationship}
                value={relationship}
                className="text-[#064735]"
              >
                {relationship}
              </option>
            ))}
          </select>

          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#648276]"
            aria-hidden="true"
          />
        </div>

        <FieldError
          id="relationship-error"
          message={errors.relationship}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="doa"
          className="text-sm font-semibold text-[#064735]"
        >
          Doa &amp; Ucapan{' '}
          <span className="text-[#B88C43]">*</span>
        </label>

        <textarea
          id="doa"
          name="doa"
          required
          rows={5}
          maxLength={DOA_MAX}
          placeholder="Tulis doa dan ucapan anda di sini..."
          onChange={(event) => {
            setDoaLength(event.target.value.length)
          }}
          aria-invalid={!!errors.doa}
          aria-describedby={
            errors.doa
              ? 'doa-error doa-count'
              : 'doa-count'
          }
          className={cn(
            fieldClass,
            'resize-none py-3 leading-relaxed'
          )}
        />

        <div className="flex items-start justify-between gap-3">
          <FieldError
            id="doa-error"
            message={errors.doa}
          />

          <span
            id="doa-count"
            className="ml-auto text-xs tabular-nums text-[#648276]"
          >
            {doaLength}/{DOA_MAX}
          </span>
        </div>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-semibold text-[#064735]">
          Upload Gambar{' '}
          <span className="font-normal text-[#648276]">
            (Pilihan)
          </span>
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

        {compressing && (
          <div
            role="status"
            className="flex items-center gap-3 rounded-2xl border border-[#D5A64F]/60 bg-white px-4 py-4 text-sm text-[#064735]"
          >
            <Loader2
              className="size-5 animate-spin"
              aria-hidden="true"
            />
            Sedang memproses gambar...
          </div>
        )}

        {previewUrl ? (
          <div className="relative overflow-hidden rounded-2xl border border-[#D5A64F]/60 bg-white p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Pratonton gambar yang dipilih"
              className="max-h-80 w-full rounded-xl object-cover"
            />

            <button
              type="button"
              onClick={clearPhoto}
              disabled={pending}
              className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full bg-[#064735]/90 text-white backdrop-blur transition hover:bg-[#003D2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A64F] disabled:opacity-50"
            >
              <X
                className="size-4"
                aria-hidden="true"
              />
              <span className="sr-only">
                Buang gambar
              </span>
            </button>

            <p className="truncate px-1 pt-2 text-xs text-[#648276]">
              {photo?.name}
            </p>
          </div>
        ) : !compressing ? (
          <div className="grid grid-cols-2 gap-3">
            <UploadButton
              icon={Camera}
              label="Ambil Gambar"
              hint="Guna kamera"
              onClick={() => {
                cameraInput.current?.click()
              }}
            />

            <UploadButton
              icon={ImageIcon}
              label="Pilih Gambar"
              hint="Dari galeri"
              onClick={() => {
                galleryInput.current?.click()
              }}
            />
          </div>
        ) : null}

        <p className="text-xs text-[#648276]">
          Format: JPG, PNG atau WEBP. Saiz asal maksimum
          10MB. Gambar akan dikecilkan secara automatik
          jika boleh.
        </p>

        {photoInfo && (
          <p
            role="status"
            className="rounded-xl bg-[#E8F3EC] px-3 py-2 text-xs font-medium text-[#064735]"
          >
            {photoInfo}
          </p>
        )}

        <FieldError
          id="photo-error"
          message={photoMessage}
        />
      </fieldset>

      {errors.form && (
        <p
          role="alert"
          className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[#D5A64F] bg-gradient-to-b from-[#087153] to-[#004331] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A64F] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {compressing ? (
          <>
            <Loader2
              className="size-5 animate-spin"
              aria-hidden="true"
            />
            Memproses Gambar...
          </>
        ) : pending ? (
          <>
            <Loader2
              className="size-5 animate-spin"
              aria-hidden="true"
            />
            Menghantar...
          </>
        ) : (
          <>
            <Send
              className="size-4"
              aria-hidden="true"
            />
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
  icon: ComponentType<{ className?: string }>
  label: string
  hint: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-[#D5A64F]/75 bg-white/80 px-3 py-5 text-center transition-colors hover:border-[#B88C43] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5A64F]"
    >
      <span className="inline-flex size-11 items-center justify-center rounded-full bg-[#E8D7AF]/50 text-[#064735]">
        <Icon className="size-5" />
      </span>

      <span className="text-sm font-semibold text-[#064735]">
        {label}
      </span>

      <span className="text-xs text-[#648276]">
        {hint}
      </span>
    </button>
  )
}

function FieldError({
  id,
  message,
}: {
  id: string
  message?: string | null
}) {
  if (!message) return null

  return (
    <p
      id={id}
      role="alert"
      className="text-sm text-destructive"
    >
      {message}
    </p>
  )
}
