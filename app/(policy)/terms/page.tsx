import { Metadata } from 'next'
import { PolicyPageLayout, PolicySection, PolicyBoxGrid, PolicyGlassBox, PolicyContactBox, PolicyLegalCompliance } from '@/components/PolicyPageLayout'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Boutallion',
  description: 'Terms and conditions for use of the Boutallion website and services.',
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <>
      <PolicyPageLayout
        title="Terms & Conditions"
        subtitle="Governed by Applicable Law"
        icon="scales"
      >
        <PolicySection number={1} title="Acceptance of Terms" icon="shield">
          <PolicyGlassBox className=" mb-4">
            <p>
              By accessing or using the Boutallion website, social media channels, digital content, or any services provided by Boutallion, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
            <p className="mt-3">
              These Terms and Conditions apply to all users, clients, visitors, and participants engaging with Boutallion in any form.
            </p>
            <p className="mt-3">
              All activities and interactions are governed by applicable law, and any disputes arising from them fall under the exclusive jurisdiction of the courts in the jurisdiction in which Boutallion operates.
            </p>
          </PolicyGlassBox>
          <PolicyBoxGrid items={[
            { label: 'Website Access' },
            { label: 'Intellectual Property' },
            { label: 'Request Access' },
            { label: 'Data Protection' },
          ]} />
        </PolicySection>

        <PolicySection number={2} title="Copyright and Intellectual Property" icon="shield">
          <PolicyGlassBox className="">
            <p>
            All content on this website—including but not limited to text, images, photographs, graphics, logos, designs, videos, typography, layouts, and any other materials—is the exclusive property of Boutallion and is protected by copyright, trademark, and other intellectual property laws. All rights are reserved.
          </p>
          <p>
            No content may be copied, reproduced, distributed, republished, uploaded, posted, transmitted, modified, or used in any form or by any means—whether electronic, mechanical, or otherwise—without prior written permission from Boutallion. Unauthorised use, reproduction, or distribution of any content may result in legal action.
          </p>
          <p>
            For permission to use any content, please contact us at{' '}
            <a href="mailto:info@boutallion.com" className="text-gold-DEFAULT hover:text-gold-light underline underline-offset-2 transition-colors">
              info@boutallion.com
            </a>.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={3} title="Permitted Use" icon="lock">
          <PolicyGlassBox className="">
            <p>
              This website is intended for personal, non-commercial use only. You may view content for your own personal use but must not download, copy, store, distribute, or transmit any material without written authorisation from Boutallion. All materials remain the property of Boutallion at all times.
            </p>
            <p className="mt-3">
              You agree not to use this website for any unlawful purpose or in any way that could damage, disable, or impair the website or interfere with any other party&apos;s use of the website.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={4} title="Request for Access" icon="crown">
          <PolicyGlassBox className="">
            <p>
              Certain areas of the Boutallion experience are available by invitation only. Submitting a request for access does not guarantee access. We reserve the right to accept or decline requests at our sole discretion, without providing reasons. Access, if granted, may be withdrawn at any time.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={5} title="Data Protection and GDPR" icon="shield">
          <PolicyGlassBox className="">
            <p>
              Our processing of personal data is governed by our Privacy Policy and complies with the EU General Data Protection Regulation (GDPR) and applicable data protection laws. By using this website, you acknowledge that you have read and understood our Privacy Policy and consent to the processing of your personal data as described therein.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={6} title="Limitation of Liability" icon="shield">
          <PolicyGlassBox className="">
            <p>
              To the fullest extent permitted by law, Boutallion shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or in connection with your use of this website. Our total liability shall not exceed the amount you have paid to us, if any, in the twelve months preceding the claim.
            </p>
            <p className="mt-3">
              Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded or limited under applicable law.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={7} title="Disclaimer" icon="file">
          <PolicyGlassBox className="">
            <p>
              This website and its content are provided &quot;as is&quot; without warranties of any kind. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={8} title="Governing Law" icon="scales">
          <PolicyGlassBox className="">
            <p>
              These Terms are governed by the laws of the jurisdiction in which Boutallion operates. Any disputes shall be subject to the exclusive jurisdiction of the courts of that jurisdiction. For users in the European Union, your statutory rights under applicable consumer protection laws remain unaffected.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={9} title="Severability" icon="file">
          <PolicyGlassBox className="">
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
            </p>
          </PolicyGlassBox>
        </PolicySection>

        <PolicySection number={10} title="Contact Us & Legal Enquiries" icon="shield">
          <PolicyContactBox
            intro="For questions regarding these Terms and Conditions or legal enquiries, please contact us:"
            email="info@boutallion.com"
            privacyPolicyHref="/privacy-policy"
          />
        </PolicySection>

        <PolicySection number={11} title="Legal Compliance" icon="shield">
          <PolicyLegalCompliance
            lastUpdated="February 8, 2026"
            effectiveDate="February 8, 2026"
            version="2.0"
            commitmentText="Boutallion is committed to transparency and full compliance with all applicable laws, regulations, and jurisdiction-specific requirements."
            frameworks={[
              'GDPR: EU General Data Protection Regulation (EU) 2016/679',
              'EU Consumer Rights Directive and applicable consumer protection laws',
              'Electronic Commerce Directive 2000/31/EC',
              'UAE Federal Law: Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data',
              'Jurisdiction-specific commercial and contract law',
            ]}
          />
        </PolicySection>
      </PolicyPageLayout>
      <Footer />
    </>
  )
}
