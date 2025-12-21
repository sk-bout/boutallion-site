# Visitor Tracking Debug Guide

## Issue: Slack Not Receiving Visitor Alerts

### Step 1: Test Slack Webhook
After deployment, visit:
```
https://yourdomain.com/api/test-visitor-slack
```

This will:
- Check if SLACK_WEBHOOK_URL is set
- Send a test notification to Slack
- Show any errors

### Step 2: Test Full Setup
Visit:
```
https://yourdomain.com/api/test-visitor-tracking
```

This checks:
- SLACK_WEBHOOK_URL
- DATABASE_URL
- Database connection
- Visitor count

### Step 3: Check Vercel Function Logs
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click latest deployment → Functions
3. Find `/api/visitors` function
4. Check logs for:
   - `📊 Visitor API called`
   - `📱 ATTEMPTING TO SEND SLACK NOTIFICATION FOR NEW VISITOR`
   - `📱 SLACK_WEBHOOK_URL exists: true/false`
   - Any error messages

### Step 4: Verify Environment Variables
In Vercel → Settings → Environment Variables:
- **SLACK_WEBHOOK_URL**: Must be set
- Value: Your Slack webhook URL (starts with `https://hooks.slack.com/services/...`)
- Enabled for: Production, Preview, Development

### Common Issues:

1. **SLACK_WEBHOOK_URL not set**
   - Add it in Vercel environment variables
   - Redeploy after adding

2. **Visitor treated as returning**
   - New visitors get notifications
   - Returning visitors only get notification on 2nd visit
   - Clear browser cookies/localStorage to test as new visitor

3. **Visitor API not being called**
   - Check browser console for errors
   - Look for: `📊 Calling visitor API from analytics tracker...`
   - AnalyticsTracker component must be in layout

4. **Database connection issues**
   - Check DATABASE_URL is set in Vercel
   - Check database is accessible from Vercel

### Quick Test:
1. Open site in incognito/private window (new visitor)
2. Check browser console for visitor API calls
3. Check Vercel logs for notification attempts
4. Check Slack for notification
