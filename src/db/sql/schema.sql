-- =========================
-- ENUMS
-- =========================

CREATE TYPE oauth_provider AS ENUM ('google', 'github', 'yandex'); -- адаптируй под свой список провайдеров
CREATE TYPE playlist_type AS ENUM ('default', 'custom');

-- =========================
-- USERS
-- =========================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    picture TEXT,
    password TEXT,
    salt TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- =========================
-- OAUTH ACCOUNTS
-- =========================

CREATE TABLE oauth_accounts (
    provider oauth_provider NOT NULL,
    provider_account_id TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    PRIMARY KEY (provider_account_id, provider)
);

-- =========================
-- USER SESSIONS
-- =========================

CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_ended BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT now() NOT NULL,
    ended_at TIMESTAMP
);

-- =========================
-- TRACKS
-- =========================

CREATE TABLE tracks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    author VARCHAR(225) NOT NULL,
    image_name VARCHAR(225),
    track_dir VARCHAR(222) NOT NULL,
    duration REAL NOT NULL,
    created_at TIMESTAMP DEFAULT now() NOT NULL
);

-- =========================
-- PLAYLISTS
-- =========================

CREATE TABLE playlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    image_name VARCHAR(225),
    type playlist_type DEFAULT 'custom' NOT NULL,
    creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- =========================
-- PLAYLIST TRACKS (many-to-many)
-- =========================

CREATE TABLE playlist_tracks (
    playlist_id UUID NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
    track_id UUID NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    PRIMARY KEY (playlist_id, track_id)
);

-- =========================
-- FUNCTION + TRIGGER: create_default_playlist()
-- =========================

CREATE OR REPLACE FUNCTION create_default_playlist()
RETURNS TRIGGER AS $$
DECLARE
    playlist_name TEXT;
BEGIN
    playlist_name := NEW.username || '''s tracks';

    INSERT INTO playlists (name, type, creator_id)
    VALUES (playlist_name, 'default', NEW.id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_default_playlist_trigger
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION create_default_playlist();



