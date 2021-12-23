CREATE DATABASE akenton;

\l

\c akenton;

CREATE TABLE tipo(
    id SERIAL PRIMARY KEY,
    descr VARCHAR(40)
);

INSERT INTO tipo (descr)
    VALUES ('1.5Lbs'),
    ('3Lbs'),
    ('5Lbs');



CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    descr VARCHAR(40),
    tipo integer,
    pallets integer,CONSTRAINT fk_tipo_order FOREIGN KEY(tipo) REFERENCES tipo(id)
);


INSERT INTO orders(descr, tipo, pallets)
    VALUES ('Kasim', 1, 4),
    ('Iri Pili', 2, 9),
    ('Amazon', 3, 8);

select * from orders;