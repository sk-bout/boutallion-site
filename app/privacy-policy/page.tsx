import { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Boutallion',
  description: 'Privacy policy for Boutallion - how we collect, use, and protect your personal information.',
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-boutallion-green">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-24 sm:py-32 pb-32">
        <Link
          href="/"
          className="inline-block font-refined text-white/50 hover:text-white/80 text-sm tracking-wide mb-12 transition-colors"
        >
          ← Return home
        </Link>
        <h1 className="font-portrait text-3xl sm:text-4xl md:text-5xl text-white/95 tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="font-refined text-white/50 text-sm mb-12">
          Last updated: January 2026
        </p>
        <div className="font-refined text-white/75 text-base leading-relaxed space-y-6 select-text">
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">1. Introduction</h2>
            <p>
              Boutallion (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy. This Privacy Policy describes how we collect, use, disclose, and protect your personal information when you visit our website at boutallion.com or request access to our house. We comply with the EU General Data Protection Regulation (GDPR) and applicable data protection laws.
            </p>
            <p>
              Boutallion is the data controller for personal data processed through this website. For the purposes of the GDPR, our contact details are set out in the Contact section below.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">2. Information we collect</h2>
            <p>
              <strong>Information you provide:</strong> When you submit a request for access, contact us, or otherwise interact with our website, we may collect your name, email address, city, country, and any other information you voluntarily provide. We collect this with your consent (GDPR Art. 6(1)(a)) or for the performance of a contract or pre-contractual steps at your request (GDPR Art. 6(1)(b)).
            </p>
            <p>
              <strong>Technical data:</strong> We automatically collect certain technical information when you visit our website, including IP address, browser type and version, device information, referring URL, pages visited, and date and time of access. We process this based on our legitimate interest (GDPR Art. 6(1)(f)) in operating and securing our website, or with your consent where required by law.
            </p>
            <p>
              <strong>Cookies:</strong> We use cookies and similar technologies as described in our Cookie Policy. Please refer to our Cookie Policy for details.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">3. Lawful basis for processing</h2>
            <p>
              We process personal data only where we have a lawful basis under GDPR Art. 6(1): (a) your consent; (b) performance of a contract or pre-contractual steps; (c) compliance with a legal obligation; (d) protection of vital interests; (e) performance of a task carried out in the public interest; or (f) our legitimate interests (e.g. improving our services, fraud prevention, network security), provided your interests or fundamental rights do not override those interests.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">4. How we use your information</h2>
            <p>
              We use your information to: respond to your enquiries; process and manage access requests; improve our website and services; ensure the security of our website; comply with legal obligations; and communicate with you where necessary. We do not sell or share your personal data with third parties for marketing purposes. We may share data with trusted service providers (e.g. hosting, email delivery) who assist our operations under strict data processing agreements (GDPR Art. 28). These processors process data only on our instructions and in accordance with this policy.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">5. International transfers</h2>
            <p>
              Where we transfer personal data outside the European Economic Area (EEA), we ensure appropriate safeguards are in place as required by GDPR Chapter V. This may include: transfers to countries with adequacy decisions; Standard Contractual Clauses approved by the European Commission; or other approved transfer mechanisms. You may request details of the safeguards we use by contacting us.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">6. Data retention</h2>
            <p>
              We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Access request data is typically retained for up to 24 months unless a longer retention period is legally required or you request erasure. Technical logs may be retained for shorter periods. When we no longer need your data, we securely delete or anonymise it.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">7. Data security</h2>
            <p>
              We implement appropriate technical and organisational measures (including encryption, access controls, staff training, and regular security assessments) to protect your personal data against unauthorised access, alteration, disclosure, or destruction, in line with GDPR Art. 32. While we strive to protect your data, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">8. Your rights under GDPR</h2>
            <p>
              You have the right to: <strong>Access</strong> (Art. 15)—obtain confirmation of whether we process your data and a copy of it; <strong>Rectification</strong> (Art. 16)—correct inaccurate data; <strong>Erasure</strong> (Art. 17)—request deletion where applicable; <strong>Restriction</strong> (Art. 18)—limit processing in certain circumstances; <strong>Portability</strong> (Art. 20)—receive your data in a structured, machine-readable format; <strong>Object</strong> (Art. 21)—object to processing based on legitimate interests; <strong>Withdraw consent</strong>—at any time where processing is based on consent; and <strong>Lodge a complaint</strong>—with a supervisory authority in your country of residence (e.g. the Information Commissioner&apos;s Office in the UK, or your national data protection authority).
            </p>
            <p>
              To exercise these rights, please contact us at the address below. We will respond within one month of receiving your request. We may request proof of identity to protect your data. You will not be charged for exercising your rights unless the request is manifestly unfounded or excessive.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">9. Children</h2>
            <p>
              This website is not intended for children under 16. We do not knowingly collect personal data from children under 16. If you believe we have collected data from a child under 16, please contact us immediately and we will take steps to delete such information.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">10. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. The &quot;Last updated&quot; date at the top indicates when the policy was last revised. We encourage you to review this policy periodically. Material changes will be communicated where required by law.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">11. Copyright notice</h2>
            <p>
              All content on this website, including text, images, and design, is the exclusive property of Boutallion and is protected by copyright. No content may be copied, reproduced, distributed, or used without prior written permission from Boutallion.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">12. Contact</h2>
            <p>
              For privacy-related enquiries or to exercise your rights, please contact us at{' '}
              <a href="mailto:info@boutallion.com" className="text-gold-DEFAULT hover:text-gold-light underline underline-offset-2 transition-colors">
                info@boutallion.com
              </a>
              . We will respond to your request without undue delay and in any event within one month.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
