-- Create whitelist table
CREATE TABLE IF NOT EXISTS whitelist (
    id BIGSERIAL PRIMARY KEY,
    address TEXT NOT NULL UNIQUE,
    twitter_handle TEXT,
    access_granted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on address for faster lookups
CREATE INDEX IF NOT EXISTS whitelist_address_idx ON whitelist (address);