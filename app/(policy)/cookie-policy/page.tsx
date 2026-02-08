import { Metadata } from 'next'
import { PolicyPageLayout, PolicySection, PolicyBoxGrid, PolicyGlassBox, PolicyGlassTable, PolicyContactBox, PolicyLegalCompliance } from '@/components/PolicyPageLayout'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy | Boutallion',
  description: 'Cookie policy for Boutallion - how we use cookies on our website.',
  robots: { index: true, follow: true },
}

export default function CookiePolicyPage() {
  return (
    <>
      <PolicyPageLayout
        title="Cookie Policy"
        subtitle="GDPR & ePrivacy Compliant"
        icon="cookie"
      >
        <PolicySection number={1} title="Introduction" icon="file">
          <PolicyGlassBox className=" mb-4">
            <p>
              This Cookie Policy explains how Boutallion (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) uses cookies and similar technologies when you visit our website at boutallion.com. This policy complies with the EU General Data Protection Regulation (GDPR) and the ePrivacy Directive (2002/58/EC as amended).
            </p>
          </PolicyGlassBox>
          <PolicyGlassBox className="">
            <p>
              Cookies are small text files stored on your device when you visit a website. By continuing to use our website, you consent to our use of cookies in accordance with this policy, except where your consent is required by law for non-essential cookies.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={2} title="What Are Cookies" icon="cookie">
          <PolicyGlassBox className="">
            <p>
              Cookies are small data files placed on your device. We may also use local storage, session storage, and similar technologies. Cookies can be &quot;first-party&quot; (set by us) or &quot;third-party&quot; (set by a different domain).
            </p>
            <p className="mt-3 text-white/70 text-sm">
              <strong>Persistent cookies</strong> remain on your device for a set period. <strong>Session cookies</strong> are deleted when you close your browser.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={3} title="Types of Cookies We Use" icon="shield">
          <p>
            Boutallion uses cookies to ensure a seamless, secure, and personalised experience.
          </p>
          <PolicyBoxGrid items={[
            { label: 'Strictly Necessary' },
            { label: 'Functional' },
            { label: 'Analytics & Performance' },
            { label: 'Your Preferences' },
          ]} />
          <PolicyGlassTable
            title="Essential Cookies We Use:"
            legalBasis="These cookies are strictly necessary for the website to function under GDPR and the ePrivacy Directive. They do not require consent."
            columns={['Cookie Name', 'Purpose', 'Provider', 'Duration']}
            rows={[
              ['cookie_consent', 'Stores your cookie preferences and consent choices', 'Boutallion', '1 year'],
              ['_Secure-next-auth.session-token', 'Session authentication and security', 'Boutallion', 'Session'],
              ['_stripe_mid', 'Fraud prevention and secure payment processing', 'Stripe', '1 year'],
              ['_stripe_sid', 'Fraud prevention for payment security', 'Stripe', '30 minutes'],
              ['CSRF-TOKEN', 'Cross-site request forgery protection', 'Boutallion', 'Session'],
            ]}
          />
          <PolicyGlassBox className=" mt-4">
            <p><strong>Strictly necessary cookies:</strong> Essential for the website to function. We process these based on our legitimate interest (GDPR Art. 6(1)(f)).</p>
            <p className="mt-2"><strong>Functional cookies:</strong> Remember your choices (e.g. preferred language). Based on your consent (GDPR Art. 6(1)(a)).</p>
            <p className="mt-2"><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website. Used only with your consent.</p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={4} title="Lawful Basis and Consent" icon="lock">
          <PolicyGlassBox className="">
            <p>
            Where cookies require consent under GDPR and the ePrivacy Directive, we obtain your explicit consent before placing non-essential cookies. You may withdraw consent at any time through your browser settings or our cookie banner. Withdrawal does not affect the lawfulness of processing before its withdrawal.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={5} title="Cookie Retention" icon="file">
          <PolicyGlassBox className="">
            <p>
              Session cookies are deleted when you close your browser. Persistent cookies remain for a set period, typically no longer than 24 months. You can delete cookies at any time through your browser settings.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={6} title="Managing Cookies" icon="user">
          <PolicyGlassBox className="">
            <p>
              Most web browsers allow you to control cookies through their settings. Disabling certain cookies may affect the functionality and your experience of our website.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={7} title="Your Rights" icon="shield">
          <PolicyGlassBox className="">
            <p>
              Under the GDPR, you have the right to: access data we hold about you; rectify inaccurate data; erase your data where applicable; restrict processing; data portability; object to processing; withdraw consent; and lodge a complaint with a supervisory authority in your country.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={8} title="Copyright Notice" icon="lock">
          <PolicyGlassBox className="">
            <p>
              All content on this website is the exclusive property of Boutallion and is protected by copyright and intellectual property laws. No content may be copied, reproduced, distributed, or used without prior written permission from Boutallion.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={9} title="Changes to This Policy" icon="file">
          <PolicyGlassBox className="">
            <p>
              We may update this Cookie Policy from time to time. The &quot;Last updated&quot; date indicates when the policy was last revised. We encourage you to review this policy periodically.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={10} title="Contact Us & Data Protection Officer" icon="shield">
          <PolicyContactBox
            intro="If you have questions about our use of cookies, this Cookie Policy, or wish to exercise your data protection rights, please contact us:"
            email="info@boutallion.com"
            privacyPolicyHref="/privacy-policy"
          />
        </PolicySection>

        <PolicySection number={11} title="Legal Compliance" icon="shield">
          <PolicyLegalCompliance
            lastUpdated="February 8, 2026"
            effectiveDate="February 8, 2026"
            version="2.0"
          />
        </PolicySection>
      </PolicyPageLayout>
      <Footer />
    </>
  )
}
