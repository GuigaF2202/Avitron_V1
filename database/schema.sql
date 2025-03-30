-- Conectar ao banco de dados opensim
\c opensim;

-- Verificar a estrutura atual da tabela users
-- Se a tabela não existir, criá-la do zero
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  avatar_type VARCHAR(20) NOT NULL,
  security_question INTEGER NOT NULL,
  security_answer VARCHAR(255) NOT NULL,
  news_consent BOOLEAN DEFAULT FALSE,
  terms_consent BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255),
  verification_expires TIMESTAMP
);

-- Criar os índices para melhor desempenho
CREATE INDEX IF NOT EXISTS idx_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_verification_token ON users(verification_token);

-- Conceder privilégios ao usuário postgres
GRANT ALL PRIVILEGES ON TABLE users TO postgres;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO postgres;

-- Configurações adicionais de segurança
ALTER TABLE users OWNER TO postgres;

-- Checar se todos os índices estão presentes
-- SELECT * FROM pg_indexes WHERE tablename = 'users';