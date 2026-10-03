import { cn } from '@/lib/utils'

export function PaperPlane({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 72" className={cn('overflow-visible', className)} fill="none">
      <path
        d="M4 66 C 22 58, 30 40, 48 44 C 62 47, 58 62, 46 58 C 36 55, 50 32, 80 26"
        stroke="var(--wedding-gold)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="2 5"
      />
      <path d="M116 8 L78 24 L92 30 Z" fill="var(--wedding-white)" stroke="var(--wedding-navy)" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M116 8 L92 30 L98 44 Z" fill="var(--wedding-royal)" stroke="var(--wedding-navy)" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M92 30 L98 44 L101 33 Z" fill="var(--wedding-navy)" stroke="var(--wedding-navy)" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}

export function Sparkle({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={cn('text-gold', className)} style={style} fill="currentColor">
      <path d="M10 0 C 10.8 6.5, 13.5 9.2, 20 10 C 13.5 10.8, 10.8 13.5, 10 20 C 9.2 13.5, 6.5 10.8, 0 10 C 6.5 9.2, 9.2 6.5, 10 0 Z" />
    </svg>
  )
}

export function BotanicalCorner({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 110 110" className={cn('text-gold', className)} fill="none">
      <path d="M2 2 C 20 30, 40 58, 92 104" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M30 40 C 40 34, 50 34, 58 38" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <g fill="currentColor" fillOpacity="0.32">
        <path d="M14 20 C 4 22, 0 32, 6 38 C 14 34, 18 26, 14 20 Z" />
        <path d="M22 18 C 26 8, 36 6, 40 12 C 36 20, 28 22, 22 18 Z" />
        <path d="M34 48 C 22 50, 18 62, 26 68 C 34 62, 38 54, 34 48 Z" />
        <path d="M44 42 C 50 32, 62 32, 64 40 C 58 46, 50 48, 44 42 Z" />
        <path d="M58 72 C 48 76, 46 88, 54 92 C 62 86, 64 78, 58 72 Z" />
        <path d="M68 66 C 76 58, 88 60, 88 68 C 82 72, 74 72, 68 66 Z" />
      </g>
      <g fill="currentColor">
        <circle cx="58" cy="38" r="2.4" />
        <circle cx="64" cy="34" r="1.5" fillOpacity="0.7" />
        <circle cx="92" cy="104" r="2.2" />
      </g>
    </svg>
  )
}
