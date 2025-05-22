CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  type TEXT NOT NULL CHECK (type IN ('text','file')),
  text_content TEXT,
  file_name TEXT,
  file_path TEXT,
  mime_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);