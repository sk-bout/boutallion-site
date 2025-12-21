# Database Setup Guide

## PostgreSQL Integration

This project uses **PostgreSQL** (completely free and open-source) to store subscription and tracking data with location information.

## Free Database Options

### Option 1: Supabase (Recommended - Easiest)
- **Free Tier**: 500MB database, 2GB bandwidth/month
- **Setup**: 
  1. Go to [supabase.com](https://supabase.com)
  2. Create free account
  3. Create new project
  4. Copy connection string from Settings → Database
  5. Add to `.env.local` as `DATABASE_URL`

### Option 2: Railway
- **Free Tier**: $5 credit/month
- **Setup**:
  1. Go to [railway.app](https://railway.app)
  2. Create account
  3. New Project → Add PostgreSQL
  4. Copy connection string
  5. Add to `.env.local` as `DATABASE_URL`

### Option 3: Neon
- **Free Tier**: 0.5GB storage
- **Setup**:
  1. Go to [neon.tech](https://neon.tech)
  2. Create free account
  3. Create project
  4. Copy connection string
  5. Add to `.env.local` as `DATABASE_URL`

### Option 4: Local PostgreSQL
- **Completely Free**: Install PostgreSQL locally
- **Setup**:
  ```bash
  # macOS
  brew install postgresql
  brew services start postgresql
  createdb boutallion
  
  # Then in .env.local:
  DATABASE_URL=postgresql://localhost:5432/boutallion
  ```

## Environment Variables

Add to `.env.local`:

```env
# PostgreSQL Database (choose one format)

# Option 1: Connection String (recommended)
DATABASE_URL=postgresql://user:password@host:port/database

# Option 2: Individual Parameters
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=boutallion
DB_USER=postgres
DB_PASSWORD=your-password

# Google Geolocation API (optional, for enhanced location accuracy)
GOOGLE_GEOLOCATION_API_KEY=your_google_api_key
```

## Initialize Database

After setting up your database, initialize the schema:

### Option 1: Via API Endpoint
```bash
curl http://localhost:3000/api/init-db
```

### Option 2: Automatically on First Request
The database will auto-initialize when first subscription is created.

## What's Stored

### Subscriptions Table
- Email, IP address
- Location: country, city, region, coordinates
- Tracking: user agent, referer, entry point
- Device: browser, OS, device type
- MailerLite: group ID, subscriber ID
- Timestamps

### Tracking Events Table
- Session ID, event type
- Email, IP address, location
- Event data (JSON)
- Page URL, referer, user agent
- Device information
- Timestamps

## Accessing Data

### 1. Admin Dashboard
Visit: `/admin/subscriptions`
- View all subscriptions
- Filter by country, city, email
- See live map with subscription locations
- Export to CSV
- View statistics

### 2. API Endpoints

**Get Subscriptions:**
```bash
GET /api/subscriptions?country=United States&city=New York
```

**Search Subscriptions:**
```bash
POST /api/subscriptions
{
  "country": "United States",
  "city": "New York",
  "startDate": "2024-01-01",
  "endDate": "2024-12-31"
}
```

**Get Map Data:**
```bash
GET /api/subscriptions/map
```

### 3. Direct Database Access

Connect to your PostgreSQL database using any client:
- pgAdmin
- DBeaver
- TablePlus
- psql command line

## Google Maps Integration

### Setup Google Maps API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create project or select existing
3. Enable "Geocoding API"
4. Create API key
5. Add to `.env.local`:
   ```env
   GOOGLE_GEOLOCATION_API_KEY=your_api_key_here
   ```

**Free Tier**: $5 credit/month (first 40,000 requests free)

### Without Google API Key

The system works without Google API key using ip-api.com (free, no limits for reasonable use).

## Live Map

The live map component uses:
- **Leaflet** (free, open-source)
- **OpenStreetMap** (free tiles)
- No API key required for basic map

Access at: `/admin/subscriptions`

## Troubleshooting

### Database Connection Failed

1. Check `DATABASE_URL` in `.env.local`
2. Verify database is running
3. Check firewall/network settings
4. For Supabase/Railway: Ensure SSL is enabled

### Tables Not Created

1. Call `/api/init-db` endpoint
2. Check server logs for errors
3. Verify database permissions

### Location Data Missing

1. Check IP geolocation service is working
2. Verify Google API key if using enhanced geolocation
3. Check server logs for geolocation errors

## Next Steps

1. ✅ Set up PostgreSQL database (Supabase recommended)
2. ✅ Add `DATABASE_URL` to `.env.local`
3. ✅ Initialize database: `GET /api/init-db`
4. ✅ Test subscription: Subscribe with test email
5. ✅ View data: Visit `/admin/subscriptions`
6. ✅ (Optional) Add Google API key for enhanced location

## Support

- PostgreSQL Docs: https://www.postgresql.org/docs/
- Supabase Docs: https://supabase.com/docs
- Leaflet Docs: https://leafletjs.com/

