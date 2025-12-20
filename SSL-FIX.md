# SSL Certificate Fix Guide

## Issue
Users are seeing "This Connection Is Not Private" / "This website may be impersonating 'www.boutallion.com'" security warnings.

## Root Cause
This is an SSL/TLS certificate issue on the hosting/server side, not in the code. The website code is secure, but the SSL certificate needs to be properly configured.

## Fix Steps (Vercel/Hosting)

### 1. Add www.boutallion.com to SSL Certificate
**IMPORTANT:** Your SSL certificate currently only covers `boutallion.com`. If users access `www.boutallion.com`, they'll see the security warning.

**Solution:** Add `www.boutallion.com` as a domain in Vercel:
1. Go to your Vercel dashboard
2. Select your project (boutallion-site)
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Add `www.boutallion.com`
6. Wait for SSL certificate to be automatically provisioned (5-10 minutes)

**OR** use the redirect (already implemented in code):
- The middleware now redirects `www.boutallion.com` → `boutallion.com` (301 redirect)
- This ensures all traffic uses the domain with the valid certificate

### 2. Check SSL Certificate in Vercel
1. Go to your Vercel dashboard
2. Select your project (boutallion-site)
3. Go to **Settings** → **SSL Certificates**
4. Verify that:
   - `boutallion.com` shows as "Valid" or "Active"
   - Certificate expiration date is in the future
   - Renewal is set to "Auto"

### 2. Verify DNS Configuration
Ensure your DNS records point to Vercel:
- **A Record** or **CNAME** should point to Vercel's servers
- Check that both `boutallion.com` and `www.boutallion.com` (if used) are configured

### 3. Force SSL Certificate Renewal
In Vercel:
1. Go to **Settings** → **Domains**
2. Remove the domain
3. Re-add the domain
4. Wait for SSL certificate to be automatically provisioned (usually 5-10 minutes)

### 4. Check Certificate Details
Verify the certificate covers:
- `boutallion.com`
- `www.boutallion.com` (if using www subdomain)

### 5. Clear Browser Cache
After fixing on server side:
- Users should clear browser cache
- Try incognito/private mode
- Wait for browser to re-validate certificate

## Code-Side Security (Already Implemented)

✅ **Security Headers Configured:**
- `Strict-Transport-Security` (HSTS) - Forces HTTPS
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Content-Security-Policy` with `upgrade-insecure-requests`
- `Referrer-Policy: strict-origin-when-cross-origin`

✅ **No Mixed Content:**
- All external resources use HTTPS
- CSP policy upgrades insecure requests

## Testing

After fixing on Vercel, test:
1. Visit `https://boutallion.com` - should show secure lock
2. Visit `https://www.boutallion.com` (if using www) - should show secure lock
3. Check SSL certificate: Click lock icon in browser → View certificate
4. Verify certificate is valid and not expired
5. Test on multiple browsers (Chrome, Safari, Firefox)

## Common Issues

1. **Certificate for wrong domain**: Certificate issued for `www.boutallion.com` but accessing `boutallion.com` (or vice versa)
2. **Expired certificate**: Certificate needs renewal
3. **DNS mismatch**: DNS pointing to wrong server
4. **Certificate chain incomplete**: Missing intermediate certificates

## DNS Configuration Troubleshooting

If you're getting errors when adding the CNAME record:

### Option 1: Try Different Format
Some DNS providers require different formats:
- **Subdomain:** `www` (just www, not www.boutallion.com)
- **Type:** `CNAME`
- **Address/Value:** `42efa2b7e47cdddb.vercel-dns-017.com` (no trailing dot)
- **TTL:** 3600 or default

### Option 2: Use A Record Instead (if CNAME doesn't work)
Some DNS providers don't allow CNAME at root. You can:
1. Check Vercel dashboard for A record values
2. Use A record pointing to Vercel's IP addresses

### Option 3: Alternative - Use Vercel's DNS
If your current DNS provider is causing issues:
1. In Vercel, go to **Settings** → **Domains**
2. Click on `www.boutallion.com`
3. Look for option to use Vercel's nameservers
4. Update your domain's nameservers to Vercel's

### Option 4: Keep Redirect Only
If DNS configuration continues to fail:
- The middleware redirect (already implemented) will handle www → non-www
- Users accessing www.boutallion.com will be redirected to boutallion.com
- This works but doesn't provide SSL for www subdomain

## If Issue Persists

1. Contact Vercel support with:
   - Domain name
   - Error screenshots
   - Certificate details from browser
2. Check Vercel status page for SSL issues
3. Verify domain ownership in Vercel dashboard

