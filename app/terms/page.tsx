import { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Boutallion',
  description: 'Terms and conditions for use of the Boutallion website and services.',
  robots: { index: true, follow: true },
}

export default function TermsPage() {
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
          Terms & Conditions
        </h1>
        <p className="font-refined text-white/50 text-sm mb-12">
          Last updated: January 2026
        </p>
        <div className="font-refined text-white/75 text-base leading-relaxed space-y-6 select-text">
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">1. Agreement to terms</h2>
            <p>
              These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the Boutallion website at boutallion.com (&quot;Website&quot;). By accessing or using this Website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use this Website.
            </p>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective upon posting to this page with an updated &quot;Last updated&quot; date. Your continued use of the Website after such changes constitutes acceptance of the revised Terms.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">2. Copyright and intellectual property</h2>
            <p>
              All content on this Website—including but not limited to text, images, photographs, graphics, logos, designs, videos, typography, layouts, and any other materials—is the exclusive property of Boutallion and is protected by copyright, trademark, and other intellectual property laws. All rights are reserved.
            </p>
            <p>
              No content may be copied, reproduced, distributed, republished, uploaded, posted, transmitted, modified, or used in any form or by any means—whether electronic, mechanical, or otherwise—without prior written permission from Boutallion. Unauthorised use, reproduction, or distribution of any content may result in legal action.
            </p>
            <p>
              For permission to use any content, please contact us at{' '}
              <a href="mailto:info@boutallion.com" className="text-gold-DEFAULT hover:text-gold-light underline underline-offset-2 transition-colors">
                info@boutallion.com
              </a>
              .
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">3. Permitted use</h2>
            <p>
              This Website is intended for personal, non-commercial use only. You may view content for your own personal use but must not download, copy, store, distribute, or transmit any material without written authorisation from Boutallion. All materials remain the property of Boutallion at all times.
            </p>
            <p>
              You agree not to use this Website for any unlawful purpose or in any way that could damage, disable, or impair the Website or interfere with any other party&apos;s use of the Website.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">4. Request for access</h2>
            <p>
              Certain areas of the Boutallion experience are available by invitation only. Submitting a request for access does not guarantee access. We reserve the right to accept or decline requests at our sole discretion, without providing reasons. Access, if granted, may be withdrawn at any time.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">5. Data protection and GDPR</h2>
            <p>
              Our processing of personal data is governed by our Privacy Policy and complies with the EU General Data Protection Regulation (GDPR) and applicable data protection laws. By using this Website, you acknowledge that you have read and understood our Privacy Policy and consent to the processing of your personal data as described therein.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">6. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, Boutallion shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or in connection with your use of this Website. This includes, but is not limited to, loss of profits, data, or goodwill. Our total liability shall not exceed the amount you have paid to us, if any, in the twelve months preceding the claim.
            </p>
            <p>
              Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded or limited under applicable law.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">7. Disclaimer</h2>
            <p>
              This Website and its content are provided &quot;as is&quot; without warranties of any kind. We do not warrant that the Website will be uninterrupted, error-free, or free of viruses or other harmful components. We make no representations regarding the accuracy, completeness, or suitability of the content for any particular purpose.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">8. Governing law</h2>
            <p>
              These Terms are governed by the laws of the jurisdiction in which Boutallion operates. Any disputes arising from these Terms or your use of the Website shall be subject to the exclusive jurisdiction of the courts of that jurisdiction. For users in the European Union, your statutory rights under applicable consumer protection laws remain unaffected by these Terms.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">9. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
            </p>
          </section>
          <section>
            <h2 className="text-white/90 text-lg font-medium mb-3">10. Contact</h2>
            <p>
              For questions regarding these Terms and Conditions, please contact us at{' '}
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
