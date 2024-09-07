DROP DATABASE IF EXISTS notes_app;
CREATE DATABASE notes_app;
USE notes_app;

DROP TABLE IF EXISTS notes;

CREATE TABLE notes (
    id int PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    content text(1023) NOT NULL
);

INSERT INTO NOTES (title, content) 
VALUES ('Hello, world', 'hello everyone');