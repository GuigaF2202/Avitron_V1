-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  uuid UUID NOT NULL UNIQUE,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP WITH TIME ZONE,
  online BOOLEAN DEFAULT FALSE,
  region_id INTEGER,
  user_type VARCHAR(50) DEFAULT 'user',
  user_level INTEGER DEFAULT 0,
  user_flags INTEGER DEFAULT 0
);

-- Regions Table
CREATE TABLE regions (
  id SERIAL PRIMARY KEY,
  uuid UUID NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  size_x INTEGER DEFAULT 256,
  size_y INTEGER DEFAULT 256,
  owner_id INTEGER REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'offline',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  estate_id INTEGER,
  flags INTEGER DEFAULT 0
);

-- Assets Table
CREATE TABLE assets (
  id SERIAL PRIMARY KEY,
  uuid UUID NOT NULL UNIQUE,
  creator_id INTEGER REFERENCES users(id),
  asset_type VARCHAR(50) NOT NULL,
  name VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  data_size INTEGER DEFAULT 0,
  content_type VARCHAR(255)
);

-- Accounts Table
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  balance INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Transactions Table
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  source_id INTEGER REFERENCES accounts(id),
  destination_id INTEGER REFERENCES accounts(id),
  amount INTEGER NOT NULL,
  description TEXT,
  transaction_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Sessions Table
CREATE TABLE user_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  session_id UUID NOT NULL,
  ip_address VARCHAR(50),
  login_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  logout_time TIMESTAMP WITH TIME ZONE,
  region_id INTEGER REFERENCES regions(id)
);

-- Activities Table
CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  activity_type VARCHAR(50) NOT NULL,
  description TEXT,
  region_id INTEGER REFERENCES regions(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  data JSONB
);