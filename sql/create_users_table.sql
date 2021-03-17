
--Create initial tables

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  secondname VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  active BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TABLE IF EXISTS email_confirmation;

CREATE TABLE IF NOT EXISTS email_confirmation (
    hash_id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    hash VARCHAR(60) NOT NULL,

    FOREIGN KEY(email) 
      REFERENCES users(email)
      ON DELETE CASCADE
);

DROP TABLE IF EXISTS ratings;
CREATE TABLE IF NOT EXISTS ratings (
  rating_id SERIAL PRIMARY KEY,
  movie_id INT NOT NULL,
  user_id INT NOT NULL,
  rating_score INT CHECK (rating_score >= 0 AND rating_score <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(user_id)
);