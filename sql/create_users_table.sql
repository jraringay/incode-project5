
--Create initial tables



-- DROP TABLE IF EXISTS users;

-- CREATE TABLE IF NOT EXISTS users (
--     user_id serial PRIMARY KEY,
--     firstname VARCHAR(100) NOT NULL,
--     secondname VARCHAR(100) NOT NULL,
--     email VARCHAR(200) NOT NULL,
--     password VARCHAR(100) NOT NULL
--     UNIQUE (email)
-- );

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  secondname VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
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
