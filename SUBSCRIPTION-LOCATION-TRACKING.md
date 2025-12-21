# Subscription Location Tracking

## Overview

Every email subscription now includes automatic location tracking based on the subscriber's IP address. This allows you to trace back where each subscriber is located.

## What's Tracked

For each subscription, the following location data is captured:

- **Country** (e.g., "United States")
- **Country Code** (e.g., "US")
- **City** (e.g., "New York")
- **Region/State** (e.g., "New York")
- **Timezone** (e.g., "America/New_York")
- **IP Address** (for reference)
- **Formatted Location** (e.g., "New York, New York, United States")

## How It Works

1. **IP Detection**: When a user subscribes, their IP address is captured server-side
2. **Geolocation Lookup**: IP address is sent to ip-api.com (free geolocation service)
3. **Data Storage**: Location data is:
   - Stored in MailerLite custom fields (country, city, region, subscription_location, timezone)
   - Logged to server console with full details
   - Available in tracking system

## Accessing Location Data

### 1. **MailerLite Dashboard**

Location data is automatically added to MailerLite custom fields:
- Go to **Subscribers** → Select a subscriber
- View **Custom Fields** section
- You'll see:
  - `country` - Country name
  - `city` - City name
  - `region` - Region/State
  - `subscription_location` - Full formatted location
  - `timezone` - Timezone

### 2. **Server Logs**

Every subscription logs location data:
```
📍 Subscription: user@example.com | Location: New York, New York, United States | IP: 123.45.67.89 | Country: United States | City: New York
```

Full JSON log:
```json
{
  "email": "user@example.com",
  "ipAddress": "123.45.67.89",
  "location": {
    "country": "United States",
    "countryCode": "US",
    "city": "New York",
    "region": "New York",
    "timezone": "America/New_York",
    "location": "New York, New York, United States"
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### 3. **Database Storage** (To Be Implemented)

To store location data in your database, update `/app/api/subscribe/route.ts`:

```typescript
// Example: Store in PostgreSQL
await db.query(
  `INSERT INTO subscriptions (email, ip_address, location_data, created_at)
   VALUES ($1, $2, $3, NOW())`,
  [email, ipAddress, JSON.stringify(locationSummary)]
)
```

## MailerLite Custom Fields Setup

The location data is automatically added to MailerLite custom fields. Make sure these fields exist in your MailerLite account:

1. Go to **Subscribers** → **Fields**
2. Create these custom fields (if they don't exist):
   - `country` (Text)
   - `city` (Text)
   - `region` (Text)
   - `subscription_location` (Text)
   - `timezone` (Text)

Or the system will create them automatically when the first subscription with location data is processed.

## Filtering Subscriptions by Location

### In MailerLite

1. Go to **Subscribers**
2. Use **Filters** → **Custom Fields**
3. Filter by:
   - Country
   - City
   - Region
   - Subscription Location

### Via API

Use the `/api/subscriptions` endpoint (when connected to database):

```bash
# Get all subscriptions from a specific country
POST /api/subscriptions
{
  "country": "United States"
}

# Get subscriptions from a specific city
POST /api/subscriptions
{
  "city": "New York"
}

# Search by email
POST /api/subscriptions
{
  "email": "user@example.com"
}
```

## Exporting Location Data

### From MailerLite

1. Go to **Subscribers**
2. Click **Export**
3. Select custom fields: `country`, `city`, `region`, `subscription_location`
4. Export as CSV/Excel

### From Server Logs

Parse server logs to extract location data:
```bash
# Extract subscription locations from logs
grep "📍 Subscription:" server.log | awk -F'|' '{print $2}' > locations.txt
```

## Geolocation Service

Currently using: **ip-api.com** (free tier)
- 45 requests per minute
- No API key required
- Returns: country, city, region, timezone, coordinates

### Alternative Services

If you need higher limits or more accuracy:

1. **MaxMind GeoIP2** (paid, most accurate)
2. **ipapi.co** (free tier: 1,000 requests/day)
3. **ipgeolocation.io** (free tier: 1,000 requests/month)

To switch services, update `/lib/geolocation.ts`

## Privacy & Compliance

- **IP Address**: Only captured server-side, never exposed to client
- **Location Data**: Based on IP geolocation (city-level accuracy)
- **GDPR**: Consider adding consent notice if required in your jurisdiction
- **Data Storage**: Location data stored in MailerLite and server logs

## Accuracy Notes

- **City-level accuracy**: ~90-95% accurate
- **Country-level accuracy**: ~99% accurate
- **VPN/Proxy**: May show VPN server location instead of actual location
- **Mobile Networks**: May show carrier location instead of user location
- **Corporate Networks**: May show company headquarters location

## Troubleshooting

### Location shows as "Unknown"

Possible causes:
- IP address is localhost/private (development)
- Geolocation service is down
- IP address is invalid

### Location is incorrect

- User may be using VPN/Proxy
- Corporate network may show company location
- Mobile carrier location may differ from actual location

## Example Use Cases

1. **Geographic Segmentation**: Send location-specific campaigns
2. **Analytics**: Understand where your subscribers are located
3. **Compliance**: Track data residency requirements
4. **Personalization**: Customize content based on location
5. **Reporting**: Generate location-based reports

## Next Steps

1. ✅ Location tracking is active
2. ✅ Data stored in MailerLite custom fields
3. ✅ Server logs include location data
4. 🔄 Connect to database for permanent storage (optional)
5. 🔄 Build admin dashboard to view locations (optional)
6. 🔄 Export/CSV functionality (optional)

