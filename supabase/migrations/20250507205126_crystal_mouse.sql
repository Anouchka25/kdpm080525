/*
  # Add report count and auto-disable properties

  1. Changes
    - Add report_count column to properties table
    - Add trigger to auto-disable properties after 5 reports
    - Add unique constraint to prevent multiple reports from same user

  2. Security
    - Only authenticated users can report properties
    - Properties are automatically disabled after 5 unique reports
*/

-- Add report count to properties
ALTER TABLE properties 
ADD COLUMN report_count integer DEFAULT 0;

-- Add unique constraint to prevent multiple reports from same user
ALTER TABLE reports
ADD CONSTRAINT unique_property_reporter 
UNIQUE (property_id, reporter_id);

-- Create function to update report count and disable property
CREATE OR REPLACE FUNCTION handle_property_report()
RETURNS TRIGGER AS $$
BEGIN
  -- Increment report count
  UPDATE properties 
  SET 
    report_count = report_count + 1,
    available = CASE 
      WHEN report_count + 1 >= 5 THEN false 
      ELSE available 
    END,
    updated_at = now()
  WHERE id = NEW.property_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to handle property reports
DROP TRIGGER IF EXISTS on_property_report ON reports;
CREATE TRIGGER on_property_report
  AFTER INSERT ON reports
  FOR EACH ROW
  EXECUTE FUNCTION handle_property_report();