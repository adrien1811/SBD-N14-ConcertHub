CREATE DATABASE ConcertHub;

CREATE type user_status AS ENUM ('normal', 'privillege');
CREATE type kota_perform AS ENUM ('Jakarta', 'Bandung', 'Malang', 'Surabaya');
CREATE type status_order AS ENUM('paid', 'unpaid');
CREATE type jenis_accomodation AS ENUM ('hotel', 'vila');
CREATE type metode_pembayaran AS ENUM ('BCA', 'GOPAY');

CREATE TABLE USERR(
    user_id serial  UNIQUE NOT NULL PRIMARY KEY,
    Status_user user_status NOT NULL,
    username varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    no_telpon bigint NOT NULL,
    balance_BCA int NOT NULL,
    balance_GOPAY int NOT NULL,
    order_id int NOT NULL
);

CREATE TABLE "ORDER"(
    User_id serial UNIQUE NOT NULL,
    Order_id serial UNIQUE NOT NULL PRIMARY KEY,
    konser_id serial UNIQUE NOT NULL,
    nama_pemesan varchar(50) NOT NULL,
    no_telpon bigint NOT NULL,
    email varchar(50) NOT NULL,
    status_order status_order NOT NULL,
    jenis_accomodation jenis_accomodation NOT NULL,
    jumlah_payment int NOT NULL,
    metode_pembayaran metode_pembayaran NOT NULL
);

CREATE TABLE KONSER(
   konser_id serial UNIQUE NOT NULL PRIMARY KEY,
   nama_konser varchar(50) NOT NULL,
   performer_id serial UNIQUE NOT NULL,
   tanggal_perform date NOT NULL,
   kota_perform varchar(50) NOT NULL,
   venue varchar(50) NOT NULL,
   kapasitas int NOT NULL,
   kapasitas_privillege int NOT NULL,
   review_id serial UNIQUE NOT NULL,
   rating int NOT NULL,
   komen varchar(50),
   review_date date NOT NULL
);

CREATE TABLE PERFORMER(
    performer_id serial UNIQUE NOT NULL PRIMARY KEY,
    nama_performer varchar(50) NOT NULL,
    album varchar  NOT NULL,
    deskripsi varchar(50) NOT NULL
);

CREATE TABLE REVIEW(
    review_id serial UNIQUE NOT NULL PRIMARY KEY,
    konser_id serial UNIQUE NOT NULL,
    rating int NOT NULL,
    komen varchar(50),
    review_date date NOT NULL
);