# Slack Visitor Notification Debugging Guide

## Problem
Slack notifications are not being sent when new visitors arrive on the site.

## Debugging Steps

### Step 1: Check Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Verify `SLACK_WEBHOOK_URL` is set:
   - ✅ Should be set for **Production**, **Preview**, and **Development**
   - ✅ Format: `https://hooks.slack.com/services/YOUR/WEBHOOK/URL`
   - ❌ Should NOT have quotes around it
   - ❌ Should NOT have trailing spaces

### Step 2: Test Slack Webhook Directly

Use the test endpoint:
```
https://your-site.com/api/test-visitor-slack
```

### Step 3: Check Visitor API is Being Called

1. Open your browser's Developer Console (F12)
2. Go to the **Network** tab
3. Visit your site
4. Look for a request to `/api/visitors`
5. Check:
   - ✅ Request is being made (POST)
   - ✅ Status code is 200
   - ✅ Response contains `success: true`

### Step 4: Check Vercel Function Logs

1. Go to Vercel Dashboard → **Deployments**
2. Click on your latest deployment
3. Go to **Functions** tab
4. Click on `/api/visitors`
5. Check the logs for:
   - `📊 Visitor API called`
   - `📱 ATTEMPTING TO SEND SLACK NOTIFICATION FOR NEW VISITOR`
   - `📱 SLACK_WEBHOOK_URL exists: true/false`
   - `📱 SLACK NOTIFICATION RESULT: ✅ SENT SUCCESSFULLY` or `❌ FAILED`

### Step 5: Test with Manual API Call

Use curl or Postman to test the visitor API:

```bash
curl -X POST https://your-site.com/api/visitors \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test-session-123",
    "pageUrl": "https://boutallion.com/en",
    "userAgent": "Mozilla/5.0 (Test Browser)",
    "referer": "https://google.com"
  }'
```

### Step 6: Check Analytics Tracker is Working

1. Open browser console
2. Look for these logs:
   - `📊 Calling visitor API from analytics tracker...`
   - `📊 Visitor API response: ✅ Success`

### Step 7: Verify Database Connection

Visit:
```
https://your-site.com/api/test-db
```

Should return database connection status.

## Common Issues

### Issue 1: SLACK_WEBHOOK_URL Not Set
**Symptom:** Logs show `SLACK_WEBHOOK_URL exists: false`
**Fix:** Add `SLACK_WEBHOOK_URL` in Vercel environment variables

### Issue 2: Webhook URL Invalid
**Symptom:** Logs show `Slack visitor notification failed: 400`
**Fix:** Verify webhook URL is correct and active in Slack

### Issue 3: Visitor API Not Being Called
**Symptom:** No `/api/visitors` request in Network tab
**Fix:** Check `AnalyticsTracker` component is loaded and `trackPageView()` is called

### Issue 4: Database Error
**Symptom:** Logs show database connection errors
**Fix:** Verify `DATABASE_URL` is set correctly in Vercel

### Issue 5: CORS or Network Error
**Symptom:** Browser console shows CORS or network errors
**Fix:** Check Vercel deployment is live and accessible

## Test Endpoints

### Test Slack Webhook Directly
```
GET /api/test-visitor-slack
```

### Test Full Visitor Tracking
```
GET /api/test-visitor-tracking
```

### Test Database Connection
```
GET /api/test-db
```

## Expected Flow

1. User visits site
2. `AnalyticsTracker` component loads
3. `trackPageView()` is called after 500ms delay
4. `/api/visitors` is called with session data
5. Server extracts IP address from headers
6. Location data is fetched from IP
7. Visitor is saved to database
8. `sendVisitorNotification()` is called
9. Slack webhook receives notification
10. Notification appears in Slack channel

## Debugging Checklist

- [ ] `SLACK_WEBHOOK_URL` is set in Vercel
- [ ] Webhook URL is valid and active
- [ ] `/api/visitors` endpoint is being called
- [ ] Database connection is working
- [ ] Visitor data is being saved to database
- [ ] Slack notification function is being called
- [ ] No errors in Vercel function logs
- [ ] No CORS errors in browser console

