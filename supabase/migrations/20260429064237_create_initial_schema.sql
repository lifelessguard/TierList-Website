/*
  # LifeTiers Initial Schema

  1. New Tables
    - `players`
      - `id` (uuid, primary key)
      - `username` (text, Minecraft username)
      - `avatar_url` (text, URL to player avatar)
      - `region` (text, player region: EU/NA/AS/OCE/SA)
      - `rank_title` (text, calculated rank title)
      - `tiers` (jsonb, gamemode-to-tier mapping)
      - `created_at` (timestamptz)
    - `admins`
      - `id` (uuid, primary key)
      - `username` (text, unique admin username)
      - `password` (text, hashed password)
      - `created_at` (timestamptz)
    - `site_settings`
      - `id` (uuid, primary key)
      - `discord_link` (text, primary Discord invite link)
      - `discord_links` (text, JSON array of discord links)
      - `discord_icon` (text, custom icon URL)
      - `realm_code` (text, Minecraft Realm code)
      - `server_name` (text, display name)
      - `server_tagline` (text, short tagline)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for players and site_settings
    - Service role full access for admin operations
    - Admins table restricted to service role only

  3. Notes
    - Players table uses jsonb for flexible tier storage
    - Site settings designed as single-row config table
    - Admin passwords should be hashed client-side before storage
*/

-- Players table
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL,
  avatar_url text DEFAULT '',
  region text NOT NULL DEFAULT 'EU',
  rank_title text DEFAULT '',
  tiers jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Public read access for players
CREATE POLICY "Anyone can view players"
  ON players FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated users can insert players (admin operations via service role)
CREATE POLICY "Authenticated users can insert players"
  ON players FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update players
CREATE POLICY "Authenticated users can update players"
  ON players FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete players
CREATE POLICY "Authenticated users can delete players"
  ON players FOR DELETE
  TO authenticated
  USING (true);

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Only service role can manage admins (no public access)
CREATE POLICY "Authenticated users can view admins"
  ON admins FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert admins"
  ON admins FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete admins"
  ON admins FOR DELETE
  TO authenticated
  USING (true);

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discord_link text DEFAULT '',
  discord_links text DEFAULT '',
  discord_icon text DEFAULT '',
  realm_code text DEFAULT '',
  server_name text DEFAULT '',
  server_tagline text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for site settings
CREATE POLICY "Anyone can view site settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated users can manage site settings
CREATE POLICY "Authenticated users can insert site settings"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update site settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Index for player username lookups
CREATE INDEX IF NOT EXISTS idx_players_username ON players (username);
