# Slack Notification Setup Guide

## Problem
You're only seeing subscriber notifications, not visitor notifications. Also, Supabase isn't tracking subscribers on the live site.

## Solution: Separate Slack Channels

### Step 1: Create Two Slack Channels

1. **Subscriptions Channel** (existing)
   - Keep your current channel for email subscriptions
   - This will continue using `SLACK_WEBHOOK_URL`

2. **Visitors Channel** (new)
   - Create a new channel called `#website-visitors` or `#site-traffic`
   - This will use `SLACK_VISITOR_WEBHOOK_URL`

### Step 2: Create Webhook URLs

1. Go to https://api.slack.com/apps
2. Select your app (or create a new one)
3. Go to **Incoming Webhooks**
4. Activate Incoming Webhooks if not already activated
5. Click **Add New Webhook to Workspace**
6. Select your **Subscriptions channel** → Copy webhook URL → This is `SLACK_WEBHOOK_URL`
7. Click **Add New Webhook to Workspace** again
8. Select your **Visitors channel** → Copy webhook URL → This is `SLACK_VISITOR_WEBHOOK_URL`

### Step 3: Add Environment Variables in Vercel

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add these variables:

```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SUBSCRIPTION/WEBHOOK
SLACK_VISITOR_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/VISITOR/WEBHOOK
```

3. Make sure to set them for:
   - ✅ Production
   - ✅ Preview
   - ✅ Development (optional)

4. **Redeploy** your site after adding the variables

### Step 4: Verify Setup

1. Visit your site in an incognito window
2. You should see a visitor notification in the **Visitors channel**
3. Subscribe with an email
4. You should see a subscription notification in the **Subscriptions channel**

## Supabase Subscription Tracking Fix

The subscription API is trying to save to Supabase, but errors are being caught silently. To fix:

### Check Database Connection

1. Verify `DATABASE_URL` is set in Vercel:
   ```
   DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
   ```

2. Test the connection:
   - Visit: `https://your-site.com/api/test-db`
   - Should return database connection status

3. Check Vercel logs:
   - Go to Vercel Dashboard → Deployments → Latest → Functions → `/api/subscribe`
   - Look for:
     - `✅ Database connection test: OK`
     - `✅ Subscription saved to database successfully!`
   - If you see errors, check the error message

### Common Issues

1. **Database URL not set**: Add `DATABASE_URL` in Vercel environment variables
2. **SSL required**: Make sure your `DATABASE_URL` includes `?sslmode=require`
3. **Table doesn't exist**: The code should auto-create tables, but you can manually initialize:
   - Visit: `https://your-site.com/api/init-db`

## Testing

### Test Visitor Notifications
```
GET https://your-site.com/api/test-visitor-slack
```

### Test Subscription Notifications
Subscribe with a test email on your live site.

### Test Database
```
GET https://your-site.com/api/test-db
```

## Expected Behavior

- **Every new visitor** → Notification in Visitors channel
- **Every subscription** → Notification in Subscriptions channel + saved to Supabase
- **Returning visitors** (same session) → No notification (to avoid spam)

## Troubleshooting

### No visitor notifications?
1. Check `SLACK_VISITOR_WEBHOOK_URL` is set in Vercel
2. Check Vercel function logs for `/api/visitors`
3. Look for: `📱 ATTEMPTING TO SEND SLACK NOTIFICATION FOR NEW VISITOR`

### No subscription notifications?
1. Check `SLACK_WEBHOOK_URL` is set in Vercel
2. Check Vercel function logs for `/api/subscribe`
3. Look for: `✅ Slack notification sent successfully`

### Subscriptions not saving to Supabase?
1. Check `DATABASE_URL` is set correctly
2. Check Vercel logs for database errors
3. Verify table exists: `SELECT * FROM subscriptions LIMIT 1;` in Supabase SQL editor
4. Check connection string format (must include SSL for Supabase)

