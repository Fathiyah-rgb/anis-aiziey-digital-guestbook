import { cn } from '@/lib/utils'

export function Lantern({ className, stringLength = 30 }: { className?: string; stringLength?: number }) {
  const top = stringLength
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 40 ${top + 58}`}
      className={cn('text-gold', className)}
      fill="none"
    >
      <line x1="20" y1="0" x2="20" y2={top} stroke="currentColor" strokeWidth="1" />
      <circle cx="20" cy={top + 2.5} r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path d={`M16 ${top + 5} L24 ${top + 5} L28 ${top + 11} L12 ${top + 11} Z`} fill="currentColor" />
      <path
        d={`M12 ${top + 11} L9 ${top + 17} L9 ${top + 39} L12 ${top + 45} L28 ${top + 45} L31 ${top + 39} L31 ${top + 17} L28 ${top + 11} Z`}
        fill="var(--wedding-navy)"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d={`M15 ${top + 38} L15 ${top + 24} Q20 ${top + 15} 25 ${top + 24} L25 ${top + 38} Z`}
        fill="currentColor"
        fillOpacity="0.55"
      />
      <path d={`M14 ${top + 45} L26 ${top + 45} L23 ${top + 50} L17 ${top + 50} Z`} fill="currentColor" />
      <line x1="20" y1={top + 50} x2="20" y2={top + 56} stroke="currentColor" strokeWidth="1.2" />
      <circle cx="20" cy={top + 57} r="1.2" fill="currentColor" />
    </svg>
  )
}

export function StarDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('flex items-center justify-center gap-3 text-gold', className)}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-current" />
      <svg viewBox="0 0 20 20" className="size-3.5" fill="currentColor">
        <rect x="5" y="5" width="10" height="10" />
        <rect x="5" y="5" width="10" height="10" transform="rotate(45 10 10)" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-current" />
    </div>
  )
}

export function FloralSprig({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 60" className={cn('text-gold', className)} fill="none">
      <path d="M4 56 C 30 50, 60 34, 116 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <g fill="currentColor" fillOpacity="0.45">
        <ellipse cx="26" cy="44" rx="9" ry="3.5" transform="rotate(-50 26 44)" />
        <ellipse cx="34" cy="52" rx="9" ry="3.5" transform="rotate(10 34 52)" />
        <ellipse cx="52" cy="34" rx="9" ry="3.5" transform="rotate(-55 52 34)" />
        <ellipse cx="62" cy="40" rx="9" ry="3.5" transform="rotate(5 62 40)" />
        <ellipse cx="80" cy="22" rx="8" ry="3" transform="rotate(-60 80 22)" />
        <ellipse cx="90" cy="26" rx="8" ry="3" transform="rotate(0 90 26)" />
      </g>
      <g fill="currentColor">
        <circle cx="108" cy="10" r="3" />
        <circle cx="100" cy="6" r="2" fillOpacity="0.7" />
        <circle cx="112" cy="18" r="2" fillOpacity="0.7" />
      </g>
    </svg>
  )
}
