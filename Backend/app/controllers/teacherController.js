const pool = require('../models/db');

const teacherController = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await pool.query(`
        SELECT t.id, t.nev as name, t.telefonsz as phone, t.email, 
               t.tapasztalat as experience, t.vegzettseg as education, 
               t.leiras as description
        FROM tanarok t
        ORDER BY t.id
      `);
      res.json(rows);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query('SELECT * FROM tanarok WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(rows[0]);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { nev, telefonsz, email, tapasztalat, vegzettseg, leiras } = req.body;
      const [result] = await pool.query(
        'INSERT INTO tanarok (nev, telefonsz, email, tapasztalat, vegzettseg, leiras) VALUES (?, ?, ?, ?, ?, ?)',
        [nev, telefonsz, email, tapasztalat, vegzettseg, leiras]
      );
      res.status(201).json({ id: result.insertId, message: 'Oktató létrehozva' });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nev, telefonsz, email, tapasztalat, vegzettseg, leiras } = req.body;
      const [result] = await pool.query(
        'UPDATE tanarok SET nev = ?, telefonsz = ?, email = ?, tapasztalat = ?, vegzettseg = ?, leiras = ? WHERE id = ?',
        [nev, telefonsz, email, tapasztalat, vegzettseg, leiras, id]
      );
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Oktató frissítve' });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [result] = await pool.query('DELETE FROM tanarok WHERE id = ?', [id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Oktató törölve' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = teacherController;