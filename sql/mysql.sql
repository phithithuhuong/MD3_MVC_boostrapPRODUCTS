create database productStore;
use productStore;
create table customer
(
    idCustomer int auto_increment primary key,
    birthday   date,
    address    varchar(100),
    password   varchar(20),
    email      varchar(50),
    phone      varchar(15)
);
create table products
(
    idProduct   int primary key auto_increment,
    name        varchar(225),
    img         text,
    price       int,
    description text

);
create table order
(
    idOrder    int auto_increment primary key  ,
    idCustomer int ,
    dateBuy    date,
    foreign key (idCustomer) references customer (idCustomer)
);
create table orderDetail
(
    idOrderDetail int auto_increment primary key,
    idOrder       int,
    idProduct     int,
    quantity      int,
    foreign key (idOrder) references order (idOrder),
    foreign key (idProduct) references products (idProduct)


);
