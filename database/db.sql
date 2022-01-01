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

DROP TABLE IF EXISTS estado CASCADE;

CREATE TABLE estado(
    id SERIAL PRIMARY KEY,
    descr VARCHAR(40)
);

INSERT INTO estado (descr) VALUES ('En Proceso'),('Terminado'),('Recogido');

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
    cantidad integer,
    recogida timestamp default NULL,
    terminada timestamp default NULL,
    descr VARCHAR(40),
    estado integer,
    CONSTRAINT fk_tipo_order FOREIGN KEY(tipo) REFERENCES tipo(id),
    CONSTRAINT fk_client_order FOREIGN KEY(client) REFERENCES client(id),
    CONSTRAINT fk_estado_order FOREIGN KEY(estado) REFERENCES estado(id)
);

INSERT INTO orders(client, tipo, cantidad, recogida, terminada, descr, estado)
    VALUES  (1,1, 4, '2021-12-02 19:10:25-07', '2021-12-02 19:10:25-07','Descrpcion',1),
            (2,2, 9, '2021-12-12 19:10:25-07', '2021-12-02 19:10:25-07','Descrpcion sds',1),
            (3,3, 8, '2021-12-21 19:10:25-07', '2021-12-02 19:10:25-07','Descrpcionsdsdf',1),
            (4,2, 3, '2021-12-22 19:10:25-07', '2021-12-02 19:10:25-07','Descrpcion',1),
            (5,1, 12,'2021-12-25 19:10:25-07', '2021-12-02 19:10:25-07','Descrpcion',1);

select * from orders;
