CREATE TABLE products
(
    productId serial PRIMARY KEY,
    productName varchar(200) NOT NULL,
    productPrice float,
    productAvailable boolean DEFAULT true NOT NULL
);