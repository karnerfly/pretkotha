-- migrate:up

-- insert users
INSERT INTO users (user_name, email, password_hash, is_banned, banned_at)
VALUES 
    ('john_doe', 'john@example.com', 'hashedpassword1', FALSE, NULL),
    ('jane_doe', 'jane@example.com', 'hashedpassword2', FALSE, NULL),
    ('banned_user', 'banned@example.com', 'hashedpassword3', TRUE, NOW()),
    ('alice_smith', 'alice@example.com', 'hashedpassword4', FALSE, NULL),
    ('bob_jackson', 'bob@example.com', 'hashedpassword5', FALSE, NULL);

-- insert user profiles
INSERT INTO user_profiles (user_id, avatar_url, bio, phone, role)
SELECT id, 'https://example.com/avatar1.png', 'Loves writing', '1234567890', 'user'::user_role FROM users WHERE email = 'john@example.com'
UNION ALL
SELECT id, 'https://example.com/avatar2.png', 'Sketch artist', '0987654321', 'user'::user_role FROM users WHERE email = 'jane@example.com'
UNION ALL
SELECT id, 'https://example.com/avatar3.png', 'Banned for spam', '1122334455', 'user'::user_role FROM users WHERE email = 'banned@example.com'
UNION ALL
SELECT id, 'https://example.com/avatar4.png', 'Passionate about tech', '5566778899', 'admin'::user_role FROM users WHERE email = 'alice@example.com'
UNION ALL
SELECT id, 'https://example.com/avatar5.png', 'Nature lover', '6677889900', 'user'::user_role FROM users WHERE email = 'bob@example.com';

-- insert posts
INSERT INTO posts (slug, title, description, thumbnail, content, kind, category, post_by)
SELECT 'my-first-story', 'My First Story', 'A great story', 'https://example.com/thumb1.jpg', 'Once upon a time...', 'story'::post_type, 'horror'::categories, id FROM users WHERE email = 'john@example.com'
UNION ALL
SELECT 'amazing-drawing', 'Amazing Drawing', 'A beautiful sketch', 'https://example.com/thumb2.jpg', 'A picture speaks a thousand words.', 'drawing'::post_type, 'others'::categories, id FROM users WHERE email = 'jane@example.com'
UNION ALL
SELECT 'tech-revolution', 'Tech Revolution', 'How AI is changing the world', 'https://example.com/thumb3.jpg', 'Artificial intelligence is evolving rapidly...', 'story'::post_type, 'biography'::categories, id FROM users WHERE email = 'alice@example.com'
UNION ALL
SELECT 'wildlife-photography', 'Wildlife Photography', 'Capturing nature', 'https://example.com/thumb4.jpg', 'A journey through the lens in the wild.', 'drawing'::post_type, 'thriller'::categories, id FROM users WHERE email = 'bob@example.com';

-- insert likes
INSERT INTO likes (liked_on, liked_by)
SELECT p.id, u.id FROM posts p, users u WHERE p.slug = 'my-first-story' AND u.email = 'jane@example.com'
UNION ALL
SELECT p.id, u.id FROM posts p, users u WHERE p.slug = 'amazing-drawing' AND u.email = 'john@example.com'
UNION ALL
SELECT p.id, u.id FROM posts p, users u WHERE p.slug = 'tech-revolution' AND u.email = 'bob@example.com'
UNION ALL
SELECT p.id, u.id FROM posts p, users u WHERE p.slug = 'wildlife-photography' AND u.email = 'alice@example.com';

-- insert bookmarks
INSERT INTO bookmarks (post_id, user_id)
SELECT p.id, u.id FROM posts p, users u WHERE p.slug = 'my-first-story' AND u.email = 'john@example.com'
UNION ALL
SELECT p.id, u.id FROM posts p, users u WHERE p.slug = 'amazing-drawing' AND u.email = 'jane@example.com'
UNION ALL
SELECT p.id, u.id FROM posts p, users u WHERE p.slug = 'tech-revolution' AND u.email = 'alice@example.com'
UNION ALL
SELECT p.id, u.id FROM posts p, users u WHERE p.slug = 'wildlife-photography' AND u.email = 'bob@example.com';


-- migrate:down
DELETE FROM likes;
DELETE FROM bookmarks;
DELETE FROM posts;
DELETE FROM user_profiles;
DELETE FROM users;
