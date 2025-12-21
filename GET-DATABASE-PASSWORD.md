# How to Get Your Supabase Database Password

## Quick Steps:

1. **Go to Supabase Dashboard:**
   https://supabase.com/dashboard/project/ybouegujnwgidjdeoqjf

2. **Navigate to Database Settings:**
   - Click **Settings** (gear icon) in left sidebar
   - Click **Database** in settings menu

3. **Get Connection String:**
   - Scroll to **Connection string** section
   - Under **Connection pooling**, select **Session mode**
   - Copy the connection string

4. **If You Need to Reset Password:**
   - In Database settings, click **Reset database password**
   - Set a new password
   - Use that password in the connection string

5. **Update .env.local:**
   Replace `[YOUR-PASSWORD]` in DATABASE_URL with your actual password

## Connection String Format:
```
postgresql://postgres:YOUR_PASSWORD@db.ybouegujnwgidjdeoqjf.supabase.co:5432/postgres
```

## After Setting DATABASE_URL:

1. Restart your Next.js server
2. Initialize database: `curl http://localhost:3000/api/init-db`
3. Test subscription to verify it's working
