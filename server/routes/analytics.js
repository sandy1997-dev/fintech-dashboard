const router = require('express').Router();
const auth = require('../middleware/auth');
const { pool } = require('../db/pool');

router.get('/summary', auth, async (req, res) => {
  const { month, year } = req.query;
  const { rows } = await pool.query(
    `SELECT
      SUM(CASE WHEN type='income' THEN amount ELSE 0 END) as total_income,
      SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) as total_expenses,
      COUNT(*) as transaction_count
     FROM transactions WHERE user_id=$1
       AND EXTRACT(MONTH FROM date)=$2 AND EXTRACT(YEAR FROM date)=$3`,
    [req.user.id, month, year]
  );
  res.json(rows[0]);
});

router.get('/by-category', auth, async (req, res) => {
  const { month, year } = req.query;
  const { rows } = await pool.query(
    `SELECT c.name, c.color, c.icon, SUM(t.amount) as total
     FROM transactions t JOIN categories c ON t.category_id=c.id
     WHERE t.user_id=$1 AND t.type='expense'
       AND EXTRACT(MONTH FROM t.date)=$2 AND EXTRACT(YEAR FROM t.date)=$3
     GROUP BY c.id, c.name, c.color, c.icon ORDER BY total DESC`,
    [req.user.id, month, year]
  );
  res.json(rows);
});

router.get('/trend', auth, async (req, res) => {
  const { months = 6 } = req.query;
  const { rows } = await pool.query(
    `SELECT TO_CHAR(date, 'Mon YYYY') as label,
       EXTRACT(MONTH FROM date) as month, EXTRACT(YEAR FROM date) as year,
       SUM(CASE WHEN type='income' THEN amount ELSE 0 END) as income,
       SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) as expenses
     FROM transactions WHERE user_id=$1
       AND date >= NOW() - INTERVAL '${parseInt(months)} months'
     GROUP BY label, month, year ORDER BY year, month`,
    [req.user.id]
  );
  res.json(rows);
});

module.exports = router;
