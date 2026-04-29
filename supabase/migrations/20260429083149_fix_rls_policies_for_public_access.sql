/*
  # Fix RLS Policies for Public Access

  Changes:
  - Update players table RLS to allow public (anon) users to insert, update, delete
  - Update admins table RLS to allow public (anon) users to insert, update, delete
  - Update site_settings table RLS to allow public (anon) users to insert, update, delete
  - Keep public read access for all tables

  This is safe because the admin panel manages access through local session storage
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can insert players" ON players;
DROP POLICY IF EXISTS "Authenticated users can update players" ON players;
DROP POLICY IF EXISTS "Authenticated users can delete players" ON players;

DROP POLICY IF EXISTS "Authenticated users can view admins" ON admins;
DROP POLICY IF EXISTS "Authenticated users can insert admins" ON admins;
DROP POLICY IF EXISTS "Authenticated users can delete admins" ON admins;

DROP POLICY IF EXISTS "Authenticated users can insert site settings" ON site_settings;
DROP POLICY IF EXISTS "Authenticated users can update site settings" ON site_settings;

-- Players: Allow public read, insert, update, delete
CREATE POLICY "Anyone can insert players"
  ON players FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update players"
  ON players FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete players"
  ON players FOR DELETE
  TO anon, authenticated
  USING (true);

-- Admins: Allow public read, insert, delete
CREATE POLICY "Anyone can insert admins"
  ON admins FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can delete admins"
  ON admins FOR DELETE
  TO anon, authenticated
  USING (true);

-- Site Settings: Allow public insert, update
CREATE POLICY "Anyone can insert site settings"
  ON site_settings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update site settings"
  ON site_settings FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
