// import packages
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require('express-session');

//middleware
app.use(express.json());

app.use(session({
  secret: '1234',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set it to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}));
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(cors(corsOptions));

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
      const user = LOGIN.rows[0];
      const userId = user.user_id;

      // Login successful
      req.session.user = userId; // Save the user ID in the session
      console.log('User ID:', userId); // Add this line
      req.session.username = username;
      res.json({ message: 'Login successful', userId: userId });
    } else {
      // Login failed
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/dashboard', (req, res) => {
  const username = req.session.username;
  if (username) {
    res.json({ username: username });
  } else {
    res.status(401).json({ error: 'Not logged in' });
  }
});


app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.json({ message: 'Logout successful' });
    }
  });
});

app.post('/konser/:konser_id/order', async (req, res) => {
  try {
    const User_id = req.session.user; // Retrieve the user ID from the session
    console.log('User ID from session in Order:', User_id);
    const { konser_id} = req.params;
    console.log('konser_id from session in Order:', konser_id);
    const { nama_pemesan, no_telpon, email, jenis_accomodation, metode_pembayaran } = req.body;
    console.log('nama_pemesan:', nama_pemesan);
    console.log('no_telpon:', no_telpon);
    console.log('email:', email);
    console.log('jenis_accomodation:', jenis_accomodation);
    console.log('metode_pembayaran:', metode_pembayaran);
    


    // Fetch the konser details from the database
    const konser = await pool.query("SELECT * FROM KONSER WHERE konser_id = $1", [konser_id]);
    const harga_tiket = konser.rows[0].harga_tiket;
    console.log('harga_tiket:', harga_tiket);
    let kapasitas = konser.rows[0].kapasitas;
    console.log('kapasitas:', kapasitas);
    let kapasitas_privillege = konser.rows[0].kapasitas_privillege;
    console.log('kapasitas_privillege:', kapasitas_privillege);
    

    let harga_akomodasi = 0;

    // Fetch the user's status from the database
    const user = await pool.query("SELECT status_user, balance_GOPAY, balance_BCA FROM USERR WHERE user_id = $1", [User_id]);
    const userStatus = user.rows[0].status_user;
    console.log('userStatus:', userStatus);
    const balance_GOPAY = user.rows[0].balance_gopay;
    console.log('balance_gopay:', balance_GOPAY);
    const balance_BCA = user.rows[0].balance_bca;
    console.log('balance_bca:', balance_BCA);

    // Check if the user's status is privileged or normal
    if (userStatus === 'privillege') {
      console.log('Barrier 1');

      if (jenis_accomodation === 'hotel') {
        harga_akomodasi = 400000;
      } else if (jenis_accomodation === 'vila') {
        harga_akomodasi = 600000;
      }

      const jumlah_payment = harga_tiket + harga_akomodasi;
      let total_payment = jumlah_payment;
      console.log('total_payment:', total_payment);

      
      if (metode_pembayaran === 'GOPAY') {
        console.log('Barrier 2');
        // Calculate the discount for GOPAY payment
        const discount = jumlah_payment * 0.1;
        total_payment = jumlah_payment - discount;

        // Check if the user has sufficient balance in GOPAY
        if (balance_GOPAY >= total_payment) {
          // Reduce the appropriate capacity based on user status
          if (userStatus === 'privillege') {
            kapasitas_privillege--;
          } else {
            kapasitas--;
          }

          // Update the balance_GOPAY, kapasitas, and kapasitas_privillege in the database
          await pool.query("UPDATE USERR SET balance_GOPAY = $1 WHERE user_id = $2", [balance_GOPAY - total_payment, User_id]);
          await pool.query("UPDATE KONSER SET kapasitas = $1, kapasitas_privillege = $2 WHERE konser_id = $3", [kapasitas, kapasitas_privillege, konser_id]);

          // Set the status_order as 'paid'
          const status_order = 'paid';

          // Insert the order into the database
          const REGISTER = await pool.query("INSERT INTO ORDER_TICKET (User_id, konser_id, nama_pemesan, no_telpon, email, status_order, jenis_accomodation, harga_akomodasi, jumlah_payment, metode_pembayaran) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING order_id", [User_id, konser_id, nama_pemesan, no_telpon, email, status_order, jenis_accomodation, harga_akomodasi, total_payment, metode_pembayaran]);
          const insertedOrderId = REGISTER.rows[0].order_id;
          res.json({ order_id: insertedOrderId, Total_payment: total_payment });
          console.log('order_id:', insertedOrderId);
          console.log('Total_payment:', jumlah_payment);
        } else {
          return res.status(400).json({ error: 'Insufficient balance in GOPAY' });
        }
      } else if (metode_pembayaran === 'BCA') {
        console.log('Barrier 3');
        // Check if the user has sufficient balance in BCA
        if (balance_BCA >= jumlah_payment) {
          // Reduce the appropriate capacity based on user status
          if (userStatus === 'privillege') {
            kapasitas_privillege--;
          } else {
            kapasitas--;
          }

          // Update the balance_BCA, kapasitas, and kapasitas_privillege in the database
          await pool.query("UPDATE USERR SET balance_BCA = $1 WHERE user_id = $2", [balance_BCA - jumlah_payment, User_id]);
          await pool.query("UPDATE KONSER SET kapasitas = $1, kapasitas_privillege = $2 WHERE konser_id = $3", [kapasitas, kapasitas_privillege, konser_id]);

          // Set the status_order as 'paid'
          const status_order = 'paid';

          // Insert the order into the database
          const REGISTER = await pool.query("INSERT INTO ORDER_TICKET (User_id, konser_id, nama_pemesan, no_telpon, email, status_order, jenis_accomodation, harga_akomodasi, jumlah_payment, metode_pembayaran) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING order_id", [User_id, konser_id, nama_pemesan, no_telpon, email, status_order, jenis_accomodation, harga_akomodasi, jumlah_payment, metode_pembayaran]);
          const insertedOrderId = REGISTER.rows[0].order_id;
          res.json({ order_id: insertedOrderId, Total_payment: jumlah_payment });
          console.log('order_id:', insertedOrderId);
          console.log('Total_payment:', jumlah_payment);
        } else {
          return res.status(400).json({ error: 'Insufficient balance in BCA' });
        }
      } else {
        return res.status(400).json({ error: 'Invalid payment method' });
      }
    } else {
      console.log('Barrier 4');

      const jumlah_payment = harga_tiket + harga_akomodasi;
      let total_payment = jumlah_payment;
      console.log('total_payment:', total_payment);

      if (metode_pembayaran === 'GOPAY') {
        console.log('Barrier 5');
        // Calculate the discount for GOPAY payment
        const discount = jumlah_payment * 0.1;
        total_payment = jumlah_payment - discount;

        // Check if the user has sufficient balance in GOPAY
        if (balance_GOPAY >= total_payment) {

          // Update the balance_GOPAY, kapasitas, and kapasitas_privillege in the database
          await pool.query("UPDATE USERR SET balance_GOPAY = $1 WHERE user_id = $2", [balance_GOPAY - total_payment, User_id]);
          await pool.query("UPDATE KONSER SET kapasitas = $1, kapasitas_privillege = $2 WHERE konser_id = $3", [kapasitas, kapasitas_privillege, konser_id]);

          // Set the status_order as 'paid'
          const status_order = 'paid';

          // Insert the order into the database
          const REGISTER = await pool.query("INSERT INTO ORDER_TICKET (User_id, konser_id, nama_pemesan, no_telpon, email, status_order, harga_akomodasi, jumlah_payment, metode_pembayaran) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING order_id", [User_id, konser_id, nama_pemesan, no_telpon, email, status_order, harga_akomodasi, total_payment, metode_pembayaran]);
          const insertedOrderId = REGISTER.rows[0].order_id;
          res.json({ order_id: insertedOrderId, Total_payment: total_payment });
          console.log('order_id:', insertedOrderId);
          console.log('Total_payment:', jumlah_payment);
        } else {
          return res.status(400).json({ error: 'Insufficient balance in GOPAY' });
        }
      } else if (metode_pembayaran === 'BCA') {
        console.log('Barrier 6');
        // Check if the user has sufficient balance in BCA
        if (balance_BCA >= jumlah_payment) {

          // Update the balance_BCA, kapasitas, and kapasitas_privillege in the database
          await pool.query("UPDATE USERR SET balance_BCA = $1 WHERE user_id = $2", [balance_BCA - jumlah_payment, User_id]);
          await pool.query("UPDATE KONSER SET kapasitas = $1, kapasitas_privillege = $2 WHERE konser_id = $3", [kapasitas, kapasitas_privillege, konser_id]);

          // Set the status_order as 'paid'
          const status_order = 'paid';

          // Insert the order into the database
          const REGISTER = await pool.query("INSERT INTO ORDER_TICKET (User_id, konser_id, nama_pemesan, no_telpon, email, status_order, harga_akomodasi, jumlah_payment, metode_pembayaran) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING order_id", [User_id, konser_id, nama_pemesan, no_telpon, email, status_order, harga_akomodasi, jumlah_payment, metode_pembayaran]);
          const insertedOrderId = REGISTER.rows[0].order_id;
          res.json({ order_id: insertedOrderId, Total_payment: jumlah_payment });
          console.log('order_id:', insertedOrderId);
          console.log('Total_payment:', jumlah_payment);
        } else {
          return res.status(400).json({ error: 'Insufficient balance in BCA' });
        }
      } else {
        return res.status(400).json({ error: 'Invalid payment method' });
      }}
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Route Review
app.post('/review', async (req, res) => {
  try {
    const { konser_id } = req.params;
    const { rating, komen, review_date } = req.body;
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

//Route for topping up balance GoPAy
app.put('/user/TopUpGOPAY', async (req, res) => {
  try {
    const userId = req.session.user; // Retrieve the user ID from the session
    const { topUpAmount } = req.body;

    // Check if the topUpAmount is a valid integer
    if (!Number.isInteger(topUpAmount)) {
      return res.status(400).json({ error: 'Invalid topUpAmount value. Please provide a valid integer.' });
    }

    // Fetch the current balance_GOPAY from the database
    const user = await pool.query("SELECT balance_GOPAY FROM USERR WHERE user_id = $1", [userId]);
    let currentBalance = parseInt(user.rows[0].balance_gopay); // Parse the value as an integer

    // Validate the currentBalance as a number
    if (isNaN(currentBalance) || currentBalance === undefined) {
      currentBalance = 0; // Set the currentBalance to 0 as a fallback if it's not a valid number
    }

    // Calculate the new balance
    const newBalance = currentBalance + topUpAmount;

    // Update the balance_GOPAY in the database
    await pool.query("UPDATE USERR SET balance_GOPAY = $1 WHERE user_id = $2", [newBalance, userId]);

    res.json({ message: 'Balance topped up successfully', newBalance: newBalance });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for topping up balance_BCA
app.put('/user/TopUpBCA', async (req, res) => {
  try {
    const userId = req.session.user; // Retrieve the user ID from the session
    const { topUpAmount } = req.body;

    // Check if the topUpAmount is a valid integer
    if (!Number.isInteger(topUpAmount)) {
      return res.status(400).json({ error: 'Invalid topUpAmount value. Please provide a valid integer.' });
    }

    // Fetch the current balance_BCA from the database
    const user = await pool.query("SELECT balance_BCA FROM USERR WHERE user_id = $1", [userId]);
    const currentBalance = user.rows[0].balance_bca;

    // Validate the currentBalance as a number
    if (isNaN(currentBalance) || currentBalance === undefined) {
      currentBalance = 0; // Set the currentBalance to 0 as a fallback if it's not a valid number
    }

    // Calculate the new balance
    const newBalance = currentBalance + topUpAmount;

    // Update the balance_BCA in the database
    await pool.query("UPDATE USERR SET balance_BCA = $1 WHERE user_id = $2", [newBalance, userId]);

    res.json({ message: 'Balance topped up successfully', newBalance: newBalance });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/user/balance', async (req, res) => {
  try {
    const userId = req.session.user; // Retrieve the user ID from the session

    if (userId) {
      const user = await pool.query('SELECT balance_GOPAY, balance_BCA FROM USERR WHERE user_id = $1', [userId]);
      const { balance_gopay, balance_bca } = user.rows[0];
      res.json({ gopayBalance: balance_gopay, bcaBalance: balance_bca });
    } else {
      res.status(401).json({ error: 'User ID not found in the session' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Menunjukkan tiket yang dimiliki oleh user
app.get('/user/tickets', async (req, res) => {
  const userId = req.session.user; // Retrieve the user ID from the session
  try{
    const allOrder = await pool.query("SELECT * FROM ORDER_TICKET WHERE user_id = $1", [userId]);
    res.json(allOrder.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Menunjukkan semua konser yang ada (debug)
app.get('/getkonser', async (req, res) => {
  try {
    const concerts = await pool.query('SELECT * FROM konser');
    res.json(concerts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/konser/:konser_id', async (req, res) => {
  const { konser_id } = req.params;
  try{
    const Konser = await pool.query("SELECT * FROM KONSER WHERE konser_id = $1", [konser_id]);
    res.json(Konser.rows);
  } catch (err) {
    console.error(err.message);
  }
});


//Menunjukkan tiket tertentu yang dimiliki user
app.get('/user/tickets/:order_id', async (req, res) => {
  try {
    const {order_id} = req.params;

    // Fetch the order details from the database
    const order = await pool.query("SELECT * FROM ORDER_TICKET WHERE order_id = $1", [order_id]);

    if (order.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Menunjukkan review yang dimiliki konser
app.get('/review', async (req, res) => {
  const { konser_id } = req.params;
  try{
    const konserReview = await pool.query("SELECT * FROM REVIEW WHERE konser_id = $1", [konser_id]);
    res.json(konserReview.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Menunjukkan informasi semua performer (debug)
app.get('/getperformer', async (req, res) => {
  try{
    const allPerform = await pool.query("SELECT * FROM performer");
    res.json(allPerform.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.get('/performer/:id', (req, res) => {
  const performerId = req.params.id;
  const query = `SELECT * FROM performer WHERE performer_id = $1`;
  pool.query(query, [performerId], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      return res.status(500).json({ error: 'An error occurred' });
    }

    // Check if a performer with the given ID exists
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Performer not found' });
    }

    // Return the performer information
    const performer = result.rows[0];
    res.json(performer);
  });
});
//Menunjukkan performer tertentu
app.get('/performer/:performer_id', async (req, res) => {
  const { performer_id } = req.params;
  try{
    const Performer = await pool.query("SELECT * FROM PERFORMER WHERE performer_id = $1", [performer_id]);
    res.json(Performer.rows);
  } catch (err) {
    console.error(err.message);
  }
});


app.get('/user', async (req, res) => {
  try {
    const userId = req.session.user;
    console.log('User ID from session:', userId);

    if (userId) {
      const User = await pool.query("SELECT * FROM USERR WHERE user_id = $1", [userId]);
      const userData = User.rows[0]; // Assuming there is only one user with the given user_id
      console.log('User data from database:', userData);
      res.json(userData); // Return the user data as JSON
    } else {
      console.log('User ID not found in the session');
      res.status(401).json({ error: 'User ID not found in the session' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Menunjukkan informasi di home
app.get('/home', async (req, res) => {
  try {
    const Performer = await pool.query("SELECT (performer_id, nama_performer) FROM PERFORMER");
    const Konser = await pool.query("SELECT (konser_id, nama_konser, rating) FROM KONSER");
    res.json({
      performer: Performer.rows,
      konser: Konser.rows
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
