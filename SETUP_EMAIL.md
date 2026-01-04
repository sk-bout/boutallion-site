# Email Setup Guide for Boutallion

## Quick Setup: Email Backup to boutallion.ae@gmail.com

Since you have Resend.com open, we'll use Resend to send all form submissions to `boutallion.ae@gmail.com`.

### Step 1: Get Your Resend API Key

1. In Resend.com, you should see your API key (it starts with `re_`)
2. Copy the API key (in the image it shows: `re_FCkjusd7_8NjpzysFtE676i81kBJhscve`)

### Step 2: Add API Key to Vercel

1. Go to your Vercel project dashboard
2. Click on **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key (e.g., `re_FCkjusd7_8NjpzysFtE676i81kBJhscve`)
   - **Environment:** Select all (Production, Preview, Development)
4. Click **Save**

### Step 3: Add From Email Address (Optional but Recommended)

1. In the same Environment Variables section, add:
   - **Name:** `RESEND_FROM_EMAIL`
   - **Value:** `noreply@boutallion.com` or your verified domain email
   - **Environment:** Select all
2. Click **Save**

### Step 4: Redeploy

After adding the environment variables:
1. Go to **Deployments** tab in Vercel
2. Click the **⋯** menu on the latest deployment
3. Click **Redeploy**

### Step 5: Verify Domain in Resend (Important!)

1. Go to Resend.com → **Domains**
2. Add your domain `boutallion.com` (or use `resend.dev` for testing)
3. Follow the DNS setup instructions
4. Once verified, you can use emails from your domain

### Testing

After setup, every form submission will:
1. ✅ Try to send to MailerLite (if configured)
2. ✅ **ALWAYS send a backup email to `boutallion.ae@gmail.com`**
3. ✅ Save to database (if configured)

You'll receive an email at `boutallion.ae@gmail.com` for every form submission with all the details!

---

## Alternative: MailerLite Setup (Optional)

If you want to also use MailerLite:

### Option A: MailerLite Form URL (Easiest)
1. Go to MailerLite dashboard
2. Create a form
3. Get the form action URL
4. Add to Vercel as `MAILERLITE_FORM_URL`

### Option B: MailerLite API
1. Get your MailerLite API key
2. Get your Group/List ID
3. Add to Vercel:
   - `MAILERLITE_API_KEY`
   - `MAILERLITE_GROUP_ID`

---

## Troubleshooting

**No emails received?**
- Check Vercel logs for errors
- Verify `RESEND_API_KEY` is set correctly
- Check spam folder
- Make sure domain is verified in Resend

**Need help?**
- Check Vercel function logs: Deployments → Latest → Functions → `/api/subscribe`
- Look for `📧` or `❌` messages in logs

