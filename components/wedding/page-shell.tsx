import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PageShell({
  children,
  showBack = false,
  wide = false,
}: {
  children: React.ReactNode
  showBack?: boolean
  wide?: boolean
}) {
  return (
    <div className="relative min-h-dvh bg-pattern">
      {showBack && (
        <header className="sticky top-0 z-20 border-b border-border/60 bg-cream/85 backdrop-blur-md">
          <div className={cn('mx-auto flex h-14 items-center justify-between px-4', wide ? 'max-w-6xl' : 'max-w-md')}>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-sm text-navy/80 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Utama
            </Link>
            <span className="font-serif text-xl font-semibold tracking-wide text-navy">
              A <span className="text-gold">&amp;</span> A
            </span>
            <span className="w-16" aria-hidden="true" />
          </div>
        </header>
      )}
      <main className={cn('mx-auto px-5 pb-16', wide ? 'max-w-6xl' : 'max-w-md')}>{children}</main>
      <footer className="pb-8 text-center text-xs tracking-widest text-navy/50 uppercase">
        #AnisAizieyBahagia
      </footer>
    </div>
  )
}
