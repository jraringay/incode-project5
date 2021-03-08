
INSERT INTO users (firstname, secondname, email, password)
VALUES ('Simpson', 'Bart', 'itsbart@gmail.com', '489f719cadf919094ddb38e7654de153ac33c02febb5de91e5345cbe372cf4a0'); --happy

INSERT INTO users (surname, firstname, email, password)
VALUES ('James', 'Rick', 'itsrick@gmail.com', 'a941a4c4fd0c01cddef61b8be963bf4c1e2b0811c037ce3f1835fddf6ef6c223'); --sunshine

INSERT INTO users (surname, firstname, email, password)
VALUES ('Knowles', 'Beyonce', 'itsbeyonce@gmail.com', '80f189984e5ca70287d13342f6daa0db45cba3c131c4e46dc81360f3a4c4f690'); --music

-- Before storing a hashed password, it's best to have 'bcrypt' do the "salting" process to improve the hashed password.
-- Information about 'bcrypt' - https://dev.to/aditya278/understanding-and-implementing-password-hashing-in-nodejs-2m84