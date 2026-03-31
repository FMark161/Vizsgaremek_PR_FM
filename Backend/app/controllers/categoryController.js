const pool = require('../models/db');

const categoryController = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await pool.query('SELECT * FROM kategoriak ORDER BY id');
      res.json(rows);
    } catch (error) { next(error); }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query('SELECT * FROM kategoriak WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(rows[0]);
    } catch (error) { next(error); }
  },
  create: async (req, res, next) => {
    try {
      const { katNev } = req.body;
      const [result] = await pool.query('INSERT INTO kategoriak (katNev) VALUES (?)', [katNev]);
      res.status(201).json({ id: result.insertId, message: 'Kategória létrehozva' });
    } catch (error) { next(error); }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { katNev } = req.body;
      const [result] = await pool.query('UPDATE kategoriak SET katNev = ? WHERE id = ?', [katNev, id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Kategória frissítve' });
    } catch (error) { next(error); }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [result] = await pool.query('DELETE FROM kategoriak WHERE id = ?', [id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Kategória törölve' });
    } catch (error) { next(error); }
  }
};

module.exports = categoryController;