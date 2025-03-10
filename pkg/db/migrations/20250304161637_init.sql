-- migrate:up

-- create types
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE post_type AS ENUM ('story', 'drawing');
CREATE TYPE categories AS ENUM('horror', 'thriller', 'other');

-- create user table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_banned BOOLEAN NOT NULL DEFAULT FALSE,
    banned_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- create user profile table
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users ON DELETE CASCADE,
    avatar_url TEXT,
    bio TEXT,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- create post table
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title VARCHAR(60) NOT NULL,
    description VARCHAR(160),
    thumbnail TEXT,
    content TEXT NOT NULL,
    kind post_type NOT NULL DEFAULT 'story',
    category categories NOT NULL DEFAULT 'horror',
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    post_by UUID NOT NULL REFERENCES users ON DELETE RESTRICT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- create like table
CREATE TABLE IF NOT EXISTS likes (
    liked_on UUID REFERENCES posts ON DELETE CASCADE,
    liked_by UUID REFERENCES users ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (liked_on, liked_by)
);

-- create bookmark table
CREATE TABLE IF NOT EXISTS bookmarks (
    post_id UUID REFERENCES posts ON DELETE CASCADE,
    user_id UUID REFERENCES users ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id, user_id)
);


-- migrate:down

-- drop all tables
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_profiles;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS bookmarks;

-- drop all types
DROP TYPE IF EXISTS user_role;
DROP TYPE IF EXISTS post_type;
DROP TYPE IF EXISTS categories;
