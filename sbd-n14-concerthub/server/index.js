// import packages
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const router = express.Router();
const bcrypt = require("bcrypt");

//middleware
app.use(cors());
app.use(express.json());

//router
//router for register
app.post('/register', async (req, res) => {
  try {
    const { status_user, username, password, email, no_telpon, balance_BCA, balance_GOPAY} = req.body;
    const REGISTER = await pool.query("INSERT INTO USERR (status_user, username, password, email, no_telpon, balance_BCA, balance_GOPAY) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id", [status_user, username, password, email, no_telpon, balance_BCA, balance_GOPAY]);
    const insertedUserId = REGISTER.rows[0].user_id;
    res.json({ user_id: insertedUserId });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//routers for login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const LOGIN = await pool.query("SELECT * FROM USERR WHERE username = $1 AND password = $2", [username, password]);
    if (LOGIN.rows.length > 0) {
      // Login successful
      res.json({ message: 'Login successful' });
    } else {
      // Login failed
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Route order tiket
app.post('/order', async (req, res) => {
  try {
    const { User_id, konser_id, nama_pemesan, no_telpon, email, status_order, jenis_accomodation, metode_pembayaran } = req.body;

    // Fetch the konser details from the database
    const konser = await pool.query("SELECT * FROM KONSER WHERE konser_id = $1", [konser_id]);
    const harga_tiket = konser.rows[0].harga_tiket;

    let harga_akomodasi = 0;
    if (jenis_accomodation === 'hotel') {
      harga_akomodasi = 400000;
    } else if (jenis_accomodation === 'vila') {
      harga_akomodasi = 600000;
    }

    const jumlah_payment = harga_tiket + harga_akomodasi;

    // Fetch the user's status from the database
    const user = await pool.query("SELECT status_user FROM USERR WHERE user_id = $1", [User_id]);
    const userStatus = user.rows[0].status_user;

    // Check if the user's status is privileged or normal
    if (userStatus === 'privillege' || typeof jenis_accomodation === 'undefined') {
      const REGISTER = await pool.query("INSERT INTO ORDER_TICKET (User_id, konser_id, nama_pemesan, no_telpon, email, status_order, jenis_accomodation, harga_akomodasi, jumlah_payment, metode_pembayaran) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING order_id", [User_id, konser_id, nama_pemesan, no_telpon, email, status_order, jenis_accomodation, harga_akomodasi, jumlah_payment, metode_pembayaran]);
      const insertedOrderId = REGISTER.rows[0].order_id;
      res.json({ order_id: insertedOrderId, Total_payment: jumlah_payment });
    } else {
      res.status(403).json({ error: 'Unauthorized: Only privileged users can choose jenis_accomodation.' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Route Review (Update belum dipakai)
app.post('/review', async (req, res) => {
  try {
    const { konser_id, rating, komen, review_date } = req.body;
    const REGISTER = await pool.query("INSERT INTO review (konser_id, rating, komen, review_date) VALUES ($1, $2, $3, $4) RETURNING review_id", [konser_id, rating, komen, review_date]);

    const insertedReviewId = REGISTER.rows[0].review_id;

    pool.query("UPDATE KONSER SET rating = (SELECT AVG(rating) FROM REVIEW WHERE konser_id = $1) WHERE konser_id = $1", [konser_id])
      .then(() => {
        res.json({ review_id: insertedReviewId });
      })
      .catch((error) => {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//Route Review (Update belum dipakai)
app.post('/review', async (req, res) => {
  try {
    const { konser_id, rating, komen, review_date } = req.body;
    const REGISTER = await pool.query("INSERT INTO review (konser_id, rating, komen, review_date) VALUES ($1, $2, $3, $4) RETURNING review_id", [konser_id, rating, komen, review_date]);

    const insertedReviewId = REGISTER.rows[0].review_id;

    pool.query("UPDATE KONSER SET rating = (SELECT AVG(rating) FROM REVIEW WHERE konser_id = $1) WHERE konser_id = $1", [konser_id])
      .then(() => {
        res.json({ review_id: insertedReviewId });
      })
      .catch((error) => {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getorder', async (req, res) => {
  try{
    const allOrder = await pool.query("SELECT * FROM ORDER_TICKET");
    res.json(allOrder.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/getkonser', async (req, res) => {
  try{
    const allKonser = await pool.query("SELECT * FROM konser");
    res.json(allKonser.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/getperformer', async (req, res) => {
  try{
    const allPerform = await pool.query("SELECT * FROM performer");
    res.json(allPerform.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/getreview', async (req, res) => {
  try{
    const allReview = await pool.query("SELECT * FROM review");
    res.json(allReview.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/topup/gopay/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const { topUpAmount } = req.body;

    // Validate topUpAmount
    if (isNaN(topUpAmount)) {
      return res.status(400).json({ error: 'Invalid topUpAmount' });
    }

    // Fetch the current balance_GOPAY from the database
    const user = await pool.query("SELECT balance_GOPAY FROM USERR WHERE user_id = $1", [user_id]);
    const currentBalance = parseInt(user.rows[0].balance_GOPAY);

    // Calculate the new balance
    const newBalance = currentBalance + parseInt(topUpAmount);

    // Update the balance_GOPAY in the database
    await pool.query("UPDATE USERR SET balance_GOPAY = $1 WHERE user_id = $2", [newBalance, user_id]);

    res.json({ message: 'Balance topped up successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route for topping up balance_BCA
app.put('/topup/bca/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const { topUpAmount } = req.body;

    // Fetch the current balance_BCA from the database
    const user = await pool.query("SELECT balance_BCA FROM USERR WHERE user_id = $1", [user_id]);
    const currentBalance = user.rows[0].balance_BCA;

    // Calculate the new balance
    const newBalance = currentBalance + topUpAmount;

    // Update the balance_BCA in the database
    await pool.query("UPDATE USERR SET balance_BCA = $1 WHERE user_id = $2", [newBalance, user_id]);

    res.json({ message: 'Balance topped up successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//ngetes getuser
app.get('/getuser', async (req, res) => {
  try{
    const allUsers = await pool.query("SELECT * FROM USERR");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

