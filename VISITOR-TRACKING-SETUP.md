# Enhanced Visitor Tracking Setup

## New Webhook URL

Add this to your Vercel environment variables:

```
SLACK_VISITOR_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

## Features

### ✅ What You'll Receive in Slack

1. **Device Type** - Mobile, Desktop, Tablet
2. **Source** - Where they came from (Google, Facebook, Direct, etc.)
3. **Session Duration** - How long they've been on the site
4. **IP Address** - Full IP address
5. **Google Maps Location** - Clickable link to their location
6. **Visitor Count** - Total number of visits from this IP
7. **Daily Visitor Alerts** - Automatically flagged if someone visits every day
8. **Unusual Pattern Alerts** - Automatically flagged for:
   - High frequency visits (10+ visits in a day)
   - Very long sessions (2+ hours)
   - Suspicious bot-like behavior (many very short sessions)
   - Rapid returns (multiple visits in short time)

### 📊 Pattern Detection

The system automatically detects and alerts on:

- **📅 Daily Visitors**: Visitors who come on 3+ different days in a week
- **⚠️ High Frequency**: More than 10 visits in a single day
- **⏱️ Long Sessions**: Sessions longer than 2 hours
- **🤖 Suspicious Patterns**: Many very short sessions (bot-like)
- **🔄 Rapid Returns**: Multiple visits within an hour

## Setup Instructions

1. **Add Environment Variable in Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `SLACK_VISITOR_WEBHOOK_URL`
   - Value: `https://hooks.slack.com/services/YOUR/WEBHOOK/URL`
   - Set for: Production, Preview, Development
   - **Redeploy** your site

2. **Database Migration:**
   - The system will automatically add new columns on first run
   - Or manually run: `https://your-site.com/api/init-db`

3. **Test:**
   - Visit your site in an incognito window
   - You should receive a notification in `#comingsoon-visitors` channel

## Notification Format

Each notification includes:

```
🆕 New Visitor on Site

IP Address: 192.168.1.1
Label: None
Location: Dubai, United Arab Emirates
Coordinates: 25.2048, 55.2708
UAE Time: 12/25/2024, 6:30 PM
Device Type: Mobile
Browser: Chrome
OS: iOS
Visit Count: 1
Pages Visited: 1
Session Duration: Just arrived
Source: Direct

📍 View on Google Maps
```

For daily visitors or unusual patterns, you'll see additional alerts:

```
📅 Daily Visitor on Site

⚠️ Pattern Alerts:
📅 Daily Visitor: 5 different days in last week
```

## Troubleshooting

### No notifications?
1. Check `SLACK_VISITOR_WEBHOOK_URL` is set in Vercel
2. Check Vercel function logs for `/api/visitors`
3. Test: `https://your-site.com/api/test-visitor-slack`

### Database errors?
1. Run: `https://your-site.com/api/init-db`
2. Check `DATABASE_URL` is set correctly
3. Verify Supabase connection string includes SSL

