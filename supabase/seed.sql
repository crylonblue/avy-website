-- Insert some test addresses into the whitelist
INSERT INTO whitelist (address, twitter_handle, access_granted) VALUES
('0x1234567890123456789012345678901234567890', 'test_user1', true),
('0xabcdef1234567890abcdef1234567890abcdef12', 'test_user2', false),
('0x5683122a27B9D5E55b232F7063C47daf6D5F9132', 'till', true)
ON CONFLICT (address) DO NOTHING; 