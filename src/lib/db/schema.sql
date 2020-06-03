CREATE TABLE users (
userId integer primary key autoincrement not null,
userName text not null,
password text not null,
role text not null,
timeCreated timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE articles (
articleId integer primary key autoincrement not null,
title text not null,
subtitle text,
body text[] not null,
timeCreated timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);