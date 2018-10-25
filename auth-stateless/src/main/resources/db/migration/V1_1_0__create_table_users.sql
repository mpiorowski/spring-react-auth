-- auto-generated definition
create table users
(
  id   serial not null
    constraint users_pk
    primary key,
  username varchar(60) unique,
  password varchar(60),
  role varchar(60)
);

alter table users
  owner to admin;

create unique index users_id_uindex
  on users (id);