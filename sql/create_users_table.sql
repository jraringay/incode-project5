
--Create initial tables



DROP TABLE IF EXISTS users;



CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    secondname VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(100) NOT NULL
    UNIQUE (email)
);


