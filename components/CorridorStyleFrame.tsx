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
  return (
    <div
      className={`relative overflow-hidden flex-shrink-0 ${className}`}
      style={{
        aspectRatio,
        // Solid 3D frame - exact corridor style
        background: `
          linear-gradient(135deg, #052a2f 0%, #031a1d 25%, #041f23 50%, #031a1d 75%, #052a2f 100%),
          repeating-linear-gradient(45deg, #041f23 0px, #041f23 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px),
          radial-gradient(circle at 30% 40%, rgba(212, 197, 160, 0.06) 0%, #041f23 40%),
          radial-gradient(circle at 70% 60%, rgba(212, 197, 160, 0.04) 0%, #041f23 40%)
        `,
        backgroundColor: '#031a1d',
        boxShadow: `
          inset 0 0 0 3px rgba(212, 197, 160, 0.25),
          inset 0 6px 12px rgba(0, 0, 0, 0.6),
          inset 0 -6px 12px rgba(0, 0, 0, 0.5),
          inset 8px 0 16px rgba(0, 0, 0, 0.4),
          inset -8px 0 16px rgba(0, 0, 0, 0.4),
          0 12px 32px rgba(0, 0, 0, 0.5),
          0 0 0 1px rgba(0, 0, 0, 0.4),
          0 0 40px rgba(0, 0, 0, 0.3)
        `,
        transform: 'translate3d(0, 0, 0) perspective(1000px) rotateX(0deg)',
        position: 'relative',
        ...style,
      }}
    >
      {/* Fluted column effect on left side */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10"
        style={{
          width: '16px',
          background: `
            repeating-linear-gradient(
              90deg,
              #041f23 0px,
              #041f23 8px,
              #021214 8px,
              #021214 12px
            )
          `,
          boxShadow: 'inset -4px 0 8px rgba(0, 0, 0, 0.6), 2px 0 6px rgba(0, 0, 0, 0.3)',
        }}
      />
      {/* Fluted column effect on right side */}
      <div
        className="absolute right-0 top-0 bottom-0 z-10"
        style={{
          width: '16px',
          background: `
            repeating-linear-gradient(
              90deg,
              #041f23 0px,
              #041f23 8px,
              #021214 8px,
              #021214 12px
            )
          `,
          boxShadow: 'inset 4px 0 8px rgba(0, 0, 0, 0.6), -2px 0 6px rgba(0, 0, 0, 0.3)',
        }}
      />
      {/* Top molding */}
      <div
        className="absolute top-0 left-0 right-0 h-2 z-10"
        style={{
          background: 'linear-gradient(to bottom, #021214 0%, #041f23 40%, #052a2f 100%)',
          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      />
      <div
        className="absolute top-2 left-0 right-0 h-0.5 z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(212, 197, 160, 0.25) 0%, rgba(212, 197, 160, 0.1) 100%)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.08)',
        }}
      />
      {/* Bottom molding */}
      <div
        className="absolute bottom-2 left-0 right-0 h-0.5 z-10"
        style={{
          background: 'linear-gradient(to top, rgba(212, 197, 160, 0.25) 0%, rgba(212, 197, 160, 0.1) 100%)',
          boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.4), inset 0 -1px 1px rgba(255, 255, 255, 0.08)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-2 z-10"
        style={{
          background: 'linear-gradient(to top, #021214 0%, #041f23 40%, #052a2f 100%)',
          boxShadow: 'inset 0 -2px 4px rgba(0, 0, 0, 0.6), 0 -2px 4px rgba(0, 0, 0, 0.3)',
        }}
      />

      {/* Label overlay (centered, above content) */}
      {label && (
        <div
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <span
            className="font-portrait text-gold text-2xl md:text-3xl tracking-[0.15em] uppercase"
            style={{
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5), 0 -1px 1px rgba(255, 255, 255, 0.1)',
            }}
          >
            {label}
          </span>
        </div>
      )}

      {/* Recessed content panel */}
      <div
        className="relative w-full h-full"
        style={{
          margin: '10px 16px 6px 16px',
          boxShadow: `
            inset 0 0 0 3px rgba(212, 197, 160, 0.2),
            inset 0 6px 12px rgba(0, 0, 0, 0.55),
            inset 0 -6px 12px rgba(0, 0, 0, 0.45),
            inset 8px 0 16px rgba(0, 0, 0, 0.4),
            inset -8px 0 16px rgba(0, 0, 0, 0.4),
            0 12px 32px rgba(0, 0, 0, 0.45),
            0 0 0 1px rgba(0, 0, 0, 0.35)
          `,
          background: '#031a1d',
          border: '1px solid rgba(212, 197, 160, 0.15)',
        }}
      >
        {children ?? (showPlaceholder && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: 'linear-gradient(to bottom, #052a2f 0%, #031a1d 40%, #031a1d 100%)',
            }}
          >
            <span
              className="font-refined text-white/25 text-xs tracking-[0.3em] uppercase"
            >
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
