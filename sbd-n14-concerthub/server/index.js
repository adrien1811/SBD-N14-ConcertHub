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

//routers

//router for register
app.post('/register', async (req, res) => {
  try {
    const { status_user, username, password, email, no_telpon, balance_BCA, balance_GOPAY, order_id } = req.body;
    const REGISTER = await pool.query("INSERT INTO USERR (status_user, username, password, email, no_telpon, balance_BCA, balance_GOPAY, order_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING user_id", [status_user, username, password, email, no_telpon, balance_BCA, balance_GOPAY, order_id]);
    const insertedUserId = REGISTER.rows[0].user_id;
    res.json({ user_id: insertedUserId });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//bismillah bisa login
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
//ngetes getuser
app.get('/getuser', async (req, res) => {
  try{
    const allUsers = await pool.query("SELECT * FROM USERR");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(4900, () => {
  console.log("Server is running on port 3000");
});
