CREATE EXTENSION IF NOT EXISTS pgcrypto;
INSERT into users (user_name, user_mail, user_password, user_role) VALUES ('mat', 'mat@gmail.com', crypt('pass', gen_salt('bf', 8)), 'admin');
INSERT into users (user_name, user_mail, user_password, user_role) VALUES ('patryk', 'patryk@gmail.com',crypt('pass', gen_salt('bf', 8)), 'admin');
INSERT into users (user_name, user_mail, user_password, user_role) VALUES ('user', 'user@gmail.com',crypt('pass', gen_salt('bf', 8)), 'user');