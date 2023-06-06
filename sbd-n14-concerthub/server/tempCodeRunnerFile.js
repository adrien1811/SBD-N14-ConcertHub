app.get('/getuser', async (req, res) => {
  const { user_id } = req.query; // Assuming user_id is passed as a query parameter
  try {
    const User = await pool.query('SELECT * FROM USERR WHERE user_id = $1', [user_id]);
    res.json(User.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});