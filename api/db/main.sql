DROP DATABASE IF EXISTS notes_app;
CREATE DATABASE notes_app;
USE notes_app;

DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_sessions;

CREATE TABLE users (
    id int PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
    email varchar(255) UNIQUE NOT NULL,
    username varchar(23) UNIQUE NOT NULL,
    password_hash varchar(255) NOT NULL
);

CREATE TABLE notes (
    id int PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    content text(1023) NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_sessions (
    id int PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
    token varchar(255) UNIQUE,
    user_id int NOT NULL,
    expires_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);