-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON whitelist;
DROP POLICY IF EXISTS "Allow authenticated users to modify whitelist" ON whitelist;
DROP POLICY IF EXISTS "Allow public to insert applications" ON whitelist;
DROP POLICY IF EXISTS "Allow authenticated users to update whitelist" ON whitelist;
DROP POLICY IF EXISTS "Allow authenticated users to delete whitelist" ON whitelist;

-- Enable RLS
ALTER TABLE whitelist ENABLE ROW LEVEL SECURITY;

-- Create new policies
-- Allow public to read the whitelist
CREATE POLICY "Allow public read access" ON whitelist
    FOR SELECT
    USING (true);

-- Allow public to insert new applications
CREATE POLICY "Allow public to insert applications" ON whitelist
    FOR INSERT
    WITH CHECK (true);

-- Allow authenticated users to update whitelist entries
CREATE POLICY "Allow authenticated users to update whitelist" ON whitelist
    FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to delete whitelist entries
CREATE POLICY "Allow authenticated users to delete whitelist" ON whitelist
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- Grant necessary permissions to the anon role
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT, INSERT ON whitelist TO anon;
GRANT USAGE ON SEQUENCE whitelist_id_seq TO anon; 