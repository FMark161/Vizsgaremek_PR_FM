const pool = require('../models/db');

const stockController = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await pool.query('SELECT * FROM leltarak ORDER BY id');
      res.json(rows);
    } catch (error) { next(error); }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query('SELECT * FROM leltarak WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(rows[0]);
    } catch (error) { next(error); }
  },
  create: async (req, res, next) => {
    try {
      const { ar, elerhetoseg } = req.body;
      const [result] = await pool.query('INSERT INTO leltarak (ar, elerhetoseg) VALUES (?, ?)', [ar, elerhetoseg || 1]);
      res.status(201).json({ id: result.insertId, message: 'Leltár elem létrehozva' });
    } catch (error) { next(error); }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { ar, elerhetoseg } = req.body;
      const [result] = await pool.query('UPDATE leltarak SET ar = ?, elerhetoseg = ? WHERE id = ?', [ar, elerhetoseg, id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Leltár elem frissítve' });
    } catch (error) { next(error); }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [result] = await pool.query('DELETE FROM leltarak WHERE id = ?', [id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Leltár elem törölve' });
    } catch (error) { next(error); }
  }
};

module.exports = stockController;