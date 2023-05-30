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
    harga_akomodasi int,
    jumlah_payment int NOT NULL,
    metode_pembayaran metode_pembayaran NOT NULL
);

CREATE TABLE KONSER(
    konser_id serial UNIQUE NOT NULL PRIMARY KEY,
    harga_tiket int NOT NULL,
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
INSERT INTO KONSER (konser_id,harga_tiket, nama_konser, performer_id, tanggal_perform, kota_perform, venue, kapasitas, kapasitas_privillege, deskripsi)
VALUES (1, 500000, 'Coldplay Music of The Spheres', 1, '2023-11-15', 'Jakarta', 'Gelora Bung Karno', 65000, 5000, 'Jakarta, 9 May 2023 - Coldplay have announced their hugely-anticipated return to Asia and Australia with a special run of stadium shows in November 2023, as part of their record-breaking Music Of The Spheres World Tour. The announcement marks the bands first ever show in Jakarta, taking place on 15 November at Gelora Bung Karno Stadium.');

INSERT INTO KONSER (konser_id, harga_tiket, nama_konser, performer_id, tanggal_perform, kota_perform, venue, kapasitas, kapasitas_privillege, deskripsi)
VALUES (2, 250000, 'Bruno Major Tour of Planet Earth', 2, '2023-8-26', 'Bandung', 'Gedung Mandalawangi', 35000, 3000, 'Bruno Major Tour of Planet Earth.');

INSERT INTO KONSER (konser_id, harga_tiket, nama_konser, performer_id, tanggal_perform, kota_perform, venue, kapasitas, kapasitas_privillege, deskripsi)
VALUES (3, 370000, 'Rex Orange Country', 3, '2024-3-21', 'Malang', 'UMM DOME', 20000, 1500, 'To celebrate one year since Rex Orange County released his fourth album WHO CARES?, he will play a one-off show at Bandung.');

INSERT INTO KONSER (konser_id, harga_tiket, nama_konser, performer_id, tanggal_perform, kota_perform, venue, kapasitas, kapasitas_privillege, deskripsi)
VALUES (4, 250000, 'Westlife', 4, '2024-5-5', 'Surabaya', 'Balai Budaya', 40000, 4200, 'Experience the magic of Westlife as they take the stage for an unforgettable night of music and nostalgia. Immerse yourself in the captivating harmonies and timeless hits that have made Westlife one of the most beloved boy bands of all time.');

CREATE TABLE PERFORMER(
    performer_id serial UNIQUE NOT NULL PRIMARY KEY,
    nama_performer varchar(500) NOT NULL,
    album varchar  NOT NULL,
    deskripsi varchar(500) NOT NULL
);
INSERT INTO PERFORMER (performer_id, nama_performer, album, deskripsi) 
VALUES (1, 'Christ Martin,Jonny Buckland, Guy Berryman, Will Champion', 'Music of the Spheres', 'Coldplay are a British rock band formed in London in 1997. They consist of vocalist and pianist Chris Martin, guitarist Jonny Buckland, bassist Guy Berryman, drummer Will Champion and creative director Phil Harvey.[a] They met at University College London and began playing music together from 1997 to 1998, initially calling themselves Big Fat Noises and later Starfish. They signed to Parlophone records in 1999, and renamed themselves Coldplay in 2000.');

INSERT INTO PERFORMER (performer_id, nama_performer, album, deskripsi)
VALUES (2, 'Bruno Major', 'To Let A Good Thing Die', 'Bruno Major is a British singer-songwriter from Northampton, England. He has released three albums and seven extended plays. He is signed to the label New Brand Records. He has been described as a "singer-songwriter who is a master of the ballad" by The Guardian.');

INSERT INTO PERFORMER (performer_id, nama_performer, album, deskripsi)
VALUES (3, 'Rex Orange Country', 'Who Cares?', 'With a unique musical style that blends elements of hip-hop, jazz, and bedroom pop, Rex Orange Countys music is characterized by its bright and captivating sound. His compositions often feature introspective and relatable lyrics, delivered with heartfelt vocals. Rex Orange Countys music has resonated with a wide audience, drawing acclaim from fans and critics alike.');

INSERT INTO PERFORMER (performer_id, nama_performer, album, deskripsi)
VALUES (4, 'Westlife', 'Coast to coas','Westlife are an Irish pop vocal group, which formed in 1998 in Dublin, disbanded in 2012 and reunited in 2018. They were originally signed by Simon Cowell in the UK, Clive Davis in the US and managed by Louis Walsh and Sonny Takhar. The group currently consists of Shane Filan, Mark Feehily, Kian Egan, and Nicky Byrne.');

CREATE TABLE REVIEW(
    review_id serial UNIQUE NOT NULL PRIMARY KEY,
    konser_id int NOT NULL,
    rating Decimal(2, 1),
    komen Text,
    review_date date NOT NULL
);
