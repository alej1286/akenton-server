/* connect to Heroku terminal */
heroku pg:psql --app akenton-server


/* CREATE DATABASE akenton;
\l
\c akenton;
 */

DROP TABLE IF EXISTS tipo CASCADE;

CREATE TABLE tipo(
    id SERIAL PRIMARY KEY,
    descr VARCHAR(40)
);

INSERT INTO tipo (descr) VALUES ('1.5Lbs'),('3Lbs'),('5Lbs');

DROP TABLE IF EXISTS client CASCADE;

CREATE TABLE client(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40)
);

INSERT INTO client (nombre) VALUES ('Kasim'),('GP'),('Amazon'),('Publix'),('Sedano');

DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    client integer,
    tipo integer,
    pallets integer,
    descr VARCHAR(40),
    CONSTRAINT fk_tipo_order FOREIGN KEY(tipo) REFERENCES tipo(id),
    CONSTRAINT fk_client_order FOREIGN KEY(client) REFERENCES client(id)
);

INSERT INTO orders(client, tipo, pallets, descr)
    VALUES  (1,1, 4, 'Descrpcion'),
            (2,2, 9, 'Descrpcion sds'),
            (3,3, 8, 'Descrpcionsdsdf'),
            (4,2, 3, 'Descrpcion'),
            (5,1, 12, 'Descrpcion');

select * from orders;