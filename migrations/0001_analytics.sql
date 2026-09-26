CREATE TABLE IF NOT EXISTS events (
  event_id TEXT PRIMARY KEY,
  event_name TEXT NOT NULL,
  occurred_at TEXT NOT NULL,
  page_path TEXT,
  page_url TEXT,
  referrer TEXT,
  destination TEXT,
  link_text TEXT,
  page_title TEXT,
  traffic_source TEXT,
  traffic_medium TEXT,
  traffic_campaign TEXT,
  analytics_consent INTEGER DEFAULT 0,
  marketing_consent INTEGER DEFAULT 0,
  country TEXT,
  device_type TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_events_time ON events(occurred_at);
CREATE INDEX IF NOT EXISTS idx_events_name_time ON events(event_name, occurred_at);
CREATE INDEX IF NOT EXISTS idx_events_page_time ON events(page_path, occurred_at);
CREATE INDEX IF NOT EXISTS idx_events_source_time ON events(traffic_source, occurred_at);
CREATE INDEX IF NOT EXISTS idx_events_country_time ON events(country, occurred_at);
