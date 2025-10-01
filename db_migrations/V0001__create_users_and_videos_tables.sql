-- Create users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create videos table for storing created videos
CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    character_type VARCHAR(50) NOT NULL,
    child_name VARCHAR(255) NOT NULL,
    video_url TEXT,
    thumbnail_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    views_count INTEGER DEFAULT 0
);

-- Insert default admin user (password: admin123)
-- Password hash for 'admin123' using bcrypt
INSERT INTO users (username, password_hash, role) 
VALUES ('admin', '$2b$10$rKx5EWLvVZXJzKz8vY3h0.EXqH5yZGBZ8VqJQYqN8vYGH9qGZqG8O', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insert sample videos
INSERT INTO videos (character_type, child_name, video_url, thumbnail_url, views_count)
VALUES 
    ('santa', 'Маша', 'https://www.w3schools.com/html/mov_bbb.mp4', '/img/d48aa981-3b64-42ad-a810-bb7c0d926bdd.jpg', 42),
    ('snowmaiden', 'Саша', 'https://www.w3schools.com/html/movie.mp4', '/img/e7db9042-a0ba-48c2-bb1b-201b2767e23a.jpg', 35),
    ('snowman', 'Петя', 'https://www.w3schools.com/html/mov_bbb.mp4', '/placeholder.svg', 28)
ON CONFLICT DO NOTHING;
