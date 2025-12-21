'use client'

import { useState } from 'react'

export default function DebugVisitorsPage() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)

  const runDiagnostics = async () => {
    setLoading(true)
    setResults(null)
    setTestResult(null)

    try {
      // Test 1: Check visitor tracking setup
      const trackingResponse = await fetch('/api/test-visitor-tracking')
      const trackingData = await trackingResponse.json()
      
      // Test 2: Test Slack notification
      const slackResponse = await fetch('/api/test-visitor-slack')
      const slackData = await slackResponse.json()

      setResults({
        tracking: trackingData,
        slack: slackData,
      })
    } catch (error) {
      setResults({
        error: error instanceof Error ? error.message : String(error),
      })
    } finally {
      setLoading(false)
    }
  }

  const testManualVisitor = async () => {
    setLoading(true)
    setTestResult(null)

    try {
      const response = await fetch('/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: `test-${Date.now()}`,
          pageUrl: window.location.href,
          userAgent: navigator.userAgent,
          referer: document.referrer,
        }),
      })

      const data = await response.json()
      setTestResult({
        success: response.ok,
        status: response.status,
        data,
      })
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : String(error),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <h1>🔍 Slack Visitor Notification Debugger</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={runDiagnostics}
          disabled={loading}
          style={{
            padding: '1rem 2rem',
            fontSize: '1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginRight: '1rem',
          }}
        >
          {loading ? 'Running...' : 'Run Full Diagnostics'}
        </button>

        <button
          onClick={testManualVisitor}
          disabled={loading}
          style={{
            padding: '1rem 2rem',
            fontSize: '1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Testing...' : 'Test Manual Visitor Notification'}
        </button>
      </div>

      {results && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Diagnostic Results</h2>
          
          <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
            <h3>📊 Visitor Tracking Setup</h3>
            <pre style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
              {JSON.stringify(results.tracking, null, 2)}
            </pre>
          </div>

          <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
            <h3>📱 Slack Notification Test</h3>
            <pre style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
              {JSON.stringify(results.slack, null, 2)}
            </pre>
          </div>

          {results.tracking?.summary && (
            <div style={{
              padding: '1rem',
              backgroundColor: results.tracking.summary.ready ? '#d4edda' : '#f8d7da',
              borderRadius: '4px',
              border: `1px solid ${results.tracking.summary.ready ? '#c3e6cb' : '#f5c6cb'}`,
            }}>
              <h3>Status Summary</h3>
              <ul>
                <li>Slack Configured: {results.tracking.summary.slackConfigured ? '✅ Yes' : '❌ No'}</li>
                <li>Database Connected: {results.tracking.summary.databaseConnected ? '✅ Yes' : '❌ No'}</li>
                <li>Ready: {results.tracking.summary.ready ? '✅ Yes' : '❌ No'}</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {testResult && (
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <h3>🧪 Manual Visitor Test Result</h3>
          <pre style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(testResult, null, 2)}
          </pre>
          {testResult.success && (
            <p style={{ color: '#28a745', fontWeight: 'bold' }}>
              ✅ Visitor notification should have been sent to Slack! Check your Slack channel.
            </p>
          )}
        </div>
      )}

      <div style={{ marginTop: '3rem', padding: '1rem', backgroundColor: '#e7f3ff', borderRadius: '4px' }}>
        <h3>📋 Quick Checklist</h3>
        <ul>
          <li>✅ Check Vercel Environment Variables: Settings → Environment Variables → SLACK_WEBHOOK_URL</li>
          <li>✅ Verify webhook URL is active in Slack</li>
          <li>✅ Check Vercel Function Logs: Deployments → Latest → Functions → /api/visitors</li>
          <li>✅ Open browser console (F12) and check Network tab for /api/visitors requests</li>
          <li>✅ Visit your site and check if visitor API is called automatically</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
        <h3>🔗 Test Endpoints</h3>
        <ul>
          <li><a href="/api/test-visitor-tracking" target="_blank">/api/test-visitor-tracking</a> - Check setup</li>
          <li><a href="/api/test-visitor-slack" target="_blank">/api/test-visitor-slack</a> - Test Slack webhook</li>
          <li><a href="/api/test-db" target="_blank">/api/test-db</a> - Test database connection</li>
        </ul>
      </div>
    </div>
  )
}

