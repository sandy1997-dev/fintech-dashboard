const router = require('express').Router();
const auth = require('../middleware/auth');
const { pool } = require('../db/pool');

router.get('/', auth, async (req, res) => {
  const { month, year, category, type, limit = 50, offset = 0 } = req.query;
  let query = `SELECT t.*, c.name as category_name, c.icon, c.color
    FROM transactions t LEFT JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = $1`;
  const params = [req.user.id];
  if (month && year) { params.push(month, year); query += ` AND EXTRACT(MONTH FROM t.date)=$${params.length-1} AND EXTRACT(YEAR FROM t.date)=$${params.length}`; }
  if (type) { params.push(type); query += ` AND t.type=$${params.length}`; }
  if (category) { params.push(category); query += ` AND t.category_id=$${params.length}`; }
  query += ` ORDER BY t.date DESC LIMIT $${params.length+1} OFFSET $${params.length+2}`;
  params.push(limit, offset);
  const { rows } = await pool.query(query, params);
  res.json(rows);
});

router.post('/', auth, async (req, res) => {
  const { category_id, amount, type, description, merchant, date } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO transactions (user_id, category_id, amount, type, description, merchant, date) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
    [req.user.id, category_id, amount, type, description, merchant, date]
  );
  res.status(201).json(rows[0]);
});

router.put('/:id', auth, async (req, res) => {
  const { category_id, amount, type, description, merchant, date } = req.body;
  const { rows } = await pool.query(
    'UPDATE transactions SET category_id=$1,amount=$2,type=$3,description=$4,merchant=$5,date=$6 WHERE id=$7 AND user_id=$8 RETURNING *',
    [category_id, amount, type, description, merchant, date, req.params.id, req.user.id]
  );
  if (!rows.length) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});

router.delete('/:id', auth, async (req, res) => {
  await pool.query('DELETE FROM transactions WHERE id=$1 AND user_id=$2', [req.params.id, req.user.id]);
  res.json({ success: true });
});

module.exports = router;
