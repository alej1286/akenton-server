/* //delete a backup
heroku pg:backups:delete b101 --app foo

//info sobre backups
heroku pg:backups --app akenton-server

//Realizar un backup
heroku pg:backups:capture --app akenton-server

//Descargar un backup
heroku pg:backups:download --app akenton-server

//Get url del backup
heroku pg:backups:url b001 --app akenton-server

//upload the downloaded backups to the local database

pg_restore --verbose --clean --no-acl --no-owner -h localhost -U postgres -d akenton latest.dump

//access heroku client
heroku pg:psql postgresql-adjacent-95182 --app akenton-server


 */

/* https://elements.heroku.com/addons/heroku-postgresql */
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

INSERT INTO tipo (descr) VALUES ('Bolsa 1.5Lbs Nat'),('Bolsa 1.5Lbs Org'),('Bolsa 3Lbs Nat'),('Bolsa 5Lbs Nat'),('Bolsa 2.7Lbs Org'),('Caja 1.5Lbs Nat'),('Caja 1.5Lbs Org'),('Caja 3Lbs Nat'),('Caja 5Lbs Nat'),('Caja 2.7Lbs Org'),('Pallet 1.5Lbs Nat'),('Pallet 1.5Lbs Org'),('Pallet 3Lbs Nat'),('Pallet 5Lbs Nat'),('Pallet 2.7Lbs Org');

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

INSERT INTO client (nombre) VALUES ('Kasim'),('UNFI'),('GP Trading'),('Amazon'),('Martinez'),('Mi Patria');

DROP TABLE IF EXISTS inventory CASCADE;

CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40),
    in_stock integer,
    notify integer
);

INSERT INTO inventory(id,nombre, in_stock, notify)
    VALUES  (1,'Big Bag',20, 10),
            (2,'Cajas',1000, 1000),
            (3,'Bolsas 1,5Lb Nat',720, 720),
            (4,'Bolsas 1,5Lb Org',720, 720),
            (5,'Bolsas 3Lb Nat',648, 648),
            (6,'Bolsas 5Lb Nat',240, 240),
            (7,'Pomos',20, 540),
            (8,'Etiquetas Pomos',540, 540),
            (9,'Tapas Pomos',540, 540),
            (10,'Pallets',20, 10);

select * from inventory;

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

DROP TABLE IF EXISTS bibag CASCADE;

CREATE TABLE bigbag (
    id integer PRIMARY KEY,
    inicio timestamp default NULL,
    fin timestamp default NULL,
    client integer
);

INSERT INTO bigbag(id, inicio, fin, client)
    VALUES  (1,'2021-12-02 19:10:25-07', '2021-12-02 19:10:25-07',1);

select * from bigbag;



DROP TABLE IF EXISTS produccion CASCADE;

CREATE TABLE produccion (
    id SERIAL PRIMARY KEY,
    ordern integer,
    tipo integer,
    cantidad integer,
    inicio timestamp default NULL,
    fin timestamp default NULL,
    descr VARCHAR(40),
    bigbag integer,
    CONSTRAINT fk_tipo_produccion FOREIGN KEY(tipo) REFERENCES tipo(id),
    CONSTRAINT fk_order_produccion FOREIGN KEY(ordern) REFERENCES orders(id)
);

INSERT INTO produccion(ordern, tipo, cantidad, inicio, fin, descr, bigbag)
    VALUES  (1,1, 4, '2021-12-02 19:10:25-07', '2021-12-02 19:10:25-07','Des1',1),
            (2,2, 9, '2021-12-12 19:10:25-07', '2021-12-02 19:10:25-07','Desc2',1),
            (3,3, 8, '2021-12-21 19:10:25-07', '2021-12-02 19:10:25-07','Des3',1),
            (4,2, 3, '2021-12-22 19:10:25-07', '2021-12-02 19:10:25-07','Des4',1),
            (5,1, 12,'2021-12-25 19:10:25-07', '2021-12-02 19:10:25-07','Desc5',1);

select * from produccion;

DROP TABLE IF EXISTS variables CASCADE;

CREATE TABLE variables (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40),
    val integer
);

INSERT INTO variables(nombre, val)
    VALUES  ('bigbag',1);

select * from variables;
