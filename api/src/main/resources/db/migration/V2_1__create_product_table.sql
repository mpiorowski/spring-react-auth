CREATE TABLE products
(
    product_id serial PRIMARY KEY,
    product_name varchar(200) NOT NULL,
    product_price float,
    product_availability boolean DEFAULT true NOT NULL
);