DROP DATABASE IF EXISTS notes_app;
CREATE DATABASE notes_app;
USE notes_app;

DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS users;

-- TODO unique email/usernames
CREATE TABLE users (
    id int PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    username varchar(23) NOT NULL
);

CREATE TABLE notes (
    id int UNIQUE NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    content text(1023) NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (email, username)
VALUES ('note_lover@example.com', 'note_lover');

INSERT INTO notes (title, content, user_id)
VALUES ('Hello, world', 'Hello everyone', 1);