create database productStore;
use productStore;
create table products
(
    idProduct   int primary key auto_increment,
    name        varchar(225),
    img         text,
    price       int,
    description text,
    idOrder     int

);
create table users
(
    idUser   int auto_increment primary key,
    name     varchar(100),
    birthday date,
    address  varchar(200),
    password varchar(30) unique ,
    email    varchar(50) unique ,
    phone    varchar(15) unique


);
create table orders
(
    idOrder     int auto_increment primary key references products(idOrder),
    nameProduct varchar(225),
    dateBuy     date,
    quantity    int,
    idCustomer  int,
    foreign key (idCustomer) references customer (idCustomer)

);

create table customer
(
    idCustomer    int primary key auto_increment,
    nameCustomer  varchar(100),
    address       varchar(225),
    phoneCustomer varchar(15),
    email         varchar(50)

);

