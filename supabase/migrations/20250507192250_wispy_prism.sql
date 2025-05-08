/*
  # Update property types and add city validation
  
  1. Changes
    - Add furnished property types and land type
    - Add city enum and validation
    - Add neighborhood validation by city
    
  2. New Types
    - Extended property_type enum
    - city enum for Libreville, Akanda, Owendo
    
  3. Validation
    - Added neighborhood validation based on city
*/

-- Drop existing type if it exists and create new property_type
DO $$ BEGIN
    DROP TYPE IF EXISTS property_type CASCADE;
    CREATE TYPE property_type AS ENUM (
      'house', 'apartment', 'studio', 'villa', 'room',
      'furnished_house', 'furnished_apartment', 'furnished_studio',
      'furnished_villa', 'furnished_room', 'land'
    );
EXCEPTION
    WHEN OTHERS THEN NULL;
END $$;

-- Create report_status if it doesn't exist
DO $$ BEGIN
    CREATE TYPE report_status AS ENUM ('pending', 'reviewed', 'resolved');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- Create city type if it doesn't exist
DO $$ BEGIN
    CREATE TYPE city AS ENUM ('Libreville', 'Akanda', 'Owendo');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  phone_number text NOT NULL UNIQUE,
  whatsapp text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create properties table if it doesn't exist
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES profiles(id) NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  type property_type NOT NULL,
  price integer NOT NULL CHECK (price > 0),
  neighborhood text NOT NULL,
  city city NOT NULL DEFAULT 'Libreville',
  surface integer CHECK (surface > 0),
  rooms integer CHECK (rooms > 0),
  bathrooms integer CHECK (bathrooms > 0),
  verified boolean DEFAULT false,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create property_images table if it doesn't exist
CREATE TABLE IF NOT EXISTS property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  verification_photo boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create reports table if it doesn't exist
CREATE TABLE IF NOT EXISTS reports (
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
DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can read any profile" ON profiles;
    CREATE POLICY "Users can read any profile"
      ON profiles FOR SELECT
      TO authenticated
      USING (true);
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
    CREATE POLICY "Users can update own profile"
      ON profiles FOR UPDATE
      TO authenticated
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id);
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

-- Properties policies
DO $$ BEGIN
    DROP POLICY IF EXISTS "Anyone can read available properties" ON properties;
    CREATE POLICY "Anyone can read available properties"
      ON properties FOR SELECT
      TO authenticated
      USING (available = true);
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Owners can CRUD their properties" ON properties;
    CREATE POLICY "Owners can CRUD their properties"
      ON properties FOR ALL
      TO authenticated
      USING (auth.uid() = owner_id)
      WITH CHECK (auth.uid() = owner_id);
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

-- Property images policies
DO $$ BEGIN
    DROP POLICY IF EXISTS "Anyone can view property images" ON property_images;
    CREATE POLICY "Anyone can view property images"
      ON property_images FOR SELECT
      TO authenticated
      USING (true);
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Owners can manage property images" ON property_images;
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
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

-- Reports policies
DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can create reports" ON reports;
    CREATE POLICY "Users can create reports"
      ON reports FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = reporter_id);
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can view their own reports" ON reports;
    CREATE POLICY "Users can view their own reports"
      ON reports FOR SELECT
      TO authenticated
      USING (auth.uid() = reporter_id);
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_properties_updated_at ON properties;
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add neighborhood validation function
CREATE OR REPLACE FUNCTION validate_neighborhood_by_city()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate neighborhood based on city
  IF NEW.city = 'Libreville' AND NEW.neighborhood NOT IN (
    'Akébé Frontière', 'Akébé Plaine', 'Akébé Poteau', 'Akébé Ville',
    'Awendjé', 'Batterie IV', 'Centre-ville', 'Glass', 'Gros Bouquet',
    'Lalala', 'Louis', 'Mindoubé', 'Montagne Sainte', 'Nkembo',
    'Nombakélé', 'Nzeng-Ayong', 'Oloumi', 'PK5', 'PK6', 'PK7', 'PK8',
    'PK9', 'PK10', 'PK11', 'PK12', 'Plein Ciel'
  ) THEN
    RAISE EXCEPTION 'Invalid neighborhood for Libreville: %', NEW.neighborhood;
  END IF;

  IF NEW.city = 'Akanda' AND NEW.neighborhood NOT IN (
    'Angondjé', 'Avorbam', 'Bambouchine', 'Cap Caravane', 'Cap Estérias',
    'Cap Santa Clara', 'Malibé 1', 'Malibé 2', 'Okala'
  ) THEN
    RAISE EXCEPTION 'Invalid neighborhood for Akanda: %', NEW.neighborhood;
  END IF;

  IF NEW.city = 'Owendo' AND NEW.neighborhood NOT IN (
    'Akournam 1', 'Akournam 2', 'Alénakiri', 'Awoungou', 'Barracuda',
    'Nomba Domaine', 'Owendo-Centre', 'Terre Nouvelle'
  ) THEN
    RAISE EXCEPTION 'Invalid neighborhood for Owendo: %', NEW.neighborhood;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for neighborhood validation
DROP TRIGGER IF EXISTS validate_neighborhood ON properties;
CREATE TRIGGER validate_neighborhood
  BEFORE INSERT OR UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION validate_neighborhood_by_city();