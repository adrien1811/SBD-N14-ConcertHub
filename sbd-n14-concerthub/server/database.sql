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
    balance_BCA int,
    balance_GOPAY int,
    order_id int
);

CREATE TABLE ORDER_TICKET(
    User_id int NOT NULL,
    Order_id serial UNIQUE NOT NULL PRIMARY KEY,
    konser_id int NOT NULL,
    nama_pemesan varchar(50) NOT NULL,
    no_telpon bigint NOT NULL,
    email varchar(50) NOT NULL,
    status_order status_order NOT NULL,
    jenis_accomodation jenis_accomodation ,
    jumlah_payment int NOT NULL,
    metode_pembayaran metode_pembayaran NOT NULL
);

CREATE TABLE KONSER(
    konser_id serial UNIQUE NOT NULL PRIMARY KEY,
    nama_konser varchar(50) NOT NULL,
    performer_id serial UNIQUE,
    tanggal_perform date NOT NULL,
    kota_perform varchar(50) NOT NULL,
    venue varchar(50) NOT NULL,
    kapasitas int NOT NULL,
    kapasitas_privillege int NOT NULL,
    rating Decimal(2, 1) ,
    deskripsi varchar(500)
);
INSERT INTO KONSER (konser_id, nama_konser, performer_id, tanggal_perform, kota_perform, venue, kapasitas, kapasitas_privillege, deskripsi)
VALUES (1, 'Coldplay Music of The Spheres', 1, '2023-11-15', 'Jakarta', 'Gelora Bung Karno', 65000, 5000, 'Jakarta, 9 May 2023 - Coldplay have announced their hugely-anticipated return to Asia and Australia with a special run of stadium shows in November 2023, as part of their record-breaking Music Of The Spheres World Tour. The announcement marks the bands first ever show in Jakarta, taking place on 15 November at Gelora Bung Karno Stadium.');

INSERT INTO KONSER (konser_id, nama_konser, performer_id, tanggal_perform, kota_perform, venue, kapasitas, kapasitas_privillege, deskripsi)
VALUES (2, 'Bruno Major Tour of Planet Earth', 2, '2023-8-26', 'Bandung', 'Gedung Mandalawangi', 35000, 3000, 'Bruno Major Tour of Planet Earth.');

INSERT INTO KONSER (konser_id, nama_konser, performer_id, tanggal_perform, kota_perform, venue, kapasitas, kapasitas_privillege, deskripsi)
VALUES (3, 'Rex Orange Country', 3, '2024-3-21', 'Malang', 'UMM DOME', 20000, 1500, 'To celebrate one year since Rex Orange County released his fourth album WHO CARES?, he will play a one-off show at Bandung.');

INSERT INTO KONSER (konser_id, nama_konser, performer_id, tanggal_perform, kota_perform, venue, kapasitas, kapasitas_privillege, deskripsi)
VALUES (4, 'Westlife', 4, '2024-5-5', 'Surabaya', 'Balai Budaya', 40000, 4200, 'Experience the magic of Westlife as they take the stage for an unforgettable night of music and nostalgia. Immerse yourself in the captivating harmonies and timeless hits that have made Westlife one of the most beloved boy bands of all time.');



CREATE TABLE PERFORMER(
    performer_id serial UNIQUE NOT NULL PRIMARY KEY,
    nama_performer varchar(50) NOT NULL,
    album varchar  NOT NULL,
    deskripsi Text NOT NULL
);

CREATE TABLE REVIEW(
    review_id serial UNIQUE NOT NULL PRIMARY KEY,
    konser_id int NOT NULL,
    rating Decimal(2, 1),
    komen Text,
    review_date date NOT NULL
);
