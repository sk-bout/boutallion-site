/**
 * PostgreSQL Database Connection
 * Using pg (node-postgres) for PostgreSQL
 * 
 * Free options:
 * - Supabase (free tier: 500MB database, 2GB bandwidth)
 * - Railway (free tier: $5 credit/month)
 * - Neon (free tier: 0.5GB storage)
 * - Local PostgreSQL (completely free)
 */

import { Pool } from 'pg'

// Database connection pool
let pool: Pool | null = null

export function getDbPool(): Pool {
  if (pool) {
    return pool
  }

  // Get database URL from environment variables
  // Format: postgresql://user:password@host:port/database
  // Or use individual connection parameters
  const databaseUrl = process.env.DATABASE_URL || 
    (process.env.DB_HOST ? 
      `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || ''}@${process.env.DB_HOST}:${process.env.DB_PORT || '5432'}/${process.env.DB_NAME || 'boutallion'}` :
      null
    )

  if (!databaseUrl) {
    console.warn('⚠️ DATABASE_URL not found in environment variables')
    if (process.env.NODE_ENV === 'production') {
      throw new Error('DATABASE_URL or DB connection parameters must be set in production')
    }
    // In development, return a mock pool that will fail gracefully
    return null as any
  }

  // Create connection pool
  // Supabase requires SSL for all connections (dev and production)
  const isSupabase = databaseUrl?.includes('supabase.co')
  
  pool = new Pool({
    connectionString: databaseUrl,
    // Connection pool settings
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    // SSL required for Supabase, Railway, and other cloud providers
    ssl: isSupabase || process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  })

  // Handle pool errors
  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err)
  })

  return pool
}

/**
 * Initialize database schema
 * Creates tables if they don't exist
 */
export async function initDatabase(): Promise<void> {
  const db = getDbPool()

  try {
    // Create subscriptions table
    await db.query(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        ip_address VARCHAR(45),
        
        -- Location data
        country VARCHAR(100),
        country_code VARCHAR(2),
        city VARCHAR(100),
        region VARCHAR(100),
        region_code VARCHAR(10),
        timezone VARCHAR(50),
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        location_string TEXT,
        
        -- Tracking data
        user_agent TEXT,
        referer TEXT,
        entry_point VARCHAR(50),
        search_query TEXT,
        campaign_source VARCHAR(100),
        campaign_medium VARCHAR(100),
        campaign_name VARCHAR(100),
        
        -- Device data
        device_type VARCHAR(20),
        browser VARCHAR(50),
        os VARCHAR(50),
        screen_resolution VARCHAR(20),
        
        -- Session data
        session_id VARCHAR(100),
        time_to_subscribe INTEGER, -- seconds
        pages_viewed INTEGER,
        scroll_depth INTEGER,
        
        -- MailerLite data
        mailerlite_subscriber_id VARCHAR(100),
        mailerlite_group_id INTEGER,
        
        -- Timestamps
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create index on email for fast lookups
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email)
    `)

    // Create index on location for geographic queries
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_subscriptions_country ON subscriptions(country)
    `)
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_subscriptions_city ON subscriptions(city)
    `)
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON subscriptions(created_at)
    `)

    // Create visitors table for tracking unique visitors
    await db.query(`
      CREATE TABLE IF NOT EXISTS visitors (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(100) UNIQUE NOT NULL,
        ip_address VARCHAR(45),
        
        -- Location data
        country VARCHAR(100),
        country_code VARCHAR(2),
        city VARCHAR(100),
        region VARCHAR(100),
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        timezone VARCHAR(50),
        
        -- Device data
        device_type VARCHAR(20),
        browser VARCHAR(50),
        os VARCHAR(50),
        screen_resolution VARCHAR(20),
        
        -- Visit tracking
        pages_visited TEXT[], -- Array of page URLs
        visit_count INTEGER DEFAULT 1,
        first_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        uae_time VARCHAR(50), -- Local time in UAE
        
        -- Additional data
        user_agent TEXT,
        referer TEXT,
        entry_point VARCHAR(50),
        
        -- Timestamps
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create indexes for visitors table
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_visitors_session_id ON visitors(session_id)
    `)
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_visitors_ip_address ON visitors(ip_address)
    `)
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_visitors_last_visit ON visitors(last_visit)
    `)

    // Create tracking_events table for all tracking events
    await db.query(`
      CREATE TABLE IF NOT EXISTS tracking_events (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(100) NOT NULL,
        event_type VARCHAR(50) NOT NULL,
        
        -- User data
        email VARCHAR(255),
        ip_address VARCHAR(45),
        
        -- Location data
        country VARCHAR(100),
        city VARCHAR(100),
        region VARCHAR(100),
        location_string TEXT,
        
        -- Event data
        event_data JSONB,
        page_url TEXT,
        referer TEXT,
        user_agent TEXT,
        
        -- Device data
        device_type VARCHAR(20),
        browser VARCHAR(50),
        os VARCHAR(50),
        
        -- Timestamps
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create indexes for tracking events
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_tracking_events_session_id ON tracking_events(session_id)
    `)
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_tracking_events_email ON tracking_events(email)
    `)
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_tracking_events_event_type ON tracking_events(event_type)
    `)
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_tracking_events_created_at ON tracking_events(created_at)
    `)

    console.log('✅ Database schema initialized successfully')
  } catch (error) {
    console.error('❌ Error initializing database:', error)
    // Don't throw in development - allow app to continue
    if (process.env.NODE_ENV === 'production') {
      throw error
    }
  }
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const db = getDbPool()
    await db.query('SELECT NOW()')
    return true
  } catch (error) {
    console.error('Database connection test failed:', error)
    return false
  }
}

