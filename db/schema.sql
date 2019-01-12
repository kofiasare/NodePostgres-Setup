DROP DATABASE IF EXISTS questioner;
CREATE DATABASE questioner;

\c questioner;

CREATE TABLE users (
  id             serial PRIMARY KEY,
  firstName       varchar(30) NOT NULL,
  lastName       varchar(30) NOT NULL,
  otherName      varchar(30),
  userName       varchar(30) UNIQUE,
  email          varchar(30) UNIQUE NOT NULL,
  phoneNumber    varchar(15) UNIQUE,
  passwordDigest varchar(60) NOT NULL,
  profile         text,
  isAdmin        boolean DEFAULT false,
  registered     timestamp without time zone DEFAULT current_timestamp NOT NULL
);

CREATE TABLE meetups (
  id          serial PRIMARY KEY,
  topic       varchar(80) NOT NULL,
  description text,
  location    varchar(50) NOT NULL,
  city        varchar(40) NOT NULL,
  image       varchar,
  startTime   timestamp without time zone NOT NULL,
  endTime     timestamp without time zone NOT NULL,
  userID      bigint REFERENCES users(id) ON DELETE CASCADE,
  done        boolean DEFAULT false,
  createdOn   timestamp without time zone NOT NULL
);

CREATE TABLE questions (
  id          serial PRIMARY KEY,
  userID      bigint REFERENCES users(id) ON DELETE CASCADE,
  meetupID    bigint REFERENCES meetups(id) ON DELETE CASCADE,
  body        text,
  upvotes     integer DEFAULT 0 NOT NULL,
  downvotes   integer DEFAULT 0 NOT NULL,
  createdOn   timestamp without time zone NOT NULL
);

CREATE TABLE comments (
  id          serial PRIMARY KEY,
  userID      bigint REFERENCES users(id) ON DELETE CASCADE,
  questionID  bigint REFERENCES questions(id) ON DELETE CASCADE,
  createdOn   timestamp without time zone NOT NULL,
  updatedOn   timestamp without time zone NOT NULL
);

CREATE TABLE rsvps (
  id          serial  PRIMARY KEY,
  meetupID    bigint  REFERENCES meetups(id) ON DELETE CASCADE,
  userID      bigint  REFERENCES users(id) ON DELETE CASCADE,
  invitees    integer DEFAULT 0
);