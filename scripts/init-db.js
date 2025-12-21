/**
 * Initialize Database Schema
 * Run this script to set up tables in your Supabase database
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function initDatabase() {
  try {
    console.log('🔄 Connecting to database...');
    
    // Test connection
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful!');
    
    console.log('🔄 Creating tables...');
    
    // Create subscriptions table
    await pool.query(`
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
        time_to_subscribe INTEGER,
        pages_viewed INTEGER,
        scroll_depth INTEGER,
        
        -- MailerLite data
        mailerlite_subscriber_id VARCHAR(100),
        mailerlite_group_id INTEGER,
        
        -- Timestamps
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Subscriptions table created');

    // Create indexes
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_subscriptions_country ON subscriptions(country)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_subscriptions_city ON subscriptions(city)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON subscriptions(created_at)`);
    console.log('✅ Indexes created');

    // Create tracking_events table
    await pool.query(`
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
    `);
    console.log('✅ Tracking events table created');

    // Create indexes for tracking events
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_tracking_events_session_id ON tracking_events(session_id)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_tracking_events_email ON tracking_events(email)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_tracking_events_event_type ON tracking_events(event_type)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_tracking_events_created_at ON tracking_events(created_at)`);
    console.log('✅ Tracking indexes created');

    console.log('\n🎉 Database initialized successfully!');
    console.log('\n📊 Tables created:');
    console.log('   - subscriptions');
    console.log('   - tracking_events');
    console.log('\n✅ You can now:');
    console.log('   1. Test subscription on your website');
    console.log('   2. View data at /admin/subscriptions');
    console.log('   3. Check Supabase Table Editor');
    
    await pool.end();
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    await pool.end();
    process.exit(1);
  }
}

initDatabase();

