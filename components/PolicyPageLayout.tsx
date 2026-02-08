'use client'

import Link from 'next/link'
import LabCorridorHeader from '@/components/LabCorridorHeader'

const POLICY_ICONS = {
  scales: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  crown: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  cookie: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 10h.01" />
      <path d="M12 8h.01" />
      <path d="M16 10h.01" />
      <path d="M10 14h.01" />
      <path d="M14 16h.01" />
      <path d="M8 16h.01" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
} as const

type IconName = keyof typeof POLICY_ICONS

interface PolicyPageLayoutProps {
  title: string
  subtitle?: string
  icon?: IconName
  children: React.ReactNode
}

const outerGlassStyle = {
  backgroundColor: 'rgba(5, 42, 47, 0.45)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(212, 197, 160, 0.15)',
  boxShadow: '0 12px 48px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(212, 197, 160, 0.06)',
} as const

export function PolicyPageLayout({ title, subtitle, icon = 'scales', children }: PolicyPageLayoutProps) {
  const IconComponent = POLICY_ICONS[icon]
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#031a1d' }}>
      <LabCorridorHeader />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 pb-40">
        <div
          className="p-8 sm:p-10 md:p-12"
          style={outerGlassStyle}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-refined text-gold-light/70 hover:text-gold-light text-sm tracking-wide mb-10 transition-colors pointer-events-auto"
          >
            ← Return home
          </Link>

          <header className="flex items-start gap-5 mb-14 pb-10 border-b border-gold-DEFAULT/25">
            <div className="flex-shrink-0 text-gold-DEFAULT mt-1 opacity-95">{IconComponent}</div>
            <div>
              <h1 className="font-portrait text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight" style={{ letterSpacing: '-0.02em' }}>
                {title}
              </h1>
              {subtitle && (
                <p className="font-refined text-gold-light/90 text-sm mt-3 tracking-[0.12em] uppercase">
                  {subtitle}
                </p>
              )}
            </div>
          </header>

          <div className="font-refined text-base leading-relaxed space-y-12 select-text">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

interface PolicySectionProps {
  number: number
  title: string
  icon?: IconName
  id?: string
  children: React.ReactNode
}

export function PolicySection({ number, title, icon = 'file', id, children }: PolicySectionProps) {
  const IconComponent = POLICY_ICONS[icon]
  return (
    <section id={id} className="flex gap-5 scroll-mt-32">
      <div className="flex-shrink-0 text-gold-DEFAULT/95 mt-0.5">{IconComponent}</div>
      <div className="flex-1 min-w-0">
        <h2 className="text-gold-light text-xl font-medium mb-5 tracking-wide" style={{ letterSpacing: '0.02em' }}>
          {number}. {title}
        </h2>
        <div className="space-y-4 text-white/85 leading-[1.75]">{children}</div>
      </div>
    </section>
  )
}

interface PolicyBoxGridProps {
  items: { label: string; sectionId?: string }[]
}

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export function PolicyBoxGrid({ items }: PolicyBoxGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
      {items.map((item, i) => {
        const content = (
          <span className="text-center font-refined text-gold-light text-sm tracking-wide block">
            {item.label}
          </span>
        )
        if (item.sectionId) {
          return (
            <button
              key={i}
              type="button"
              onClick={() => scrollToSection(item.sectionId!)}
              className="px-6 py-4 text-left transition-colors hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-gold-DEFAULT/50 focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
              style={glassStyle}
            >
              {content}
            </button>
          )
        }
        return (
          <PolicyGlassBox key={i} className="text-center font-refined text-gold-light text-sm tracking-wide">
            {item.label}
          </PolicyGlassBox>
        )
      })}
    </div>
  )
}

const glassStyle = {
  backgroundColor: 'rgba(5, 42, 47, 0.55)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(212, 197, 160, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(212, 197, 160, 0.08)',
} as const

interface PolicyGlassBoxProps {
  children: React.ReactNode
  className?: string
  title?: string
}

