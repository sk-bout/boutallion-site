# 🚀 Supabase Quick Setup Guide

## Your Supabase Project
- **URL**: https://ybouegujnwgidjdeoqjf.supabase.co
- **Publishable Key**: sb_publishable_6LPWYQHCmLK6ghlyf0QKSw_dazZBUlI ✅ (Already added)

## Step 1: Get Database Connection String

1. **Go to Supabase Dashboard:**
   👉 https://supabase.com/dashboard/project/ybouegujnwgidjdeoqjf

2. **Click Settings** (⚙️ gear icon) → **Database**

3. **Scroll to "Connection string" section**

4. **Select "Session mode"** (not Transaction mode)

5. **Copy the connection string** - it looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.ybouegujnwgidjdeoqjf.supabase.co:5432/postgres
   ```

6. **If you don't know your password:**
   - In Database settings, click **"Reset database password"**
   - Set a new password (save it!)
   - Use that password in the connection string

## Step 2: Update .env.local

Open `.env.local` and add/replace these lines:

```env
# PostgreSQL Database - Supabase
DATABASE_URL=postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.ybouegujnwgidjdeoqjf.supabase.co:5432/postgres

# Supabase Client
NEXT_PUBLIC_SUPABASE_URL=https://ybouegujnwgidjdeoqjf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_6LPWYQHCmLK6ghlyf0QKSw_dazZBUlI
```

**Important:** Replace `YOUR_ACTUAL_PASSWORD` with your actual Supabase database password!

## Step 3: Initialize Database

After updating `.env.local`:

1. **Restart your Next.js server** (if running):
   ```bash
   # Stop server (Ctrl+C) then:
   npm run dev
   ```

2. **Initialize database schema:**
   ```bash
   curl http://localhost:3000/api/init-db
   ```
   
   Or visit in browser: http://localhost:3000/api/init-db

   You should see: `{"success":true,"message":"Database initialized successfully"}`

## Step 4: Test It!

1. **Subscribe with a test email** on your website
2. **Check Supabase Dashboard:**
   - Go to **Table Editor**
   - You should see `subscriptions` and `tracking_events` tables
   - Your test subscription should appear!

3. **View Admin Dashboard:**
   - Visit: http://localhost:3000/admin/subscriptions
   - You should see your subscription on the map! 🗺️

## ✅ You're Done!

Your database is now connected and ready to track:
- ✅ All subscriptions with locations
- ✅ All tracking events
- ✅ Live map visualization
- ✅ Full admin dashboard

## Troubleshooting

### "Database connection failed"
- Check DATABASE_URL has correct password
- Verify password doesn't have special characters (URL encode if needed)
- Check Supabase project is active

### "Tables not found"
- Run `/api/init-db` endpoint
- Check server logs for errors
- Verify database permissions

### "No data showing"
- Make sure you've subscribed with at least one email
- Check Supabase Table Editor to see if data is there
- Verify location data was captured (check server logs)

## Need Help?

- Supabase Docs: https://supabase.com/docs
- Connection String Help: https://supabase.com/docs/guides/database/connecting-to-postgres

