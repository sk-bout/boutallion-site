import { Metadata } from 'next'
import { PolicyPageLayout, PolicySection, PolicyBoxGrid, PolicyGlassBox, PolicyContactBox, PolicyLegalCompliance } from '@/components/PolicyPageLayout'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Boutallion',
  description: 'Privacy policy for Boutallion - how we collect, use, and protect your personal information.',
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PolicyPageLayout
        title="Privacy Policy"
        subtitle="GDPR & Data Protection Compliant"
        icon="shield"
      >
        <PolicySection number={1} title="Introduction" icon="file">
          <PolicyGlassBox className=" mb-4">
            <p>
              Boutallion (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy. This Privacy Policy describes how we collect, use, disclose, and protect your personal information when you visit our website at boutallion.com or request access to our house. We comply with the EU General Data Protection Regulation (GDPR) and applicable data protection laws.
            </p>
            <p className="mt-3">
              Boutallion is the data controller for personal data processed through this website.
            </p>
          </PolicyGlassBox>
          <PolicyBoxGrid items={[
            { label: 'Data We Collect', sectionId: 'data-we-collect' },
            { label: 'How We Use It', sectionId: 'how-we-use-it' },
            { label: 'Your Rights', sectionId: 'your-rights' },
            { label: 'Contact Us', sectionId: 'contact-us' },
          ]} />
        </PolicySection>

        <PolicySection number={2} title="Information We Collect" icon="user" id="data-we-collect">
          <PolicyGlassBox className="">
            <p>
            <strong>Information you provide:</strong> When you submit a request for access, contact us, or interact with our website, we may collect your name, email address, city, country, and any other information you voluntarily provide. We collect this with your consent (GDPR Art. 6(1)(a)) or for performance of a contract (GDPR Art. 6(1)(b)).
          </p>
          <p>
            <strong>Technical data:</strong> We automatically collect certain technical information when you visit, including IP address, browser type, device information, pages visited, and date and time of access. We process this based on our legitimate interest (GDPR Art. 6(1)(f)) or with your consent where required.
          </p>
          <p>
            <strong>Cookies:</strong> We use cookies as described in our Cookie Policy.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={3} title="Lawful Basis for Processing" icon="shield">
          <PolicyGlassBox className="">
            <p>
              We process personal data only where we have a lawful basis under GDPR Art. 6(1): (a) your consent; (b) performance of a contract or pre-contractual steps; (c) compliance with a legal obligation; (d) protection of vital interests; (e) public interest; or (f) our legitimate interests, provided your interests do not override those interests.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={4} title="How We Use Your Information" icon="file" id="how-we-use-it">
          <PolicyGlassBox className="">
            <p>
              We use your information to: respond to your enquiries; process and manage access requests; improve our website and services; ensure security; comply with legal obligations; and communicate with you. We do not sell or share your personal data with third parties for marketing purposes. We may share data with trusted service providers under strict data processing agreements (GDPR Art. 28).
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={5} title="International Transfers" icon="lock">
          <PolicyGlassBox className="">
            <p>
              Where we transfer personal data outside the European Economic Area (EEA), we ensure appropriate safeguards (adequacy decisions, Standard Contractual Clauses, or other approved mechanisms). You may request details by contacting us.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={6} title="Data Retention" icon="file">
          <PolicyGlassBox className="">
            <p>
              We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Access request data is typically retained for up to 24 months. When we no longer need your data, we securely delete or anonymise it.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={7} title="Data Security" icon="shield">
          <PolicyGlassBox className="">
            <p>
              We implement appropriate technical and organisational measures (encryption, access controls, staff training, security assessments) to protect your personal data against unauthorised access, alteration, disclosure, or destruction (GDPR Art. 32). While we strive to protect your data, no method of transmission over the internet is 100% secure.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={8} title="Your Rights Under GDPR" icon="user" id="your-rights">
          <PolicyGlassBox className="">
            <p>
            You have the right to: <strong>Access</strong> (Art. 15)—obtain confirmation and a copy of your data; <strong>Rectification</strong> (Art. 16)—correct inaccurate data; <strong>Erasure</strong> (Art. 17)—request deletion where applicable; <strong>Restriction</strong> (Art. 18)—limit processing; <strong>Portability</strong> (Art. 20)—receive your data in a machine-readable format; <strong>Object</strong> (Art. 21)—object to processing; <strong>Withdraw consent</strong> at any time; and <strong>Lodge a complaint</strong> with a supervisory authority.
          </p>
          <p>
            To exercise these rights, contact us at the address below. We will respond within one month.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={9} title="Children" icon="shield">
          <PolicyGlassBox className="">
            <p>
              This website is not intended for children under 16. We do not knowingly collect personal data from children under 16. If you believe we have collected such data, please contact us immediately and we will delete it.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={10} title="Changes to This Policy" icon="file">
          <PolicyGlassBox className="">
            <p>
              We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date indicates when the policy was last revised. Material changes will be communicated where required by law.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={11} title="Copyright Notice" icon="lock">
          <PolicyGlassBox className="">
            <p>
              All content on this website is the exclusive property of Boutallion and is protected by copyright. No content may be copied, reproduced, distributed, or used without prior written permission from Boutallion.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={12} title="Contact Us & Data Protection Officer" icon="shield" id="contact-us">
          <PolicyContactBox
            intro="For privacy-related enquiries, to exercise your data protection rights, or for any questions about this Privacy Policy, please contact us. We will respond without undue delay and in any event within one month."
            email="info@boutallion.com"
          />
        </PolicySection>

        <PolicySection number={13} title="Legal Compliance" icon="shield">
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