export function PolicyGlassBox({ children, className = '', title }: PolicyGlassBoxProps) {
  return (
    <div
      className={`px-8 py-6 ${className}`}
      style={glassStyle}
    >
      {title && (
        <h3 className="font-refined font-medium text-gold-light/95 text-sm mb-3">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}

interface PolicyGlassTableProps {
  title: string
  legalBasis?: string
  columns: string[]
  rows: string[][]
}

export function PolicyGlassTable({ title, legalBasis, columns, rows }: PolicyGlassTableProps) {
  return (
    <PolicyGlassBox className="mt-4 overflow-x-auto">
      <h3 className="font-refined font-medium text-gold-light/95 text-sm mb-4">
        {title}
      </h3>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gold-DEFAULT/20">
            {columns.map((col, i) => (
              <th key={i} className="py-3 pr-4 font-medium text-gold-light/90">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-white/80">
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5">
              {row.map((cell, j) => (
                <td key={j} className="py-3 pr-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {legalBasis && (
        <p className="text-white/60 text-xs mt-4 pt-3 border-t border-white/5">
          <strong className="text-white/70">Legal Basis:</strong> {legalBasis}
        </p>
      )}
    </PolicyGlassBox>
  )
}

interface PolicyContactBoxProps {
  intro?: string
  email: string
  privacyPolicyHref?: string
}

export function PolicyContactBox({ intro, email, privacyPolicyHref }: PolicyContactBoxProps) {
  return (
    <PolicyGlassBox>
      {intro && (
        <p className="text-white/85 mb-5 text-[15px] leading-relaxed">
          {intro}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-refined font-medium text-gold-light text-sm tracking-[0.15em] uppercase mb-3">
            Data Protection Officer
          </h4>
          <p className="text-white/90 font-refined text-sm mb-1">Boutallion</p>
          <a href={`mailto:${email}`} className="block text-gold-DEFAULT hover:text-gold-light text-sm transition-colors mb-1">
            {email}
          </a>
          <p className="text-white/70 text-xs mt-2">Response time: Within 30 days</p>
        </div>
        <div>
          <h4 className="font-refined font-medium text-gold-light text-sm tracking-[0.15em] uppercase mb-3">
            Business Address
          </h4>
          <p className="text-white/90 text-sm leading-relaxed">
            Boutallion<br />
            Netherlands
          </p>
          {privacyPolicyHref && (
            <Link
              href={privacyPolicyHref}
              className="inline-flex items-center gap-1 mt-4 text-gold-DEFAULT hover:text-gold-light text-sm transition-colors font-refined tracking-wide"
            >
              View Privacy Policy →
            </Link>
          )}
        </div>
      </div>
    </PolicyGlassBox>
  )
}

const COMPLIANCE_FRAMEWORKS = [
  'GDPR: EU General Data Protection Regulation (EU) 2016/679',
  'ePrivacy Directive: Directive 2002/58/EC (as amended by Directive 2009/136/EC)',
  'PECR: Privacy and Electronic Communications Regulations 2003 (UK)',
  'UAE Federal Law: Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data',
  'EU Cookie Directive compliance',
]

interface PolicyLegalComplianceProps {
  lastUpdated: string
  effectiveDate: string
  version: string
  frameworks?: string[]
  commitmentText?: string
}

const DEFAULT_COMMITMENT = 'Boutallion is committed to transparency and full compliance with all applicable data protection, privacy, and electronic communications regulations.'

export function PolicyLegalCompliance({ lastUpdated, effectiveDate, version, frameworks = COMPLIANCE_FRAMEWORKS, commitmentText = DEFAULT_COMMITMENT }: PolicyLegalComplianceProps) {
  return (
    <PolicyGlassBox>
      <h4 className="font-refined font-medium text-gold-light text-sm tracking-[0.15em] uppercase mb-4 flex items-center gap-2">
        <span className="text-gold-DEFAULT">{POLICY_ICONS.shield}</span>
        Legal Compliance & Version Information
      </h4>
      <div className="space-y-1 text-white/85 text-sm mb-4">
        <p><strong className="text-gold-light/90">Last Updated:</strong> {lastUpdated}</p>
        <p><strong className="text-gold-light/90">Effective Date:</strong> {effectiveDate}</p>
        <p><strong className="text-gold-light/90">Version:</strong> {version}</p>
      </div>
      <p className="text-white/70 text-sm mb-2">This policy complies with:</p>
      <ul className="space-y-1.5 text-white/75 text-sm list-disc pl-6">
        {frameworks.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <p className="text-white/60 text-sm mt-5 pt-4 border-t border-white/5 leading-relaxed">
        {commitmentText}
      </p>
    </PolicyGlassBox>
  )
}
