# Environment Variables Setup Guide

## Required Environment Variables for Vercel

Add these in **Vercel Dashboard → Your Project → Settings → Environment Variables**

### 1. Slack Notifications

#### Visitor Tracking (New Channel)
```
SLACK_VISITOR_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```
- **Purpose**: Sends visitor notifications to `#comingsoon-visitors` channel
- **Required**: ✅ Yes (for visitor tracking)
- **Set for**: Production, Preview, Development

#### Subscription Notifications (Existing Channel)
```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SUBSCRIPTION/WEBHOOK/URL
```
- **Purpose**: Sends subscription notifications to your existing channel
- **Required**: ✅ Yes (for subscription notifications)
- **Set for**: Production, Preview, Development

### 2. Database (Supabase)

```
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
```
- **Purpose**: PostgreSQL connection for storing subscriptions and visitor data
- **Required**: ✅ Yes (for data storage)
- **Format**: Your Supabase connection string (must include `?sslmode=require`)
- **Set for**: Production, Preview, Development
- **How to get**: 
  1. Go to Supabase Dashboard → Your Project → Settings → Database
  2. Copy the "Connection string" under "Connection pooling"
  3. Make sure it includes `?sslmode=require` at the end

### 3. MailerLite (Email Subscriptions)

#### Option A: Form URL (Simpler)
```
MAILERLITE_FORM_URL=https://assets.mailerlite.com/jsonp/XXXXXX/forms/XXXXXX/subscribe
```
- **Purpose**: Direct form submission URL (no API key needed)
- **Required**: ⚠️ Optional (if using API method below)
- **How to get**: MailerLite Dashboard → Forms → Your Form → Integration → Direct Form URL

#### Option B: API Method (More Control)
```
MAILERLITE_API_KEY=your_api_key_here
MAILERLITE_GROUP_ID=174295207542523685
```
- **Purpose**: API integration for email subscriptions
- **Required**: ⚠️ Optional (if using Form URL above)
- **How to get**: 
  - API Key: MailerLite Dashboard → Integrations → Developer API → Generate API Key
  - Group ID: MailerLite Dashboard → Subscribers → Groups → Copy the number from URL

### 4. Google Geolocation (Optional - Enhanced Location Data)

```
GOOGLE_GEOLOCATION_API_KEY=your_google_api_key_here
```
- **Purpose**: More accurate IP geolocation (falls back to free service if not set)
- **Required**: ❌ No (optional enhancement)
- **How to get**: Google Cloud Console → APIs & Services → Credentials → Create API Key

### 5. Site Configuration

```
NEXT_PUBLIC_SITE_URL=https://boutallion.com
```
- **Purpose**: Base URL for the site (used in metadata, OG tags, etc.)
- **Required**: ✅ Yes
- **Set for**: Production, Preview, Development
- **Note**: Use `https://` (not `http://`)

### 6. Supabase Public Keys (If using Supabase features)

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```
- **Purpose**: Supabase client-side access (if needed)
- **Required**: ⚠️ Only if using Supabase client features
- **How to get**: Supabase Dashboard → Settings → API

### 7. IndexNow (SEO - Optional)

```
INDEXNOW_KEY=23be64d4f3660aa05ef7a9b9b4e659af
```
- **Purpose**: Search engine indexing
- **Required**: ❌ No (optional SEO feature)

---

## Quick Setup Checklist

### Minimum Required (Site will work):
- [ ] `SLACK_VISITOR_WEBHOOK_URL` - For visitor notifications
- [ ] `SLACK_WEBHOOK_URL` - For subscription notifications
- [ ] `DATABASE_URL` - For storing data
- [ ] `NEXT_PUBLIC_SITE_URL` - Site base URL
- [ ] `MAILERLITE_FORM_URL` OR (`MAILERLITE_API_KEY` + `MAILERLITE_GROUP_ID`) - For email subscriptions

### Recommended (Better features):
- [ ] `GOOGLE_GEOLOCATION_API_KEY` - Better location accuracy

### Optional (Nice to have):
- [ ] `INDEXNOW_KEY` - SEO indexing
- [ ] `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` - If using Supabase client

---

## How to Add in Vercel

1. Go to **Vercel Dashboard** → Your Project
2. Click **Settings** → **Environment Variables**
3. Click **Add New**
4. Enter:
   - **Key**: (e.g., `SLACK_VISITOR_WEBHOOK_URL`)
   - **Value**: (e.g., `https://hooks.slack.com/services/...`)
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**
6. **Redeploy** your site after adding variables

---

## Testing Your Setup

After adding variables and redeploying:

1. **Test Visitor Tracking:**
   ```
   https://your-site.com/api/test-visitor-slack
   ```

2. **Test Database:**
   ```
   https://your-site.com/api/test-db
   ```

3. **Test Subscription:**
   - Visit your site and subscribe with a test email
   - Check Slack for notification
   - Check Supabase database for record

---

## Example .env.local (For Local Development)

Create a `.env.local` file in your project root (don't commit this file):

```bash
# Slack
SLACK_VISITOR_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SUBSCRIPTION/WEBHOOK

# Database
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require

# MailerLite
MAILERLITE_FORM_URL=https://assets.mailerlite.com/jsonp/XXXXXX/forms/XXXXXX/subscribe
# OR
MAILERLITE_API_KEY=your_api_key
MAILERLITE_GROUP_ID=174295207542523685

# Site
NEXT_PUBLIC_SITE_URL=https://boutallion.com

# Optional
GOOGLE_GEOLOCATION_API_KEY=your_google_key
INDEXNOW_KEY=23be64d4f3660aa05ef7a9b9b4e659af
```

---

## Troubleshooting

### Variables not working?
1. Make sure you **redeployed** after adding variables
2. Check variables are set for the correct environment (Production/Preview/Development)
3. Verify no typos in variable names
4. Check Vercel function logs for errors

### Database connection failing?
- Verify `DATABASE_URL` includes `?sslmode=require`
- Check Supabase connection string is correct
- Test connection: `https://your-site.com/api/test-db`

### Slack notifications not working?
- Verify webhook URLs are correct
- Check webhook is active in Slack
- Test: `https://your-site.com/api/test-visitor-slack`

