DROP DATABASE IF EXISTS questioner;
CREATE DATABASE questioner;

\c questioner;

CREATE TABLE meetups (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  breed VARCHAR,
  age INTEGER,
  sex VARCHAR
);