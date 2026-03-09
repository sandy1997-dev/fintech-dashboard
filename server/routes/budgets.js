const router = require('express').Router();
const auth = require('../middleware/auth');
const { pool } = require('../db/pool');

router.get('/', auth, async (req, res) => {
  const { month, year } = req.query;
  const { rows } = await pool.query(
    `SELECT b.*, c.name as category_name, c.icon, c.color,
      COALESCE((SELECT SUM(amount) FROM transactions WHERE category_id=b.category_id AND user_id=$1
        AND EXTRACT(MONTH FROM date)=$2 AND EXTRACT(YEAR FROM date)=$3), 0) as spent
     FROM budgets b JOIN categories c ON b.category_id=c.id
     WHERE b.user_id=$1 AND b.month=$2 AND b.year=$3`,
    [req.user.id, month, year]
  );
  res.json(rows);
});

router.post('/', auth, async (req, res) => {
  const { category_id, amount, period, month, year } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO budgets (user_id, category_id, amount, period, month, year)
     VALUES ($1,$2,$3,$4,$5,$6)
     ON CONFLICT DO NOTHING RETURNING *`,
    [req.user.id, category_id, amount, period || 'monthly', month, year]
  );
  res.status(201).json(rows[0]);
});

router.put('/:id', auth, async (req, res) => {
  const { amount } = req.body;
  const { rows } = await pool.query(
    'UPDATE budgets SET amount=$1 WHERE id=$2 AND user_id=$3 RETURNING *',
    [amount, req.params.id, req.user.id]
  );
  res.json(rows[0]);
});

module.exports = router;
