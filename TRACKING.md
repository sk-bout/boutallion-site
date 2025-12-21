# Analytics Tracking System

## Overview

A comprehensive, hidden tracking system that monitors user behavior, subscriptions, and engagement metrics without interrupting the user experience.

## Tracked Data

### 1. **Subscription Tracking** 📧
- Email address (hashed for privacy)
- Time to subscribe (seconds from page load)
- Pages viewed before subscription
- Scroll depth before subscription
- Entry point (direct, search, social, referral, email)
- Device type, browser, OS
- IP address (server-side)
- Referrer URL
- Search query (if from search engine)
- Campaign parameters (UTM tags)

### 2. **Session Tracking** 🕐
- Session ID (unique per visit)
- Session start/end times
- Total time on site
- Pages viewed per session
- Last activity timestamp
- Session duration

### 3. **User Behavior** 👆
- Click events (element, link text, link URL)
- Scroll depth (25%, 50%, 75%, 90%, 100%)
- Maximum scroll depth reached
- Time on each page
- Navigation patterns

### 4. **Entry & Exit Tracking** 🚪
- Entry point detection:
  - Direct (typed URL)
  - Search engine (with query)
  - Social media
  - Referral site
  - Email link
  - Campaign (UTM parameters)
- Exit intent (mouse leaving viewport)
- Exit page
- Time on page before exit

### 5. **Sharing Tracking** 📤
- Share method (native share, social buttons)
- Shared URL
- Share title
- Timestamp

### 6. **Technical Data** 💻
- IP address (server-side only)
- User agent (browser & OS)
- Screen resolution
- Viewport size
- Device type (desktop, mobile, tablet)
- Browser type
- Operating system
- Language
- Timezone

### 7. **Geographic Data** 🌍
- Country (from IP - can be added with GeoIP service)
- City (from IP - can be added with GeoIP service)
- Region (from IP - can be added with GeoIP service)

## How It Works

### Client-Side Tracking
- Automatically initializes on page load
- Tracks all user interactions
- Sends data to `/api/track` endpoint
- Also sends events to Google Analytics 4

### Server-Side Tracking
- Captures IP address (not available client-side)
- Logs all events with full metadata
- Stores in console (can be integrated with database)

## Integration Points

### 1. Subscription Form
- Tracks when users subscribe
- Captures email + all behavior data
- Logs success/failure

### 2. Page Views
- Automatic tracking on every page
- Tracks route changes
- Monitors navigation patterns

### 3. User Interactions
- Clicks (passive tracking)
- Scrolls (milestone tracking)
- Exit intent
- Share events

## Data Storage

Currently, tracking data is:
1. **Logged to console** (development)
2. **Sent to Google Analytics 4** (GA4 property: G-GVM5GMRFCG)
3. **Available via `/api/track` endpoint**

### To Store in Database

Update `/app/api/track/route.ts` to save data to your preferred storage:

```typescript
// Example: PostgreSQL
await db.query(
  'INSERT INTO tracking_events (data) VALUES ($1)',
  [JSON.stringify(enhancedData)]
)

// Example: MongoDB
await db.collection('tracking').insertOne(enhancedData)

// Example: Send to analytics service
await fetch('https://api.mixpanel.com/track', {
  method: 'POST',
  body: JSON.stringify(enhancedData)
})
```

## Privacy & Compliance

- **Hidden**: No visible tracking UI
- **Non-intrusive**: Doesn't interrupt user experience
- **IP Address**: Only captured server-side
- **Email**: Only tracked when user subscribes
- **GDPR Compliant**: Consider adding consent banner if required

## Accessing Tracking Data

### 1. **Server Logs**
Check your server console for tracking events:
```
📊 Tracking Event: { ... }
📧 Subscription Tracking: { ... }
```

### 2. **Google Analytics 4**
- Go to: https://analytics.google.com
- Property: G-GVM5GMRFCG
- View events in Real-time and Events reports

### 3. **Custom Dashboard** (To Be Built)
You can build a dashboard by:
- Storing data in a database
- Creating an admin API endpoint
- Building a dashboard UI

## Tracked Events

| Event Type | Description | Data Captured |
|------------|-------------|---------------|
| `session_start` | User lands on site | Entry point, referrer, device info |
| `page_view` | User views a page | Page URL, timestamp, session data |
| `subscription` | User subscribes | Email, time to subscribe, behavior |
| `share` | User shares content | Share method, URL, title |
| `exit` | User exits page | Exit type, time on page |
| `click` | User clicks element | Element, link text, link URL |
| `scroll` | User scrolls page | Scroll depth milestone |
| `session_end` | User leaves site | Total time, pages viewed, final scroll |

## Environment Variables

No additional environment variables needed. Tracking works automatically.

## Future Enhancements

1. **Database Integration**: Store all events in PostgreSQL/MongoDB
2. **GeoIP Service**: Add MaxMind GeoIP2 for location data
3. **Analytics Dashboard**: Build admin dashboard to view data
4. **Email Reports**: Daily/weekly summary emails
5. **A/B Testing**: Track conversion variations
6. **Heatmaps**: Visual click/scroll heatmaps
7. **Session Recordings**: Record user sessions (with consent)

## Testing

To test tracking:
1. Open browser console
2. Look for tracking API calls to `/api/track`
3. Check server logs for tracking events
4. Verify Google Analytics events in GA4 dashboard

## Support

All tracking is automatic and hidden. No user interaction required.

