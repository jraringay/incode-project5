# Project5 DB Schema (WORK IN PROGRESS - DO NOT RUN)

```
DROP DATABASE IF EXISTS project5db;
CREATE DATABASE project5db;
```

## Users table
Fields | Data type | Value | Is Primary Key? | Is Foreign Key? | Is Null?
------------ | ------------- | ------------- | ------------- | ------------- | -------------
user_id | SERIAL | N/A | Yes | No | N/A
surname | VARCHAR | 50 | No | No | NOT NULL
firstname | VARCHAR | 50 | No | No | NOT NULL
email | VARCHAR | 50 | No | No | NOT NULL
password | VARCHAR | 100 | No | No | NOT NULL
created_at | TIMESTAMPZ | N/A | No | No | NOT NULL

```
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  surname VARCHAR(50) NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMPZ NOT NULL
);
```


## Ratings table
Fields | Data type | Value | Is Primary Key? | Is Foreign Key? | Is Null?
------------ | ------------- | ------------- | ------------- | ------------- | -------------
rating_id | SERIAL | N/A | Yes | No | N/A
movie_id | INT | N/A | No | No | NOT NULL
user_id | INT | N/A | No | Yes | NOT NULL
rating_score | INT | 0 TO 5 | No | No | NOT NULL
comment | TEXT | N/A | No | No | N/A
created_at | TIMESTAMPZ | N/A | No | No | NOT NULL
updated_at | TIMESTAMPZ | N/A | No | No | N/A

```
DROP TABLE IF EXISTS ratings;
CREATE TABLE IF NOT EXISTS ratings (
  rating_id SERIAL PRIMARY KEY,
  movie_id INT NOT NULL,
  user_id INT NOT NULL,
  rating_score INT CHECK (rating_score >= 0 AND rating_score <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMPZ NOT NULL,
  updated_at TIMESTAMPZ,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(user_id)
);
```