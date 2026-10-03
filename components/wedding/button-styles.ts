import { cn } from '@/lib/utils'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-60'

export function primaryButton(className?: string) {
  return cn(
    base,
    'h-13 px-7 text-base bg-royal text-white shadow-soft hover:bg-royal-hover active:scale-[0.98]',
    className,
  )
}

export function secondaryButton(className?: string) {
  return cn(
    base,
    'h-12 px-6 text-sm border border-navy/15 bg-ivory text-navy hover:border-gold hover:bg-white',
    className,
  )
}

export function textLink(className?: string) {
  return cn(
    'inline-flex items-center gap-1.5 text-sm font-medium text-royal underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal rounded-sm',
    className,
  )
}
