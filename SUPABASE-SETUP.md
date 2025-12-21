# Supabase Database Connection Setup

## Get Your Database Connection String

1. Go to your Supabase project: https://supabase.com/dashboard/project/ybouegujnwgidjdeoqjf
2. Click on **Settings** (gear icon) in the left sidebar
3. Click on **Database** in the settings menu
4. Scroll down to **Connection string**
5. Under **Connection pooling**, select **Session mode**
6. Copy the connection string (it will look like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.ybouegujnwgidjdeoqjf.supabase.co:5432/postgres
   ```
7. Replace `[YOUR-PASSWORD]` with your database password (set when you created the project)

## Alternative: Get Password

If you don't remember your database password:
1. Go to **Settings** → **Database**
2. Click **Reset database password**
3. Set a new password
4. Use that password in the connection string

## Add to .env.local

Once you have the connection string, add it to `.env.local`:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.ybouegujnwgidjdeoqjf.supabase.co:5432/postgres
```

## Initialize Database

After adding DATABASE_URL, run:
```bash
curl http://localhost:3000/api/init-db
```

Or it will auto-initialize on first subscription.
