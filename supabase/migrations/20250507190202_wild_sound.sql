/*
  # Initial schema setup for Ndjimba

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - matches auth.users id
      - `phone_number` (text) - user's phone number
      - `whatsapp` (text, optional) - WhatsApp number
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `properties`
      - `id` (uuid, primary key)
      - `owner_id` (uuid) - references profiles.id
      - `title` (text)
      - `description` (text)
      - `type` (text) - house, apartment, studio, villa, room
      - `price` (integer) - monthly rent in FCFA
      - `neighborhood` (text)
      - `city` (text)
      - `surface` (integer) - in square meters
      - `rooms` (integer)
      - `bathrooms` (integer)
      - `verified` (boolean)
      - `available` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `property_images`
      - `id` (uuid, primary key)
      - `property_id` (uuid) - references properties.id
      - `url` (text)
      - `verification_photo` (boolean)
      - `created_at` (timestamp)

    - `reports`
      - `id` (uuid, primary key)
      - `property_id` (uuid) - references properties.id
      - `reporter_id` (uuid) - references profiles.id
      - `reason` (text)
      - `status` (text) - pending, reviewed, resolved
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create custom types
CREATE TYPE property_type AS ENUM ('house', 'apartment', 'studio', 'villa', 'room');
CREATE TYPE report_status AS ENUM ('pending', 'reviewed', 'resolved');

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  phone_number text NOT NULL UNIQUE,
  whatsapp text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create properties table
CREATE TABLE properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES profiles(id) NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  type property_type NOT NULL,
  price integer NOT NULL CHECK (price > 0),
  neighborhood text NOT NULL,
  city text NOT NULL,
  surface integer CHECK (surface > 0),
  rooms integer CHECK (rooms > 0),
  bathrooms integer CHECK (bathrooms > 0),
  verified boolean DEFAULT false,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create property_images table
CREATE TABLE property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  verification_photo boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create reports table
CREATE TABLE reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  reporter_id uuid REFERENCES profiles(id) NOT NULL,
  reason text NOT NULL,
  status report_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read any profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Properties policies
CREATE POLICY "Anyone can read available properties"
  ON properties FOR SELECT
  TO authenticated
  USING (available = true);

CREATE POLICY "Owners can CRUD their properties"
  ON properties FOR ALL
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Property images policies
CREATE POLICY "Anyone can view property images"
  ON property_images FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Owners can manage property images"
  ON property_images FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE id = property_images.property_id
      AND owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties
      WHERE id = property_images.property_id
      AND owner_id = auth.uid()
    )
  );

-- Reports policies
CREATE POLICY "Users can create reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view their own reports"
  ON reports FOR SELECT
  TO authenticated
  USING (auth.uid() = reporter_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();