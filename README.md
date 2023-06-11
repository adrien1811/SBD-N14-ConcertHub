# SBD-N14-ConcertHub
<p align="center">
  <img src="https://github.com/adrien1811/SBD-N14-ConcertHub/assets/87458424/f125233e-5475-4733-b8e1-5dc4805b0e87" title="hover text">

</p>
<h1 align="center">Kelompok_N14_SBD</h1>
<h3 align="center">
  <a href="https://github.com/adrien1811">
    Adrien Ardra 
  </a>
  - 2106731485
</h3>
<h3 align="center">
  <a href="https://github.com/NaufalFeb">
    Naufal Febriyanto
  </a>
  - 2106702674
</h3>
<h3 align="center">
  <a href="https://github.com/JGDoubleP">
    Jeremy Ganda Pandapotan
  </a>
  - 2106731573
</h3>
<p>All of which are undergradute student Computer Engineering Major, Department of Electrical Engineering, Faculty of Engineering, Universitas Indonesia.</p>

## Overview
ConcertHub - Your Ultimate Concert Ticket Buying Platform

ConcertHub is an online platform that caters to concert enthusiasts, offering them a seamless and convenient experience to purchase concert tickets. With ConcertHub, users can create their own accounts, manage their finances, and purchase tickets using their account balance, which can be topped up using Gopay and BCA bank balance. The platform aims to provide a user-friendly interface, a wide range of concert options, and secure payment methods, ensuring an enjoyable and hassle-free ticket buying experience.

Key Features:

User Accounts: ConcertHub allows users to create personal accounts, enabling them to have a personalized experience on the platform. Users can access their account information, view ticket purchase history, and manage their payment methods.

Account Balance: Users can top up their ConcertHub account balance using two popular Indonesian payment methods: Gopay and BCA bank balance. This balance acts as a virtual currency that users can utilize to buy concert tickets directly from the platform.

Ticket Listings: ConcertHub offers an extensive selection of concert tickets from various genres and artists. Users can explore upcoming concerts, view detailed event information, such as venue, date, and ticket pricing, and make informed decisions on their ticket purchases.

In conclusion, ConcertHub is a feature-rich online platform that caters to concert enthusiasts, offering a wide range of concert tickets. With user accounts, Gopay and BCA bank balance top-ups, and a secure payment system, ConcertHub provides a convenient and secure platform for users to explore and purchase tickets for their favorite concerts.

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://getbootstrap.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> </p>


## Tables

### 1.  ```User```
This table is used to store user information when registering on the website.
```
1. user_id
2. status_user
3. password
4. email
5. no_telpon
6. balance_BCA
7. balance_GOPAY
8. Order_id
```

### 2.  ```Performer```
This table is used to get Performer information on the website.
```
1. performer_id
2. nama_performer
3. album
4. deskripsi
```

### 3.  ```Account```
This table is used to store doctors and patients account information. 
```
1. Account_ID
2. Email
3. Password
4. Role
```

### 4.  ```Konser```
This table is used to store Concert information for user to choose.
```
1. konser_id
2. perfomer_id
3. nama_perfomer
4. tanggal_perform
5. harga_tiket
6. kota_perform
7. venue
8. kapasitas
9. kapasitas_privilege
10. deskripsi
```

### 5.  ```Accommodation```
This table is used to store Accommodation information when users order ticket.
```
1. Kota_perform
2. jenis_Accommodation
3. Harga_Accommodation
```

### 6.  ```order```
This table is used to store order information from users.
```
1. user_id
2. order_id
3. Konser_id
4. nama_pemesan
5. no_telpon
6. email
7. status_order
8. jenis_accomodation
9. jumlah_payment
10. metode_pembayaran
```


### 7.  ```Review```
This table is used to store Review by users.
```
1. user_id
2. konser_id
3. rating
4. komen
5. review_date
```

# UML
![CONCERTHUB](https://github.com/adrien1811/SBD-N14-ConcertHub/assets/87458424/4b625a33-fe23-45c5-8002-9dd5e56aefdb)
