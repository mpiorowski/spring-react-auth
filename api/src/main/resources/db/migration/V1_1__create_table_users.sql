create table users
(
  user_id  serial not null
    constraint users_pk
    primary key,
  user_name varchar(60) unique,
  user_email varchar(60) unique,
  user_password varchar(60),
  user_role varchar(60)
);

create unique index users_user_id_uindex
  on users (user_id);