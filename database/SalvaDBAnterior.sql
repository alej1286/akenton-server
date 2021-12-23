CREATE DATABASE akenton;

\l

\c akenton;

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    descr VARCHAR(40),
    tipo TEXT,
    pallets integer
);

INSERT INTO orders (descr, tipo, pallets)
    VALUES ('Kasim', '1.5Lbs', 4),
    ('Iri Pili', '3Lbs', 9),
    ('Amazon', '5Lbs', 8);

select * from orders;