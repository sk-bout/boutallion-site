'use client'

/**
 * Reusable 3D frame in the exact corridor style.
 * Use for image placeholders, frames, and content panels site-wide.
 * Keeps the luxury boutique aesthetic consistent across all pages.
 *
 * STANDARD: When the user requests "image placeholder", "create image placeholder",
 * or "frame" - use this component for consistency on all pages.
 */
interface CorridorStyleFrameProps {
  /** Prominent label centered over the frame (e.g. "ABOUT US", "OUR STORY") */
  label?: string
  /** Optional frame number badge (bronze plaque style) */
  frameNumber?: number
  /** Content inside the recessed panel (image, video, or custom) */
  children?: React.ReactNode
  /** Optional className for the outer wrapper */
  className?: string
  /** Optional inline styles for the outer wrapper */
  style?: React.CSSProperties
  /** Aspect ratio (default 4/5 for portrait frames) */
  aspectRatio?: string
  /** Text shown in panel when no children (default: "Image placeholder") */
  placeholderText?: string
  /** Whether to show placeholder when no children */
  showPlaceholder?: boolean
}

const FRAME_EDGE = 14
const RECESS_MARGIN = { top: 12, right: 14, bottom: 12, left: 14 }

const BEVEL_GRADIENT = 'linear-gradient(270deg, #062e33 0%, #052a2f 20%, #042329 40%, #041e22 60%, #03191c 80%, #021214 100%)'
const BEVEL_GRADIENT_90 = 'linear-gradient(90deg, #062e33 0%, #052a2f 20%, #042329 40%, #041e22 60%, #03191c 80%, #021214 100%)'
const BEVEL_GRADIENT_TOP = 'linear-gradient(to top, #062e33 0%, #052a2f 20%, #042329 40%, #041e22 60%, #03191c 80%, #021214 100%)'
const BEVEL_GRADIENT_BOTTOM = 'linear-gradient(to bottom, #062e33 0%, #052a2f 20%, #042329 40%, #041e22 60%, #03191c 80%, #021214 100%)'

export default function CorridorStyleFrame({
  label,
  frameNumber,
  children,
  className = '',
  style = {},
  aspectRatio = '4/5',
  placeholderText = 'Image placeholder',
  showPlaceholder = true,
}: CorridorStyleFrameProps) {
  const hasLabel = Boolean(label)
  return (
    <div
      className={`relative overflow-hidden flex-shrink-0 ${className}`}
      style={{
        aspectRatio,
        boxSizing: 'border-box',
        border: '3px solid #052a2f',
        backgroundColor: '#031a1d',
        backgroundImage: 'linear-gradient(135deg, #052a2f 0%, #041f23 50%, #052a2f 100%)',
        boxShadow: `
          inset 0 0 0 3px #0a3a40,
          inset 0 6px 12px #000000,
          inset 0 -6px 12px #000000,
          inset 8px 0 16px #000000,
          inset -8px 0 16px #000000,
          0 12px 32px #000000,
          0 20px 48px #000000
        `,
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      {/* 3D bevel edges: green (inside) → black (outside) on all sides, equal width - exact corridor style */}
      <div className="absolute left-0 top-0 bottom-0 z-10" style={{ width: `${FRAME_EDGE}px`, background: BEVEL_GRADIENT, boxShadow: 'inset -4px 0 10px #000000, 4px 0 10px #000000' }} />
      <div className="absolute right-0 top-0 bottom-0 z-10" style={{ width: `${FRAME_EDGE}px`, background: BEVEL_GRADIENT_90, boxShadow: 'inset 4px 0 10px #000000, -4px 0 10px #000000' }} />
      <div className="absolute top-0 left-0 right-0 z-10" style={{ height: `${FRAME_EDGE}px`, background: BEVEL_GRADIENT_TOP, boxShadow: 'inset 0 4px 10px #000000, 0 5px 12px #000000' }} />
      <div className="absolute bottom-0 left-0 right-0 z-10" style={{ height: `${FRAME_EDGE}px`, background: BEVEL_GRADIENT_BOTTOM, boxShadow: 'inset 0 -4px 10px #000000, 0 -5px 12px #000000' }} />

      {/* Label overlay - smaller text for nicer fit within frame */}
      {label && (
        <div
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <span
            className="font-portrait text-gold tracking-[0.15em] uppercase"
            style={{
              fontSize: 'clamp(0.75rem, 2vw, 1.125rem)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5), 0 -1px 1px rgba(255, 255, 255, 0.1)',
            }}
          >
            {label}
          </span>
        </div>
      )}

      {/* Recessed content panel - lighter for label frames so background shows through */}
      <div
        className="relative w-full h-full"
        style={{
          margin: `${RECESS_MARGIN.top}px ${RECESS_MARGIN.right}px ${RECESS_MARGIN.bottom}px ${RECESS_MARGIN.left}px`,
          boxShadow: hasLabel
            ? 'inset 0 0 0 1px rgba(212, 197, 160, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.2)'
            : `inset 0 0 0 3px #0a3a40, inset 0 6px 12px #000000, inset 0 -6px 12px #000000, inset 8px 0 16px #000000, inset -8px 0 16px #000000`,
          background: hasLabel ? 'transparent' : '#031a1d',
          border: hasLabel ? 'none' : '1px solid #052a2f',
        }}
      >
        {children ?? (showPlaceholder && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: 'linear-gradient(to bottom, #052a2f 0%, #031a1d 40%, #031a1d 100%)',
            }}
          >
            <span className="font-refined text-white/25 text-xs tracking-[0.3em] uppercase">
              {placeholderText}
            </span>
          </div>
        ))}
      </div>

      {/* Frame number badge */}
      {frameNumber != null && (
        <div
          className="absolute top-3 left-3 px-2 py-1 z-20"
          style={{
            background: 'linear-gradient(135deg, #8b6914 0%, #6b4e0a 50%, #8b6914 100%)',
            boxShadow: `
              inset 0 1px 2px rgba(255, 255, 255, 0.2),
              inset 0 -1px 2px rgba(0, 0, 0, 0.4),
              0 2px 4px rgba(0, 0, 0, 0.3),
              0 0 0 1px rgba(0, 0, 0, 0.2)
            `,
            border: '1px solid rgba(212, 197, 160, 0.3)',
          }}
        >
          <span className="font-refined text-gold-light text-xs font-semibold">
            {frameNumber}
          </span>
        </div>
      )}
    </div>
  )
}
