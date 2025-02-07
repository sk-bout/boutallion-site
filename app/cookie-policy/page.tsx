import { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy | Boutallion',
  description: 'Cookie policy for Boutallion - how we use cookies on our website.',
  robots: { index: true, follow: true },
}

export default function CookiePolicyPage() {
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
          Cookie Policy
        </h1>
        <p className="font-refined text-white/50 text-sm mb-12">
          Last updated: January 2026
        </p>
        <div className="font-refined text-white/75 text-base leading-relaxed space-y-6 select-text">
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">1. Introduction</h2>
            <p>
              This Cookie Policy explains how Boutallion (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) uses cookies and similar technologies when you visit our website at boutallion.com. This policy complies with the EU General Data Protection Regulation (GDPR) and the ePrivacy Directive (2002/58/EC as amended).
            </p>
            <p>
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners. By continuing to use our website, you consent to our use of cookies in accordance with this policy, except where your consent is required by law for non-essential cookies.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">2. What are cookies and similar technologies</h2>
            <p>
              Cookies are small data files placed on your device. We may also use local storage, session storage, and similar technologies that store data locally on your device. For the purposes of this policy, we refer to all of these as &quot;cookies&quot;. Cookies can be &quot;first-party&quot; (set by us) or &quot;third-party&quot; (set by a different domain).
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">3. Types of cookies we use</h2>
            <p>
              <strong>Strictly necessary cookies:</strong> These cookies are essential for the website to function. They enable core functionality such as security, load balancing, and accessibility. You cannot opt out of these cookies as the website would not function properly without them. We process these based on our legitimate interest (GDPR Art. 6(1)(f)) in providing a working service.
            </p>
            <p>
              <strong>Functional cookies:</strong> These cookies remember your choices (such as your preferred language) and provide enhanced, personalised features. They are based on your consent (GDPR Art. 6(1)(a)).
            </p>
            <p>
              <strong>Analytics and performance cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use this information to improve our website. We use these only with your consent. You may withdraw consent at any time.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">4. Lawful basis and consent</h2>
            <p>
              Where cookies require consent under GDPR and the ePrivacy Directive, we obtain your explicit consent before placing non-essential cookies on your device. You may withdraw your consent at any time by managing your cookie preferences through your browser settings or our cookie banner (where available). Withdrawal of consent does not affect the lawfulness of processing based on consent before its withdrawal.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">5. Cookie retention</h2>
            <p>
              Session cookies are deleted automatically when you close your browser. Persistent cookies remain on your device for a set period or until you delete them. We retain persistent cookies only for as long as necessary to fulfil their purpose, typically no longer than 24 months. You can delete cookies at any time through your browser settings.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">6. Managing cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings. You can typically find these settings in the &quot;Options&quot; or &quot;Preferences&quot; menu of your browser. Please note that disabling certain cookies may affect the functionality of our website and your user experience.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">7. Your rights</h2>
            <p>
              Under the GDPR, you have the right to: access data we hold about you; rectify inaccurate data; erase your data where applicable; restrict processing; data portability; object to processing; withdraw consent at any time; and lodge a complaint with a supervisory authority in your country of residence (e.g. the Information Commissioner&apos;s Office in the UK, or your national data protection authority).
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">8. Copyright notice</h2>
            <p>
              All content on this website, including text, images, designs, and other materials, is the exclusive property of Boutallion and is protected by copyright and other intellectual property laws. No content may be copied, reproduced, distributed, or used in any form without prior written permission from Boutallion.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">9. Changes to this policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. The &quot;Last updated&quot; date at the top of this page indicates when the policy was last revised. We encourage you to review this policy periodically.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">10. Contact</h2>
            <p>
              For questions regarding our use of cookies or to exercise your rights, please contact us at{' '}
              <a href="mailto:info@boutallion.com" className="text-gold-DEFAULT hover:text-gold-light underline underline-offset-2 transition-colors">
                info@boutallion.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
