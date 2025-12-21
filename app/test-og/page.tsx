import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'

export const metadata: Metadata = {
  title: 'OG Image Test - Boutallion',
  description: 'Test page to verify OG image configuration',
  openGraph: {
    title: 'OG Image Test - Boutallion',
    description: 'Test page to verify OG image configuration',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Boutallion - Luxury Abaya Brand',
      },
    ],
  },
}

export default function TestOGPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'
  
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#031a1d',
      color: '#ffffff',
      minHeight: '100vh',
    }}>
      <h1>OG Image Test Page</h1>
      
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#0a2a2d', borderRadius: '8px' }}>
        <h2>Your OG Image Configuration:</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>Site URL:</strong> {siteUrl}</li>
          <li><strong>OG Image URL:</strong> {siteUrl}/og-image.png</li>
          <li><strong>Expected Dimensions:</strong> 1200 x 630 pixels</li>
        </ul>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#0a2a2d', borderRadius: '8px' }}>
        <h2>Test Your OG Image:</h2>
        <ol style={{ lineHeight: '1.8' }}>
          <li>
            <strong>Direct Image Test:</strong>
            <br />
            <a href={`${siteUrl}/og-image.png`} target="_blank" rel="noopener noreferrer" style={{ color: '#4fc3f7' }}>
              {siteUrl}/og-image.png
            </a>
            <br />
            <small>This should open your OG image directly</small>
          </li>
          <li style={{ marginTop: '15px' }}>
            <strong>View Page Source:</strong>
            <br />
            Right-click this page → View Page Source
            <br />
            <small>Look for &lt;meta property="og:image"&gt; tags</small>
          </li>
          <li style={{ marginTop: '15px' }}>
            <strong>Test in WhatsApp:</strong>
            <br />
            Share this URL: <code style={{ backgroundColor: '#1a3a3d', padding: '4px 8px', borderRadius: '4px' }}>{siteUrl}/test-og</code>
            <br />
            <small>Or share your main URL: <code style={{ backgroundColor: '#1a3a3d', padding: '4px 8px', borderRadius: '4px' }}>{siteUrl}</code></small>
          </li>
        </ol>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#0a2a2d', borderRadius: '8px' }}>
        <h2>Alternative Test Tools (if Facebook Debugger is blocked):</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>
            <a href={`https://www.opengraph.xyz/url/${siteUrl}`} target="_blank" rel="noopener noreferrer" style={{ color: '#4fc3f7' }}>
              OpenGraph.xyz
            </a>
          </li>
          <li>
            <a href="https://cards-dev.twitter.com/validator" target="_blank" rel="noopener noreferrer" style={{ color: '#4fc3f7' }}>
              Twitter Card Validator
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/post-inspector/" target="_blank" rel="noopener noreferrer" style={{ color: '#4fc3f7' }}>
              LinkedIn Post Inspector
            </a>
          </li>
        </ul>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#0a2a2d', borderRadius: '8px' }}>
        <h2>API Test Endpoint:</h2>
        <p>Visit: <a href="/api/test-og" style={{ color: '#4fc3f7' }}>/api/test-og</a></p>
        <small>This shows your OG configuration in JSON format</small>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#1a3a3d', borderRadius: '8px', border: '1px solid #2a5a5d' }}>
        <h3>⚠️ If OG Image Still Doesn't Show:</h3>
        <ul style={{ lineHeight: '1.8', fontSize: '14px' }}>
          <li>Wait 5-10 minutes after deployment for CDN to update</li>
          <li>Try sharing with a URL parameter: <code>{siteUrl}?v=2</code></li>
          <li>Clear WhatsApp cache by uninstalling/reinstalling (last resort)</li>
          <li>Check that the image is publicly accessible (no login required)</li>
        </ul>
      </div>
    </div>
  )
}

